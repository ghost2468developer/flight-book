import Amadeus from 'amadeus'

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY || 'YOUR_API_KEY',
  clientSecret: process.env.AMADEUS_API_SECRET || 'YOUR_API_SECRET'
})

export const resolvers = {
  Mutation: {
    bookFlight: async (_: any, args: any) => {
      const { origin, destination, departureDate, travelers } = args

      try {
        const flightOffersResponse = await amadeus.shopping.flightOffersSearch.get({
          originLocationCode: origin,
          destinationLocationCode: destination,
          departureDate: departureDate,
          adults: travelers.length.toString()
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
              travelers: travelers.map((traveler: any) => ({
                id: traveler.id,
                dateOfBirth: traveler.dateOfBirth,
                name: {
                  firstName: traveler.firstName,
                  lastName: traveler.lastName
                },
                gender: traveler.gender,
                contact: {
                  emailAddress: traveler.emailAddress,
                  phones: [{
                    deviceType: 'MOBILE',
                    countryCallingCode: traveler.countryCallingCode,
                    number: traveler.phoneNumber
                  }]
                },
                documents: [{
                  documentType: traveler.documentType,
                  birthPlace: traveler.birthPlace,
                  issuanceLocation: traveler.issuanceLocation,
                  issuanceDate: traveler.issuanceDate,
                  number: traveler.number,
                  expiryDate: traveler.expiryDate,
                  issuanceCountry: traveler.issuanceCountry,
                  validityCountry: traveler.validityCountry,
                  nationality: traveler.nationality,
                  holder: traveler.holder
                }]
              }))
            }
          })
        )

        return {
          id: bookingResponse.data.id,
          flightOffers: bookingResponse.data.flightOffers
        }
      } catch (error) {
        console.error(error);
        throw new Error('Failed to book flight')
      }
    }
  }
}
