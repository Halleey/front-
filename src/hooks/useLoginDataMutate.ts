import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'http://localhost:8080';

const login = async (credentials: { name: string; password: string }) => {
    const response = await axios.post(API_URL + '/enter/auth', credentials);
    return response.data;
}

export function useLogin() {
    const queryClient = useQueryClient();

    const { mutate } = useMutation(login, {
        onSuccess: () => {
            queryClient.invalidateQueries(['user-data']);
        }
    });

    const loginUser = async (credentials: { name: string; password: string }) => {
        await mutate(credentials);
    }

    return loginUser;
}
