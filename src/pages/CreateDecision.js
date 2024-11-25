import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecisions } from '../DecisionsContext';
import './CreateDecision.css';

function CreateDecision() {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['']);
  const { addDecision, decisions, userInfo } = useDecisions();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim() || options.some((option) => !option.trim())) {
      alert('Please fill in all fields!');
      return;
    }

    addDecision({
      id: decisions.length + 1,
      title,
      options,
      discussions: [],
      group: userInfo.groupName,
      votes: options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {}),
      voters: [],
    });

    navigate('/home');
  };

  return (
    <div className="create-decision">
      <h2>Create a New Decision</h2>
      <label>
        Group:
        <input
          type="text"
          value={userInfo.groupName}
          readOnly
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter decision title"
        />
      </label>
      <h3>Options:</h3>
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => {
            const updatedOptions = [...options];
            updatedOptions[index] = e.target.value;
            setOptions(updatedOptions);
          }}
          placeholder={`Option ${index + 1}`}
        />
      ))}
      <button
        onClick={() => setOptions([...options, ''])}
        className="add-option-button"
      >
        Add Option
      </button>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
    </div>
  );
}

export default CreateDecision;
