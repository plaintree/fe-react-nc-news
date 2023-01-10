import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticlebyId,
  getArticleCommentbyId,
  patchArticleVote,
} from "../utils/api";
import SyncLoader from "react-spinners/SyncLoader";
import { AiOutlineLike } from "react-icons/ai";
import { RxThickArrowUp, RxThickArrowDown } from "react-icons/rx";
import CommentListItem from "./CommentListItem";

const ArticleDetail = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [votes, setVotes] = useState(article.votes);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlebyId(article_id).then((art) => {
      setArticle(art);
      setIsLoading(false);
    });
  }, [votes]);
  useEffect(() => {
    setIsLoading(true);
    getArticleCommentbyId(article_id).then((comm) => {
      setComments(comm);
      setIsLoading(false);
    });
  }, []);

  const handleVoteClick = (newVote) => {
    patchArticleVote(article_id, newVote).then((art) => setVotes(art.votes));
  };

  return (
    <>
      {isLoading ? (
        <div className="overlay">
          <SyncLoader className="spinner" />
        </div>
      ) : (
        <section className="articleDetail__container">
          <div className="articleDetail__container__main">
            <h1>{article.title}</h1>
            <h3>
              From {article.author}{" "}
              <span>(created at: {article.created_at})</span>
            </h3>
            <p>{article.body}</p>
            <p>
              <AiOutlineLike className="like__icon" /> {article.votes}
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
          </div>
          {showComments && (
            <ul className="articleDetail__container__comments">
              {comments.map((comment) => (
                <CommentListItem key={comment.comment_id} comment={comment} />
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  );
};
export default ArticleDetail;
