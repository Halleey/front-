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
            const token: string = data?.token; // Extrai o token JWT do objeto de resposta
            localStorage.setItem('token', token); // Salva o token JWT no localStorage
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

// Interface para as propriedades de um input
interface InputProps {
    label: string;
    value: string;
    updateValue(value: string): void;
}   

// Interface para as propriedades do modal
interface ModalProps {
    closeModal(): void;
}

// Componente funcional para um input
const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

// Componente funcional para o modal de login
export function LoginModal({ closeModal }: ModalProps){
    // Estados para armazenar os dados de login
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    // Hook customizado para realizar o login
    const login = useLogin(); // Use o hook personalizado para login

    // Função para enviar os dados de login
    const submit = async () => {
        // Chama a função de login com os dados fornecidos
        try {
            await login({ name, password }); // Chama a função de login com os dados fornecidos
            closeModal(); // Fecha o modal após o login
        } catch (error) {
            // Trate erros de login aqui, se necessário
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
                {/* Botão para enviar os dados de login */}
                <button onClick={submit} className="btn-primary">Entrar</button>
                {/* Botão para fechar o modal */}
                <button onClick={handleClose} className="btn-primary">Fechar</button>
            </div>
        </div>
    )
}
