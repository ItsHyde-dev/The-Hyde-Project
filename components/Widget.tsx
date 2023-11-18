"use client"

import { signal } from "@preact/signals-react";
import { ReactNode } from "react";
import TodoListWidget from "./TodoListWidget";
import TodoListGraph from "./TodoListGraph";
import ClockWidget from "./ClockWidget";
import React from "react";
import ResponsiveWidgetGrid from "./ResponsiveWidgetGrid";

export default class Widget {

  private id?: String;
  private type?: String;
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

  constructor(id?: String) {
    this.id = id;
  }

  setId(id: String) {
    this.id = id;
  }

  setPosition(position: number) {
    this.position = position;
  }

  incrementPosition(increment: number) {
    if (this.position)
      this.position += increment;
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

  static buildWidgetTree(data: { [key: string]: any }): ReactNode {

    let widgetGroups = data['widgetGroups'];

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

        widgetTree.push(
          <div style={styling} key={widget.id}>
            <WidgetComponent stateSignal={stateSignal} widgetId={widget.id} key={widget.id} widgetName={widget.name} widgetData={widget.data} rerender={signal(true)} />
          </div>
        )
      })
    })

    return <ResponsiveWidgetGrid widgetTree={widgetTree} gridLayout={data['layouts']} />;
  }

}

