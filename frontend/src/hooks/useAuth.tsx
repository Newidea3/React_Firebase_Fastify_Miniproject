import { createContext, useContext, useMemo } from "react"
import useSessionStorage from "./useSessionStorage";
import type { AuthContextType } from "@/interface/AuthContextType";
import type { AuthProviderProps } from "@/interface/AuthProviderProps";
import type { UserInterface } from "@/interface/UserInterface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useSessionStorage("authUser", null);

    const login = async (data: UserInterface) => {
        setUser(data);
    }
    const logout = async () => {
        setUser(null);
    }

    const value = useMemo(() => ({
        user,
        login,
        logout,
        isLogged: !!user,
    }), [user, login, logout]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
export default AuthProvider;