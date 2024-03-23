import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { FoodData } from '../interface/FoodData';

// URL base da API
const API_URL = 'http://localhost:8080';

// Função para buscar dados de comida da API
const fetchData = async (): AxiosPromise<FoodData[]> => {
    // Faz uma requisição GET para o endpoint '/food' da API
    const response = axios.get(API_URL + '/food');
    return response;
}

// Hook personalizado para buscar dados de comida
export function useFoodData(){
    // Usa o hook useQuery para definir uma query com fetchData
    const query = useQuery({
        queryFn: fetchData, // Função de busca
        queryKey: ['food-data'], // Chave da query
        retry: 2 // Número de tentativas de retry em caso de falha
    })

    // Retorna a query com a propriedade 'data' renomeada para 'data' para facilitar o uso
    return {
        ...query,
        data: query.data?.data
    }
}
