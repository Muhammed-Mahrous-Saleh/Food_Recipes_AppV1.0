import React from "react";
import { Outlet } from "react-router-dom";
import logo from "@/assets/images/logoBrand.png";

const AuthLayout = () => {
    return (
        <>
            <div className="auth-container">
                <div className="container-fluid bg-overlay">
                    <div className="row vh-100 justify-content-center align-items-center">
                        <div className="auth-card col-md-5 bg-white rounded-3">
                            <div className="logo-container text-center">
                                <img
                                    src={logo}
                                    alt="logo brand with title"
                                    className="w-75"
                                />
                            </div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLayout;
