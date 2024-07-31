import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import "./LessonsCreationComponent.css";

import axios from "axios";
import {useNavigate} from "react-router-dom";


function LessonsCreationComponent() {
    const navigate = useNavigate();


    const createLesson = async () => {
        const lessonName = (document.getElementById("lessonName") as HTMLInputElement).value;
        const lessonDescription = (document.getElementById("lessonDescription") as HTMLInputElement).value;
        const image = (document.getElementById("image") as HTMLInputElement).files?.[0];
        console.log("Image:", image);

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
        } catch (error) {
            console.error(error);
        }
    }

    const goBack = () => {
        navigate("/lessons-manager")
    }




  return (
    <main>
        <div className="lessons-creation-content">
            <h1> Create a lesson</h1>
            <div className="lessons-creation-form">
                <label htmlFor="lessonName">Lesson name:</label>
                <input type="text" id="lessonName" name="lessonName" required />
                <label htmlFor="lessonDescription">Lesson description:</label>
                <input type="text" id="lessonDescription" name="lessonDescription" required maxLength={150}/>
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" accept="image/*" required />
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