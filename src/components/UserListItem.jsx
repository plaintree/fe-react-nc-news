const UserListItem = ({ user, setLoginUser }) => {
  return (
    <div
      className="user__container"
      onClick={() => setLoginUser(user.username)}
    >
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <img src={user.avatar_url} alt={user.username} />
    </div>
  );
};
export default UserListItem;
