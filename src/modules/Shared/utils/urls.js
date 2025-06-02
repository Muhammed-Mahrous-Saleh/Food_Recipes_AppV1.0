import axios from "axios";

export const IMAGE_PATH = (imagePath) =>
    `https://upskilling-egypt.com:3006/${imagePath}`;

const BASE_URL = "https://upskilling-egypt.com:3006/api/v1/";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const USERS_URL = {
    LOGIN: `/Users/Login`,
    FORGET_PASS: `/Users/Reset/Request`,
    RESET_PASS: `/Users/Reset`,
    REGISTER: `/Users/Register`,
    GET_USER: (id) => `/Users/${id}`,
    GET_USERS: "/Users/",
    DELETE_USER: (id) => `/Users/${id}`,
    GET_CURRENT_USER: "/Users/currentUser",
    CHANGE_PASSWORD: `/Users/ChangePassword`,
};

export const RECIPES_URL = {
    GET_RECIPES: `/Recipe/`,
    GET_RECIPE: (id) => `/Recipe/${id}`,
    ADD_RECIPE: `/Recipe/`,
    EDIT_RECIPE: (id) => `/Recipe/${id}`,
    DELETE_RECIPE: (id) => `/Recipe/${id}`,
};

export const CATEGORIES_URL = {
    GET_CATEGORIES: `/Category/`,
    GET_CATEGORY: (id) => `/Category/${id}`,
    ADD_CATEGORY: `/Category`,
    EDIT_CATEGORY: (id) => `/Category/${id}`,
    DELETE_CATEGORY: (id) => `/Category/${id}`,
};

export const TAGS_URL = {
    GET_TAGS: `/tag/`,
};
