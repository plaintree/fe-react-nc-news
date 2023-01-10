import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlebyId, getArticleCommentbyId } from "../utils/api";
import SyncLoader from "react-spinners/SyncLoader";
import CommentListItem from "./CommentListItem";

const ArticleDetail = () => {
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticlebyId(article_id).then((art) => {
      setArticle(art);
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    setIsLoading(true);
    getArticleCommentbyId(article_id).then((comm) => {
      setComments(comm);
      setIsLoading(false);
    });
  }, []);
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
            <button
              className="toggle__comment__btn"
              onClick={() => setShowComments((currState) => !currState)}
            >
              {showComments ? "Hide" : "View"} all {article.comment_count}{" "}
              comments
            </button>
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
