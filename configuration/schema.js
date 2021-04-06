const { gql } = require("apollo-server");

const typeDefs = gql`
  enum ROLE {
    PLANNER
    PROCESSOR
  }

  type Company {
    id: ID!
    name: String!
    demands: [Demand!]
  }

  extend type Demand @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    company(id: ID!): Company
    companies: [Company]
  }
`;

module.exports = typeDefs;
