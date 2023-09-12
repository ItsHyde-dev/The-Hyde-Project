"use client"

import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function Logout() {
  useEffect(() => {
    // remove the token from the local storage
    // remove the isLoggedIn flag

    localStorage.removeItem("token")
    localStorage.removeItem("isLoggedIn")

    redirect("/auth")
  })

  return <></>
}
