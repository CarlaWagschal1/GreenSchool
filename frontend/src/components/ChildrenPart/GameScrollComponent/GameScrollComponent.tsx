import {Game} from "../../../interfaces/GameInterface.tsx";
import GameScrollItemComponent from "./GameScrollItemComponent";
import "./GameScrollComponent.css";
import {useTranslation} from "react-i18next";

interface GameScrollProps {
    gamesList: Game[];
}

export default function GameScrollComponent({gamesList}: GameScrollProps) {
    const { t } = useTranslation();

    return (
        <>
            <div className="container-game-scroll">
                {gamesList.map((item: Game) =>
                    <li key={item.name}>
                        <GameScrollItemComponent name={t(item.name)} img={item.img} url={item.url}></GameScrollItemComponent>
                    </li>)}
            </div>
        </>
    )
}