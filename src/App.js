import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import Home from './components/Home';
import Location from './components/Location';
import Pollutants from './components/Pollutants';
import Agency from './components/Agency';


function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/location">
          <Location />
        </Route>
        <Route exact path="/pollutants">
          <Pollutants />
        </Route>
        <Route exact path="/agency">
          <Agency />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
