import Header from "@/modules/Shared/components/header/Header";
import React from "react";

const UsersList = () => {
    return (
        <>
            <Header
                title={"Users"}
                subTitle={"List"}
                description={
                    "You can now add your items that any user can order it from the Application and you can edit"
                }
            />
        </>
    );
};

export default UsersList;
