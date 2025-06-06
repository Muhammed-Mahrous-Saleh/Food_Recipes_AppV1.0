import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalImg from "@/assets/images/modal_img.png";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { format } from "date-fns";

const ActionModal = ({
    action,
    placeholder,
    onConfirm,
    show,
    handleClose,
    confirmTitle,
    selectedItem,
}) => {
    let {
        formState: { errors },
        handleSubmit,
        control,
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [catName, setCatName] = useState("");

    useEffect(() => {
        console.log("selectedItem", selectedItem);
        if (selectedItem) {
            setCatName(selectedItem.name);
        } else {
            setCatName("");
        }
    }, [selectedItem]);

    let dateFormat = "dd/MM/yyyy HH:mm a";

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            let response = await onConfirm(data);
            if (response) {
                onClose();
            }
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };

    const onClose = () => {
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Body className="action-modal custom-modal">
                    <div className="header d-flex justify-content-between align-items-center">
                        <h4>{action} Category</h4>
                        <div className="close-icon" onClick={onClose}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="d-flex flex-column p-4 gap-3">
                        {(action !== "View" && (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-container">
                                    <Controller
                                        name="name"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required:
                                                "Category name is required.",
                                        }}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder={placeholder}
                                                onChange={(e) => {
                                                    field.onChange(e); // important for RHF
                                                    setCatName(e.target.value); // your custom logic
                                                }}
                                                value={catName}
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <span className="text-danger">
                                            {errors.name.message}
                                        </span>
                                    )}
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
                                            confirmTitle}
                                    </Button>
                                </div>
                            </form>
                        )) || (
                            <div className="d-flex flex-column justify-content-start align-items-start">
                                {selectedItem &&
                                    Object.keys(selectedItem).map((key) => (
                                        <p key={key}>
                                            {key} :{" "}
                                            {key === "recipe"
                                                ? selectedItem[key].map(
                                                      (item) => item.name + ","
                                                  )
                                                : [
                                                      "modificationDate",
                                                      "creationDate",
                                                  ].includes(key)
                                                ? format(
                                                      new Date(
                                                          selectedItem[key]
                                                      ),
                                                      dateFormat
                                                  )
                                                : selectedItem[key]}
                                        </p>
                                    ))}
                            </div>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ActionModal;
