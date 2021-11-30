import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Drawer, Grid, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '@mui/material';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import { styled } from '@mui/system';


const drawerWidth = 240
const iconColor = 'white'

const useStyles = makeStyles({
  drawerPaper: {
    width: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
  },
});

const StyledDrawer = styled(Drawer)`
  & > div {
    background-color: #081A51;
  }
`;

const PermanentDrawer = () => {
  const classes = useStyles();
  const history = useHistory()
  const location = useLocation()
  
  const drawerItems = [
    {
      text: 'Dashboard',
      icon: <GraphicEqIcon sx={{fill: iconColor}}/>,
      path: '/'
    },
    {
      text: 'Map',
      icon: <RoomOutlinedIcon sx={{fill: iconColor}}/>,
      path: '/map'
    },
    {
      text: 'Pollutants',
      icon: <WarningAmberOutlinedIcon sx={{fill: iconColor}}/>,
      path: '/pollutants'
    },
    {
      text: 'Agency',
      icon: <LocalLibraryOutlinedIcon sx={{fill: iconColor}}/>,
      path: '/agency'
    },
  ]
  return (
    <StyledDrawer
      classes={{ paper: classes.drawerPaper}}
      className={classes.drawer}
      variant="permanent"
      anchor="left"
    >
      <div>
        <Grid container justifyContent='center'>
          <Grid item sx={6}>
            <TrackChangesOutlinedIcon sx={{ fill: iconColor, fontSize: 40 }}/>
          </Grid>
          <Grid item sx={6}>
            <Typography variant="h4" color='#fff'>
              HAQ-I
            </Typography>
          </Grid>
        </Grid>
      </div>

      <List>
        {drawerItems.map(item => (
      <ListItem button onClick={() => history.push(item.path)} key={item.text} selected={item.path === location.pathname}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>
              <Typography color="#FFFFFF">
                {item.text}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
}

export default PermanentDrawer;