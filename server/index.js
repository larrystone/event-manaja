import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import dotenv from 'dotenv';

dotenv.config();

const userDetails = `
{
  id
  name
  username
  email
  profileImage
}`;

const resolvers = {
  Query: {
    users: (root, args, context) => context.db.query.users({}, userDetails)
  }
};

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'server/generated/prisma.graphql',
      endpoint: 'http://localhost:4466/eventsmanaja/dev',
      secret: process.env.PRISMA_SECRET,
      debug: true,
    }),
  }),
});

server.start(() => console.log('server running on http://localhost:4000'));
