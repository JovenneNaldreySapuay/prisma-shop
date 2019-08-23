const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const db = require('./db');

// Create the GraphQL Yoga Server
function createServer() {  
  //console.log("CREATE_SERVER.js", { Query } );

  return new GraphQLServer({
    // typeDefs: 'src/schema.graphql',
    typeDefs: 'src/generated/prisma.graphql',
    resolvers: {
      Query,
      Mutation
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
    // ctx args in Query-js.txt is linking from this file
    // so, ctx.db.query.user is connecting to my Graphql server
    // ctx === context
    context: req => ({ 
      ...req, 
      db 
    }),
  });
}

module.exports = createServer;
