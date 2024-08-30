import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {Question} from "../../../../interfaces/QuestionInterface";
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";
import Close from "../../../../assets/close.png";
import QuestionCreation from "../QuestionCreation/QuestionCreation";
import QuestionCard from "../QuestionCard/QuestionCard";

import "./QuestionList.css";
import {QuestionBackInterface} from "../../../../interfaces/QuestionBackInterface";



function QuestionList() {
    const { t } = useTranslation();
    const quizId = window.location.pathname.split("/")[2];
    const [questionList, setQuestionList] = useState<Question[]>([]);

    const getquestion = async () => {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        try {
            const response = await fetch(`http://localhost:5000/api/questions/quiz/${quizId}`, {
                method: 'GET',
                headers: headers
            });
            const data = await response.json();
            console.log(data);

            const newQuestions = data.map((question: QuestionBackInterface) => ({
                _id: question._id,
                question: question.question,
                options: question.options,
                answer: question.correctOption,
                imageUrl: question.imageUrl
            }));

            setQuestionList(newQuestions);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getquestion();
    }, [quizId]);

    const newquestion = () => {
        const popup = document.querySelector(".question-creation-popup") as HTMLElement;
        popup.style.display = "block";
    }

    const closePopup = () => {
        getquestion();
        const popup = document.querySelector(".question-creation-popup") as HTMLElement;
        popup.style.display = "none";
    }

    const handleCreate = (creation: boolean) => {
        if(creation){
            closePopup();
        }
    }

    const handleModif = (deleted: boolean) => {
        if(deleted){
            getquestion();
        }
    }



    return(
        <>
            <div className="question-list-content">
                <div className="question-list-header">
                    <h2>{t('question-list')}</h2>
                    <div className="question-list-btn-new-question-container">
                        <ButtonAppComponent content={t('new-question')} type={"classic"} action={newquestion}/>
                    </div>
                </div>
                <div className="question-list-component">
                    {questionList && questionList?.length > 0  ? questionList?.map((question: Question) => {
                            return(
                                <div key={question._id} className="question-list-card">
                                    <QuestionCard question={question} isModif={handleModif}/>
                                </div>
                            )
                        }) :
                        <p>{t('no-question-found')}</p>}
                </div>
            </div>
            <div className="question-creation-popup">
                {quizId && (
                    <div className="question-creation-popup-content">
                        <div className="question-creation-popup-css">
                            <QuestionCreation quizId={quizId} onCreate={handleCreate} />
                            <div className="question-creation-popup-close">
                                <img src={Close} onClick={closePopup} alt="close" className="children-creation-popup-close-img"></img>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default QuestionList;