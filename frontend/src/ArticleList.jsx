import React, { useEffect, useState } from "react";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://w3d-articles-server-gfdbe9aqfbd2gceu.swedencentral-01.azurewebsites.net/api/articles")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API fetch failed");
        }
        return res.json();
      })
      .then((data) => setArticles(data))
      .catch((err) => {
        console.error("❌ Error fetching articles:", err);
        setError("Failed to fetch articles.");
      });
  }, []);


  return (
    <div>
      <h2>📚 Articles from Notion</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.properties?.Title?.title?.[0]?.text?.content || "Untitled"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
