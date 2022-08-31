export const getAllDonations = () => (
    fetch("https://kehilapo-donations.cn3frn1885r8k.eu-west-3.cs.amazonlightsail.com//api/donations/all")
        .then(res => res.json())
)

export const addDonation = (donation) => (
    fetch("https://kehilapo-donations.cn3frn1885r8k.eu-west-3.cs.amazonlightsail.com//api/donations/donation", {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(donation)
    })
        .then(res => res.json())
)

