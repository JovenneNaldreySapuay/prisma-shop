const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),

  async me(parent, args, ctx, info) {

    if (!ctx.request.userId) {
      throw new Error('You must be logged in.');
    }

    return ctx.db.query.user(
      { where: { id: ctx.request.userId } }, info
    );
  },  
  async users(parent, args, ctx, info) {
    // 1. Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in.');
    }
    console.log("users()", ctx.request.userId);

    // 2. Check if the user has the permissions
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

    // 3. Query all the users
    return ctx.db.query.users({}, info);
  }
};

module.exports = Query;
