import Header from "@/modules/Shared/components/header/Header";
import SectionTitle from "@/modules/Shared/components/section-title/SectionTitle";
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
import Skeleton from "react-loading-skeleton";
import SkeletonLoadingTable from "@/modules/Shared/components/skeletonLoadingTable/SkeletonLoadingTable";
import Pagination from "react-bootstrap/Pagination";
import { axiosInstance, CATEGORIES_URL } from "@/modules/Shared/utils/urls";

const CategoriesList = () => {
    const [categoriesList, setCategoriesList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPagesNumber, setTotalPagesNumber] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [action, setAction] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedViewCategory, setSelectedViewCategory] = useState(null);
    const [search, setSearch] = useState("");
    const pages = [];

    let dateFormat = "dd/MM/yyyy HH:mm a";
    let pageSize = 10;

    let handleShowConfirmModal = (category) => {
        if (category) setSelectedCategory(category);
        setShowConfirmModal(true);
    };

    let handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    let handleShowActionModal = (category) => {
        if (category) setSelectedCategory(category);
        setShowActionModal(true);
    };

    let handleCloseActionModal = () => {
        setShowActionModal(false);
    };

    const getAllCategories = async (controller) => {
        setLoading(true);
        try {
            let response = await toast.promise(
                axiosInstance.get(`${CATEGORIES_URL.GET_CATEGORIES}`, {
                    signal: controller?.signal,
                    params: {
                        name: search,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                    },
                }),
                {
                    pending: "Loading categories...",
                    success: "Categories loaded successfully",
                    error: "Something went wrong",
                }
            );
            console.log("response", response);
            /**
             * response data:
             * pageNumber: 1
             * pageSize: 10
             * totalNumberOfPages: 3
             * totalNumberOfRecords: 25
             */
            setCategoriesList(response.data.data);
            setTotalPagesNumber(response.data.totalNumberOfPages);
            setLoading(false);
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
                axiosInstance.delete(`${CATEGORIES_URL.DELETE_CATEGORY(id)}`),
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
                axiosInstance.post(CATEGORIES_URL.ADD_CATEGORY, data),
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
        try {
            let response = await toast.promise(
                axiosInstance.put(
                    `${CATEGORIES_URL.EDIT_CATEGORY(selectedCategory.id)}`,
                    data
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

    const viewCategory = async ({ category }) => {
        console.log("starting view category");
        let data = { id: category.id };
        try {
            let response = await toast.promise(
                axiosInstance.get(
                    `${CATEGORIES_URL.GET_CATEGORY(category.id)}`,
                    data
                ),
                {
                    pending: `Getting ${category.name} Category ..`,
                    success: `${category.name} Category got Successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            console.log("response", response);
            setSelectedViewCategory(response.data);
            console.log("response", response);
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        getAllCategories(controller);
        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, search]);

    pages.push(<Pagination.First onClick={() => setPageNumber(1)} />);
    pages.push(
        <Pagination.Prev onClick={() => setPageNumber(pageNumber - 1)} />
    );
    for (let number = 1; number <= totalPagesNumber; number++) {
        if (
            number === totalPagesNumber ||
            number === pageNumber ||
            number === pageNumber - 1 ||
            number === pageNumber + 1
        ) {
            pages.push(
                <Pagination.Item
                    key={number}
                    active={number === pageNumber}
                    onClick={() => setPageNumber(number)}
                >
                    {number}
                </Pagination.Item>
            );
        } else if (number === 1 || number === totalPagesNumber - 1) {
            pages.push(<Pagination.Ellipsis />);
        }
    }
    pages.push(
        <Pagination.Next onClick={() => setPageNumber(pageNumber + 1)} />
    );
    pages.push(
        <Pagination.Last onClick={() => setPageNumber(totalPagesNumber)} />
    );

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
                    search={search}
                    setSearch={setSearch}
                    setPageNumber={setPageNumber}
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
                        {loading && !categoriesList && (
                            <SkeletonLoadingTable col_count={5} row_count={3} />
                        )}
                        {categoriesList && categoriesList.length > 0 && (
                            <>
                                <tbody>
                                    {categoriesList.map((category) => {
                                        return (
                                            <tr key={category.id}>
                                                <th scope="row">
                                                    {category.id}
                                                </th>
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
                                                <td>
                                                    <div className="actions d-flex align-items-center">
                                                        <a
                                                            href="#"
                                                            role="button"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            <i className="fa-solid fa-ellipsis"></i>
                                                        </a>
                                                        <div className="actions-container">
                                                            <ul className="dropdown-menu dropdown-menu-end actions-menu">
                                                                <li className="action">
                                                                    <div
                                                                        className="d-flex align-items-center justify-content-start gap-2"
                                                                        onClick={async () => {
                                                                            setAction(
                                                                                "View"
                                                                            );
                                                                            await viewCategory(
                                                                                {
                                                                                    category,
                                                                                }
                                                                            );
                                                                            console.log(
                                                                                "viewCategory",
                                                                                selectedViewCategory
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
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </>
                        )}
                    </table>
                    {categoriesList && categoriesList.length > 0 && (
                        <div className="pagination-container d-flex justify-content-end p-1">
                            <Pagination>{pages}</Pagination>
                        </div>
                    )}

                    {categoriesList && categoriesList.length === 0 && (
                        <NoData />
                    )}
                    <ConfirmModal
                        title={`Delete ${selectedCategory?.name} Category ?`}
                        message="are you sure you want to delete this item ? if you are sure just click on delete it"
                        confirmTitle="Delete this item"
                        onConfirm={() => {
                            deleteCategory(selectedCategory?.id);
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
                            (action === "Edit" && selectedCategory) ||
                            (action === "View" && selectedViewCategory) ||
                            (action === "Add" && { name: "" })
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
