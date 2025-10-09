

import LogoutButton from "@/components/LogoutButton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import countClicksService from "@/services/countClicksService";
import { useCallback, useEffect, useState } from "react";
import { io } from 'socket.io-client';

const url = import.meta.env.VITE_BACKEND_URL;

const socket = io(url, {
    transports: ['websocket'],
});

function HomePage() {
    const { user } = useAuth();
    const [count, setCount] = useState(0);
    const userId = user?.id || 'user';

    const loadInitialCount = useCallback(async () => {
        try {
            console.log("Loading initial count for userId:", userId);
            const initialCount = await countClicksService.countClicks(userId);
            setCount(initialCount);
        } catch (error) {
            console.error("Error loading initial count:", error);
        }
    }, [userId]);

    useEffect(() => {
        loadInitialCount();

        socket.on('countUpdated', (data: { userId: string, newCount: number }) => {
            console.log('Received real-time update:', data.newCount);
            if (data.userId === userId || true) {
                setCount(data.newCount);
            }
        });

        return () => {
            socket.off('countUpdated');
        }
    }, [loadInitialCount, userId]);

    const handleClick = async () => {
        try {
            await countClicksService.registerClick(userId);
        } catch (error) {
            console.error("Error registering click:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 max-w-[50%] gap-5 w-full p-2 h-full">
            Hello {user?.name}, welcome to your dashboard!
            <h1 className="text-3xl">You has clicked: {count} times</h1>
            <Button onClick={handleClick}
                variant="default">Click</Button>
            {<LogoutButton />}

        </div>
    )
}
export default HomePage;