import ButtonAppComponent from "../../ButtonAppComponent/ButtonAppComponent";

import './GameStatsCard.css';

interface GameStatsInterface {
    nameGame: string;
    gameId: string;
    onClick: (gameId: string) => void;
    isSelected: boolean;
}

function GameStatsCard(props: GameStatsInterface) {


    const handleClick = () => {
        props.onClick(props.gameId);
        console.log('gameId:', props.gameId)
        console.log('isSelected:', props.isSelected)
    };



    return (
        <>
            <div className={`${props.isSelected ? 'game-stat-card-selected' : 'game-stat-card'}`} onClick={handleClick}>
                <h2 className="card-title">{props.nameGame}</h2>
                <div className="handle-btn-game-stats-card">
                    <ButtonAppComponent content={"See Stats "} action={handleClick}></ButtonAppComponent>
                </div>
            </div>
        </>
    )

}

export default GameStatsCard;