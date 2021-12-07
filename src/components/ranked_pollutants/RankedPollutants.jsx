import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./styles.css";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import HealthEffect from "./HealthEffect";
import StackedBarchart from "./BarChart";

const RankedPollutant = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [zipCode, setZipCode] = useState(props.zip);

  let API_URL = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${props.zip}&distance=25&API_KEY=055CDA36-3FC4-4E95-BBBE-73C265CF3131`;

  console.log('RankedPollutant', props.zip);

  useEffect(() => {
    setZipCode(props.zip)
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
    console.log('RankedPollutant useEffect', props.zip);
  }, [props.zip]);
  return (
    <Card>
      <div className="flex">
        <div className="w-70">
          {data ? <div>{StackedBarchart(data, isLoading)}</div> : ""}
        </div>
        <div className="w-50">
          {!data && isLoading && <span>Loading data</span>}
          {data ? <div>{HealthEffect(data, isLoading)}</div> : ""}
        </div>
      </div>
    </Card>
  );
};

export default RankedPollutant;
