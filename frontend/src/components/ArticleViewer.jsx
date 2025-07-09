import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ArticleViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://w3d-articles-server-gfdbe9aqfbd2gceu.swedencentral-01.azurewebsites.net/api/articles")
      .then(res => res.json())
      .then(data => {
        const article = data.find(a => a.id === id);
        if (!article?.file) {
          setError("⚠️ Article file not found.");
          return;
        }

        fetch(article.file)
          .then(res => res.text())
          .then(setContent)
          .catch(() => setError("⚠️ Failed to load markdown content."));
      })
      .catch(() => setError("⚠️ Failed to load article list."));
  }, [id]);

  return (
    <div className="article-viewer" style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
        ← Back to Articles
      </button>
      {error ? (
        <p style={{ color: "crimson" }}>{error}</p>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      )}
    </div>
  );
};

export default ArticleViewer;
