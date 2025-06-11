import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/Shared/components/authlayout/AuthLayout";
import Login from "./modules/Authentication/components/login/Login";
import Register from "./modules/Authentication/components/register/Register";
import ForgetPass from "./modules/Authentication/components/forget-pass/ForgetPass";
import ResetPass from "./modules/Authentication/components/reset-pass/ResetPass";
import VerifyAccount from "./modules/Authentication/components/verify-account/VerifyAccount";
import NotFound from "./modules/Shared/components/not-found/NotFound";
import MasterLayout from "./modules/Shared/components/master-layout/MasterLayout";
import Dashboard from "./modules/Dashboard/components/dashboard/Dashboard";
import UsersList from "./modules/Users/components/users-list/UsersList";
import RecipeData from "./modules/Recipes/components/recipe-data/RecipeData";
import CategoriesList from "./modules/Categories/components/categories-list/CategoriesList";
import RecipesList from "./modules/Recipes/components/recipes-list/RecipesList";
import FavList from "./modules/Favorites/components/fav-list/FavList";
import CategoryData from "./modules/Categories/components/category-data/CategoryData";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./modules/Shared/components/protected-route/ProtectedRoute";
import Loading from "./modules/Shared/components/loading/Loading";
import { useContext } from "react";
import { AuthContext } from "./context/context";

function App() {
    const { isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loading />;
    }

    let routes = createHashRouter([
        {
            path: "",
            element: <AuthLayout />,
            errorElement: <NotFound />,
            children: [
                {
                    index: true,
                    element: <Login />,
                },
                {
                    path: "login",
                    element: <Login />,
                },
                { path: "register", element: <Register /> },
                { path: "forget-password", element: <ForgetPass /> },
                { path: "reset-password", element: <ResetPass /> },
                { path: "verify-account", element: <VerifyAccount /> },
            ],
        },
        {
            path: "dashboard",
            element: (
                <ProtectedRoute>
                    <MasterLayout />
                </ProtectedRoute>
            ),
            errorElement: <NotFound />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: "users", element: <UsersList /> },
                { path: "recipes", element: <RecipesList /> },
                { path: "recipe-data", element: <RecipeData /> },
                { path: "categories", element: <CategoriesList /> },
                { path: "category-data", element: <CategoryData /> },
                { path: "favorites", element: <FavList /> },
            ],
        },
    ]);
    return (
        <>
            <RouterProvider router={routes}></RouterProvider>
            <ToastContainer stacked />
        </>
    );
}

export default App;
