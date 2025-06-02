import React from "react";
import { Sidebar as SideBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Home from "../../../../assets/icons/home.svg?react";
import Users from "../../../../assets/icons/users.svg?react";
import Recipes from "../../../../assets/icons/recipes.svg?react";
import Categories from "../../../../assets/icons/categories.svg?react";
import Unlock from "../../../../assets/icons/unlock.svg?react";
import Logout from "../../../../assets/icons/logout.svg?react";
import logo from "@/assets/images/logo.png";
import { useState } from "react";
import ConfirmModal from "../confirmation-modal/ConfirmModal";
import ChangePasswordModal from "@/modules/Authentication/components/change-pass-modal/ChangePasswordModal";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Sidebar = () => {
    const { setLoginData } = useContext(AuthContext);
    const [collapsed, setCollapsed] = useState(false);
    const [show, setShow] = useState(false);
    const [showChange, setShowChange] = useState(false);
    const navigate = useNavigate();
    /**
 * 
 * 
 * -title,
    message,
    -onConfirm,
    -show,
    -handleClose,
    -confirmTitle,
 */

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseChange = () => setShowChange(false);
    const handleShowChange = () => setShowChange(true);

    const toggleSidebar = () => setCollapsed(!collapsed);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoginData(null);
        toast.success("Logout Successfully");
        navigate("/");
    };

    return (
        <SideBar
            collapsed={collapsed}
            backgroundColor="transparent"
            rootStyles={{
                color: "var(--sidebar-text-color)",
                height: "100vh",
            }}
            className="pro-sidebar"
        >
            <div onClick={toggleSidebar}>
                <div className="sidebar-img-container">
                    <img src={logo} alt="Logo" className="w-100" />
                </div>
            </div>
            <Menu>
                <MenuItem
                    icon={<Home className="sidebar-icon" />}
                    component={<NavLink to="/dashboard" end />}
                    className="pro-menu-item"
                >
                    Home
                </MenuItem>
                <MenuItem
                    icon={<Users className="sidebar-icon" />}
                    component={<NavLink to="users" />}
                    className="pro-menu-item"
                >
                    Users
                </MenuItem>
                <MenuItem
                    icon={<Recipes className="sidebar-icon" />}
                    component={<NavLink to="recipes" />}
                    className="pro-menu-item"
                >
                    Recipes
                </MenuItem>
                <MenuItem
                    icon={<Categories className="sidebar-icon" />}
                    component={<NavLink to="categories" />}
                    className="pro-menu-item"
                >
                    Categories
                </MenuItem>
                <MenuItem
                    icon={<Unlock className="sidebar-icon" />}
                    onClick={handleShowChange}
                    className="pro-menu-item"
                >
                    Change Password
                </MenuItem>
                <MenuItem
                    icon={<Logout className="sidebar-icon" />}
                    onClick={handleShow}
                    className="pro-menu-item"
                >
                    Logout
                </MenuItem>
            </Menu>
            <ConfirmModal
                show={show}
                message={"make sure to save your data before logout"}
                handleClose={handleClose}
                title={"Are you sure to logout?"}
                onConfirm={handleLogout}
                confirmTitle={"Logout"}
            />
            <ChangePasswordModal
                show={showChange}
                handleClose={handleCloseChange}
            />
        </SideBar>
    );
};

export default Sidebar;
