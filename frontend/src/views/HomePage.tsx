import LogoutButton from "@/components/logoutButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function HomePage() {
    const [count, setCount] = useState(0);
    const handleClick = () => {
        setCount(count + 1);
    }
    return (
        <div className="grid grid-cols-1 max-w-[50%] gap-5 w-full p-2 h-full">
            Hello ""User"""
            <h1 className="text-3xl">You has clicked: {count} times</h1>
            <Button onClick={handleClick}
                variant="default">Click</Button>
            {<LogoutButton />}

        </div>
    )
}
export default HomePage;