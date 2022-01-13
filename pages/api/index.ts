import { ApolloServer,} from "apollo-server-micro";
import Cors from "micro-cors";

import { Context } from "./interfaces";
import {typeDefs} from './graphql/schema'
import {Query,Mutation, Profile, User,Post} from './graphql/resolvers';
import prisma from '../../lib/prisma'
import { getUserFromToken } from "./utils/getUserFromToken";

const cors = Cors();

const server = new ApolloServer({
	typeDefs,
	resolvers:{
    Query,
    Mutation,
		Profile,
		User,
		Post,
		
  },
  context: async ({req}:any): Promise<Context> => {
		const token =  req.headers.authorization
		const userInfo = await getUserFromToken(token)
		
		return {
			prisma,
			userInfo,
		}
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
