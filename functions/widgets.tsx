'use client'

import api_constants from '../constants/api'
import { authorizedApiCall } from './api'

export async function getWidgetData(widgetId: any) {
  const response = await authorizedApiCall(api_constants.API_BASE_URL + "/widgets/getData?widgetId=" + widgetId, "GET", {}, {});
  return response.data;
}

export async function deleteWidgetFromDatabase(widgetId: any) {
  const response = await authorizedApiCall(api_constants.API_BASE_URL + "/widgets/delete", "post", {}, { widgetId });
  return response.data;
}
