import { TaskList } from "@/types/customGraphTypes";

async function getTasksAndSubtasks() : Promise<TaskList> {

  let apiResponse: TaskList = {
    "t-1": {
      name: "Task Name",
      completed: false,
      parent: null,
      children: [
        "st-1",
        "st-2"
      ],
    },
    "t-2": {
      name: "Task Name 2",
      completed: false,
      parent: null,
      children: [
        "st-3"
      ],
    },
    "st-1": {
      name: "Subtask 1",
      completed: false,
      parent: "t-1",
      children: [],
    },
    "st-2": {
      name: "Subtask 2",
      completed: false,
      parent: "t-1",
      children: [],
    },
    "st-3": {
      name: "Subtask 3",
      completed: false,
      parent: "t-2",
      children: [],
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse)
    }, 10)
  })
}

export default getTasksAndSubtasks;


