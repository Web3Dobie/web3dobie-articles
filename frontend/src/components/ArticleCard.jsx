import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  const title = article.headline || "Untitled";
  const date = new Date(article.date);
  const displayDate = isNaN(date) ? "No date" : date.toLocaleDateString();

  return (
    <div className="border border-gray-700 rounded-xl p-4 mb-6 shadow hover:shadow-lg transition duration-300 bg-gray-900">
      <h3 className="text-lg font-semibold text-emerald-400 mb-1">
        {article.file ? (
          <Link to={`/article/${article.id}`} className="hover:underline">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="text-sm text-gray-300 mb-2">
        {article.summary || "No summary available"}
      </p>
      <small className="text-gray-500">{displayDate}</small>
    </div>
  );
};

export default ArticleCard;


