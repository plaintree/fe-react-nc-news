import { createContext, useState, useEffect } from "react";
import { getUsers } from "../utils/api";

const userContext = createContext();

export const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((allUsers) => {
        setUsers(allUsers);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, []);
  return (
    <userContext.Provider
      value={{ users, loginUser, setLoginUser, isLoading, setIsLoading, err }}
    >
      {props.children}
    </userContext.Provider>
  );
};
export default userContext;
