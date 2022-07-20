import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";

export async function getServerSideProps(context) {
  const token = await authPage(context);
  return {
    props: {
      token,
    },
  };
}
export default function PostCreate({ token }) {
  const [fields, setField] = useState({
    title: "",
    content: "",
  });
  const [status, setStatus] = useState("Normal");
  async function handler(event) {
    event.preventDefault();
    setStatus("loading");
    const request = await fetch("/api/posts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(fields),
    });
    const { message } = await request.json();
    setStatus(message);
    Router.push("/posts");
  }

  function fieldHandler(event) {
    const target = event.target;
    setField({
      ...fields,
      [target.getAttribute("name")]: target.value,
    });
  }

  return (
    <>
      <Nav />
      <div className="jumbotron">
        <h1 className="display-4">Create a Post</h1>
      </div>
      <div className="container">
        <form onSubmit={handler.bind(this)}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              required
              name="title"
              placeholder="Title"
              type="text"
              onChange={fieldHandler.bind(this)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              required
              name="content"
              placeholder="Content"
              type="text"
              onChange={fieldHandler.bind(this)}
              className="form-control"
            />
          </div>
          {status && <p className="form-text text-muted">Status : {status}</p>}
          <button className="btn btn-block btn-primary" type="submit">
            Create a post
          </button>
        </form>
      </div>

      <br />
    </>
  );
}
