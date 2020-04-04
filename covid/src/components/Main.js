import React from "react";
import ChartRow from "./ChartRow";
import ObservationTable from "./ObservationTable";

function Main({ data }) {
  const { observations } = data;
  const observationsReversed = [...observations].reverse();
  return (
    <main>
      <ChartRow observations={observations} />
      <ObservationTable observations={observationsReversed} />
    </main>
  );
}

export default Main;
