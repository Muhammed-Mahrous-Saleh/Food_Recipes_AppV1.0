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
import {
    axiosInstance,
    RECIPES_URL,
    IMAGE_PATH,
} from "@/modules/Shared/utils/urls";

const RecipesList = () => {
    const [recipesList, setRecipesList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPagesNumber, setTotalPagesNumber] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [action, setAction] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [selectedViewRecipe, setSelectedViewRecipe] = useState(null);
    const [search, setSearch] = useState("");
    const pages = [];

    let dateFormat = "dd/MM/yyyy HH:mm a";
    let pageSize = 10;

    let handleShowConfirmModal = (recipe) => {
        if (recipe) setSelectedRecipe(recipe);
        setShowConfirmModal(true);
    };

    let handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    let handleShowActionModal = (recipe) => {
        if (recipe) setSelectedRecipe(recipe);
        setShowActionModal(true);
    };

    let handleCloseActionModal = () => {
        setShowActionModal(false);
    };

    const getAllRecipes = async (controller) => {
        setLoading(true);
        try {
            let response = await toast.promise(
                axiosInstance.get(`${RECIPES_URL.GET_RECIPES}`, {
                    signal: controller?.signal,
                    params: {
                        name: search,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                    },
                }),
                {
                    pending: "Loading recipes...",
                    success: "Recipes loaded successfully",
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
            setRecipesList(response.data.data);
            setTotalPagesNumber(response.data.totalNumberOfPages);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteRecipe = async (id) => {
        let deletedRecipe = recipesList.find((c) => c.id === id);
        try {
            setRecipesList(recipesList.filter((recipe) => recipe.id !== id));

            let response = await toast.promise(
                axiosInstance.delete(`${RECIPES_URL.DELETE_RECIPE}`, {
                    params: { id },
                }),
                {
                    pending: "Deleting Recipe...",
                    success: `Recipe "${deletedRecipe.name}" deleted successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            getAllRecipes();
        } catch (error) {
            console.log(error);
            setRecipesList([...recipesList]);
        }
    };

    const addRecipe = async (data) => {
        try {
            let response = await toast.promise(
                axiosInstance.post(RECIPES_URL.ADD_RECIPE, data),
                {
                    pending: `Adding ${data.name} Recipe ..`,
                    success: `${data.name} Recipe added Successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            getAllRecipes();
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    const editRecipe = async (data) => {
        try {
            let response = await toast.promise(
                axiosInstance.put(
                    `${RECIPES_URL.EDIT_RECIPE(selectedRecipe.id)}`,
                    data
                ),
                {
                    pending: `Editing ${selectedRecipe.name} Recipe ..`,
                    success: `${selectedRecipe.name} Recipe changed to ${data.name} Successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            getAllRecipes();
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    const viewRecipe = async ({ recipe }) => {
        console.log("starting view recipe");
        let data = { id: recipe.id };
        try {
            let response = await toast.promise(
                axiosInstance.get(`${RECIPES_URL.GET_RECIPE(recipe.id)}`, data),
                {
                    pending: `Getting ${recipe.name} Recipe ..`,
                    success: `${recipe.name} Recipe got Successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            console.log("response", response);
            setSelectedViewRecipe(response.data);
            console.log("response", response);
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        getAllRecipes(controller);
        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, search]);

    for (let number = 1; number <= totalPagesNumber; number++) {
        pages.push(
            <Pagination.Item
                key={number}
                active={number === pageNumber}
                onClick={() => setPageNumber(number)}
            >
                {number}
            </Pagination.Item>
        );
    }
    return (
        <>
            <Header
                title={"Recipes"}
                subTitle={"Items"}
                description={
                    "You can now add your items that any user can order it from the Application and you can edit"
                }
            />
            <div className="categories-content">
                <SectionTitle
                    title={"Categories Table details"}
                    subTitle={"You can check all details"}
                    actionTitle={"Add new Recipe"}
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
                                <th scope="col">Item Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Price</th>
                                <th scope="col">Description</th>
                                <th scope="col">Tag</th>
                                <th scope="col">Category</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {loading && !recipesList && (
                            <SkeletonLoadingTable col_count={7} row_count={3} />
                        )}
                        {recipesList && recipesList.length > 0 && (
                            <>
                                <tbody>
                                    {recipesList.map((recipe) => {
                                        return (
                                            <tr key={recipe.id}>
                                                <td>{recipe.name}</td>
                                                <td>
                                                    <div className="recipe_img_container">
                                                        <img
                                                            src={
                                                                recipe.imagePath
                                                                    ? IMAGE_PATH(
                                                                          recipe.imagePath
                                                                      )
                                                                    : "https://placehold.co/400?text=No+Image"
                                                            }
                                                            alt={
                                                                recipe.imagePath
                                                                    ? "recipe image"
                                                                    : "no image"
                                                            }
                                                        />
                                                    </div>
                                                </td>
                                                <td>{recipe.price}</td>
                                                <td>{recipe.description}</td>
                                                <td>{recipe.tag.name}</td>
                                                <td>
                                                    {recipe.category[0].name}
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
                                                                            await viewRecipe(
                                                                                {
                                                                                    recipe,
                                                                                }
                                                                            );
                                                                            console.log(
                                                                                "viewRecipe",
                                                                                selectedViewRecipe
                                                                            );
                                                                            handleShowActionModal(
                                                                                recipe
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
                                                                                recipe
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
                                                                                recipe
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
                    {recipesList && recipesList.length > 0 && (
                        <div className="pagination-container d-flex justify-content-end p-1">
                            <Pagination>{pages}</Pagination>
                        </div>
                    )}

                    {recipesList && recipesList.length === 0 && <NoData />}
                    <ConfirmModal
                        title={`Delete ${selectedRecipe?.name} Recipe ?`}
                        message="are you sure you want to delete this item ? if you are sure just click on delete it"
                        confirmTitle="Delete this item"
                        onConfirm={() => {
                            deleteRecipe(selectedRecipe?.id);
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
                            (action === "Edit" && selectedRecipe) ||
                            (action === "View" && selectedViewRecipe) ||
                            (action === "Add" && { name: "" })
                        }
                        onConfirm={
                            (action === "Add" && addRecipe) ||
                            (action === "Edit" && editRecipe) ||
                            (action === "View" && viewRecipe)
                        }
                        handleClose={handleCloseActionModal}
                        placeholder={"Recipe Name"}
                        show={showActionModal}
                    />
                </div>
            </div>
        </>
    );
};

export default RecipesList;
