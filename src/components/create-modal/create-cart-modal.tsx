import React from 'react';
import { useCart } from '../card/CartContext';
import './cartmodal.css'; 

interface CartModalProps {
  closeModal: () => void; 
}

function CartModal({ closeModal }: CartModalProps) {
  const { cartItems, removeFromCart } = useCart();

 
  const totalValue = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Carrinho</h2>
        {cartItems.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <>
            <ul>
              {cartItems.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="cart-item-details">
                    <h3>{item.title}</h3>
                    <p>Preço: ${item.price.toFixed(2)}</p>
                    <p>Quantidade: {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Remover</button>
                </li>
              ))}
            </ul>
            <p>Total: ${totalValue.toFixed(2)}</p>
          </>
        )}
        <button onClick={closeModal}>Fechar</button> {}
      </div>
    </div>
  );
}

export default CartModal;