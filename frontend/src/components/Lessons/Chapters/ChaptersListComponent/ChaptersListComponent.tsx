import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Chapter} from "../../../../interfaces/ChapterInterface";
import ChaptersCreationComponent from "../ChaptersCreationComponent/ChaptersCreationComponent";
import Close from "../../../../assets/close.png";

import "./ChaptersListComponent.css";
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";

function ChaptersListComponent() {
    const { t } = useTranslation();
    const lessonId = window.location.pathname.split("/")[2];
    const [chapterList, setChapterList] = useState<Chapter[]>();

    const getChapter = async () => {
        const token = localStorage.getItem("token");
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }

        try {
            const response = await fetch(`http://localhost:5000/api/chapters/lesson/${lessonId}`, {
                method: 'GET',
                headers: headers
            });
            const data = await response.json();
            console.log(data);
            setChapterList(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getChapter();
    }, [lessonId]);

    const newChapter = () => {
        const popup = document.querySelector(".chapter-creation-popup") as HTMLElement;
        popup.style.display = "block";
    }

    const closePopup = () => {
        getChapter();
        const popup = document.querySelector(".chapter-creation-popup") as HTMLElement;
        popup.style.display = "none";
    }

    const handleCreate = (creation: boolean) => {
        if(creation){
            closePopup();
        }
    }

    const onDelete = (chapterId: string) => {
        console.log("Delete");

        try {
            fetch(`http://localhost:5000/api/chapters/${chapterId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(response => {
                if (response.ok) {
                    console.log("Deleted");
                    getChapter();
                } else {
                    console.error("Error");
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            <div className="chapter-list-content">
                <div className="chapter-list-header">
                    <h2>{t('chapter-list')}</h2>
                    <div className="chapter-list-btn-new-chapter-container">
                        <ButtonAppComponent content={t('new-chapter')} type={"classic"} action={newChapter}/>
                    </div>
                </div>
                <div className="chapter-list-component">
                    {chapterList && chapterList?.length > 0  ? chapterList?.map((chapter: Chapter) => {
                        return(
                            <div key={chapter._id} className="chapter-list-card">
                                <div className="chapter-list-info">
                                    <h3 className="chapter-list-name">{chapter.name}</h3>
                                    <div className="chapter-list-img-container">
                                        <img src={`http://localhost:5000${chapter.imageUrl}`} alt={chapter.name} />
                                    </div>
                                </div>
                                <div className="chapter-list-description">
                                    <p className="chapter-list-description">{chapter.description}</p>
                                </div>
                                <div className="chapter-list-btn-container">
                                    <ButtonAppComponent content={"Edit"} type={"classic"}/>
                                    <ButtonAppComponent content={"Delete"} type={"classic"} action={() => onDelete(chapter._id)}/>
                                </div>

                            </div>
                        )
                    }) :
                    <p>{t('no-chapter-found')}</p>}
                </div>
            </div>
            <div className="chapter-creation-popup">
                {lessonId && (
                    <div className="chapter-creation-popup-content">
                        <div className="chapter-creation-popup-css">
                            <ChaptersCreationComponent lessonId={lessonId} onCreate={handleCreate} />
                            <div className="chapter-creation-popup-close">
                                <img src={Close} onClick={closePopup} alt="close" className="children-creation-popup-close-img"></img>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )





}

export default ChaptersListComponent;