import type { UserInterface } from "./UserInterface";

export interface AuthContextType {
    user: UserInterface | undefined;
    login: (email:string, password:string) => Promise<void>;
    logout: () => Promise<void>;
    isLogged: boolean;
    loading: boolean;
}