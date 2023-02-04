import './App.css';
import React, { useState } from 'react';
import Form from './Form';
import Board from './Board';

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
        <Board formData={formData} />
      ) : (
        <Form onFormSubmit={handleFormSubmit} />
      )}
    </div>
    </div>
  );
}

export default App;
