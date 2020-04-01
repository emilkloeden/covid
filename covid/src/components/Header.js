import React from "react";
import Total from "./Total";
import SAMap from "./SAMap";

function Header({ loading, data }) {
  const { observations, reportedAt } = data;
  return (
    <header className="App-header">
      <h1>COVID-19 in SA</h1>
      {loading ? (
        ""
      ) : (
        <>
          <SAMap />
          <Total observations={observations} isoDateString={reportedAt} />
        </>
      )}
    </header>
  );
}

export default Header;
