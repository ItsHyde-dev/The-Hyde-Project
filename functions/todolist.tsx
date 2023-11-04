import { TaskList } from "@/types/customGraphTypes";
import { FocusEvent } from "react";
import { checkElement, uncheckElement } from "./graphFunctions";
import { Signal } from "@preact/signals-react";

export default class TodoListFunctions {

  // graph: any;
  // setGraph: any;
  stateSignal: Signal

  constructor(stateSignal: Signal<any>) {
    // this.graph = data;
    // this.setGraph = setData;
    this.stateSignal = stateSignal
  }

  addTask = (e: FocusEvent<HTMLInputElement>) => {
    const taskName = e.target.value
    e.target.value = ""

    // hit api to create task

    this.stateSignal.value = {
      ...this.stateSignal.value,
      [taskName]: {
        name: taskName,
        completed: false,
        parent: null,
        children: []
      }
    }

    // this.setGraph({
    // ...this.graph,
    // [taskName]: {
    // name: taskName,
    // completed: false,
    // parent: null,
    // children: []
    // }
    // })

  }

  addChildTask = (e: FocusEvent<HTMLInputElement>, parentId: string) => {
    const taskName = e.target.value
    e.target.value = ""

    // hit api to create task

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

    console.log("graph: ", graph)

    this.stateSignal.value = {
      ...graph
    }
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
  }
}



