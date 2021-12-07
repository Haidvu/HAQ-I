import React, { useState, useRef, useCallback } from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import { render } from "react-dom";
import {GeolocateControl} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import { useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import RoomIcon from '@mui/icons-material/Room';
import Box from '@mui/material/Box';
require('dotenv').config();

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;


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
          mapboxApiAccessToken="pk.eyJ1IjoiY29ycmlnZXV4IiwiYSI6ImNrdnZ6dHl4NTBkenAybm8xd3JvZnBtYngifQ.2NhYu29NM9-8J5adEyvuzA"
          mapStyle="mapbox://styles/corrigeux/ckvw155sf03ac14lh1u9rv6sh"
          onViewportChange={(viewport) => setViewport(viewport)}
            >

{mapdata.map((item => (
  
    <Marker
     key={item}
     latitude={item.Latitude}
     longitude={item.Longitude}
     >
       
   <IconButton onClick={(e) => {
     e.preventDefault();
     setSelectedMonitor(item);
   }}>
      {/* <img src={img} alt="Monitor Location Icon" styles="transparent"/> */}
      <RoomIcon sx={{fill: '#F50013', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} size="large"/>
   </IconButton>
   
    </Marker>
)))}


{selectedMonitor ? (
<Popup 
latitude={selectedMonitor.Latitude} 
longitude={selectedMonitor.Longitude}
offsetLeft={22}
offsetTop={10}
onClose={() => {
  setSelectedMonitor(null);
}}

>
  <div>
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




