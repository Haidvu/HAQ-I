import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header'
import Home from './components/Home';
import RankedLocations from './components/ranked_locations/RankedLocations';
import RankedPollutants from './components/ranked_pollutants/RankedPollutants';
import Pollutants from './components/Pollutants';
import Agency from './components/Agency';
import Map from './components/map/Map';




function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/ranked-locations">
          <RankedLocations />
        </Route>
        <Route exact path="/ranked-pollutants">
          <RankedPollutants />
        </Route>
        <Route exact path="/pollutants">
          <Pollutants />
        </Route>
        <Route exact path="/map">
          <Map />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
