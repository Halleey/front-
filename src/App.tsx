import React, { useState, useEffect } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import { CreateUserModal } from './components/create-modal/create-user-modal';
import { CreateAddressModal } from './components/create-modal/create-address-modal';
import { LoginModal } from './components/create-modal/create-login-modal';
import { CartProvider } from './components/card/CartContext';
import CartModal from './components/create-modal/create-cart-modal';
import { useQueryClient } from '@tanstack/react-query';

function App() {
  const { data } = useFoodData();
  const queryClient = useQueryClient();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [hasAddressPermission, setHasAddressPermission] = useState(false);
  const [hasProductPermission, setHasProductPermission] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      if (role === 'ADMIN') {
        setHasAddressPermission(true);
        setHasProductPermission(true);
      }
      setIsAuthenticated(true);
    }
  }, []);

  const handleOpenProductModal = () => setIsProductModalOpen(true);
  const handleOpenUserModal = () => setIsUserModalOpen(true);
  const handleOpenAddressModal = () => setIsAddressModalOpen(true);
  const handleOpenCartModal = () => setIsCartModalOpen(true);
  const handleCloseModal = () => {
    setIsProductModalOpen(false);
    setIsUserModalOpen(false);
    setIsAddressModalOpen(false);
    setIsLoginModalOpen(false);
    setIsCartModalOpen(false);
  }


  const handleLogout = () => {
    localStorage.removeItem('token');
    queryClient.clear();
    setIsAuthenticated(false);
    window.location.reload();
  }

  return (
    <CartProvider>
      <div className="button-container">
        {isAuthenticated && hasProductPermission && <button onClick={handleOpenProductModal}>Novo Produto</button>}
        {!isAuthenticated && <button onClick={handleOpenUserModal}>Cadastrar Usuário</button>}
        {isAuthenticated && hasAddressPermission && <button onClick={handleOpenAddressModal}>Novo Endereço</button>}
        {!isAuthenticated && <button onClick={() => setIsLoginModalOpen(true)}>Login</button>}
        <button onClick={handleOpenCartModal}>Ver Carrinho</button>
        {isAuthenticated && <button onClick={handleLogout}>Sair</button>}
      </div>
      <div className="container">
        <div className="card-grid">
          {data?.map(foodData => 
            <Card
              key={foodData.id}
              data={foodData}
            />
          )}
        </div>
        {isProductModalOpen && <CreateModal closeModal={handleCloseModal} />}
        {isUserModalOpen && <CreateUserModal closeModal={handleCloseModal} />}
        {isAddressModalOpen && <CreateAddressModal closeModal={handleCloseModal} />}
        {isLoginModalOpen && <LoginModal closeModal={handleCloseModal} />}
        {isCartModalOpen && <CartModal closeModal={handleCloseModal} />}
      </div>
    </CartProvider>
  );
}

export default App;
