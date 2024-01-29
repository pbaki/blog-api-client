import { useState } from "react";
import "./nav.css";

function Nav() {
  return (
    <div className="Navigation">
      <div className="navHomepage">Homepage</div>
      <div className="navPosts">Blog Posts</div>
      <div className="navLogin">Login</div>
    </div>
  );
}

export default Nav;
