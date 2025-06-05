import { useState } from "react";
import AuthTitle from "../../../Shared/components/authTitle/AuthTitle";
import AuthInput from "../../../Shared/components/authInput/AuthInput";
import Envelope from "../../../../assets/icons/envelope.svg?react";
import Phone from "../../../../assets/icons/phone.svg?react";
import User from "../../../../assets/icons/user.svg?react";
import Country from "../../../../assets/icons/public.svg?react";
import Lock from "../../../../assets/icons/lock.svg?react";
import AuthBtn from "../../../Shared/components/authBtn/AuthBtn";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { validation } from "@/modules/Shared/utils/validation";
import { axiosInstance, USERS_URL } from "@/modules/Shared/utils/urls";

const Register = () => {
    let {
        register,
        formState: { errors, isSubmitted },
        handleSubmit,
        watch,
        getValues,
        trigger,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const profileImage = watch("profileImage");
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
        } else {
            toast.error("Please select an image file");
        }
    };

    const appendToFormData = (data) => {
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }

        formData.append("profileImage", profileImage[0]);

        return formData;
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const registerData = appendToFormData(data);
            console.log("data", data);
            console.log("registerData", registerData);
            await toast.promise(
                axiosInstance.post(USERS_URL.REGISTER, registerData),
                {
                    pending: "Registering ...",
                    success:
                        "Registered Successfully, a verfication email has been sent",
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            navigate("/verify-account");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <AuthTitle
                title={"Register"}
                subTitle={"Welcome! Please enter your details to register."}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex gap-4">
                    <div className="d-flex flex-column">
                        <AuthInput
                            type={"text"}
                            placeholder={"User Name"}
                            icon={<User className="icon" />}
                            id={"1"}
                            register={register}
                            errors={errors}
                            registeredName="userName"
                            registeredRules={validation.USERNAME_VALIDATION}
                        />
                        <AuthInput
                            type={"text"}
                            placeholder={"Country"}
                            icon={<Country className="icon" />}
                            id={"3"}
                            register={register}
                            errors={errors}
                            registeredName="country"
                            registeredRules={validation.COUNTRY_VALIDATION}
                        />
                        <AuthInput
                            type={"password"}
                            placeholder={"Password"}
                            icon={<Lock className="icon" />}
                            id={"5"}
                            register={register}
                            errors={errors}
                            registeredName="password"
                            registeredRules={{
                                required: "Password is required",
                            }}
                            triggerOnChange={"confirmPassword"}
                            trigger={trigger}
                            isSubmitted={isSubmitted}
                        />
                    </div>
                    <div className="d-flex flex-column">
                        <AuthInput
                            type={"email"}
                            placeholder={"Email"}
                            icon={<Envelope className="icon" />}
                            id={"2"}
                            register={register}
                            errors={errors}
                            registeredName="email"
                            registeredRules={validation.EMAIL_VALIDATION}
                        />
                        <AuthInput
                            type={"text"}
                            placeholder={"Phone Number"}
                            icon={<Phone className="icon" />}
                            id={"4"}
                            register={register}
                            errors={errors}
                            registeredName="phoneNumber"
                            registeredRules={validation.PHONE_VALIDATION}
                        />

                        <AuthInput
                            type={"password"}
                            placeholder={"Confirm Password"}
                            icon={<Lock className="icon" />}
                            id={"6"}
                            register={register}
                            errors={errors}
                            registeredName="confirmPassword"
                            registeredRules={validation.CONFIRM_PASSWORD_VALIDATION(
                                getValues,
                                "password"
                            )}
                        />
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <label htmlFor="profileImage">Profile Image:</label>
                    <input
                        disabled={isLoading}
                        type="file"
                        placeholder="Profile Image"
                        name="profileImage"
                        id="profileImage"
                        accept="image/*"
                        {...register("profileImage")}
                        onChange={handleFileChange}
                        multiple={false}
                    />
                </div>

                <div className="form-links d-flex justify-content-end">
                    <Link to={"/login"}>Login Now?</Link>
                </div>
                <AuthBtn title={"Register"} isLoading={isLoading} />
            </form>
        </>
    );
};

export default Register;
