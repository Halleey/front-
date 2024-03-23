import { useEffect, useState } from 'react';

// Função para obter o token JWT armazenado no localStorage
const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem('token');
}

// Hook personalizado para obter o token JWT do usuário atualmente autenticado
export function useAuth() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Obter o token JWT do localStorage ao montar o componente
        const storedToken = getTokenFromLocalStorage();

        console.log("Token obtido do localStorage:", storedToken); // Adicione este log para verificar o token

        setToken(storedToken);
    }, []);

    return { token };
}
