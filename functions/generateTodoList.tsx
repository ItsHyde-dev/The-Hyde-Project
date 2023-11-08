import getTasksAndSubtasks from "./tasks";
import { TaskList } from "@/types/customGraphTypes";


export default async function GenerateTodoList() {
  let taskList: TaskList = await getTasksAndSubtasks();


  return taskList
}
