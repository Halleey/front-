import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { FoodData } from '../interface/FoodData';
import { useAuth } from './useAuth'; 

const API_URL = 'http://localhost:8080';
const postData = async (data: FoodData, token: string | null): AxiosPromise<any> => {
   

    const headers = {
        Authorization: `Bearer ${token}`
    };

    
    const response = axios.post(API_URL + '/food/save', data, { headers });
    return response;
}


export function useFoodDataMutate(){
    const queryClient = useQueryClient();
    const { token } = useAuth(); 

   
    const mutate = useMutation({
        mutationFn: (data: FoodData) => postData(data, token),
        retry: 2, 
        onSuccess: () => {
           
            queryClient.invalidateQueries(['food-data'])
        }
    });

    return mutate;
}
