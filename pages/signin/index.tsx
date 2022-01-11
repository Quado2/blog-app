import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import {gql} from '@apollo/client';
import client from '../../apollo-client'

export default function Signin({posts}:{posts:any}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {};

  const [error, setError] = useState(null);

  console.log(posts)

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <button onClick={handleClick}>Signin</button>
      </Form>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        title
        user{
          name
          email
        }
      }
    `,
  });

  return {
    props: {
      posts: data.countries.slice(0, 4),
    },
 };
}
