const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const createServer = require('./createServer');
const db = require('./db');

const server = createServer();
server.express.use(cookieParser());

// decode the JWT so we can get the user Id on each request
server.express.use((req, res, next) => {
  console.log("REQUEST in index.js", req );
  const { token } = req.cookies;
  console.log("TOKEN in index.js:", token );

  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }
  next();
});

// console.log("APP_SECRET= ", process.env.APP_SECRET );
// console.log("FRONTEND_URL= ", process.env.FRONTEND_URL );

// 2. Create a middleware that populates the user on each request

// READ Docs Here about server.express.use() MIDDLEWARE !
// npmjs.com/package/graphql-yoga#how-to-eject-from-the-standard-express-setup

server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, email, name }'
  );
  req.user = user;
  console.log("SERVER.EXPRESS.USE", user );
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    // console.log("Deets:", deets );
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);

