import { FocusEvent } from "react"

export async function getCategories() {
  return [{ id: 1, name: "Work" }, { id: 2, name: "Home" }, { id: 3, name: "School" }, { id: 4, name: "Personal" }, { id: 5, name: "Other" }];
}

export async function getNotes(id: string) {

  // get using the api

  return [{ id: 1, name: "Note 1" }, { id: 2, name: "Note 2" }, { id: 3, name: "Note 3" }];
}

export function addCategory(e: FocusEvent<HTMLInputElement>) {
  console.log("Submit happened for task name: ", e.target.value)
  e.target.value = ""
}

export function addNote(e: FocusEvent<HTMLInputElement>) {
  console.log("Submit happened for task name: ", e.target.value)
  e.target.value = ""
}

