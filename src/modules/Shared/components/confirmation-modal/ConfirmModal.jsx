import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalImg from "@/assets/images/modal_img.png";

const ConfirmModal = ({
    title,
    message,
    onConfirm,
    show,
    handleClose,
    confirmTitle,
}) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body className="confirm-modal custom-modal">
                    <div className="close-icon" onClick={handleClose}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <div className="d-flex flex-column p-4 justify-content-center align-items-center gap-3">
                        <img
                            src={ModalImg}
                            className="w-75 mx-auto"
                            alt="Modal Image"
                        />
                        <h4>{title}</h4>
                        <p>{message}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={onConfirm}>
                        {confirmTitle}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ConfirmModal;
