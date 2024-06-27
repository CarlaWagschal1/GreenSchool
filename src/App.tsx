
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from "./pages/HomePage.tsx";
import ScanPage from "./pages/ScanPage/ScanPage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/scan" element={<ScanPage />} />
                <Route path="/answer" element={<AnswerPage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
