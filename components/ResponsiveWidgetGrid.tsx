'use client'

import { useMemo, useState } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"

export default function ResponsiveWidgetGrid({ widgetTree, gridLayout }: any) {

  gridLayout = gridLayout || {}

  const [state, setState] = useState<any>(gridLayout)
  const ResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

  return <ResponsiveGridLayout
    className="layout"
    layouts={state}
    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    cols={{ lg: 5, md: 4, sm: 3, xs: 3, xxs: 3 }}
    autoSize={true}
    draggableHandle=".draggableHandleForGrid"
    onLayoutChange={(layout: any, allLayouts: any) => {
      if (JSON.stringify(state) == JSON.stringify(allLayouts))
        return;

      // api call to update the layouts in the db
      setState(allLayouts);
    }}
  >
    {widgetTree}
  </ResponsiveGridLayout>

}

