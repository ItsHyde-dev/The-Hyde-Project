"use client";
import { useEffect, useState } from "react";
import WidgetWrapper from "./WidgetWrapper";

export default function ClockWidget({ widgetId }: any) {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <WidgetWrapper title="Clock" widgetId={widgetId}>
      <div className="text-2xl font-semibold py-5">{time}</div>
    </WidgetWrapper>
  );
}
