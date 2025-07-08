import React, { useEffect, useState } from "react";
import ArticleGrid from "./components/ArticleGrid";
import FilterPanel from "./components/FilterPanel";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetch("https://w3d-articles-server-gfdbe9aqfbd2gceu.swedencentral-01.azurewebsites.net/api/articles")
      .then(res => res.json())
      .then(data => {
        setArticles(
          data.filter(a => a.status !== "Draft") // Optional: skip drafts
        );
      })
      .catch(err => console.error("Fetch failed:", err));
  }, []);


  const filtered = category
    ? articles.filter(a => a.category === category)
    : articles;

  const categories = [...new Set(articles.map(a => a.category).filter(Boolean))];

  return (
    <div className="app">
      <h1>Web3Dobie Articles</h1>
      <FilterPanel categories={categories} selected={category} onChange={setCategory} />
      <ArticleGrid articles={filtered} />
    </div>
  );
};

export default App;
