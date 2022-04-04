import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function LineGraph() {
  // x축이 날짜 , y축이 case number
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((res) => res.json())
      .then((data) => {
        console.log("data > ", data);
      });
  }, []);

  return (
    <div>
      <h1>GRAPH</h1>
      {/* <Line data="" options="" /> */}
    </div>
  );
}

export default LineGraph;
