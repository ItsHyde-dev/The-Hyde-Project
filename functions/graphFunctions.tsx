import { TaskList } from "@/types/customGraphTypes";

export function uncheckElement(graph: TaskList, id: string): TaskList {
  let parent = graph[id].parent
  let children: string[] = graph[id].children
  let acc: string[] = [...children];

  while (acc.length) {
    let child = acc.pop();
    if (!child) continue;
    graph[child].completed = false
    graph[child].children.forEach(c => acc.push(c));
  }

  if (!parent) return graph

  while (!!parent) {
    if (!graph[parent].completed) break
    graph[parent].completed = false
    parent = graph[parent].parent
  }

  return graph;
}

export function checkElement(graph: TaskList, id: string): TaskList {
  let parent = graph[id].parent
  let children: string[] = graph[id].children
  let acc: string[] = [...children];

  while (acc.length) {
    let child = acc.pop();
    if (!child) continue;
    graph[child].completed = true
    graph[child].children.forEach(c => acc.push(c));
  }

  if (!parent) return graph

  // iterate through the parents
  while (!!parent) {
    let checkParent: boolean = graph[parent!].children.every(child => graph[child].completed);
    graph[parent].completed = checkParent

    if (!checkParent) break;
    parent = graph[parent].parent
  }

  return graph;
}
