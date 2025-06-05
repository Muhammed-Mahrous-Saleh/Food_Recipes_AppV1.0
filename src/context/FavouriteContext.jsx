import React from "react";
import { AuthContext, FavouriteContext } from "./context";
import { useState } from "react";
import { axiosInstance, FAVS_URL } from "@/modules/Shared/utils/urls";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useCallback } from "react";
import { useContext } from "react";

const FavouriteContextProvider = ({ children }) => {
    const [favouriteList, setFavouriteList] = useState([]);
    const [favLoading, setFavLoading] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const getFavouriteList = useCallback(async () => {
        setFavLoading(true);
        try {
            let response = await toast.promise(
                axiosInstance.get(`${FAVS_URL.GET_FAVS}`, {
                    pageNumber: 1,
                    pageSize: 10000,
                }),
                {
                    pending: "Loading Favourites...",
                    success: "Favourites loaded successfully",
                    error: `Something went wrong in Favourites`,
                }
            );
            setFavouriteList(response.data.data);
            console.log("list favourites", response);
        } catch (error) {
            console.log(error);
        } finally {
            setFavLoading(false);
        }
    }, []);
    const addToFavourites = async (item) => {
        setFavLoading(true);
        try {
            let response = await toast.promise(
                axiosInstance.post(`${FAVS_URL.GET_FAVS}`, {
                    recipeId: item.id,
                }),
                {
                    pending: `Adding ${item.name} Favourites...`,
                    success: `${item.name} added successfully`,
                    error: `Something went wrong in adding ${item.name}`,
                }
            );
            getFavouriteList();
            // setFavouriteList((prev) => [...prev, response.data]);
            console.log("adding favourite", response);
        } catch (error) {
            console.log(error);
        } finally {
            setFavLoading(false);
        }
    };

    const removeFromFavourites = async (item) => {
        setFavLoading(true);
        console.log(
            "to delete item",
            favouriteList.filter((f) => f.recipe.id === item.id)[0].id
        );
        try {
            let response = await toast.promise(
                axiosInstance.delete(
                    `${FAVS_URL.DELETE_FAV(
                        favouriteList.filter((f) => f.recipe.id === item.id)[0]
                            .id
                    )}`
                ),
                {
                    pending: `removing ${item.name} from Favourites...`,
                    success: `${item.name} removed successfully`,
                    error: `Something went wrong in removing ${item.name}`,
                }
            );
            getFavouriteList();
            // setFavouriteList((prev) =>

            //     prev.filter(
            //         (f) => prev.find((v) => v.recipe.id === item.id).id !== f.id
            //     )
            // );
            console.log("removing favourite", response);
        } catch (error) {
            console.log(error);
        } finally {
            setFavLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser?.group.id === 2) getFavouriteList();
    }, [getFavouriteList, currentUser]);

    return (
        <FavouriteContext.Provider
            value={{
                getFavouriteList,
                addToFavourites,
                favouriteList,
                removeFromFavourites,
                favLoading,
            }}
        >
            {children}
        </FavouriteContext.Provider>
    );
};

export default FavouriteContextProvider;
