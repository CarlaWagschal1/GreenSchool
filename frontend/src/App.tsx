
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
import ChildrenStatsPage from "./pages/ChildrenStatPage/ChildrenStatsPage";
import LessonsCreationPage from "./pages/LessonsCreationPage/LessonsCreationPage";
import EducatorWelcomePage from "./pages/EducatorWelcomePage/EducatorWelcomePage";
import LessonsManagerPage from "./pages/LessonsManagerPage/LessonsManagerPage";
import LessonsModificationPage from "./pages/LessonsModificationPage/LessonsModificationPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ChildrenLessonPage from "./pages/ChildrenLessonPage/ChildrenLessonPage";
import ChildrenLessonListPage from "./pages/ChildrenLessonListPage/ChildrenLessonListPage";

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
                <Route path="/children-lesson-list" element={
                    <ProtectedRouteChildren childrenRoute={<ChildrenLessonListPage/>}>
                    </ProtectedRouteChildren>}/>
                <Route path="/children-lesson/:lessonId" element={
                    <ProtectedRouteChildren childrenRoute={<ChildrenLessonPage/>}>
                    </ProtectedRouteChildren>}/>


                //Pages for educators
                <Route path="/educator" element={
                    <ProtectedRouteEducator childrenRoute={<EducatorWelcomePage/>}>
                    </ProtectedRouteEducator>}/>
                <Route path="/children-manager" element={
                    <ProtectedRouteEducator childrenRoute={<ChildrenManagePage/>}>
                    </ProtectedRouteEducator>}/>
                <Route path="/children-stats" element={
                    <ProtectedRouteEducator childrenRoute={<ChildrenStatsPage/>}>
                    </ProtectedRouteEducator>}/>
                <Route path="/lessons-manager" element={
                    <ProtectedRouteEducator childrenRoute={<LessonsManagerPage/>}>
                    </ProtectedRouteEducator>}/>
                <Route path="/new-lesson" element={
                    <ProtectedRouteEducator childrenRoute={<LessonsCreationPage/>}>
                    </ProtectedRouteEducator>}/>
                <Route path="/lessons-modification/:lessonId"
                       element={
                    <ProtectedRouteEducator childrenRoute={<LessonsModificationPage/>}>
                    </ProtectedRouteEducator>}/>
                <Route path="/profile" element={
                    <ProtectedRouteEducator childrenRoute={<ProfilePage/>}>
                    </ProtectedRouteEducator>}/>

            </Routes>
        </Router>
    </>
  )
}

export default App
