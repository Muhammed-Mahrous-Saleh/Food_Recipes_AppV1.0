import React from "react";

const AuthTitle = ({ title, subTitle }) => {
    return (
        <div className="auth-title my-4">
            <h4 className="mb-1">{title}</h4>
            <span className="text-secondary">{subTitle}</span>
        </div>
    );
};

export default AuthTitle;
