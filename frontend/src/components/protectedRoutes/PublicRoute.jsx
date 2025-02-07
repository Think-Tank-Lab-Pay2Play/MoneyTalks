import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";

const PublicRoute = () => {
  const { userEmail } = useAuth();

  if (userEmail) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
