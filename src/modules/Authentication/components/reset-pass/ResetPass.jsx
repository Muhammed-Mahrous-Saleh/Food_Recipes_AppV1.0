import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthTitle from "../../../Shared/components/authTitle/AuthTitle";
import AuthInput from "../../../Shared/components/authInput/AuthInput";
import Envelope from "../../../../assets/icons/envelope.svg?react";
import Lock from "../../../../assets/icons/lock.svg?react";
import AuthBtn from "../../../Shared/components/authBtn/AuthBtn";
import { toast } from "react-toastify";
import axios from "axios";
import { axiosInstance, USERS_URL } from "@/modules/Shared/utils/urls";
import { validation } from "@/modules/Shared/utils/validation";

const ResetPass = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
            let response = await axiosInstance.post(USERS_URL.RESET_PASS, data);
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
                        // disabled={true}
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
                        registeredRules={validation.PASSWORD_VALIDATION(
                            "New Password is required"
                        )}
                    />
                    <AuthInput
                        type={"password"}
                        placeholder={"Confirm Password"}
                        icon={<Lock className="icon" />}
                        id={"4"}
                        register={register}
                        errors={errors}
                        registeredName="confirmPassword"
                        registeredRules={validation.CONFIRM_PASSWORD_VALIDATION(
                            newPassword
                        )}
                    />
                </div>
                <AuthBtn title={"Reset Password"} isLoading={isLoading} />
            </form>
        </>
    );
};

export default ResetPass;
