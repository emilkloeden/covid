import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function CumulativeCasesChart({ observations, width = 400, height = 300 }) {
  return (
    <div className="chart">
      <h3>Cumulative Cases</h3>
      <ResponsiveContainer height={300} width={"100%"}>
        <LineChart
          width={width}
          height={height}
          data={observations}
          margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
          syncId="dailyCharts"
        >
          <Line
            name="Cumulative Cases"
            type="monotone"
            dataKey="cumulativeCases"
            stroke="#00203FFF"
            strokeWidth={3}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CumulativeCasesChart;
