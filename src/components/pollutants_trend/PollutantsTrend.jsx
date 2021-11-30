import React from 'react';
import { Line } from 'react-chartjs-2';
import { Paper } from '@mui/material';

const PollutantsTrend = (props) => {
  return (
    <Paper>
      <Line
      data = {{
        labels: props.chartLabels,
        datasets: [{
          label: 'OZONE',
          data: props.data.ozone,
          backgroundColor: 'rgba(48, 217, 135, 1)',
          borderColor: 'rgba(48, 217, 135, 1)',
          borderWidth: 2
        },
        {
          label: 'PM2.5',
          data: props.data.pm25,
          backgroundColor: 'rgba(1, 126, 250, 1)',
          borderColor: 'rgba(1, 126, 250, 1)',
          borderWidth: 2
      },
      {
        label: 'PM10',
        data: props.data.pm10,
        backgroundColor: 'rgba(253, 31, 155, 1)',
        borderColor: 'rgba(253, 31, 155, 1)',
        borderWidth: 2
      }]
      }}
      options = {{
        scales: {
          y: {
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
  );
}

export default PollutantsTrend;