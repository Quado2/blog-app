
import { ProfileParent, Context, } from "../../interfaces"


export const Profile = {
  user: (parent:ProfileParent,_:any, {prisma, userInfo}:Context) => {
    const {id} = parent;
    return prisma.user.findUnique({where:{id: Number(id)}})
  }
}