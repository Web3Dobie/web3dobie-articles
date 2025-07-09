import { useEffect, useState } from "react";
import ArticleGrid from "./components/ArticleGrid";
import FilterPanel from "./components/FilterPanel";

function App() {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch("https://w3d-articles-server-gfdbe9aqfbd2gceu.swedencentral-01.azurewebsites.net/api/articles")
      .then(res => res.json())
      .then(setArticles)
      .catch(err => console.error("Failed to fetch articles:", err));
  }, []);

  const categories = [...new Set(articles.map(a => a.category).filter(Boolean))];

  return (
    <div>
      <h1>Web3Dobie Articles</h1>
      <FilterPanel categories={categories} selected={filter} onChange={setFilter} />
      <ArticleGrid articles={articles} filter={filter} />
    </div>
  );
}

export default App;
