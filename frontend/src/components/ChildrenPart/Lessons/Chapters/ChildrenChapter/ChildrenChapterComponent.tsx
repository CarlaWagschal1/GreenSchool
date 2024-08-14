import {Chapter} from "../../../../../interfaces/ChapterInterface";
import ButtonAppComponent from "../../../../ButtonAppComponent/ButtonAppComponent";

import "./ChildrenChapterComponent.css";
import {useNavigate} from "react-router-dom";

interface ChildrenChapterComponentProps {
    lessonName: string | undefined;
    chapter: Chapter | null;
    numberChapter: number;
    numberTotalChapters: number;
    changeChapter: (change: string) => void;
}

function ChildrenChapterComponent(props: ChildrenChapterComponentProps) {
    const navigate = useNavigate();

    const backToLessonList = () => {
        navigate("/children-lesson-list");
    }


    return (
        <>
            <div className="chapter-container">
                <div className="chapter-header">
                    <h2>{props.lessonName}</h2>
                    <h3>Chapter {props.numberChapter + 1} : {props.chapter?.name}</h3>
                </div>
                <div className="chapter-content">
                    <div className="chapter-description">
                        <p>{props.chapter?.description}</p>
                    </div>
                    <div className="chapter-image">
                        <img src={props.chapter?.imageUrl} alt="chapter" />
                    </div>
                </div>
                <div className="chapter-footer">
                    <ButtonAppComponent content={"PREVIOUS"} type={"classic"} action={() => props.changeChapter("PREVIOUS")}/>
                    <p className="chapter-footer-chapter-index">Chapter {props.numberChapter + 1} of {props.numberTotalChapters}</p>
                    <ButtonAppComponent content={"NEXT"} type={"classic"} action={() => props.changeChapter("NEXT")}/>
                </div>
            </div>
            <div className="chapter-back-button">
                <ButtonAppComponent content={"BACK"} type={"classic"} action={backToLessonList}/>
            </div>
        </>
    )
}

export default ChildrenChapterComponent;