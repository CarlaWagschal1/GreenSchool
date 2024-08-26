import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import './FinalContentComponent.css';


interface FinalContentComponentProps {
    playAgain: () => void;

}

function FinalContentComponent(props: FinalContentComponentProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const playAgain = props.playAgain;

    const backToGameChoice = () => {
        navigate('/game-choice')
    }


    return (
        <div className="final-content">
            <h2 className="final-content-message">{t('game-over')}</h2>
            <div className="final-content-btn-container">
                <ButtonAppComponent content={t('play-again')} type={"classic"} action={playAgain} />
                <ButtonAppComponent content={t('change-game')} type={"classic"} action={backToGameChoice} />
            </div>
        </div>
    );
}

export default FinalContentComponent;