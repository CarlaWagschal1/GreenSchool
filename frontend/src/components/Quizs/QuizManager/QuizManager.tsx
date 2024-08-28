import QuizList from "../QuizList/QuizList";

import {useTranslation} from "react-i18next";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import QuizCreation from "../QuizCreation/QuizCreation";

import Close from "../../../assets/close.png";

import "./QuizManager.css";
import {useNavigate} from "react-router-dom";


function QuizManager () {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const newQuiz = () => {
        const popup = document.querySelector(".quiz-manager-popup-creation") as HTMLDivElement;
        popup.style.display = "block";
    }

    const closePopupCreation = () => {
        const popup = document.querySelector(".quiz-manager-popup-creation") as HTMLDivElement;
        if(popup){
            popup.style.display = "none";
        }
    }

    const goToHome = () => {
        navigate("/educator");
    }



    return (
        <main>
            <div className="quiz-manager-container">
                <h1 className="quiz-manager-title">{t("quiz-list")}</h1>
                <div className="quiz-manager-content">
                    <QuizList />
                </div>
            </div>
            <div className="quiz-manager-btn-creation">
                <ButtonAppComponent content={t("new-quiz")} type={"new"} action={newQuiz} />
            </div>
            <div className={"quiz-manager-btn-home"}>
                <ButtonAppComponent content={t("back")} type={"classic"} action={goToHome}/>
            </div>

            <div className="quiz-manager-popup-creation">
                <div className="quiz-manager-popup-creation-content">
                    <div className="quiz-manager-popup-creation-css">
                        <QuizCreation />
                        <div className="quiz-manager-popup-close">
                            <img src={Close} alt={"close"} onClick={closePopupCreation}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
  );
}

export default QuizManager;