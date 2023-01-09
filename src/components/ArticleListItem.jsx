import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const ArticleListItem = ({ article }) => {
  return (
    <li className="articleItem__container">
      <h2>{article.title}</h2>
      <p>By: {article.author}</p>
      <Link to={`/articles/${article.article_id}`}>
        More about this article <BsFillArrowRightCircleFill />
      </Link>
    </li>
  );
};
export default ArticleListItem;
