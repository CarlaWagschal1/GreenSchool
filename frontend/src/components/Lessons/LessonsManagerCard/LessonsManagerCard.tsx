import {Lesson} from "../../../interfaces/LessonInterface";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";

import "./LessonsManagerCard.css";


interface LessonsManagerCardProps {
    lesson: Lesson;

}

function LessonsManagerCard({lesson}: LessonsManagerCardProps) {


    const onEdit = (id: number) => {
        console.log("Edit lesson with id: " + id);
    }

    const onDelete = (id: number) => {
        console.log("Delete lesson with id: " + id);
    }

    const imageUrl = `http://localhost:5000${lesson.imageUrl}`;
    console.log("Image URL:", imageUrl);
  return (
    <>
        <div className="lessons-manager-card">
            <div className="lessons-manager-card-content">
                <div className="lessons-manager-card-info">
                    <h2>{lesson.name}</h2>
                    <p>{lesson.description}</p>
                </div>
                <div className="lessons-manager-card-img-container">
                    <img src={`http://localhost:5000${lesson.imageUrl}`} alt={lesson.name} />
                </div>
            </div>
            <div className="lessons-manager-card-buttons">
                <ButtonAppComponent content={"Edit"} action={() => onEdit(lesson._id)} type={"edit"}/>
                <ButtonAppComponent content={"Delete"} action={() => onDelete(lesson._id)} type={"delete"}/>
            </div>
        </div>
    </>
  );
}

export default LessonsManagerCard;