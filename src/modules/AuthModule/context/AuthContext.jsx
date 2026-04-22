import { jwtDecode } from 'jwt-decode';
import { useEffect, useState, createContext, useCallback } from 'react';

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {

  const [loginData, setLoginData] = useState(null);

  // ── Logout ──
  const logOut = useCallback(() => {
    sessionStorage.removeItem('token');
    setLoginData(null);
  }, []);

  // ── Decode token and save user data ──
  const saveLoginData = useCallback(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setLoginData(null);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // حماية من التوكن المنتهية صلاحيته
      const isExpired = decoded.exp && decoded.exp * 1000 < Date.now();
      if (isExpired) {
        logOut();
        return;
      }

      setLoginData(decoded);
    } catch {
      logOut();
    }
  }, [logOut]);

  // ── Sync on load ──
  useEffect(() => {
    saveLoginData();
  }, [saveLoginData]);

  return (
    <AuthContext.Provider value={{ loginData, saveLoginData, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}