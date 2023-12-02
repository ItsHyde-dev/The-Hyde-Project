import { Signal } from "@preact/signals-react";
import { FocusEvent } from "react";
import { authorizedApiCall } from "./api";
import API_CONSTANTS from "@/constants/api";

export default class CategorizedListFunctions {
  stateSignal: Signal<any>;

  constructor(state: Signal<any>) {
    this.stateSignal = state;
  }

  async getCategories() {
    return [
      { id: 1, name: "Work" },
      { id: 2, name: "Home" },
      { id: 3, name: "School" },
      { id: 4, name: "Personal" },
      { id: 5, name: "Other" },
    ];
  }

  async getNotes(id: string) {
    // get using the api

    return [
      { id: 1, name: "Note 1" },
      { id: 2, name: "Note 2" },
      { id: 3, name: "Note 3" },
    ];
  }

  addCategory(e: FocusEvent<HTMLInputElement>) {
    console.log("Submit happened for task name: ", e.target.value);
    e.target.value = "";
  }

  addNote(e: FocusEvent<HTMLInputElement>) {
    console.log("Submit happened for task name: ", e.target.value);
    e.target.value = "";
  }
}

export class CategorizedListNotesFunctions {
  state: Signal<any>;
  id: string;

  constructor(state: Signal<any>, id: string) {
    this.state = state;
    this.id = id;
  }

  async getNotes() {
    const response = await authorizedApiCall(
      API_CONSTANTS.API_BASE_URL + "/widgets/getData?widgetId=" + this.id,
      "GET",
      {},
      {}
    );

    // do something to the response if needed

    return response;

  }

  async addNote(e: FocusEvent<HTMLInputElement>) {
    console.log("Submit happened for task name: ", e.target.value);
    e.target.value = "";


    authorizedApiCall(API_CONSTANTS.API_BASE_URL + "/categorizedList/addNote", "POST", {}, {
      categoryId: this.id,
      data: JSON.stringify(this.state.value)
    })
  }
}
