import React from 'react';
import './App.css';
import { useFetch } from "./hooks";
import Main from "./Main"
import Total from "./Total"


function App() {
  const [data, loading] = useFetch(
    "http://localhost:3001/"
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>COVID-19 in SA</h1>
        {loading ? "" : (<Total observations={data.observations} />)}
        
      </header>
      <main>
        {loading ? (
          "Loading..."
        ) : (
            <Main data={data} />)}
      </main>
      <footer>
        Source data is provided by <a href="https://interactive.guim.co.uk/docsdata/1q5gdePANXci8enuiS4oHUJxcxC13d6bjMRSicakychE.json">The Guardian</a> under a Creative Commons Attribution 3.0 Australia (CC BY 3.0 AU). Calculations performed on that source data are my own and highly unlikely to be accurate.
      </footer>
    </div>
  );
}

export default App;
