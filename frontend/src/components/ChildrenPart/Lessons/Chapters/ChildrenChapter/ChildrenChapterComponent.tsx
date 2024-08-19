import {Chapter} from "../../../../../interfaces/ChapterInterface";
import ButtonAppComponent from "../../../../ButtonAppComponent/ButtonAppComponent";

import "./ChildrenChapterComponent.css";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface ChildrenChapterComponentProps {
    lessonName: string | undefined;
    chapter: Chapter | null;
    numberChapter: number;
    numberTotalChapters: number;
    changeChapter: (change: string) => void;
}

function ChildrenChapterComponent(props: ChildrenChapterComponentProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const backToLessonList = () => {
        navigate("/children-lesson-list");
    }


    return (
        <>
            <div className="chapter-container">
                <div className="chapter-header">
                    <h2>{props.lessonName}</h2>
                    <h3>{t('chapter')} {props.numberChapter + 1} : {props.chapter?.name}</h3>
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
                    <ButtonAppComponent content={t('previous')} type={"classic"} action={() => props.changeChapter("PREVIOUS")}/>
                    <p className="chapter-footer-chapter-index">{t('chapter')} {props.numberChapter + 1} {t('of')} {props.numberTotalChapters}</p>
                    <ButtonAppComponent content={t('next')} type={"classic"} action={() => props.changeChapter("NEXT")}/>
                </div>
            </div>
            <div className="chapter-back-button">
                <ButtonAppComponent content={t('back')} type={"classic"} action={backToLessonList}/>
            </div>
        </>
    )
}

export default ChildrenChapterComponent;