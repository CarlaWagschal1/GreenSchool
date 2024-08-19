import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import axios from 'axios';

import './ChildrenLogoutComponent.css';

import Close from '../../../assets/close.png';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

interface ChildrenLogoutComponentProps {
  cancelLogout: (cancel: boolean) => void;
}

function ChildrenLogoutComponent({cancelLogout}: ChildrenLogoutComponentProps) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const LogOut = async () => {


        const password = document.querySelector('input') as HTMLInputElement;
        if (password) {
            try {
                const data = {
                    password: password.value,
                    token: localStorage.getItem('token')
                };
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
                }


                const rep = await axios.post('http://localhost:5000/api/children/logout', data, {headers: headers});

                if(rep.status === 200){
                    localStorage.removeItem('childrenToken');
                    navigate('/children-manager');
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    const handleCancel = () => {
        cancelLogout(true);
    }

    const handleEvent = (e: KeyboardEvent) => {
        if(e.key === 'Escape'){
            cancelLogout(true);
        }
        if(e.key === 'Enter'){
            LogOut();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEvent);
        return () => {
            document.removeEventListener('keydown', handleEvent);
        }
    })

    return (
        <div className="children-logout">
            <div className="children-logout-content">
                <h1>{t('child-logout-message')}</h1>
                <input type={"password"} />
                <ButtonAppComponent content={t('logout')} action={LogOut} type={"classic"}></ButtonAppComponent>
                </div>
            <img className="close-img" src={Close} alt={"close"} onClick={handleCancel}/>
        </div>


    );
}

export default ChildrenLogoutComponent;