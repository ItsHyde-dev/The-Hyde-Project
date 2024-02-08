import { Disclosure, Transition } from "@headlessui/react"
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, FocusEvent, ReactNode, useState } from "react"
import WidgetWrapper from "./WidgetWrapper"
import GhostInput from "./GhostInput"
import TodoListFunctions from "@/functions/todolist"
import { Signal } from "@preact/signals-react"
import '../app/dashboard/style.css'

export default function TodoListWidget({ stateSignal, widgetId, widgetData, rerender, widgetName }: { stateSignal: Signal<any>, widgetId: string, widgetData: String, rerender: Signal<boolean>, widgetName: String }): ReactNode {

  useEffect(() => {
    if (!rerender.value) return
    if (widgetData) stateSignal.value = JSON.parse(widgetData.toString());
    rerender.value = false
  }, [rerender.value])


  const functions = new TodoListFunctions(stateSignal, widgetId)

  return (
    <WidgetWrapper title={widgetName} widgetId={widgetId}>
      <div className="no-scrollbar-firefox overflow-scroll">
        <GhostInput placeholder="+ Add a new task" action={functions.addTask} makeSticky={true} />
        {
          stateSignal.value && Object.keys(stateSignal.value).length > 0 ?
            functions.getRootTasks(stateSignal.value)
              .map(
                (taskId: string) =>
                  <TodoItem
                    key={taskId}
                    taskName={stateSignal.value[taskId].name}
                    id={taskId}
                    functions={functions}
                    stateSignal={stateSignal}
                  >
                    {
                      ...stateSignal.value[taskId].children
                    }
                  </TodoItem>

              )
            : <p className="text-center italic text-gray-500 my-2">No tasks yet</p>
        }
      </div>
    </WidgetWrapper>
  )
}

export function TodoItem({ taskName, id, functions, stateSignal }: any) {


  const [isShowing, setIsShowing] = useState(false)
  const taskRef = useRef<HTMLDivElement>(null)
  const openChildrenButtonRef = useRef<HTMLButtonElement>(null)

  if (!taskName || !id) return

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
            onFocus={() => {
              setIsShowing(true)
            }}
            onBlur={() => {
              if (!isHoveringTaskActions)
                setIsShowing(false)
            }}
            className="w-full text-white bg-transparent decoration-slate-500  underline-offset-4 focus:outline-none focus:underline active:outline:none active:underline overflow-none break-words pr-8">
            {taskName}
          </div>
          <Transition
            show={isShowing}
            enter="transition-all duration-175"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
            className="absolute top-[-110%] left-0 bg-red-600 rounded p-2 z-50"
            onMouseEnter={() => { isHoveringTaskActions = true }}
            onMouseLeave={() => { isHoveringTaskActions = false }}
          >
            <button className="flex flex-row" onClick={() => functions.deleteTask(id)}>
              <TrashIcon className="w-5 h-5" />
              Delete
            </button>
          </Transition>


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
                  functions={functions}
                  stateSignal={stateSignal}
                >
                  {
                    stateSignal.value[id].children
                  }
                </TodoItem>
              )
            }
          </Disclosure.Panel>
        </Disclosure>
      }
    </div>
  )
}

