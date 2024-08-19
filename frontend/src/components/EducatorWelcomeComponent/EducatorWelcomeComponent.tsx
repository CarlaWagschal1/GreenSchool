import Enfant from "../../assets/enfants.png";
import Lesson from "../../assets/livre.png";
import Profile from "../../assets/profil.png";
import LogOut from "../../assets/logout.png";
import Close from "../../assets/close.png";

import "./EducatorWelcomeComponent.css";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

import {useTranslation} from "react-i18next";

function EducatorWelcomeComponent() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const goToChildrenManager = () => {
        navigate('/children-manager');
    }

    const goToLessonsManager = () => {
        navigate('/lessons-manager');
    }

    const goToProfile = () => {
        navigate('/profile');
    }

    const logout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
        }
        localStorage.clear();
        navigate('/');
    }


    const showWelcomePopup = () => {
        const popup = document.querySelector('.welcome-popup') as HTMLElement;
        popup.style.display = 'block';
    }

    const closePopup = () => {
        const popup = document.querySelector('.welcome-popup') as HTMLElement;
        popup.style.display = 'none';
    }

    useEffect(() => {
        const firstConnection = localStorage.getItem('firstConnection');
        if (firstConnection === 'true') {
            showWelcomePopup();
            localStorage.setItem('firstConnection', 'false');
        }
    });


    return (
        <main>
            <div className="educator-welcome-container">
                <h1>{t('welcome')}</h1>
                <div className="container-card">
                    <div className="card" onClick={goToChildrenManager}>
                        <div className="card-img">
                            <img src={Enfant} alt="Enfant" />
                        </div>
                        <div className="card-content">
                            <h2>{t('children')}</h2>
                            <p>{t('manage-children')}</p>
                        </div>
                    </div>
                    <div className="card" onClick={goToLessonsManager}>
                        <div className="card-img">
                            <img src={Lesson} alt="Leçon" />
                        </div>
                        <div className="card-content">
                            <h2>{t('lessons')}</h2>
                            <p>{t('manage-lessons')}</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-img">
                            <img alt="coming soon" />
                        </div>
                        <div className="card-content">
                            <h2>Coming soon</h2>
                            <p>Manage your coming soon</p>
                        </div>
                    </div>
                    <div className="card" onClick={goToProfile}>
                        <div className="card-img">
                            <img src={Profile} alt="profil"/>
                        </div>
                        <div className="card-content">
                            <h2>{t('profile')}</h2>
                            <p>{t('manage-profile')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="logout-educator-container">
                <img src={LogOut} alt={"Log Out"} onClick={logout}/>
            </div>
            <div className="welcome-popup">
                <div className="welcome-popup-content">
                    <div className="welcome-popup-css">
                        <h1>{t('welcome')}</h1>
                        <p>{t('welcome-message1')}</p>
                        <p>{t('welcome-message2')}</p>
                        <p>{t('welcome-message3')}</p>
                        <p>{t('welcome-message4')}</p>
                        <p>{t('welcome-message5')}</p>
                        <p className="last-paragraph">{t('welcome-message6')}</p>
                        <div className="welcome-popup-close">
                            <img src={Close} alt={"Close"} onClick={closePopup}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EducatorWelcomeComponent;