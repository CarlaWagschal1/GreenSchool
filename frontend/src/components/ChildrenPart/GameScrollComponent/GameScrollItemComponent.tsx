import {Game} from "../../../interfaces/GameInterface";
import "./GameScrollItemComponent.css";
import {useNavigate} from "react-router-dom";

export default function GameScrollItemComponent(game: Game) {
    const navigate = useNavigate();

    const navigateToGame = () => {
        // Navigate to the game page
        navigate(game.url);
    }


    return(
        <>
            <div className="container-game-scroll-item" onClick={navigateToGame}>
                <div className="img-container">
                    <img src={game.img} alt="Game Image"></img>
                </div>
                <h2 className="game-name">{game.name}</h2>
            </div>
        </>
    )
}