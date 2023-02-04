import React, { useState } from 'react';

const Form = ({ onFormSubmit }) => {
  const [firstPlayer, setFirstPlayer] = useState('');
  const [boardSize, setBoardSize] = useState(0);
  const [winningCondition, setWinningCondition] = useState(0);
  const [gameMode, setGameMode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { 
        firstPlayer, 
        boardSize: parseInt(boardSize), 
        winningCondition: parseInt(winningCondition), 
        gameMode 
    };
    onFormSubmit(formData);
  };


  return (
    <form onSubmit={handleSubmit}>
      <label>
        First player:
        <select value={firstPlayer} onChange={(event) => setFirstPlayer(event.target.value)}>
          <option value="">Select a player</option>
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
      </label>

      <br />

      <label>
        Board size:
        <input type="number" value={boardSize} onChange={(event) => setBoardSize(event.target.value)} min="0" max="100" />
      </label>

      <br />

      <label>
        Winning condition:
        <input type="number" value={winningCondition} onChange={(event) => setWinningCondition(event.target.value)} min="0" max="100" />
      </label>

      <br />

      <label>
        Game mode:
        <select value={gameMode} onChange={(event) => setGameMode(event.target.value)}>
          <option value="">Select a game mode</option>
          <option value="human">Human</option>
          <option value="minimax">Minimax</option>
        </select>
      </label>

      <br />

      <button type="submit">Start game</button>
    </form>
  );
};

export default Form;
