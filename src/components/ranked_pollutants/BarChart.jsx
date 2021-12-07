import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./styles.css";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

const getAqiLevelRatio = (aqiValue) => Math.round((aqiValue / 500) * 100, 2);
const ChartBar = ({ data }) => {
  console.log(data);
  return (
    <div className="flex chartbar-item">
      <span className="w-20 b">{data && data.ParameterName}</span>
      <span className="w-10">{data && data.AQI}</span>
      <div className="w-70">
        <div className="chartbar-wrapper">
          <div
            className="chartbar-main"
            style={{
              width: `${data && getAqiLevelRatio(data.AQI)}%`,
            }}
          />
          <div className="chartbar-bg">
            {[
              {
                width: 10,
                color: "lightgreen",
              },
              {
                width: 10,
                color: "#fbff17",
              },
              {
                width: 10,
                color: "#ff7c17",
              },
              {
                width: 10,
                color: "red",
              },
              {
                width: 20,
                color: "purple",
              },
              {
                width: 40,
                color: "#520909",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="chartbar-group"
                style={{
                  width: `${item.width}%`,
                  backgroundColor: item.color,
                }}
              />
            ))}
          </div>
        </div>
        {data && getAqiLevelRatio(data.AQI)}
      </div>
    </div>
  );
};

const Charts = ({ data }) => {
  return (
    <div className="ph3">
      <h2>Ranked by Pollutants</h2>
      <div className="ph4">
        {data &&
          data.map((item, index) => <ChartBar data={item} key={index} />)}
      </div>
    </div>
  );
};

function StackedBarchart(data, isLoading) {
  return (
    <div>
      {!data && isLoading && <span>Loading data</span>}
      {data && <Charts data={data} />}
      {!data && !isLoading && <span>Failed to load data</span>}
    </div>
  );
}
export default StackedBarchart;
