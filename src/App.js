import './App.css';
import React, { useState } from 'react';
import Form from './Form';

function App() {

  const [formData, setFormData] = useState({
    firstPlayer: '',
    boardSize: 0,
    winningCondition: 0,
    gameMode: '',
  });
  const [showBoard, setShowBoard] = useState(false);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowBoard(true);
  };


  return (
    <div className="App">
      <div>
      {showBoard ? (
        <p>coucou game board</p>
      ) : (
        <Form onFormSubmit={handleFormSubmit} />
      )}
    </div>
    </div>
  );
}

export default App;
