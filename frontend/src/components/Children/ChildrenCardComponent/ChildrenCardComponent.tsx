import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import "./ChildrenCardComponent.css";

interface ChildrenCardComponentProps {
    // Props type definition
    name: string;
    lastName: string;
    age: number;
}


function ChildrenCardComponent(props: ChildrenCardComponentProps) {
    return (
        <>
            <div className="children-card">
                <div className="children-card-info">
                    <h1 className="children-card-name">{props.name} </h1>
                    <h1 className="children-card-lastname">{props.lastName} :</h1>
                    <h1 className="children-card-age">{props.age} years</h1>
                </div>
                <div className="children-card-buttons">
                    <div className="children-card-buttons-separator">
                        <ButtonAppComponent content={"PLAY"}></ButtonAppComponent>
                    </div>
                    <div className="children-card-buttons-separator">
                        <ButtonAppComponent content={"EDIT"}></ButtonAppComponent>
                    </div>
                    <div className="children-card-buttons-separator">
                        <ButtonAppComponent content={"STATS"}></ButtonAppComponent>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChildrenCardComponent;