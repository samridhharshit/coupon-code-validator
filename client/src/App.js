import React from 'react';
import './App.css';
import {HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Container from './modules/story/container'

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={Container} />
              <Redirect to={'/'} />
          </Switch>
      </Router>
  );
}

export default App;
