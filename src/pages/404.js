"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import "../styles/404.css"

function NotFound() {
  const [glitchText, setGlitchText] = useState("404")
  const [currentMessage, setCurrentMessage] = useState(0)

  const errorMessages = [
    "ERROR: PAGE NOT FOUND IN DATABASE",
    "SYSTEM MALFUNCTION DETECTED",
    "REALITY.EXE HAS STOPPED WORKING",
    "THE REQUESTED DIMENSION DOES NOT EXIST",
    "COSMIC RAYS CORRUPTED THIS PAGE",
    "PAGE EATEN BY DIGITAL MOTHS",
    "LOST IN THE VOID OF CYBERSPACE",
    "404: HUMOR MODULE STILL FUNCTIONAL",
  ]

  const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
  const originalText = "404"

  useEffect(() => {
    // Check for saved theme preference, default to dark if none
    const savedTheme = localStorage.getItem("theme")
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && true)

    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  useEffect(() => {
    // Glitch effect for 404 text
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        let glitched = ""
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() < 0.4) {
            glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)]
          } else {
            glitched += originalText[i]
          }
        }
        setGlitchText(glitched)

        setTimeout(() => {
          setGlitchText(originalText)
        }, 100)
      }
    }, 500)

    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    // Cycle through error messages
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % errorMessages.length)
    }, 3000)

    return () => clearInterval(messageInterval)
  }, [])

  const handleRandomClick = () => {
    const pages = ["/", "/BJ Counter", "/Grade Calculator", "/Butterfly Effect"]
    const randomPage = pages[Math.floor(Math.random() * pages.length)]
    window.location.href = randomPage
  }

  const handleReportClick = () => {
    alert("ERROR REPORT SUBMITTED TO THE VOID\n\nStatus: Successfully ignored by the universe")
  }

  return (
    <div className="min-h-screen p-4">
      <div className="scanline"></div>
      <div className="crt-effect"></div>

      <Header />

      <main className="error-container">
        <div className="error-card">
          <div className="error-code">
            <span className="glitch-text">{glitchText}</span>
          </div>

          <div className="error-title">
            <h1>SYSTEM ERROR</h1>
          </div>

          <div className="error-message">
            <p className="cycling-message">{errorMessages[currentMessage]}</p>
          </div>

          <div className="error-description">
            <p>The page you're looking for has been:</p>
            <ul className="error-list">
              <li>• GONE just like her feelings for you!</li>
            </ul>
          </div>

        </div>

        <div className="error-actions">
          <Link to="/" className="retro-button home-button">
            RETURN TO BASE
          </Link>
          <button onClick={handleRandomClick} className="retro-button random-button">
            RANDOM TELEPORT
          </button>
          <button onClick={handleReportClick} className="retro-button report-button">
            REPORT BUG
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default NotFound
