import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";

const ProtectedRoute = () => {
    const location = useLocation();
    const { userEmail } = useAuth();
    
    if (!userEmail) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;