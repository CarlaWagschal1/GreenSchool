import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";
import axios from "axios";

import "./QuestionEdit.css";
import { Question } from "../../../../interfaces/QuestionInterface";

interface QuestionEditProps {
    question: Question;
    onEdit: (edit: boolean) => void;
}

function QuestionEdit({ question, onEdit }: QuestionEditProps) {
    const { t } = useTranslation();

    const [selectedAnswer, setSelectedAnswer] = useState<string>(question.answer);
    const [options, setOptions] = useState<string[]>(question.options);

    const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAnswer(event.target.value);
    };

    const handleOptionChange = (index: number, newValue: string) => {
        const newOptions = [...options];
        newOptions[index] = newValue;
        setOptions(newOptions);
        if (selectedAnswer === question.options[index]) {
            setSelectedAnswer(newValue);
        }
    };

    const editQuestion = async () => {
        const questionName = (document.getElementById("questionName" + question._id) as HTMLInputElement).value;

        const data = {
            question: questionName,
            options: options,
            correctOption: selectedAnswer
        };

        const token = localStorage.getItem("token");

        const headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        try {
            const response = await axios.patch(`http://localhost:5000/api/questions/${question._id}`, data, { headers: headers });
            console.log(response);
            onEdit(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEvent = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            editQuestion();
        }
    };

    useEffect(() => {
        document.addEventListener('keypress', handleEvent);
        return () => {
            document.removeEventListener('keypress', handleEvent);
        };
    }, []);

    return (
        <>
            <div className="questions-edit-content">
                <h1>{t('question-edit')}</h1>
                <div className="questions-edit-form">
                    <label htmlFor="questionName">{t('question-name')} ({t('max')} 50 {t('characters')}) </label>
                    <input type="text" id={"questionName" + question._id} placeholder={t('question-name')} maxLength={50} required defaultValue={question.question} />
                    <label htmlFor="questionOptions">{t('question-options')} ({t('max')} 50 {t('characters')})</label>
                    <div className="question-edit-options">
                        {options.map((option, index) => (
                            <div key={index} className="question-edit-option">
                                <input
                                    className="question-edit-input-answer"
                                    type="text"
                                    id={"questionOptions" + (index + 1) + question._id}
                                    placeholder={t('question-option')}
                                    maxLength={50}
                                    required
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                />
                                <input
                                    className="question-edit-input-answer-check"
                                    type="radio"
                                    name={"answer" + question._id}
                                    value={option}
                                    required
                                    checked={selectedAnswer === option}
                                    onChange={handleAnswerChange}
                                    id={"questionOptionsCheck" + (index + 1) + question._id}
                                />
                            </div>
                        ))}
                    </div>

                    <ButtonAppComponent content={t('edit')} action={editQuestion} type={"classic"} />
                </div>
            </div>
        </>
    );
}

export default QuestionEdit;
