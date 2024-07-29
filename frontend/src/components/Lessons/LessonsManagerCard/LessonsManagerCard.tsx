import {Lesson} from "../../../interfaces/LessonInterface";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";


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
            <p>{lesson.name}</p>
            <p>{lesson.description}</p>
            <img src={`http://localhost:5000${lesson.imageUrl}`} alt={lesson.name} />
            <ButtonAppComponent content={"Edit"} action={() => onEdit(lesson.id)}/>
            <ButtonAppComponent content={"Delete"} action={() => onDelete(lesson.id)}/>
        </div>
    </>
  );
}

export default LessonsManagerCard;