import { Context, UserInput, UserPayload } from "../../../interfaces"
import validator from 'validator'
export const authResolvers ={
  signup: async (_:any, {user}:{user:UserInput}, {prisma}:Context): Promise<UserPayload> => {
    const {name, email, bio, password} = user;
    
    const isEmail = validator.isEmail(email)

    if(!isEmail){
      return{
        userErrors: [{
          message: "Invalid Email"
        }],
        user: null
      }
    }

    const isValidPassword = validator.isLength(password, {
      min: 5
    })
    if(!isValidPassword){
      return{
        userErrors: [{
          message: "Invalid Password"
        }],
        user: null
      }
    }

    if(!name || !bio){
      return{
        userErrors: [{
          message: "Invalid name or bio"
        }],
        user: null
      }
    }

    return null
  }
}