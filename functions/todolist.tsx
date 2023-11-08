import { TaskList } from "@/types/customGraphTypes";
import { FocusEvent } from "react";
import { checkElement, uncheckElement } from "./graphFunctions";
import { Signal } from "@preact/signals-react";
import { authorizedApiCall } from "./api";
import API_CONSTANTS from "@/constants/api";

export default class TodoListFunctions {

  stateSignal: Signal
  widgetId: String

  constructor(stateSignal: Signal<any>, widgetId: String) {
    this.stateSignal = stateSignal
    this.widgetId = widgetId
  }

  addTask = (e: FocusEvent<HTMLInputElement>) => {
    const taskName = e.target.value
    if (!taskName) return;

    e.target.value = ""


    this.stateSignal.value = {
      ...this.stateSignal.value,
      [taskName]: {
        name: taskName,
        completed: false,
        parent: null,
        children: []
      }
    }

    // hit api to create task
    authorizedApiCall(API_CONSTANTS.API_BASE_URL + "/widgets/update", "POST", {}, {
      widgetId: this.widgetId,
      data: JSON.stringify(this.stateSignal.value)
    })
  }

  addChildTask = (e: FocusEvent<HTMLInputElement>, parentId: string) => {
    const taskName = e.target.value
    if (!taskName) return;
    e.target.value = ""

    this.stateSignal.value = {
      ...this.stateSignal.value,
      [taskName]: {
        name: taskName,
        completed: false,
        parent: parentId,
        children: []
      },
      [parentId]: {
        ...this.stateSignal.value[parentId],
        children: [...this.stateSignal.value[parentId].children, taskName]
      }
    }

    authorizedApiCall(API_CONSTANTS.API_BASE_URL + "/widgets/update", "POST", {}, {
      widgetId: this.widgetId,
      data: JSON.stringify(this.stateSignal.value)
    })
  }

  deleteTask = (taskId: string) => {

    let acc = this.stateSignal.value[taskId].children
    let graph = { ...this.stateSignal.value }

    if (graph[taskId].parent)
      graph[graph[taskId].parent].children = graph[graph[taskId].parent].children.filter((c: string) => c !== taskId)

    delete graph[taskId]

    while (acc.length) {
      let child = acc.pop();
      graph[child].children.forEach((c: string) => acc.push(c));
      delete graph[child];
    }

    this.stateSignal.value = {
      ...graph
    }

    authorizedApiCall(API_CONSTANTS.API_BASE_URL + "/widgets/update", "POST", {}, {
      widgetId: this.widgetId,
      data: JSON.stringify(this.stateSignal.value)
    })
  }

  getRootTasks(taskList: TaskList) {
    return Object.keys(taskList).filter((taskId: string) => taskList[taskId].parent === null)
  }

  handleTaskChecked = (e: any) => {
    let updatedField = this.stateSignal.value[e.target.value];
    updatedField.completed = e.target.checked
    let graph = (e.target.checked) ? checkElement(this.stateSignal.value, e.target.value) : uncheckElement(this.stateSignal.value, e.target.value);
    this.stateSignal.value = {
      ...graph,
      [e.target.value]: updatedField
    }

    authorizedApiCall(API_CONSTANTS.API_BASE_URL + "/widgets/update", "POST", {}, {
      widgetId: this.widgetId,
      data: JSON.stringify(this.stateSignal.value)
    })
  }
}



