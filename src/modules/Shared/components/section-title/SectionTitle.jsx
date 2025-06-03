import React from "react";
import Search from "@/assets/icons/search.svg?react";
import AuthInput from "../authInput/AuthInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/context/context";
import { useContext } from "react";

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
    emailFilter,
    setEmailFilter,
    countryFilter,
    setCountryFilter,
    groupFilter,
    setGroupFilter,
}) => {
    const [searchText, setSearchText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [countryText, setCountryText] = useState("");
    const [userGroup, setuserGroup] = useState([
        { id: "1", name: "SuperAdmin" },
        { id: "2", name: "SystemUser" },
    ]);
    const { currentUser } = useContext(AuthContext);
    return (
        <>
            <div className="title d-flex justify-content-between px-4 py-2 align-items-center">
                <div className="title-text d-flex flex-column">
                    <h5 className="mb-0">{title}</h5>
                    <p className="mb-0">{subTitle}</p>
                </div>
                {currentUser.group.id === 1 && (
                    <a className="btn title-action-btn" onClick={action}>
                        {actionTitle}
                    </a>
                )}
            </div>
            <div className="search_input d-flex gap-1">
                <div className="input-group bg-input flex-grow-1">
                    <span className="input-group-text" id={`basic-addon-1`}>
                        <Search />
                    </span>
                    <input
                        type={"text"}
                        className="form-control"
                        placeholder={"Search here + press enter ..."}
                        aria-label={"Search here + press enter ..."}
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
                {setEmailFilter && (
                    <div className="input-group bg-input flex-grow-1">
                        <span className="input-group-text" id={`basic-addon-1`}>
                            <Search />
                        </span>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder={"Email ..."}
                            aria-label={"Email ..."}
                            aria-describedby={`basic-addon-1`}
                            value={emailText}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setEmailFilter("");
                                    setPageNumber(1);
                                }
                                setEmailText(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setEmailFilter(emailText);
                                    setPageNumber(1);
                                }
                            }}
                        />
                    </div>
                )}
                {setCountryFilter && (
                    <div className="input-group bg-input flex-grow-1">
                        <span className="input-group-text" id={`basic-addon-1`}>
                            <Search />
                        </span>
                        <input
                            type={"text"}
                            className="form-control"
                            placeholder={"Country ..."}
                            aria-label={"Country ..."}
                            aria-describedby={`basic-addon-1`}
                            value={countryText}
                            onChange={(e) => {
                                if (e.target.value === "") {
                                    setCountryFilter("");
                                    setPageNumber(1);
                                }
                                setCountryText(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setCountryFilter(countryText);
                                    setPageNumber(1);
                                }
                            }}
                        />
                    </div>
                )}
                {groupFilter && (
                    <div className="search-filter d-flex input-group bg-input flex-grow-0 w-25">
                        <a
                            href="#"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            className="btn d-flex gap-3"
                        >
                            {groupFilter.length === 2
                                ? "All Groups"
                                : groupFilter.map((group) => (
                                      <span key={group.id}>{group.name}</span>
                                  ))}
                            <i className="fa-solid fa-chevron-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {userGroup.map((group) => (
                                <li>
                                    {/* checkbox with title of every group to select between them */}
                                    <div className="form-check">
                                        <input
                                            className="custom-form-check-input"
                                            type="checkbox"
                                            value={group.id}
                                            id={group.id}
                                            checked={groupFilter
                                                .map((g) => g.id)
                                                .includes(group.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setGroupFilter([
                                                        ...groupFilter,
                                                        group,
                                                    ]);
                                                } else {
                                                    if (
                                                        groupFilter.length === 1
                                                    ) {
                                                        toast.error(
                                                            "Please select at least one group"
                                                        );
                                                    } else {
                                                        setGroupFilter(
                                                            groupFilter.filter(
                                                                (g) =>
                                                                    g.id !==
                                                                    group.id
                                                            )
                                                        );
                                                    }
                                                }
                                            }}
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor={group.id}
                                        >
                                            {group.name}
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
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
