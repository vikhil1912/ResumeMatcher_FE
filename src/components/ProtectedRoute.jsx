import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, user, requiredRole }) {
  if (!user) {
    return <Navigate to={`/auth?role=${requiredRole}`} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={`/auth?role=${requiredRole}`} replace />;
  }

  return children;
}
