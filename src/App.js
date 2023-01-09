import { Route, Routes } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TopicList from "./components/TopicList";
import UserList from "./components/UserList";
import "./App.scss";
import ArticleDetail from "./components/ArticleDetail";

function App() {
  return (
    <div className="app__container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetail />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
