import {Context, PostCreateArgs, PostPayloadType} from '../../interfaces'

export const Mutation = {
  postCreate: async (parent: any, {title, content}: PostCreateArgs, {prisma}:Context): Promise<PostPayloadType> => {
    
    if(!title || !content){
      return{
        userErrors: [{
          message: "You must provide a title and content",
        }],
        post: null
      }
    }
    
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1
      }
    })

    return {
      userErrors: [],
      post
    }
  },
}