import { axiosInstance, USERS_URL } from "@/modules/Shared/utils/urls";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { AuthContext } from "./context";
import { toast } from "react-toastify";

export default function AuthContextProvider({ children }) {
    const [loginData, setLoginData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const logoutUser = useCallback(() => {
        localStorage.removeItem("token");
        setLoginData(null);
        setCurrentUser(null);
    }, []);

    const decodeToken = useCallback(() => {
        const userToken = localStorage.getItem("token");
        if (!userToken) return null;
        const decodedData = jwtDecode(userToken);
        return decodedData;
    }, []);

    const saveCurrentUserData = useCallback(async () => {
        setIsLoading(true);
        try {
            let response = await toast.promise(
                axiosInstance.get(`${USERS_URL.GET_CURRENT_USER}`),
                {
                    pending: "Loading user data...",
                    success: "User data loaded successfully",
                    error: "Something went wrong",
                }
            );
            setCurrentUser(response.data);

            console.log("currentuser response", response);
        } catch (error) {
            console.error("Failed to fetch user data:", error);
            toast.error("Failed to load user data");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const saveLoginData = useCallback(async () => {
        setIsLoading(true);
        try {
            const decodedData = decodeToken();
            setLoginData(decodedData);

            if (decodedData) {
                await saveCurrentUserData();
            }
        } catch (error) {
            console.error("Failed to decode token:", error);
            localStorage.removeItem("token");
            setLoginData(null);
            setCurrentUser(null);
        } finally {
            setIsLoading(false);
        }
    }, [decodeToken, saveCurrentUserData]);

    useEffect(() => {
        saveLoginData();
    }, [saveLoginData]);

    return (
        <AuthContext.Provider
            value={{
                loginData,
                saveLoginData,
                setLoginData,
                currentUser,
                isLoading,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
