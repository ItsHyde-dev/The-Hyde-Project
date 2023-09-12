"use client"

import { Chart } from "chart.js/auto"
import { useEffect } from "react"

export default function Tile1() {

  useEffect(() => {
    // init the chart
    let ctx = document.getElementById("myChart") as HTMLCanvasElement

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: "orangeRed",
            borderColor: "orangeRed"
          },
          {
            label: '# of Other things',
            data: [18, 19, 8, 5, 10, 3],
            backgroundColor: "cyan",
            borderColor: "cyan"
          }
        ]
      }
    });
  });

  return <div className="border-[1px] border-slate-700 rounded text-white py-5 px-5">
    <div className="flex flex-row justify-between">
      <span className="text-l font-light">
        Some Graph 1
      </span>
      <div>...</div>
    </div>
    <div className="py-5 px-5 text-xl font-normal">
      <div>
        <canvas id="myChart" />
      </div>
    </div>
  </div>
}
