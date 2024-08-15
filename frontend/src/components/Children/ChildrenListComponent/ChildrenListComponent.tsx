import ChildrenCardComponent from "../ChildrenCardComponent/ChildrenCardComponent";
import "./ChildrenListComponent.css";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import ChildrenCreationComponent from "../ChildrenCreationComponent/ChildrenCreationComponent";
import Close from "../../../assets/close.png";

import axios from "axios";
import {useEffect, useState} from "react";
import {ChildrenInterface} from "../../../interfaces/ChildrenInterface";
import {useNavigate} from "react-router-dom";


function ChildrenListComponent(){
    const navigate = useNavigate();
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
    const openPopUp = () => {
        const popup = document.querySelector(".children-creation-popup") as HTMLDivElement;
        popup.style.display = "block";
    }

    const closePopup = () => {
        getChildren();
        const popup = document.querySelector(".children-creation-popup") as HTMLDivElement;
        popup.style.display = "none";
    }

    const handleCreate = (creation: boolean) => {
        if(creation){
            closePopup();
        }
    }

    const goToHome = () => {
        navigate("/educator");
    }

    const handleEvent = (e: KeyboardEvent) => {
        if(e.key === 'Escape'){
            closePopup();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEvent);
        return () => {
            document.removeEventListener('keydown', handleEvent);
        }
    })


    return(
        <main>
            <div className="children-btn-creation">
                <ButtonAppComponent content={"NEW CHILD"} action={openPopUp} type={"new"}></ButtonAppComponent>
            </div>
            <div className="children-list-content">
                <h1 className="children-list-title">Children List</h1>
                <div className="children-list-container">
                    {children.map((child) => {
                        return (
                            <ChildrenCardComponent key={child._id} _id={child._id} name={child.name} lastName={child.lastName} age={child.age} ></ChildrenCardComponent>
                        )
                    })}
                </div>
            </div>
            <div className="children-creation-popup">
                <div className="children-creation-popup-content">
                    <div className="children-creation-css">
                        <div className="children-creation-popup-component">
                            <ChildrenCreationComponent onCreate={handleCreate}></ChildrenCreationComponent>
                        </div>
                        <div className="children-creation-popup-close">
                            <img src={Close} onClick={closePopup} alt="close" className="children-creation-popup-close-img"></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="children-list-home-btn">
                <ButtonAppComponent content={"BACK"} action={goToHome} type={"classic"}></ButtonAppComponent>
            </div>
        </main>
    )


}

export default ChildrenListComponent;