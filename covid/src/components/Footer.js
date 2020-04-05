import React from "react";

function Footer() {
  return (
    <footer>
      <p>
        Source data is provided by{" "}
        <a href="https://interactive.guim.co.uk/docsdata/1q5gdePANXci8enuiS4oHUJxcxC13d6bjMRSicakychE.json">
          The Guardian
        </a>{" "}
        under a Creative Commons Attribution 3.0 Australia (CC BY 3.0 AU).
      </p>
      <p>
        Calculations such as "Growth Factor" have been applied subsequently.
        Please report any issues on{" "}
        <a href="https://github.com/emilkloeden/covid/issues">Github</a>.
      </p>
    </footer>
  );
}

export default Footer;
