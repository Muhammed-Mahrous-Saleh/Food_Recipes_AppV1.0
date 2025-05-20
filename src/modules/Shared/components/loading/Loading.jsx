import React from "react";
import { BallTriangle } from "react-loader-spinner";

const Loading = () => {
    return (
        <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
};

export default Loading;
