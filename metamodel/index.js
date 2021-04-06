require("dotenv").config();

const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  introspection: true,
  playground: true,
});

server.listen({ port: process.env.PORT_METAMODEL }).then(({ url }) => {
  console.log(`Metamodel service ready at ${url}`);
});
