import {useState} from 'react';
import BinComponent from "./BinComponent";
import WasteComponent from "./WasteComponent";
import Bouteille from '../../mocks/img/bouteille.png';
import Armoire from '../../mocks/img/armoire.png';
import Trognon from '../../mocks/img/trognon.png';
import PoubelleDnd from '../../mocks/img/poubelle-tri-dnd.png';
import Table from '../../mocks/img/table.png';
import Cookie from '../../mocks/img/cookie.png';
import Carton from '../../mocks/img/carton.png';

import './DragAndDropGameComponent.css'
import ButtonAppComponent from "../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";

interface WasteItem {
    name: string;
    img: string;
    type: string;
}

const initialWasteItems: WasteItem[] = [
    {name: 'bouteille recyclable', img: Bouteille, type: 'recyclable'},
    {name: 'armoire encombrant', img: Armoire, type: 'bulky'},
    {name: 'trognon alimentaire', img: Trognon, type: 'food'},
    {name: 'table encombrant', img: Table, type: 'bulky'},
    {name: 'cookie alimentaire', img: Cookie, type: 'food'},
    {name: 'carton recyclable', img: Carton, type: 'recyclable'},
];

function DragAndDropGameComponent(){
    const navigate = useNavigate();

    const [score, setScore] = useState(0);
    const [wasteItems, setWasteItems] = useState(initialWasteItems);
    const sizeWasteItems = initialWasteItems.length;

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

    const navigateToHomePage = () => {
        navigate('/welcome');
    }

    return (
        <main>
            <div className="drag-and-drop-game-container">
                <div className="drag-and-drop-game-info">
                    <h1>Sorting of Waste</h1>
                </div>
                {isGameOver ? (
                    <h2 className="drag-and-drop-game-final-message">Game Over! Final score: {score} / {sizeWasteItems}</h2>
                ) : (
                    <>
                        <h2 className="drag-and-drop-game-info">Score: {score} / {sizeWasteItems}</h2>
                        <div className="bin-waste-container">
                            <BinComponent type="recyclable" img={PoubelleDnd} onDrop={handleDrop('recyclable')}/>
                            <BinComponent type="bulky" img={PoubelleDnd} onDrop={handleDrop('bulky')}/>
                            <BinComponent type="food" img={PoubelleDnd} onDrop={handleDrop('food')}/>
                        </div>
                        <div className="waste-item-container">
                            {wasteItems.map((wasteItem) => (
                                <WasteComponent key={wasteItem.name} name={wasteItem.name} img={wasteItem.img}
                                                type={wasteItem.type}/>
                            ))}
                        </div>
                    </>
                )}
                <div className="button-home">
                    <ButtonAppComponent content={"HOME"} action={navigateToHomePage}/>
                </div>

            </div>
        </main>

    );
}

export default DragAndDropGameComponent;