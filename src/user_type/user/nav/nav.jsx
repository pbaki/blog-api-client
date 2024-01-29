import { useState } from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function Nav() {
  return (
    <div className="Navigation">
      <Link className="navHomepage" to="/">
        Homepage
      </Link>

      <Link className="navPosts" to="/blogposts">
        Blogposts
      </Link>

      <Link className="navLogin" to="/login">
        Login
      </Link>
    </div>
  );
}

export default Nav;
