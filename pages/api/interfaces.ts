import { Post, Prisma, PrismaClient } from "@prisma/client";
import { introspectionFromSchema } from "graphql";

export interface UserInput {
	name: string;
	email: string;
	password: string;
	bio: string;
}
export interface CredentialsInput{
	email: string
	password: string
	}

export interface UserPayload{
  userErrors:{
    message: string,
  }[];
  token : string | null;
}


export interface Context {
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	>;
}

export interface PostArgs {
	post: {
		title?: string;
		content?: string;
	};
}

export interface PostPayloadType {
	userErrors: {
		message: string;
	}[];
	post: Post | null | Prisma.Prisma__PostClient<Post>;
}
