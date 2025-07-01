"use client"

import { useState } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../styles/Butterfly Effect.css"

// Your fallback effects if API fails
const fallbackEffects = [
  "Decided to wear mismatched socks → Caught attention of a fashion scout → Became trendsetter for asymmetrical fashion → Started global movement against conformity → Overthrew the sock industry → Established the Republic of Mismatched Everything",
  "Chose to eat cereal for dinner → Spilled milk on important documents → Documents became illegible → Had to rewrite them from memory → Made accidental improvements → Got promoted → Became CEO → Bought the cereal company",
  "Decided to take stairs instead of elevator → Met someone carrying too many boxes → Helped them carry boxes → Boxes contained prototype inventions → Became business partners → Invented teleportation → Eliminated need for stairs and elevators",
  "Chose to listen to a different song → Song had subliminal frequency → Awakened dormant psychic abilities → Could predict lottery numbers → Won jackpot → Bought small country → Declared it a music-only nation",
  "Decided to pet a random cat → Cat followed you home → Cat was actually an alien scout → Aliens made first contact through cat → Became Earth's ambassador → Negotiated intergalactic peace → Cats now rule the universe",
  "Chose to use a different pen → Pen leaked on your hand → Hand print on door became abstract art → Art critic discovered it → Became famous artist → Art sold for millions → Bought pen factory → All pens now leak intentionally",
  "Decided to walk a different route → Found a $20 bill → Used it to buy lottery ticket → Won small prize → Reinvested winnings → Became professional gambler → Opened casino → Banned walking on that route to preserve luck",
  "Chose to sneeze at wrong moment → Sneeze caused butterfly to change direction → Butterfly landed on nuclear physicist → Physicist had breakthrough idea → Invented clean energy → Solved climate crisis → Your sneeze saved the planet",
]

// === Configuration: replace these with your own ===
const OPENROUTER_API_KEY = "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"
const SITE_URL = "https://vargass.netlify.app/Butterfly%20Effect" // e.g. "https://butterflyeffect.example.com"
const SITE_NAME = "Butterfly Effect Machine"
// ===============================================

export default function ButterflyEffect() {
  const [userInput, setUserInput] = useState("")
  const [output, setOutput] = useState("Enter a tiny decision to generate butterfly effects.")
  const [isLoading, setIsLoading] = useState(false)

  // Function to call OpenRouter API
  const generateWithAI = async (input) => {
    const prompt = `Create a surreal, darkly funny, and absurd butterfly effect chain starting from: "${input}".\n\nWrite a chain of 5–6 bizarre but logically connected events. Each event must follow from the last in a ridiculous, imaginative way.\nUse arrows (→) to separate each step in the chain.\nKeep it short, punchy, and vivid — no explanations, no commentary.\nDo not use first-person or second-person — just describe the unfolding chain of events.\n\nNow generate one starting from:`

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": SITE_URL,
          "X-Title": SITE_NAME,
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528:free",
          messages: [
            {
              role: "user",
              content: `${prompt} "${input}"`,
            },
          ],
          temperature: 0.9,
          max_tokens: 300,
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()

      const text = data.choices?.[0]?.message?.content?.trim()

      if (!text) throw new Error("No response text from API")

      const formattedText = text
        .replace(/→/g, '<span class="arrow">→</span>')
        .replace(/\n/g, "<br/>")

      return `<div class="butterfly-chain"><br/>${formattedText}</div>`
    } catch (error) {
      console.error("OpenRouter AI generation failed:", error)
      throw error
    }
  }

  // Fallback effect generator
  const generateWithFallback = (input) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Pick a random fallback effect
        const randomEffect = fallbackEffects[Math.floor(Math.random() * fallbackEffects.length)]
        // Customize it with user's input at the start
        const customizedEffect = randomEffect.replace(/^[^→]*/, `"${input}"`)
        const formatted = customizedEffect.replace(/→/g, '<span class="arrow">→</span>')
        resolve(`<div class="butterfly-chain">Offline Mode:<br/>${formatted}</div>`)
      }, 1500)
    })
  }

  // Main handler
  const generateEffect = async () => {
    if (!userInput.trim()) {
      setOutput("⚠️ Please enter a decision first!")
      return
    }

    setIsLoading(true)
    setOutput("Generating butterfly effect...<br/>🧠 Thinking...")

    try {
      let result
      try {
        result = await generateWithAI(userInput)
      } catch (error) {
        // If API call fails, fallback
        result = await generateWithFallback(userInput)
      }
      setOutput(result)
    } catch (error) {
      console.error("Generation failed:", error)
      setOutput("Something went wrong! Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Enter key press in input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      generateEffect()
    }
  }

  // Button text updates with loading state
  const getButtonText = () => (isLoading ? "Thinking..." : "Generate Effect")

  return (
    <div className="min-h-screen p-4">
      <div className="scanline"></div>
      <div className="crt-effect"></div>

      <Header />

      <main className="main-container">
        <div className="butterfly-container">
          <h1 className="butterfly-title">The Butterfly Effect Machine</h1>

          <div className="input-section">
            <p className="instruction-text">Enter a tiny decision and watch chaos unfold:</p>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g. Skipped brushing teeth at age 12"
              className="butterfly-input"
              aria-label="Enter a tiny decision"
              disabled={isLoading}
            />
            <button
              onClick={generateEffect}
              disabled={isLoading}
              aria-label="Generate butterfly effect"
              className={`retro-button generate-button ${isLoading ? "disabled" : ""}`}
            >
              {getButtonText()}
            </button>
          </div>

          <div
            className={`output-container ${isLoading ? "loading" : ""}`}
            dangerouslySetInnerHTML={{ __html: output }}
            aria-live="polite"
          />

          <div className="info-section">
            <div className="info-text">
              <p>Powered by OpenRouter AI (when available)</p>
              <p>Each decision creates infinite possibilities</p>
              <p>Your data stays private - runs in your browser!</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
