require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const { ApolloGateway } = require("@apollo/gateway");

const { PORT_GATEWAY, PORT_METAMODEL, PORT_CONFIGURATION } = process.env;
console.log(PORT_METAMODEL);

const gateway = new ApolloGateway({
  serviceList: [
    { name: "metamodel", url: `http://localhost:${PORT_METAMODEL}` },
    { name: "configuration", url: `http://localhost:${PORT_CONFIGURATION}` },
  ],
});

const server = new ApolloServer({
  gateway,
  introspection: true,
  subscriptions: false,
});

server.listen({ port: PORT_GATEWAY }).then(({ url }) => {
  console.log(`
    Server ready at ${url}
    Query at https://studio.apollographql.com/dev
    `);
});
