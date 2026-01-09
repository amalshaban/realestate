import { Navigate } from "react-router-dom";

import { AuthContext } from "../../AuthModule/context/AuthContext";

export default function ProtectedRoute({ children }) {
 
  const token = sessionStorage.getItem("token");
  if (!token ) { 
    return <Navigate to="/auth/join" replace />;
  }
  
  return children;
}