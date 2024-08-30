import {Quiz} from "../../../interfaces/QuizInterface";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";

import {useTranslation} from "react-i18next";
import axios from "axios";

import "./QuizCard.css";
import {useNavigate} from "react-router-dom";

interface QuizCardProps {
    quiz: Quiz;
    isDeleted: (deleted: boolean) => void;
}

function QuizCard(props: QuizCardProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const showWarning = () => {
        const popup = document.getElementById("delete-warning-" + props.quiz._id) as HTMLElement;
        popup.style.display = 'flex';
    }

    const closeWarning = () => {
        const popup = document.getElementById("delete-warning-" + props.quiz._id) as HTMLElement;
        popup.style.display = 'none';
    }

    const deleteQuiz = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
            };

            const response = await axios.delete('http://localhost:5000/api/quizs/' + props.quiz._id, { headers: headers });

            if(response.status === 200) {
                console.log('Quiz deleted');
                props.isDeleted(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const goToEdit = () => {
        navigate('/quiz-modification/' + props.quiz._id);
    }

    return (
    <div className="quiz-card">
        <div className="quiz-card-content">
            <div className="quiz-card-info">
                <h2>{props.quiz.name}</h2>
                <p className="quiz-card-description">{props.quiz.description}</p>
            </div>
            <div className="quiz-card-img">
                <img src={`http://localhost:5000${props.quiz.imageUrl}`} alt={props.quiz.name} />
            </div>
        </div>
        <div className="quiz-card-btn">
            <ButtonAppComponent content={t("edit")} type={"classic"} action={goToEdit}  />
            <ButtonAppComponent content={t("delete")} type={"delete"} action={showWarning} />
        </div>
        <div className="quiz-card-delete-warning-popup" id={"delete-warning-" + props.quiz._id}>
            <div className="quiz-card-delete-warning-popup-content">
                <h1 className="quiz-delete-title">{t("delete-quiz-warning-title")}</h1>
                <p>{t("delete-quiz-warning")}</p>
                <div className="quiz-card-delete-warning-popup-content-btn">
                    <ButtonAppComponent content={t("yes")} type={"delete"} action={deleteQuiz} />
                    <ButtonAppComponent content={t("no")} type={"classic"} action={closeWarning} />
                </div>
            </div>
        </div>
    </div>

  );
}

export default QuizCard;