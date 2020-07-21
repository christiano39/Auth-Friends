import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import Friends from './components/Friends';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path='/friends' component={Friends} />
        <Route path='/login'>
          <LoginForm />
        </Route>
        <Route component={LoginForm} />
      </Switch>
    </div>
  );
}

export default App;
