const { gql } = require("apollo-server-express");

const GuaranteeTypes = gql`
  type Guarantee {
    id: String!
    userId: String!
    locationId: String!
    isExpired: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type GuaranteeInput {
    userId: String!
    locationId: String!
  }

  extend type Mutation {
    createGuarantee(guarantee: GuaranteeInput!): Guarantee!
  }

  extend type Query {
    getGuarantees: [Guarantee]!
  }
`;

const GuaranteeResolvers = {
  Guarantee: {
    getGuarantees: () => Guarantee.findAll(),
  },
};

module.exports = {
  GuaranteeTypes,
  GuaranteeResolvers,
};
