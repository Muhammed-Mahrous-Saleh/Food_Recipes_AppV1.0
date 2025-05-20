import React from "react";
import logo from "@/assets/images/logo.png";
import Alert from "@/assets/icons/alert.svg?react";

const Navbar = ({ loginData }) => {
    return (
        <div className="navbar-container p-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 rounded-3">
                <div className="container-fluid justify-content-end">
                    <div className="user-info-container d-flex justify-content-center align-items-center ">
                        <div className="user-img-container">
                            <img src={logo} alt="user image" />
                        </div>
                        <div className="user-name-container">
                            {loginData?.userName}
                        </div>
                    </div>
                    <div class="dropdown mx-4">
                        <a
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i class="fa-solid fa-chevron-down"></i>
                        </a>

                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item" href="#">
                                    Action
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    Another action
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    Something else here
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="dropdown mx-4">
                        <a
                            className="alert-container"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <Alert />
                        </a>

                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <a class="dropdown-item" href="#">
                                    Action
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    Another action
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">
                                    Something else here
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
