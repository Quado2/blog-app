import { ApolloServer,} from "apollo-server-micro";
import Cors from "micro-cors";

import {typeDefs} from './graphql/schema'
import {Query,Mutation} from './graphql/resolvers';
import prisma from '../../lib/prisma'

const cors = Cors();

const server = new ApolloServer({
	typeDefs,
	resolvers:{
    Query,
    Mutation
  },
  context: {
    prisma
  }
});

const startServer = server.start();

export default cors(async function handler(req, res) {
	if (req.method === "OPTIONS") {
		res.end();
		return false;
	}

	await startServer;
	await server.createHandler({
		path: "/api",
	})(req, res);
});

export const config = {
	api: {
		bodyParser: false,
	},
};
