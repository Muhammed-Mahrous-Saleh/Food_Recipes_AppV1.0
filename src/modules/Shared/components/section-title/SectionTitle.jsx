import React from "react";
import Search from "@/assets/icons/search.svg?react";
import AuthInput from "../authInput/AuthInput";
import { useState } from "react";

const SectionTitle = ({
    title,
    subTitle,
    actionTitle,
    action,
    search,
    setSearch,
}) => {
    const [searchText, setSearchText] = useState("");
    return (
        <>
            <div className="title d-flex justify-content-between px-4 py-2 align-items-center">
                <div className="title-text d-flex flex-column">
                    <h5 className="mb-0">{title}</h5>
                    <p className="mb-0">{subTitle}</p>
                </div>
                <a className="btn title-action-btn" onClick={action}>
                    {actionTitle}
                </a>
            </div>
            <div className="search_input">
                <div className="input-group bg-input">
                    <span className="input-group-text" id={`basic-addon-1`}>
                        <Search />
                    </span>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder={"Search here ..."}
                        aria-label={"Search here ..."}
                        aria-describedby={`basic-addon-1`}
                        value={searchText}
                        onChange={(e) => {
                            if (e.target.value === "") {
                                setSearch("");
                            }
                            setSearchText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setSearch(searchText);
                            }
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default SectionTitle;
