import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { PropsWithChildren } from "react";

// Protected route component
const ProtectedRoute = ({
  children,
  allowedRoles,
}: PropsWithChildren<{
  allowedRoles?: string[];
}>) => {
  const { state } = useAuth();
  const { isAuthenticated, user, loading } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check if user has required role (if specified)
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
