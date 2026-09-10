import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const authStatus = useSelector((state) => state.auth.status);

  if (authentication && !authStatus) {
    return <Navigate to="/login" replace />;
  }

  if (!authentication && authStatus) {
    return <Navigate to="/" replace />;
  }

  return <div className="min-h-[calc(100vh-5rem)] bg-slate-50">{children}</div>;
}

export default AuthLayout;
