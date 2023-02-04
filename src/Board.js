import React, { useState, useEffect } from 'react';

const Board = ({ formData }) => {
  const [grid, setGrid] = useState(
    Array(formData.boardSize).fill().map(() => Array(formData.boardSize).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState(formData.firstPlayer);
  const [winner, setWinner] = useState(null);

  const handleCellClick = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = currentPlayer;
    setGrid(newGrid);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  useEffect(() => {
    const winningCombinations = [];
    switch (formData.winningCondition) {
      case 'Row':
        for (let i = 0; i < formData.boardSize; i++) {
          const row = [];
          for (let j = 0; j < formData.boardSize; j++) {
            row.push([i, j]);
          }
          winningCombinations.push(row);
        }
        break;
      case 'Column':
        for (let i = 0; i < formData.boardSize; i++) {
          const col = [];
          for (let j = 0; j < formData.boardSize; j++) {
            col.push([j, i]);
          }
          winningCombinations.push(col);
        }
        break;
      case 'Diagonal':
        const leftDiagonal = [];
        const rightDiagonal = [];
        for (let i = 0; i < formData.boardSize; i++) {
          leftDiagonal.push([i, i]);
          rightDiagonal.push([i, formData.boardSize - i - 1]);
        }
        winningCombinations.push(leftDiagonal, rightDiagonal);
        break;
      default:
        break;
    }

    // Check if the current player wins
    winningCombinations.forEach(combination => {
      let isWinner = true;
      combination.forEach(cell => {
        const [row, col] = cell;
        if (grid[row][col] !== currentPlayer) {
          isWinner = false;
        }
      });
      if (isWinner) {
        setWinner(currentPlayer);
      }
    });
  }, [grid, currentPlayer, formData.winningCondition, formData.boardSize]);

  return (
    <div className="board">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div 
              key={colIndex} 
              className="board-cell"
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
      {winner && <div className="winner-message">{winner} wins!</div>}
    </div>
  );

};

export default Board;
