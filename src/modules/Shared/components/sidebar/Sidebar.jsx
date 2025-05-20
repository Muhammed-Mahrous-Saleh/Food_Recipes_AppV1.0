import React from "react";
import { Sidebar as SideBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Home from "../../../../assets/icons/home.svg?react";
import Users from "../../../../assets/icons/users.svg?react";
import Recipes from "../../../../assets/icons/recipes.svg?react";
import Categories from "../../../../assets/icons/categories.svg?react";
import Unlock from "../../../../assets/icons/unlock.svg?react";
import Logout from "../../../../assets/icons/logout.svg?react";
import logo from "@/assets/images/logo.png";
import { useState } from "react";

const Sidebar = ({ setLoginData }) => {
    const [collapsed, setCollapsed] = useState(false);

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
