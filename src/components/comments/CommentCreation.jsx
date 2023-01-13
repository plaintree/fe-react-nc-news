import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { postArticleComment } from "../../utils/api";
import userContext from "../../store/userContext";

const CommentCreation = ({ setShowAddComment, setRefreshComment }) => {
  const { loginUser } = useContext(userContext);
  const [inputField, setInputField] = useState("");
  const [error, setError] = useState(null);
  const { article_id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginUser === null) {
      setError("Please go to the user page and select a username first");
    } else {
      setShowAddComment(false);
      postArticleComment(
        article_id,
        loginUser.username,
        inputField.trim()
      ).then(() => setRefreshComment(true));
    }
  };

  return (
    <>
      <form className="comment__form" onSubmit={handleSubmit}>
        <textarea
          rows="1"
          name="commentInput"
          value={inputField}
          onChange={(e) => setInputField(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Post</button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};
export default CommentCreation;
