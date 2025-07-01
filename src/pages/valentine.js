"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import "../styles/valentine.css"

function Valentine() {
  const [searchParams] = useSearchParams()
  const [inputName, setInputName] = useState("")
  const [inputMessage, setInputMessage] = useState("")
  const [generatedLink, setGeneratedLink] = useState("")
  const [showCard, setShowCard] = useState(false)
  const [recipientName, setRecipientName] = useState("")
  const [customMessage, setCustomMessage] = useState("")
  const [noButtonStyle, setNoButtonStyle] = useState({})
  const [noButtonText, setNoButtonText] = useState("No")
  const [noClickCount, setNoClickCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  const noButtonTexts = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again...",
    "Please?",
    "Pretty please?",
    "Don't be mean 💔",
    "I'll cry 😢",
    "Final chance!",
    "Yes",
  ]

  useEffect(() => {
    // Valentine page defaults to light mode if no preference is saved
    const savedTheme = localStorage.getItem("theme")
    const shouldBeDark = savedTheme === "dark" // Only dark if explicitly set to dark

    document.documentElement.classList.toggle("dark", shouldBeDark)

    // Check if there's a name in the URL
    const nameFromUrl = searchParams.get("name")
    const messageFromUrl = searchParams.get("message")
    if (nameFromUrl) {
      setRecipientName(decodeURIComponent(nameFromUrl))
      setCustomMessage(messageFromUrl ? decodeURIComponent(messageFromUrl) : "")
      setShowCard(true)
    }
  }, [searchParams])

  const generateLink = () => {
    if (!inputName.trim()) {
      alert("Please enter a name!")
      return
    }

    const currentUrl = window.location.origin + window.location.pathname
    let link = `${currentUrl}?name=${encodeURIComponent(inputName.trim())}`
    if (inputMessage.trim()) {
      link += `&message=${encodeURIComponent(inputMessage.trim())}`
    }
    setGeneratedLink(link)
  }
  const [copyButtonText, setCopyButtonText] = useState("Copy Link 📋")

  const copyLink = () => {
  navigator.clipboard.writeText(generatedLink)
  setCopyButtonText("Copied! ✅")
  setTimeout(() => {
    setCopyButtonText("Copy Link 📋")
  }, 2000)
}


  const handleNoClick = () => {
    const newClickCount = noClickCount + 1
    setNoClickCount(newClickCount)

    // Update button text
    if (newClickCount < noButtonTexts.length) {
      setNoButtonText(noButtonTexts[newClickCount])
    }

    // If it's the last click and text becomes "Yes", trigger yes action
    if (newClickCount === noButtonTexts.length - 1) {
      setTimeout(() => {
        handleYesClick()
      }, 500)
      return
    }

    // Move button to random position within the card (only for first 9 clicks)
    if (newClickCount < 10) {
      // Get the button container dimensions (the card content area)
      const buttonContainer = document.querySelector(".button-container")
      if (buttonContainer) {
        const containerRect = buttonContainer.getBoundingClientRect()

        // Button dimensions (generous estimates)
        const buttonWidth = 150
        const buttonHeight = 60

        // Calculate safe boundaries within the container
        const maxX = containerRect.width - buttonWidth
        const maxY = containerRect.height - buttonHeight

        // Ensure minimum boundaries
        const safeMaxX = Math.max(0, maxX)
        const safeMaxY = Math.max(0, maxY)

        // Generate random position within the container
        const randomX = Math.random() * safeMaxX
        const randomY = Math.random() * safeMaxY

        setNoButtonStyle({
          position: "absolute",
          left: `${randomX}px`,
          top: `${randomY}px`,
          transition: "all 0.3s ease",
          zIndex: 10,
        })
      }
    }
  }

  const handleYesClick = () => {
    setShowSuccess(true)
  }

  const resetCard = () => {
    setShowCard(false)
    setShowSuccess(false)
    setNoClickCount(0)
    setNoButtonText("No")
    setNoButtonStyle({})
    setRecipientName("")
    setCustomMessage("")
    // Clear URL parameters
    window.history.replaceState({}, document.title, window.location.pathname)
  }

  if (showSuccess) {
    return (
      <div className="valentine-page">
        <div className="romantic-background">
          <div className="floating-hearts">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`floating-heart heart-${i + 1}`}>
                💕
              </div>
            ))}
          </div>
          <div className="rose-petals">
            {[...Array(15)].map((_, i) => (
              <div key={i} className={`petal petal-${i + 1}`}>
                🌹
              </div>
            ))}
          </div>
        </div>

        <main className="valentine-container">
          <div className="success-card retro-card pixel-corners">
            <h1 className="success-title">🎉 YAYYY! 🎉</h1>
            <div className="hearts-animation">
              <span className="heart">💕</span>
              <span className="heart">💖</span>
              <span className="heart">💝</span>
              <span className="heart">💗</span>
              <span className="heart">💕</span>
            </div>
            <p className="success-message">{recipientName}, you made someone very happy! 💕</p>
            {customMessage && (
              <div className="custom-message-display">
                <h3>💌 Special Message for You:</h3>
                <p className="custom-message-text">"{customMessage}"</p>
              </div>
            )}
            <p className="success-submessage">Time to plan that perfect date! 🌹</p>
            <button onClick={resetCard} className="retro-button">
              Create Another Card
            </button>
          </div>
        </main>
      </div>
    )
  }

  if (showCard) {
    return (
      <div className="valentine-page">
        <div className="romantic-background">
          <div className="floating-hearts">
            {[...Array(25)].map((_, i) => (
              <div key={i} className={`floating-heart heart-${i + 1}`}>
                {i % 4 === 0 ? "💕" : i % 4 === 1 ? "💖" : i % 4 === 2 ? "💝" : "💗"}
              </div>
            ))}
          </div>
          <div className="rose-petals">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`petal petal-${i + 1}`}>
                🌹
              </div>
            ))}
          </div>
          <div className="sparkles">
            {[...Array(30)].map((_, i) => (
              <div key={i} className={`sparkle sparkle-${i + 1}`}>
                ✨
              </div>
            ))}
          </div>
        </div>

        <main className="valentine-container">
          <div className="valentine-card retro-card pixel-corners">
            <div className="card-header">
              <h1 className="card-title">💌 For {recipientName} 💌</h1>
            </div>

            <div className="card-content">
              <div className="heart-decoration">
                <span className="big-heart">💖</span>
              </div>

              <h2 className="valentine-question">Will you be my Valentine?</h2>

              <div className="button-container">
                <button onClick={handleYesClick} className="retro-button yes-button">
                  Yes! 💕
                </button>

                <button onClick={handleNoClick} className="retro-button no-button" style={noButtonStyle}>
                  {noButtonText}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4">
      <div className="scanline"></div>
      <div className="crt-effect"></div>
      <Header />

      <main className="valentine-container">
        <div className="valentine-generator retro-card pixel-corners">
          <h1 className="generator-title">💕 Valentine Card Generator 💕</h1>

          <div className="generator-content">
            <p className="instruction-text">Create a personalized Valentine's card to send to someone special!</p>

            <div className="input-section">
              <label htmlFor="name-input" className="input-label">
                Enter their name:
              </label>
              <input
                type="text"
                id="name-input"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="e.g. Sarah, Alex, Jordan..."
                className="name-input"
              />

              <label htmlFor="message-input" className="input-label">
                Custom message (optional):
              </label>
              <textarea
                id="message-input"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Write a sweet message that will show after they say yes..."
                className="message-input"
                rows="3"
              />

              <button onClick={generateLink} className="retro-button generate-button" disabled={!inputName.trim()}>
                Generate Valentine Card 💌
              </button>
            </div>

            {generatedLink && (
              <div className="link-section">
                <h3 className="link-title">Your Valentine Card is Ready! 💕</h3>
                <div className="link-container">
                  <input type="text" value={generatedLink} readOnly className="generated-link" />
                  <button onClick={copyLink} className="retro-button copy-button">
                    {copyButtonText}
                  </button>
                </div>
                <p className="link-instruction">Send this link to your special someone! 💖</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Valentine
