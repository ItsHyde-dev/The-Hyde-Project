import { Chart } from "chart.js/auto"
import { useEffect, useLayoutEffect, useRef } from "react"
import WidgetWrapper from "./WidgetWrapper";
import { Signal } from "@preact/signals-react";

export default function TodoListGraph({ stateSignal, widgetId }: { stateSignal: Signal<any>, widgetId: any }) {

  const chartRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    let completedTasks = 0;
    let pendingTasks = 0;

    for (let key in stateSignal.value) {
      if (stateSignal.value[key].completed) {
        completedTasks++;
      } else {
        pendingTasks++;
      }
    }

    let chart = new Chart(chartRef.current!, {
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
        },
        maintainAspectRatio: false,
        responsive: true
      }
    });

    return () => {
      chart.destroy()
    }
  }, [stateSignal.value]);

  useLayoutEffect(() => {
    let width = parentRef.current?.offsetWidth;
    let height = parentRef.current?.offsetHeight;

    chartRef.current!.height = height!;
    chartRef.current!.width = width!;

  }, [])

  return (
    <WidgetWrapper title="Graph" widgetId={widgetId}>
      <div className="flex h-full" ref={parentRef}>
        <canvas id="myChart" className="h-[300px]" ref={chartRef} />
      </div>
    </WidgetWrapper>
  )
}
