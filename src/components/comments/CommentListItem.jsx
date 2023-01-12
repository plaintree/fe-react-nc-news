import { useContext, useState, useEffect } from "react";
import moment from "moment";
import { AiOutlineLike, AiOutlineDelete } from "react-icons/ai";
import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx";
import { deleteArticleComment, patchCommentVote } from "../../utils/api";
import userContext from "../../store/userContext";

const CommentListItem = ({
  comment,
  setRefreshComment,
  clickErr,
  setClickErr,
}) => {
  const [isDisable, setIsDisable] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [commentVotes, setCommentVotes] = useState(0);
  const { loginUser } = useContext(userContext);

  useEffect(() => {
    setCommentVotes(comment.votes);
  }, []);

  const handleDeleteClick = (id) => {
    setIsDisable(true);
    deleteArticleComment(id).then(() => {
      setIsDisable(false);
      setRefreshComment(true);
    });
  };

  const handleVoteClick = (commentId, newVote) => {
    // optimistic rendering approach
    setCommentVotes((currVote) => currVote + newVote);
    patchCommentVote(commentId, newVote).catch(() => {
      setCommentVotes((currVote) => currVote - newVote);
      setClickErr("Something went wrong, please try again.");
    });
  };
  return (
    <li className="commentListItem__container">
      <h4>{comment.body}</h4>
      <h5>
        {comment.author}{" "}
        <span>
          (created at:{" "}
          {moment(comment.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a")})
        </span>
      </h5>
      <p>
        <AiOutlineLike className="like__icon" /> {commentVotes}
      </p>
      <div className="btn__container">
        <button
          className="vote__up"
          onClick={() => handleVoteClick(comment.comment_id, 1)}
        >
          Vote Up <RxThickArrowUp color="#66bb6a" />
        </button>
        <button
          className="vote__down"
          onClick={() => handleVoteClick(comment.comment_id, -1)}
        >
          Vote Down <RxThickArrowDown color="#f44336" />
        </button>
        {loginUser === comment.author && (
          <>
            {showConfirmDelete ? (
              <>
                <button
                  className="delete__comment"
                  onClick={() => handleDeleteClick(comment.comment_id)}
                  disabled={isDisable}
                >
                  Confirm Delete <AiOutlineDelete color="#ffffff" />
                </button>
                <button
                  className="delete__comment__cancel"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  Cancel Delete
                </button>
              </>
            ) : (
              <button
                className="delete__comment"
                onClick={() => setShowConfirmDelete(true)}
              >
                Delete <AiOutlineDelete color="#ffffff" />
              </button>
            )}
          </>
        )}
      </div>
      {clickErr && <p>{clickErr}</p>}
    </li>
  );
};
export default CommentListItem;
