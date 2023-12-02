import API_CONSTANTS from "@/constants/api";
import { handleStatusCodes } from "./api";

async function authenticate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (!validateEmail(email) || !validatePassword(password)) return false;

  const response = await fetch(API_CONSTANTS.API_BASE_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  });

  const loginResponse = await response.json();

  try {
    handleStatusCodes(response.status, loginResponse.message);
  } catch (error) {
    return false;
  }

  setToken(loginResponse?.data?.token);
  return true;
}

export const signup = async ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<boolean> => {
  if (
    !validateEmail(email) ||
    !validatePassword(password) ||
    !validatePassword(confirmPassword)
  )
    return false;
  if (password !== confirmPassword) return false;

  const response = await fetch(API_CONSTANTS.API_BASE_URL + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: email,
      password,
    }),
  });

  const signupResponse = await response.json();

  try {
    handleStatusCodes(response.status, signupResponse.message);
  } catch (error) {
    return false;
  }

  setToken(signupResponse?.data?.token);
  return true;
};

function setToken(token: string) {
  "use client";
  localStorage.setItem("token", token);
}

function validateEmail(email: string) {
  return true;
}

function validatePassword(password: string) {
  return true;
}
export { authenticate };
