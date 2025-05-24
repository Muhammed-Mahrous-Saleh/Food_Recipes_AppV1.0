import React from "react";
import { useState, useLocation } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthTitle from "../../../Shared/components/authTitle/AuthTitle";
import AuthInput from "../../../Shared/components/authInput/AuthInput";
import Envelope from "../../../../assets/icons/envelope.svg?react";
import Lock from "../../../../assets/icons/lock.svg?react";
import AuthBtn from "../../../Shared/components/authBtn/AuthBtn";
import { toast } from "react-toastify";
import axios from "axios";
import { USERS_URL } from "@/modules/Shared/utils/urls";

const ResetPass = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    let {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm();

    const newPassword = watch("password");

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            let response = await axios.post(USERS_URL.RESET_PASS, data);
            toast.success("Password has been updated successfully");
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <AuthTitle
                title={"Reset  Password"}
                subTitle={"Please Enter Your OTP or Check Your Inbox."}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <AuthInput
                        type={"email"}
                        placeholder={"Email"}
                        icon={<Envelope className="icon" />}
                        id={"1"}
                        register={register}
                        errors={errors}
                        value={location.state?.email}
                        disabled={true}
                        registeredName="email"
                        registeredRules={{
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S{3,}\.\S{2,}/,
                                message: "Enter a valid email",
                            },
                        }}
                    />
                    <AuthInput
                        type={"text"}
                        placeholder={"OTP"}
                        icon={<Lock className="icon" />}
                        id={"2"}
                        register={register}
                        errors={errors}
                        registeredName="seed"
                        registeredRules={{ required: "OTP is required" }}
                    />
                    <AuthInput
                        type={"password"}
                        placeholder={"New Password"}
                        icon={<Lock className="icon" />}
                        id={"3"}
                        register={register}
                        errors={errors}
                        registeredName="password"
                        registeredRules={{
                            required: "New Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                            validate: {
                                hasUppercase: (value) =>
                                    /[A-Z]/.test(value) ||
                                    "Password must contain at least one uppercase letter",
                                hasLowercase: (value) =>
                                    /[a-z]/.test(value) ||
                                    "Password must contain at least one lowercase letter",
                                hasNumber: (value) =>
                                    /\d/.test(value) ||
                                    "Password must contain at least one number",
                                hasSpecialChar: (value) =>
                                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                    "Password must contain at least one special character",
                            },
                        }}
                    />
                    <AuthInput
                        type={"password"}
                        placeholder={"Confirm Password"}
                        icon={<Lock className="icon" />}
                        id={"4"}
                        register={register}
                        errors={errors}
                        registeredName="confirmPassword"
                        registeredRules={{
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === newPassword ||
                                "Passwords do not match",
                        }}
                    />
                </div>
                <AuthBtn title={"Reset Password"} isLoading={isLoading} />
            </form>
        </>
    );
};

export default ResetPass;
