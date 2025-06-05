import { AuthContext } from "@/context/context";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import NotFound from "../not-found/NotFound";
import Loading from "../loading/Loading";

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    const location = useLocation();
    if (currentUser || localStorage.getItem("token")) {
        // if (!currentUser) {
        //     localStorage.removeItem("token");
        //     return <Navigate to="/login" replace />;
        // }

        if (!currentUser) {
            return <Loading />;
        }

        const groupId = currentUser.group?.id;
        const path = location.pathname;

        if (groupId === 1 && path.startsWith("/dashboard/favorites")) {
            return <NotFound />;
        } else if (groupId === 2) {
            const allowedPaths = [
                "/dashboard",
                "/dashboard/",
                "/dashboard/recipes",
                "/dashboard/favorites",
            ];

            if (!allowedPaths.includes(path)) {
                return <NotFound />;
            }
        }
        return children;
    }

    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
