"use client"

import { useState, useEffect } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../styles/BJ Counter.css"

function BJCounter() {
  const [count, setCount] = useState(0)
  const [decks, setDecks] = useState(1)
  const [totalCards, setTotalCards] = useState(52)
  const [remainingCards, setRemainingCards] = useState(52)

  useEffect(() => {
    // Check for saved theme preference, default to dark if none
    const savedTheme = localStorage.getItem("theme")
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && true)

    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  useEffect(() => {
    // Update total and remaining cards when decks change
    const newTotalCards = decks * 52
    setTotalCards(newTotalCards)
    setRemainingCards(newTotalCards)
    setCount(0)
  }, [decks])

  const adjustCount = (change) => {
    if (remainingCards <= 0) return

    if (change === 1) setCount((prev) => prev + 1)
    if (change === -1) setCount((prev) => prev - 1)

    setRemainingCards((prev) => prev - 1)
  }

  const decksLeft = remainingCards / 52
  const trueCount = decksLeft > 0 ? Math.floor(count / decksLeft) : 0

  const handleDecksChange = (e) => {
    const value = Number.parseInt(e.target.value) || 1
    setDecks(value)
  }

  return (
    <div className="min-h-screen p-4 md-p-8">
      <div className="scanline"></div>
      <div className="crt-effect"></div>

      <Header />

      <main className="main-container">
        <div className="card-counter-container">
          <h1 className="card-counter-title">Blackjack Card Counter</h1>

          <div className="decks-input-container">
            <label htmlFor="decks" className="decks-label">
              Decks:
            </label>
            <input
              type="number"
              id="decks"
              min="1"
              value={decks}
              onChange={handleDecksChange}
              className="decks-input"
            />
          </div>

          <div className="stats-container">
            <div className="stat-item">
              Cards remaining: <span>{remainingCards}</span>
            </div>
            <div className="stat-item">
              Decks remaining: <span>{decksLeft.toFixed(2)}</span>
            </div>

            <div className="count-display">
              Count: <span className="count-number">{count}</span>
            </div>
            <div className="true-count-display">
              True Count: <span className="true-count-number">{trueCount}</span>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button onClick={() => adjustCount(1)} className="retro-button">
            +1
          </button>
          <button onClick={() => adjustCount(0)} className="retro-button">
            0
          </button>
          <button onClick={() => adjustCount(-1)} className="retro-button">
            -1
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default BJCounter
