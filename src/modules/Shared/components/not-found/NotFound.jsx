import React from "react";
import RobotNotFound from "@/assets/images/robot404.png";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/logoBrand.png";

const NotFound = () => {
    return (
        <>
            <div className="not-found position-relative w-100">
                <div className="notfound-container d-flex flex-column w-50 p-4">
                    <img src={Logo} alt="website brand" />
                    <div className="d-flex flex-column gap-5">
                        <div className="notfound-text">
                            <h2>Oops ....</h2>
                            <h4>Page Not Found</h4>
                            <p>
                                This Page doesn`t exist or was removed! We
                                suggest you back to home.
                            </p>
                        </div>
                        <div className="notfound-action">
                            <Link to="/dashboard" className="btn btn-success">
                                <i className="fa fa-arrow-left"></i> Back to
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className="background-404 d-none d-md-block w-75
                    vh-100 position-absolute top-0 end-0"
                >
                    <div className="robot-bg">
                        <img src={RobotNotFound} alt="404 not found robot" />
                    </div>
                    <div className="dotted-block"></div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
