import GameScrollComponent from "../GameScrollComponent/GameScrollComponent.tsx";
import {Game} from "../../interfaces/GameInterface.tsx";
import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import "./HomePageContentComponent.css";
import WasteGameIMG from "../../mocks/img/waste-game-img.png";

const gamesList: Game[] = [
    { name: "Game 1", img: WasteGameIMG },
    { name: "Game 2", img: WasteGameIMG },
    { name: "Game 3", img: WasteGameIMG },
    // Add other games as necessary
];


export default function HomePageContentComponent() {
    return(
        <main>
            <div className="container-home-page-content">
                <h2 className="welcome-text">WELCOME TO GREENSCHOOL !</h2>
                <p className="button-container">
                    <ButtonAppComponent content={"CLASS YOUR WASTE"}></ButtonAppComponent>
                </p>
                <div className="game-scroll">
                    <GameScrollComponent gamesList={gamesList}></GameScrollComponent>
                </div>
            </div>
        </main>
    )
}