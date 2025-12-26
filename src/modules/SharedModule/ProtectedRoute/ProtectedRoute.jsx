import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("You must log in first!");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
