import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    axiosInstance,
    CATEGORIES_URL,
    IMAGE_PATH,
    RECIPES_URL,
    TAGS_URL,
} from "@/modules/Shared/utils/urls";
import { toast } from "react-toastify";
import SkeletonLoadingTable from "@/modules/Shared/components/skeletonLoadingTable/SkeletonLoadingTable";
import DragDropImgArea from "@/modules/Shared/components/drag-drop-image/DragDropImgArea";
const RecipeData = () => {
    const [fileName, setFileName] = useState([]);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [mode, setMode] = useState("ADD");
    const navigate = useNavigate();

    const location = useLocation();
    const { recipe, tagsList, catIdList } = location.state || {};

    const appendToFormData = (data) => {
        const formData = new FormData();

        for (const key in data) {
            formData.append(key, data[key]);
        }

        return formData;
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm();

    const urlToFile = async (url, filename, mimeType) => {
        const res = await fetch(url);
        const blob = await res.blob();
        return new File([blob], filename, { type: mimeType });
    };

    const onSubmit = async (data) => {
        setSaveLoading(true);
        // check if recipeImage is a url and convert it to a file

        if (typeof data.recipeImage === "string") {
            const file = await urlToFile(
                data.recipeImage,
                data.recipeImage.split("/").pop(),
                "image/*"
            );
            data.recipeImage = file;
        }
        const recipeData = appendToFormData(data);
        console.log("recipeData", recipeData);
        console.log("data", data);
        try {
            if (selectedRecipe) {
                await toast.promise(
                    axiosInstance.put(
                        `${RECIPES_URL.EDIT_RECIPE(selectedRecipe.id)}`,
                        recipeData
                    ),
                    {
                        pending: `Editing "${data.name}" Recipe...`,
                        success: `"${data.name}" Recipe Saved successfully`,
                        error: `Something went wrong in editing "${data.name}" recipe`,
                    }
                );
            } else {
                await toast.promise(
                    axiosInstance.post(`${RECIPES_URL.ADD_RECIPE}`, recipeData),
                    {
                        pending: `Saving "${data.name}" Recipe...`,
                        success: `"${data.name}" Recipe Saved successfully`,
                        error: `Something went wrong in saving "${data.name}" recipe`,
                    }
                );
            }
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

    let getRecipe = async (controller) => {
        setLoading(true);
        try {
            if (!recipe) return;
            setMode("EDIT");
            let response = await toast.promise(
                axiosInstance.get(`${RECIPES_URL.GET_RECIPE(recipe.id)}`, {
                    signal: controller?.signal,
                }),
                {
                    pending: `Loading "${recipe.name}" Recipe data...`,
                    success: `"${recipe.name}" Recipe data loaded successfully`,
                    error: `Something went wrong in getting "${recipe.name}" recipe data`,
                }
            );
            console.log("recipe response", response);
            setSelectedRecipe(response.data);
            setValue("name", response.data.name, { shouldValidate: true });
            setValue("description", response.data.description, {
                shouldValidate: true,
            });
            setValue("price", response.data.price, { shouldValidate: true });
            // setValue("catId", response.data.category[0].id, {
            //     shouldValidate: true,
            // });
            // setValue("tagIds", response.data.tag.id, { shouldValidate: true });
            setValue("recipeImage", IMAGE_PATH(response?.data?.imagePath), {
                shouldValidate: true,
            });
            setFileName(IMAGE_PATH(response?.data?.imagePath));
            setPreview(IMAGE_PATH(response?.data?.imagePath));
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        getRecipe(controller);
        return () => controller.abort();

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {(loading && (
                    <>
                        {console.log("loading", loading)}
                        <SkeletonLoadingTable col_count={1} row_count={4} />
                    </>
                )) || (
                    <>
                        {console.log("not loading", loading)}
                        <div className="section-title p-2">
                            <h4>{selectedRecipe ? "Edit" : "Add"} Recipe</h4>
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
                                                required:
                                                    "Recipe Name is required",
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
                                                required:
                                                    "Tag Name is required",
                                                valueAsNumber: true,
                                                validate: (value) =>
                                                    value !== "" ||
                                                    "Tag Name is required",
                                            })}
                                        >
                                            <option
                                                value=""
                                                selected={!selectedRecipe}
                                                disabled
                                            >
                                                Tag Name
                                            </option>
                                            {tagsList.map((tag) => (
                                                <option
                                                    key={tag.id}
                                                    value={tag.id}
                                                    selected={
                                                        tag.id ===
                                                        selectedRecipe?.tag.id
                                                    }
                                                >
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
                                                valueAsNumber:
                                                    "Price is required",
                                                required: "Price is required",
                                                min: {
                                                    value: 0,
                                                    message:
                                                        "Price can't be negative",
                                                },
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
                                                required:
                                                    "Category Name is required",
                                                valueAsNumber: true,
                                                validate: (value) =>
                                                    value !== "" ||
                                                    "Category Name is required",
                                            })}
                                        >
                                            <option
                                                vlaue=""
                                                selected={!selectedRecipe}
                                                disabled
                                            >
                                                Category Name
                                            </option>
                                            {catIdList.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                    selected={
                                                        category.id ===
                                                        selectedRecipe
                                                            ?.category[0].id
                                                    }
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
                                                required:
                                                    "Description is required",
                                            })}
                                        />
                                    </div>
                                    {errors["description"] && (
                                        <span className="text-danger">
                                            {errors["description"].message}
                                        </span>
                                    )}
                                </div>

                                <DragDropImgArea
                                    register={register}
                                    saveLoading={saveLoading}
                                    setValue={setValue}
                                    setFileName={setFileName}
                                    setPreview={setPreview}
                                />

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
                                            `Save ${
                                                mode === "EDIT" ? "Edits" : ""
                                            }`}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default RecipeData;
