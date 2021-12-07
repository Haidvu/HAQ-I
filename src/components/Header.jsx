import React from 'react';
import { Typography, AppBar, Grid, Toolbar, Button, Container, IconButton } from '@mui/material';
import { Equalizer } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import HeaderStyles from '../styles/HeaderStyles';

const Home = () => {
  const classes = HeaderStyles();
  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Equalizer fontSize="large"/>
          <Grid container spacing={2}>
            <Grid item xs={9} sm={2} md={2}>
              <Typography className={classes.companyName}>
                HAQI
              </Typography>
            </Grid>
            <Grid item xs={1} sm={1} md={3}>
              <IconButton color="inherit" className={classes.menuMobile}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={1} sm={9} md={7}>
              <Container className={classes.buttonContainer}>
                  <Button variant="text" href="/location">
                    <Typography className={classes.appBarText}>
                      Location
                    </Typography>
                  </Button>
                  <Button variant="text" href="/pollutants">
                    <Typography className={classes.appBarText}>
                      Pollutants
                    </Typography>
                  </Button>
                  <Button variant="text" href="/agency">
                    <Typography className={classes.appBarText}>
                      Agency
                    </Typography>
                  </Button>
                  <Button variant="text" href="/map">
                    <Typography className={classes.appBarText}>
                      Map
                    </Typography>
                    </Button>
              </Container>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Home;

