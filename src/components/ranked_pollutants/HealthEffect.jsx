import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import "./styles.css";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';


// messages to display to users for different AQI levels
const messages = [
    "Enjoy your outdoor activities",
    "If you are unusually sensitive to particle pollution, consider reducing your activity level or shorten the amount of time you are active outdoors.",
    "Unusually sensitive people should consider limiting prolonged outdoor exertion",
    "Active children and adults and people with respiratory disease such as asthma  should avoid prolonged outdoor exertion. Everyone else, especially children,    should limit prolonged outdoor exertion",
    "Active children and adults, and people with respiratory disease such as asthma,should avoid all outdoor exertion. Everyone else, especially children, should limit outdoor exertion.",
    "Everyone should avoid all outdoor exertion."
];



const getHealthConcernLevel = (aqiValue) => {
    const levels = [
        {
            'title': "good",
            "color": "lightgreen",
            "message": messages[0]
        },
        {
            'title': 'moderate',
            'color': 'yellow',
            "message": messages[1]
        }, {
            'title': 'unhealthy for sensitive groups',
            'color': 'orange',
            "message": messages[2]
        }, {
            'title': 'unhealthy',
            'color': 'pink',
            "message": messages[3]
        }, {
            'title': 'very unhealthy',
            'color': 'purple',
            "message": messages[4]
        }, {
            'title': 'hazardous',
            'color': 'maroon',
            "message": messages[5]
        }]

    if (aqiValue >= 0 && aqiValue <= 50) {
        return levels[0]
    }

    if (aqiValue >= 51 && aqiValue <= 100) {
        return levels[1]
    }

    if (aqiValue >= 101 && aqiValue <= 150) {
        return levels[2]
    }

    if (aqiValue >= 151 && aqiValue <= 200) {
        return levels[3]
    }

    if (aqiValue >= 201 && aqiValue <= 300) {
        return levels[4]
    }

    if (aqiValue >= 301) {
        return levels[5]
    }

    return {
        'title': 'undefined',
        'color': 'gray',
        'message': "Nothing"
    }
}

const PollutantElement = ({ title, parameterName, rating, aqi, reportingArea, description }) => {
    const [showHealthAdvice, setShowHealthAdvice] = useState(false);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    width: "320px",
                    alignItems: "center",
                    margin: "16px 0"
                }}
            >
                <strong className="w-20">{parameterName ? parameterName : "No Data"}</strong>
                <div className="w-20">
                    <span className="aqi-circle" style={{
                        backgroundColor: getHealthConcernLevel(Number(aqi)).color
                    }}>
                        {aqi ? aqi : "No AQI"}
                    </span>
                </div>

                <span className="w-30">{rating}</span>
                <span onClick={() => setShowHealthAdvice(!showHealthAdvice)}>
                    {showHealthAdvice ? <BsChevronUp /> : <BsChevronDown />}
                </span>
            </div>
            {showHealthAdvice && <div>{getHealthConcernLevel(Number(aqi)).message}</div>}
        </div>
    );
};

function HealthEffect(data,isLoading) {
    const HealthEffects = ({ data }) => {
        return (
            <div>
                <h2>Health Effect</h2>
                {data && data.map((item, index) => <PollutantElement parameterName={item.ParameterName} aqi={item.AQI} rating={item.Category.Name} key={index} />)}
            </div>
        )
    }
    return(
        <div className="w-50">
            {!data && isLoading && <span>Loading data</span>}

            {data && <HealthEffects data={data} />}
            {!data && !isLoading && <span>Failed to load data</span>}
          </div>
    )
    
}
export default HealthEffect


