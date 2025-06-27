"use client"

import { useNavigate } from "react-router-dom"
import { useState, useCallback } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../styles/Home.css"

function Home() {
  const navigate = useNavigate()
  const [initializationAttempted, setInitializationAttempted] = useState(false)

  const initializeWebLLM = useCallback(async () => {
    if (initializationAttempted) return
    setInitializationAttempted(true)

    console.log("Initializing WebLLM from Home page...")

    try {
      const webllmModule = await import("https://esm.run/@mlc-ai/web-llm")
      const { CreateMLCEngine } = webllmModule

      const selectedModel = "Llama-3.2-1B-Instruct-q4f32_1-MLC"

      await CreateMLCEngine(selectedModel, {
        initProgressCallback: (report) => {
          console.log("WebLLM Init Progress:", report)
        },
      })

      console.log("🤖 WebLLM initialized successfully from Home!")
    } catch (error) {
      console.error("Failed to initialize WebLLM from Home:", error)
    }
  }, [initializationAttempted])

  const handleButterflyClick = async () => {
    await initializeWebLLM()
    navigate("/Butterfly Effect") // keeps the space
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="scanline"></div>
      <div className="crt-effect"></div>

      <Header />

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - Blackjack Card Counter */}
        <div className="retro-card p-5 pixel-corners">
          <h2 className="text-2xl font-bold mb-3">Blackjack Card Counter</h2>
          <div className="mb-4 h-40 bg-primary/10 flex items-center justify-center">
            {/* SVG here */}
          </div>
          <p className="text-lg">Keep Gambling Gang!</p>
        </div>

        {/* Card 2 - Grade Calculator */}
        <div className="retro-card p-5 pixel-corners">
          <h2 className="text-2xl font-bold mb-3">Grade Calculator TIP</h2>
          <div className="mb-4 h-40 bg-primary/10 flex items-center justify-center">
            {/* SVG here */}
          </div>
          <p className="text-lg">You're Cooked if you are using this.</p>
        </div>

        {/* ✅ Card 3 - Butterfly Effect */}
        <div onClick={handleButterflyClick} className="retro-card p-5 pixel-corners" style={{ cursor: "pointer" }}>
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold">Butterfly Effect</h2>
          </div>
          <div className="mb-4 h-40 bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 card-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 12c-1-2.5-3-4.5-5-5.5S3 8 3.5 10.5c.5 2.5 2.5 3.5 4.5 3 M12 12c-1 2.5-3 4.5-5 5.5S3 16 3.5 13.5c.5-2.5 2.5-3.5 4.5-3 M12 12c1-2.5 3-4.5 5-5.5s4 1 3.5 3.5c-.5 2.5-2.5 3.5-4.5 3 M12 12c1 2.5 3 4.5 5 5.5s4-1 3.5-3.5c-.5-2.5-2.5-3.5-4.5-3 M12 6v12 M12 6c-.5-1-1.5-1.5-2-2 M12 6c.5-1 1.5-1.5 2-2"
              />
            </svg>
          </div>
          <p className="text-lg">tiny decision and watch chaos unfold</p>
        </div>

        {/* Other filler cards */}
        {[4, 5, 6].map((i) => (
          <div key={i} className="retro-card p-5 pixel-corners">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-2xl font-bold">soon</h2>
            </div>
            <div className="mb-4 h-40 bg-primary/10 flex items-center justify-center">{/* Placeholder SVG */}</div>
            <p className="text-lg">nothing to see here</p>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  )
}

export default Home
