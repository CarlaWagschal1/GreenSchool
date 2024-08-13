import {Lesson} from "../../../../interfaces/LessonInterface";

import "./ChildrenLessonCard.css";

interface ChildrenLessonCardProps {
    lesson: Lesson;
    onLessonClick: (lesson: Lesson) => void;
}


function ChildrenLessonCard(props: ChildrenLessonCardProps) {

    return (
    <>
        <div className="children-lesson-card" onClick={() => props.onLessonClick(props.lesson)}>
            <h2>{props.lesson.name}</h2>
            <div className="children-lesson-card-img-container">
              <img src={"http://localhost:5000" + props.lesson.imageUrl} alt={props.lesson.name}/>
            </div>
        </div>
    </>
    );
}

export default ChildrenLessonCard;