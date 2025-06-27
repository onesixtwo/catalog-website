"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../styles/Butterfly Effect.css"

// Fallback effects for when AI is not available
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

function ButterflyEffect() {
  const [userInput, setUserInput] = useState("")
  const [output, setOutput] = useState("Enter a decision to generate butterfly effects.")
  const [isLoading, setIsLoading] = useState(false)
  const [webllmReady, setWebllmReady] = useState(false)
  const [initializationAttempted, setInitializationAttempted] = useState(false)
  const engineRef = useRef(null)

  // Move initializeWebLLM inside useCallback with force parameter
  const initializeWebLLM = useCallback(
    async (force = false) => {
      alert(`🚀 ${force ? "Force AI Init" : "Auto AI Init"} starting!`)

      if (initializationAttempted && !force) {
        alert("⚠️ AI initialization already attempted! Use Force AI Init to retry.")
        return
      }

      if (force) {
        alert("💪 Force initialization - resetting previous attempt...")
        setInitializationAttempted(false)
        setWebllmReady(false)
        engineRef.current = null
      }

      alert("✅ Starting AI initialization process...")
      setInitializationAttempted(true)

      // Check if we're in a browser environment
      if (typeof window === "undefined") {
        alert("🔄 Server-side rendering detected - skipping AI init")
        setWebllmReady(false)
        setOutput("Offline mode ready - generate butterfly effects!")
        return
      }

      alert("📥 About to download AI model files...")
      setOutput("Loading AI model... This may take a few minutes on first load.<br/>Downloading model files...")

      try {
        alert("🔗 Importing WebLLM module...")
        // Dynamic import for WebLLM
        const webllmModule = await import("https://esm.run/@mlc-ai/web-llm")
        const { CreateMLCEngine } = webllmModule

        alert("✅ WebLLM module imported successfully!")

        // Initialize with a smaller, faster model
        const selectedModel = "Llama-3.2-1B-Instruct-q4f32_1-MLC"
        alert(`🤖 Creating AI engine with model: ${selectedModel}`)

        setOutput(`Initializing ${selectedModel}...<br/>Please wait, this may take a moment...`)

        engineRef.current = await CreateMLCEngine(selectedModel, {
          initProgressCallback: (report) => {
            console.log("WebLLM Init Progress:", report)
            if (report.text) {
              setOutput(`Loading: ${report.text}<br/>Progress: ${Math.round((report.progress || 0) * 100)}%`)
            }
          },
        })

        setWebllmReady(true)
        alert("🎉 AI initialization completed successfully!")
        console.log("🤖 WebLLM initialized successfully!")
        setOutput("AI ready! Enter a decision to generate butterfly effects.")
      } catch (error) {
        alert(`❌ AI initialization failed: ${error.message}`)
        console.error("Failed to initialize WebLLM:", error)
        setWebllmReady(false)
        setOutput("Using offline mode with pre-generated effects.<br/>🎲 Still fun, just not AI-powered!")
      }
    },
    [initializationAttempted],
  )

  // Force AI initialization function for the button
  const forceInitializeWebLLM = useCallback(() => {
    initializeWebLLM(true)
  }, [initializeWebLLM])

  useEffect(() => {
    // Check for saved theme preference, default to dark if none
    const savedTheme = localStorage.getItem("theme")
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && true)

    document.documentElement.classList.toggle("dark", shouldBeDark)

    // Only try to initialize WebLLM in browser environment
    if (typeof window !== "undefined") {
      setTimeout(() => initializeWebLLM(false), 1000)
    } else {
      // Server-side rendering - skip AI initialization
      setInitializationAttempted(true)
      setOutput("Offline mode ready - generate butterfly effects!")
    }
  }, [initializeWebLLM])

  const generateWithAI = async (input) => {
    const prompt = `Create a surreal, darkly funny, and absurd butterfly effect chain starting from: "${input}".

Write a chain of 5–6 bizarre but logically connected events. Each event must follow from the last in a ridiculous, imaginative way.
Use arrows (→) to separate each step in the chain.
Keep it short, punchy, and vivid — no explanations, no commentary.
Do not use first-person or second-person — just describe the unfolding chain of events.

just output the chain, no extra text.

Now generate one starting from:`

    try {
      const response = await engineRef.current.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 150,
      })

      const text = response.choices?.[0]?.message?.content?.trim()

      if (text) {
        const formattedText = text.replace(/→/g, '<span class="arrow">→</span>').replace(/\n/g, "<br/>")
        return `<div class="butterfly-chain"><br/>${formattedText}</div>`
      } else {
        throw new Error("No response generated")
      }
    } catch (error) {
      console.error("Generation error:", error)
      throw error
    }
  }

  const generateWithFallback = (input) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Pick a random fallback effect
        const randomEffect = fallbackEffects[Math.floor(Math.random() * fallbackEffects.length)]

        // Customize it slightly with the user's input
        const customizedEffect = randomEffect.replace(/^[^→]*/, `"${input}"`)

        const formattedText = customizedEffect.replace(/→/g, '<span class="arrow">→</span>')
        resolve(`<div class="butterfly-chain">Offline Mode:<br/>${formattedText}</div>`)
      }, 1500)
    })
  }

  const generateEffect = async () => {
    if (!userInput.trim()) {
      setOutput("⚠️ Please enter a decision first!")
      return
    }

    // Force AI initialization when generate is clicked
    if (!initializationAttempted) {
      await initializeWebLLM(false)
    }

    setIsLoading(true)
    setOutput("Generating butterfly effect...<br/>🧠 Creating your effect chain...")

    try {
      let result
      // If WebLLM is ready, use AI
      if (webllmReady && engineRef.current) {
        try {
          result = await generateWithAI(userInput)
        } catch (error) {
          console.error("AI generation failed:", error)
          // Fall back to offline mode
          result = await generateWithFallback(userInput)
        }
      } else {
        // Use fallback effects
        result = await generateWithFallback(userInput)
      }

      setOutput(result)
    } catch (error) {
      console.error("Generation failed:", error)
      setOutput("Something went wrong! Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      generateEffect()
    }
  }

  const getButtonText = () => {
    if (webllmReady) {
      return "Generate Effect (AI)"
    } else if (initializationAttempted) {
      return "Generate Effect (Offline)"
    } else {
      return "Loading..."
    }
  }

  const isButtonDisabled = () => {
    return !initializationAttempted || isLoading
  }

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
              onKeyPress={handleKeyPress}
              placeholder="e.g. Skipped brushing teeth at age 12"
              className="butterfly-input"
            />
            <button
              onClick={generateEffect}
              disabled={isButtonDisabled()}
              className={`retro-button generate-button ${isButtonDisabled() ? "disabled" : ""}`}
            >
              {getButtonText()}
            </button>
            <button
              onClick={forceInitializeWebLLM}
              className="retro-button"
              style={{ marginLeft: "1rem", backgroundColor: webllmReady ? "#00ff9d" : "" }}
              disabled={isLoading}
            >
              {webllmReady ? "AI Ready ✅" : "Force AI Init 🚀"}
            </button>
          </div>

          <div
            className={`output-container ${isLoading ? "loading" : ""}`}
            dangerouslySetInnerHTML={{ __html: output }}
          />

          <div className="info-section">
            <div className="info-text">
              <p>Powered by local AI (when available)</p>
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

export default ButterflyEffect
