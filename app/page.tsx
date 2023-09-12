"use client"

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Main() {
  useEffect(() => {
    localStorage.isLoggedIn && redirect('/home')
    redirect('/auth')
  })
}
