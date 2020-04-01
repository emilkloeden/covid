import React from "react";
import ObservationRow from "./ObservationRow";

function ObservationTable({ observations }) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>
            <h3>New Cases</h3>
          </th>
          <th>
            <h3>Growth Factor</h3>
          </th>
          <th>
            <h3>Cumulative Cases</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {observations.map(observation => {
          return (
            <ObservationRow observation={observation} key={observation.index} />
          );
        })}
      </tbody>
    </table>
  );
}

export default ObservationTable;
