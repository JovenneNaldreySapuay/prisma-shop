import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import Signup from './Signup';
import Signin from './Signin';
import Signout from './Signout';
import User from './User';
import UserSettings from './UserSettings';

class App extends Component {
  render() {
    return (
      <BrowserRouter>   
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/settings" component={UserSettings} />
            <Route exact path="/profile" component={User} />
        </Switch>
      </BrowserRouter>   
    ); 
  }
}

export default App;