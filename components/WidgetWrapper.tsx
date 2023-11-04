"use client";

import { useRef } from "react"
import { Menu } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function WidgetWrapper({ children, title }: any) {

  const openWidgetActions = () => {
    if (openWidgetActionsRef.current?.classList.contains("hidden"))
      openWidgetActionsRef.current?.classList.remove("hidden")
    else
      openWidgetActionsRef.current?.classList.add("hidden")
  }

  const openWidgetActionsRef = useRef<HTMLDivElement>(null)

  return (
    <div className="border-[1px] border-slate-700 rounded text-white py-5 px-5 flex flex-col h-full overflow-hidden">
      <div className="flex flex-row justify-between">
        <span className="text-l font-light underline underline-offset-4 decoration-slate-700">
          {title}
        </span>
        <div className="relative">
          <Menu>
            <Menu.Button className="rounded-full">...</Menu.Button>
            <Menu.Items className="absolute right-0 top-8 w-auto rounded-xl">
              <Menu.Item as="button" className="bg-red-600 flex flex-row items-center justify-center py-1 px-3 rounded-md">
                <TrashIcon className="h-5 w-5 mr-2" />
                <span>Delete</span>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <div className="py-5 px-5 text-l font-normal flex flex-col h-full">
        {children}
      </div>
    </div>
  )
}
