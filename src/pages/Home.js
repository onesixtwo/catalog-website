"use client"

import { Link } from "react-router-dom"
import Header from "../components/header"
import Footer from "../components/footer"
import "../styles/Home.css"
import { useState, useCallback } from "react"

function Home() {
  const [initializationAttempted, setInitializationAttempted] = useState(false)

  const initializeWebLLM = useCallback(async () => {
    if (initializationAttempted) return
    setInitializationAttempted(true)

    console.log("Initializing WebLLM from Home page...")

    try {
      // Only attempt dynamic import in browser environment
      const webllmModule = await import("https://esm.run/@mlc-ai/web-llm")
      const { CreateMLCEngine } = webllmModule

      // Initialize with a smaller, faster model
      const selectedModel = "Llama-3.2-1B-Instruct-q4f32_1-MLC"

      console.log(`Initializing ${selectedModel}...`)

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

  const handleButterflyClick = (e) => {
    e.preventDefault()
    initializeWebLLM()
    // Small delay to allow initialization to start, then navigate
    setTimeout(() => {
      window.location.href = "/Butterfly Effect"
    }, 100)
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="scanline"></div>
      <div className="crt-effect"></div>

      <Header />

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - Blackjack Card Counter */}
        <Link to="/BJ Counter" className="retro-card p-5 pixel-corners">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold">Blackjack Card Counter</h2>
          </div>
          <div className="mb-4 h-40 bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 card-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="miter"
                strokeWidth="1"
                d="M 2.59375 0 C 1.175781 0 0 1.175781 0 2.59375 L 0 18.40625 C 0 19.824219 1.175781 21 2.59375 21 L 14.40625 21 C 15.824219 21 17 19.824219 17 18.40625 L 17 2.59375 C 17 1.175781 15.824219 0 14.40625 0 Z M 2.59375 2 L 14.40625 2 C 14.789063 2 15 2.210938 15 2.59375 L 15 18.40625 C 15 18.789063 14.789063 19 14.40625 19 L 2.59375 19 C 2.210938 19 2 18.789063 2 18.40625 L 2 2.59375 C 2 2.210938 2.210938 2 2.59375 2 Z M 18 2.59375 L 18 4.6875 L 21.5 5.59375 C 21.800781 5.695313 22.007813 6.007813 21.90625 6.40625 L 18 21.6875 C 17.898438 21.988281 17.585938 22.195313 17.1875 22.09375 L 15.8125 21.6875 C 15.3125 21.886719 14.789063 22.09375 14.1875 22.09375 L 9.1875 22.09375 L 16.6875 24 L 17.5 24 C 18.699219 24 19.699219 23.199219 20 22 L 23.90625 6.6875 C 24.304688 5.386719 23.398438 3.894531 22 3.59375 Z M 12.40625 3 L 11.3125 6 L 11.6875 6 L 12 5.1875 L 13.09375 5.1875 L 13.40625 6 L 13.8125 6 L 12.6875 3 Z M 12.5 3.59375 L 12.90625 4.90625 L 12 4.90625 Z M 19.3125 6 L 17.5 8.59375 L 17.90625 8.6875 L 18.40625 8 L 19.5 8.3125 L 19.5 9.1875 L 19.90625 9.3125 L 19.59375 6.09375 Z M 8.40625 6.5 C 8.40625 6.5 4.5 9.1875 4.5 11.1875 C 4.5 12.386719 5.300781 13.1875 6.5 13.1875 C 7.101563 13.1875 7.792969 12.707031 8.09375 12.40625 C 8.09375 12.40625 7.789063 13.800781 7.1875 15 C 7.1875 15.199219 9.789063 15.101563 9.6875 15 C 9.085938 13.898438 8.8125 12.40625 8.8125 12.40625 C 9.210938 12.707031 9.804688 13.09375 10.40625 13.09375 C 11.605469 13.09375 12.40625 12.292969 12.40625 11.09375 C 12.40625 8.992188 8.507813 6.398438 8.40625 6.5 Z M 19.3125 6.59375 L 19.40625 8 L 18.59375 7.6875 Z M 3.1875 15 L 4.3125 18 L 4.59375 18 L 5.6875 15 L 5.3125 15 L 5 15.8125 L 3.90625 15.8125 L 3.59375 15 Z M 4.09375 16.09375 L 5 16.09375 L 4.5 17.40625 Z"
              />
            </svg>
          </div>
          <p className="text-lg">Keep Gambling Gang!</p>
        </Link>

        {/* Card 2 - Grade Calculator */}
        <Link to="/Grade Calculator" className="retro-card p-5 pixel-corners">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold">Grade Calculator TIP</h2>
          </div>
          <div className="mb-4 h-40 bg-primary/10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 card-icon"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
              />
            </svg>
          </div>
          <p className="text-lg">{"You're Cooked if you are using this."}</p>
        </Link>

        {/* Card 3 - Butterfly Effect */}
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

        {/* Card 4 - IDK */}
        <Link to="/*" className="retro-card p-5 pixel-corners">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold">soon</h2>
          </div>
          <div className="mb-4 h-40 bg-primary/10 flex items-center justify-center">{/* SVG ICON HERE */}</div>
          <p className="text-lg">nothing to see here</p>
        </Link>

        {/* Card 5 - IDK */}
        <Link to="/*" className="retro-card p-5 pixel-corners">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold">soon</h2>
          </div>
          <div className="mb-4 h-40 bg-primary/10 flex items-center justify-center">{/* SVG ICON HERE */}</div>
          <p className="text-lg">nothing to see here</p>
        </Link>

        {/* Card 6 - IDK */}
        <Link to="/*" className="retro-card p-5 pixel-corners">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-2xl font-bold">soon</h2>
          </div>
          <div className="mb-4 h-40 bg-primary/10 flex items-center justify-center">{/* SVG ICON HERE */}</div>
          <p className="text-lg">nothing to see here</p>
        </Link>
      </main>

      <Footer />
    </div>
  )
}

export default Home
