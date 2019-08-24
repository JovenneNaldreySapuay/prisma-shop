const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Mutation = {
  async signup(parent, args, ctx, info) {
    // lowercase their email
    // console.log("Mutations.js", parent, args, ctx, info );
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password
        },
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    console.log("JWT Token:", token );
    // We set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    // Finalllllly we return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const password = await bcrypt.compare(password, user.password);
    if (!password) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    console.log("SIGN-IN", token, user );

    return user;
  },
	async createUser(parent, args, ctx, info) {
	
	console.log("ARGUMENTS?", args );
    
    // if (!ctx.request.userId) {
    //   throw new Error('You must be logged in to do that!');
    // }

    const user = await ctx.db.mutation.createUser(
      {
        data: {
        	...args
        }
      },
      info
    );

    console.log("User value:", user);

    return user;
  },
}

module.exports = Mutation;