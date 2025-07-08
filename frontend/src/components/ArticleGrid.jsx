import ArticleCard from "./ArticleCard";

const groupByDate = (articles) => {
  return articles.reduce((acc, article) => {
    const date = new Date(article.date);
    if (isNaN(date)) return acc; // skip broken dates
    const year = isNaN(date) ? "Unknown" : date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();

    acc[year] ??= {};
    acc[year][month] ??= {};
    acc[year][month][day] ??= [];
    acc[year][month][day].push(article);

    return acc;
  }, {});
};

const ArticleGrid = ({ articles, filter }) => {
  const grouped = groupByDate(
    filter ? articles.filter(a => a.category === filter) : articles
  );

  return Object.entries(grouped).map(([year, months]) => (
    <details key={year} open>
      <summary><strong>{year}</strong></summary>
      {Object.entries(months).map(([month, days]) => (
        <details key={month} className="month" open>
          <summary>{month}</summary>
          {Object.entries(days).map(([day, items]) => (
            <div key={day}>
              <h4>{day}</h4>
              <div className="article-grid">
                {items.map(article => <ArticleCard key={article.id} article={article} />)}
              </div>
            </div>
          ))}
        </details>
      ))}
    </details>
  ));
};
export default ArticleGrid;
