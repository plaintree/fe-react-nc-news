import { useContext } from "react";
import userContext from "../../store/userContext";

import UserListItem from "./UserListItem";
import Overlay from "../layout/Overlay";
import Error from "../Error";

const UserList = () => {
  const { users, loginUser, setLoginUser, isLoading, err } =
    useContext(userContext);

  return (
    <>
      {err && <Error />}
      {isLoading && !err && <Overlay />}
      {!isLoading && !err && (
        <>
          <section className="userList__container">
            {users.map((user) => (
              <UserListItem
                key={user.username}
                user={user}
                setLoginUser={setLoginUser}
              />
            ))}
          </section>
          {loginUser !== null && (
            <section className="userList__logout">
              <h2>
                Welcome back! <span>{loginUser?.username}</span>
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
