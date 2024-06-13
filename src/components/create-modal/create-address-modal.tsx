// src/components/create-modal/create-address-modal.tsx
import React, { useState, useEffect } from 'react';
import { useAddressDataMutate } from '../../hooks/useAddressData';
import "./userModal.css";

interface InputProps {
    label: string;
    value: string;
    updateValue(value: string): void;
}

interface ModalProps {
    closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => (
    <>
        <label>{label}</label>
        <input value={value} onChange={event => updateValue(event.target.value)} />
    </>
);

export function CreateAddressModal({ closeModal }: ModalProps) {
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [userId, setUserId] = useState<number | undefined>(undefined);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            setUserId(payload.userId); 
        }
    }, []);

    const saveAddress = useAddressDataMutate();

    const submit = () => {
        if (userId === undefined) {
            console.error("User ID is not defined");
            return;
        }
    
        const addressData = {
            address,
            number,
        };
        saveAddress(addressData, userId); 
        console.log(addressData)
        closeModal();
    };
    const handleClose = () => {
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo endereço</h2>
                <form className="input-container">
                    <Input label="Endereço" value={address} updateValue={setAddress} />
                    <Input label="Número" value={number} updateValue={setNumber} />
                </form>
                <button onClick={submit} className="btn-primary">Cadastrar Endereço</button>
                <button onClick={handleClose} className="btn-primary">Fechar</button>
            </div>
        </div>
    );
}
