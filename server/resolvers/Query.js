const users = (parent, args, context, info) =>
  context.db.query.users({}, info);

const user = (parent, args, context, info) =>
  context.db.query.user({
    where: {
      id: args.id
    }
  }, info);

export default { users, user };
