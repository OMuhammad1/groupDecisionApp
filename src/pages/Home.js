import React from 'react';
import { Link } from 'react-router-dom';
import { useDecisions } from '../DecisionsContext';
import './Home.css';

function Home() {
  const { decisions, userInfo } = useDecisions();

  const groupDecisions = decisions.filter(
    (decision) => decision.group === userInfo.groupName
  );

  return (
    <div className="home-page">
      <h2>Welcome, {userInfo.username}</h2>
      <h3>Decisions for Group: {userInfo.groupName}</h3>
      <ul className="decision-list">
        {groupDecisions.map((decision) => (
          <li key={decision.id}>
            <Link to={`/topic/${decision.id}`}>{decision.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/create" className="new-decision-button">
        Create New Decision
      </Link>
      {/* Navigation Bar */}
      <div className="App-nav">
        <Link to="/home">Home</Link>
        {/* Add more navigation links if needed */}
      </div>
    </div>
  );
}

export default Home;
