import Amadeus from 'amadeus'

const amadeus = new Amadeus({
  clientId: 'YOUR_API_KEY',
  clientSecret: 'YOUR_API_SECRET'
})

async function bookFlight() {
  try {
    const flightOffersResponse = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode: 'MAD',
      destinationLocationCode: 'NYC',
      departureDate: '2020-08-01',
      adults: '1'
    })

    const pricingResponse = await amadeus.shopping.flightOffers.pricing.post(
      JSON.stringify({
        data: {
          type: 'flight-offers-pricing',
          flightOffers: flightOffersResponse.data
        }
      })
    )

    const bookingResponse = await amadeus.booking.flightOrders.post(
      JSON.stringify({
        data: {
          type: 'flight-order',
          flightOffers: [pricingResponse.data.flightOffers[0]],
          travelers: [{
            id: '1',
            dateOfBirth: '1982-01-16',
            name: {
              firstName: 'JORGE',
              lastName: 'GONZALES'
            },
            gender: 'MALE',
            contact: {
              emailAddress: 'jorge.gonzales833@telefonica.es',
              phones: [{
                deviceType: 'MOBILE',
                countryCallingCode: '34',
                number: '480080076'
              }]
            },
            documents: [{
              documentType: 'PASSPORT',
              birthPlace: 'Madrid',
              issuanceLocation: 'Madrid',
              issuanceDate: '2015-04-14',
              number: '00000000',
              expiryDate: '2025-04-14',
              issuanceCountry: 'ES',
              validityCountry: 'ES',
              nationality: 'ES',
              holder: true
            }]
          }]
        }
      })
    )

    console.log(bookingResponse.data)
  } catch (error) {
    console.error(error.code)
  }
}

bookFlight()
