"use client"

import { GraphContext } from "@/providers/graphProvider"
import { Popover } from "@headlessui/react"
import { TrashIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect, useRef } from "react"

export default function Tile2() {
  return <div className="border-[1px] border-slate-700 rounded text-white py-5 px-5">
    <span className="font-light text-l underline underline-offset-4 decoration-slate-700">Todo</span>
    <div>
      <TodoList />
    </div>
  </div>
}

function TodoList() {
  return <div className="py-2">
    <TodoItem taskName="Task Name" id="1" />
    <TodoItem taskName="Task Name 2" id="2" />
    <TodoItem taskName="Task Name 3" id="3" />
  </div>
}

function TodoItem(props: any) {

  const taskName = props.taskName
  const id = props.id
  const { data, setData } = useContext(GraphContext) as any
  const popButtonRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (id in data) return;
    data[id] = false;
    setData({
      ...data,
      [id]: false
    })
  }, [data])

  const handleChange = (e: any) => {
    data[e.target.value] = e.target.checked;
    setData({
      ...data,
      [e.target.value]: e.target.checked
    })
  }

  return (
    <div className="flex flex-row align-start py-1">
      <input type="checkbox" className="mr-3 w-4 h-4 mt-1 rounded" value={id} onChange={handleChange} />
      <div className="w-full">
      <div contentEditable="true"
        suppressContentEditableWarning={true}
        onFocus={(e) => {
          popButtonRef?.current?.click()
          e.target.focus()
        }}
        className="w-full text-white bg-transparent decoration-slate-500  underline-offset-4 focus:outline-none focus:underline active:outline:none active:underline overflow-none break-words pr-8">
        {taskName}
      </div>
      <Popover className="absolute transform -translate-y-full">
        <Popover.Panel className="bg-teal-600 border-white border-[0.5px] rounded p-2 px-4">
          <span className="flex flex-row items-start align-baseline cursor-pointer">
            <TrashIcon className="h-5 w-5 mr-2" />
            Delete
          </span>
        </Popover.Panel>
        <Popover.Button ref={popButtonRef}>
        </Popover.Button>
      </Popover>
      </div>
    </div>
  )
}
