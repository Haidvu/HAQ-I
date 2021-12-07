import React, { useState, useEffect, useRef } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import "./styles.css";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';


// messages to display to users for different AQI levels
const messages = [
    "Enjoy your outdoor activit",
    "If you are unusually sensitive to particle pollution, consider reducing your activity level or shorten the amount of time you are active outdoors.",
    "Unusually sensitive people should consider limiting prolonged outdoor exertion",
    "Active children and adults and people with respiratory disease such as asthma  should avoid prolonged outdoor exertion. Everyone else, especially children,    should limit prolonged outdoor exertion",
    "Active children and adults, and people with respiratory disease such as asthma,should avoid all outdoor exertion. Everyone else, especially children, should limit outdoor exertion.",
    "Everyone should avoid all outdoor exertion."
];

const getAqiLevelRatio = (aqiValue) => Math.round(aqiValue / 500 * 100, 2)

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

const ChartBar = ({ data }) => {
    console.log(data)
    return (
        <div className="flex chartbar-item">
            <span className="w-20 b">{data && data.ParameterName}</span>
            <span className="w-10">{data && data.AQI}</span>
            <div className="w-70">
                <div className="chartbar-wrapper">
                    <div className="chartbar-main" style={{
                        width: `${data && getAqiLevelRatio(data.AQI)}%`
                    }} />
                    <div className="chartbar-bg">
                        {
                            [{
                                width: 10,
                                color: 'lightgreen'
                            }, {
                                width: 10,
                                color: '#fbff17'
                            }, {
                                width: 10,
                                color: '#ff7c17'
                            }, {
                                width: 10,
                                color: 'red'
                            }, {
                                width: 20,
                                color: 'purple'
                            }, {
                                width: 40,
                                color: '#520909'
                            }].map((item, index) =>
                                <div key={index} className="chartbar-group" style={{
                                    width: `${item.width}%`,
                                    backgroundColor: item.color
                                }} />
                            )

                        }
                    </div>
                </div>
                {data && getAqiLevelRatio(data.AQI)}
            </div>
        </div>
    )
}

const Charts = ({ data }) => {
    return (
        <div className="ph3">
            <h2>Ranked by Pollutants</h2>
            <div className="ph4">
                {data && data.map((item, index) => <ChartBar data={item} key={index} />)}
            </div>
        </div>
    )
}

const HealthEffects = ({ data }) => {
    return (
        <div>
            <h2>Health Effect</h2>
            {data && data.map((item, index) => <PollutantElement parameterName={item.ParameterName} aqi={item.AQI} rating={item.Category.Name} key={index} />)}
        </div>
    )
}

const RankedPollutant = () => {
    const zipCodeInputEl = useRef(null)
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [zipCode, setZipCode] = useState("77057")
    let API_URL = `https://www.airnowapi.org/aq/observation/zipCode/current/?format=application/json&zipCode=${zipCode}&distance=25&API_KEY=055CDA36-3FC4-4E95-BBBE-73C265CF3131`;

    useEffect(() => {
        fetch(API_URL).then((res) => res.json()).then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [zipCode])
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
                    {!data && isLoading && <span>Loading data</span>}
                    {data && <Charts data={data} />}
                    {!data && !isLoading && <span>Failed to load data</span>}
                </div>
                <div className="w-50">
                    {!data && isLoading && <span>Loading data</span>}

                    {data && <HealthEffects data={data} />}
                    {!data && !isLoading && <span>Failed to load data</span>}
                </div>
            </div>



        </Card>
    )
}

export default RankedPollutant