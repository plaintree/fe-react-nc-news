import { useEffect, useState } from "react";
import { BsShareFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getTopics, getArticlesWithTopic } from "../utils/api";
import Overlay from "./Overlay";
import TopicListArticleItem from "./TopicListArticleItem";

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [topicArticles, setTopicArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showShareLink, setShowShareLink] = useState(false);
  const [slug, setSlug] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getTopics().then((tpc) => {
      setTopics(tpc);
      setIsLoading(false);
    });
  }, []);

  const handleTopicClick = (tpc) => {
    getArticlesWithTopic(tpc).then((arts) => {
      setTopicArticles(arts);
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
            {topicArticles.length > 0 &&
              topicArticles.map((article) => (
                <TopicListArticleItem
                  article={article}
                  key={article.article_id}
                />
              ))}
          </div>
        </section>
      )}
    </>
  );
};
export default TopicList;
