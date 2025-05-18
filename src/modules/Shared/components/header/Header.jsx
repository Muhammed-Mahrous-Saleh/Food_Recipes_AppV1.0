import React from "react";

const Header = ({ title, description, subTitle, imgsrc }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    <h3>
                        {title} <span>{subTitle}</span>{" "}
                    </h3>
                    <p>{description}</p>
                </div>
                <div className="col-md-4">
                    elsora
                    {/* <img src={imgsrc} className="w-100" alt="" /> */}
                </div>
            </div>
        </div>
    );
};

export default Header;
