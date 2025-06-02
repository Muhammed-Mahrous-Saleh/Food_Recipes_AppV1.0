import { axiosInstance, USERS_URL } from "@/modules/Shared/utils/urls";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";

export let AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const [loginData, setLoginData] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const decodeToken = useCallback(() => {
        const userToken = localStorage.getItem("token");
        if (!userToken) return null;
        const decodedData = jwtDecode(userToken);
        return decodedData;
    }, []);

    const saveLoginData = useCallback(() => {
        try {
            const decodedData = decodeToken();
            setLoginData(decodedData);
            getCurrentUserData();
        } catch (error) {
            console.error("Failed to decode token:", error);
            localStorage.removeItem("token");
            setLoginData(null);
        }
    }, [decodeToken]);

    const getCurrentUserData = async () => {
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
            console.log("response", response);
        } catch (error) {
            console.log(error);
        }
    };

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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
