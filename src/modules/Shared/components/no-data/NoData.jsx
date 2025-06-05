import React from "react";
import NoDataImg from "@/assets/images/modal_img.png";

const NoData = ({ title }) => {
    const myTitle = title || "Data";
    return (
        <>
            <div className="no-data-container d-flex flex-column align-items-center justify-content-center gap-4">
                <img src={NoDataImg} className="w-50" alt="no data image" />
                <h3 className="text-center">{`No ${myTitle} !`}</h3>
                <p>
                    No {myTitle} to present, you can start adding new {myTitle}
                </p>
            </div>
        </>
    );
};

export default NoData;
