"use client"

import React, { createContext, useState } from "react";

export const GraphContext = createContext<{ data: any; setData: (a: any) => void } | undefined>(undefined);

export default function GraphProvider({ children }: any) {

  const [data, setData] = useState({});

  return (
    <GraphContext.Provider value={{ data, setData }}>
      {children}
    </GraphContext.Provider>
  )
}
