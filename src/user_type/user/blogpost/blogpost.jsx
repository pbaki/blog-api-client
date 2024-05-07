import { useEffect, useState } from "react";
import "./blogpost.css";
import moment from "moment";

function Blogpost() {
  return (
    <>
      <BlogpostList />
      <Postblogpost />
    </>
  );
}

function BlogpostList() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://blogapi22.adaptable.app/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="blogpostlist">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : data ? (
        <div className="allPosts">
          {data.map((e, i) => {
            return (
              <div className="singlepost" key={i}>
                <div className="title">{e.title}</div>
                <div className="authors">By: {e.authors.map((a) => a)}</div>
                <div className="creationdate">
                  Last modified:
                  {" " + moment.utc(e.date).format("MM/DD/YYYY")}
                </div>
                <div className="score">
                  <div className="postupvotes">Upvotes: {e.meta.upvotes}</div>
                  <div className="postdownvotes">
                    Downvotes: {e.meta.downvotes}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

function Postblogpost() {
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
          <p className="serverResponse">
            {"Success - Created new post with titie: " + data.blogpost.title}
          </p>
        ) : (
          <p className="serverResponse">{data.error}</p>
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
      {serverResponse && <div>Response: {serverResponse}</div>}
    </div>
  );
}

export default Blogpost;
