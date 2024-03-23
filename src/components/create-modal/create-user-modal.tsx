import { useEffect, useState } from 'react';
import { useUserDataMutate } from '../../hooks/userDataMutate'; // Importe o hook customizado para mutação de dados de usuário

import "./userModal.css";

// Interface para as propriedades de um input
interface InputProps {
    label: string,
    value: string,
    updateValue(value: string): void
}   

// Interface para as propriedades do modal
interface ModalProps {
    closeModal(): void
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
export function CreateUserModal({ closeModal }: ModalProps){
    // Estados para armazenar os dados do usuário
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    // Hook customizado para realizar a mutação dos dados do usuário
    const saveUser = useUserDataMutate(); // Use o hook customizado para mutação de dados de usuário

    // Função para enviar os dados do usuário para a mutação
    const submit = () => {
        const userData = {
            name,
            lastName,
            password,
            email
        };
        saveUser(userData);
        closeModal();
    }

    // Função para fechar o modal
    const handleClose = () => {
        closeModal();
    }

    // Renderização do componente
    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo usuário</h2>
                <form className="input-container">
                    {/* Componentes Input para o nome, sobrenome, senha e email */}
                    <Input label="Nome" value={name} updateValue={setName}/>
                    <Input label="Sobrenome" value={lastName} updateValue={setLastName}/>
                    <Input label="Senha" value={password} updateValue={setPassword}/>
                    <Input label="Email" value={email} updateValue={setEmail}/>
                </form>
                {/* Botão para enviar os dados do usuário */}
                <button onClick={submit} className="btn-primary">Cadastrar Usuário</button>
                {/* Botão para fechar o modal */}
                <button onClick={handleClose} className="btn-primary">Fechar</button>
            </div>
        </div>
    )
}