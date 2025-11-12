import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, currentUser } from "@/utils/auth";

/**
 * Protects private routes like dashboard, admin, etc.
 * Redirects to /auth/login if not authenticated.
 */
const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles?: string[] }) => {
  const user = currentUser();

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect unauthorized roles (for example: non-admin trying to access /admin)
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
