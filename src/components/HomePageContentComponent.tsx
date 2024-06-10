import GameScrollComponent from "./GameScrollComponent/GameScrollComponent.tsx";
import {Game} from "../interfaces/GameInterface.tsx";

const gamesList: Game[] = [
    { name: "Game 1" },
    { name: "Game 2" },
    { name: "Game 3" },
    // Add other games as necessary
];


export default function HomePageContentComponent() {
    return(
        <main>
            <div className="container-home-page-content">
                <h2>Title</h2>
                <button>Scan trash</button>
                <GameScrollComponent gamesList={gamesList}></GameScrollComponent>
            </div>
        </main>
    )
}