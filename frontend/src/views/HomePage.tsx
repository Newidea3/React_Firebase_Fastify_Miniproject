

import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';

const url = import.meta.env.VITE_BACKEND_URL;

const socket = io(url, {
    transports: ['websocket'],
});

function HomePage() {

    const [count, setCount] = useState(0);
    useEffect(() => {
        socket.on('countUpdated', (data) => {
            console.log('New Count', data.newCount);
            setCount(data.newCount);
        });
        return () => {
            socket.off('countUpdated');
        }
    }, []);
    const handleClick = () => {
        socket.emit('click', { userId: 'user123', count });
    };
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