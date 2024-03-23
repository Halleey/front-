import { useState } from 'react';
import './App.css';
import { Card } from './components/card/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal/create-modal';
import { CreateUserModal } from './components/create-modal/create-user-modal';
import { LoginModal } from './components/create-modal/create-login-modal'; 

function App() {
  const { data } = useFoodData();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
        {data?.map(foodData => 
          <Card
            key={foodData.id}
            price={foodData.price} 
            title={foodData.title} 
            image={foodData.image}
          />
        )}
      </div>
      <div className="button-container">
        <button onClick={handleOpenProductModal}>Novo Produto</button>
        <button onClick={handleOpenUserModal}>Cadastrar Usuário</button>
        <button onClick={() => setIsLoginModalOpen(true)}>Login</button>
      </div>
      {isProductModalOpen && <CreateModal closeModal={handleCloseModal}/>}
      {isUserModalOpen && <CreateUserModal closeModal={handleCloseModal}/>}
      {isLoginModalOpen && <LoginModal closeModal={handleCloseModal}/>}
    </div>
  );
}

export default App;
