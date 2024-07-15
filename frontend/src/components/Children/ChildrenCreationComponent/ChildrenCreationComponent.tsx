import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";

import "./ChildrenCreationComponent.css";
function ChildrenCreationComponent(){

    return (
        <div className="children-creation-container">
            <h1 className="children-creation-title">CREATE NEW CHILD PROFILE</h1>
            <div className="children-creation-form">
                <div className="input-container">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Last Name" />
                    <select className="select-age">
                        <option value="0" disabled selected hidden>Age</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                </div>
                <div className="button-container">
                    <ButtonAppComponent content={"CREATE"}></ButtonAppComponent>
                </div>
            </div>

        </div>
    )
}

export default ChildrenCreationComponent;