import {Game} from "../../interfaces/GameInterface.tsx";
import GameScrollItemComponent from "./GameScrollItemComponent";
import "./GameScrollComponent.css";

interface GameScrollProps {
    gamesList: Game[];
}

export default function GameScrollComponent({gamesList}: GameScrollProps) {
    return (
        <main>
            <div className="container-game-scroll">
                {gamesList.map((item: Game) =>
                    <li key={item.name}>
                        <GameScrollItemComponent name={item.name} img={item.img}></GameScrollItemComponent>
                    </li>)}
            </div>
        </main>
    )
}