import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import "./HomePageComponent.css";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import LanguageChoiceComponent from "../LanguageComponent/LanguageChoiceComponent";

const HomePageComponent = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const goToLoginPage = () => {
        navigate('/login');
    }

    const goToSignInPage = () => {
        navigate('/signin');
    }
    return (
        <main>
            <div className="container-home-page-content">
                <h1 className="green-school-text">{t('greenschool')}</h1>
                <h2 className="green-school-explanation">{t('greenschool-explanation')}</h2>

                <div className="connection-container">
                    <h1 className="join-us-text">{t('join-us-text')}</h1>
                    <div className="button-container-home">
                        <ButtonAppComponent content={t('login')} action={goToLoginPage} type={"classic"}></ButtonAppComponent>
                        <ButtonAppComponent content={t('signin')} action={goToSignInPage} type={"classic"}></ButtonAppComponent>
                    </div>
                </div>


            </div>
            <div className="language-choice">
                <LanguageChoiceComponent></LanguageChoiceComponent>
            </div>
        </main>
    )
}

export default HomePageComponent