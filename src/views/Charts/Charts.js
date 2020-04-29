import React from "react";
import { Line } from "react-chartjs-2";

const chartOptions = {
  responsive: true,
  tooltips: {
    mode: "index",
    intersect: false,
  },
  hover: {
    mode: "nearest",
    intersect: true,
  },
  scales: {
    xAxes: [
      {
        display: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
    ],
    yAxes: [
      {
        display: true,
        ticks: {
          beginAtZero: true,
          min: 0,
          callback: (value) => value.toLocaleString(),
        },
      },
    ],
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

const lineChart = ({ data, height, key }) => {
  let chartData = Object.assign({}, data);
  chartData.datasets = chartData.datasets.map((dataset) => {
    return {
      label: dataset.label,
      data: dataset.data,
      fill: false,
      backgroundColor: dataset.color,
      borderColor: dataset.color,
    };
  });

  return (
    <Line key={key} data={chartData} options={chartOptions} height={height} />
  );
};

export default { lineChart };
