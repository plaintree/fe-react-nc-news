import { useContext } from "react";
import userContext from "../../store/userContext";
const UserListItem = ({ user }) => {
  const { setLoginUser } = useContext(userContext);

  return (
    <div className="user__container" onClick={() => setLoginUser(user)}>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <img src={user.avatar_url} alt={user.username} />
    </div>
  );
};
export default UserListItem;
