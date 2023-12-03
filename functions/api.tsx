"use client"

import axios from "axios";
import { toast } from "react-toastify";

export class ServerError extends Error {
  constructor(message: string) {
    super(message);
  }
  name = "ServerError";
}

export function handleStatusCodes(statusCode: number, message: string) {
  switch (statusCode) {
    case 200: {
      break;
    }
    default: {
      toast.error(message, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      throw new ServerError(message);
    }
  }
}

export async function authorizedApiCall(url: string, method: string, headers: any, body: any) {

  const token = localStorage.getItem("token");

  let axiosBody = {
    url: url,
    method: method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token,
      ...headers
    },
    data: JSON.stringify(body)
  }

  const response = await axios(axiosBody)

  handleStatusCodes(response.status, response.statusText);
  return response.data;
}
