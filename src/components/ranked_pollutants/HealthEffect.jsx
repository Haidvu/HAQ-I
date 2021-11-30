

// import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core';

// import axios from 'axios'
// import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import StackedBarChart from "./StackedBar"

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
// import 'typeface-roboto'


import Box from '@mui/material/Box';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',

    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

function HealthEffect(names_, aqi_, risk_) {
//     const [pollutants,setPollutants]=useState([])
//   const GetRankedPollutantsData = () => {
//     axios.get("https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=20002&distance=25&API_KEY=055CDA36-3FC4-4E95-BBBE-73C265CF3131")
//     .then(res => {
//       console.log('airdata',res)
//       setPollutants(res)
//     })
//   }
  
  const Message=(index) =>{
    var message
    var color
 
    if (index >=301) {message=<div>Everyone: Avoid all physical activity outdoors</div>;color="maroon"} else
    if (index <=300 && index>=201) { message =<div>Sensitive groups: Avoid all physical activity outdoors.
        Move activities indoors or reschedule to a time when air quality is better. People with asthma, keep quick-relief medicine handy.
       Everyone else: Avoid prolonged or heavy outdoor exertion. Schedule outdoor activities in the morning when ozone is lower. 
       Consider moving activities indoors.</div>;color="purple"} else
    
    if (index<=200 && index>=151) { message =<div>Sensitive groups: Avoid prolonged or heavy outdoor exertion. 
        Schedule outdoor activities in the morning when ozone is lower. Consider moving activities indoors. 
        People with asthma, keep quick-relief medicine handy.
        Everyone else: Reduce prolonged or heavy outdoor exertion. 
        Take more breaks, do less intense activities.
        Schedule outdoor activities in the morning when ozone is lower.</div>;color="red"} else
    if (index<=150 && index>101) {message =<div>Sensitive groups include: people with lung disease such as asthma, 
        older adults, children and teenagers, and people who are active out- doors. 
        Sensitive groups: Reduce prolonged or heavy outdoor exertion. Take more breaks, do less intense activities. 
        Watch for symptoms such as coughing or shortness of breath. Schedule outdoor activities in the morning when ozone is lower.
        People with asthma should follow their asthma action plans and keep quick relief medicine handy.</div>
    ;color="orange"} else

    if (index<=100 && index>=51)  {message=<div>  Some people who may be unusually sensitive to ozone
        Unusually sensitive people: Consider reducing prolonged or heavy outdoor exertion. Watch for symptoms such as coughing or shortness of breath.
        These are signs to take it easier.
        Everyone else: It's a good day to be active outside.</div>;color="yellow"} else 
    {message=<div>It's a great day to be active outside.</div>;color="#5EE030"}
    return [message,color]

   
   }
    const commonStyles = {
        bgcolor: 'green',
        borderColor: 'text.primary',
        mx: "auto",
        border: 1,
        width: '5rem',
        height: '5rem',
        borderRadius: '50%',        
      }

      const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,  
      }));

      const useStyles = makeStyles((theme) => ({
        container: {display: "flex" },
        item: {
           flexBasis: "33%",  maxWidth: "33%", paddingLeft: theme.spacing(1), color: "red" },
        title:{
            color: "black", fontFamily: 'Roboto',//"Futura,Trebuchet MS,Arial,sans-serif" ,
            fontSize: "6rem", fontWeight: "bold" }
      }));

      const classes = useStyles();
      const [expanded, setExpanded] = React.useState(false);
      const [expanded2, setExpanded2] = React.useState(false);
      const [expanded3, setExpanded3] = React.useState(false);

        const handleExpandClick = () => {
            setExpanded(!expanded);
        };
        const handleExpandClick_2 = () => {
            setExpanded2(!expanded2);
        };
        const handleExpandClick_3 = () => {
            setExpanded3(!expanded3);
        };
      
        var abc=[50,100,200]
   
return(
    
    <div className="box">
       <div>
       
      {/* <button variant="contained" onClick={() => GetRankedPollutantsData()}>Refresh</button>          */}
        
      </div>
    

      {/* {(typeof pollutants.data!="undefined")? ( */}
        <Card>
            <CardContent>
                <Typography variant="h4" component={"span"} align="left" className={classes.title}>Health Effects</Typography>

                <CardActions>                       
                    <Grid container spacing={2} container  direction="row"  justifyContent="center"  alignItems="left">
                        <Grid item xs={3}>
                            <Typography align="left" variant="display4" component="h2" >{names_[2]}</Typography>                      
                        </Grid>
                        <Grid item xs={3} align="center">
                            <Box sx={{ ...commonStyles, borderRadius: '60%',width: 30, height: 30, bgcolor: String(Message(aqi_[2])[1])}  }><Typography>{aqi_[2]}</Typography></Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography align="left" variant="display4" component="h2" >{risk_[2]}</Typography>   
                        </Grid>
                     </Grid>
                                           
                   
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>             
                        <Typography paragraph justifyContent="left" align="left" margin="0">
                        {Message(aqi_[2])[0]}
                        </Typography>
                    
                    </CardContent>
                </Collapse>

        </CardContent>

        <CardContent>
                              
                <CardActions disableSpacing spacing="20">
                <Grid container spacing={2} container  direction="row"  justifyContent="center"  alignItems="left">
                        <Grid item xs={3}>
                            <Typography align="left" variant="display4" component="h2" >{names_[1]} </Typography>                      
                        </Grid>
                        <Grid item xs={3} align="center">
                            <Box sx={{ ...commonStyles, borderRadius: '60%',width: 30, height: 30, bgcolor: String(Message(aqi_[1])[1])}  }><Typography>{aqi_[1]}</Typography></Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography align="left" variant="display4" component="h2" >{risk_[1]}</Typography>   
                        </Grid>
                     </Grid>
                    <ExpandMore
                        expand={expanded2}
                        onClick={handleExpandClick_2}
                        aria-expanded={expanded}
                        aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                
                <Collapse in={expanded2} timeout="auto" unmountOnExit>
                    <CardContent>             
                        <Typography paragraph justifyContent="left" align="left">
                        {Message(aqi_[0])[0]}
                        </Typography>
                    
                    </CardContent>
                </Collapse>
        </CardContent>

        <CardContent>
                <CardActions disableSpacing spacing="20">
                <Grid container spacing={2} container  direction="row"  justifyContent="center"  alignItems="left">
                        <Grid item xs={3}>
                            <Typography align="left" variant="display4" component="h2" >{names_[0]}</Typography>                      
                        </Grid>
                        <Grid item xs={3} align="center">
                            <Box sx={{ ...commonStyles, borderRadius: '60%',width: 30, height: 30,bgcolor: String(Message(aqi_[0])[1])}  }><Typography>{aqi_[0]}</Typography></Box>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography align="left" variant="display4" component="h2" >{risk_[0]}</Typography>   
                        </Grid>
                     </Grid>
                    <ExpandMore
                        expand={expanded3}
                        onClick={handleExpandClick_3}
                        aria-expanded={expanded}
                        aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                
                <Collapse in={expanded3} timeout="auto" unmountOnExit>
                    <CardContent>             
                        <Typography paragraph justifyContent="left" align="left">
                        {Message(aqi_[0])[0]}
                        </Typography>
                    
                    </CardContent>
                </Collapse>
        </CardContent>

        
        </Card>
        {/* ):('')}           */}
    </div>
)
}
export default HealthEffect

