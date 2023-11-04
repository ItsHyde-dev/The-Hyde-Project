"use client"

import { createWidget, getWidgetTypes } from "@/functions/homepage";
import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import ApiResponseHandlerWidget from "./ApiResponseHandlerWidget";

export function AddWidgetsPanel(isOpen: any, setIsOpen: any) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["widgetTypes"],
    queryFn: getWidgetTypes,
    retry: false,
  });

  let selectedWidget = ""

  const modalContent = () => {
    return <div className="grid grid-cols-3 gap-x-4 w-fit mt-5 align-center items-center">
      <div>Select Type:</div>
      <select className="bg-transparent outline-none" onChange={(e) => { selectedWidget = e.target.value }}>
        {
          data.map((type: any) => {
            return <option key={type.id} value={type.id}>{type.name}</option>;
          })
        }
      </select>
      <div className="flex">
        <button
          onClick={addWidget}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 ml-5 rounded-full"
        >
          <span className="w-auto">
            + Add
          </span>
        </button>
      </div>
    </div >
  }

  const addWidget = async () => {
    if (!data || isLoading) return
    if (!selectedWidget)
      selectedWidget = data[0].id

    await createWidget(selectedWidget, "")

    // logic to add the widget to the root widget tree
    // also remove it if the response from the api is not 200

    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-[90%] h-[80%] rounded bg-[#1f2937] text-white p-8">
          <Dialog.Title className="font-bold text-2xl">Add Widget</Dialog.Title>
          {ApiResponseHandlerWidget(isLoading, isError, modalContent)}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
