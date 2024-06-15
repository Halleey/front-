import { useEffect, useState } from 'react';
import { useUserDataMutate } from '../../hooks/userDataMutate';

import "./userModal.css";


interface InputProps {
    label: string,
    value: string,
    updateValue(value: string): void
}   


interface ModalProps {
    closeModal(): void
}


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
   
    const saveUser = useUserDataMutate(); 

    
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

    const handleClose = () => {
        closeModal();
    }

    
    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre-se</h2>
                <form className="input-container">
                    {}
                    <Input label="Nome" value={name} updateValue={setName}/>
                    <Input label="Sobrenome" value={lastName} updateValue={setLastName}/>
                    <Input label="Senha" value={password} updateValue={setPassword}/>
                    <Input label="Email" value={email} updateValue={setEmail}/>
                </form>
                {}
                <button onClick={submit} className="btn-primary">Cadastrar Usuário</button>
                {}
                <button onClick={handleClose} className="btn-primary">Fechar</button>
            </div>
        </div>
    )
}