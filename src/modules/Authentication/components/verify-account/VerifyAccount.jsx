import AuthTitle from "@/modules/Shared/components/authTitle/AuthTitle";
import { axiosInstance, USERS_URL } from "@/modules/Shared/utils/urls";
import { validation } from "@/modules/Shared/utils/validation";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Envelope from "../../../../assets/icons/envelope.svg?react";
import Lock from "../../../../assets/icons/lock.svg?react";
import AuthBtn from "@/modules/Shared/components/authBtn/AuthBtn";
import AuthInput from "@/modules/Shared/components/authInput/AuthInput";

const VerifyAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    let {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            let response = await toast.promise(
                axiosInstance.put(USERS_URL.VERIFY_USER, data),
                {
                    pending: "Verifing Account ...",
                    success: "Account Verified Successfully",
                    error: {
                        render({ data }) {
                            return `${data.response.data.message}`;
                        },
                    },
                }
            );
            navigate("/login");
        } catch (error) {
            console.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AuthTitle
                title={"Verify Account"}
                subTitle={
                    "Welcome! Please enter your details to verify your account."
                }
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column my-3">
                    <AuthInput
                        type={"email"}
                        placeholder={"Email"}
                        icon={<Envelope className="icon" />}
                        id={"1"}
                        register={register}
                        errors={errors}
                        value={location.state?.email}
                        registeredName="email"
                        registeredRules={validation.EMAIL_VALIDATION}
                    />
                    <AuthInput
                        type={"text"}
                        placeholder={"OTP"}
                        icon={<Lock className="icon" />}
                        id={"2"}
                        register={register}
                        errors={errors}
                        registeredName="code"
                        registeredRules={{ required: "OTP is required" }}
                    />
                </div>
                <AuthBtn title={"Activate Account"} isLoading={isLoading} />
            </form>
        </>
    );
};

export default VerifyAccount;
