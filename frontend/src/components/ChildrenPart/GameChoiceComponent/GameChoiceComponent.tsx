import GameScrollComponent from "../GameScrollComponent/GameScrollComponent";
import {Game} from "../../../interfaces/GameInterface";
import WasteGameIMG from "../../../mocks/img/waste-game-img.png";

import './GameChoiceComponent.css';
import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";


const gamesList: Game[] = [
    { name: "drag-and-drop", img: WasteGameIMG, url: '/game1'},
    { name: "raining-waste", img: WasteGameIMG, url: '/game2' },
    { name: "Game 3", img: WasteGameIMG, url: '/game3' },
    // Add other games as necessary
];

function GameChoiceComponent() {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/welcome')
    }


    return (
        <main>
            <div className="game-scroll">
                <h2 className="game-choice-title">Choose a game</h2>
                <GameScrollComponent gamesList={gamesList}></GameScrollComponent>
            </div>
            <div className="game-choice-back-btn">
                <ButtonAppComponent content={"BACK"} type={"classic"} action={goBack}></ButtonAppComponent>
            </div>
        </main>
    );
}

export default GameChoiceComponent;