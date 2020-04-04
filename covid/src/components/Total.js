import React from "react";
import { format } from "date-fns";
import { parseISODateString } from "../utils/dates";

function Total({ observations, isoDateString }) {
  const latest = observations[observations.length - 1];
  const { cumulativeCases } = latest;
  const date = parseISODateString(isoDateString);
  const d = format(date, "K bbbb EEEE LLLL do yyyy");

  return (
    <>
      <h2>{cumulativeCases}</h2>
      <small>Reported cases as at {d}</small>
    </>
  );
}

export default Total;
