"use client"

import api_constants from '../constants/api'
import { authorizedApiCall } from './api';

export async function getUserWidgets() {
  const response = await authorizedApiCall(api_constants.API_BASE_URL + "/widgets/getWidgets", "GET", {}, {});
  return response.data.widgetGroups;
}

export async function getWidgetTypes() {
  const response = await authorizedApiCall(api_constants.API_BASE_URL + "/widgets/getWidgetTypes", "GET", {}, {});
  return response.data.widgets
}

export async function createWidget(widgetId: String, data: String) {
  const response = await authorizedApiCall(
    api_constants.API_BASE_URL + "/widgets/createWidget",
    "POST",
    {},
    { widgetId, data });

  return response.data;
}


