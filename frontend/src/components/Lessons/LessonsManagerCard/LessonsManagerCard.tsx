import {Lesson} from "../../../interfaces/LessonInterface";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";

import "./LessonsManagerCard.css";
import {useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";


interface LessonsManagerCardProps {
    lesson: Lesson;
    isDeleted: (deleted: boolean) => void;

}

function LessonsManagerCard({lesson, isDeleted}: LessonsManagerCardProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();


    const onEdit = (id: number) => {
        navigate(`/lessons-modification/${id}`)
    }

    const onDelete = (id: number) => {
        console.log("Delete", id);

        try {
            fetch(`http://localhost:5000/api/lessons/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(response => {
                if (response.ok) {
                    console.log("Deleted");
                    isDeleted(true);
                } else {
                    console.error("Error");
                }

            });
        }
        catch (error) {
            console.error(error);
        }
    }

    const closeWarning = () => {
        const popup = document.getElementById("delete-warning-" + lesson._id) as HTMLElement;
        popup.style.display = 'none';
    }

    const showWarning = () => {
        const popup = document.getElementById("delete-warning-" + lesson._id) as HTMLElement;
        popup.style.display = 'flex';
    }

    const imageUrl = `http://localhost:5000${lesson.imageUrl}`;
    console.log("Image URL:", imageUrl);
  return (
    <>
        <div className="lessons-manager-card">
            <div className="lessons-manager-card-content">
                <div className="lessons-manager-card-info">
                    <h2>{lesson.name}</h2>
                    <p className="lessons-manager-card-description">{lesson.description}</p>
                </div>
                <div className="lessons-manager-card-img-container">
                    <img src={`http://localhost:5000${lesson.imageUrl}`} alt={lesson.name} />
                </div>
            </div>
            <div className="lessons-manager-card-buttons">
                <ButtonAppComponent content={t('edit')} action={() => onEdit(lesson._id)} type={"edit"}/>
                <ButtonAppComponent content={t('delete')} action={showWarning} type={"delete"}/>
            </div>
            <div className="lesson-card-delete-warning-popup" id={"delete-warning-" + lesson._id}>
                <div className="lesson-card-delete-warning-popup-content">
                    <h1 className="lesson-delete-title">{t("delete-lesson-warning-title")}</h1>
                    <p>{t("delete-lesson-warning")}</p>
                    <div className="lesson-card-delete-warning-popup-content-btn">
                        <ButtonAppComponent content={t("yes")} type={"delete"} action={() => onDelete(lesson._id)} />
                        <ButtonAppComponent content={t("no")} type={"classic"} action={closeWarning} />
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default LessonsManagerCard;