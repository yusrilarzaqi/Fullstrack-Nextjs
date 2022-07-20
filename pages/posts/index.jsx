import React, { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/Nav";

export async function getServerSideProps(context) {
  const token = await authPage(context);
  const postsRequest = await fetch("http://127.0.0.1:3000/api/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const posts = await postsRequest.json();
  return {
    props: {
      posts: posts.data,
      token,
    },
  };
}

export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);

  async function deleteHandler(id, event) {
    event.preventDefault();
    const { title } = props.posts.filter((post) => post.id == id)[0];
    const ask = confirm(`Apakah data dengan judul ${title} akan dihapus?`);
    if (ask) {
      const deletePost = await fetch(`/api/posts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${props.token}`,
        },
      });
      const response = await deletePost.json();
      const deleted = posts.filter((post) => post.id !== id);
      setPosts(deleted);
      return alert(`${title} ${response.message}`);
    }
  }

  function editHandler(id, event) {
    Router.push(`/posts/edit/${id}`);
  }

  return (
    <>
      <Nav />
      <div className="jumbotron">
        <h1 className="display-4">Data Berita</h1>
      </div>
      <div className="container">
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} v className="col-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">Judul : {post.title}</h2>
                  <div className="card-subtitle">
                    <time>
                      Created At:{" "}
                      {new Date(post.created_at).toLocaleTimeString()}
                    </time>
                    <br />
                    <time>
                      Updated At:{" "}
                      {new Date(post.updated_at).toLocaleTimeString()}
                    </time>
                  </div>

                  <p className="card-text">Berita : {post.content}</p>
                  <div>
                    <button
                      onClick={editHandler.bind(this, post.id)}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                    <button
                      onClick={deleteHandler.bind(this, post.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
