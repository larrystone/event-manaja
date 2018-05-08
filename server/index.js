import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';
import dotenv from 'dotenv';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import AuthPayload from './resolvers/AuthPayload';

dotenv.config();

const resolvers = {
  Query,
  Mutation,
  AuthPayload
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
