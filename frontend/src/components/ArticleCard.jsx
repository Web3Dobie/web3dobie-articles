const ArticleCard = ({ article }) => {
  const title = article.title || "Untitled";
  const date = new Date(article.date);
  const displayDate = isNaN(date) ? "No date" : date.toLocaleDateString();

  return (
    <div className="article-card">
      <h3>
        {article.file ? (
          <a href={article.file} target="_blank" rel="noreferrer" className="article-link">
            {title}
          </a>
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
