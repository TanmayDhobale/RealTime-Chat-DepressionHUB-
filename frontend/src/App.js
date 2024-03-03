import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatRoom from '../src/components/ChatRoom';
import LoginPage from '../src/components/LoginPage';
import SignupPage from "../src/components/SignupPage"
import UserInterestsForm from '../src/components/UserInterestsForm';

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/interests" element={<UserInterestsForm />} />
      <Route path="/chat" element={<ChatRoom />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
    </Router>
  );
}

export default App;
