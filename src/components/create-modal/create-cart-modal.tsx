import React, { useState, useEffect } from 'react';
import { useCart } from '../card/CartContext';
import './cartmodal.css';

interface CartModalProps {
  closeModal: () => void;
}

function CartModal({ closeModal }: CartModalProps) {
  const { cartItems, removeFromCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handleSwipeLeft();
      } else if (event.key === 'ArrowRight') {
        handleSwipeRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  useEffect(() => {
    if (currentIndex >= cartItems.length && cartItems.length > 0) {
      setCurrentIndex(cartItems.length - 1);
    } else if (currentIndex < 0 && cartItems.length > 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, cartItems]);

  const totalValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSwipeLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex < cartItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(Number(itemId)); // Converter itemId para número
    if (currentIndex === cartItems.length - 1 && currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Carrinho</h2>
        {cartItems.length === 0 ? (
          <p>O carrinho está vazio.</p>
        ) : (
          <>
            <div className="cart-item">
              <button disabled={currentIndex === 0} onClick={handleSwipeLeft}>
                &lt;
              </button>
              <div className="cart-item-image">
                {cartItems[currentIndex] && (
                  <img src={cartItems[currentIndex].image} alt={cartItems[currentIndex].title} />
                )}
              </div>
              <div className="cart-item-details">
                <h3>{cartItems[currentIndex].title}</h3>
                <p>Preço: ${cartItems[currentIndex].price.toFixed(2)}</p>
                <p>Quantidade: {cartItems[currentIndex].quantity}</p>
              </div>
              <button disabled={currentIndex === cartItems.length - 1} onClick={handleSwipeRight}>
                &gt;
              </button>
              <button onClick={() => handleRemoveItem(cartItems[currentIndex].id)}>Remover</button>
            </div>
            <p>Total: ${totalValue.toFixed(2)}</p>
          </>
        )}
        <button onClick={closeModal}>Fechar</button>
      </div>
    </div>
  );
}

export default CartModal