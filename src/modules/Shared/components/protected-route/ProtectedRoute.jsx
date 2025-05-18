import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loginData, children }) => {
    console.log("loginData", loginData);
    if (loginData || localStorage.getItem("token")) return children;
    return <Navigate to="/login" />;
};

export default ProtectedRoute;
