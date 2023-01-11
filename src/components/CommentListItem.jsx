import { useContext } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx";
import userContext from "../store/userContext";
const CommentListItem = ({ comment }) => {
  const { loginUser } = useContext(userContext);
  return (
    <li className="commentListItem__container">
      <h4>{comment.body}</h4>
      <h5>
        {comment.author} <span>(created at: {comment.created_at})</span>
      </h5>
      <p>
        <AiOutlineLike className="like__icon" /> {comment.votes}
      </p>
      <div className="vote__container">
        <button className="vote__up">
          Vote Up <RxThickArrowUp color="#66bb6a" />
        </button>
        <button className="vote__down">
          Vote Down <RxThickArrowDown color="#f44336" />
        </button>
      </div>
    </li>
  );
};
export default CommentListItem;
