import { createContext, useState, useEffect } from "react";
import { getUsers } from "../utils/api";

const userContext = createContext();

export const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    getUsers().then((allUsers) => setUsers(allUsers));
  }, []);
  return (
    <userContext.Provider value={{ users, loginUser, setLoginUser }}>
      {props.children}
    </userContext.Provider>
  );
};
export default userContext;
