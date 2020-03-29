import React from "react";
import Observation from "./Observation"

function Main({data}) {
    const { observations, firstDayAbove100Cases } = data;
    const latest = observations[observations.length - 1];
    const observationsReversed = observations.reverse();
    return (
        <>
              
              <p>SA reached 100 cases on {firstDayAbove100Cases}</p>
              <ul>{observationsReversed.map(observation => {
                return (
                  <Observation observation={observation} key={observation.index} />
                )
              })}</ul>
        </>
    );
}

export default Main;