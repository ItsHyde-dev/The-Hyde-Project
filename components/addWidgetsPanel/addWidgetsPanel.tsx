"use client";

import { createWidget, getWidgetTypes } from "@/functions/homepage";
import { Dialog, Switch } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import ApiResponseHandlerWidget from "../ApiResponseHandlerWidget";
import { useState } from "react";

export function Toggle(props: any) {
  const { enabled, setEnabled } = props;

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? "bg-blue-600" : "bg-gray-600"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">Enable Link</span>
      <span
        className={`${enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
}

export function AddWidgetsPanel(props: any) {
  const { setIsOpen, userWidgets, refetchWidgets } = props;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["widgetTypes"],
    queryFn: getWidgetTypes,
    retry: false,
  });

  const [enableLinkWidgets, setEnableLinkWidgets] = useState(false);
  const [linkableWidgetSelected, setLinkableWidgetSelected] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState("");
  const [linkWidget, setLinkWidget] = useState<String | null>(null);

  const [newWidgetName, setNewWidgetName] = useState<String>("");

  const modalContent = () => {
    return (
      <div className="grid grid-cols-2 gap-4 w-fit mt-5 align-center items-center">
        <div>Select Type:</div>
        <select
          className="bg-transparent outline-none"
          onChange={(e) => {
            setSelectedWidget(data[e.target.value].id);
            if (data[e.target.value].type === "VISUALIZATION") {
              setLinkableWidgetSelected(true);
            } else {
              setLinkableWidgetSelected(false);
            }
          }}
        >
          {data.map((type: any, index: number) => {
            return (
              <option key={type.id} value={index}>
                {type.name}
              </option>
            );
          })}
        </select>

        <div>Name for Widget: </div>
        <input required className="bg-transparent outline-none border-b-[0.7px] border-white" onChange={(e) => { setNewWidgetName(e.target.value) }} />

        {linkableWidgetSelected && (
          <>
            <div>Link to a data widget?</div>
            <Toggle
              enabled={enableLinkWidgets}
              setEnabled={setEnableLinkWidgets}
            />
          </>
        )}
        {enableLinkWidgets && linkableWidgetSelected && (
          <>
            <div> Link to widget: </div>
            <select
              className="bg-transparent outline-none"
              onChange={(e) => {
                setLinkWidget(e.target.value);
              }}
            >
              {userWidgets.map((widget: any, _: number) => {
                return (
                  <option key={widget.id} value={widget.id}>
                    {widget.name}
                  </option>
                );
              })}
            </select>
          </>
        )}
        <div className="flex">
          <button
            onClick={addWidget}
            className="transition-colors
            duration-150
            bg-blue-500
            hover:bg-blue-700
            text-white
            text-sm
            font-normal
            py-2 px-6 rounded-full
            flex justify-center
            cursor-pointer"
          >
            <span className="w-auto">Done</span>
          </button>
        </div>
      </div>
    );
  };

  const addWidget = async () => {
    if (!data || isLoading) return;
    const currentSelectedWidget = (!selectedWidget) ? data[0].id : selectedWidget;
    let currentSelectedLinkWidget = null;
    if (enableLinkWidgets && !linkWidget)
      currentSelectedLinkWidget = userWidgets[0].id;

    await createWidget({ widgetId: currentSelectedWidget, linkWidgetId: currentSelectedLinkWidget, data: "", name: newWidgetName });
    refetchWidgets();
    setIsOpen(false);
  };

  return (
    <Dialog
      open={true}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-[90%] h-[80%] bg-[#1f2937] text-white p-8 rounded-2xl border border-slate-700 shadow-md shadow-slate-700">
          <Dialog.Title className="font-bold text-2xl">Add Widget</Dialog.Title>
          {ApiResponseHandlerWidget(isLoading, isError, modalContent)}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
