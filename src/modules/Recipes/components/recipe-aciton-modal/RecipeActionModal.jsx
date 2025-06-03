import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { IMAGE_PATH } from "@/modules/Shared/utils/urls";
import { useContext } from "react";
import { AuthContext, FavouriteContext } from "@/context/context";

const RecipeActionModal = ({ action, show, handleClose, selectedItem }) => {
    useEffect(() => {
        console.log("selectedItem", selectedItem);
    }, [selectedItem]);

    const { currentUser } = useContext(AuthContext);
    const { addToFavourites, favouriteList, removeFromFavourites, favLoading } =
        useContext(FavouriteContext);

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
                                currentUser.group.id === 1 &&
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
                                            : key === "price"
                                            ? selectedItem[key] + " EGP"
                                            : selectedItem[key]}
                                    </p>
                                ))}
                            {selectedItem &&
                                currentUser.group.id === 2 &&
                                [
                                    "name",
                                    "description",
                                    // "price",
                                    // "category",
                                    // "tag",
                                ].map((key) => (
                                    <div className="d-flex">
                                        <strong>{key}</strong>: &nbsp;
                                        {selectedItem[key]}
                                    </div>
                                ))}
                            {selectedItem && currentUser.group.id === 2 && (
                                <>
                                    <div className="d-flex">
                                        <strong>Price</strong>: &nbsp;
                                        {selectedItem["price"]} EGP
                                    </div>
                                    <div className="d-flex">
                                        <strong>Category</strong>: &nbsp;
                                        {selectedItem["category"][0].name}
                                    </div>
                                    <div className="d-flex">
                                        <strong>Tag</strong>: &nbsp;
                                        {selectedItem["tag"].name}
                                    </div>
                                </>
                            )}
                            {selectedItem && currentUser.group.id === 2 && (
                                <div className="d-flex justify-content-end align-self-end">
                                    <Button
                                        disabled={favLoading}
                                        className={"btn btn-success"}
                                        onClick={() => {
                                            favouriteList.includes(selectedItem)
                                                ? removeFromFavourites(
                                                      selectedItem
                                                  )
                                                : addToFavourites(selectedItem);
                                        }}
                                    >
                                        {(favLoading && (
                                            <div
                                                className="spinner-grow spinner-grow-sm text-light"
                                                role="status"
                                                key={selectedItem.id}
                                            >
                                                <span className="visually-hidden">
                                                    Loading...
                                                </span>
                                            </div>
                                        )) ||
                                            (favouriteList
                                                .map((f) => f.id)
                                                .includes(selectedItem.id) ? (
                                                <i
                                                    className="fa fa-heart"
                                                    key={selectedItem.id}
                                                ></i>
                                            ) : (
                                                <i
                                                    className="fa-regular fa-heart"
                                                    key={selectedItem.id}
                                                ></i>
                                            ))}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default RecipeActionModal;
