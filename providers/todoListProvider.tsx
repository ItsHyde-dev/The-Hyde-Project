"use client"

import React, { createContext, useState } from "react";

export const TodoListContext = createContext<{ data: any; setData: (a: any) => void } | undefined>(undefined);

export default function TodoListProvider({ children }: any) {

  const [data, setData] = useState({});

  return (
    <TodoListContext.Provider value={{ data, setData }}>
      {children}
    </TodoListContext.Provider>
  )
}
