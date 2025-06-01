import { useState } from "react";
import AuthTitle from "../../../Shared/components/authTitle/AuthTitle";
import AuthInput from "../../../Shared/components/authInput/AuthInput";
import Envelope from "../../../../assets/icons/envelope.svg?react";
import Lock from "../../../../assets/icons/lock.svg?react";
import AuthBtn from "../../../Shared/components/authBtn/AuthBtn";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { axiosInstance, USERS_URL } from "@/modules/Shared/utils/urls";

const ForgetPass = () => {
    let {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            let response = await axiosInstance.post(
                USERS_URL.FORGET_PASS,
                data
            );

            toast.success(
                "Reset OTP sent Successfully, Please check your Email!"
            );
            navigate("/reset-password", { state: { email: data.email } });
        } catch (error) {
            switch (error.response.status) {
                case 404:
                    toast.error("Not Found Email");
                    break;
                default:
                    toast.error(error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <AuthTitle
                title={"Forgot Your Password?"}
                subTitle={
                    "No worries! Please enter your email and we will send a password reset link."
                }
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                    <AuthInput
                        type={"email"}
                        placeholder={"Email"}
                        icon={<Envelope className="icon" />}
                        id={"1"}
                        register={register}
                        errors={errors}
                        registeredName="email"
                        registeredRules={{
                            required: "Email is required",
                            pattern: {
                                value: /\S+@\S{3,}\.\S{2,}/,
                                message: "Enter a valid email",
                            },
                        }}
                    />
                </div>
                <AuthBtn title={"Submit"} isLoading={isLoading} />
            </form>
        </>
    );
};

export default ForgetPass;
