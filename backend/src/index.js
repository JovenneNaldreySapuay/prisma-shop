const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const createServer = require('./createServer');
const db = require('./db');
require('dotenv').config();

const server = createServer();

server.express.use(cookieParser());

// get cookies
server.express.use((req, res, next) => {
  const { token } = req.cookies;
 
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

server.express.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, email, name }'
  );
  req.user = user;
  
  next();
});

server.start(
  {
    cors: {
      port: 4000,
      credentials: true,
      origin: process.env.FRONTEND_URL
    },
  },
  serve => {
    console.log(`Server is running on http://localhost:${serve.port}`);
  }
);

