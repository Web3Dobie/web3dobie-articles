import { Link } from "react-router-dom"; // ✅ Import at the top

const ArticleCard = ({ article }) => {
  const title = article.headline || "Untitled";
  const date = new Date(article.date);
  const displayDate = isNaN(date) ? "No date" : date.toLocaleDateString();

  console.log("🔍 Article:", article);

  return (
    <div className="article-card">
      <h3>
        {article.file ? (
          <Link to={`/article/${article.id}`} className="article-link">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p>{article.summary || "No summary available"}</p>
      <small>{displayDate}</small>
    </div>
  );
};

export default ArticleCard;

