import React, { Component }  from 'react';
import img1 from './refinery.jpeg';
import img2 from './ozone.jpg';
import img3 from './ozonehealthchest.jpg';
import './Pollutants.css';

const content = <html>
<head>
<link rel="stylesheet" href="Pollutants.css"/>
</head>
<body>
</body>
</html>

export default function Pollutants(){
  return (
    <div>
    <div class="row">
    <div class="leftcolumn">
      <div class="card">
        <h1>Pollutants</h1>
        <p>Particulate Matter (PM)</p>
        <p>Mixture of solid particles and liquid droplets found in the air we breathe. They can contain chemicals such as sulfur dioxide and nitrogen oxides. </p>
        <p>Three important particulate matter we monitor are PM 10, PM 2.5, and Ozone. </p>
        <img src={img1} alt="Pic"/>
      </div>
      <div class="card">
        <h2>PM 10</h2>
        <p>Inhalable particulate matter, with sizes ranging from 10 microns and less in diameter. </p>
        <p>Examples: Dust, dirt, soot, smoke </p>
        <p>PM 10 can come from construction sites, landfills, agriculture, wildfires, industrial sites, and pollen.</p>
      </div>
      <div class="card">
        <h2>PM 2.5</h2>
        <p>Finer inhalable particulate matter, with sizes ranging 2.5 microns and less. It is the main component that causes "haze" people often see in urban areas.</p>
        <p>Sources include the combustion of gasoline, oil, diesel, coal, and wood.</p>
        <p>PM 2.5 is more dangerous than PM 10 because it is small enough to bypass many of the human body's defense systems against foreign material. This includes nose hairs and mucus. </p>
        <p>There are about 25,000 microns in an inch. The largest 2.5 micron particulate can be 30 times smaller than a strand of human hair. </p>
      </div>
      <div class="card">
        <h3>Particulate Matter Health Risks</h3>
        <p>• Premature death in people with heart or lung disease</p>
        <p>• Non-fatal heart attacks</p>
        <p>• Irregular heartbeat</p>
        <p>• Aggravated asthma</p>
        <p>• Irritation of the lung airways, coughing or difficulty breathing.</p>
      </div>
      <div class="card">
        <h2>Ozone</h2>
        <p>Ozone is a gas composed of three oxygen atoms. Ozone occurs both in the Earth's upper atmosphere and at ground-level. Ozone can be good or bad depending on where it is in the atmosphere.
  Good ozone occurs naturally in the upper atmosphere (stratospheric ozone), where it forms a protective layer that shields the planet from the sun's harmful ultraviolet (UV) rays. 
  Ozone at ground-level is a harmful air pollutant that is the main component that create "smog". 
    <p>Ground-level Ozone is created by chemical reactions between oxides of nitrogen (NOx) and volatile organic compounds (VOC). This happens when pollutants emitted by cars, power plants, refineries, chemical plants, and other sources chemically react in the presence of sunlight.</p>
  Ozone at the ground-level can reach it's most unhealthy levels on hot sunny days in urban environments, but can still reach high levels during colder months. 
  These pollutants can also travel long distances by wind, so urban areas are not the only areas with high risk. 
    </p>
    <h3> Who is at risk?</h3>
    <p>People most at risk from breathing air containing ozone include people with asthma, children, older adults, and people who are active outdoors. In addition, people with certain genetic characteristics, and people with reduced intake of certain nutrients, such as vitamins C and E, are at greater risk from ozone exposure. 
  Children have the greatest risk from exposure to ozone because their lungs are still developing. Children are also more likely than adults to have asthma.</p>
    <img src={img2} alt="Pic"/>
    <img src={img3} alt="Pic"/>
    </div>
  </div>

</div>
</div>
)}




