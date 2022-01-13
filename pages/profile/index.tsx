import React from "react";
import { gql, useQuery } from "@apollo/client";

import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";

const GET_PROFILE = gql`
query getProfile($userId: ID!) {
  profile(userId: $userId) {
    bio
    user {
      name
      posts {
        title
        content
      }
    }
  }
}
`;

export default function Profile() {
	const id = 3;

	const { data, loading, error } = useQuery(GET_PROFILE, {variables: {
    userId: 1
  }});

	console.log({ data, loading, error });

	return (
		<div>
			<div
				style={{
					marginBottom: "2rem",
					display: "flex ",
					justifyContent: "space-between",
				}}
			>
				<div>
					<h1>Profile Name</h1>
					<p>Profile Bio</p>
				</div>
				<div>{"profile" ? <AddPostModal /> : null}</div>
			</div>
			<div></div>
		</div>
	);
}
