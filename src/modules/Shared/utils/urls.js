import axios from "axios";

const BASE_URL = "https://upskilling-egypt.com:3006/api/v1/";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: localStorage.getItem("token"),
    },
});

export const USERS_URL = {
    LOGIN: `${BASE_URL}Users/Login`,
    FORGET_PASS: `${BASE_URL}Users/Reset/Request`,
    RESET_PASS: `${BASE_URL}Users/Reset`,
    REGISTER: `${BASE_URL}Users/Register`,
};

export const RECIPES_URL = {
    GET_RECIPES: `${BASE_URL}Recipes`,
    GET_RECIPE: `${BASE_URL}Recipes/`,
    ADD_RECIPE: `${BASE_URL}Recipes`,
    EDIT_RECIPE: `${BASE_URL}Recipes/`,
    DELETE_RECIPE: `${BASE_URL}Recipes/`,
};

export const CATEGORIES_URL = {
    GET_CATEGORIES: `${BASE_URL}Category/`,
    GET_CATEGORY: `${BASE_URL}Category/`,
    ADD_CATEGORY: `${BASE_URL}Category`,
    EDIT_CATEGORY: `${BASE_URL}Category/`,
    DELETE_CATEGORY: `${BASE_URL}Category/`,
};
