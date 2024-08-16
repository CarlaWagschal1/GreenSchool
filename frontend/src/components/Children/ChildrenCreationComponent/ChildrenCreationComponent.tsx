import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import axios from "axios";

import "./ChildrenCreationComponent.css";

interface ChildrenCreationComponentProps {
    onCreate: (creation: boolean) => void;

}
function ChildrenCreationComponent( {onCreate}: ChildrenCreationComponentProps){



    const createChild = async () => {
        try {
            const name = (document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement).value;
            const lastName = (document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement).value;
            const age = (document.querySelector('select') as HTMLSelectElement).value;
            console.log(name, lastName, age)

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
            }

            const data = {
                name: name,
                lastName: lastName,
                age: age
            }

            const rep = await axios.post('http://localhost:5000/api/children', data
                , { headers: headers })

            console.log(rep)
            if(rep.status === 201) {
                onCreate(true);
                (document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement).value = '';
                (document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement).value = '';
            }

        }
        catch (error) {
            console.log(error)
        }

    }





    return (
        <div className="children-creation-container">
            <h1 className="children-creation-title">CREATE NEW CHILD PROFILE</h1>
            <div className="children-creation-form">
                <div className="input-creation-container">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Last Name" />
                    <select className="select-age" defaultValue="">
                        <option value="" hidden>Age</option>
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
                    <ButtonAppComponent content={"CREATE"} action={createChild} type={"classic"}></ButtonAppComponent>
                </div>
            </div>

        </div>
    )
}

export default ChildrenCreationComponent;