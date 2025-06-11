import React from "react";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import { IMAGE_PATH } from "@/modules/Shared/utils/urls";
import { format } from "date-fns";

const UserActionModal = ({ action, show, handleClose, selectedItem }) => {
    let dateFormat = "dd/MM/yyyy HH:mm a";

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
                        <h4>{action} User</h4>
                        <div className="close-icon" onClick={onClose}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="d-flex flex-column p-4 gap-3">
                        <div className="d-flex flex-column justify-content-start align-items-start text-start">
                            <div className="recipe-image-view w-50 rounded-3 border-2 border mx-auto">
                                <img
                                    src={
                                        selectedItem?.imagePath
                                            ? IMAGE_PATH(
                                                  selectedItem?.imagePath
                                              )
                                            : "https://placehold.co/400?text=No+Image"
                                    }
                                    className="w-100"
                                    alt="No Image"
                                />
                            </div>
                            {selectedItem &&
                                Object.keys(selectedItem).map((key) => (
                                    <p key={key}>
                                        <strong>{key}</strong>: &nbsp;
                                        {key === "group"
                                            ? Object.entries(
                                                  selectedItem[key]
                                              ).map(
                                                  (
                                                      [subkey, value],
                                                      index,
                                                      arr
                                                  ) =>
                                                      ([
                                                          "creationDate",
                                                          "modificationDate",
                                                      ].includes(subkey) && (
                                                          <span key={subkey}>
                                                              {subkey}:{" "}
                                                              {format(
                                                                  new Date(
                                                                      value
                                                                  ),
                                                                  dateFormat
                                                              )}
                                                              {index !==
                                                                  arr.length -
                                                                      1 && ","}
                                                              <br />
                                                          </span>
                                                      )) || (
                                                          <span key={key}>
                                                              {subkey}: {value}
                                                              {index !==
                                                                  arr.length -
                                                                      1 && ","}
                                                              <br />
                                                          </span>
                                                      )
                                              )
                                            : ([
                                                  "creationDate",
                                                  "modificationDate",
                                              ].includes(key) && (
                                                  <span key={key}>
                                                      {format(
                                                          new Date(
                                                              selectedItem[key]
                                                          ),
                                                          dateFormat
                                                      )}
                                                  </span>
                                              )) ||
                                              selectedItem[key]}
                                    </p>
                                ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default UserActionModal;
