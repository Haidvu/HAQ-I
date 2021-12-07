import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./styles.css";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import HealthEffect from "./HealthEffect";
import StackedBarchart from "./BarChart";

const RankedPollutant = () => {
  const zipCodeInputEl = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [zipCode, setZipCode] = useState("77057");
  let API_URL = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zipCode}&distance=25&API_KEY=055CDA36-3FC4-4E95-BBBE-73C265CF3131`;

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [zipCode]);
  return (
    <Card>
      <input
        type="number"
        ref={zipCodeInputEl}
        defaultValue={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
      />
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
