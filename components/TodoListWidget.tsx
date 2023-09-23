"use client"

import GenerateTodoList from "@/functions/generateTodoList"
import { GraphContext } from "@/providers/graphProvider"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect, useRef, FocusEvent } from "react"
import WidgetWrapper from "./WidgetWrapper"
import GhostInput from "./GhostInput"
import TodoListFunctions from "@/functions/todolist"

let functions: TodoListFunctions;

export default function TodoListWidget() {

  const { data, setData } = useContext(GraphContext) as any
  functions = new TodoListFunctions(data, setData)

  useEffect(() => {
    GenerateTodoList().then((res: any) => {
      setData(res);
    })
  }, [])

  return (
    <WidgetWrapper title="Todo List">
      <GhostInput placeholder="+ Add a new task" action={functions.addTask} />
      <div>
        {
          data && Object.keys(data).length > 0 ?
            functions.getRootTasks(data)
              .map(
                (taskId: string) =>
                  <TodoItem key={taskId} taskName={data[taskId].name} id={taskId} children={data[taskId].children} />
              )
            : <p>Loading...</p>
        }
      </div>
    </WidgetWrapper>
  )
}

export function TodoItem(props: any) {

  const { taskName, id } = props
  if (!taskName || !id) return

  const { data } = useContext(GraphContext) as any
  const taskActionsRef = useRef<HTMLDivElement>(null)
  const taskRef = useRef<HTMLDivElement>(null)
  const openChildrenButtonRef = useRef<HTMLButtonElement>(null)

  const expandChildren = () => {
    openChildrenButtonRef.current?.click()
  }

  let isHoveringTaskActions = false;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-start justify-center py-1 h-min relative">
        <div onClick={expandChildren} className="cursor-pointer mt-1">
          <ChevronDownIcon className="w-3 h-3 mr-2" />
        </div>
        <input type="checkbox" checked={data[id].completed} name="taskCheckbox"
          className="mr-3 w-4 h-4 mt-1 rounded"
          value={id} onChange={functions.handleTaskChecked} />
        <div className="flex w-full">
          <div contentEditable="true"
            ref={taskRef}
            suppressContentEditableWarning={true}
            onFocus={() => { taskActionsRef?.current?.classList.remove("hidden") }}
            onBlur={() => {
              if (!isHoveringTaskActions)
                taskActionsRef?.current?.classList.add("hidden")
            }}
            className="w-full text-white bg-transparent decoration-slate-500  underline-offset-4 focus:outline-none focus:underline active:outline:none active:underline overflow-none break-words pr-8">
            {taskName}
          </div>
          <div ref={taskActionsRef}
            onMouseEnter={() => { isHoveringTaskActions = true }}
            onMouseLeave={() => {
              isHoveringTaskActions = false
              if (!taskRef.current?.contains(document.activeElement)) {
                taskActionsRef?.current?.classList.add("hidden")
              }
            }}
            className="absolute top-[-110%] left-0 hidden bg-red-600 rounded p-2">
            <button className="flex flex-row" onClick={() => functions.deleteTask(id)}>
              <TrashIcon className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>
      </div>
      {
        <Disclosure>
          <Disclosure.Button ref={openChildrenButtonRef} />
          <Disclosure.Panel className="ml-5">
            <GhostInput placeholder="+ Add a new task" action={(e: FocusEvent<HTMLInputElement>) => functions.addChildTask(e, id)} />
            {
              data[id].children.map((id: any) => <TodoItem key={id} taskName={data[id].name} id={id} children={data[id].children} />)
            }
          </Disclosure.Panel>
        </Disclosure>
      }
    </div>
  )
}
