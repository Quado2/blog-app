import { ApolloServer,} from "apollo-server-micro";
import Cors from "micro-cors";

import {typeDefs} from './graphql/schema'
import {Query} from './graphql/resolvers'

const cors = Cors();

const server = new ApolloServer({
	typeDefs,
	resolvers:{
    Query
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
