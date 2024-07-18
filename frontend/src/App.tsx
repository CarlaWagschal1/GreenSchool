
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProtectedRoute from "../utils/ProtectedRoute";

import WelcomePage from "./pages/WelcomePage/WelcomePage.tsx";
import ScanPage from "./pages/ScanPage/ScanPage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import DragAndDropPage from "./pages/GamePages/DragAndDropPage";
import RainingWastePage from "./pages/GamePages/RainingWastePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import ChildrenManagePage from "./pages/ChildrenManagePage/ChildrenManagePage";

function App() {

  return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signin" element={<SignInPage />} />


                //Pages for children
                <Route path="/welcome" element={
                    <ProtectedRoute childrenRoute={<WelcomePage/>}>
                    </ProtectedRoute>} />
                <Route path="/scan" element={
                    <ProtectedRoute childrenRoute={<ScanPage/>}>
                    </ProtectedRoute>}/>
                <Route path="/answer" element={
                    <ProtectedRoute childrenRoute={<AnswerPage/>}>
                    </ProtectedRoute>}/>
                <Route path="/game1" element={
                    <ProtectedRoute childrenRoute={<DragAndDropPage/>}>
                    </ProtectedRoute>}/>
                <Route path="/game2" element={
                    <ProtectedRoute childrenRoute={<RainingWastePage/>}>
                    </ProtectedRoute>}/>

                //Pages for educators
                <Route path="/childrenManage" element={
                    <ProtectedRoute childrenRoute={<ChildrenManagePage/>}>
                    </ProtectedRoute>}/>

            </Routes>
        </Router>
    </>
  )
}

export default App
