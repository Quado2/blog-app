import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
	type Query {
		posts: [Post]
	}

  type Mutation{
    postCreate(post: PostInput!):PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
    profile: Profile!
    posts: [Post!]!
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type PostPayload{
    userErrors: [UserError!]!
    post: Post
  }

  type UserError{
    message: String!
  }

  input PostInput{
    title: String
    content: String
  }

`;

