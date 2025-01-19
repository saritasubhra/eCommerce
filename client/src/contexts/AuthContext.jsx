import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("eCommercerUser")) || null
  );
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Context used outside of provider.");
  return context;
}

export default AuthProvider;
