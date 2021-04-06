const fetch = require("node-fetch");

const { API_URL } = process.env;

module.exports = {
  Company: {
    demands(company) {
      return company.demands.map((id) => ({ __typename: "Demand", id }));
    },
  },

  Query: {
    company(_, { id }) {
      return fetch(`${API_URL}/companies/${id}`).then((res) => res.json());
    },
    companies() {
      return fetch(`${API_URL}/companies`).then((res) => res.json());
    },
  },
};
