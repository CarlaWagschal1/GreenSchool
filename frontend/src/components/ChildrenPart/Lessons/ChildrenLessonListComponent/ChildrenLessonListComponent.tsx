import {useEffect, useState} from "react";
import {Lesson} from "../../../../interfaces/LessonInterface";
import axios from "axios";
import ChildrenLessonCard from "../ChildrenLessonCard/ChildrenLessonCard";

import Close from "../../../../assets/close.png";
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";

import "./ChildrenLessonListComponent.css";

function ChildrenLessonListComponent() {
    const navigate = useNavigate();
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [lessonSelected, setLessonSelected] = useState<Lesson | null>(null);

    const fetchLessons = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
            const response = await axios.get("http://localhost:5000/api/lessons/educator", {headers: headers});
            console.log("Fetched lessons:", response.data);
            if(response.data){
                setLessons(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchLessons().catch(console.error);
    }, [])

    const showLessonDescription = () => {
        const popup = document.querySelector(".children-lesson-description-popup") as HTMLElement;
        if(popup){
            popup.style.display = "block";
        }
    }

    const hideLessonDescription = () => {
        const popup = document.querySelector(".children-lesson-description-popup") as HTMLElement;
        if(popup){
            popup.style.display = "none";
        }
    }

    const onLessonClick = (lesson: Lesson) => {
        console.log("Lesson clicked:", lesson);
        setLessonSelected(lesson);
        showLessonDescription();
    }

    const onClose = () => {
        setLessonSelected(null);
        hideLessonDescription();
    }

    const goLearn = () => {
        console.log("Go learn lesson:", lessonSelected);
        navigate(`/children-lesson/${lessonSelected?._id}`);
    }


    return (
        <main>
            <div className="children-lesson-list">
                <h1 className="children-lessons-list-title">Which lesson do you want to learn today ?</h1>
                {(lessons.length === 0) ?
                (<div className="children-no-lessons-found-container">
                    <p>No lessons found</p>
                </div>) :
                (<div className="children-lessons-list-content">
                    {lessons.map((lesson) => {
                        return (
                            <ChildrenLessonCard key={lesson._id} lesson={lesson} onLessonClick={onLessonClick} />
                        )
                    })}
                </div>)}
            </div>
            <div className="children-lesson-description-popup">
                <div className="children-lesson-description-popup-css">
                    <div className="children-lesson-description-popup-content">
                        <h3 className="children-lesson-description-popup-title">{lessonSelected?.name}</h3>
                        <p className="children-lesson-description-popup-description">{lessonSelected?.description}</p>
                        <ButtonAppComponent content={"LET'S GO"} type={"classic"} action={goLearn}/>
                        <div className="children-lesson-description-close-button" onClick={onClose}>
                            <img src={Close} alt={"Close"}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ChildrenLessonListComponent;