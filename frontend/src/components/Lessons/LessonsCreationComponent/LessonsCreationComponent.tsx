import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import "./LessonsCreationComponent.css";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { useTranslation} from "react-i18next";


function LessonsCreationComponent() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const[fileName, setFileName] = useState("No file selected");


    const createLesson = async () => {
        const lessonName = (document.getElementById("lessonName") as HTMLInputElement).value;
        const lessonDescription = (document.getElementById("lessonDescription") as HTMLInputElement).value;
        const image = (document.getElementById("image") as HTMLInputElement).files?.[0];

        if (!image) {
            console.error("No file selected");
            return;
        }
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("name", lessonName);
        formData.append("description", lessonDescription);
        formData.append("files", image);

        const headers = {
            "Authorization": `Bearer ${token}`
        }

        try {
            const response = await axios.post("http://localhost:5000/api/lessons", formData, { headers: headers });
            console.log(response.data);
            const lessonId = response.data.lessonId;
            navigate(`/lessons-modification/${lessonId}`);
        } catch (error) {
            console.error(error);
        }
    }

    const goBack = () => {
        navigate("/lessons-manager")
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
            createLesson();
        }
    }

    useEffect(() => {
        document.addEventListener('keypress', handleEvent);
        return () => {
            document.removeEventListener('keypress', handleEvent);
        }
    })




  return (
    <main>
        <div className="lessons-creation-content">
            <h1> {t('lesson-creation')}</h1>
            <div className="lessons-creation-form">
                <label htmlFor="lessonName">{t('lesson-name')} ({t('max')} 75 {t('characters')}):</label>
                <input type="text" id="lessonName" name="lessonName" required maxLength={75} placeholder={t('lesson-name')}/>
                <label htmlFor="lessonDescription" >{t('lesson-description')} ({t('max')} 300 {t('characters')}):</label>
                <textarea id="lessonDescription" name="lessonDescription" required maxLength={300} placeholder={t('lesson-description')}/>
                <label htmlFor="image" className="upload-lesson-img">{t('file')}: {fileName}
                    <input type="file" id="image" name="image" accept="image/*" required />
                </label>

                <ButtonAppComponent content={t('create')} action={createLesson} type={"classic"}/>
            </div>
        </div>
        <div className="lesson-back-btn">
            <ButtonAppComponent content={t('back')} action={goBack} type={"classic"}></ButtonAppComponent>
        </div>
    </main>
  );
}

export default LessonsCreationComponent;