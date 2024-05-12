import { useEffect, useState } from "react";
import "./blogpost.css";
import BlogpostList from "./blogpost_actions/getListOfAllposts";
import Postblogpost from "./blogpost_actions/addpost";

function Blogpost() {
  return (
    <>
      <BlogpostList />
      <Postblogpost />
    </>
  );
}

export default Blogpost;
