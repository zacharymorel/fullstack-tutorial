// Dependencies
require("dotenv").config();
const { ApolloServer } = require("apollo-server");

// Relative imports
const typeDefs = require("./schema");
const { createStore } = require("./utils");
const resolvers = require("./resolvers");
const LaunchAPI = require("./datasources/launch");
const UserAPI = require("./datasources/user");

const store = createStore();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  }),
});

server.listen().then(() => {
  console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/sandbox
    `);
});
