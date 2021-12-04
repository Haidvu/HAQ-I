import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Paper, Typography } from '@mui/material';

const RankedLocations = (props) => {
  return (
    <>
      <Paper>
        <Typography align='center'>
          Rank by Locations in Houston
        </Typography>
        <Bar
        data = {{
          labels: props.data.siteName,
          datasets: [{
            label: 'HOUSTON',
            data: props.data.aqi,
            backgroundColor: 'rgba(81, 203, 255, 1)',
            borderColor: 'rgba(81, 203, 255, 1)',
            borderWidth: 2
          },
        ]
        }}
        options = {{
          indexAxis: 'y',
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'AQI',
                color: '#000000',
                align: 'center',
                font: {
                  family: 'Calibri',
                  size: 15,
                  style: 'normal',
                  lineHeight: 1.2
                },
                padding: {top: 5, left: 0, right: 0, bottom: 0}
              }
            }
          }
        }}
        height={null}
        width={null}
        />
      </Paper>
    </>
  );
}

export default RankedLocations;