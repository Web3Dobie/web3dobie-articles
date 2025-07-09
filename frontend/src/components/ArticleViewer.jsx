import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import './ArticleViewer.css';

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
    <div className="article-viewer-wrapper">
        <div className="article-viewer">
        <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
            ← Back to Articles
        </button>
        {error && <p style={{ color: "crimson" }}>{error}</p>}
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
            img: ({ node, ...props }) => <img {...props} alt={props.alt || ""} />
            }}
        >
            {content}
        </ReactMarkdown>
        </div>
    </div>
    );

};

export default ArticleViewer;
 // force redeploy