import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import axios from "axios";
import { useTranslation} from "react-i18next";

import "./ChildrenCreationComponent.css";
import {useEffect} from "react";

interface ChildrenCreationComponentProps {
    onCreate: (creation: boolean) => void;

}
function ChildrenCreationComponent( {onCreate}: ChildrenCreationComponentProps){
    const {t} = useTranslation();


    const createChild = async () => {
        try {
            const name = (document.getElementsByClassName('children-creation-name')[0] as HTMLInputElement).value;
            const lastName = (document.getElementsByClassName('children-creation-lastname')[0] as HTMLInputElement).value;
            const age = (document.querySelector('select') as HTMLSelectElement).value;
            const fontSize = (document.querySelector('input[name="fontSize"]:checked') as HTMLInputElement).value;
            console.log(name, lastName, age, fontSize)

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

            const rep = await axios.post('http://localhost:5000/api/children', data
                , { headers: headers })

            console.log(rep)
            if(rep.status === 201) {
                onCreate(true);
                (document.getElementsByClassName('children-creation-name')[0] as HTMLInputElement).value = '';
                (document.getElementsByClassName('children-creation-lastname')[0] as HTMLInputElement).value = '';
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    const handleChangeSizeFont = () => {
        const fontSize = (document.querySelector('input[name="fontSize"]:checked') as HTMLInputElement).value;
        const fontSizeExample = document.querySelector('.creation-font-size-example') as HTMLAnchorElement;
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
        const radios = document.querySelectorAll('input[name="fontSize"]');
        radios.forEach(radio => {
            radio.addEventListener('change', handleChangeSizeFont)
        })
    }, [])



    return (
        <div className="children-creation-container">
            <h1 className="children-creation-title">{t('child-creation')}</h1>
            <div className="children-creation-form">
                <div className="input-creation-container">
                    <input className="children-creation-name" type="text" placeholder={t('name')} />
                    <input className="children-creation-lastname" type="text" placeholder={t('lastName')} />
                    <select className="children-creation-select-age" defaultValue="">
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
                    <div className="font-size-choice">
                        <p className="font-size-choice-title">{t('font-size-choice')} :</p>
                        <div className="radio-container">
                            <div className="font-size-radio">
                                <label htmlFor="fontSizeSmall">{t('font-size-small')}</label>
                                <input type="radio" id="fontSizeSmall" name="fontSize" value="small" />
                            </div>
                            <div className="font-size-radio">
                                <label htmlFor="fontSizeMedium">{t('font-size-medium')}</label>
                                <input type="radio" id="fontSizeMedium" name="fontSize" value="medium" />
                            </div>
                            <div className="font-size-radio">
                                <label htmlFor="fontSizeLarge">{t('font-size-large')}</label>
                                <input type="radio" id="fontSizeLarge" name="fontSize" value="large" />
                            </div>
                        </div>
                        <a className="creation-font-size-example">{t('font-size-example')}</a>
                    </div>
                </div>
                <div className="button-container">
                    <ButtonAppComponent content={t('create')} action={createChild} type={"classic"}></ButtonAppComponent>
                </div>
            </div>

        </div>
    )
}

export default ChildrenCreationComponent;