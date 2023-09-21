"use client"

import GenerateTodoList from "@/functions/generateTodoList"
import { checkElement, uncheckElement } from "@/functions/graphFunctions"
import { GraphContext } from "@/providers/graphProvider"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect, useRef, useState } from "react"

export default function TodoListWidget() {

  let [todoList, setTodoList] = useState(<p>Loading...</p>)
  const { setData } = useContext(GraphContext) as any

  useEffect(() => {
    GenerateTodoList().then((res: any) => {
      setTodoList(res.tasks);
      setData(res.taskList);
    })
  }, [])

  return <div className="border-[1px] border-slate-700 rounded text-white py-5 px-5">
    <span className="font-light text-l underline underline-offset-4 decoration-slate-700">Todo</span>
    <div>
      {todoList}
    </div>
  </div>
}

export function TodoItem(props: any) {


  const { taskName, children, id } = props
  if (!taskName || !id) return

  const { data, setData } = useContext(GraphContext) as any
  const taskActionsRef = useRef<HTMLDivElement>(null)
  const openChildrenButtonRef = useRef<HTMLButtonElement>(null)

  const handleChange = (e: any) => {
    let updatedField = data[e.target.value];
    updatedField.completed = e.target.checked
    let graph = (e.target.checked)? checkElement(data, e.target.value) : uncheckElement(data, e.target.value);
    setData({
      ...graph,
      [e.target.value]: updatedField
    })
  }

  const expandChildren = () => {
    openChildrenButtonRef.current?.click()
  }

  let wrapperClass = "flex flex-col"
  if (children.length == 0)
    wrapperClass += " ml-5"

  return (
    <div className={wrapperClass}>
      <div className="flex flex-row items-start justify-center py-1 h-min relative">
        {
          children.length > 0 &&
          <div onClick={expandChildren} className="cursor-pointer mt-1">
            <ChevronDownIcon className="w-3 h-3 mr-2" />
          </div>
        }
        <input type="checkbox" checked={data[id].completed} name="taskCheckbox" className="mr-3 w-4 h-4 mt-1 rounded" value={id} onChange={handleChange} />
        <div className="flex w-full">
          <div contentEditable="true"
            suppressContentEditableWarning={true}
            onFocus={() => {
              taskActionsRef?.current?.classList.remove("hidden")
            }}
            onBlur={() => {
              taskActionsRef?.current?.classList.add("hidden")
            }}
            className="w-full text-white bg-transparent decoration-slate-500  underline-offset-4 focus:outline-none focus:underline active:outline:none active:underline overflow-none break-words pr-8">
            {taskName}
          </div>
          <div ref={taskActionsRef} className="absolute top-[-110%] left-0 hidden bg-red-600 rounded p-2">
            <button className="flex flex-row">
              <TrashIcon className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>
      </div>
      {
        children.length > 0 &&
        <Disclosure>
          <Disclosure.Button ref={openChildrenButtonRef} />
          <Disclosure.Panel className="ml-5">
            {
              children.map((id: any) => <TodoItem key={id} taskName={data[id].name} id={id} children={data[id].children} />)
            }
          </Disclosure.Panel>
        </Disclosure>
      }
    </div>
  )
}
