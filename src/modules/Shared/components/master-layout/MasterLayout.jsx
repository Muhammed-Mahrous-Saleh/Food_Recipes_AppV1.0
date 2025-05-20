import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";

const MasterLayout = ({ loginData, setLoginData }) => {
    return (
        <>
            <div className="d-flex">
                <div className="sidebar">
                    <Sidebar setLoginData={setLoginData} />
                </div>
                <div className="w-100">
                    <Navbar loginData={loginData} />
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default MasterLayout;
