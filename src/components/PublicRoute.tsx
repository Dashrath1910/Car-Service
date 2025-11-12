import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

/**
 * Blocks logged-in users from visiting login/register.
 * Redirects to /dashboard if already logged in.
 */
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default PublicRoute;
