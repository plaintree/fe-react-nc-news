import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleListItem from "./ArticleListItem";
import Overlay from "./Overlay";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    setIsLoading(true);
    getArticles(sortBy, sortOrder).then((articles) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [sortBy, sortOrder]);
  return (
    <>
      {isLoading ? (
        <Overlay />
      ) : (
        <>
          <section className="select__container">
            <select
              className="select__sortBy"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option selected>Sort By</option>
              <option value="date">Date</option>
              <option value="author">Author</option>
              <option value="votes">Votes</option>
              <option value="comment_count">Comment Count</option>
            </select>
            <select
              className="select__sortOrder"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option selected>Order</option>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </section>
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
