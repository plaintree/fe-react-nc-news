import { useContext, useState } from "react";
import { AiOutlineLike, AiOutlineDelete } from "react-icons/ai";
import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx";
import { deleteArticleComment } from "../utils/api";
import userContext from "../store/userContext";

const CommentListItem = ({ comment, setRefreshComment }) => {
  const [isDisable, setIsDisable] = useState(false);
  const { loginUser } = useContext(userContext);

  const handleDeleteClick = (id) => {
    setIsDisable(true);
    deleteArticleComment(id).then(() => {
      setIsDisable(false);
      setRefreshComment(true);
    });
  };
  return (
    <li className="commentListItem__container">
      <h4>{comment.body}</h4>
      <h5>
        {comment.author} <span>(created at: {comment.created_at})</span>
      </h5>
      <p>
        <AiOutlineLike className="like__icon" /> {comment.votes}
      </p>
      <div className="btn__container">
        <button className="vote__up">
          Vote Up <RxThickArrowUp color="#66bb6a" />
        </button>
        <button className="vote__down">
          Vote Down <RxThickArrowDown color="#f44336" />
        </button>
        {loginUser === comment.author && (
          <button
            className="delete__comment"
            onClick={() => handleDeleteClick(comment.comment_id)}
            disabled={isDisable}
          >
            Delete <AiOutlineDelete color="#ffffff" />
          </button>
        )}
      </div>
    </li>
  );
};
export default CommentListItem;
