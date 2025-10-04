import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";


function LogoutButton() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const handleLogout = async () => {
        await logout()
        navigate("/")
    }
    return (
        <Button variant="destructive" onClick={handleLogout} >
            Logout
        </Button>
    )
}
export default LogoutButton;