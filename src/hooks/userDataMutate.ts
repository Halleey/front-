import { useMutation, useQueryClient, MutationOptions } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { UserData } from '../interface/UserData';

const API_URL = 'http://localhost:8080';

const postData = async (data: UserData): AxiosPromise<any> => {
    const response = await axios.post(API_URL + '/public', data);
    return response;
}

export function useUserDataMutate(){
    const queryClient = useQueryClient();
    
    const saveUser = async (userData: UserData, options?: MutationOptions<any, unknown, UserData, unknown>) => {
        return mutate(userData, options);
    }

    const { mutate } = useMutation(postData, {
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['user-data']);
        }
    });

    return saveUser;
}
