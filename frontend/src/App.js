import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import FilterPanel from "./components/FilterPanel";
import ArticleGrid from "./components/ArticleGrid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleViewer from "./components/ArticleViewer";

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
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Header />
        <main className="max-w-4xl mx-auto px-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FilterPanel categories={categories} selected={filter} onChange={setFilter} />
                  <ArticleGrid articles={articles} filter={filter} />
                </>
              }
            />
            <Route path="/article/:id" element={<ArticleViewer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
