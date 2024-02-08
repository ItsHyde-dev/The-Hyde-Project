"use client";

import { getUserWidgets } from "@/functions/homepage";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ApiResponseHandlerWidget from "./ApiResponseHandlerWidget";
import { AddWidgetsPanel } from "./addWidgetsPanel/addWidgetsPanel";
import { AddWidgetButton } from "./AddWidgetButton";
import Widget from "./Widget";
import '../app/dashboard/style.css'

export default function HomepageWidgets() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["widgets"],
    queryFn: getUserWidgets,
    retry: false,
  });
  let [isOpen, setIsOpen] = useState(false);

  let memoizedWidgetTree = useMemo(() => {
    return ApiResponseHandlerWidget(isLoading, isError,
      () => {
        return (data && Object.keys(data).length) ? Widget.buildWidgetTree(data) : <p>No widgets found</p>
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  let getFlattenedWidgets = () => {
    let userWidgets: any[] = []
    if (data && !isLoading) {
      Object.values(data.widgetGroups).forEach((widgetGroup: any) => {
        widgetGroup.forEach((widget: any) => {
          if (widget["widget"].type !== "VISUALIZATION") {
            userWidgets.push(widget)
          }
        })
      })
    }

    return userWidgets
  }

  const refetchWidgets = () => {
    refetch()
  }

  return (
    <div className="flex flex-col p-10 border-[1px] border-gray-700 m-5 relative">


      <div className="widget-area-tag text-lg px-4">
        Hello User
      </div>
      <div className="widget-area-action-right">
        <AddWidgetButton setIsOpen={setIsOpen} />
      </div>
      {
        isOpen &&
        <AddWidgetsPanel setIsOpen={setIsOpen} userWidgets={getFlattenedWidgets()} refetchWidgets={refetchWidgets} />
      }
      {memoizedWidgetTree}
    </div>
  );
}

