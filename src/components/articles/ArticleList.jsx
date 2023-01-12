import { useEffect, useState } from "react";
import { getArticles } from "../../utils/api";
import ArticleListItem from "./ArticleListItem";
import Overlay from "../layout/Overlay";
import SelectOptions from "../layout/SelectOptions";
import Error from "../Error";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticles(sortBy, sortOrder)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [sortBy, sortOrder]);
  return (
    <>
      {err && <Error />}
      {isLoading && !err && <Overlay />}
      {!isLoading && !err && (
        <>
          <SelectOptions
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <ul className="articles__container">
            {articles.map((article) => (
              <ArticleListItem key={article.article_id} article={article} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};
export default ArticleList;
