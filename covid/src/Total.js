import React from "react";

function Total({ observations }) {
  const latest = observations[observations.length - 1];
  const { cumulativeCases, date } = latest;
  return (
    <>
      <h4>{cumulativeCases}</h4>
      <small>Reported Cases (as at {date})</small>
    </>
  )
}

export default Total;