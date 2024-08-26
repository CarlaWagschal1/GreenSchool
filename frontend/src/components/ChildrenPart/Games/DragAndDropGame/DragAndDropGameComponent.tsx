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
import { useTranslation} from "react-i18next";
import FinalContentComponent from "../../FinalContentComponent/FinalContentComponent";

interface WasteItem {
    name: string;
    img: string;
    type: string;
}

const initialWasteItems: WasteItem[] = [
    {name: 'plastic-bottle', img: Bouteille, type: 'recyclable'},
    {name: 'bulky-cabinet', img: Armoire, type: 'bulky'},
    {name: 'food-core', img: Trognon, type: 'food'},
    {name: 'bulky-table', img: Table, type: 'bulky'},
    {name: 'food-cookie', img: Cookie, type: 'food'},
    {name: 'recyclable-cardboard', img: Carton, type: 'recyclable'},
];

function DragAndDropGameComponent(){
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [scoreError, setScoreError] = useState(0);
    const [wasteItems, setWasteItems] = useState(initialWasteItems);
    //const sizeWasteItems = initialWasteItems.length;

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [errorList, setErrorList] = useState<string[]>([]);

    const age = localStorage.getItem('childrenAge');

    useEffect(() => {
        const age = localStorage.getItem('childrenAge');
        if(age && parseInt(age) < 8){
            setWasteItems(initialWasteItems.slice(0, 3));
        }
        else if (age && parseInt(age) < 12){
            setWasteItems(initialWasteItems);
        }
        else {
            console.log('Age not found');
        }
    }, []);

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

        if (startTime) {
            const elapsed = (endTime.getTime() - startTime.getTime()) / 1000; // to seconds
            return `${elapsed}`;
        }
        return null;
    };

    const registerScore = async () => {
        const elapsedTime = getElapsedTime();


        const childrenToken = localStorage.getItem('childrenToken');


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


            const rep = await axios.post('http://localhost:5000/api/scores', data, {headers: headers});


            if(rep.status === 200){
                console.log('Score sorting waste registered');
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

    const goToGameChoice = () => {
        navigate('/game-choice');
    }

    const handlePlayAgain = () => {
        if(age && parseInt(age) < 8){
            setWasteItems(initialWasteItems.slice(0, 3));
        }
        else if (age && parseInt(age) < 12){
            setWasteItems(initialWasteItems);
        }
        else {
            console.log('Age not found');
        }
        setScoreError(0);
        setErrorList([]);
        setStartTime(new Date());
    }

    return (
        <main>
            <div className="drag-and-drop-game-container">
                <div className="drag-and-drop-game-info">
                    <h1>{t('drag-and-drop')}</h1>
                </div>
                {isGameOver ? (
                    <FinalContentComponent playAgain={handlePlayAgain}/>
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
                    <ButtonAppComponent content={t('back')} action={goToGameChoice} type={"classic"}/>
                </div>

            </div>
        </main>

    );
}

export default DragAndDropGameComponent;