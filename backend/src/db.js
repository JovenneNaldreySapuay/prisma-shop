// This file connects to the remote 
// prisma DB and gives us the ability to query it with JS
const { Prisma } = require('prisma-binding');
require('dotenv').config();

// this file will connect to the Graphql playground and will
// use the Mutation/Query types inside the `typeDefs` property
// w/c is inside the prisma.graphql 
const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  // secret: process.env.PRISMA_SECRET,
  debug: true
});

//console.log("PRISMA_SECRET=", process.env.PRISMA_SECRET );
//console.log("PRISMA_ENDPOINT=", process.env.PRISMA_ENDPOINT );

module.exports = db;
