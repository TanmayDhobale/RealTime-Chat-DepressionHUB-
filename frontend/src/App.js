import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import UserInterestsForm from './components/UserInterestsForm';

function App() {
  return (
    <Switch>
      <Route path="/login" exact component={LoginPage} />
      <Route path="/signup" exact component={SignupPage} />
      <Route path="/interests" exact component={UserInterestsForm} />
      <Route path="/chat" exact component={ChatRoom} />
      <Route path="/" exact component={LoginPage} />
    </Switch>
  );
}

export default App;
