import {Lesson} from "../../../interfaces/LessonInterface";
import {useEffect, useState} from "react";
import LessonsManagerCard from "../LessonsManagerCard/LessonsManagerCard";

import "./LessonsListComponent.css";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";


function LessonsListComponent() {
    const navigate = useNavigate();

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

    const goToNewLesson = () => {
        navigate("/new-lesson")
    }

    const goToHome = () => {
        navigate("/educator");
    }

    const handleDelete = (deleted: boolean) => {
        if(deleted){
            fetchLessons().catch(console.error);
        }
    }



    return (
        <main>
            <div className="lessons-list-container">
                <h1>Lessons</h1>
                <div className="lessons-list-content">
                    {(lessons.length === 0) ?
                        (<div className="no-lessons-found-container">
                            <p>No lessons found</p>
                            <ButtonAppComponent content={"New Lesson"} action={goToNewLesson} type={"new"}/>
                        </div>) :
                        lessons.map((lesson) => {
                        return (
                            <LessonsManagerCard key={lesson._id} lesson={lesson} isDeleted={handleDelete}></LessonsManagerCard>
                        )
                    })}
                </div>
            </div>
            <div className="lesson-home-btn">
                <ButtonAppComponent content={"BACK"} action={goToHome} type={"classic"}></ButtonAppComponent>
            </div>
            <div className="lesson-creation-btn">
                <ButtonAppComponent content={"New Lesson"} action={goToNewLesson} type={"new"}></ButtonAppComponent>
            </div>
        </main>
    )

}

export default LessonsListComponent;