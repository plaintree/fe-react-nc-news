import { useContext } from "react";
import userContext from "../store/userContext";
import SyncLoader from "react-spinners/SyncLoader";

const UserList = () => {
  const { users, loginUser, setLoginUser, isLoading } = useContext(userContext);

  return (
    <>
      {isLoading ? (
        <div className="overlay">
          <SyncLoader className="spinner" />
        </div>
      ) : (
        <>
          <section className="userList__container">
            {users.map((user) => (
              <div
                key={user.username}
                className="user__container"
                onClick={() => setLoginUser(user.username)}
              >
                <h2>{user.name}</h2>
                <p>Username: {user.username}</p>
                <img src={user.avatar_url} alt={user.username} />
              </div>
            ))}
          </section>
          {loginUser !== null && (
            <section className="userList__logout">
              <h2>
                Welcome back! <span>{loginUser}</span>
              </h2>
              <button onClick={() => setLoginUser(null)}>Log Out</button>
            </section>
          )}
        </>
      )}
    </>
  );
};
export default UserList;
