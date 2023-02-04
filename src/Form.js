import React, { useState } from 'react';

const Form = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    firstPlayer: '',
    boardSize: 0,
    winningCondition: 0,
    gameMode: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(formData);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Player:
        <select name="firstPlayer" value={formData.firstPlayer} onChange={handleInputChange}>
          <option value="X">X</option>
          <option value="O">O</option>
        </select>
      </label>
      <br />
      <label>
        Board Size:
        <input type="number" name="boardSize" value={formData.boardSize} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Winning Condition:
        <input type="number" name="winningCondition" value={formData.winningCondition} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Game Mode:
        <select name="gameMode" value={formData.gameMode} onChange={handleInputChange}>
          <option value="human">Human</option>
          <option value="AI">AI</option>
        </select>
      </label>
      <br />
      <button type="submit">Start Game</button>
    </form>
  );
};

export default Form;