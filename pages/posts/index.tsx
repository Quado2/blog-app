import React from "react";
import Post from "../../components/Post/Post";
import { gql, useQuery } from "@apollo/client";
import client from "../../apollo-client";

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
  let loadedData, loading, error
	async function getData() {
		const { data, loading, error } = await client.query({
			query: GET_POSTS,
		});
    loadedData = data

	}

  getData();
  console.log({loadedData})



	return <div></div>;
};

export default Posts;
