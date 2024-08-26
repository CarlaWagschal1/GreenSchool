import {Game} from "../../../interfaces/GameInterface";
import "./GameScrollItemComponent.css";
import PopUpConsignesComponent from "../PopUpConsignesComponent/PopUpConsignesComponent";
import Close from "../../../assets/close.png";

export default function GameScrollItemComponent(game: Game) {

    const showPopup = () => {
        console.log("showPopup")
        const popup = document.getElementById("game-popup-consign-" + game.name) as HTMLElement;
        popup.style.display = "flex";
    }

    const closePopup = () => {
        console.log("closePopup")
        const popup = document.getElementById("game-popup-consign-" + game.name) as HTMLElement;
        popup.style.display = "none";
    }


    return(
        <>
            <div className="container-game-scroll-item" onClick={showPopup}>
                <div className="img-container">
                    <img src={game.img} alt="Game Image"></img>
                </div>
                <h2 className="game-name">{game.name}</h2>
            </div>
            <div className="game-scroll-item-popup" id={"game-popup-consign-" + game.name}>
                <div className="game-scroll-item-popup-css">
                    <PopUpConsignesComponent game={game}/>
                    <div className="game-scroll-item-popup-close">
                        <img src={Close} alt={"Close"} onClick={closePopup}></img>
                    </div>
                </div>
            </div>
        </>
    )
}