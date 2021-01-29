const { gql } = require("apollo-server-express");

module.exports = gql`
  type Location {
    id: String!
    name: String!
    address: String!
    numberofSlots: Int
    createdAt: String!
    updatedAt: String!
  }

  input LocationInput {
    name: String!
    address: String!
    numberofSlots: Int
  }

  type Mutation {
    createLocation(model: LocationInput!): Location!
    createSlot(model: SlotInput!): Slot!
    createAccount(model: UserInput!): User!
    createWaitlist(model: WaitlistInput!): Waitlist!
    unreserveSlot(id: String!): Boolean!
    slotToReserveRequest(userId: String!, slotId: String!): Slot
    deleteWaitlist(id: String!): Boolean!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    age: Int!
    password: String!
    phoneNumber: String!
  }

  type User {
    id: String!
    firstName: String!
    lastName: String!
    age: Int!
    password: String!
    phoneNumber: String!
    createdAt: String!
    updatedAt: String!
  }

  type Slot {
    id: String!
    day: String!
    locationId: String!
    isReserved: Boolean!
    userId: String!
    createdAt: String!
    updatedAt: String!
  }

  input SlotInput {
    locationId: String!
    isReserved: Boolean!
    userId: String
  }

  type SlotsByLocation {
    location: Location!
    availableSlots: Int
    pendingGuarantees: Int
    pendingWaitlists: Int
    slots: [Slot]!
  }

  type Waitlist {
    id: String!
    userId: String!
    day: String!
    locationId: String!
    createdAt: String!
    updatedAt: String!
  }

  input WaitlistInput {
    userId: String!
    locationId: String!
  }

  type Query {
    helloWorld: String!
    getGuaranteeByPk(id: String!): Guarantee
    getUsers: [User]!
    getUserByPk(id: String!): User
    getWaitlists: [Waitlist]!
    getSlots: [Slot]!
    getSlotByPk(id: String!): Slot
    getLocationSlots(id: String!): SlotsByLocation
    getGuaranteeSlots(guaranteeId: String!): SlotsByLocation
  }
`;
