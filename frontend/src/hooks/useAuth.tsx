import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { AuthContextType } from "@/interface/AuthContextType";
import type { AuthProviderProps } from "@/interface/AuthProviderProps";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "@/firebase/config";
import type { UserInterface } from "@/interface/UserInterface";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
function AuthProvider({ children }: AuthProviderProps) {
    const auth = getAuth(app);
    const [user, setUser] = useState<UserInterface | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            console.log("Auth state changed, user:", firebaseUser);
            const user: UserInterface = {
                name: firebaseUser?.displayName || "User", id: firebaseUser?.uid || ""
            };;
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };
    const logout = async () => {
        await signOut(auth);
    };
    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            isLogged: !!user,
            loading,
        }),
        [user, loading]
    );
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
export default AuthProvider;