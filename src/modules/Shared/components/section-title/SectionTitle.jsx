import React from "react";

const SectionTitle = ({ title, subTitle, actionTitle }) => {
    return (
        <>
            <div className="title d-flex justify-content-between px-4 py-2 align-items-center">
                <div className="title-text d-flex flex-column">
                    <h5 className="mb-0">{title}</h5>
                    <p className="mb-0">{subTitle}</p>
                </div>
                <a className="btn title-action-btn">{actionTitle}</a>
            </div>
        </>
    );
};

export default SectionTitle;
