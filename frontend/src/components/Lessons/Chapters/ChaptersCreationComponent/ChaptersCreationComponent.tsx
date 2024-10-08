import axios from "axios";
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";

import "./ChaptersCreationComponent.css";
import {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";

interface ChaptersCreationComponentProps {
    lessonId: string;
    onCreate: (creation: boolean) => void;

}


function ChaptersCreationComponent({ lessonId, onCreate }: ChaptersCreationComponentProps) {
    const { t } = useTranslation();

    const[fileName, setFileName] = useState("No file selected");


    const createChapter = async () => {
        const chapterName = (document.getElementById("chapterName") as HTMLInputElement).value;
        const chapterDescription = (document.getElementById("chapterDescription") as HTMLInputElement).value;
        const imageUrl = (document.getElementById("image") as HTMLInputElement).files?.[0];

        if (!imageUrl) {
            console.error("No file selected");
            return;
        }
        const token = localStorage.getItem("token");

        console.log(chapterName, chapterDescription, imageUrl)

        const formData = new FormData();
        formData.append("lessonId", lessonId);
        formData.append("name", chapterName);
        formData.append("description", chapterDescription);
        formData.append("files", imageUrl);


        const headers = {
            "Authorization": `Bearer ${token}`
        }

        try {
            const response = await axios.post("http://localhost:5000/api/chapters", formData, { headers: headers });
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
            createChapter();
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
            <div className="chapters-creation-content">
                <h1>{t('chapter-creation')}</h1>
                <div className="chapters-creation-form">
                    <label htmlFor="chapterName">{t('chapter-name')} ({t('max')} 50 {t('characters')}) </label>
                    <input type="text" id="chapterName" placeholder={t('chapter-name')} maxLength={50} required/>
                    <label htmlFor="chapterDescription">{t('chapter-content')} ({t('max')} 500 {t('characters')})</label>
                    <textarea id={"chapterDescription"} placeholder={t('chapter-content')} maxLength={500} required></textarea>
                    <label htmlFor="image" className="upload-chapter-img">{t('file')} : {fileName}
                        <input type="file" id="image" name="image" accept="image/*" required />
                    </label>
                    <ButtonAppComponent content={t('create')} action={createChapter} type={"classic"}/>
                </div>
            </div>
        </>
    );

}


export default ChaptersCreationComponent;