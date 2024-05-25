import { useEffect, useState } from 'react';


const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem('token');
}


export function useAuth() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
       
        const storedToken = getTokenFromLocalStorage();

        console.log("Token obtido do localStorage:", storedToken); 

        setToken(storedToken);
    }, []);

    return { token };
}
