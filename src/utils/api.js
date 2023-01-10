import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://nc-news-project-lo9x.onrender.com/api",
});

export const getArticles = async () => {
  const res = await baseApi.get("/articles");
  return res.data.articles;
};

export const getArticlebyId = async (articleId) => {
  const res = await baseApi.get(`/articles/${articleId}`);
  return res.data.article;
};

export const getArticleCommentbyId = async (articleId) => {
  const res = await baseApi.get(`/articles/${articleId}/comments`);
  return res.data.comments;
};
