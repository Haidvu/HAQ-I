import React, { useState, useRef, useCallback } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import img from "./aqi_logo.jpg"
import { Component } from "react";
import { render } from "react-dom";
import {GeolocateControl} from "react-map-gl";

import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from 'axios';
import Button from '@mui/material/Button';
import { useEffect } from "react";
require('dotenv').config();

// first hardcode an array. Then take all longitude/latitude, AQI, Parameter data from API call. Load data into array. 
// Once loaded, use map function to map through the array and create the marker component.

// import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core';


const geolocateControlStyle= {
  right: 10,
  top: 10
};


const Map = () => {
   
  const [viewport, setViewport] = useState({
    latitude: 29.749907,
    longitude: -95.358421,
    width: "100vw",
    height: "100vh",
    zoom: 8.5,
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

    const [mapdata, setMapdata] = useState([]);
    const [selectedMonitor, setSelectedMonitor] = useState(null);
    const GetMapData = async () =>{
      try{
        const dataAPI = await axios.get("https://www.airnowapi.org/aq/data/?startDate=2021-11-23T20&endDate=2021-11-23T21&parameters=OZONE,PM25,PM10&BBOX=-95.945435,29.260701,-94.341431,30.195642&dataType=B&format=application/json&verbose=0&monitorType=2&includerawconcentrations=1&API_KEY=055CDA36-3FC4-4E95-BBBE-73C265CF3131")
        console.log(dataAPI.data);
        setMapdata(dataAPI.data);
      }
      catch(e){
        console.log(e)
      }
    }

    useEffect(()=>{
      GetMapData()
    },[])

   
  return (

      <div>

      <ReactMapGL 
         {...viewport} 
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/corrigeux/ckvw155sf03ac14lh1u9rv6sh"
          onViewportChange={(viewport) => setViewport(viewport)}
            >

{mapdata.map((item => (
  
    <Marker
     key={item}
     latitude={item.Latitude}
     longitude={item.Longitude}
     >
       
   <button onClick={(e) => {
     e.preventDefault();
     setSelectedMonitor(item);
   }}>
      <img src={img} alt="Monitor Location Icon" styles="transparent"/>
      
   </button>
   
    </Marker>
)))}


{selectedMonitor ? (
<Popup 
latitude={selectedMonitor.Latitude} 
longitude={selectedMonitor.Longitude}
onClose={() => {
  setSelectedMonitor(null);
}}

>
  <div>
  
    <h2 className="body">Monitor Information</h2>
    <p><strong>AQI:</strong> {selectedMonitor.AQI}</p>
    <p><strong>Parameter:</strong> {selectedMonitor.Parameter}</p>
    <p><strong>Raw Concentration:</strong> {selectedMonitor.RawConcentration}</p>
    <p><strong>Value:</strong> {selectedMonitor.Value}</p>
    <p><strong>UTC:</strong> {selectedMonitor.UTC}</p>
  </div>
</Popup>
) : null}

{/* <Geocoder 
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          //position="top-left"
          //style={geostyle}
          style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
        />
      */}
  
<GeolocateControl
              style={geolocateControlStyle}
              positionOptions={{enableHighAccuracy: true}}
              fitBoundsOptions ={{maxZoom: 9}}
              trackUserLocation={true}
              auto
            />

                    
            {/* <img src={img} alt="Monitor Location Icon"/> */}
          </ReactMapGL>
         
      </div>

      ) // connected to your return
  } // connected to const Map
  render(<Map />, document.getElementById("root"));
  
export default Map;




