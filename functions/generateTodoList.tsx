import { TodoItem } from "@/components/TodoListWidget";
import getTasksAndSubtasks from "./tasks";
import { TaskList } from "@/types/customGraphTypes";


export default async function GenerateTodoList() {
  let taskList: TaskList = await getTasksAndSubtasks();

  if (!taskList)
    return <></>;

  let rootTasks = [];

  for (let [key, value] of Object.entries(taskList)) {
    if (value.parent === null)
      rootTasks.push(key)
  }

  let tasks = rootTasks.map((taskId: string) =>
    <TodoItem key={taskId} taskName={taskList[taskId].name} id={taskId} children={taskList[taskId].children} />
  )

  return {tasks, taskList}
}
