import { Post, Prisma, PrismaClient,  } from "@prisma/client";
import { introspectionFromSchema } from "graphql";

export interface Context {
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	>;
}

export interface PostArgs {
	post: {
		title ?: string;
		content ?: string;
	};
}

export interface PostPayloadType {
	userErrors: {
		message: string;
	}[];
	post: Post | null | Prisma.Prisma__PostClient<Post>;
}
