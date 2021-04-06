const { GraphQLScalarType, Kind } = require("graphql");
const fetch = require("node-fetch");

const { API_URL } = process.env;

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    // console.log("serialize", value);
    return new Date();
    // return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  // parseValue(value) {
  //   console.log("value", value);
  //   return new Date(value); // Convert incoming integer to Date
  // },
  // parseLiteral(ast) {
  //   console.log("literal", ast);
  //   if (ast.kind === Kind.Date) {
  //     return parseInt(ast.value, 10); // Convert hard-coded AST string to type expected by parseValue
  //   }
  //   return new Date(); // Invalid hard-coded value (not an integer)
  // },
});

module.exports = {
  Date: dateScalar,

  Attribute: {
    editable(attribute, { status }) {
      console.log(status);
      return !!status === status ? status : attribute.editable;
    },
  },
  Product: {
    async demands(module) {
      // return fetch(`${API_URL}/demands/${module.demand}`).then((res) =>
      //   res.json()
      // );

      const res = await fetch(`${API_URL}/demands`);
      const demands = await res.json();

      return demands.filter(({ id }) => module.demands.includes(id));
    },
  },
  Demand: {
    async attributes(module) {
      const res = await fetch(`${API_URL}/attributes`);
      const attributes = await res.json();

      return attributes.filter(({ id }) => module.attributes.includes(id));
    },
    product(module) {
      return fetch(`${API_URL}/products/${module.product}`).then((res) =>
        res.json()
      );
    },

    __resolveReference(ref) {
      return fetch(`${API_URL}/demands/${ref.id}`).then((res) => res.json());
    },
  },

  Query: {
    attribute(_, { id }) {
      return fetch(`${API_URL}/attributes/${id}`).then((res) => res.json());
    },
    attributes() {
      return fetch(`${API_URL}/attributes`).then((res) => res.json());
    },

    product(_, { id }) {
      return fetch(`${API_URL}/products/${id}`).then((res) => res.json());
    },
    products() {
      return fetch(`${API_URL}/products`).then((res) => res.json());
    },

    demand(_, { id }) {
      return fetch(`${API_URL}/demands/${id}`).then((res) => res.json());
    },
    demands() {
      return fetch(`${API_URL}/demands`).then((res) => res.json());
    },
  },
};
