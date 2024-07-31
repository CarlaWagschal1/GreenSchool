import {useEffect, useState} from 'react';
import axios from 'axios';

import BinComponent from "./BinComponent";
import WasteComponent from "./WasteComponent";
import Bouteille from '../../../../mocks/img/bouteille.png';
import Armoire from '../../../../mocks/img/armoire.png';
import Trognon from '../../../../mocks/img/trognon.png';
import PoubelleDnd from '../../../../mocks/img/poubelle-tri-dnd.png';
import Table from '../../../../mocks/img/table.png';
import Cookie from '../../../../mocks/img/cookie.png';
import Carton from '../../../../mocks/img/carton.png';

import './DragAndDropGameComponent.css'
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";
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

    const [scoreError, setScoreError] = useState(0);
    const [wasteItems, setWasteItems] = useState(initialWasteItems);
    const sizeWasteItems = initialWasteItems.length;

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [errorList, setErrorList] = useState<string[]>([]);

    useEffect(() => {
        setStartTime(new Date());
    }, []);

    useEffect(() => {
        if (wasteItems.length === 0) {
            registerScore();
        }
    }, [wasteItems]);

    const getElapsedTime = () => {
        const endTime = new Date();
        console.log('Start time:', startTime);
        console.log('End time:', endTime);
        if (startTime) {
            const elapsed = (endTime.getTime() - startTime.getTime()) / 1000; // to seconds
            return `${elapsed}`;
        }
        return null;
    };

    const registerScore = async () => {
        const elapsedTime = getElapsedTime();

        console.log('Score:', scoreError, 'Elapsed time:', elapsedTime, 'Errors:', errorList);

        const childrenToken = localStorage.getItem('childrenToken');

        console.log("falseResults:", errorList)




        if (!childrenToken) {
            console.error('No children token found');
            return;
        }

        try {
            const data = {
                childrenToken,
                gameID: 'sorting-waste',
                score: scoreError,
                date: new Date().toISOString(),
                errors: errorList,
                elapsedTime: elapsedTime
            };
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage.getItem('token') || '')
            }

            console.log(data);
            console.log(headers);

            const rep = await axios.post('http://localhost:5000/api/scores', data, {headers: headers});

            console.log(rep);
            if(rep.status === 200){
                console.log('Score registered');
            }
        }
        catch (error) {
            console.error(error);
        }


    }

    const handleDrop = (type: string) => (item: { name: string; img: string; type: string }) => {
        console.log(item, type);
        if (item.type === type) {
            setWasteItems((prevItems) => prevItems.filter((wasteItem) => wasteItem.name !== item.name));
        } else {
            setErrorList((prevErrorList) => [...prevErrorList, item.name]);
            setScoreError((prevScore) => prevScore + 1);
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
                    <h2 className="drag-and-drop-game-final-message">Game Over! Final score: {scoreError} / {sizeWasteItems}</h2>
                ) : (
                    <div className="game-content">

                        <h2 className="drag-and-drop-game-info" style={ {display:"none"}

                        }
                        >Score: {scoreError} </h2>

                        <div className="game-container">
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
                        </div>
                    </div>
                )}
                <div className="button-home">
                    <ButtonAppComponent content={"BACK"} action={navigateToHomePage} type={"classic"}/>
                </div>

            </div>
        </main>

    );
}

export default DragAndDropGameComponent;