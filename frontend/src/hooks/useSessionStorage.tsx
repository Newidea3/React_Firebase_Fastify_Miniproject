
import { useState } from "react";
import type { UserInterface } from "@/interface/UserInterface";

function useSessionStorage(key: string, defaultValue: UserInterface | null) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            if (item) {
                return JSON.parse(item);
            } else {
                window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
        }
        catch (error) {
            console.log(error);
            return defaultValue;
        }
    });
    const setValue = (newValue: string) => {
        try {
            window.sessionStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.log(error);
            return;
        }
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
}
export default useSessionStorage;