import { Context, PostArgs, PostPayloadType } from "../../../interfaces";

export const postResolvers = {
  postCreate: async (
		parent: any,
		{ post }: PostArgs,
		{ prisma }: Context
	): Promise<PostPayloadType> => {
		const { title, content } = post;
		if (!title || !content) {
			return {
				userErrors: [
					{
						message: "You must provide a title and content",
					},
				],
				post: null,
			};
		}

		return {
			userErrors: [],
			post: prisma.post.create({
				data: {
					title,
					content,
					authorId: 1,
				},
			}),
		};
	},

	postUpdate: async (
		_: any,
		{ postId, post }: { postId: String; post: PostArgs["post"] },
		{ prisma }: Context
	): Promise<PostPayloadType> => {
		const { title, content } = post;

		if (!title && !content) {
			return {
				userErrors: [
					{
						message: "Need to have atleast one of the fields filled",
					},
				],
				post: null,
			};
		}

		const postExist = await prisma.post.findUnique({
			where: {
				id: Number(postId),
			},
		});
		if (!postExist) {
			return {
				userErrors: [
					{
						message: "Post does not exist",
					},
				],
				post: null,
			};
		}

		let payloadToUpdate = {
			title,
			content,
		};

		if (!title) delete payloadToUpdate.title;
		if (!content) delete payloadToUpdate.content;

		return {
			userErrors: [],
			post: prisma.post.update({
				data: {
					...payloadToUpdate,
				},
				where: {
					id: Number(postId),
				},
			}),
		};
	},

  postDelete: async (_:any, {postId}:{postId:String}, {prisma}:Context):Promise<PostPayloadType> => {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      }
    });
    if(!post){
      return{
        userErrors: [
					{
						message: "Post does not exist",
					},
				],
        post: null
      }
    }

    await prisma.post.delete({
      where:{
        id: Number(postId)
      }
    })

    return{
        userErrors:[],
        post
    }
  }
}