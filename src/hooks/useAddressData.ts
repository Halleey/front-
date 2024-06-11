// src/hooks/useAddressDataMutate.ts
import { useMutation, useQueryClient, MutationOptions } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { AddressData } from '../interface/AddressData';

const API_URL = 'http://localhost:8080';

interface MutationData {
    addressData: AddressData;
    userId: number;
}

const postAddress = async ({ addressData, userId }: MutationData): Promise<AxiosResponse<any>> => {
    const response = await axios.post(`${API_URL}/public/address`, addressData, {
        headers: {
            userId: userId.toString() // Adicione o userId como um cabeçalho
        }
    });
    return response;
}

export function useAddressDataMutate() {
    const queryClient = useQueryClient();

    const { mutate } = useMutation<AxiosResponse<any>, unknown, MutationData, unknown>(postAddress, {
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['address-data']);
        }
    });

    const saveAddress = (addressData: AddressData, userId: number, options?: MutationOptions<AxiosResponse<any>, unknown, MutationData, unknown>) => {
        mutate({ addressData, userId }, options);
    };

    return saveAddress;
}
