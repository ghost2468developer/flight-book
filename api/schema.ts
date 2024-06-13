import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Traveler {
    id: String
    dateOfBirth: String
    firstName: String
    lastName: String
    gender: String
    emailAddress: String
    phoneNumber: String
    countryCallingCode: String
    documentType: String
    birthPlace: String
    issuanceLocation: String
    issuanceDate: String
    number: String
    expiryDate: String
    issuanceCountry: String
    validityCountry: String
    nationality: String
    holder: Boolean
  }

  type FlightOrder {
    id: String
    flightOffers: [String]
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    bookFlight(
      origin: String!
      destination: String!
      departureDate: String!
      travelers: [TravelerInput!]!
    ): FlightOrder
  }

  input TravelerInput {
    id: String
    dateOfBirth: String
    firstName: String
    lastName: String
    gender: String
    emailAddress: String
    phoneNumber: String
    countryCallingCode: String
    documentType: String
    birthPlace: String
    issuanceLocation: String
    issuanceDate: String
    number: String
    expiryDate: String
    issuanceCountry: String
    validityCountry: String
    nationality: String
    holder: Boolean
  }
`
