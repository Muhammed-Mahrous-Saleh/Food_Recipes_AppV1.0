import React, { useRef, useState } from "react";
import { toast } from "react-toastify";

const DragDropImgArea = ({
    register,
    saveLoading,
    setValue,
    setPreview,
    setFileName,
}) => {
    const inputRef = useRef(null);
    const [dragActive, setDragActive] = useState(false);

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
    return (
        <>
            <div className="file-upload-box my-2">
                <div
                    className="image-drag-container p-3 d-flex flex-column"
                    onClick={() => inputRef.current.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    style={{
                        borderColor: "#999",
                        color: "#666",
                    }}
                >
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    <h6>
                        {(dragActive && <span>Drop image here</span>) || (
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
        </>
    );
};

export default DragDropImgArea;
