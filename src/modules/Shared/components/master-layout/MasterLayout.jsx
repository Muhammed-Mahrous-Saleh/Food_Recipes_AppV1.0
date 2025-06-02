import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const MasterLayout = () => {
    return (
        <>
            <div className="d-flex">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="w-100">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default MasterLayout;
