import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import DragNDropGame from "../../games/DragNDropGame/DragNDropGame.tsx";
import {Game} from "../../interfaces/GameInterface.tsx";
import "./GameDisplayPage.css"


export interface GameDisplayPageProps {
    game: Game
}


export default function GameDisplayPage({game}: GameDisplayPageProps) {
    return (
        <>
            <div className="game-display-page-container">
                <h1 className="game-display-title">{game.name}</h1>
                <section className={"game-display-section"}>
                    <DndProvider backend={HTML5Backend}>
                        <DragNDropGame></DragNDropGame>
                    </DndProvider>
                </section>
            </div>
        </>
    )
}