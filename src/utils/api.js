import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://nc-news-project-lo9x.onrender.com/api",
});

// Article API
export const getArticles = async () => {
  const res = await baseApi.get("/articles");
  return res.data.articles;
};
export const getArticlesWithTopic = async (tpc) => {
  const res = await baseApi.get("/articles", { params: { topic: tpc } });
  return res.data.articles;
};

export const getArticlebyId = async (articleId) => {
  const res = await baseApi.get(`/articles/${articleId}`);
  return res.data.article;
};

export const patchArticleVote = async (articleId, vote) => {
  const patchBody = { inc_votes: vote };
  const res = await baseApi.patch(`/articles/${articleId}`, patchBody);
  return res.data.article;
};

// Comment API
export const getArticleCommentbyId = async (articleId) => {
  const res = await baseApi.get(`/articles/${articleId}/comments`);
  return res.data.comments;
};

export const postArticleComment = async (articleId, username, comment) => {
  const postBody = {
    username,
    body: comment,
  };
  const res = await baseApi.post(`/articles/${articleId}/comments`, postBody);
  return res.data.comment;
};

// User API
export const getUsers = async () => {
  const res = await baseApi.get("/users");
  return res.data.users;
};

// Topic API
export const getTopics = async () => {
  const res = await baseApi.get("/topics");
  return res.data.topics;
};
