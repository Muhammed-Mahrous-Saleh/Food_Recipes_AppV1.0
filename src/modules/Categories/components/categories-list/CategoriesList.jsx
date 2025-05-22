import Header from "@/modules/Shared/components/header/Header";
import SectionTitle from "@/modules/Shared/components/section-title/SectionTitle";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { format } from "date-fns";
import ViewIcon from "@/assets/icons/view-icon.svg?react";
import EditIcon from "@/assets/icons/edit-icon.svg?react";
import DeleteIcon from "@/assets/icons/delete-icon.svg?react";
import { toast } from "react-toastify";
import Loading from "@/modules/Shared/components/loading/Loading";
import NoData from "@/modules/Shared/components/no-data/NoData";
import ConfirmModal from "@/modules/Shared/components/confirmation-modal/ConfirmModal";
import ActionModal from "@/modules/Shared/components/action-modal/ActionModal";

const CategoriesList = () => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [action, setAction] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState({
        id: "",
        name: "",
    });
    // const [modalTriger, setModalTriger] = useState(null);
    // const [modalInfo, setModalInfo] = useState({});

    let dateFormat = "dd/MM/yyyy HH:mm a";
    let pageSize = 10;

    let handleShowConfirmModal = (category) => {
        // setModalTriger({ id, func });

        // if (modalTriger.func === "delete")
        //     setModalInfo({
        // title: "Delete This Category ?",
        // message:
        //     "are you sure you want to delete this item ? if you are sure just click on delete it",
        // confirmTitle: "Delete this item",
        // onConfirm: () => {
        //     deleteCategory(modalTriger.id);
        // },
        // handleClose: handleCloseModal,
        // show: showModal,
        //     });
        if (category) setSelectedCategory(category);
        setShowConfirmModal(true);
    };

    let handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
        // setModalTriger(null);
        // setModalInfo({});
    };

    let handleShowActionModal = (category) => {
        if (category) setSelectedCategory(category);
        setShowActionModal(true);
    };

    let handleCloseActionModal = () => {
        setShowActionModal(false);
    };

    // const getModalData = () => {};

    // let getConfirm = () => {
    //     console.log("modalInfo", modalTriger);
    //     switch (modalTriger.func) {
    //         case "delete":
    //             deleteCategory(modalTriger.id);
    //             break;
    //         default:
    //             break;
    //     }
    //     handleCloseModal();
    // };

    const getAllCategories = async () => {
        try {
            let response = await toast.promise(
                axios.get(
                    `https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                ),
                {
                    pending: "Loading categories...",
                    success: "Categories loaded successfully",
                    error: "Something went wrong",
                }
            );
            setCategoriesList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCategory = async (id) => {
        let deletedCategory = categoriesList.find((c) => c.id === id);
        try {
            setCategoriesList(
                categoriesList.filter((category) => category.id !== id)
            );

            let response = await toast.promise(
                axios.delete(
                    `https://upskilling-egypt.com:3006/api/v1/Category/${id}`,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                ),
                {
                    pending: "Deleting category...",
                    success: `Category "${deletedCategory.name}" deleted successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            getAllCategories();
        } catch (error) {
            console.log(error);
            setCategoriesList([...categoriesList]);
        }
    };

    const addCategory = async (data) => {
        try {
            let response = await toast.promise(
                axios.post(
                    `https://upskilling-egypt.com:3006/api/v1/Category/`,
                    data,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                ),
                {
                    pending: `Adding ${data.name} Category ..`,
                    success: `${data.name} Category added Successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            getAllCategories();
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    const editCategory = async (data) => {
        console.log("data", data);

        try {
            let response = await toast.promise(
                axios.put(
                    `https://upskilling-egypt.com:3006/api/v1/Category/${selectedCategory.id}`,
                    data,
                    {
                        headers: {
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                ),
                {
                    pending: `Editing ${selectedCategory.name} Category ..`,
                    success: `${selectedCategory.name} Category changed to ${data.name} Successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            getAllCategories();
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    const viewCategory = () => {
        console.log("selectedCategory", selectedCategory);
    };

    useEffect(() => {
        getAllCategories(pageSize, pageNumber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize, pageNumber]);

    return (
        <>
            <Header
                title={"Categories"}
                subTitle={"Items"}
                description={
                    "You can now add your items that any user can order it from the Application and you can edit"
                }
            />
            <div className="categories-content">
                <SectionTitle
                    title={"Categories Table details"}
                    subTitle={"You can check all details"}
                    actionTitle={"Add new Category"}
                    action={() => {
                        setAction("Add");
                        handleShowActionModal();
                    }}
                />

                <div className="categories-table p-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Creation Date</th>
                                <th scope="col">modificationDate</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {categoriesList && categoriesList.length > 0 && (
                            <tbody>
                                {categoriesList.map((category) => {
                                    return (
                                        <tr key={category.id}>
                                            <th scope="row">{category.id}</th>
                                            <td>{category.name}</td>
                                            <td>
                                                {format(
                                                    new Date(
                                                        category.creationDate
                                                    ),
                                                    dateFormat
                                                )}
                                            </td>
                                            <td>
                                                {format(
                                                    new Date(
                                                        category.modificationDate
                                                    ),
                                                    dateFormat
                                                )}
                                            </td>
                                            <td className="d-flex gap-2">
                                                <a
                                                    href="#"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i className="fa-solid fa-chevron-down"></i>
                                                </a>
                                                <div className="actions-container">
                                                    <ul className="dropdown-menu dropdown-menu-end actions-menu">
                                                        <li className="action">
                                                            <div
                                                                className="d-flex align-items-center justify-content-start gap-2"
                                                                onClick={() => {
                                                                    setAction(
                                                                        "View"
                                                                    );
                                                                    handleShowActionModal(
                                                                        category
                                                                    );
                                                                }}
                                                            >
                                                                <ViewIcon className="action-icon" />
                                                                View
                                                            </div>
                                                        </li>
                                                        <li className="action">
                                                            <div
                                                                className="d-flex align-items-center justify-content-start gap-2"
                                                                onClick={() => {
                                                                    setAction(
                                                                        "Edit"
                                                                    );
                                                                    handleShowActionModal(
                                                                        category
                                                                    );
                                                                }}
                                                            >
                                                                <EditIcon className="action-icon" />
                                                                Edit
                                                            </div>
                                                        </li>
                                                        <li className="action">
                                                            <div
                                                                className="d-flex align-items-center justify-content-start gap-2"
                                                                onClick={() => {
                                                                    handleShowConfirmModal(
                                                                        category
                                                                    );
                                                                }}
                                                            >
                                                                <DeleteIcon className="action-icon" />
                                                                Delete
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        )}
                    </table>

                    {categoriesList && categoriesList.length === 0 && (
                        <NoData />
                    )}
                    <ConfirmModal
                        title={`Delete ${selectedCategory.name} Category ?`}
                        message="are you sure you want to delete this item ? if you are sure just click on delete it"
                        confirmTitle="Delete this item"
                        onConfirm={() => {
                            deleteCategory(selectedCategory.id);
                            handleCloseConfirmModal();
                        }}
                        handleClose={handleCloseConfirmModal}
                        show={showConfirmModal}
                    />
                    <ActionModal
                        action={action}
                        confirmTitle={"Save"}
                        // onConfirm={handleCloseActionModal}
                        selectedItem={
                            (action !== "Add" && selectedCategory) || null
                        }
                        onConfirm={
                            (action === "Add" && addCategory) ||
                            (action === "Edit" && editCategory) ||
                            (action === "View" && viewCategory)
                        }
                        handleClose={handleCloseActionModal}
                        placeholder={"Category Name"}
                        show={showActionModal}
                    />
                </div>
            </div>
        </>
    );
};

export default CategoriesList;

// TODO:
/*  table to display categories*/
/*  skeleton loader*/
/*  pagination*/
/*  search*/
/*  add category in modal*/
/*  edit category in modal*/
/*  delete category with modal to confirm*/
/*  view category in modal*/
/*  handle network errors*/
