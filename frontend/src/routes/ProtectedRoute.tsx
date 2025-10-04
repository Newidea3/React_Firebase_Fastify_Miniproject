import { useAuth } from "@/hooks/useAuth";
import type { AuthProviderProps } from "@/interface/AuthProviderProps";
import { Navigate } from "react-router";

function ProtectedRoute({ children }: AuthProviderProps) {
    const { user } = useAuth()!;
    if (!user) {
        return <Navigate to="/" />;
    }
    return children;
}
export default ProtectedRoute;