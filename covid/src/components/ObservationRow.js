import React from "react";

function ObservationRow({ observation }) {
  const { date, newCases, cumulativeCases } = observation;
  let { growthFactor } = observation;
  growthFactor =
    growthFactor == null
      ? "N/A"
      : Math.round((growthFactor + Number.EPSILON) * 100) / 100;

  return (
    <tr>
      <th>{date}</th>
      <td>{newCases}</td>
      <td>
        {growthFactor < 1 ? (
          <h3 style={{ color: "green" }}>{growthFactor}</h3>
        ) : (
          <h3>{growthFactor}</h3>
        )}
      </td>
      <td>{cumulativeCases}</td>
    </tr>
  );
}

export default ObservationRow;
