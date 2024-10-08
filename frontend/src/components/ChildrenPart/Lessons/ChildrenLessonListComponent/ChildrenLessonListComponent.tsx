import {useEffect, useState} from "react";
import {Lesson} from "../../../../interfaces/LessonInterface";
import axios from "axios";
import ChildrenLessonCard from "../ChildrenLessonCard/ChildrenLessonCard";

import Close from "../../../../assets/close.png";
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./ChildrenLessonListComponent.css";

function ChildrenLessonListComponent() {
    const navigate = useNavigate();
    const { t } = useTranslation();
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

    const goBack = () => {
        navigate("/welcome");
    }

    const handleFontSize = () => {
        const fontSize = localStorage.getItem('childrenFontSize');
        const childrenLessonDescriptionPopupTitle = document.querySelector(".children-lesson-description-popup-title") as HTMLElement;
        const childrenLessonDescriptionPopupDescription = document.querySelector(".children-lesson-description-popup-description") as HTMLElement;

        if(fontSize){
            if(fontSize == "small"){
                childrenLessonDescriptionPopupTitle.style.fontSize = "var(--children-font-size-choice-title-small)";
                childrenLessonDescriptionPopupDescription.style.fontSize = "var(--children-font-size-choice-paragraph-small)";
            }
            else if(fontSize == "medium"){
                childrenLessonDescriptionPopupTitle.style.fontSize = "var(--children-font-size-choice-title-medium)";
                childrenLessonDescriptionPopupDescription.style.fontSize = "var(--children-font-size-choice-paragraph-medium)";
            }
            else if(fontSize == "large"){
                childrenLessonDescriptionPopupTitle.style.fontSize = "var(--children-font-size-choice-title-large)";
                childrenLessonDescriptionPopupDescription.style.fontSize = "var(--children-font-size-choice-paragraph-large)";
            }
        }
    }

    useEffect(() => {
        handleFontSize();
    }, [])


    return (
        <main>
            <div className="children-lesson-list">
                <h1 className="children-lessons-list-title"> { t('lesson-choice') }</h1>
                {(lessons.length === 0) ?
                (<div className="children-no-lessons-found-container">
                    <p>{t('no-lesson-found')}</p>
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
                        <ButtonAppComponent content={t('lets-go')} type={"classic"} action={goLearn}/>
                        <div className="children-lesson-description-close-button" onClick={onClose}>
                            <img src={Close} alt={"Close"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="children-lesson-list-back-btn">
                <ButtonAppComponent content={t('back')} type={"classic"} action={goBack}/>
            </div>
        </main>
    )
}

export default ChildrenLessonListComponent;