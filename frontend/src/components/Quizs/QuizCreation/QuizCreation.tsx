import axios from "axios";
import "./QuizCreation.css";

import {useTranslation} from "react-i18next";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function QuizCreation() {
    const[fileName, setFileName] = useState("No file selected");

    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const inputElement = document.getElementById("quiz-image") as HTMLInputElement;
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

    const createQuiz = async () => {
        const quizName = (document.getElementById("quiz-name") as HTMLInputElement).value;
        const quizDescription = (document.getElementById("quiz-description") as HTMLInputElement).value;
        const image = (document.getElementById("quiz-image") as HTMLInputElement).files?.[0];

        if (!image) {
            console.error("No file selected");
            return;
        }
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("name", quizName);
        formData.append("description", quizDescription);
        formData.append("files", image);

        const headers = {
            "Authorization": `Bearer ${token}`
        }

        try {
            const response = await axios.post("http://localhost:5000/api/quizs", formData, { headers: headers });
            console.log(response.data);
            const quizId = response.data.quizId;
            navigate(`/quiz-modification/${quizId}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="quiz-creation">
            <h1>{t("quiz-creation")}</h1>
            <div className="quiz-creation-input">
                <label htmlFor="quiz-name">{t("quiz-name")} ({t('max')} 75 {t('characters')})</label>
                <input type="text" id="quiz-name" placeholder={t("quiz-name")} required maxLength={75}/>
                <label htmlFor="quiz-description">{t("quiz-description")} ({t('max')} 300 {t('characters')})</label>
                <textarea id="quiz-description" required maxLength={300}></textarea>
                <label htmlFor="quiz-image" className="upload-quiz-img"> File: {fileName}
                    <input type="file" id="quiz-image" name="quiz-image" accept="image/*" required />
                </label>
            </div>
            <div className="quiz-creation-btn">
                <ButtonAppComponent content={t("create")} type={"classic"} action={createQuiz}/>
            </div>
        </div>
    )
}

export default QuizCreation;