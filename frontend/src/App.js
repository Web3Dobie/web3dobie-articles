import Header from "./components/Header";

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
    <div className="container">
      <Header />
      <FilterPanel categories={categories} selected={filter} onChange={setFilter} />
      <ArticleGrid articles={articles} filter={filter} />
    </div>
  );
}
