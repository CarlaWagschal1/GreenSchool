import {ChildrenInterface} from "../../../interfaces/ChildrenInterface";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import axios from "axios";
import {useTranslation} from "react-i18next";

import "./ChildrenEditComponent.css";
import {useEffect} from "react";


interface ChildrenEditComponent {
    child: ChildrenInterface;
    onEdit: (edit: boolean) => void;
}


function ChildrenEditComponent(props: ChildrenEditComponent) {
    const { t } = useTranslation();



    const editChild = async () => {
        console.log('edit child', props.child._id, props.child.name, props.child.lastName, props.child.age)
        const name = (document.getElementById("children-edit-name-" + props.child._id) as HTMLInputElement).value;
        const lastName = (document.getElementById("children-edit-last-name-" + props.child._id) as HTMLInputElement).value;
        const age = (document.getElementById("children-edit-age-" + props.child._id) as HTMLSelectElement).value;
        const fontSize = (document.querySelector('input[name="fontSize"]:checked') as HTMLInputElement).value;


        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
        }

        const data = {
            name: name,
            lastName: lastName,
            age: age,
            fontSize: fontSize
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

    const handleChangeSizeFont = () => {
        const fontSize = (document.querySelector('input[name="fontSize"]:checked') as HTMLInputElement).value;
        const fontSizeExample = document.querySelector('.font-size-example') as HTMLAnchorElement;
        console.log(fontSize)
        if(fontSize === 'small') {
            fontSizeExample.style.fontSize = 'var(--children-font-size-choice-paragraph-small)';
        } else if(fontSize === 'medium') {
            fontSizeExample.style.fontSize = 'var(--children-font-size-choice-paragraph-medium)';
        }
        else {
            fontSizeExample.style.fontSize = 'var(--children-font-size-choice-paragraph-large)';
        }
    }

    useEffect(() => {
        const fontSize = props.child.fontSize;
        const fontSizeExample = document.querySelector('.font-size-example') as HTMLAnchorElement;
        if(fontSize === 'small') {
            (document.getElementById('child-edit-fontSizeSmall') as HTMLInputElement).checked = true;
            fontSizeExample.style.fontSize = 'var(--children-font-size-choice-paragraph-small)';
        }
        else if(fontSize === 'medium') {
            (document.getElementById('child-edit-fontSizeMedium') as HTMLInputElement).checked = true;
            fontSizeExample.style.fontSize = 'var(--children-font-size-choice-paragraph-medium)';
        }
        else {
            (document.getElementById('child-edit-fontSizeLarge') as HTMLInputElement).checked = true;
            fontSizeExample.style.fontSize = 'var(--children-font-size-choice-paragraph-large)';
        }
    })

    useEffect(() => {
        const radios = document.querySelectorAll('input[name="fontSize"]');
        radios.forEach(radio => {
            radio.addEventListener('change', handleChangeSizeFont)
        })
    }, [])


    return (
    <>
        <div className="children-edit-container">
            <h1 className="children-edit-title">{t('child-edit')}</h1>
            <div className="children-edit-form">
                <div className=" children-edit-input-container">
                    <input type="text" placeholder={t('name')} id={"children-edit-name-" + props.child._id} defaultValue={props.child.name}/>
                    <input type="text" placeholder={t('lastName')} id={"children-edit-last-name-" + props.child._id} defaultValue={props.child.lastName}/>
                    <select className="children-edit-select-age" id={"children-edit-age-" + props.child._id} defaultValue={props.child.age}>
                        <option value="" hidden>{t('age')}</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                    </select>
                    <div className="child-edit-font-size-choice">
                        <p className="child-edit-font-size-choice-title">{t('font-size-choice')} :</p>
                        <div className="child-edit-radio-container">
                            <div className="child-edit-font-size-radio">
                                <label htmlFor="fontSizeSmall">{t('font-size-small')}</label>
                                <input type="radio" id="child-edit-fontSizeSmall" name="fontSize" value="small" />
                            </div>
                            <div className="child-edit-font-size-radio">
                                <label htmlFor="fontSizeMedium">{t('font-size-medium')}</label>
                                <input type="radio" id="child-edit-fontSizeMedium" name="fontSize" value="medium" />
                            </div>
                            <div className="child-edit-font-size-radio">
                                <label htmlFor="fontSizeLarge">{t('font-size-large')}</label>
                                <input type="radio" id="child-edit-fontSizeLarge" name="fontSize" value="large" />
                            </div>
                        </div>
                        <a className="font-size-example">{t('font-size-example')}</a>
                    </div>
                </div>
                <div className="children-edit-button-container">
                    <ButtonAppComponent content={t('edit')} action={editChild} type={"classic"}></ButtonAppComponent>
                    <ButtonAppComponent content={t('child-delete')} type={"delete"} action={showWarning}></ButtonAppComponent>
                </div>
            </div>
        </div>
        <div className="children-delete-warning-popup" id={"children-delete-warning-popup-id-" + props.child._id}>
            <div className="children-delete-warning-popup-content">
                <h1>{t('child-deletion-warning-title')}</h1>
                <p>{t('child-deletion-warning-message')}</p>
                <div className="children-delete-warning-popup-buttons">
                    <ButtonAppComponent content={t('yes')} action={() => deleteChild(props.child._id)} type={"delete"}></ButtonAppComponent>
                    <ButtonAppComponent content={t('no')} type={"classic"} action={closeWarning}></ButtonAppComponent>
                </div>
            </div>
        </div>
    </>
  );
}


export default ChildrenEditComponent;