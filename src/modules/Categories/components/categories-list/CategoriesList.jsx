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

const CategoriesList = () => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    let dateFormat = "dd/MM/yyyy HH:mm a";
    let pageSize = 10;

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
                            // Authorization: localStorage.getItem("token"),
                        },
                    }
                ),
                {
                    pending: "Deleting category...",
                    success: `Category ${deletedCategory.name} deleted successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
        } catch (error) {
            console.log(error);
            setCategoriesList([...categoriesList]);
        }
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
                                            <td className="d-flex gap-2 ">
                                                <button className="btn btn-primary d-flex align-items-center gap-2">
                                                    <ViewIcon className="action-icon" />
                                                    View
                                                </button>
                                                <button className="btn btn-warning d-flex align-items-center gap-2">
                                                    <EditIcon className="action-icon" />
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger d-flex align-items-center gap-2"
                                                    onClick={() => {
                                                        deleteCategory(
                                                            category.id
                                                        );
                                                    }}
                                                >
                                                    <DeleteIcon className="action-icon" />
                                                    Delete
                                                </button>
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
