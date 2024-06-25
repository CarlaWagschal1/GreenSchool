
import './App.css'
import HomePage from "./pages/HomePage.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScanPage from "./pages/ScanPage/ScanPage";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/scan" element={<ScanPage />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
