"use client"

import { signal } from "@preact/signals-react";
import { ReactNode } from "react";
import TodoListWidget from "./TodoListWidget";
import TodoListGraph from "./TodoListGraph";
import ClockWidget from "./ClockWidget";
import React from "react";

export default class Widget {

  private id?: String;
  private type?: String;
  private data?: String;
  private position?: number;

  private typeClassification: { [key: string]: string } = {
    "todolist": "data",
    "todolist-bar-graph": "visualization",
    'clock': "visualization"
  }

  private static nameToWidgetMap: { [key: string]: (props: any) => ReactNode } = {
    "todolist": TodoListWidget,
    "todolist-bar-graph": TodoListGraph,
    'clock': ClockWidget
  }

  constructor(id?: String, data?: String) {
    this.id = id;
    this.data = data;
  }

  setId(id: String) {
    this.id = id;
  }

  setData(data: String) {
    this.data = data;
  }

  setPosition(position: number) {
    this.position = position;
  }

  incrementPosition(increment: number) {
    if (this.position)
      this.position += increment;
  }

  fetchOwnData() {
    if (!this.id ||
      !this.type ||
      this.typeClassification[this.type.toString()] == 'visualization') return;


    // logic to fetch the widget data from the server


  }

  private validateData(data: any) {

    if (this.type == undefined || this.type == null) return;
    if (this.typeClassification[this.type.toString()] != 'data') {
      return;
    }

    switch (this.type) {
      case 'todolist': {
        // validations
        break;
      }
      default: {
        return;
      }
    }
  }

  private parseData(data: any) {

    let jsonParsedData = {};
    try {
      jsonParsedData = JSON.parse(data);
    } catch (error) {
      console.log(error);
      return null;
    }


    this.validateData(jsonParsedData);

    // logic to parse the data
    // return the data
    return jsonParsedData;
  }

  setType(typeName: string) {
    this.type = typeName;
  }

  getWidget() {
    if (!this.type) return
  }

  static buildWidgetTree(widgetGroups: { [key: string]: any }): ReactNode {

    let widgetTree: any[] = [];
    console.log("-------------BUILD WIDGET TREE---------------------")

    Object.values(widgetGroups).forEach((widgetGroup: any) => {
      const stateSignal = signal({});
      widgetGroup.map((widget: any) => {
        const WidgetComponent = this.nameToWidgetMap[widget.widget.name];
        const styling = {
          gridRow: `span ${widget.height}`,
          gridColumn: `span ${widget.width}`,
        };
        widgetTree.push({
          widget: (
            <div style={styling} key={widget.id}>
              <WidgetComponent stateSignal={stateSignal} key={widget.id} />
            </div>
          ),
          position: widget.position
        })
      })
    })

    widgetTree.sort((a, b) => {
      return a.position - b.position
    })

    widgetTree = widgetTree.map((object: any) => {
      return object.widget
    })

    return widgetTree;
  }

}

