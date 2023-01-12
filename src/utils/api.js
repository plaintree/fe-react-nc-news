import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://nc-news-project-lo9x.onrender.com/api",
});

export const getArticles = async (sortBy, order) => {
  const res = await baseApi.get("/articles", {
    params: { sort_by: sortBy, order: order },
  });
  return res.data.articles;
};
export const getArticlesWithTopic = async (tpc, sortBy, order) => {
  const res = await baseApi.get("/articles", {
    params: { topic: tpc, sort_by: sortBy, order: order },
  });
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

export const deleteArticleComment = async (commentId) => {
  return await baseApi.delete(`/comments/${commentId}`);
};

export const patchCommentVote = async (commentId, vote) => {
  const patchBody = { inc_votes: vote };
  const res = await baseApi.patch(`/comments/${commentId}`, patchBody);
  return res.data.article;
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
