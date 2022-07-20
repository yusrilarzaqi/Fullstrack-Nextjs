import Cookies from "js-cookie";
import Router from "next/router";
import Link from "next/link";

export default function Nav() {
  function logoutHandler(event) {
    event.preventDefault();
    Cookies.remove("token");
    Router.replace("/auth/login");
  }

  return (
    <nav>
      <ul>
        <li>
          <Link href="/posts">
            <a>Posts</a>
          </Link>
        </li>
        <li>
          <Link href="/posts/create">
            <a>Create</a>
          </Link>
        </li>
        <li style={{ float: "right" }}>
          <Link href="#">
            <a
              className="btn btn-outline-danger mt-2"
              onClick={logoutHandler.bind(this)}
            >
              Logout
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
