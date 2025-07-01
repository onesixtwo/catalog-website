"use client"

import { useEffect } from "react"
import "../styles/footer.css"

function Footer() {
  useEffect(() => {
    // Konami code easter egg
    let konamiCode = []
    const konamiSequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "KeyB",
      "KeyA",
    ]

    const handleKeyDown = (e) => {
      konamiCode.push(e.code)

      // Keep only the last 10 keys
      if (konamiCode.length > 10) {
        konamiCode.shift()
      }

      // Check if the sequence matches
      if (konamiCode.length === 10 && konamiCode.every((key, index) => key === konamiSequence[index])) {
        // Easter egg activated!
        document.body.style.animation = "rainbow 2s infinite"

        // Add rainbow animation
        const style = document.createElement("style")
        style.textContent = `
          @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
          }
        `
        document.head.appendChild(style)

        // Show message
        alert("🎉 KONAMI CODE ACTIVATED! 🎉\nRAINBOW MODE ENABLED!")

        // Reset after 10 seconds
        setTimeout(() => {
          document.body.style.animation = ""
          style.remove()
        }, 10000)

        // Reset the code
        konamiCode = []
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleAboutClick = () => {
  window.open("https://vargasss.netlify.app/", "_blank");
  };

  
  return (
    <footer className="footer-container">
      <div className="retro-container">
        <p className="footer-text">
          © 2003 RANDOM BULLSHIT COLLECTION <span className="blink">_</span>
        </p>
        <p className="footer-subtext">One Random Shit at a time.</p>
        <div className="footer-buttons">
          <div className="footer-button" onClick={handleAboutClick}>
            ABOUT ME
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
