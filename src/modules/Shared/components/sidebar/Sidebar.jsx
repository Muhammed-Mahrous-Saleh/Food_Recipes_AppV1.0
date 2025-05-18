import React from "react";
import { Sidebar as SideBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({ setLoginData }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoginData(null);
        toast.success("Logout Successfully");
    };
    return (
        <SideBar>
            <Menu>
                <MenuItem component={<Link onClick={handleLogout} to="/" />}>
                    Logout
                </MenuItem>
            </Menu>
        </SideBar>
    );
};

export default Sidebar;
