import { UserParent, Context } from "../../interfaces";

export const User = {
	posts: (parent: UserParent, _: any, { prisma, userInfo }: Context) => {
		const { id } = parent;

		if (Number(id) === Number(userInfo?.userId)) {
			return prisma.post.findMany({ where: { authorId: Number(id) } });
		}

		return prisma.post.findMany({
			where: { authorId: Number(id), published: true },
		});
	},
};
