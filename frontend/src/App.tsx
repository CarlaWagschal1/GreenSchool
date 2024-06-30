
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from "./pages/HomePage.tsx";
import ScanPage from "./pages/ScanPage/ScanPage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import DragAndDropPage from "./pages/GamePages/DragAndDropPage";
import RainingWastePage from "./pages/GamePages/RainingWastePage";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/scan" element={<ScanPage />} />
                <Route path="/answer" element={<AnswerPage />} />
                <Route path="/game1" element={<DragAndDropPage />} />
                <Route path="/game2" element={<RainingWastePage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
