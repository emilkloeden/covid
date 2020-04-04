import React from "react";
import GrowthFactorChart from "./charts/GrowthFactorChart";
import CumulativeCasesChart from "./charts/CumulativeCasesChart";
import NewCasesChart from "./charts/NewCasesChart";

function ChartRow({ observations }) {
  return (
    <div className="chart-container">
      <NewCasesChart observations={observations} />
      <GrowthFactorChart observations={observations} />
      <CumulativeCasesChart observations={observations} />
    </div>
  );
}

export default ChartRow;
