import { useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { FoodData } from '../../interface/FoodData';

import "./modal.css";

// Interface para as propriedades de um input
interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
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

export function CreateModal({ closeModal }: ModalProps){
    
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
   
    const { mutate, isSuccess, isLoading } = useFoodDataMutate();


    const submit = () => {
        const foodData: FoodData = {
            title, 
            price,
            image
        }
        mutate(foodData)
    }

    // Efeito para fechar o modal quando a mutação é bem-sucedida
    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    // Função para fechar o modal
    const handleClose = () => {
        closeModal();
    }

    // Renderização do componente
    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    {/* Componentes Input para o título, preço e imagem */}
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="price" value={price} updateValue={setPrice}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                </form>
                {/* Botão para enviar os dados do item */}
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'postando...' : 'postar'}
                </button>
                {/* Botão para fechar o modal */}
                <button onClick={handleClose} className="btn-secondary">Fechar</button>
            </div>
        </div>
    )
}
