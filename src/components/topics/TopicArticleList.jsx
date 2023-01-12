import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsShareFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { getArticlesWithTopic } from "../../utils/api";
import Error from "../Error";
import Overlay from "../layout/Overlay";
import SelectOptions from "../layout/SelectOptions";
import ArticleListItem from "../articles/ArticleListItem";

const TopicArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showShareLink, setShowShareLink] = useState(false);
  const [err, setErr] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlesWithTopic(slug, sortBy, sortOrder)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => setErr(err.message));
  }, [sortBy, sortOrder]);
  return (
    <>
      {err && <Error />}
      {isLoading && !err && <Overlay />}
      {!isLoading && !err && (
        <div className="topicArticleList__container">
          <SelectOptions
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <button
            className="btn__share"
            onClick={() => setShowShareLink((curr) => !curr)}
          >
            {showShareLink ? (
              <>
                Cancel <MdOutlineCancel />
              </>
            ) : (
              <>
                Share <BsShareFill />
              </>
            )}
          </button>

          {showShareLink && (
            <p className="share__link">
              {`https://plaintree-nc-news.netlify.app/topics/${slug}`}
            </p>
          )}
          <ul className="articles__container">
            {articles.map((article) => (
              <ArticleListItem key={article.article_id} article={article} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
export default TopicArticleList;
