const user = (parent, args, context, info) =>
  context.db.query.user({
    where: { id: parent.user.id }
  }, info);

export default { user };
