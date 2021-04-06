const { gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  type Attribute @key(fields: "id") {
    id: ID!
    name: String!
    editable(status: Boolean! = false): Boolean
  }

  type Product {
    id: ID!
    description: String!
    demands: [Demand!]
  }

  type Demand @key(fields: "id") {
    id: ID!
    name: String!
    attributes: [Attribute!]!
    product: Product
    quantity: Float
    dueDate: Date
  }

  # type Actions {
  #   id: ID!
  #   name: String!
  # }

  extend type Query {
    attribute(id: ID!): Attribute
    attributes: [Attribute]

    product(id: ID!): Product
    products: [Product]

    demand(id: ID!): Demand
    demands: [Demand]
  }
`;

module.exports = typeDefs;
