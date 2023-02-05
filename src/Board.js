import React, { useState } from 'react';

const Board = ({ formData }) => {
  const [grid, setGrid] = useState(
    Array(formData.boardSize).fill().map(() => Array(formData.boardSize).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState(formData.firstPlayer);
  const [winner, setWinner] = useState(null);
  const [draw] = useState(0);

  const checkDraw = () => {
    if (grid.flat().every(cell => cell !== null) && !winner) {
      setWinner('Draw');
    }
  };

  const handleCellClick = (rowIndex, colIndex) => {
    if (!winner && grid[rowIndex][colIndex] === null) {
      if (formData.gameMode === "minimax") {
        if (currentPlayer !== formData.firstPlayer) {
          const bestMove = minimax(grid, 0, false).move;
          const [newRowIndex, newColIndex] = bestMove;
          const newGrid = [...grid];
          newGrid[newRowIndex][newColIndex] = currentPlayer;
          console.log(newGrid)
          setGrid(newGrid);
        } else {
          const newGrid = [...grid];
          newGrid[rowIndex][colIndex] = currentPlayer;
          console.log(newGrid)
          setGrid(newGrid);
        }
      } else {
        const newGrid = [...grid];
        newGrid[rowIndex][colIndex] = currentPlayer;
        setGrid(newGrid);
      }
      // Check for the winner after each move
      checkWinner();
      checkDraw();
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const minimax = (grid, depth, isMaximizing) => {
    // Check if there is a winner or the game is a draw
    const winner = checkWinner();
    if (winner === 'X') {
      return { score: -10 + depth };
    } else if (winner === 'O') {
      return { score: 10 - depth };
    } else if (winner === 'Draw') {
      return { score: 0 };
    }
  
    // Generate all possible moves
    const moves = [];
    for (let i = 0; i < formData.boardSize; i++) {
      for (let j = 0; j < formData.boardSize; j++) {
        if (grid[i][j] === null) {
          moves.push({ row: i, col: j });
        }
      }
    }
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      let bestMove;
      for (const move of moves) {
        // Make the move
        grid[move.row][move.col] = currentPlayer;
        // Get the score for the move
        const score = minimax(grid, depth + 1, false).score;
        // Undo the move
        grid[move.row][move.col] = null;
        // Update bestScore and bestMove if a better score is found
        if (score > bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }
      return { score: bestScore, move: bestMove };
    } else {
      let bestScore = Infinity;
      let bestMove = null;
      for (const move of moves) {
        // Make the move
        grid[move.row][move.col] = currentPlayer === 'X' ? 'O' : 'X';
        // Get the score for the move
        const score = minimax(grid, depth + 1, true).score;
        // Undo the move
        grid[move.row][move.col] = null;
        // Update bestScore and bestMove if a better score is found
        if (score < bestScore) {
          bestScore = score;
          bestMove = move;
        }
      }

      return bestMove ? { score: bestScore, move: bestMove } : { score: bestScore };
    }
  };
  
  
  
  const checkWinner = () => {
    const winningCombinations = [];

    // Calculate number of cells needed in a line to win
    const lineLength = formData.winningCondition;

    // Get all rows
    for (let i = 0; i < formData.boardSize; i++) {
      const row = [];
      for (let j = 0; j < formData.boardSize; j++) {
        row.push([i, j]);
      }
      winningCombinations.push(row);
    }

    // Get all columns
    for (let i = 0; i < formData.boardSize; i++) {
      const col = [];
      for (let j = 0; j < formData.boardSize; j++) {
        col.push([j, i]);
      }
      winningCombinations.push(col);
    }

    // Get both diagonals
    const leftDiagonal = [];
    const rightDiagonal = [];
    for (let i = 0; i < formData.boardSize; i++) {
      leftDiagonal.push([i, i]);
      rightDiagonal.push([i, formData.boardSize - i - 1]);
    }
    winningCombinations.push(leftDiagonal, rightDiagonal);

    // Check each combination
    winningCombinations.forEach(combination => {
      if (combination.length >= lineLength) {
        for (let i = 0; i <= combination.length - lineLength; i++) {
          let allCellsFilled = true;
          let allCellsMatchCurrentPlayer = true;
          for (let j = i; j < i + lineLength; j++) {
            const [row, col] = combination[j];
            if (grid[row][col] === null) {
              allCellsFilled = false;
            }
            if (grid[row][col] !== currentPlayer) {
              allCellsMatchCurrentPlayer = false;
            }
          }
          if (allCellsFilled && allCellsMatchCurrentPlayer) {
            setWinner(currentPlayer);
            break;
          }
        }
      }
    });
  };


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
      {winner === 'Draw' && <div className="winner-message">It's a draw!</div>}

    </div>
  );

};

export default Board;
