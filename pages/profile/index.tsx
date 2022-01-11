import React from "react";

import AddPostModal from "../../components/AddPostModal/AddPostModal";
import Post from "../../components/Post/Post";

export default function Profile() {
  const  id  = 3

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
