import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PollutantsTrend from './pollutants_trend/PollutantsTrend';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Box, TextField, Grid } from '@mui/material';

import RankedPollutants from './ranked_pollutants/RankedPollutants';
import RankedLocations from './ranked_locations/RankedLocations';

const apikey = '81AE9E6C-ABE1-4FE5-A11C-75ED6ACA2A07'

const InitialPollutantsTrendData = () => {
  return {
    ozone: [null,null,null,null,null,null,null], 
    pm25: [null,null,null,null,null,null,null], 
    pm10: [null,null,null,null,null,null,null]
  }
};

const InitialRankedLocationData = () => {
  return {
    siteName: [null,null,null,null,null], 
    aqi: [null,null,null,null,null], 
  }
};

const GetCalendarDate = (offset, year) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000 - (oneDay * offset));
  const day = Math.floor(diff / oneDay);
  const calDate = new Date(year, 0)
  return new Date(calDate.setDate(day))
};

const GetStartEndDate = () => {
  let dateObj = GetCalendarDate(0, new Date().getFullYear())
  const start = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate()
  dateObj = GetCalendarDate(1, new Date().getFullYear())
  const end = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate()
  return [end, start]
};

const tempPollutantsTrendData = InitialPollutantsTrendData();
const tempRankedLocationData = InitialRankedLocationData();

const GetDayOfWeekLabels = (dateObj) => {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const labels = [null,null,null,null,null,null,null]
  for (let i = 6; i > -1; i--){
    labels[i] = days[ dateObj ]
    dateObj = dateObj - 1
    if (dateObj === -1) {
      dateObj = 6
    }
  }
  return labels;
};

const Dashboard = () => {
  const [apiLimitError, setApiLimitError] = useState(false)
  const [pollutantsTrendData, setPollutantsTrendData] = useState(() => InitialPollutantsTrendData());
  const [rankedPollutantsData, setRankedPollutantsdata] = useState(() => InitialRankedLocationData());
  const chartLabels = GetDayOfWeekLabels(new Date().getDay());

  const GetRankedLocationData = async () => {
    const [startDate, endDate] = GetStartEndDate()
    await axios.get('https://www.airnowapi.org/aq/data/?startDate=' + startDate + 'T00&endDate=' + endDate + 'T00&parameters=OZONE,PM25,PM10&BBOX=-96.072388,29.091871,-94.578247,30.227919&dataType=A&format=application/json&verbose=1&monitorType=2&includerawconcentrations=0&API_KEY=' + apikey)
    .then((response) => {
      const sortedData = response.data.sort(({AQI:x},{AQI:y}) => y - x)
      let whileCount = 1
      let locationCount = 1
      tempRankedLocationData.siteName[0] = sortedData[0].SiteName
      tempRankedLocationData.aqi[0] = sortedData[0].AQI
      // Get unique site names for tempRankedLocationData
      while (locationCount < 5 && whileCount < response.data.length){
        if (!tempRankedLocationData.siteName.includes(sortedData[whileCount].SiteName)) {
          tempRankedLocationData.siteName[locationCount] = sortedData[whileCount].SiteName
          tempRankedLocationData.aqi[locationCount] = sortedData[whileCount].AQI
          locationCount += 1
        }
        whileCount += 1
      }
      setRankedPollutantsdata(tempRankedLocationData);
    })
    .catch((error) => {
      if (error.response.status === 429){
        setApiLimitError(true)
      }
    })
  };

  const GetPollutansTrendData = (myZip) => {
    // Set initial day of year and current year
    let dateObj = GetCalendarDate(0, new Date().getFullYear())
    let calendarDate = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate()
    console.log('CURRENT DATE', calendarDate)
    for (let i = 6; i > -1; i--) { // For the past 7 days
      axios.get('https://www.airnowapi.org/aq/observation/zipCode/historical/?format=application/json&zipCode=' + myZip + '&date=' + calendarDate + 'T00-0000&distance=25&API_KEY=' + apikey)
      .then((response) => {
        response.data.forEach(data => 
          data.ParameterName === 'OZONE' ? tempPollutantsTrendData.ozone[i] = data.AQI :
          data.ParameterName === 'PM2.5' ? tempPollutantsTrendData.pm25[i] = data.AQI :
          data.ParameterName === 'PM10' ? tempPollutantsTrendData.pm10[i] = data.AQI :
          null
        )
      })
      dateObj = GetCalendarDate(7 - i, dateObj.getFullYear())
      calendarDate = dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate()
    }
    console.log('tempPollutantsTrendData', tempPollutantsTrendData.ozone)
  };

  const CheckState = () => {
    setPollutantsTrendData(InitialPollutantsTrendData());
  };

  const CheckLength = (text) => {
    if (text.length === 5) {
      return true
    }
  };

  useEffect(() => {
    setPollutantsTrendData(tempPollutantsTrendData);
    GetRankedLocationData();
  },[pollutantsTrendData]);

  const RenderDashboard = () => {
    if (apiLimitError){
    return ( 
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh', width: '100%'}}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
            <strong>Reached request limit of AirNow API. Please come back in one hour.</strong>
        </Alert>
      </div>
    )}
    return (
      <Grid container>
        <Grid container item justifyContent='center' xs={12} md={12} lg={12}>
          <Grid item xs='auto' md='auto' lg='auto'>
            <TextField 
              label="ZIPCODE" 
              variant="standard" 
              InputLabelProps={{ shrink: false, }} 
              inputProps={{ maxLength: 5, style: { textAlign: 'center', marginLeft: '50px', color: '#1976d2' } }}
              onKeyUp={(e) => e.key === 'Enter' ? CheckState() : CheckLength(e.target.value) ? GetPollutansTrendData(e.target.value) : null} />
              {/* <Button variant="contained" sx={{ ml: '5px', mt: '12px' }} onClick={() => CheckState()}>Search</Button> */}
          </Grid>
        </Grid>
        <Grid container item xs={12} md={12} lg={12}>
          <Grid item xs={12} md={12} lg={12}>
            <Box sx={{ width: '99%', height: '25%', margin: '8px'}}>
              <PollutantsTrend data={pollutantsTrendData} chartLabels={chartLabels}/>
            </Box>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Box sx={{ width: '98%', height: '25%', margin: '8px'}}>
              <RankedPollutants data={null}/>
            </Box>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Box sx={{ width: '98%', height: '25%', margin: '8px'}}>
              <RankedLocations data={rankedPollutantsData}/>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <>
    {(
      RenderDashboard()
    )}
    </>
  );
}

export default Dashboard;