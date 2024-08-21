import {Lesson} from "../../../../interfaces/LessonInterface";

import "./ChildrenLessonCard.css";
import {useEffect} from "react";

interface ChildrenLessonCardProps {
    lesson: Lesson;
    onLessonClick: (lesson: Lesson) => void;
}


function ChildrenLessonCard(props: ChildrenLessonCardProps) {

    const handleFontSize = () => {
        const fontSize = localStorage.getItem('childrenFontSize');
        const title = document.querySelector(".children-lesson-card-title") as HTMLElement;
        if(fontSize){
            if(fontSize == "small"){
                title.style.fontSize = "var(--children-font-size-choice-title-small)";
            }
            else if(fontSize == "medium"){
                title.style.fontSize = "var(--children-font-size-choice-title-medium)";
            }
            else if(fontSize == "large"){
                title.style.fontSize = "var(--children-font-size-choice-title-large)";
            }
        }
    }

    useEffect(() => {
        handleFontSize();
    }, [])


    return (
    <>
        <div className="children-lesson-card" onClick={() => props.onLessonClick(props.lesson)}>
            <h2 className="children-lesson-card-title">{props.lesson.name}</h2>
            <div className="children-lesson-card-img-container">
              <img src={"http://localhost:5000" + props.lesson.imageUrl} alt={props.lesson.name}/>
            </div>
        </div>
    </>
    );
}

export default ChildrenLessonCard;