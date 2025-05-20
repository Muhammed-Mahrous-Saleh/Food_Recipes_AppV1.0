import React from "react";
import ghimg from "@/assets/images/general-header-img.png";

const Header = ({ title, description, subTitle, imgsrc }) => {
    return (
        <header className="container-fluid">
            <div className="p-3">
                <div className="row rounded-4 header-container align-items-center justify-content-between">
                    <div className="col-md-6 p-4">
                        <h3>
                            {title} <span>{subTitle}</span>{" "}
                        </h3>
                        <p>{description}</p>
                    </div>
                    <div
                        className={`header-img-container me-3 ${
                            imgsrc ? "mt-3  col-md-4" : "col-md-2"
                        }`}
                    >
                        <img
                            src={imgsrc ? imgsrc : ghimg}
                            className="w-100"
                            alt="menu item image"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
