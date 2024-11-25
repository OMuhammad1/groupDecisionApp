import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDecisions } from '../DecisionsContext';
import './Login.css';

function Login() {
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');
  const { decisions, setUserInfo } = useDecisions();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!groupName || !username) {
      alert('Group Name and Username are required!');
      return;
    }

    setUserInfo({ groupName, username });
    navigate('/home');
  };

  // Optionally, you can display group decisions here if needed.
  // However, since the user hasn't logged in yet, it's better to
  // keep this page focused on login.

  return (
    <div className="login-page">
      <h1>Decider</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label>
          Group Name:
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter your group name"
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </label>
        <label>
          Group Key:
          <input
            type="text"
            placeholder="Enter the group Key"
          />
        </label>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
