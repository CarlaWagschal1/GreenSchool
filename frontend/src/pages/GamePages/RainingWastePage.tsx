import RainingWasteComponent from "../../components/RainingWasteComponent/RainingWasteComponent";
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
                    <h1 className="choice-title">Choisissez un type de déchet</h1>
                    <div className="button-container">
                        <ButtonAppComponent content={"Recyclable"} action={() => setWasteType("recyclable")}></ButtonAppComponent>
                        <ButtonAppComponent content={"Alimentaire"} action={() => setWasteType("food")}></ButtonAppComponent>
                        <ButtonAppComponent content={"Encombrant"} action={() => setWasteType("bulky")}></ButtonAppComponent>
                    </div>
                </div>

                : <RainingWasteComponent wasteType={wasteType}/> }
        </>
    );
};

export default RainingWastePage;