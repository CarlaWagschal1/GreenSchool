import {useEffect, useState} from "react";
import {Lesson} from "../../../interfaces/LessonInterface";
import ChaptersListComponent from "../Chapters/ChaptersListComponent/ChaptersListComponent";

import "./LessonsModificationComponent.css";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

function LessonsModificationComponent() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [lesson, setLesson] = useState<Lesson>();

    useEffect(() => {
        const getLesson = async () => {
            const lessonId = window.location.pathname.split("/")[2];
            const token = localStorage.getItem("token");
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }

            try {
                const response = await fetch(`http://localhost:5000/api/lessons/${lessonId}`, {
                    method: 'GET',
                    headers: headers
                });
                const data = await response.json();
                console.log(data)
                setLesson(data);
            } catch (error) {
                console.error(error);
            }
        }
        getLesson();
    }, []);


    const goToLessonManager = () => {
        navigate("/lessons-manager");
    }







    return (
        <main>
            <div className="lessons-modification-content">
                <div className="lessons-modification-header">
                    <div className="lessons-modification-infos">
                        <div className="lessons-modification-infos-header">
                            <h2>{lesson?.name}</h2>
                            <p className="lessons-modification-description">{lesson?.description}</p>
                        </div>
                        <div className={"lessons-modification-edit"}>
                            <ButtonAppComponent content={t('edit-lesson')} type={"classic"} />
                        </div>
                    </div>
                    <div className="lessons-modification-img-container">
                        <img src={"http://localhost:5000" + lesson?.imageUrl} alt={lesson?.name} />
                    </div>
                </div>
                <div className="lessons-modification-chapters">
                    <ChaptersListComponent/>
                </div>
            </div>
            <div className="lessons-modification-buttons">
                <ButtonAppComponent content={t('back')} type={"classic"} action={goToLessonManager}/>
            </div>
        </main>
    )
}

export default LessonsModificationComponent;