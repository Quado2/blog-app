import { Post, Prisma, PrismaClient, User } from "@prisma/client";
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
	userInfo: {
		userId: number | null,
	} | null
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

export interface ProfileParent {
	id: string;
	bio: string;
	user:User
}

export interface UserParent {
	id: string;
}

export interface PostParent{
	authorId: string
}
