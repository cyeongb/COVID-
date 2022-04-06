import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

//Line chart 숫자의 point를 다룰 때 필요한 config 데이터들 임
// numeral 패키지 사용
// 날짜 형식 포맷

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tootipItem, data) {
        return numeral(tootipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    //x , y 좌표 형식 format하기
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph() {
  // x축이 날짜 , y축이 case number
  const [data, setData] = useState({});

  // casesType : data.cases 객체만 들고온다.
  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((res) => res.json())
      .then((data) => {
        console.log("data > ", data);
        const chartData = buildChartData(data, "cases");
        console.log("chartData >> ", chartData);
        setData(chartData);
      });
  }, []);

  return (
    <div>
      <h1>GRAPH</h1>
      <Line
        data={{
          datasets: [
            {
              data: data,
              backgroundColor: "rgba(204,16,52,0.3)",
              borderColor: "#cc1034",
            },
          ],
        }}
        options={options}
      />
    </div>
  );
}

export default LineGraph;
