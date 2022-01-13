import { Context, PostArgs, PostPayloadType } from "../../../interfaces";
import { canUserMutatePost } from "../../../utils/canUserMutatePost";

export const postResolvers = {
	postCreate: async (
		parent: any,
		{ post }: PostArgs,
		{ prisma, userInfo }: Context
	): Promise<PostPayloadType> => {
		if (!userInfo) {
			return {
				userErrors: [
					{
						message: "Forbidden ! (you are not authorized)",
					},
				],
				post: null,
			};
		}

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
					authorId: userInfo.userId as number,
				},
			}),
		};
	},

	postUpdate: async (
		_: any,
		{ postId, post }: { postId: String; post: PostArgs["post"] },
		{ prisma, userInfo }: Context
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

		//Does post exist??
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
		console.log(userInfo);

		//Check if user can update
		const canUser = await canUserMutatePost({
			postId: Number(postId),
			userId: Number(userInfo?.userId),
			prisma,
		});
		console.log(canUser);
		if (!canUser) {
			return {
				userErrors: [
					{
						message: "Unauthorised to Edit the post",
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

	postDelete: async (
		_: any,
		{ postId }: { postId: String },
		{ prisma, userInfo }: Context
	): Promise<PostPayloadType> => {
		//Check if post exists
		const post = await prisma.post.findUnique({
			where: {
				id: Number(postId),
			},
		});
		if (!post) {
			return {
				userErrors: [
					{
						message: "Post does not exist",
					},
				],
				post: null,
			};
		}

		//Check if user can delete
		const canUser = await canUserMutatePost({
			postId: Number(postId),
			userId: Number(userInfo?.userId),
			prisma,
		});
		console.log(canUser);
		if (!canUser) {
			return {
				userErrors: [
					{
						message: "Unauthorised to Delete this post",
					},
				],
				post: null,
			};
		}

		await prisma.post.delete({
			where: {
				id: Number(postId),
			},
		});

		return {
			userErrors: [],
			post,
		};
	},

	postPublish: async (
		_: any,
		{ postId, shouldPublish }: { postId: string; shouldPublish: Boolean },
		{ prisma, userInfo }: Context
	): Promise<PostPayloadType> => {
		//Does post exist??
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
		console.log(userInfo);

		//Check if user can update
		const canUser = await canUserMutatePost({
			postId: Number(postId),
			userId: Number(userInfo?.userId),
			prisma,
		});
		console.log(canUser);
		if (!canUser) {
			return {
				userErrors: [
					{
						message: "Unauthorised to Edit the post",
					},
				],
				post: null,
			};
		}

		return {
			userErrors: [],
			post: prisma.post.update({
				where: {
					id: Number(postId),
				},
				data: {
					published: shouldPublish ? true: false
				}
			}),
		};
	},
};
