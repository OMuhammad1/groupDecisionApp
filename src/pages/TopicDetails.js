import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDecisions } from '../DecisionsContext';
import './TopicDetails.css';

function TopicDetails() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const { decisions, updateDecision, userInfo } = useDecisions();
  const decision = decisions.find((d) => d.id === parseInt(id, 10));

  const [selectedOption, setSelectedOption] = useState('');
  const [discussion, setDiscussion] = useState('');

  const hasVoted = decision.voters.includes(userInfo.username);

  const handleVote = () => {
    if (!selectedOption) {
      alert('Please select an option!');
      return;
    }

    if (hasVoted) {
      alert('You have already voted!');
      return;
    }

    const updatedDecision = {
      ...decision,
      votes: {
        ...decision.votes,
        [selectedOption]: decision.votes[selectedOption] + 1,
      },
      voters: [...decision.voters, userInfo.username],
    };
    updateDecision(updatedDecision);
  };

  const handleAddDiscussion = () => {
    if (!discussion.trim()) {
      alert('Please enter a discussion!');
      return;
    }

    const updatedDecision = {
      ...decision,
      discussions: [
        ...decision.discussions,
        { user: userInfo.username, text: discussion },
      ],
    };
    updateDecision(updatedDecision);
    setDiscussion('');
  };

  return (
    <div className="topic-details">
      <h2>{decision.title}</h2>

      <h3>Options and Vote Tallies:</h3>
      <ul className="options-list">
        {decision.options.map((option) => (
          <li key={option}>
            {option} - {decision.votes[option]} vote(s)
          </li>
        ))}
      </ul>

      <h3>Vote:</h3>
      {hasVoted ? (
        <p>You have already voted.</p>
      ) : (
        <>
          <select
            className="vote-dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">-- Select an Option --</option>
            {decision.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <button onClick={handleVote} className="finalize-button">
            Submit Vote
          </button>
        </>
      )}

      <h3>Discussions:</h3>
      <div className="discussion-section">
        <ul className="discussion-list">
          {decision.discussions.map((d, index) => (
            <li key={index}>
              <strong>{d.user}:</strong> {d.text}
            </li>
          ))}
        </ul>
        <div className="discussion-input-container">
          <input
            type="text"
            value={discussion}
            onChange={(e) => setDiscussion(e.target.value)}
            placeholder="Add a discussion"
            className="discussion-input"
          />
          <button onClick={handleAddDiscussion} className="submit-discussion">
            Add Discussion
          </button>
        </div>
      </div>

      {/* Add the Back to Home button */}
      <button onClick={() => navigate('/home')} className="back-button">
        Back to Home
      </button>
    </div>
  );
}

export default TopicDetails;
