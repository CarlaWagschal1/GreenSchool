import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import {Game} from "../../../interfaces/GameInterface";

import './PopUpConsignesComponent.css';

interface PopUpConsignesComponentProps {
    game: Game;
}

function PopUpConsignesComponent(props: PopUpConsignesComponentProps) {
    const [consignes, setConsignes] = useState<string>('');
    const { t } = useTranslation();

    useEffect(() => {
        console.log(props.game.name)
        if(props.game.name === "Raining Waste"){
            setConsignes(t('raining-waste-consignes'));
        }
        if(props.game.name === "Drag and Drop"){
            setConsignes(t('drag-and-drop-consignes'));
        }
    }, [props.game]);

    useEffect(() => {
        const fontSize = localStorage.getItem('childrenFontSize');
        console.log(fontSize)
        if(fontSize){
            const consignes = document.getElementsByClassName("consignes-paragraph")[0] as HTMLElement;
            const title = document.getElementsByTagName("h2")[0] as HTMLElement;
            if(fontSize == "small") {
                consignes.style.fontSize = 'var(--children-font-size-choice-paragraph-small)';
                title.style.fontSize = 'var(--children-font-size-choice-title-small)';
            }
            if(fontSize == "medium") {
                consignes.style.fontSize = 'var(--children-font-size-choice-paragraph-medium)';
                title.style.fontSize = 'var(--children-font-size-choice-title-medium)';
            }
            if(fontSize == "large") {
                consignes.style.fontSize = 'var(--children-font-size-choice-paragraph-large)';
                title.style.fontSize = 'var(--children-font-size-choice-title-large)';
            }

        }
    });

    const navigate = useNavigate();


    const goToGame = () => {
        navigate(props.game.url);
    }

    return (
        <div className="popup-consignes">
            <h2 className="consignes-title">{t('consignes')}</h2>
            <p className="consignes-paragraph">{consignes}</p>
            <div className="popup-consignes-buttons">
                <ButtonAppComponent content={t('lets-go')} type={"classic"} action={goToGame}/>
            </div>
        </div>
    );

}


export default PopUpConsignesComponent;