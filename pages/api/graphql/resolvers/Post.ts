import { PostParent, Context, } from "../../interfaces"
import {userLoader} from '../loaders/userLoader'

export const Post = {
  user: (parent:PostParent,_:any, {prisma, userInfo}:Context) => {
    const {authorId} = parent;
    return userLoader.load(Number(authorId))
  }
}