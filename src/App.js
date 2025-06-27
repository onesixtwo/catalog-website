import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import GradeCalculator from "./pages/Grade Calculator"
import BJCounter from "./pages/BJ Counter"
import ButterflyEffect from "./pages/Butterfly Effect"
import NotFound from "./pages/404"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Grade Calculator" element={<GradeCalculator />} />
        <Route path="/BJ Counter" element={<BJCounter />} />
        <Route path="/Butterfly Effect" element={<ButterflyEffect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
