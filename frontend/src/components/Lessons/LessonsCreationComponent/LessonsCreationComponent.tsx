import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import "./LessonsCreationComponent.css";

import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


function LessonsCreationComponent() {
    const navigate = useNavigate();
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




  return (
    <main>
        <div className="lessons-creation-content">
            <h1> Create a lesson</h1>
            <div className="lessons-creation-form">
                <label htmlFor="lessonName">Lesson name (75 characters max):</label>
                <input type="text" id="lessonName" name="lessonName" required maxLength={75} placeholder="Lesson Name"/>
                <label htmlFor="lessonDescription" >Lesson description (300 characsters max):</label>
                <textarea id="lessonDescription" name="lessonDescription" required maxLength={300} placeholder="Lesson Description"/>
                <label htmlFor="image" className="upload-lesson-img">File: {fileName}
                    <input type="file" id="image" name="image" accept="image/*" required />
                </label>

                <ButtonAppComponent content={"Create lesson"} action={createLesson} type={"classic"}/>
            </div>
        </div>
        <div className="lesson-back-btn">
            <ButtonAppComponent content={"BACK"} action={goBack} type={"classic"}></ButtonAppComponent>
        </div>
    </main>
  );
}

export default LessonsCreationComponent;