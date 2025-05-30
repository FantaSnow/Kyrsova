import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Loader from "../components/common/Loader"; // Імпортуємо Loader

interface ProtectedRouteProps {
  role?: string | string[];
  children?: React.ReactNode;
  redirectTo?: string;
}

const hasRole = (userRole: string, role?: string | string[]) => {
  if (!role) return true;
  if (Array.isArray(role)) return role.includes(userRole);
  return userRole === role;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role,
  children,
  redirectTo = "/login",
}) => {
  const { isAuthenticated } = useAuth();
  const { user, loading } = useCurrentUser();

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!user || !hasRole(user.role_name, role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
