import RainingWasteComponent from "../../components/ChildrenPart/Games/RainingWasteComponent/RainingWasteComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import ButtonAppComponent from "../../components/ButtonAppComponent/ButtonAppComponent";
import {useState} from "react";

import './RainingWastePage.css';



const RainingWastePage = () => {
    const [wasteType, setWasteType] = useState("none");



    return (
        <>
            <HeaderComponent />
            { wasteType === "none" ?
                <div className="raining-waste-choice">
                    <h1 className="choice-title">Choose a waste type</h1>
                    <div className="button-container">
                        <ButtonAppComponent content={"Recyclable"} action={() => setWasteType("recyclable")} type={"classic"}></ButtonAppComponent>
                        <ButtonAppComponent content={"Food"} action={() => setWasteType("food")} type={"classic"}></ButtonAppComponent>
                        <ButtonAppComponent content={"Bulky"} action={() => setWasteType("bulky")} type={"classic"}></ButtonAppComponent>
                        <ButtonAppComponent content={"All"} action={() => setWasteType("all")} type={"classic"}></ButtonAppComponent>
                    </div>
                </div>

                : <RainingWasteComponent wasteType={wasteType}/> }
        </>
    );
};

export default RainingWastePage;