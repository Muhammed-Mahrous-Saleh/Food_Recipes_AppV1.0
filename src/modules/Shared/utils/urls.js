import axios from "axios";

export const IMAGE_PATH = (imagePath) =>
    `https://upskilling-egypt.com:3006/${imagePath}`;

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
    GET_RECIPES: `${BASE_URL}Recipe/`,
    GET_RECIPE: (id) => `${BASE_URL}Recipe/${id}`,
    ADD_RECIPE: `${BASE_URL}Recipe/`,
    EDIT_RECIPE: (id) => `${BASE_URL}Recipe/${id}`,
    DELETE_RECIPE: (id) => `${BASE_URL}Recipe/${id}`,
};

export const CATEGORIES_URL = {
    GET_CATEGORIES: `${BASE_URL}Category/`,
    GET_CATEGORY: (id) => `${BASE_URL}Category/${id}`,
    ADD_CATEGORY: `${BASE_URL}Category`,
    EDIT_CATEGORY: (id) => `${BASE_URL}Category/${id}`,
    DELETE_CATEGORY: (id) => `${BASE_URL}Category/${id}`,
};
