import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    axiosInstance,
    CATEGORIES_URL,
    RECIPES_URL,
    TAGS_URL,
} from "@/modules/Shared/utils/urls";
import { toast } from "react-toastify";
const RecipeData = ({ recipeId }) => {
    const [fileName, setFileName] = useState([]);
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [tagsList, setTagsList] = useState([]);
    const [catIdList, setCatIdList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef(null);

    const appendToFormData = (data) => {
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }
        return formData;
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        if (file && file.type.startsWith("image/")) {
            setFileName(file.name);
            setValue("recipeImage", file, { shouldValidate: true });

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error("Please select an image file");
            setPreview(null);
            setFileName("");
            setValue("recipeImage", null, { shouldValidate: true });
        }
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm();

    const onSubmit = async (data) => {
        setSaveLoading(true);
        const recipeData = appendToFormData(data);
        try {
            let response = await toast.promise(
                axiosInstance.post(`${RECIPES_URL.ADD_RECIPE}`, recipeData),
                {
                    pending: `Saving "${data.name}" Recipe...`,
                    success: `"${data.name}" Recipe Saved successfully`,
                    error: `Something went wrong in saving "${data.name}" recipe`,
                }
            );
            navigate(-1);
        } catch (error) {
            console.log(error);
        } finally {
            setSaveLoading(false);
        }
    };

    const handleCancel = () => {
        setFileName("");
        navigate(-1);
    };

    let getAllTags = async (controller) => {
        setLoading(true);
        try {
            let response = await toast.promise(
                axiosInstance.get(`${TAGS_URL.GET_TAGS}`, {
                    signal: controller?.signal,
                }),
                {
                    pending: "Loading Tags...",
                    success: "Tags loaded successfully",
                    error: `Something went wrong in tags`,
                }
            );
            setTagsList(response.data);
            console.log("response", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    let getAllCats = async (controller) => {
        try {
            let response = await toast.promise(
                axiosInstance.get(`${CATEGORIES_URL.GET_CATEGORIES}`, {
                    signal: controller?.signal,
                }),
                {
                    pending: "Loading Categories...",
                    success: "Categories loaded successfully",
                    error: `Something went wrong in categories`,
                }
            );
            setCatIdList(response.data.data);
            console.log("response", response);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        getAllTags(controller);
        getAllCats(controller);
        return () => controller.abort();
    }, []);

    return (
        <>
            <div className="dashboard-content px-3">
                <div className="fill-recipes-card p-4 d-flex justify-content-between align-items-center rounded-2">
                    <div className="card-text col-5">
                        <h3>
                            Fill the <span>Recipes</span> !
                        </h3>
                        <p>
                            you can now fill the meals easily using the table
                            and form , click here and sill it with the table !
                        </p>
                    </div>
                    <Link
                        to="/dashboard/recipes"
                        className="card-action-btn btn col-2"
                    >
                        All Recipes<i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
                <div className="recipe-data-form p-3">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="d-flex flex-column w-75 mx-auto"
                    >
                        <div className="input-group-container">
                            <div className="input-group bg-input">
                                <input
                                    disabled={saveLoading}
                                    type={"text"}
                                    className="form-control"
                                    placeholder={"Recipe Name"}
                                    aria-label={"Recipe Name"}
                                    aria-describedby={`basic-addon-1`}
                                    {...register("name", {
                                        required: "Recipe Name is required",
                                    })}
                                />
                            </div>
                            {errors["name"] && (
                                <span className="text-danger">
                                    {errors["name"].message}
                                </span>
                            )}
                        </div>
                        <div className="input-group-container">
                            <div className="input-group bg-input">
                                <select
                                    disabled={saveLoading}
                                    name="tagId"
                                    id="tagId"
                                    className="custom-form-select form-select"
                                    {...register("tagId", {
                                        required: "Tag Name is required",
                                        valueAsNumber: true,
                                        validate: (value) =>
                                            value !== "" ||
                                            "Tag Name is required",
                                    })}
                                >
                                    <option value="" selected disabled>
                                        Tag Name
                                    </option>
                                    {tagsList.map((tag) => (
                                        <option key={tag.id} value={tag.id}>
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors["tagId"] && (
                                <span className="text-danger">
                                    {errors["tagId"].message}
                                </span>
                            )}
                        </div>
                        <div className="input-group-container">
                            <div className="input-group bg-input">
                                <input
                                    disabled={saveLoading}
                                    type={"number"}
                                    className="form-control"
                                    placeholder={"Price"}
                                    aria-label={"Price"}
                                    aria-describedby={`basic-addon-1`}
                                    {...register("price", {
                                        valueAsNumber: "Price is required",
                                        required: "Price is required",
                                    })}
                                />
                                {
                                    <span className="icon input-group-text">
                                        EGP
                                    </span>
                                }
                            </div>
                            {errors["price"] && (
                                <span className="text-danger">
                                    {errors["price"].message}
                                </span>
                            )}
                        </div>
                        <div className="input-group-container">
                            <div className="input-group bg-input">
                                <select
                                    disabled={saveLoading}
                                    name="categoryId"
                                    id="categoryId"
                                    className="custom-form-select form-select"
                                    {...register("categoriesIds", {
                                        required: "Category Name is required",
                                        valueAsNumber: true,
                                        validate: (value) =>
                                            value !== "" ||
                                            "Category Name is required",
                                    })}
                                >
                                    <option vlaue="" selected disabled>
                                        Category Name
                                    </option>
                                    {catIdList.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors["categoryId"] && (
                                <span className="text-danger">
                                    {errors["categoryId"].message}
                                </span>
                            )}
                        </div>
                        <div className="input-group-container">
                            <div className="input-group bg-input">
                                <textarea
                                    disabled={saveLoading}
                                    type={"text"}
                                    className="form-control"
                                    placeholder={"Description"}
                                    aria-label={"Description"}
                                    aria-describedby={`basic-addon-1`}
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                />
                            </div>
                            {errors["description"] && (
                                <span className="text-danger">
                                    {errors["description"].message}
                                </span>
                            )}
                        </div>
                        <div className="file-upload-box">
                            <div
                                className="image-drag-container p-3 d-flex flex-column"
                                onClick={() => inputRef.current.click()}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                style={{ borderColor: "#999", color: "#666" }}
                            >
                                <i class="fa-solid fa-arrow-up-from-bracket"></i>
                                <h6>
                                    {(dragActive && (
                                        <span>Drop image here</span>
                                    )) || (
                                        <div>
                                            Drag and Drop or
                                            <span> choose an image item </span>
                                            to upload
                                        </div>
                                    )}
                                </h6>
                                <input
                                    disabled={saveLoading}
                                    type="file"
                                    name="recipeImage"
                                    id="recipeImage"
                                    accept="image/*"
                                    {...register("recipeImage", {
                                        required: "Image is required",
                                    })}
                                    ref={inputRef}
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                            </div>
                        </div>

                        {errors["recipeImage"] && (
                            <span className="text-danger">
                                {errors["recipeImage"].message}
                            </span>
                        )}
                        {preview && (
                            <div className="mt-3 text-center">
                                <p className="mb-1 text-success">
                                    Selected: {fileName}
                                </p>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        maxWidth: "50%",
                                        maxHeight: "300px",
                                        borderRadius: "10px",
                                    }}
                                />
                            </div>
                        )}
                        <div className="actions-btns d-flex gap-3 justify-content-end my-4">
                            <button
                                className="btn btn-outline-success px-3"
                                disabled={saveLoading}
                                type="button"
                                onClick={() => {
                                    handleCancel();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-success px-4"
                                type="submit"
                            >
                                {(saveLoading && (
                                    <div
                                        className="spinner-grow spinner-grow-sm text-light"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )) ||
                                    "Save"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RecipeData;
