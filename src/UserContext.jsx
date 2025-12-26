import {createContext, useEffect, useState} from "react";
import api from "./api/axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    api.get('/profile').then(response => {
      setId(response.data.user.id);
      setUsername(response.data.user.username);
    });
  }, []);

  return (
    <UserContext.Provider value={{username, setUsername, id, setId}}>
      {children}
    </UserContext.Provider>
  );
}