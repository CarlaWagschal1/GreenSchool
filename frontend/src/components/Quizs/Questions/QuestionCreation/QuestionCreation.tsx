import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";
import axios from "axios";

import "./QuestionCreation.css";

interface QuestionCreationProps {
    quizId: string;
    onCreate: (creation: boolean) => void;
}

function QuestionCreation({ quizId, onCreate }: QuestionCreationProps) {
    const { t } = useTranslation();

    const[fileName, setFileName] = useState("No file selected");


    const createQuestion = async () => {
        const questionName = (document.getElementById("questionName") as HTMLInputElement).value;
        const optionsHtml = document.getElementsByClassName("input-answer") as HTMLCollectionOf<HTMLInputElement>;
        const options = Array.from(optionsHtml).map((option: HTMLInputElement) => option.value);

        const answersHtml = document.getElementsByClassName("input-answer-check") as HTMLCollectionOf<HTMLInputElement>;
        const answers = Array.from(answersHtml).map((answer: HTMLInputElement) => answer.checked.toString());
        let answer = options[0];
        answers.forEach((answerI, index) => {
            if(answerI === "true"){
                answer = options[index];
            }
        });

        const imageUrl = (document.getElementById("image") as HTMLInputElement).files?.[0];

        if (!imageUrl) {
            console.error("No file selected");
            return;
        }
        const token = localStorage.getItem("token");

        console.log(questionName, options, imageUrl, answer)

        const formData = new FormData();
        formData.append("quizId", quizId);
        formData.append("question", questionName);
        formData.append("options", JSON.stringify(options));
        formData.append("correctOption", answer);
        formData.append("files", imageUrl);

        const headers = {
            "Authorization": `Bearer ${token}`
        }

        try {
            const response = await axios.post("http://localhost:5000/api/questions", formData, { headers: headers });
            console.log(response);
            onCreate(true);
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        const inputElement = document.getElementById("image") as HTMLInputElement;
        const handleChange = (event: Event) => {
            const input = event.target as HTMLInputElement;
            const file = input.files?.[0];
            if (file) {
                setFileName(file.name);
            }
        };

        inputElement.addEventListener("change", handleChange);

        return () => {
            inputElement.removeEventListener("change", handleChange);
        };
    }, []);

    const handleEvent = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            createQuestion();
        }
    }

    useEffect(() => {
        document.addEventListener('keypress', handleEvent);
        return () => {
            document.removeEventListener('keypress', handleEvent);
        }
    })



    return (
        <>
            <div className="questions-creation-content">
                <h1>{t('question-creation')}</h1>
                <div className="questions-creation-form">
                    <label htmlFor="questionName">{t('question-name')} ({t('max')} 50 {t('characters')}) </label>
                    <input type="text" id="questionName" placeholder={t('question-name')} maxLength={50} required/>
                    <label htmlFor="questionOptions">{t('question-options')} ({t('max')} 50 {t('characters')})</label>
                    <div className="question-options">
                        <div className="question-option">
                            <input className="input-answer" type="text" id="questionOptions1" placeholder={t('question-option')} maxLength={50} required/>
                            <input className="input-answer-check" type="radio" name="answer" value="true" required/>
                        </div>
                        <div className="question-option">
                            <input className="input-answer" type="text" id="questionOptions2" placeholder={t('question-option')} maxLength={50} required/>
                            <input className="input-answer-check" type="radio" name="answer" value="true" required/>
                        </div>
                        <div className="question-option">
                            <input className="input-answer" type="text" id="questionOptions3" placeholder={t('question-option')} maxLength={50} required/>
                            <input className="input-answer-check" type="radio" name="answer" value="true" required/>
                        </div>
                        <div className="question-option">
                            <input className="input-answer" type="text" id="questionOptions4" placeholder={t('question-option')} maxLength={50} required/>
                            <input className="input-answer-check" type="radio" name="answer" value="true" required/>
                        </div>

                    </div>
                    <label htmlFor="image" className="upload-question-img">{t('file')} : {fileName}
                        <input type="file" id="image" name="image" accept="image/*" required />
                    </label>
                    <ButtonAppComponent content={t('create')} action={createQuestion} type={"classic"}/>
                </div>
            </div>
        </>
    );

}

export default QuestionCreation;