import React, { useState, useEffect } from 'react';
import Form from './Form';
import Board from './Board';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstPlayer: '',
    boardSize: 0,
    winningCondition: 0,
    gameMode: '',
  });
  const [showBoard, setShowBoard] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningCombinations, setWinningCombinations] = useState([]);

  useEffect(() => {
    const { boardSize, winningCondition } = formData;
    const combinations = [];

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j <= i; j++) {
        for (let k = 0; k < winningCondition; k++) {
          if (i + k >= boardSize) break;

          combinations.push([[j, i + k], [j + k, i], [j + k, i + k]]);
        }
      }
    }

    setWinningCombinations(combinations);
  }, [formData]);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowBoard(true);
  };

  const handleGameOver = (winningPlayer) => {
    setWinner(winningPlayer);
    setShowBoard(false);
  };

  return (
    <div className="App">
      {showBoard ? (
        <Board formData={formData} onGameOver={handleGameOver} winningCombinations={winningCombinations} winner={winner} />
      ) : (
        <Form onFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default App;
