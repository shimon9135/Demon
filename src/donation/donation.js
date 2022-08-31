import React, {Component} from 'react';
import {Badge} from 'primereact/badge'
import {Card} from 'primereact/card'

export class Donation extends Component {


    render() {
        return <Card style={{ height: '160px', width: '100px', margin: 'auto'}}>
            <div>
                {/* <Badge value={this.props.name.trim().split(" ").map((n)=>n[0]).join("")}></Badge> */}
                <h4 className="mb-1">{this.props.name}</h4>
                <h6 className="mt-0 mb-3">₪{this.props.donationAmount}</h6>
            </div>

    </Card>
      }
}