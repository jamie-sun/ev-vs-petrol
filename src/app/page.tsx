"use client";

import Graph from "./components/Graph";
import Input from "./components/Input";
import { useState } from "react";

interface GraphData {
  array: number[];
}

export default function Home() {
  const [graphData, setGraphData] = useState<GraphData["array"]>([0, 0]);
  const [savings, setSavings] = useState<string>("0");

  const newInputHandler = (newInput: GraphData["array"]) => {
    setGraphData(newInput);
    calculateSavings(newInput);
  };

  const calculateSavings = (savingsData: GraphData["array"]) => {
    const unformattedSavings = savingsData[1] - savingsData[0];
    setSavings(formatCosts(unformattedSavings));
  };

  const formatCosts = (cost: number) => {
    return cost.toLocaleString();
  };

  return (
    <main className="flex h-screen text-white p-4 md:p-6">
      <div className="card-wrapper max-w-screen-lg w-full m-auto flex justify-around flex-wrap bg-[#212B36] p-5 pt-0 md:p-10 rounded-xl">
        <div className="title w-full">
          <h1 className="text-2xl md:text-4xl">EV vs Petrol Costs</h1>
        </div>
        <div className="graph-wrapper w-full md:w-1/2 min-h-72">
          <Graph data={graphData} />
        </div>
        <div className="w-full md:w-1/2 mt-5 md:mt-0">
          <Input onNewInput={newInputHandler} />
        </div>
        <div className="w-full text-center">
          <div className="costs mt-4 md:mt-7">
            <h4>Est. annual running costs</h4>
            <p className="text-lime-400">EV: ${formatCosts(graphData[0])}</p>
            <p className="text-yellow-400">
              Petrol: ${formatCosts(graphData[1])}
            </p>
            <p className="text-sm savings">Est. EV savings: ${savings}</p>
          </div>
          <p className="ev-message">
            EV Costs includes NZ Road User Charges (RUC) at $76 per 1000km
          </p>
        </div>
      </div>
    </main>
  );
}
