"use client"

import { GraphContext } from "@/providers/graphProvider";
import { Chart } from "chart.js/auto"
import { useContext, useEffect } from "react"

export default function Tile1() {

  const { data } = useContext(GraphContext) as any;

  useEffect(() => {

    let ctx = document.getElementById("myChart") as HTMLCanvasElement

    let completedTasks = 0;
    let pendingTasks = 0;

    for (let key in data) {
      if (data[key]) {
        completedTasks++;
      } else {
        pendingTasks++;
      }
    }

    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Done", "Remaining"],
        datasets: [
          {
            data: [completedTasks, pendingTasks],
            backgroundColor: ["limeGreen", "cyan"],
            borderColor: ["limeGreen", "cyan"],
          },
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              precision: 0
            }
          }
        }
      }
    });

    return () => {
      chart.destroy()
    }
  }, [data]);

  return <div className="border-[1px] border-slate-700 rounded text-white py-5 px-5">
    <div className="flex flex-row justify-between">
      <span className="text-l font-light underline underline-offset-4 decoration-slate-700">
        Graph
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
