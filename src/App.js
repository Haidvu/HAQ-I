import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PermanentDrawer from './components/PermanentDrawer'
import Dashboard from './components/Dashboard';
import PollutantsTrend from './components/pollutants_trend/PollutantsTrend';
import RankedLocations from './components/ranked_locations/RankedLocations';
import RankedPollutants from './components/ranked_pollutants/RankedPollutants';
import Pollutants from './components/Pollutants';
import Agency from './components/Agency';
import Map from './components/map/Map';


import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    backgroundColor: ''
  },
});

function App() {
  const classes = useStyles()
  return (
    <Router >
      <div className={classes.root}>
      <PermanentDrawer/>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/pollutants-trend">
          <PollutantsTrend />
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
      </div>
    </Router>
  );
}

export default App;
