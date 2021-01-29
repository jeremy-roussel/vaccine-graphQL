const { gql } = require("apollo-server-express");

const LocationTypes = gql`
  type Location {
    id: String!
    name: String!
    address: String!
    numberofSlots: Int
    createdAt: String!
    updatedAt: String!
  }

  type LocationInput {
    name: String!
    address: String!
    numberofSlots: Int
  }

  type Mutation {
    createLocation(model: LocationInput!): Location!
  }

  type Query {
    getLocationSlots(id: String!): SlotsByLocation
  }

  type SlotsByLocation {
    _empty: null
  }
`;

// const LocationResolvers = {
//   Location: {
//     getLocations: () => Location.findAll(),
//   },
// };

module.exports = {
  LocationTypes,
};
