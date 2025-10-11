import { useAuth } from "@/hooks/useAuth";
import type { AuthProviderProps } from "@/interface/AuthProviderProps";
import { Navigate } from "react-router";

function ProtectedRoute({ children }: AuthProviderProps) {
    const { user } = useAuth();
    if (!user?.id || user.id.length <= 0) {
        return <Navigate to="/" />;
    }
    console.log("ProtectedRoute: user is authenticated:", user?.id?.length);
    return children;
}
export default ProtectedRoute;