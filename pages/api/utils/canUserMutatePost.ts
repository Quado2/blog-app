import { PrismaClient, Prisma } from "@prisma/client";

export const canUserMutatePost = async (
	{
		postId, userId, prisma
	}:{
	postId: number,
	userId: number,
	prisma: PrismaClient<
		Prisma.PrismaClientOptions,
		never,
		Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
	>}
): Promise<Boolean> => {
	const post = await prisma.post.findUnique({where: {
		id: postId
	}})

	console.log(post?.authorId, userId)

	if(Number(post?.authorId) === userId){
		return true
	} else{
		return false
	}
};
