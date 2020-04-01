import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine
} from "recharts";

function GrowthFactorChart({ observations, width = 400, height = 300 }) {
  const formattedObservations = observations.map(({ date, growthFactor }) => {
    return {
      date,
      growthFactor:
        growthFactor == null
          ? null
          : Math.round((growthFactor + Number.EPSILON) * 100) / 100
    };
  });
  return (
    <div className="chart">
      <h3>Growth Factor</h3>
      <ResponsiveContainer height={300} width={"100%"}>
        <LineChart
          width={width}
          height={height}
          data={formattedObservations}
          margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
          syncId="dailyCharts"
        >
          <Line
            connectNulls
            name="Growth Factor"
            type="monotone"
            dataKey="growthFactor"
            stroke="#ADEFD1FF"
            strokeWidth={3}
          />
          <ReferenceLine y={1} stroke="blue" />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GrowthFactorChart;
