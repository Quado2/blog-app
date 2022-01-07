import { Context, UserInput, UserPayload, CredentialsInput } from "../../../interfaces"
import validator from 'validator'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import { JSON_SIGNATURE } from "../../sginature"

export const authResolvers ={
  signup: async (_:any, {user}:{user:UserInput}, {prisma}:Context): Promise<UserPayload> => {
    const {name, email, bio, password} = user;
    
    const isEmail = validator.isEmail(email)

    if(!isEmail){
      return{
        userErrors: [{
          message: "Invalid Email"
        }],
        token: null
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
        token: null
      }
    }

    

    if(!name || !bio){
      return{
        userErrors: [{
          message: "Invalid name or bio"
        }],
        token: null
      }
    }

    const hashedPassword = await bcrypt.hash(password,6)

    const newUser = await prisma.user.create({
      data: {
        email,
         name,
         password: hashedPassword
      }
    })

    await prisma.profile.create({
      data: {
        bio,
        userId: newUser.id
      }
    })

    const token = await JWT.sign({
      id: newUser.id,
      email: newUser.email
    }, JSON_SIGNATURE, {expiresIn: "3600000"} )

    return{
      userErrors: [],
      token
    }
  },

  signin: (_:any,{credentials}:{credentials:CredentialsInput}, {prisma}:Context)=> {

  }
}