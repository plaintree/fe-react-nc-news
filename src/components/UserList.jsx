import { useContext } from "react";
import userContext from "../store/userContext";

import UserListItem from "./UserListItem";
import Overlay from "./Overlay";

const UserList = () => {
  const { users, loginUser, setLoginUser, isLoading } = useContext(userContext);

  return (
    <>
      {isLoading ? (
        <Overlay />
      ) : (
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
