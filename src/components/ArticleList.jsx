import { useEffect, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { getArticles } from "../utils/api";
import ArticleListItem from "./ArticleListItem";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getArticles().then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="articles__container">
      {isLoading && <SyncLoader className="spinner" />}
      {articles.map((article) => (
        <ArticleListItem key={article.article_id} article={article} />
      ))}
    </div>
  );
};
export default ArticleList;
