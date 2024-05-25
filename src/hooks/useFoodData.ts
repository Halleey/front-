import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { FoodData } from '../interface/FoodData';

// URL base da API
const API_URL = 'http://localhost:8080';

// Função para buscar dados de comida da API
const fetchData = async (): AxiosPromise<FoodData[]> => {
  
    const response = axios.get(API_URL + '/food');
    return response;
}

// Hook personalizado para buscar dados de comida
export function useFoodData(){
  
    const query = useQuery({
        queryFn: fetchData, 
        queryKey: ['food-data'],
        retry: 2 
    })

    // Retorna a query com a propriedade 'data' renomeada para 'data' para facilitar o uso
    return {
        ...query,
        data: query.data?.data
    }
}
