import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";

const ArticleListItem = ({ article }) => {
  return (
    <li className="articleItem__container">
      <h2>{article.title}</h2>
      <h4>Topic: {article.topic}</h4>
      <h6>By: {article.author}</h6>
      <p>
        <AiOutlineLike /> {article.votes}
      </p>

      <Link to={`/articles/${article.article_id}`}>
        More about this article <BsFillArrowRightCircleFill />
      </Link>
    </li>
  );
};
export default ArticleListItem;
