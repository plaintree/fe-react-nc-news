import { Link } from "react-router-dom";
import logo from "../../assets/nc-logo.png";
const Navbar = () => {
  return (
    <div className="nav__container">
      <header className="nav__container__logo">
        <img src={logo} alt="ryan-ncn" />
        <h1>Welcome to Ryan's NC News</h1>
      </header>

      <nav className="nav__container__links">
        <Link to="/">Home</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/topics">Topics</Link>
        <Link to="/users">Users</Link>
      </nav>
    </div>
  );
};
export default Navbar;
