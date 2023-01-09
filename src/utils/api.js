import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://nc-news-project-lo9x.onrender.com/api",
});

export const getArticles = async () => {
  const res = await baseApi.get("/articles");
  return res.data.articles;
};
