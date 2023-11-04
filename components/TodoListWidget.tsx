import GenerateTodoList from "@/functions/generateTodoList"
import { Disclosure } from "@headlessui/react"
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, FocusEvent, ReactNode } from "react"
import WidgetWrapper from "./WidgetWrapper"
import GhostInput from "./GhostInput"
import TodoListFunctions from "@/functions/todolist"
import { Signal } from "@preact/signals-react"

export default function TodoListWidget({ stateSignal }: { stateSignal: Signal<any> }): ReactNode {

  useEffect(() => {
    GenerateTodoList().then((res: any) => {
      stateSignal.value = res
    })
  }, [])

  const functions = new TodoListFunctions(stateSignal)

  return (
    <WidgetWrapper title="Todo List">
      <GhostInput placeholder="+ Add a new task" action={functions.addTask} />
      <div className="overflow-scroll">
        {
          stateSignal.value && Object.keys(stateSignal.value).length > 0 ?
            functions.getRootTasks(stateSignal.value)
              .map(
                (taskId: string) =>
                  <TodoItem
                    key={taskId}
                    taskName={stateSignal.value[taskId].name}
                    id={taskId}
                    children={stateSignal.value[taskId].children}
                    functions={functions}
                    stateSignal={stateSignal}
                  />
              )
            : <p>Loading...</p>
        }
      </div>
    </WidgetWrapper>
  )
}

export function TodoItem({ taskName, id, functions, stateSignal }: any) {

  if (!taskName || !id) return

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
        <input type="checkbox" checked={stateSignal.value[id].completed} name="taskCheckbox"
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
              stateSignal.value[id].children.map((id: any) =>
                <TodoItem
                  key={id}
                  taskName={stateSignal.value[id].name}
                  id={id}
                  children={stateSignal.value[id].children}
                  functions={functions}
                  stateSignal={stateSignal}
                />)
            }
          </Disclosure.Panel>
        </Disclosure>
      }
    </div>
  )
}

