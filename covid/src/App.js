import React from "react";
import "./App.css";
import { useFetch } from "./utils/hooks";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  const [data, loading] = useFetch("http://covid-19-in-sa.com:3001/");

  return (
    <div className="App">
      <Header loading={loading} data={data} />
      <div>{loading ? "" : <Main data={data} />}</div>
      <Footer />
    </div>
  );
}

export default App;
