import {Game} from "../../interfaces/GameInterface";
import "./GameScrollItemComponent.css";

export default function GameScrollItemComponent(game: Game) {
    return(
        <>
            <div className="container-game-scroll-item">
                <div className="img-container">
                    <img src={game.img} alt="Game Image"></img>
                </div>
                <h2 className="game-name">{game.name}</h2>
            </div>
        </>
    )
}