import Header from "@/modules/Shared/components/header/Header";
import React from "react";

const FavList = () => {
    return (
        <>
            <Header
                title={"Favourites"}
                subTitle={"Items !"}
                description={
                    "This is your favourite items list. You can add or remove items from here."
                }
            />
        </>
    );
};

export default FavList;
