import { useContext } from "react";
import userContext from "../store/userContext";

const UserList = () => {
  const { users } = useContext(userContext);
  return (
    <section className="userList__container">
      {users.map((user) => (
        <div key={user.username} className="user__container">
          <h2>{user.name}</h2>
          <p>{user.username}</p>
          <img src={user.avatar_url} alt={user.username} />
        </div>
      ))}
    </section>
  );
};
export default UserList;
