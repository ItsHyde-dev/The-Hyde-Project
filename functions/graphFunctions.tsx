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
  graph[parent].completed = false

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

  let checkParent: boolean = graph[parent].children.every(child => graph[child].completed);
  graph[parent].completed = checkParent

  return graph;
}
