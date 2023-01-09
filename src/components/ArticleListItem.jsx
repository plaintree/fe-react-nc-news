import { Link } from "react-router-dom";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const ArticleListItem = ({ article }) => {
  return (
    <div className="articleItem__container">
      <h4>{article.title}</h4>
      <p>By: {article.author}</p>
      <Link to={`/articles/${article.article_id}`}>
        More about this article <BsFillArrowRightCircleFill />
      </Link>
    </div>
  );
};
export default ArticleListItem;
