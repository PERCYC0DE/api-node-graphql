// Dependency that creates a server
const { ApolloServer } = require('@apollo/server');

// Playground included in @apollo/server
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('@apollo/server/plugin/landingPage/default');

// Express middleware also in @apollo/server
const { expressMiddleware } = require('@apollo/server/express4');

const { buildContext } = require('graphql-passport');

const { loadFiles } = require('@graphql-tools/load-files');
const resolvers = require('./resolvers'); // Importing resolvers

const {
  typeDefs: scalarsTypeDefs,
  resolvers: scalarsResolvers,
} = require('graphql-scalars');

// CREATE SERVER GRAPHQL
const useGraphQL = async (app) => {
  const typeDefs = [
    ...(await loadFiles('./src/**/*.graphql')),
    scalarsTypeDefs,
  ];
  const allResolvers = [resolvers, scalarsResolvers];

  const server = new ApolloServer({
    typeDefs,
    resolvers: allResolvers,
    // context: ({ req, res }) => buildContext({ req, res }),
    playground: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault],
  });

  await server.start();

  // Using the middleware in Express
  app.use(
    expressMiddleware(server, {
      context: async ({ req, res }) => buildContext({ req, res }),
      // token: req.headers.token,
    })
  );
};

module.exports = useGraphQL;
