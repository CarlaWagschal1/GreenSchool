import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import "./ChildrenCardComponent.css";
import {ChildrenInterface} from "../../../interfaces/ChildrenInterface";
import axios from "axios";
import {useNavigate} from "react-router-dom";

/*
interface ChildrenCardComponentProps {
    // Props type definition
    name: string;
    lastName: string;
    age: number;
}

 */


function ChildrenCardComponent(props: ChildrenInterface) {
    const navigate = useNavigate();

    const toPlay = async () => {
        console.log('props:', props)

        try {
            const data = {
                childrenId: props._id,
                educatorToken: localStorage.getItem('token')
            }
            console.log(data)

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
            };

            const response = await axios.post('http://localhost:5000/api/children/play', data, { headers: headers });
            if(response.data.childrenToken){
                localStorage.setItem('childrenToken', response.data.childrenToken);
                navigate('/welcome');
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const seeStats = async() => {
        console.log('see stats')
        localStorage.setItem('childrenID', props._id.toString());
        navigate('/children-stats');
    }



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
                        <ButtonAppComponent content={"PLAY"} action={toPlay}></ButtonAppComponent>
                    </div>
                    <div className="children-card-buttons-separator">
                        <ButtonAppComponent content={"EDIT"} ></ButtonAppComponent>
                    </div>
                    <div className="children-card-buttons-separator">
                        <ButtonAppComponent content={"STATS"} action={seeStats}></ButtonAppComponent>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChildrenCardComponent;