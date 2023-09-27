import { createContext, useState } from "react";
const AuthenticationContext = createContext({});
export const AuthenticationProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState({});
  return (
    <AuthenticationContext.Provider
      value={{ authentication, setAuthentication }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
export default AuthenticationContext;
