import React, { useState } from 'react';
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
        onSuccess: (data: any) => {
            const token: string = data?.token; 
            localStorage.setItem('token', token); 
            queryClient.invalidateQueries(['user-data']);
        }
    });

    const loginUser = async (credentials: { name: string; password: string }) => {
        await mutate(credentials);
    }

    return loginUser;
}

export interface LoginData {
    name: string;
    password: string;
}


interface InputProps {
    label: string;
    value: string;
    updateValue(value: string): void;
}   


interface ModalProps {
    closeModal(): void;
}


const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}


export function LoginModal({ closeModal }: ModalProps){
    // Estados para armazenar os dados de login
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
   
    const login = useLogin(); 

   
    const submit = async () => {
        
        try {
            await login({ name, password }); 
            closeModal(); 

        } catch (error) {
        
            console.error('Erro ao fazer login:', error);
        }
    }

    // Função para fechar o modal
    const handleClose = () => {
        closeModal();
    }

    // Renderização do componente
    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Faça login</h2>
                <form className="input-container">
                    {/* Componentes Input para o nome (name) e senha */}
                    <Input label="Name" value={name} updateValue={setName}/>
                    <Input label="Senha" value={password} updateValue={setPassword}/>
                </form>
                {}
                <button onClick={submit} className="btn-primary">Entrar</button>
                {}
                <button onClick={handleClose} className="btn-primary">Fechar</button>
            </div>
        </div>
    )
}
