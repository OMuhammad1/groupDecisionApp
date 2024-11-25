import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DecisionsProvider } from './DecisionsContext';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateDecision from './pages/CreateDecision';
import TopicDetails from './pages/TopicDetails';

function App() {
  return (
    <DecisionsProvider>
      <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateDecision />} />
          <Route path="/topic/:id" element={<TopicDetails />} />
        </Routes>
      </Router>
      </div>
    </DecisionsProvider>
  );
}

export default App;
