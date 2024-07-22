
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ProtectedRouteEducator from "../utils/ProtectedRouteEducator";

import WelcomePage from "./pages/WelcomePage/WelcomePage.tsx";
import ScanPage from "./pages/ScanPage/ScanPage";
import AnswerPage from "./pages/AnswerPage/AnswerPage";
import DragAndDropPage from "./pages/GamePages/DragAndDropPage";
import RainingWastePage from "./pages/GamePages/RainingWastePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import SignInPage from "./pages/SignInPage/SignInPage";
import ChildrenManagePage from "./pages/ChildrenManagePage/ChildrenManagePage";
import ProtectedRouteChildren from "../utils/ProtectedRouteChildren";

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
                    <ProtectedRouteChildren childrenRoute={<WelcomePage/>}>
                    </ProtectedRouteChildren>} />
                <Route path="/scan" element={
                    <ProtectedRouteChildren childrenRoute={<ScanPage/>}>
                    </ProtectedRouteChildren>}/>
                <Route path="/answer" element={
                    <ProtectedRouteChildren childrenRoute={<AnswerPage/>}>
                    </ProtectedRouteChildren>}/>
                <Route path="/game1" element={
                    <ProtectedRouteChildren childrenRoute={<DragAndDropPage/>}>
                    </ProtectedRouteChildren>}/>
                <Route path="/game2" element={
                    <ProtectedRouteChildren childrenRoute={<RainingWastePage/>}>
                    </ProtectedRouteChildren>}/>

                //Pages for educators
                <Route path="/childrenManage" element={
                    <ProtectedRouteEducator childrenRoute={<ChildrenManagePage/>}>
                    </ProtectedRouteEducator>}/>

            </Routes>
        </Router>
    </>
  )
}

export default App
