import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ModalImg from "@/assets/images/modal_img.png";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { IMAGE_PATH } from "@/modules/Shared/utils/urls";

const RecipeActionModal = ({ action, show, handleClose, selectedItem }) => {
    useEffect(() => {
        console.log("selectedItem", selectedItem);
    }, [selectedItem]);

    const onClose = () => {
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Body className="action-modal custom-modal">
                    <div className="header d-flex justify-content-between align-items-center">
                        <h4>{action} Recipe</h4>
                        <div className="close-icon" onClick={onClose}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="d-flex flex-column p-4 gap-3">
                        <div className="d-flex flex-column justify-content-start align-items-start text-start">
                            <div className="recipe-image-view w-50 rounded-3 border-2 border mx-auto">
                                <img
                                    src={IMAGE_PATH(selectedItem?.imagePath)}
                                    className="w-100"
                                    alt=""
                                />
                            </div>
                            {selectedItem &&
                                Object.keys(selectedItem).map((key) => (
                                    <p key={key}>
                                        <strong>{key}</strong>: &nbsp;
                                        {key === "category" &&
                                        Array.isArray(selectedItem[key])
                                            ? Object.entries(
                                                  selectedItem[key][0]
                                              ).map(
                                                  (
                                                      [subkey, value],
                                                      index,
                                                      arr
                                                  ) => (
                                                      <span key={subkey}>
                                                          {subkey}: {value}
                                                          {index !==
                                                              arr.length - 1 &&
                                                              ","}
                                                          <br />
                                                      </span>
                                                  )
                                              )
                                            : key === "tag"
                                            ? Object.entries(
                                                  selectedItem[key]
                                              ).map(
                                                  (
                                                      [subkey, value],
                                                      index,
                                                      arr
                                                  ) => (
                                                      <span key={subkey}>
                                                          {subkey}: {value}
                                                          {index !==
                                                              arr.length - 1 &&
                                                              ","}
                                                          <br />
                                                      </span>
                                                  )
                                              )
                                            : selectedItem[key]}
                                    </p>
                                ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RecipeActionModal;
