import { deleteWidgetFromDatabase } from "@/functions/widgets";
import { Menu } from "@headlessui/react";
import { Bars3BottomLeftIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function WidgetWrapper({ children, title, widgetId }: any) {

  return (
    <div id={widgetId} className="border-[1px] border-slate-700 rounded text-white py-5 px-5 flex flex-col h-full overflow-hidden">
      <div className="flex flex-row justify-between">
        <span className="text-l font-light underline underline-offset-4 decoration-slate-700 flex flex-row items-center">
          <Bars3BottomLeftIcon className="h-5 w-5 mr-2 draggableHandleForGrid cursor-move" />
          {title}
        </span>
        <div className="relative">
          <Menu>
            <Menu.Button className="rounded-full">...</Menu.Button>
            <Menu.Items className="absolute right-0 top-8 w-auto rounded-xl z-50">
              <Menu.Item as="button" onClick={() => deleteWidget(widgetId)} className="bg-red-600 flex flex-row items-center justify-center py-2 px-3 rounded-md">
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

function deleteWidget(widgetId: any) {
  const deleteWidgetFromDBResponse = deleteWidgetFromDatabase(widgetId).catch((err) => {
    console.log(err)
  })

  // Delete widget from the DOM
  document.getElementById(widgetId)?.remove()
}
