import type { UserInterface } from "./UserInterface";

export interface AuthContextType {
    user: UserInterface | null;
    login: (data: UserInterface) => Promise<void>;
    logout: () => Promise<void>;
    isLogged: boolean;
}