import { useState } from "react";
import AuthTitle from "../../../Shared/components/authTitle/AuthTitle";
import AuthInput from "../../../Shared/components/authInput/AuthInput";
import Envelope from "../../../../assets/icons/envelope.svg?react";
import Lock from "../../../../assets/icons/lock.svg?react";
import AuthBtn from "../../../Shared/components/authBtn/AuthBtn";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { validation } from "@/modules/Shared/utils/validation";
import { axiosInstance, USERS_URL } from "@/modules/Shared/utils/urls";
import { useContext } from "react";
import { AuthContext } from "@/context/context";

const Login = () => {
    let { saveLoginData } = useContext(AuthContext);
    const location = useLocation();
    let {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    if (location.state?.email) {
        setValue("email", location.state?.email);
    }
    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            let response = await axiosInstance.post(USERS_URL.LOGIN, data);
            localStorage.setItem("token", response.data.token);
            saveLoginData();
            toast.success("logedin Successfully");
            navigate("/dashboard");
        } catch (error) {
            switch (error.response.status) {
                case 404:
                    // toast.error("Eamil Not Found");
                    toast.error("Email or Password is incorrect");
                    break;
                case 401:
                    toast.error("Email or Password is incorrect");
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
                title={"Log In"}
                subTitle={"Welcome Back! Please enter your details."}
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
                        registeredName="email"
                        registeredRules={validation.EMAIL_VALIDATION}
                    />
                    <AuthInput
                        type={"password"}
                        placeholder={"Password"}
                        icon={<Lock className="icon" />}
                        id={"2"}
                        register={register}
                        errors={errors}
                        registeredName="password"
                        registeredRules={{ required: "Password is required" }}
                    />
                </div>

                <div className="form-links d-flex justify-content-between">
                    <Link to={"/register"}>Register Now?</Link>
                    <Link to={"/forget-password"}>Forgot Password?</Link>
                </div>
                <AuthBtn title={"Login"} isLoading={isLoading} />
            </form>
        </>
    );
};

export default Login;
