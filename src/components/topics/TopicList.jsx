import { useEffect, useState } from "react";
import { BsShareFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getTopics, getArticlesWithTopic } from "../../utils/api";
import Overlay from "../layout/Overlay";
import SelectOptions from "../layout/SelectOptions";
import ArticleListItem from "../articles/ArticleListItem";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [showShareLink, setShowShareLink] = useState(false);
  const [slug, setSlug] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((tpc) => {
      setTopics(tpc);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (isInitialRender) return;
    getArticlesWithTopic(slug, sortBy, sortOrder).then((arts) => {
      setTopicArticles(arts);
    });
  }, [sortBy, sortOrder]);

  const handleTopicClick = (tpc) => {
    getArticlesWithTopic(tpc, sortBy, sortOrder).then((arts) => {
      setTopicArticles(arts);
      setIsInitialRender(false);
      setSlug(tpc);
      navigate(`/topics?slug=${tpc}`);
    });
  };
  return (
    <>
      {isLoading ? (
        <Overlay />
      ) : (
        <section className="topicList__container">
          <ul className="topicList__container__topics">
            <li className="title">Choose a topic</li>
            {topics.map((topic) => (
              <li
                key={topic.slug}
                className="topic__slug"
                onClick={() => handleTopicClick(topic.slug)}
              >
                {topic.slug}
              </li>
            ))}
            {slug !== null && (
              <li
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
              </li>
            )}
            {showShareLink && (
              <li className="share__link">
                {`https://ncnews.netlify.app/topic?slug=${slug}`}
              </li>
            )}
          </ul>
          <div className="topicList__container__articles">
            {topicArticles.length > 0 && (
              <SelectOptions
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
            )}
            <section className="article__list">
              {topicArticles.length > 0 &&
                topicArticles.map((article) => (
                  <ArticleListItem article={article} key={article.article_id} />
                ))}
            </section>
          </div>
        </section>
      )}
    </>
  );
};
export default TopicList;
