import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext";
import FavouriteContextProvider from "./context/FavouriteContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthContextProvider>
            <FavouriteContextProvider>
                <App />
            </FavouriteContextProvider>
        </AuthContextProvider>
    </StrictMode>
);
