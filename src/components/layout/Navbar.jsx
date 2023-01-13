import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { ImCross } from "react-icons/im";
import userContext from "../../store/userContext";
import logo from "../../assets/nc-logo.png";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { loginUser } = useContext(userContext);

  return (
    <>
      <div className="nav__container">
        <header className="nav__container__logo">
          <img src={logo} alt="ryan-ncn" />
          <h1>Ryan's NC News</h1>
        </header>

        <nav className="nav__container__links">
          {loginUser && (
            <div className="user__profile">
              <img src={loginUser?.avatar_url} />
              <p>{loginUser?.username}</p>
            </div>
          )}
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/topics">Topics</Link>
          <Link to="/users">Users</Link>
        </nav>

        {showMenu ? (
          <ImCross
            onClick={() => setShowMenu(false)}
            className="mobile__menu"
          />
        ) : (
          <HiMenu onClick={() => setShowMenu(true)} className="mobile__menu" />
        )}
      </div>
      {showMenu && (
        <nav className="nav__mobile">
          {loginUser && (
            <div className="user__profile">
              <img src={loginUser?.avatar_url} />
              <p>{loginUser?.username}</p>
            </div>
          )}
          <Link to="/" onClick={() => setShowMenu(false)}>
            Home
          </Link>
          <Link to="/articles" onClick={() => setShowMenu(false)}>
            Articles
          </Link>
          <Link to="/topics" onClick={() => setShowMenu(false)}>
            Topics
          </Link>
          <Link to="/users" onClick={() => setShowMenu(false)}>
            Users
          </Link>
          <h6>&copy; Plaintree Production. All right reserved.</h6>
        </nav>
      )}
    </>
  );
};
export default Navbar;
