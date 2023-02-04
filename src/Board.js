import React, { useState } from 'react';

const Board = ({ formData }) => {
  const [board, setBoard] = useState(Array(formData.boardSize).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(formData.firstPlayer);

  const handleCellClick = (index) => {
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  return (
    <div>
      <div>Current player: {currentPlayer}</div>
      <div>
        {board.map((cell, index) => (
          <div key={index} onClick={() => handleCellClick(index)}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;