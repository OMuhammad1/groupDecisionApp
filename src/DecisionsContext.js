import React, { createContext, useState, useContext } from 'react';

// Create Context
const DecisionsContext = createContext();

// Custom Hook to use the Decisions Context
export const useDecisions = () => useContext(DecisionsContext);

// Provider Component
export const DecisionsProvider = ({ children }) => {
  const [decisions, setDecisions] = useState([
    {
      id: 1,
      title: 'Weekend Trip Destination',
      options: ['Beach', 'Mountain', 'City'],
      discussions: [],
      votes: { Beach: 0, Mountain: 0, City: 0 },
    },
    {
      id: 2,
      title: 'Family Dinner Menu',
      options: ['Pasta', 'Pizza', 'Salad'],
      discussions: [],
      votes: { Pasta: 0, Pizza: 0, Salad: 0 },
    },
  ]);

  const [userInfo, setUserInfo] = useState({
    groupName: '',
    username: '',
  });

  const addDecision = (newDecision) => {
    setDecisions((prev) => [...prev, { ...newDecision, voters: [] }]);
  };

  const updateDecision = (updatedDecision) => {
    setDecisions((prev) =>
      prev.map((decision) =>
        decision.id === updatedDecision.id ? updatedDecision : decision
      )
    );
  };

  return (
    <DecisionsContext.Provider value={{ decisions, setDecisions, addDecision, updateDecision, userInfo, setUserInfo }}>
      {children}
    </DecisionsContext.Provider>
  );
};
