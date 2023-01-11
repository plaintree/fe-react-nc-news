import { AiOutlineLike, AiOutlineComment } from "react-icons/ai";

const TopicListArticleItem = ({ article }) => {
  return (
    <div className="topicListArticleItem__container">
      <h1>{article.title}</h1>
      <h3>By: {article.author}</h3>
      <p>
        <AiOutlineLike color="#03a9f4" />
        {article.votes} <AiOutlineComment /> {article.comment_count}
      </p>
    </div>
  );
};
export default TopicListArticleItem;
