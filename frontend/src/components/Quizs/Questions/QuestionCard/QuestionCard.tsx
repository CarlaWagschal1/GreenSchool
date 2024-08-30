import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";
import {Question} from "../../../../interfaces/QuestionInterface";
import {useTranslation} from "react-i18next";
import "./QuestionCard.css";
import Close from "../../../../assets/close.png";
import QuestionEdit from "../QuestionEdit/QuestionEdit";

interface QuestionCardProps {
    question: Question;
    isModif: (deleted: boolean) => void;

}

function QuestionCard({ question, isModif }: QuestionCardProps) {
    const { t } = useTranslation();

    const onDelete = (questionId: number) => {
        console.log("Delete");

        try {
            fetch(`http://localhost:5000/api/questions/${questionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(response => {
                if (response.ok) {
                    console.log("Deleted");
                    isModif(true);
                } else {
                    console.error("Error");
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const openPopup = () => {
        const popup = document.getElementById("question-edit-id-" + question._id) as HTMLDivElement;
        popup.style.display = "block";
    }

    const closePopup = () => {
        const popup = document.getElementById("question-edit-id-" + question._id) as HTMLDivElement;
        popup.style.display = "none";
    }

    console.log(question)

    const onEdit = (edit: boolean) => {
        if(edit){
            closePopup();
            isModif(true);
        }
    }



    return (
        <div className={"question-card"}>
            <div className="question-list-info">
                <h3 className="question-list-name">{question.question}</h3>
                <div className="question-list-img-container">
                    <img src={`http://localhost:5000${question.imageUrl}`} alt={question.question} />
                </div>
            </div>
            <div className="question-list-answer">
                {(question.options.length > 0 ?
                    question.options.map((option, index) => {
                    return (
                        <div key={index} className="question-list-answer-option">
                            <p className="question-option-p">{option}</p>
                            <input type={"radio"} disabled={true} checked={question.answer === option}/>
                        </div>
                    )
                }) :
                    <p>{t('no-question')}</p>)
                }
            </div>
            <div className="question-list-btn-container">
                <ButtonAppComponent content={"Edit"} type={"classic"} action={openPopup}/>
                <ButtonAppComponent content={"Delete"} type={"delete"} action={() => onDelete(question._id)}/>
            </div>
            <div className="question-edit-popup" id={"question-edit-id-" + question._id}>
                <div className="question-edit-popup-content">
                    <div className="question-edit-popup-css">
                        <div className="question-edit-popup-component">
                            <QuestionEdit question={question} onEdit={onEdit} />
                        </div>
                        <div className="question-edit-popup-close">
                            <img src={Close} onClick={closePopup} alt="close" className="question-creation-popup-close-img"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionCard;