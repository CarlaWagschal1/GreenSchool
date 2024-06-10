import {Game} from "../../interfaces/GameInterface.tsx";

interface GameScrollProps {
    gamesList: Game[];
}

export default function GameScrollComponent({gamesList}: GameScrollProps) {
    return (
        <main>
            <div className="container-game-scroll">
                {gamesList.map((item: Game) => <li key={item.name}>{item.name}</li>)}
            </div>
        </main>
    )
}