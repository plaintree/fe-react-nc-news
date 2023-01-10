import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleListItem from "./ArticleListItem";
import Overlay from "./Overlay";

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
    <section>
      {isLoading ? (
        <Overlay />
      ) : (
        <ul className="articles__container">
          {articles.map((article) => (
            <ArticleListItem key={article.article_id} article={article} />
          ))}
        </ul>
      )}
    </section>
  );
};
export default ArticleList;
