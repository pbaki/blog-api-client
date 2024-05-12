import { useEffect, useState } from "react";
import "../blogpost.css";

export default function Postblogpost() {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    body: "",
  });
  const [serverResponse, setServerResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://blogapi22.adaptable.app/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setServerResponse(
        data.success === true ? (
          <p className="serverResponseBad">
            {"Success - Created new post with titie: " + data.blogpost.title}
          </p>
        ) : (
          <p className="serverResponseGood">Error: {data.error}</p>
        )
      );
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="authors"
          placeholder="Authors"
          value={formData.authors}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {serverResponse && <div>{serverResponse}</div>}
    </div>
  );
}
