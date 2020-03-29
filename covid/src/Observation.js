import React from "react";

const smallStyle = {
    color: 'grey',
    fontSize: '0.8em'
}

function Observation({ observation }) {
    console.log(observation);
    const {date, newCases, cumulativeCases} = observation;
    let {growthFactor} = observation;
    growthFactor = growthFactor == null ? "N/A" : Math.round((growthFactor + Number.EPSILON) * 100) / 100;
    return (<div>
        <h3>{date}</h3>
        <h4>{newCases}</h4>
        <p style={smallStyle}>Reported Cases</p>
        <h4>{growthFactor}</h4>
        <p style={smallStyle}>Growth Factor</p>
    <h4>Total Cases to Date: {cumulativeCases}</h4>
    </div>);
}

export default Observation;