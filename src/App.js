import { Route, Routes } from "react-router-dom";
import ArticleList from "./components/articles/ArticleList";
import Home from "./components/Home";
import Navbar from "./components/layout/Navbar";
import TopicList from "./components/topics/TopicList";
import UserList from "./components/users/UserList";
import ArticleDetail from "./components/articles/ArticleDetail";
import Error from "./components/Error";
import TopicArticleList from "./components/topics/TopicArticleList";
import "./App.scss";

function App() {
  return (
    <div className="app__container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetail />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/topics/:slug" element={<TopicArticleList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
