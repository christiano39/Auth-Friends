import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/login'>
          <LoginForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
