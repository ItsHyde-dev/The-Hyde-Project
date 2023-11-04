import { TrashIcon } from "@heroicons/react/24/outline";

export default function WidgetActionsPanel() {

  return (
    <div className="flex flex-row justify-center bg-red-600">
      <button className="flex flex-row">
        <TrashIcon className="h-5 w-5 mr-2" />
        <span>Delete</span>
      </button>
    </div>
  )
}
