import React from "react";
import { Sidebar as SideBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Home from "../../../../assets/icons/home.svg?react";
import Users from "../../../../assets/icons/users.svg?react";
import Recipes from "../../../../assets/icons/recipes.svg?react";
import Categories from "../../../../assets/icons/categories.svg?react";
import Unlock from "../../../../assets/icons/unlock.svg?react";
import Logout from "../../../../assets/icons/logout.svg?react";
import { useState } from "react";

const Sidebar = ({ setLoginData }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const toggleSidebar = () => setCollapsed(!collapsed);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoginData(null);
        toast.success("Logout Successfully");
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
                    <img
                        src="src/assets/images/logo.png"
                        alt="Logo"
                        className="w-100"
                    />
                </div>
            </div>
            <Menu>
                <MenuItem
                    icon={<Home className="sidebar-icon" />}
                    component={<Link to="/dashboard" />}
                    className="pro-menu-item"
                    active={activeIndex === 0}
                    onClick={() => setActiveIndex(0)}
                >
                    Home
                </MenuItem>
                <MenuItem
                    icon={<Users className="sidebar-icon" />}
                    component={<Link to="users" />}
                    className="pro-menu-item"
                    active={activeIndex === 1}
                    onClick={() => setActiveIndex(1)}
                >
                    Users
                </MenuItem>
                <MenuItem
                    icon={<Recipes className="sidebar-icon" />}
                    component={<Link to="recipes" />}
                    className="pro-menu-item"
                    active={activeIndex === 2}
                    onClick={() => setActiveIndex(2)}
                >
                    Recipes
                </MenuItem>
                <MenuItem
                    icon={<Categories className="sidebar-icon" />}
                    component={<Link to="categories" />}
                    className="pro-menu-item"
                    active={activeIndex === 3}
                    onClick={() => setActiveIndex(3)}
                >
                    Categories
                </MenuItem>
                <MenuItem
                    icon={<Unlock className="sidebar-icon" />}
                    className="pro-menu-item"
                >
                    Change Password
                </MenuItem>
                <MenuItem
                    icon={<Logout className="sidebar-icon" />}
                    component={<Link onClick={handleLogout} to="/" />}
                    className="pro-menu-item"
                >
                    Logout
                </MenuItem>
            </Menu>
        </SideBar>
    );
};

export default Sidebar;
