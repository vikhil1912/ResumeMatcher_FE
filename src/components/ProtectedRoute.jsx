import { useAuth } from '../contexts/AuthContext';
import { Navigate} from 'react-router-dom';

export function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to auth page with return location
    return (
      <Navigate to={`/auth?role=${requiredRole}`} replace />
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect to role-specific dashboard
    return <Navigate to={`/${user.role}/`} replace />;
  }

  return children;
}