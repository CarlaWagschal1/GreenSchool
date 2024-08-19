import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import './SignInComponent.css'
import {useEffect} from "react";
import { useTranslation} from "react-i18next";


function SignInComponent() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const createAccount = async () => {
        const name = (document.querySelectorAll('input[type="text"]')[0] as HTMLInputElement).value;
        const email = (document.querySelectorAll('input[type="text"]')[1] as HTMLInputElement).value;
        const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;
        const confirmPassword = (document.querySelectorAll('input[type="password"]')[1] as HTMLInputElement).value;
        if (password === confirmPassword) {

            try {
                const rep = await axios.post('http://localhost:5000/api/signin', {
                    name: name,
                    email: email,
                    password: password
                })
                console.log(rep.data)
                if(rep.data.token){
                    localStorage.setItem('token', rep.data.token);
                    localStorage.setItem('firstConnection', 'true');
                    navigate('/educator');
                }
            }
            catch (error) {
                console.log(error)
            }
        } else {
            console.log("erreur ")
        }


    }

    const goToHome = () => {
        navigate('/home');
    }

    const handleEvent = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            createAccount();
        }
    }

    useEffect(() => {
        document.addEventListener('keypress', handleEvent);
        return () => {
            document.removeEventListener('keypress', handleEvent);
        }
    })

    return (
        <main>
            <div className="signin-container">
                <h1 className="signin-title">{t('signin')}</h1>
                <div className="signin-form">
                    <div className="input-container">
                        <input type="text" placeholder={t('name')} />
                        <input type="text" placeholder={t('email')} />
                        <input type="password" placeholder={t('password')} />
                        <input type="password" placeholder={t('confirm-password')} />
                    </div>
                    <ButtonAppComponent content={t('signin')} action={createAccount} type={"classic"}/>
                </div>

            </div>
            <div className="home-button">
                <ButtonAppComponent content={t('back')} action={goToHome} type={"classic"}/>
            </div>
        </main>

    )
}

export default SignInComponent;