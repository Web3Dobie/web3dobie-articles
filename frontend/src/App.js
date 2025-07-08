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

  const categories = [...new Set(articles.map(a =>
    a.properties?.Category?.select?.name).filter(Boolean)
  )];

  const simplifiedArticles = articles.map(article => ({
    id: article.id,
    title: article.properties?.Headline?.title?.[0]?.text?.content,
    summary: article.properties?.Summary?.rich_text?.[0]?.text?.content,
    category: article.properties?.Category?.select?.name,
    date: article.properties?.Date?.date?.start,
    file: article.properties?.File?.url,
    tweet: article.properties?.Tweet?.url,
  }));

  return (
    <div>
      <h1>Web3Dobie Articles</h1>
      <FilterPanel categories={categories} selected={filter} onChange={setFilter} />
      <ArticleGrid articles={simplifiedArticles} filter={filter} />
    </div>
  );
}

export default App;
