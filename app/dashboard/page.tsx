'use client'

import HomepageWidgets from "@/components/HomepageWidgets";
import NavBar from "@/components/navbar";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import "./homepage.styles.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function Home() {

  const { replace } = useRouter()
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      replace("/auth")
    } else {
      setAuthState(true)
      document.title = "Home"
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authState)
    return <Spinner />;

  return <div className="flex flex-col text-white homeBackground">
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <NavBar currentFocus="Home" />
    <HomepageWidgets />
  </div>;
}

