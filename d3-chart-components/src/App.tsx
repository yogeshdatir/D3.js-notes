import React, { useEffect, useState } from "react";
import "./App.css";
import BarChart from './components/d3-charts/BarChart'
import axios from "axios";

function App() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = () => {
      axios
        .get("https://memories-node-react.herokuapp.com/chartData")
        .then((res: any) => {
          setChartData(res.data.data);
          setLoading(false);
        });
    };
    getData();
  }, []);

  const changeData = () => {
    setLoading(true);
    axios
      .get("https://memories-node-react.herokuapp.com/chartData")
      .then((res: any) => {
        setChartData(res.data);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <div className="container">
        {!loading && <BarChart data={chartData} />}
      </div>
      <button onClick={changeData}>Change Data</button>
    </div>
  );
}

export default App;
