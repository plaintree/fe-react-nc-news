import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  getArticlebyId,
  getArticleCommentbyId,
  patchArticleVote,
} from "../../utils/api";
import { AiOutlineLike } from "react-icons/ai";
import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx";
import CommentListItem from "../comments/CommentListItem";
import CommentCreation from "../comments/CommentCreation";
import Overlay from "../layout/Overlay";
import Error from "../Error";

const ArticleDetail = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [refreshComment, setRefreshComment] = useState(false);
  const [votes, setVotes] = useState(0);

  const [err, setErr] = useState(null);
  const [clickErr, setClickErr] = useState(null);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlebyId(article_id)
      .then((art) => {
        setArticle(art);
        setVotes(art.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
    return () => {
      setRefreshComment(false);
    };
  }, [refreshComment]);

  useEffect(() => {
    setIsLoading(true);
    getArticleCommentbyId(article_id)
      .then((comm) => {
        setComments(comm);

        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
    return () => {
      setRefreshComment(false);
    };
  }, [refreshComment]);

  const handleVoteClick = (newVote) => {
    // optimistic rendering approach
    setVotes((currVote) => currVote + newVote);
    patchArticleVote(article_id, newVote).catch(() => {
      setVotes((currVote) => currVote - newVote);
      setClickErr("Something went wrong, please try again.");
    });
  };

  return (
    <>
      {err && <Error />}
      {isLoading && !err && <Overlay />}
      {!isLoading && !err && (
        <section className="articleDetail__container">
          <div className="articleDetail__container__main">
            <h1>{article.title}</h1>
            <h3>
              From {article.author}{" "}
              <span>
                (created at:{" "}
                {moment(article.created_at).format(
                  "dddd, MMMM Do YYYY, h:mm:ss a"
                )}
                )
              </span>
            </h3>
            <p>{article.body}</p>
            <p>
              <AiOutlineLike className="like__icon" /> {votes}
            </p>
            <button
              className="toggle__comment__btn"
              onClick={() => setShowComments((currState) => !currState)}
            >
              {showComments ? "Hide" : "View"} all {article.comment_count}{" "}
              comments
            </button>
            <div className="vote__container">
              <button className="vote__up" onClick={() => handleVoteClick(1)}>
                Vote Up <RxThickArrowUp color="#66bb6a" />
              </button>
              <button
                className="vote__down"
                onClick={() => handleVoteClick(-1)}
              >
                Vote Down <RxThickArrowDown color="#f44336" />
              </button>
            </div>
            {clickErr && <p>{clickErr}</p>}
          </div>
          {showComments && (
            <ul className="articleDetail__container__comments">
              {comments.map((comment) => {
                return (
                  <CommentListItem
                    key={comment.comment_id}
                    comment={comment}
                    setRefreshComment={setRefreshComment}
                    clickErr={clickErr}
                    setClickErr={setClickErr}
                  />
                );
              })}
            </ul>
          )}
          {showAddComment && (
            <CommentCreation
              setShowAddComment={setShowAddComment}
              setRefreshComment={setRefreshComment}
            />
          )}
          <button
            className="btn__showAddComment"
            onClick={() => setShowAddComment((currState) => !currState)}
          >
            {showAddComment ? "Cancel" : "Post a Comment"}
          </button>
        </section>
      )}
    </>
  );
};
export default ArticleDetail;
