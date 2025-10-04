import ProtectedRoute from "./ProtectedRoute";
import { Outlet } from "react-router";

function AuthLayout() {
    return (
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
    )
}
export default AuthLayout;