import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { UserData } from '../interface/UserData'; // Certifique-se de que o nome do arquivo e da interface correspondam

const API_URL = 'http://localhost:8080';

// Função para enviar dados de usuário para a API
const postData = async (data: UserData): AxiosPromise<any> => {
    // Faz uma requisição POST para o endpoint '/public' da API com os dados fornecidos
    const response = axios.post(API_URL + '/public', data);
    return response;
}

// Hook personalizado para mutar dados de usuário
export function useUserDataMutate(){
    const queryClient = useQueryClient();
    // Usa o hook useMutation para definir uma mutação com postData
    const mutate = useMutation({
        mutationFn: postData, // Função de mutação
        retry: 2, // Número de tentativas de retry em caso de falha
        onSuccess: () => {
            // Invalida a query 'user-data' no queryClient para forçar uma nova busca dos dados
            queryClient.invalidateQueries(['user-data']);
        }
    });

    return mutate;
}
