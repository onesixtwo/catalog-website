"use client"

import { useState, useEffect } from "react"
import "../styles/header.css"

function Header() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Set theme from localStorage on component mount
    const savedTheme = localStorage.getItem("theme")
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && true) // Default to dark if no preference

    setIsDark(shouldBeDark)
    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    // Update HTML class
    document.documentElement.classList.toggle("dark", newIsDark)

    // Save preference to localStorage
    localStorage.setItem("theme", newIsDark ? "dark" : "light")
  }

  const handleLogoClick = () => {
    window.location.href = "/"
  }

  return (
    <header className="header-container">
      <div className="logo" onClick={handleLogoClick}>
        <span>RANDOM </span>
        <span className="text-accent">CATALOG</span>
      </div>
      <button onClick={toggleTheme} className="retro-button">
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  )
}

export default Header
