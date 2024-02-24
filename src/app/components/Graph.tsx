"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "white",
      },
      border: {
        color: "white",
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: "white",
      },
      border: {
        color: "white",
      },
    },
  },
};

const labels = ["EV", "Petrol"];

interface Props {
  data: number[];
}

export default function Graph(graphData: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "Cost",
        data: graphData.data,
        borderRadius: 5,
        backgroundColor: ["lime", "yellow"],
        barThickness: 30,
      },
    ],
  };

  return (
    <div className="m-auto w-2/ h-full">
      <Bar options={options} data={data} />
    </div>
  );
}
