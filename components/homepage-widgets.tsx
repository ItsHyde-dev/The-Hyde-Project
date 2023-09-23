import GraphProvider from "@/providers/graphProvider";
import TodoListWidget from "./TodoListWidget";
import TodoListGraph from "./TodoListGraph";
import ClockWidget from "./ClockWidget";
import CategorizedListWidget from "./CategorizedListWidget";

export default function HomepageWidgets() {
  return <div className="flex flex-col p-10">
    <div className="text-2xl font-semibold py-5">Hello User</div>
    <div className="grid grid-cols-2 gap-2">
      <GraphProvider>
        <TodoListGraph />
        <TodoListWidget />
        <ClockWidget />
        <CategorizedListWidget />
      </GraphProvider>
    </div>
  </div>
}

