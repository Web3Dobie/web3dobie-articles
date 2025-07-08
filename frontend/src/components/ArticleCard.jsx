const ArticleCard = ({ article }) => {
  const title = article.title || "Untitled";
  const date = new Date(article.date);
  const displayDate = isNaN(date) ? "No date" : date.toLocaleDateString();

  return (
    <div className="article-card">
      <h3>{title}</h3>
      <p>{article.summary || "No summary available"}</p>
      <small>{displayDate}</small>
      <div>
        {article.file && (
          <a href={article.file} target="_blank" rel="noreferrer">
            📄 File
          </a>
        )}
        {" "}
        {article.tweet && (
          <a href={article.tweet} target="_blank" rel="noreferrer">
            🐦 Tweet
          </a>  // ✅ You were missing this closing tag
        )}
      </div>
    </div>
  );
};

export default ArticleCard;

