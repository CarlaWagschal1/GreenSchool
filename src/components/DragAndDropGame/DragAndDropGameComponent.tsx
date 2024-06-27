import {useState} from 'react';
import BinComponent from "./BinComponent";
import WasteComponent from "./WasteComponent";
import Bouteille from '../../mocks/img/bouteille.png';
import Armoire from '../../mocks/img/armoire.png';
import Trognon from '../../mocks/img/trognon.png';
import PoubelleDnd from '../../mocks/img/poubelle-tri-dnd.png';
import './DragAndDropGameComponent.css'

interface WasteItem {
    name: string;
    img: string;
    type: string;
}

const initialWasteItems: WasteItem[] = [
    {name: 'bouteille en plastique', img: Bouteille, type: 'plastique'},
    {name: 'armoire encombrant', img: Armoire, type: 'encombrant'},
    {name: 'trognon alimentaire', img: Trognon, type: 'alimentaire'},
];

function DragAndDropGameComponent() {
    const [score, setScore] = useState(0);
    const [wasteItems, setWasteItems] = useState(initialWasteItems);

    const handleDrop = (type: string) => (item: { name: string; img: string; type: string }) => {
        console.log(item, type);
        if (item.type === type) {
            setScore((prevScore) => prevScore + 1);
            setWasteItems((prevItems) => prevItems.filter((wasteItem) => wasteItem.name !== item.name));
        } else {
            setScore((prevScore) => prevScore - 1);
        }
    };

    const isGameOver = wasteItems.length === 0;

    return (
        <div className="drag-and-drop-game-container">
            <div className="drag-and-drop-game-info">
                <h1>Jeu de Tri des Déchets</h1>
                <h2>Score: {score}</h2>
            </div>
            {isGameOver ? (
                <h2 className="drag-and-drop-game-final-message">Jeu terminé! Score final: {score}</h2>
            ) : (
                <>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <BinComponent type="plastique" img={PoubelleDnd} onDrop={handleDrop('plastique')}/>
                        <BinComponent type="encombrant" img={PoubelleDnd} onDrop={handleDrop('encombrant')}/>
                        <BinComponent type="alimentaire" img={PoubelleDnd} onDrop={handleDrop('alimentaire')}/>
                    </div>
                    <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                        {wasteItems.map((wasteItem) => (
                            <WasteComponent key={wasteItem.name} name={wasteItem.name} img={wasteItem.img}
                                            type={wasteItem.type}/>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default DragAndDropGameComponent;