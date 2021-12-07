
import React from 'react';
// import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core';

// import { makeStyles } from "@material-ui/core/styles";


import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'



import './style.css'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function StackedBarChart(aqi_data,para_name){
   
    const options_2 = {
      title: {
        text: 'Primary Pollutant'
    },
      
      chart: {type: 'bar',
      backgroundColor: 'transparent'},
      credits: {
        enabled: false},
  
      xAxis: {
        categories:para_name,
        reversed: false,
        min:0},
  
      yAxis: {
        min: 0,
        max:500,
        title: {text: 'index'}},
  
      legend: {
        enabled:false,
        reversed: true},
  
      plotOptions: {
          series: {stacking: 'normal'}},
  
      series: [
        {
          name: "Fill",
          data: [500,500,500],
          color: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1
            },
            stops: [
              [0, '#4B0522'],
              [1,'#eadf3d'],
              //[1, '#e7b12f'],
              //[1, '#BAF1B0'],
              
            ]
          },
          grouping: false,
          enableMouseTracking: false
          // enableMouseTracking: false, disable tooltip on just this data element
        },
        {
        name: 'g/Nm3',
        data: aqi_data,
        color: {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
          },
          stops: [
            //[0, '#003399'],
            [0,'#eadf3d'], //yellow
            [1,'#73ef41'],
            
            //[1, '#ff66AA']
          ]
        },
        grouping: false}]
      }
  
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
     
  const App = () => <div>
    <HighchartsReact
      highcharts={Highcharts}
      options={options_2}
           
    />
    
  </div>
  return(
    <div>
      {App()}
    </div>
  )
}
export default StackedBarChart;
