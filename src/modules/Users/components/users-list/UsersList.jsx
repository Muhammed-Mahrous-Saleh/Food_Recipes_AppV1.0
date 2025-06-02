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
    IMAGE_PATH,
    USERS_URL,
} from "@/modules/Shared/utils/urls";
import UserActionModal from "../user-view-modal/UserActionModal";

const UsersList = () => {
    const [usersList, setUsersList] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPagesNumber, setTotalPagesNumber] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showActionModal, setShowActionModal] = useState(false);
    const [action, setAction] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedViewUser, setSelectedViewUser] = useState(null);
    const [search, setSearch] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    const [countryFilter, setCountryFilter] = useState("");
    const [groupFilter, setGroupFilter] = useState([
        { id: "1", name: "SuperAdmin" },
        { id: "2", name: "SystemUser" },
    ]);

    const pages = [];

    let dateFormat = "dd/MM/yyyy HH:mm a";
    let pageSize = 10;

    let handleShowConfirmModal = (user) => {
        if (user) setSelectedUser(user);
        setShowConfirmModal(true);
    };

    let handleCloseConfirmModal = () => {
        setShowConfirmModal(false);
    };

    let handleShowActionModal = (user) => {
        if (user) setSelectedUser(user);
        setShowActionModal(true);
    };

    let handleCloseActionModal = () => {
        setShowActionModal(false);
    };

    const getAllUsers = async (controller) => {
        setLoading(true);

        let groups = [];
        groupFilter.map((g) => groups.push(g.id));

        try {
            let response = await toast.promise(
                axiosInstance.get(`${USERS_URL.GET_USERS}`, {
                    signal: controller?.signal,
                    params: {
                        userName: search,
                        email: emailFilter,
                        country: countryFilter,
                        groups: groups,
                        pageNumber: pageNumber,
                        pageSize: pageSize,
                    },
                }),
                {
                    pending: "Loading users...",
                    success: "Users loaded successfully",
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
            setUsersList(response.data.data);
            setTotalPagesNumber(response.data.totalNumberOfPages);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (id) => {
        let deletedUser = usersList.find((c) => c.id === id);
        console.log(
            "usersList",
            usersList.find((c) => c.id === id)
        );
        try {
            setUsersList(usersList.filter((user) => user.id !== id));

            let response = await toast.promise(
                axiosInstance.delete(`${USERS_URL.DELETE_USER(id)}`, {
                    params: { id },
                }),
                {
                    pending: `Deleting "${deletedUser.userName}" user...`,
                    success: `User "${deletedUser.userName}" deleted successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            getAllUsers();
        } catch (error) {
            console.log(error);
            setUsersList([...usersList]);
        }
    };

    const viewUser = async ({ user }) => {
        console.log("starting view user");
        let data = { id: user.id };
        try {
            let response = await toast.promise(
                axiosInstance.get(`${USERS_URL.GET_USER(user.id)}`, data),
                {
                    pending: `Getting ${user.userName} User ..`,
                    success: `${user.userName} User got Successfully`,
                    error: {
                        render({ data }) {
                            return `Something went wrong: ${data.response.data.message}`;
                        },
                    },
                }
            );
            console.log("get user response", response);
            setSelectedViewUser(response.data);
            console.log("response", response);
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        getAllUsers(controller);
        return () => controller.abort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, search, emailFilter, countryFilter, groupFilter]);
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
                title={"Users"}
                subTitle={"List"}
                description={
                    "You can now add your items that any user can order it from the Application and you can edit"
                }
            />
            <div className="users-content">
                <SectionTitle
                    title={"Users Table details"}
                    subTitle={"You can check all details"}
                    actionTitle={"Add new User"}
                    action={() => {
                        setAction("Add");
                        handleShowActionModal();
                    }}
                    search={search}
                    setSearch={setSearch}
                    setPageNumber={setPageNumber}
                    groupFilter={groupFilter}
                    setGroupFilter={setGroupFilter}
                />

                <div className="users-table p-4">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">User Name</th>
                                <th scope="col">Profile Image</th>
                                <th scope="col">Email</th>
                                <th scope="col">Group</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {loading && !usersList && (
                            <SkeletonLoadingTable col_count={5} row_count={3} />
                        )}
                        {usersList && usersList.length > 0 && (
                            <>
                                <tbody>
                                    {usersList.map((user) => {
                                        return (
                                            <tr key={user.id}>
                                                <th scope="row">
                                                    {user.userName}
                                                </th>
                                                <td>
                                                    <div className="recipe_img_container">
                                                        <img
                                                            src={
                                                                user.imagePath
                                                                    ? IMAGE_PATH(
                                                                          user.imagePath
                                                                      )
                                                                    : "https://placehold.co/400?text=No+Image"
                                                            }
                                                            alt={
                                                                user.imagePath
                                                                    ? "recipe image"
                                                                    : "no image"
                                                            }
                                                        />
                                                    </div>
                                                </td>

                                                <td>{user.email}</td>
                                                <td>{user.group.name}</td>
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
                                                                            await viewUser(
                                                                                {
                                                                                    user,
                                                                                }
                                                                            );
                                                                            console.log(
                                                                                "viewUser",
                                                                                selectedViewUser
                                                                            );
                                                                            handleShowActionModal(
                                                                                user
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
                                                                            handleShowConfirmModal(
                                                                                user.userName
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
                    {usersList && usersList.length > 0 && (
                        <div className="pagination-container d-flex justify-content-end p-1">
                            <Pagination>{pages}</Pagination>
                        </div>
                    )}

                    {usersList && usersList.length === 0 && <NoData />}
                    <ConfirmModal
                        title={`Delete ${selectedUser?.name} User ?`}
                        message="are you sure you want to delete this item ? if you are sure just click on delete it"
                        confirmTitle="Delete this item"
                        onConfirm={() => {
                            deleteUser(selectedUser?.id);
                            handleCloseConfirmModal();
                        }}
                        handleClose={handleCloseConfirmModal}
                        show={showConfirmModal}
                    />
                    <UserActionModal
                        action={action}
                        show={showActionModal}
                        handleClose={handleCloseActionModal}
                        selectedItem={selectedViewUser}
                    />
                </div>
            </div>
        </>
    );
};

export default UsersList;
