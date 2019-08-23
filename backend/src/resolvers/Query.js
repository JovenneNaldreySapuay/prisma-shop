//const { forwardTo } = require('prisma-binding');
//const { hasPermission } = require('../utils');

// Resolver tuts: 
// https://www.prisma.io/tutorials/a-guide-to-common-resolver-patterns-ct08/

const Query = {
  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    // if (!ctx.request.userId) {
    //   throw new Error('You must be logged in, dude!');
    // }
    // console.log(ctx.request.userId);
    // // 2. Check if the user has the permissions to query all the users
    // hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // 2. if they do, query all the users!
    console.log("CONTEXT PARAMS: ", ctx.db.query );

    return ctx.db.query.users({}, info);
  },
};

module.exports = Query;
