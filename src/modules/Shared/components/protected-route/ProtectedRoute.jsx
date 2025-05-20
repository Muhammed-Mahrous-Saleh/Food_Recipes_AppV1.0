import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loginData, children }) => {
    if (loginData || localStorage.getItem("token")) return children;
    return <Navigate to="/login" />;
};

export default ProtectedRoute;
