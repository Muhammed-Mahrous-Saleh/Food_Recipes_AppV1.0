import React from "react";
import profile from "@/assets/images/profile.png";
import Alert from "@/assets/icons/alert.svg?react";
import { useContext } from "react";
import { IMAGE_PATH } from "../../utils/urls";
import { AuthContext } from "@/context/context";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar-container p-3">
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-3 rounded-4">
                <div className="container-fluid justify-content-end">
                    <div className="user-info-container d-flex justify-content-center align-items-center ">
                        <div className="user-img-container d-flex">
                            <img
                                src={
                                    currentUser?.imagePath
                                        ? IMAGE_PATH(currentUser?.imagePath)
                                        : profile
                                }
                                alt="user image"
                                className="object-fit-cover"
                            />
                        </div>
                        <div className="user-name-container">
                            {currentUser?.userName}
                        </div>
                    </div>
                    <div className="dropdown mx-4">
                        <a
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-chevron-down"></i>
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    Action
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Another action
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Something else here
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown mx-4">
                        <a
                            className="alert-container"
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <Alert />
                        </a>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <a className="dropdown-item" href="#">
                                    Alert
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Another Alert
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item" href="#">
                                    Alert
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
