'use client'

import HomepageWidgets from "@/components/HomepageWidgets";
import NavBar from "@/components/navbar";
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

import "./homepage.styles.css";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    document.title = "Home"
  }, []);

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
    <NavBar currentFocus="Home"/>

    <HomepageWidgets />

    <Head>
      <title>Home</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

  </div>;
}

