import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../utils/api";
import Overlay from "../layout/Overlay";

import Error from "../Error";

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [err, setErr] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getTopics()
      .then((tpc) => {
        setTopics(tpc);
        setIsLoading(false);
      })
      .catch((err) => setErr(err.message));
  }, []);

  return (
    <>
      {err && <Error />}
      {isLoading && !err && <Overlay />}
      {!isLoading && !err && (
        <ul className="topicList__container">
          <li className="title">Choose a topic</li>
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              className="topic__slug"
              to={`/topics/${topic.slug}`}
            >
              {topic.slug}
            </Link>
          ))}
        </ul>
      )}
    </>
  );
};
export default TopicList;
