import { Post, Profile } from "@prisma/client";
import { SingletonRouter } from "next/router";
import { Context } from "../../interfaces";

export const Query = {
	me:(
		_:any,__:any, {userInfo,prisma}:Context
	) => {
		if(!userInfo) return null;
		return prisma.user.findUnique({where:{
			id: Number(userInfo?.userId)
		}})
	},

	profile: (parent:any, {userId}:{userId:string}, {prisma}:Context)=> {
		if(!userId){
			return null
		}

		return prisma.profile.findUnique({where:{userId:Number(userId)}})
	},

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
