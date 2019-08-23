const Mutation = {
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