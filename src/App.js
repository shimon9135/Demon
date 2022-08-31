import {InputText} from 'primereact/inputtext';

import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import './App.css';
import React, {Component} from 'react';
import 'primeflex/primeflex.css';
import {ProgressBar} from 'primereact/progressbar';
import {Button} from "primereact/button"
import {InputMask} from "primereact/inputmask"
import {InputNumber} from "primereact/inputnumber"
import {Card} from 'primereact/card';
import {Carousel} from 'primereact/carousel';
import {addDonation, getAllDonations} from "./donation/donation-service"
import {BlockUI} from "primereact/blockui"
import {Donation} from "./donation/donation.js"
import { Dialog } from 'primereact/dialog';

import cardImage from './images/shirat-pic.png'
export default class App extends Component {
    responsiveOptions
    productTemplate
    showDialog
    showErrorDialog
    dialogMessage = ''

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            donationAmount: undefined,
            phone: undefined,
            donationGoalPercent: 0,
            donations: [],
            donationSum: 0,
            blockedPanel: false,
            goal: 200000
        }

        this.responsiveOptions = [
            {
                breakpoint: '1024px', 
                numVisible: 3,
                numScroll: 3
            },
            {
                breakpoint: '600px',
                numVisible: 2,
                numScroll: 2
            },
            {
                breakpoint: '480px',
                numVisible: 1,
                numScroll: 1
            }
        ];
        this.productTemplate = (donationsPair) => {
            if(donationsPair.length === 2) {
                return (
                    <><Donation name={donationsPair[0].name} donationAmount={donationsPair[0].donationAmount}></Donation>
                    <br></br>
                    <Donation name={donationsPair[1].name} donationAmount={donationsPair[1].donationAmount}></Donation>
                    </>
                    )
            }
            return <><Donation name={donationsPair[0].name} donationAmount={donationsPair[0].donationAmount}></Donation></>
        }
    }

    componentDidMount() {
        this.updateDonations()
        setInterval(() => this.updateDonations(), 2500);
    }

    add(accumulator, a) {
        return accumulator + a;
    }

    updateDonations() {
        getAllDonations()
            .then((data) => {
                let sum = data.map(donation => donation.donationAmount).reduce(this.add, 0)
                      this.setState({donations: data, donationSum: sum, donationGoalPercent: sum / this.state.goal * 100})
                  },
                  (error) => {
                      //WTF
                  })
    }

    donationClick() {
        this.setState({blockedPanel: true})
        addDonation({name: this.state.userName, phone: this.state.phone, donationAmount: this.state.donationAmount})
            .then((data) => {
                this.dialogMessage = "תודה רבה " + this.state.userName
                this.showDialog = true;

                  },
                  (error) => {
                    this.dialogMessage = "קרתה תקלה. אנא נסו שוב"
                    this.showErrorDialog = true;
                  })
    }

    doOnSuccessHide() {
        this.showDialog = true;
        window.location.reload()
    }


    splitToPairs() {
        const donationsCount = this.state.donations.length
        if(donationsCount >= 10 && donationsCount <= 20) {
            let donations = [] //Array(10).fill([])
            this.state.donations.forEach((element, index) => {
                if(!donations[index % 10]) {
                    donations[index % 10] = []
                }
                donations[index % 10].push(element)
            });
            return donations
        }

        let reduceBy = 2;
        if(donationsCount <= 10) {
           reduceBy = 1;
        }
        return this.state.donations.reduce(function(result, value, index, array) {
            if (index % reduceBy === 0)
              result.push(array.slice(index, index + reduceBy));
            return result;
          }, []);
    }

    getVisibleCount() {
        return this.state.donations.length <= 20 ? 11 : 10
    }

    isInputInvalid() {
        return this.state.userName === undefined ||  this.state.userName.trim() === "" ||
        this.state.phone === undefined || this.state.phone.trim() === "" || this.state.phone.length < 9 || this.state.phone.length > 12 ||
        this.state.donationAmount <= 0
    }

    render() {

        return (
            
            <div>
                
                            <img  style={{  width:'100vw'}} src={cardImage} alt=''></img>
                <BlockUI blocked={this.state.blockedPanel} fullScreen="true">
                    
                    <div className="card" dir="rtl" style={{width: '80vw', margin: 'center'}}>
                    <div className="card">
                            <div className="flex">
                                
                        <Card title="קחו חלק בהקמת בית כנסת פסגת אונו" style={{backgroundColor: '#1dbecf', height: '25vh'}}>

                            <div style={{height: '5vh', width: '50vw', marginInline: 'auto'}}>

                                <div style={{display: "inline-block", width: "inherit"}}>
                                    <label className="progressLabel" style={{float: 'right'}}>{ Number(this.state.donationSum).toLocaleString()} ₪</label>
                                    <label className="progressLabel" style={{float: 'left'}}>{Math.round(this.state.donationGoalPercent)}%</label>
                                </div>
                                <ProgressBar color="#274472" style={{height: '30px'}}
                                             value={this.state.donationGoalPercent}
                                             showValue="false"
                                             displayValueTemplate={(e) => <React.Fragment></React.Fragment>}
                                ></ProgressBar>
                                <div style={{display: "block"}}>
                                    <label className="progressLabel" style={{float: 'right'}}>יעד</label>
                                    <label className="progressLabel" style={{float: 'left'}}>{ Number(this.state.goal).toLocaleString()} ₪</label>
                                </div>
                               
                            </div>
                            </Card>
                           

                        </div>
                            </div>
                        <div style={{height: '5vh', marginTop: '5vh'}}>
                            <div className="grid p-fluid">
                                <div className="col-7">
                                    <l className="p-inputgroup">
                                      <span className="p-float-label">
                                          <ul className="p-inputgroup-addon">
                                            <l className="pi pi-user"></l>
                                        </ul>
                                    <InputText id="fullName" value={this.state.userName}
                                               onChange={(e) => this.setState({userName: e.target.value})}/>
                                          <label htmlFor="fullName">שם מלא</label>
                                      </span>
                                    </l>
                                </div>
                                <div className="col-7">
                                    <div className="p-inputgroup">
                                    <span className="p-float-label">
                                    <ul className="p-inputgroup-addon">₪</ul>
                                    <InputNumber id="donation" value={this.state.donationAmount}
                                                 onValueChange={(e) => this.setState(
                                                     {donationAmount: e.target.value})}/>
                                        <label htmlFor="donation">סכום תרומה</label></span>
                                    </div>
                                </div>

                                <div className="col-7">
                                    <div className="p-inputgroup">
                                    <span className="p-float-label">
                                        <ul className="p-inputgroup-addon">
                                            
                                            <i className="pi pi-phone"></i>
                                        </ul>
                                        <InputText style={{textAlign: "right"}} maxLength='11' keyfilter="num" id="phone" dir="ltr" value={this.state.phone}
                                               onChange={(e) => this.setState({phone: e.target.value})}/>
                                        <label htmlFor="phone">טלפון</label></span>
                                    </div>
                                
                            </div>

                           
                        </div>
                        </div>

                                <div style={{marginTop: '40vh',width:'50vw', display: 'block', textAlign: 'center'}}>
                                <Button dir="ltr" label="מאשר/ת התחייבות לתרומה" icon="pi pi-check" disabled={this.isInputInvalid()}
                                        onClick={(e) => this.donationClick()}/>
                            </div>
                    </div>
                            

                    <div style={{marginTop: '8vh'}}>
                        <Carousel value={this.splitToPairs()} numVisible={this.getVisibleCount()} numScroll={1}
                                  responsiveOptions={this.responsiveOptions} className="custom-carousel" circular
                                  autoplayInterval={2500} itemTemplate={this.productTemplate}
                                  style={{textAlign: 'center'}} header={<h3>תורמים</h3>}/>
                    </div>
                </BlockUI>

                <Dialog dir="rtl" header={this.dialogMessage} visible={this.showDialog} style={{ width: '30vw' }} onHide={() => this.doOnSuccessHide()}>
                <p>תודה רבה על תרומתך לבית הכנסת. אנו ניצור איתך קשר בקרוב.</p>
                </Dialog>
                <Dialog dir="rtl" header={this.dialogMessage} visible={this.showErrorDialog} style={{ width: '30vw' }} onHide={() => this.showErrorDialog = false}>
                <p>אופס.. קרתה תקלה טכנית. נשמח אם תנסה שוב או תיידע את האחראי.</p>
                </Dialog>
            </div>


        );
    }
}
