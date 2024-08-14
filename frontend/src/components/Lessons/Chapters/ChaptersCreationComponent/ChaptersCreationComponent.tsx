import axios from "axios";
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";

import "./ChaptersCreationComponent.css";
import {useEffect} from "react";

interface ChaptersCreationComponentProps {
    lessonId: string;
    onCreate: (creation: boolean) => void;

}


function ChaptersCreationComponent({ lessonId, onCreate }: ChaptersCreationComponentProps) {

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
                <h1>Create a Chapter</h1>
                <div className="chapters-creation-form">
                    <label htmlFor="chapterName">Chapter Name (max 50 characters) </label>
                    <input type="text" id="chapterName" placeholder="Chapter Name" maxLength={50} required/>
                    <label htmlFor="chapterDescription">Chapter Content (maw 500 characters)</label>
                    <textarea id={"chapterDescription"} placeholder={"Chapter Content"} maxLength={500} required></textarea>
                    <label htmlFor="image" className="upload-chapter-img">File:
                        <input type="file" id="image" name="image" accept="image/*" required />
                    </label>
                    <ButtonAppComponent content={"CreateChapter"} action={createChapter} type={"classic"}/>
                </div>
            </div>
        </>
    );

}


export default ChaptersCreationComponent;