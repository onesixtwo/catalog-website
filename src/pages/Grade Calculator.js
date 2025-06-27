"use client"

import { useState, useEffect, useCallback } from "react"
import Header from "../components/header"
import Footer from "../components/footer"
import "../styles/Grade Calculator.css"

function GradeCalculator() {
  const [currentCard, setCurrentCard] = useState(0)
  const [prelimData, setPrelimData] = useState({
    classStanding: "",
    prelimExam: "",
    prelimGrade: "--",
  })
  const [midtermData, setMidtermData] = useState({
    prelimGradeInput: "",
    midtermCS: "",
    midtermExam: "",
    midtermGrade: "--",
  })
  const [finalsData, setFinalsData] = useState({
    finalMidtermGrade: "",
    finalsCS: "",
    finalsExam: "",
    finalGrade: "--",
  })

  const totalCards = 3

  useEffect(() => {
    // Check for saved theme preference, default to dark if none
    const savedTheme = localStorage.getItem("theme")
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && true)

    document.documentElement.classList.toggle("dark", shouldBeDark)
  }, [])

  // Move calculation functions inside useCallback
  const calculatePrelimGrade = useCallback(() => {
    const classStanding = Number.parseFloat(prelimData.classStanding) || 0
    const prelimExam = Number.parseFloat(prelimData.prelimExam) || 0
    const prelimGrade = classStanding * 0.5 + prelimExam * 0.5
    setPrelimData((prev) => ({
      ...prev,
      prelimGrade: prelimGrade.toFixed(2),
    }))
  }, [prelimData.classStanding, prelimData.prelimExam])

  const calculateMidtermGrade = useCallback(() => {
    const prelimGrade = Number.parseFloat(midtermData.prelimGradeInput) || 0
    const midtermCS = Number.parseFloat(midtermData.midtermCS) || 0
    const midtermExam = Number.parseFloat(midtermData.midtermExam) || 0
    const midtermGrade = (prelimGrade * 1) / 3 + ((midtermCS * 0.5 + midtermExam * 0.5) * 2) / 3
    setMidtermData((prev) => ({
      ...prev,
      midtermGrade: midtermGrade.toFixed(2),
    }))
  }, [midtermData.prelimGradeInput, midtermData.midtermCS, midtermData.midtermExam])

  const calculateFinalGrade = useCallback(() => {
    const midtermGrade = Number.parseFloat(finalsData.finalMidtermGrade) || 0
    const finalsCS = Number.parseFloat(finalsData.finalsCS) || 0
    const finalsExam = Number.parseFloat(finalsData.finalsExam) || 0
    const finalGrade = (midtermGrade * 1) / 3 + ((finalsCS * 0.5 + finalsExam * 0.5) * 2) / 3
    setFinalsData((prev) => ({
      ...prev,
      finalGrade: finalGrade.toFixed(2),
    }))
  }, [finalsData.finalMidtermGrade, finalsData.finalsCS, finalsData.finalsExam])

  // Update useEffect calls
  useEffect(() => {
    calculatePrelimGrade()
  }, [calculatePrelimGrade])

  useEffect(() => {
    calculateMidtermGrade()
  }, [calculateMidtermGrade])

  useEffect(() => {
    calculateFinalGrade()
  }, [calculateFinalGrade])

  const showNextCard = () => {
    setCurrentCard((prev) => (prev + 1) % totalCards)
  }

  const showPreviousCard = () => {
    setCurrentCard((prev) => (prev - 1 + totalCards) % totalCards)
  }

  const handlePrelimChange = (field, value) => {
    setPrelimData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleMidtermChange = (field, value) => {
    setMidtermData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFinalsChange = (field, value) => {
    setFinalsData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen p-4">
      <div className="scanline"></div>
      <div className="crt-effect"></div>

      <Header />

      <main className="main-container">
        <h1 className="page-title">Grade Calculator</h1>

        <div className="card-container">
          {/* Prelim Card */}
          <div className={`retro-card pixel-corners card ${currentCard === 0 ? "" : "hidden"}`}>
            <h2 className="card-title">PRELIM</h2>
            <label htmlFor="class-standing">Class standing:</label>
            <input
              type="number"
              id="class-standing"
              placeholder="Enter Class Standing"
              step="any"
              value={prelimData.classStanding}
              onChange={(e) => handlePrelimChange("classStanding", e.target.value)}
            />
            <label htmlFor="prelim-exam">Prelim exam:</label>
            <input
              type="number"
              id="prelim-exam"
              placeholder="Enter Prelim Exam"
              step="any"
              value={prelimData.prelimExam}
              onChange={(e) => handlePrelimChange("prelimExam", e.target.value)}
            />
            <div className="grade">
              <h3>PRELIM GRADE</h3>
              <span>{prelimData.prelimGrade}</span>
            </div>
          </div>

          {/* Midterm Card */}
          <div className={`retro-card pixel-corners card ${currentCard === 1 ? "" : "hidden"}`}>
            <h2 className="card-title">MIDTERM</h2>
            <label htmlFor="prelim-grade-input">Prelim grade:</label>
            <input
              type="number"
              id="prelim-grade-input"
              placeholder="Enter Prelim Grade"
              step="any"
              value={midtermData.prelimGradeInput}
              onChange={(e) => handleMidtermChange("prelimGradeInput", e.target.value)}
            />
            <label htmlFor="midterm-cs">Midterm CS:</label>
            <input
              type="number"
              id="midterm-cs"
              placeholder="Enter Midterm CS"
              step="any"
              value={midtermData.midtermCS}
              onChange={(e) => handleMidtermChange("midtermCS", e.target.value)}
            />
            <label htmlFor="midterm-exam">Midterm exam:</label>
            <input
              type="number"
              id="midterm-exam"
              placeholder="Enter Midterm Exam"
              step="any"
              value={midtermData.midtermExam}
              onChange={(e) => handleMidtermChange("midtermExam", e.target.value)}
            />
            <div className="grade">
              <h3>MIDTERM GRADE</h3>
              <span>{midtermData.midtermGrade}</span>
            </div>
          </div>

          {/* Finals Card */}
          <div className={`retro-card pixel-corners card ${currentCard === 2 ? "" : "hidden"}`}>
            <h2 className="card-title">FINALS</h2>
            <label htmlFor="final-midterm-grade">Midterm grade:</label>
            <input
              type="number"
              id="final-midterm-grade"
              placeholder="Enter Midterm Grade"
              step="any"
              value={finalsData.finalMidtermGrade}
              onChange={(e) => handleFinalsChange("finalMidtermGrade", e.target.value)}
            />
            <label htmlFor="finals-cs">Finals CS:</label>
            <input
              type="number"
              id="finals-cs"
              placeholder="Enter Finals CS"
              step="any"
              value={finalsData.finalsCS}
              onChange={(e) => handleFinalsChange("finalsCS", e.target.value)}
            />
            <label htmlFor="finals-exam">Finals exam:</label>
            <input
              type="number"
              id="finals-exam"
              placeholder="Enter Finals Exam"
              step="any"
              value={finalsData.finalsExam}
              onChange={(e) => handleFinalsChange("finalsExam", e.target.value)}
            />
            <div className="grade">
              <h3>FINAL GRADE</h3>
              <span>{finalsData.finalGrade}</span>
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
          <button className="retro-button" onClick={showPreviousCard}>
            {"<<"}
          </button>
          <button className="retro-button" onClick={showNextCard}>
            {">>"}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default GradeCalculator
