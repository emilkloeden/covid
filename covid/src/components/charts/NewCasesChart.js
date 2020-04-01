import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function NewCasesChart({ observations, width = 400, height = 300 }) {
  return (
    <div className="chart">
      <h3>New Cases</h3>
      <ResponsiveContainer height={300} width={"100%"}>
        <BarChart
          width={width}
          height={height}
          data={observations}
          margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
          syncId="dailyCharts"
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="newCases" name="New Cases" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NewCasesChart;
