"use client"

import api_constants from '../constants/api'
import { authorizedApiCall } from './api';

export async function getUserWidgets() {
  setTimeout(() => { }, 2000);
  const response = await authorizedApiCall(api_constants.API_BASE_URL + "/widgets/getWidgets", "GET", {}, {});
  return response.data;
}

export async function getWidgetTypes() {
  const response = await authorizedApiCall(api_constants.API_BASE_URL + "/widgets/getWidgetTypes", "GET", {}, {});
  return response.data.widgets
}

export async function createWidget({ widgetId, linkWidgetId, data, name }: { widgetId: String, linkWidgetId: String | null, data: any, name: String }) {

  if (!widgetId) return;

  const response = await authorizedApiCall(
    api_constants.API_BASE_URL + "/widgets/createWidget",
    "POST",
    {},
    { widgetId, linkWidgetId, data, name });

  return response.data;
}


