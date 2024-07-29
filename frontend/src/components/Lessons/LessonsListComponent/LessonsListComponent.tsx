import {Lesson} from "../../../interfaces/LessonInterface";
import {useEffect, useState} from "react";
import LessonsManagerCard from "../LessonsManagerCard/LessonsManagerCard";


function LessonsListComponent() {

    const [lessons, setLessons] = useState<Lesson[]>([]);

    const fetchLessons = async () => {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        try {
            const response = await fetch("http://localhost:5000/api/lessons", {headers: headers});
            const data = await response.json();
            console.log("Fetched lessons:", data);
            setLessons(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchLessons().catch(console.error);
    }, [])



    return (
        <main>
            <h1>Lessons</h1>
            <p>Here are the lessons</p>
            <div>
                {lessons.map((lesson) => {
                    return (
                        <LessonsManagerCard lesson={lesson}></LessonsManagerCard>
                    )
                })}
            </div>
        </main>
    )

}

export default LessonsListComponent;