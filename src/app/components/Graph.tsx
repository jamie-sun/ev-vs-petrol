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
    },
    y: {
      grid: {
        display: false,
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
        label: "Dataset 1",
        data: graphData.data,
        borderRadius: 5,
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)"],
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
