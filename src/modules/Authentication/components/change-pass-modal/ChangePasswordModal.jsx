import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalImg from "@/assets/images/modal_img.png";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { axiosInstance, USERS_URL } from "@/modules/Shared/utils/urls";
import Lock from "../../../../assets/icons/lock.svg?react";
import { toast } from "react-toastify";
import AuthInput from "@/modules/Shared/components/authInput/AuthInput";
import { validation } from "@/modules/Shared/utils/validation";

const ChangePasswordModal = ({ show, handleClose }) => {
    let {
        formState: { errors },
        handleSubmit,
        register,
        watch,
        setValue,
    } = useForm();

    const [loading, setLoading] = useState(false);
    const newPassword = watch("newPassword");

    useEffect(() => {
        console.log("I have been rerendered");
    }, [show]);

    const onSubmit = async (data) => {
        setLoading(true);
        console.log("data", data);
        try {
            let response = await toast.promise(
                axiosInstance.put(`${USERS_URL.CHANGE_PASSWORD}`, data),
                {
                    pending: "Changing Password...",
                    success: "Password Changed successfully",
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            if (response.status === 200) {
                onClose();
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };

    const onClose = () => {
        setValue("newPassword", "");
        setValue("oldPassword", "");
        setValue("confirmNewPassword", "");
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Body className="action-modal custom-modal">
                    <div className="header d-flex justify-content-between align-items-center">
                        <h4>Changing Password</h4>
                        <div className="close-icon" onClick={onClose}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="d-flex flex-column p-4 gap-3">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="input-container">
                                <AuthInput
                                    type={"password"}
                                    placeholder={"Old Password"}
                                    icon={<Lock className="icon" />}
                                    id={"1"}
                                    register={register}
                                    errors={errors}
                                    registeredName="oldPassword"
                                    registeredRules={{
                                        required: "Old Password is required",
                                    }}
                                />
                            </div>
                            <div className="input-container">
                                <AuthInput
                                    type={"password"}
                                    placeholder={"New Password"}
                                    icon={<Lock className="icon" />}
                                    id={"2"}
                                    register={register}
                                    errors={errors}
                                    registeredName="newPassword"
                                    registeredRules={validation.PASSWORD_VALIDATION(
                                        "New Password is required."
                                    )}
                                />
                            </div>
                            <div className="input-container">
                                <AuthInput
                                    type={"password"}
                                    placeholder={"Confirm New Password"}
                                    icon={<Lock className="icon" />}
                                    id={"3"}
                                    register={register}
                                    errors={errors}
                                    registeredName="confirmNewPassword"
                                    registeredRules={validation.CONFIRM_PASSWORD_VALIDATION(
                                        newPassword
                                    )}
                                />
                            </div>

                            <hr />
                            <div className="action-container d-flex justify-content-end">
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {(loading && (
                                        <div
                                            className="spinner-grow spinner-grow-sm text-light"
                                            role="status"
                                        >
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    )) ||
                                        "Change Password"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ChangePasswordModal;
