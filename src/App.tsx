import React, { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import { CreateUserModal } from './components/create-modal/create-user-modal';
import { LoginModal } from './components/create-modal/create-login-modal'; 
import { CartProvider } from './components/card/CartContext'; 
import CartModal from './components/create-modal/create-cart-modal'; // Importe o componente CartModal

function App() {
  const { data } = useFoodData();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false); // Adicione o estado para o modal do carrinho

  const handleOpenProductModal = () => {
    setIsProductModalOpen(true);
  }

  const handleOpenUserModal = () => {
    setIsUserModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsProductModalOpen(false);
    setIsUserModalOpen(false);
    setIsLoginModalOpen(false);
    setIsCartModalOpen(false); 
  }

  const handleOpenCartModal = () => {
    console.log("click");
    setIsCartModalOpen(true); 
  }

  return (
    <CartProvider>
       <div className="button-container">
          <button onClick={handleOpenProductModal}>Novo Produto</button>
          <button onClick={handleOpenUserModal}>Cadastrar Usuário</button>
          <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
          <button onClick={handleOpenCartModal}>Ver Carrinho</button> {}
        </div>
      <div className="container">
        <h1>Cardápio</h1>
        <div className="card-grid">
          {data?.map(foodData => 
            <Card
              key={foodData.id}
              data={foodData}
            />
          )}
        </div>
        {isProductModalOpen && <CreateModal closeModal={handleCloseModal}/>}
        {isUserModalOpen && <CreateUserModal closeModal={handleCloseModal}/>}
        {isLoginModalOpen && <LoginModal closeModal={handleCloseModal}/>}
        {isCartModalOpen && <CartModal closeModal={handleCloseModal}/>} {}
      </div>
    </CartProvider>
  );
}

export default App;
