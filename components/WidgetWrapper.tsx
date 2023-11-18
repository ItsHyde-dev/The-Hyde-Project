"use client"

import * as widgetApi from "@/functions/widgets";
import { Menu, Transition } from "@headlessui/react";
import { Bars3BottomLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

export default function WidgetWrapper({ children, title, widgetId }: any) {

  const [widgetName, setWidgetName] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const renameWidget = (widgetId: any) => {
    if (widgetName != title) {
      title = widgetName
      widgetApi.renameWidget(widgetId, widgetName)
    }
  }

  return (
    <div id={widgetId} className="border-[1px] border-slate-700 rounded text-white py-5 px-5 flex flex-col h-full overflow-hidden">
      <div className="flex flex-row justify-between">
        <span className="text-l font-light flex flex-row items-center">
          <Bars3BottomLeftIcon className="h-5 w-5 mr-2 draggableHandleForGrid cursor-move" />
          <input
            className="outline-none bg-transparent underline underline-offset-4 decoration-slate-700 focus:decoration-white"
            value={widgetName}
            ref={inputRef}
            onChange={(e) => setWidgetName(e.target.value)}
            onBlur={() => renameWidget(widgetId)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                inputRef.current?.blur()
              }
            }}
          />
        </span>
        <div className="relative z-50">
          <Menu>
            <Menu.Button className="rounded-full">...</Menu.Button>

            <Transition
              enter="transition-all duration-175"
              enterFrom="opacity-0 scale-0"
              enterTo="opacity-100 scale-100"
              leave="transition-all duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-0"
            >
              <Menu.Items className="absolute right-0 top-4 w-auto rounded-xl z-50">
                <Menu.Item as="button" onClick={() => deleteWidget(widgetId)} className="bg-red-600 flex flex-row items-center justify-center py-2 px-3 rounded-md w-full">
                  <TrashIcon className="h-5 w-5 mr-2" />
                  <span>Delete</span>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="py-5 px-5 text-l font-normal flex flex-col h-full">
        {children}
      </div>
    </div>
  )
}


function deleteWidget(widgetId: any) {
  widgetApi.deleteWidget(widgetId).catch((err) => {
    console.log(err)
  })

  // Delete widget from the DOM
  document.getElementById(widgetId)?.remove()
}
