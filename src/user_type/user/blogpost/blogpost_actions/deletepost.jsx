import { useEffect, useState } from "react";
import "../blogpost.css";

export default function Deleteblogpostbutton({ title, ifdelete }) {
  async function deleteRequest() {
    try {
      const response = await fetch(
        "https://blogapi22.adaptable.app/posts/" + title,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        ifdelete();
      }
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <button className="deletePostButton" onClick={deleteRequest}>
      Del
    </button>
  );
}
