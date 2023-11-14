"use client";

import { getUserWidgets } from "@/functions/homepage";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ApiResponseHandlerWidget from "./ApiResponseHandlerWidget";
import { AddWidgetsPanel } from "./AddWidgetsPanel";
import { AddWidgetButton } from "./AddWidgetButton";
import Widget from "./Widget";

export default function HomepageWidgets() {
  const { data, isLoading, isError, isRefetching, refetch } = useQuery({
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
    <div className="flex flex-col p-10">

      <div className="flex flex-row items-center">
        <div className="text-xl font-semibold py-5 pr-5">Hello User</div>
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

