import { useEffect, useState } from "react";

function Blogpost() {
  return (
    <>
      <BlogpostList />
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
        <div>
          {data.map((e, i) => {
            return (
              <div className="singlepost" key={i}>
                <div className="title">{e.title}</div>
                <div className="authors">{e.authors.map((a) => a)}</div>
                <div className="creationdate">{e.date}</div>
                <div className="score">
                  <div className="postupvotes">{e.meta.upvotes}</div>
                  <div className="postdownvotes">{e.meta.downvotes}</div>
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
export default Blogpost;
