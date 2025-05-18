import React from "react";
import Header from "../../../Shared/components/header/Header";

const Dashboard = () => {
    return (
        <>
            <Header
                title={"Welcome"}
                subTitle={"Upskilling!"}
                description={
                    "This is a welcoming screen for the entry of the application , you can now see the options"
                }
            />
        </>
    );
};

export default Dashboard;
