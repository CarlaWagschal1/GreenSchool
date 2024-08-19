import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import "./WelcomePageContentComponent.css";
import { useNavigate } from 'react-router-dom';
import LogOutIMG from "../../../assets/logout.png";
import GameIMG from "../../../assets/de.png";
import LessonIMG from "../../../assets/ampoule.png";
import ChildrenLogoutComponent from "../../Children/ChildrenLogoutComponent/ChildrenLogoutComponent";
import { useTranslation} from "react-i18next";

export default function WelcomePageContentComponent() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const navigateToScanPage = () => {
        navigate('/scan');
    }

    const handleHideLogOutPopup = (cancel: boolean) => {
        if(cancel){
            hideLogOutPopup();
        }

    }

    const showLogOutPopup = () => {
        const logoutPopup = document.querySelector('.logout-popup') as HTMLDivElement;
        logoutPopup.style.display = "block";
    }

    const hideLogOutPopup = () => {
        const logoutPopup = document.querySelector('.logout-popup') as HTMLDivElement;
        logoutPopup.style.display = "none";
    }

    const goToGameChoice = () => {
        navigate('/game-choice');
    }

    const goToLessonChoice = () => {
        navigate('/children-lesson-list');
    }

    return(
        <main>
            <div className="container-home-page-content">
                <h2 className="welcome-text">{t('welcome-to-greenschool')}</h2>
                <div className="button-container">
                    <ButtonAppComponent content={t('class-your-waste')} action={navigateToScanPage} type={"classic"}></ButtonAppComponent>
                </div>
                <div className="welcome-children-choice-container">
                    <div className="welcome-children-choice" onClick={goToGameChoice}>
                        <p>{t('game')}</p>
                        <div className="welcome-children-choice-img">
                            <img src={GameIMG} alt={"Game"}></img>
                        </div>
                    </div>
                    <div className="welcome-children-choice" onClick={goToLessonChoice}>
                        <p>{t('lesson')}</p>
                        <div className="welcome-children-choice-img">
                            <img src={LessonIMG} alt={"Lesson"}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="logout-button">
                <img src={LogOutIMG} alt={"Log Out"} onClick={showLogOutPopup}/>
            </div>
            <div className="logout-popup">
                <div className="logout-popup-content">
                    <div className="logout-popup-component">
                        <ChildrenLogoutComponent cancelLogout={handleHideLogOutPopup}></ChildrenLogoutComponent>
                    </div>
                </div>
            </div>
        </main>
    )
}