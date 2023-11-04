import API_CONSTANTS from "@/constants/api"
import { toast } from "react-toastify"
import { handleStatusCodes } from "./api";

async function authenticate({ email, password }: { email: string, password: string }) {

  if (
    !validateEmail(email) ||
    !validatePassword(password)
  ) return false

  // currently hardcoding
  // call api for authentication

  const response = await fetch(API_CONSTANTS.API_BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: email,
      password
    })
  })

  const loginResponse = await response.json();

  try {
    handleStatusCodes(response.status, loginResponse.message)
  } catch (error) {
    return false;
  }

  setToken(loginResponse?.data?.token)
  return true;
}


function setToken(token: string) {
  "use client"
  localStorage.setItem("token", token)
}

function validateEmail(email: string) {
  return true;
}

function validatePassword(password: string) {
  return true;
}
export { authenticate }
