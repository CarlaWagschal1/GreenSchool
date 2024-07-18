import ChildrenCardComponent from "../ChildrenCardComponent/ChildrenCardComponent";
import "./ChildrenListComponent.css";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import ChildrenCreationComponent from "../ChildrenCreationComponent/ChildrenCreationComponent";

import axios from "axios";
import {useEffect, useState} from "react";
import {ChildrenInterface} from "../../../interfaces/ChildrenInterface";
/*
const children = [
    {
        id: 1,
        name: "John",
        lastName: "Doe",
        age: 5
    },
    {
        id: 2,
        name: "Jane",
        lastName: "Doe",
        age: 7
    },
    {
        id: 3,
        name: "Jack",
        lastName: "Doe",
        age: 9
    }
]

 */

function ChildrenListComponent(){
    const [children, setChildren] = useState<ChildrenInterface[]>([]);

    const getChildren = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
            };

            const rep = await axios.get('http://localhost:5000/api/children/educator', { headers });

            if (rep.data) {
                setChildren(rep.data);
                console.log(rep.data);
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


    return(
        <main>
            <div className="children-list-content">
                <h1 className="children-list-title">Children List</h1>
                <div className="children-btn-creation">
                    <ButtonAppComponent content={"NEW CHILD"} action={openPopUp}></ButtonAppComponent>
                </div>
                <div className="children-list-container">
                    {children.map((child) => {
                        return (
                            <ChildrenCardComponent key={child.id} name={child.name} lastName={child.lastName} age={child.age} ></ChildrenCardComponent>
                        )
                    })}
                </div>
            </div>
            <div className="children-creation-popup">
                <div className="children-creation-popup-content">
                    <div className="children-creation-css">
                        <div className="children-creation-popup-component">
                            <ChildrenCreationComponent></ChildrenCreationComponent>
                        </div>
                        <div className="children-creation-popup-close">
                            <ButtonAppComponent content={"CLOSE"} action={closePopup}></ButtonAppComponent>
                        </div>
                    </div>
                </div>

            </div>
            <div className="home-button">
                <ButtonAppComponent content={"HOME"}></ButtonAppComponent>
            </div>
        </main>
    )


}

export default ChildrenListComponent;