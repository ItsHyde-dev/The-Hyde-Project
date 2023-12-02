"use client";

import { useEffect } from "react";
import logo from "../public/Hyde Project Logo.png";
import { authenticate, signup } from "@/functions/auth";
import { Tab } from "@headlessui/react";
import Image from "next/image";

export default function AuthForm() {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-20 w-auto"
            src={logo.src}
            alt="TheHydeProject Logo"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="flex flex-row items-center justify-center w-full">
            <LoginSignupTabView />
          </div>
        </div>
      </div>
    </>
  );
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

function LoginForm() {
  const handleLogin = (event: any) => {
    event.preventDefault();

    let loginData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    authenticate(loginData).then((res) => {
      if (!res) return;
      window.location.href = "/home";
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-white"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-white "
          >
            Password
          </label>
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}

const SignupForm = (props: {}) => {
  const handleSignup = (event: any) => {
    event.preventDefault();

    let signupData = {
      email: event.target.email.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
    };

    signup(signupData).then((res) => {
      if (!res) return;
      window.location.href = "/home";
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSignup}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-white"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-white "
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium leading-6 text-white "
          >
            Confirm Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

const selectedClassname = (selected: boolean): string =>
  selected ? "bg-indigo-500 shadow text-white" : "bg-indigo-400 bg-opacity-30";

function LoginSignupTabView() {
  return (
    <Tab.Group as="div" className="text-white sm:mx-auto sm:w-full sm:max-w-sm">
      <Tab.List className="flex space-x-1 rounded-xl p-1 mb-4">
        <TabTitle title="Login" />
        <TabTitle title="Signup" />
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <LoginForm />
        </Tab.Panel>
        <Tab.Panel>
          <SignupForm />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

function TabTitle(props: any) {
  return (
    <Tab
      className={({ selected }) => {
        return classNames(
          "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
          "focus:outline-none ",
          selectedClassname(selected)
        );
      }}
    >
      {props.title}
    </Tab>
  );
}

function LoginSignupFormSection(props: any) {}
