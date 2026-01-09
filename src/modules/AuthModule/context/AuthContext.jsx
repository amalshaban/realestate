import { jwtDecode } from "jwt-decode";
import { useEffect, useState, createContext, useCallback } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [loginData, setLoginData] = useState(null);

  // 1. Logic to decode and save user data
  const saveLoginData = useCallback(() => {
    const encodedToken = sessionStorage.getItem("token");
    if (encodedToken) {
      try {
        const decodedToken = jwtDecode(encodedToken);
        setLoginData(decodedToken);
      } catch (error) {
        console.error("Invalid token format:", error);
        logOut(); // Clear storage if the token is corrupted
      }
    } else {
      setLoginData(null);
    }
  }, []);

  // 2. Logic to log out
  const logOut = () => {
    sessionStorage.removeItem("token");
    setLoginData(null); 
  };

  // 3. Sync state with sessionStorage on load
  useEffect(() => {
    saveLoginData();
  }, [saveLoginData]);

  return (
    <AuthContext.Provider value={{ saveLoginData, loginData, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}