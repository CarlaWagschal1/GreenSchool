import {Lesson} from "../../../../interfaces/LessonInterface";
import {useEffect, useState} from "react";
import {Chapter} from "../../../../interfaces/ChapterInterface";
import axios from "axios";
import ChildrenChapterComponent from "../Chapters/ChildrenChapter/ChildrenChapterComponent";


function ChildrenLessonComponent() {

    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [chapter, setChapter] = useState<Chapter[]>([]);
    const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
    const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(0);
    const [totalChapters, setTotalChapters] = useState<number>(0);


    const fetchLesson = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }

            const lessonId = window.location.pathname.split("/")[2];
            const response = await axios.get(`http://localhost:5000/api/lessons/${lessonId}`, {headers: headers});
            console.log("Fetched lesson:", response.data);
            if (response.data) {
                setLesson(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchChapters = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }

            const lessonId = window.location.pathname.split("/")[2];
            const response = await axios.get(`http://localhost:5000/api/chapters/lesson/${lessonId}`, {headers: headers});
            console.log("Fetched chapters:", response.data);
            if (response.data) {
                setChapter(response.data);
            }


        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchLesson().catch(console.error);
        fetchChapters().catch(console.error);
    }, []);

    useEffect(() => {
        if (chapter.length > 0) {
            setCurrentChapter(chapter[0]);
            setTotalChapters(chapter.length);
            setCurrentChapterIndex(0);
        }
    }, [chapter]);

    const changeChapter = (change: string) => {
        if (change === "PREVIOUS") {
            if (currentChapterIndex > 0) {
                setCurrentChapterIndex(currentChapterIndex - 1);
                setCurrentChapter(chapter[currentChapterIndex - 1]);
            }
        } else if (change === "NEXT") {
            if (currentChapterIndex < totalChapters - 1) {
                setCurrentChapterIndex(currentChapterIndex + 1);
                setCurrentChapter(chapter[currentChapterIndex + 1]);
            }
        }
    }

    return (
        <main>
            <ChildrenChapterComponent lessonName={lesson?.name} chapter={currentChapter} numberChapter={currentChapterIndex} numberTotalChapters={totalChapters} changeChapter={changeChapter} />
        </main>
    );
}


export default ChildrenLessonComponent;