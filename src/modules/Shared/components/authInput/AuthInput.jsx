import React from "react";
import { useState } from "react";
import EyeIcon from "../../../../assets/icons/eye.svg?react";
import EyeSlashIcon from "../../../../assets/icons/eye-slash.svg?react";

const AuthInput = ({
    icon,
    type,
    placeholder,
    id,
    register,
    errors,
    registeredName,
    registeredRules,
    value,
    disabled,
}) => {
    const [isHidden, setIsHidden] = useState(type === "password");
    return (
        <div className="input-group-container">
            <div className="input-group bg-input">
                <span className="input-group-text" id={`basic-addon${id}`}>
                    {icon}
                </span>
                <input
                    type={
                        type !== "password"
                            ? type
                            : isHidden
                            ? "password"
                            : "text"
                    }
                    className="form-control"
                    placeholder={placeholder}
                    aria-label={placeholder}
                    aria-describedby={`basic-addon${id}`}
                    id={id}
                    value={disabled && value}
                    disabled={disabled || false}
                    {...register(registeredName, registeredRules)}
                />
                {type === "password" && (
                    <span
                        className="icon input-group-text"
                        onClick={() => {
                            setIsHidden(!isHidden);
                        }}
                    >
                        {isHidden ? (
                            <EyeSlashIcon className="icon" />
                        ) : (
                            <EyeIcon className="icon" />
                        )}
                    </span>
                )}
            </div>
            {errors[registeredName] && (
                <span className="text-danger">
                    {errors[registeredName].message}
                </span>
            )}
        </div>
    );
};

export default AuthInput;
