
const url= import.meta.env.VITE_BACKEND_URL;
async function countClicks(userId: string) {
    const response = await fetch(`${url}/user/count?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch click count');
    }
    const data = await response.json();
    return data.count;
}

async function registerClick(userId: string) {
    const response = await fetch(`${url}/user/click`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), 
    });

    if (!response.ok) {
        throw new Error('Failed to register click'); 
    }
    return response.json();
}

export default { countClicks, registerClick };