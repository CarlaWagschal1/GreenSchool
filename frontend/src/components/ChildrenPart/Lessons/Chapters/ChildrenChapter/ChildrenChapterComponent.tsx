import {Chapter} from "../../../../../interfaces/ChapterInterface";
import ButtonAppComponent from "../../../../ButtonAppComponent/ButtonAppComponent";
import {useEffect} from "react";


interface ChildrenChapterComponentProps {
    lessonName: string | undefined;
    chapter: Chapter | null;
    numberChapter: number;
    numberTotalChapters: number;
    changeChapter: (change: string) => void;
}

function ChildrenChapterComponent(props: ChildrenChapterComponentProps) {

    useEffect(() => {
        console.log("Chapter in chapter Component:", props.chapter);
        console.log("props in chapter Component:", props)
    }, [props.chapter])


    return (
        <>
            <div className="chapter-container">
                <div className="chapter-header">
                    <h2>{props.lessonName}</h2>
                    <h3>Chapter {props.numberChapter} : {props.chapter?.name}</h3>
                </div>
                <div className="chapter-content">
                    here
                    <p>{props.chapter?.description}</p>
                </div>
                <div className="chapter-image">
                    <img src={props.chapter?.imageUrl} alt="chapter" />
                </div>
                <div className="chapter-footer">
                    <ButtonAppComponent content={"PREVIOUS"} type={"classic"} action={() => props.changeChapter("PREVIOUS")}/>
                    <p>Chapter {props.numberChapter + 1} of {props.numberTotalChapters}</p>
                    <ButtonAppComponent content={"NEXT"} type={"classic"} action={() => props.changeChapter("NEXT")}/>
                </div>
            </div>
        </>
    )
}

export default ChildrenChapterComponent;