import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import "./ChildrenCardComponent.css";
import {ChildrenInterface} from "../../../interfaces/ChildrenInterface";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ChildrenEditComponent from "../ChildrenEditComponent/ChildrenEditComponent";
import Close from "../../../assets/close.png";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";


interface ChildrenCardComponentProps {
    // Props type definition
    child : ChildrenInterface;

    isEdit: (edit: boolean) => void;
}




function ChildrenCardComponent(props: ChildrenCardComponentProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const toPlay = async () => {

        try {
            const data = {
                childrenId: props.child._id,
                educatorToken: localStorage.getItem('token')
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
            };

            const response = await axios.post('http://localhost:5000/api/children/play', data, { headers: headers });
            if(response.data.childrenToken){
                localStorage.setItem('childrenToken', response.data.childrenToken);
                localStorage.setItem('childrenAge', props.child.age.toString());
                navigate('/welcome');
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const seeStats = async() => {
        console.log('see stats')
        localStorage.setItem('childrenID', props.child._id.toString());
        navigate('/children-stats');
    }

    const goEdit = () => {
        const popup = document.getElementById("children-edit-id-" + props.child._id) as HTMLDivElement;
        if(popup){
            popup.style.display = "block";
        }
    }

    const handleEdit = (edit: boolean) => {
        if(edit){
            props.isEdit(true);
            closePopup();
        }
    }

    const closePopup = () => {
        const popup = document.getElementById("children-edit-id-" + props.child._id) as HTMLDivElement;
        if(popup){
            popup.style.display = "none";
        }
    }

    const handleEvent = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEvent);
        return () => {
            document.removeEventListener('keydown', handleEvent);
        }
    })




    return (
        <>
            <div className="children-card">
                <div className="children-card-info">
                    <h1 className="children-card-name">{props.child.name} </h1>
                    <h1 className="children-card-lastname">{props.child.lastName} :</h1>
                    <h1 className="children-card-age">{props.child.age} {t('years-old')}</h1>
                </div>
                <div className="children-card-buttons">
                    <div className="children-card-buttons-separator">
                        <ButtonAppComponent content={t('play')} action={toPlay} type={"play"}></ButtonAppComponent>
                    </div>
                    <div className="children-card-buttons-separator">
                        <ButtonAppComponent content={t('edit')} type={"edit"} action={goEdit}></ButtonAppComponent>
                    </div>
                    <div className="children-card-buttons-separator">
                        <ButtonAppComponent content={t('stats')} action={seeStats} type={"stats"}></ButtonAppComponent>
                    </div>
                </div>
            </div>
            <div className="children-edit-popup" id={"children-edit-id-" + props.child._id}>
                <div className="children-edit-popup-content">
                    <div className="children-edit-css">
                        <div className="children-edit-popup-component">
                            <ChildrenEditComponent child={props.child} onEdit={handleEdit}></ChildrenEditComponent>
                        </div>
                        <div className="children-edit-popup-close">
                            <img src={Close} onClick={closePopup} alt="close" className="children-creation-popup-close-img"></img>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChildrenCardComponent;