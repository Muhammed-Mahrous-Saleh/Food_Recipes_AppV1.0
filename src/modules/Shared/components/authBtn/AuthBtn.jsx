import React from "react";

const AuthBtn = ({ title, isLoading }) => {
    return (
        <button className="auth-btn btn w-100" disabled={isLoading}>
            {(isLoading && (
                <div
                    class="spinner-grow spinner-grow-sm text-light"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
            )) ||
                title}
        </button>
    );
};

export default AuthBtn;
