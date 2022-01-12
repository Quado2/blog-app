import React from "react";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";


const GET_POSTS = gql`
	query {
		posts {
			title
			user {
				name
				email
			}
		}
	}
`;

const Posts = () => {
 const {data, error, loading} = useQuery(GET_POSTS)
  console.log({data, error, loading})



	return <div></div>;
};

export default Posts;
