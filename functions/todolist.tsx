import { TaskList } from "@/types/customGraphTypes";
import { FocusEvent } from "react";
import { checkElement, uncheckElement } from "./graphFunctions";

export default class TodoListFunctions {

  graph: any;
  setGraph: any;

  constructor(data: any, setData: any) {
    this.graph = data;
    this.setGraph = setData;
  }

  addTask = (e: FocusEvent<HTMLInputElement>) => {
    const taskName = e.target.value
    e.target.value = ""

    // hit api to create task

    this.setGraph({
      ...this.graph,
      [taskName]: {
        name: taskName,
        completed: false,
        parent: null,
        children: []
      }
    })

  }

  addChildTask = (e: FocusEvent<HTMLInputElement>, parentId: string) => {
    const taskName = e.target.value
    e.target.value = ""

    // hit api to create task

    this.setGraph({
      ...this.graph,
      [taskName]: {
        name: taskName,
        completed: false,
        parent: parentId,
        children: []
      },
      [parentId]: {
        ...this.graph[parentId],
        children: [...this.graph[parentId].children, taskName]
      }
    })
  }

  deleteTask = (taskId: string) => {
    let acc = this.graph[taskId].children
    let graph = { ...this.graph }

    if (graph[taskId].parent)
      graph[graph[taskId].parent].children = graph[graph[taskId].parent].children.filter((c: string) => c !== taskId)

    delete graph[taskId]

    while (acc.length) {
      let child = acc.pop();
      graph[child].children.forEach((c: string) => acc.push(c));
      delete graph[child];
    }

    console.log("graph: ", graph)

    this.setGraph({
      ...graph
    })
  }

  getRootTasks(taskList: TaskList) {
    return Object.keys(taskList).filter((taskId: string) => taskList[taskId].parent === null)
  }

  handleTaskChecked = (e: any) => {
    let updatedField = this.graph[e.target.value];
    updatedField.completed = e.target.checked
    let graph = (e.target.checked) ? checkElement(this.graph, e.target.value) : uncheckElement(this.graph, e.target.value);
    this.setGraph({
      ...graph,
      [e.target.value]: updatedField
    })
  }
}



