const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <h3>{article.headline || "Untitled"}</h3>
      <p>{article.summary}</p>
      <div className="tags">
        {article.tags?.map(tag => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      {article.link && <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>}
    </div>
  );
};
export default ArticleCard;

// force commit