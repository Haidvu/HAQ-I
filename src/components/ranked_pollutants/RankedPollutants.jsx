
import React, { useState } from 'react';
// import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core';

import { makeStyles } from "@material-ui/core/styles";
import { blue, orange} from '@material-ui/core/colors';
// import { render } from 'react-dom'
// import Highcharts from 'highcharts'
// import HighchartsReact from 'highcharts-react-official'

// import { TrendingUpRounded } from '@material-ui/icons';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StackedBarChart from "./StackedBar"
import HealthEffect from './HealthEffect';

import axios from 'axios'


function RankedPollutant(){
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))

console.log("render")  
  var dataz
  const [pollutants,setPollutants]=useState([])
  const innitialPollutants=[0,0,0]
  const innitialPara=['a','a','a']
  let [aqi_data,setAQI]=useState(innitialPollutants)
  let [para_name,setPara]=useState(innitialPara)
  let [risk_rating,setRating]=useState(["null",'null',"null"])
  const GetRankedPollutantsData = () => {
    axios.get("https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=20002&distance=25&API_KEY=055CDA36-3FC4-4E95-BBBE-73C265CF3131")
    .then(res => {
      console.log('airdata',res.data)
      setPollutants(res.data);

      var AQIs=[res.data[2].AQI,res.data[1].AQI,res.data[0].AQI]
      var names=[res.data[2].ParameterName,res.data[1].ParameterName,res.data[0].ParameterName]
      var risks=[res.data[2].Category.Name,res.data[1].Category.Name,res.data[0].Category.Name]
      setAQI(AQIs);
      setPara(names);
      setRating(risks);
    })
  }
  
  

  
  return(
    
      <div>
     
      <div>
      
        
      <Box sx={{ flexGrow: 1 }}>
       
        <Grid container spacing={2}>

          <Grid item xs={6}>
            <Item>
              {StackedBarChart(aqi_data,para_name)}
             aqi: {aqi_data}
             para: {para_name}
             risk: {risk_rating}
              {(typeof pollutants.data!="undefined")?(
                <div>
                  {GetRankedPollutantsData}
                  aqi:{aqi_data}
            {StackedBarChart()}
                </div>):("")}          
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item>
              {HealthEffect(para_name,aqi_data,risk_rating)}
              {/* <HealthEffect></HealthEffect> */}
            </Item>
          </Grid>
          
        </Grid>
        
    </Box>

      </div>
      <button variant="contained" onClick={() => GetRankedPollutantsData()}>Refresh</button>
      
      <div>
        {/* {
          pollutants.length > 0 &&
          pollutants.map(p => 
            <>
            <span>Latitude: {p.Latitude}<br/></span>
            <span>AQI: {p.AQI}<br/></span>
            </>
          )
          
        }
       */}
      
        
      </div>
    </div>
  )
  }
export default RankedPollutant;


