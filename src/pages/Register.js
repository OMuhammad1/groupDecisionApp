import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecisions } from '../DecisionsContext';
import './Register.css';

function Register() {
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');
  const { decisions, setUserInfo } = useDecisions();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!groupName || !username) {
      alert('Group Name and Username are required!');
      return;
    }

    setUserInfo({ groupName, username });
    navigate('/home');
  };

  return (
    <div className="login-page">
      <h1>Decider</h1>
      <form className="login-form" onSubmit={handleRegister}>
        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Choose your group name"
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose your username"
          />
        </label>
        <label>
          Group Key:
          <input
            type="text"
            placeholder="Choose the group Key"
          />
        </label>
        <button type="submit" className="login-button">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
