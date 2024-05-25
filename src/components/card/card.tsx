import React from 'react';
import { useCart } from '../card/CartContext';
import './card.css';
import { FoodData } from '../../interface/FoodData';

interface CardProps {
  data: FoodData;
}

export function Card({ data }: CardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Verifica se 'id' está presente antes de adicionar ao carrinho
    if (data.id !== undefined) {
      const { id, title, image, price } = data;
      addToCart({ id, title, image, price, quantity: 1 });
    }
  };

  return (
    <div className="card">
      <img src={data.image} alt={data.title} />
      <h2>{data.title}</h2>
      <p><b>Price:</b> ${data.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}