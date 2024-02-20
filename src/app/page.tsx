"use client";

import Graph from "./components/Graph";
import Input from "./components/Input";
import { useState } from "react";

export default function Home() {
  const [graphData, setGraphData] = useState([100, 200]);

  const newInputHandler = (newInput: number[]) => {
    console.log(newInput);
    setGraphData(newInput);
  }

  return (
    <main className="flex h-screen bg-white">
      <div className="max-w-screen-lg w-full m-auto flex justify-around">
        <div className="w-1/2">
          <Graph data={graphData} />
        </div>
        <div className="w-1/2">
          <Input
            onNewInput = {newInputHandler} 
          />
        </div>
      </div>
    </main>
  );
}
