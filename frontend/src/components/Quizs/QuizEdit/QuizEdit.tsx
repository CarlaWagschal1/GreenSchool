import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import {useTranslation} from "react-i18next";
import {Quiz} from "../../../interfaces/QuizInterface";

import "./QuizEdit.css";

interface QuizEditProps {
    quiz: Quiz | undefined;
    onEdit: (edit: boolean) => void;
}

function QuizEdit({quiz, onEdit}: QuizEditProps) {

    const {t} = useTranslation();



    const editQuiz = async () => {
        const quizName = (document.getElementById("quiz-name") as HTMLInputElement).value;
        const quizDescription = (document.getElementById("quiz-description") as HTMLInputElement).value;

        const data = {
            name: quizName,
            description: quizDescription
        };

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        try {
            const response = await fetch(`http://localhost:5000/api/quizs/${quiz?._id}`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(data)
            });
            console.log(response);
            onEdit(true);
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div className={"quiz-edit"}>
            <h1>{t("edit-quiz")}</h1>
            <div className="quiz-edit-input">
                <label htmlFor="quiz-name">{t("quiz-name")} ({t('max')} 75 {t('characters')})</label>
                <input type="text" id="quiz-name" placeholder={t("quiz-name")} required maxLength={75} defaultValue={quiz?.name}/>
                <label htmlFor="quiz-description">{t("quiz-description")} ({t('max')} 300 {t('characters')})</label>
                <textarea id="quiz-description" required maxLength={300} defaultValue={quiz?.description}></textarea>
            </div>
            <div className="quiz-edit-btn">
                <ButtonAppComponent content={t("edit")} type={"classic"} action={editQuiz}/>
            </div>
        </div>

  );
}

export default QuizEdit;