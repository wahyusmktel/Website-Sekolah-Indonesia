import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";

    if (isAuthenticated) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
