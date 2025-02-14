import { createContext, useState } from "react";

export const TokenContext = createContext();

function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const value = { token, setToken };
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}

export default TokenProvider;
