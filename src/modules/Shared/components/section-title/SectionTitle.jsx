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
    setPageNumber,
    tagsList,
    tagFilter,
    setTagFilter,
    catsList,
    categoryFilter,
    setCategoryFilter,
}) => {
    const [searchText, setSearchText] = useState("");
    console.log("catsList", catsList);
    console.log("tagsList", tagsList);
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
            <div className="search_input d-flex gap-1">
                <div className="input-group bg-input flex-grow-1">
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
                                setPageNumber(1);
                            }
                            setSearchText(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                setSearch(searchText);
                                setPageNumber(1);
                            }
                        }}
                    />
                </div>
                {tagsList && (
                    <div className="search-filter d-flex input-group bg-input flex-grow-0 w-25">
                        <select
                            className="form-select"
                            onChange={(e) => {
                                setTagFilter(e.target.value);
                                setPageNumber(1);
                            }}
                        >
                            <option value="">All Tags</option>
                            {tagsList.map((tag) => (
                                <option
                                    key={tag.id}
                                    value={tag.id}
                                    selected={tag.id === tagFilter.id}
                                >
                                    {tag.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {catsList && (
                    <div className="search-filter d-flex input-group bg-input flex-grow-0 w-25">
                        <select
                            className="form-select"
                            onChange={(e) => {
                                setCategoryFilter(e.target.value);
                                setPageNumber(1);
                            }}
                            value={categoryFilter}
                        >
                            <option value="">All Categories</option>
                            {catsList.map((cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                    selected={cat.id === categoryFilter.id}
                                >
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </>
    );
};

export default SectionTitle;
