import { Route, Routes } from "react-router-dom";
import "./App.scss";
import ArticleList from "./components/ArticleList";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TopicList from "./components/TopicList";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="app__container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/users" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
