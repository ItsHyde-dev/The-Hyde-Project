import API_CONSTANTS from "@/constants/api";
import { ServerError, handleStatusCodes } from "./api";
import { toast } from "react-toastify";

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
  try {
    if (
      !validateEmail(email) ||
      !validatePassword(password) ||
      !validatePassword(confirmPassword)
    )
      throw new Error("Invalid email or password");
    if (password !== confirmPassword) {
      throw new Error("Passwords don't match");
    }
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

    handleStatusCodes(response.status, signupResponse.message);

    setToken(signupResponse?.data?.token);
    return true;
  } catch (error: any) {
    if (error instanceof ServerError) return false;

    toast.error(error.message, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    return false;
  }
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
