import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from '../interface/FoodData';
import { useAuth } from './useAuth'; // Importe o hook useAuth

// URL base da API
const API_URL = 'http://localhost:8080';

// Função para enviar dados de comida para a API
const postData = async (data: FoodData, token: string | null): AxiosPromise<any> => {
    // Configuração dos headers com o token JWT
    const headers = {
        Authorization: `Bearer ${token}`
    };

    // Faz uma requisição POST para o endpoint '/food' da API com os dados fornecidos e os headers
    const response = axios.post(API_URL + '/food/save', data, { headers });
    return response;
}

// Hook personalizado para mutar dados de comida
export function useFoodDataMutate(){
    const queryClient = useQueryClient();
    const { token } = useAuth(); // Obtenha o token JWT usando o hook useAuth

    // Usa o hook useMutation para definir uma mutação com postData
    const mutate = useMutation({
        mutationFn: (data: FoodData) => postData(data, token), // Função de mutação que inclui o token JWT
        retry: 2, // Número de tentativas de retry em caso de falha
        onSuccess: () => {
            // Invalida a query 'food-data' no queryClient para forçar uma nova busca dos dados
            queryClient.invalidateQueries(['food-data'])
        }
    });

    return mutate;
}
