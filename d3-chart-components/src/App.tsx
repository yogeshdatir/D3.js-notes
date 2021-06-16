import React, { useEffect, useState } from "react";
import "./App.css";
import BarChart from './components/d3-charts/BarChart'
import axios from "axios";

function App() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = () => {
      axios.get("https://swapi.dev/api/people/?page=1").then((res: any) => {
        setChartData(res.data);
        setLoading(false);
      });
    };
    getData();
  }, []);

  const changeData = () => {
    setLoading(true);
    axios.get("https://swapi.dev/api/people/?page=2").then((res: any) => {
      console.log(res);
      setChartData(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="App">
      {!loading && <BarChart data={chartData} />}
      <button onClick={changeData}>Change Data</button>
    </div>
  );
}

export default App;
