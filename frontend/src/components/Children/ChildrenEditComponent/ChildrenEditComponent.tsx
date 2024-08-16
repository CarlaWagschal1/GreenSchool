import {ChildrenInterface} from "../../../interfaces/ChildrenInterface";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import axios from "axios";

import "./ChildrenEditComponent.css";


interface ChildrenEditComponent {
    child: ChildrenInterface;
    onEdit: (edit: boolean) => void;
}


function ChildrenEditComponent(props: ChildrenEditComponent) {




    const editChild = async () => {
        console.log('edit child', props.child._id, props.child.name, props.child.lastName, props.child.age)
        const name = (document.getElementById("children-edit-name-" + props.child._id) as HTMLInputElement).value;
        const lastName = (document.getElementById("children-edit-last-name-" + props.child._id) as HTMLInputElement).value;
        const age = (document.getElementById("children-edit-age-" + props.child._id) as HTMLSelectElement).value;


        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
        }

        const data = {
            name: name,
            lastName: lastName,
            age: age
        }

        try {
            const rep = await axios.patch('http://localhost:5000/api/children/' + props.child._id, data
                , { headers: headers })

            console.log(rep)
            if(rep.status === 200) {
                props.onEdit(true);
                (document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement).value = '';
                (document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement).value = '';
            }
        } catch (error) {
            console.log(error)
        }
    }

    const showWarning = () => {
        const popup = document.getElementById("children-delete-warning-popup-id-" + props.child._id) as HTMLElement;
        popup.style.display = 'block';

    }

    const closeWarning = () => {
        const popup = document.querySelector('.children-delete-warning-popup') as HTMLElement;
        popup.style.display = 'none';

    }


    const deleteChild = async (childId: number) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
        }

        try {
            const rep = await axios.delete('http://localhost:5000/api/children/' + childId
                , { headers: headers })

            console.log(rep)
            if(rep.status === 200) {
                props.onEdit(true);
                (document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement).value = '';
                (document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement).value = '';
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
    <>
        <div className="children-edit-container">
            <h1 className="children-edit-title">EDIT PROFILE</h1>
            <div className="children-edit-form">
                <div className=" children-edit-input-container">
                    <input type="text" placeholder="Name" id={"children-edit-name-" + props.child._id} defaultValue={props.child.name} />
                    <input type="text" placeholder="Last Name" id={"children-edit-last-name-" + props.child._id} defaultValue={props.child.lastName}/>
                    <select className="children-edit-select-age" id={"children-edit-age-" + props.child._id} defaultValue={props.child.age}>
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
                <div className="children-edit-button-container">
                    <ButtonAppComponent content={"EDIT"} action={editChild} type={"classic"}></ButtonAppComponent>
                    <ButtonAppComponent content={"DELETE CHILD"} type={"delete"} action={showWarning}></ButtonAppComponent>
                </div>
            </div>
        </div>
        <div className="children-delete-warning-popup" id={"children-delete-warning-popup-id-" + props.child._id}>
            <div className="children-delete-warning-popup-content">
                <h1>Are you sure you want to delete this child?</h1>
                <p>If you delete this child profile, you will lose all the statistics about him.</p>
                <div className="children-delete-warning-popup-buttons">
                    <ButtonAppComponent content={"YES"} action={() => deleteChild(props.child._id)} type={"delete"}></ButtonAppComponent>
                    <ButtonAppComponent content={"NO"} type={"classic"} action={closeWarning}></ButtonAppComponent>
                </div>
            </div>
        </div>
    </>
  );
}


export default ChildrenEditComponent;