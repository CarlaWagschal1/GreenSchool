import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Quiz} from "../../../interfaces/QuizInterface";
import QuestionList from "../Questions/QuestionList/QuestionList";

import "./QuizModification.css";
import QuizEdit from "../QuizEdit/QuizEdit";
import Close from "../../../assets/close.png";


function QuizModification() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [quiz, setQuiz] = useState<Quiz>();

    const getQuiz = async () => {
        const quizId = window.location.pathname.split("/")[2];
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        try {
            const response = await fetch(`http://localhost:5000/api/quizs/${quizId}`, {
                method: 'GET',
                headers: headers
            });
            const data = await response.json();
            console.log(data)
            setQuiz(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        getQuiz();
    }, []);


    const goToquizManager = () => {
        navigate("/quizs-manager");
    }


    console.log(quiz?.imageUrl)

    const showPopupEdit = () => {
        const popup = document.querySelector(".quizs-modification-popup") as HTMLElement;
        popup.style.display = "block";
    }

    const closePopup = () => {
        const popup = document.querySelector(".quizs-modification-popup") as HTMLElement;
        popup.style.display = "none";
    }

    const handleQuizEdit = (edit: boolean) => {
        if (edit) {
            getQuiz();
            closePopup();
        }
    }
    
    
  return (
    <main>
        <div className="quizs-modification-content">
            <div className="quizs-modification-header">
                <div className="quizs-modification-infos">
                    <div className="quizs-modification-infos-header">
                        <h2>{quiz?.name}</h2>
                        <p className="quizs-modification-description">{quiz?.description}</p>
                    </div>
                    <div className={"quizs-modification-edit"}>
                        <ButtonAppComponent content={t('edit-quiz')} type={"classic"} action={showPopupEdit}/>
                    </div>
                </div>
                <div className="quizs-modification-img-container">
                    <img src={"http://localhost:5000" + quiz?.imageUrl} alt={quiz?.name} />
                </div>
            </div>
            <div className="quizs-modification-chapters">
                <QuestionList/>
            </div>
        </div>
        <div className="quizs-modification-buttons">
            <ButtonAppComponent content={t('back')} type={"classic"} action={goToquizManager}/>
        </div>
        <div className="quizs-modification-popup">
            <div className="quizs-modification-popup-content">
                <div className="quizs-modification-popup-css">
                    <QuizEdit quiz={quiz} onEdit={handleQuizEdit}/>
                    <div className="quizs-modification-popup-close">
                        <img src={Close} onClick={closePopup} alt="close" className="children-creation-popup-close-img"></img>
                    </div>
                </div>
            </div>

        </div>
    </main>
  );
}

export default QuizModification;