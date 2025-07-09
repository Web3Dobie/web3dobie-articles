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
    <div className="article-viewer-wrapper" style={{ display: "flex", justifyContent: "center" }}>
        <div className="article-viewer" style={{ maxWidth: "960px", padding: "2rem" }}>
        <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
            ← Back to Articles
        </button>
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
            img: ({ node, ...props }) => (
                <img {...props} style={{ maxWidth: "100%", height: "auto", display: "block", margin: "1.5rem auto" }} />
            )
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