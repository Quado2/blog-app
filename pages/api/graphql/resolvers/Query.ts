import { Post } from "@prisma/client";
import { Context } from "../../interfaces";

export const Query = {
	posts: (parent: any, args: any, { prisma }: Context) => {
		return prisma.post.findMany({
			orderBy: [
				{
					createdAt: "desc",
				},
			],
		});
	},
};
