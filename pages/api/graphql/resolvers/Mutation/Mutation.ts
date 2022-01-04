import { postResolvers} from "./Post";
import { authResolvers } from "./auth";

export const Mutation = {
	...postResolvers,
	...authResolvers,
};
