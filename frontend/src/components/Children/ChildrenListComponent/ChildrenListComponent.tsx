import ChildrenCardComponent from "../ChildrenCardComponent/ChildrenCardComponent";
import "./ChildrenListComponent.css";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import ChildrenCreationComponent from "../ChildrenCreationComponent/ChildrenCreationComponent";
import Close from "../../../assets/close.png";

import axios from "axios";
import {useEffect, useState} from "react";
import {ChildrenInterface} from "../../../interfaces/ChildrenInterface";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";


function ChildrenListComponent(){
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [children, setChildren] = useState<ChildrenInterface[]>([]);

    const getChildren = async () => {
        console.log("token: ", localStorage.getItem('token'));
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
            };

            const rep = await axios.get('http://localhost:5000/api/children/educator', { headers });

            if (rep.data) {
                setChildren(rep.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getChildren();
    }, []);


    const openPopUpCreation = () => {
        const popup = document.getElementById("children-creation") as HTMLDivElement;
        popup.style.display = "block";
    }

    const closePopupCreation = () => {
        getChildren();
        const popup = document.getElementById("children-creation") as HTMLDivElement;
        if(popup){
            popup.style.display = "none";
        }
    }

    const handleCreate = (creation: boolean) => {
        if(creation){
            closePopupCreation();
        }
    }

    const goToHome = () => {
        navigate("/educator");
    }

    const handleEvent = (e: KeyboardEvent) => {
        if(e.key === 'Escape'){
            closePopupCreation();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEvent);
        return () => {
            document.removeEventListener('keydown', handleEvent);
        }
    })

    const needEdit = (edit: boolean) => {
        if(edit){
            getChildren()
        }
    }


    return(
        <main>
            <div className="children-btn-creation">
                <ButtonAppComponent content={t('new-child')} action={openPopUpCreation} type={"new"}></ButtonAppComponent>
            </div>
            <div className="children-list-content">
                <h1 className="children-list-title">{t('children-list')}</h1>
                <div className="children-list-container">
                    {children.map((child) => {
                        return (
                            <ChildrenCardComponent key={child._id} child={child} isEdit={needEdit} ></ChildrenCardComponent>
                        )
                    })}
                </div>
            </div>
            <div className="children-list-popup" id="children-creation">
                <div className="children-list-popup-content">
                    <div className="children-list-css">
                        <div className="children-creation-popup-component">
                            <ChildrenCreationComponent onCreate={handleCreate}></ChildrenCreationComponent>
                        </div>
                        <div className="children-list-popup-close">
                            <img src={Close} onClick={closePopupCreation} alt="close" className="children-creation-popup-close-img"></img>
                        </div>
                    </div>
                </div>
            </div>

            <div className="children-list-home-btn">
                <ButtonAppComponent content={t('back')} action={goToHome} type={"classic"}></ButtonAppComponent>
            </div>
        </main>
    )


}

export default ChildrenListComponent;