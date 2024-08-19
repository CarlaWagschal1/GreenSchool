import {useState, useRef, useEffect} from 'react';
import axios from 'axios';

import FallingWaste from './FallingWaste';
import TrashBin from './TrashBin';
import Bouteille from '../../../../mocks/img/bouteille.png';
import Armoire from '../../../../mocks/img/armoire.png';
import Trognon from '../../../../mocks/img/trognon.png';
import PoubelleDnd from '../../../../mocks/img/poubelle-tri-dnd.png';
import Table from '../../../../mocks/img/table.png';
import Cookie from '../../../../mocks/img/cookie.png';
import Carton from '../../../../mocks/img/carton.png';

import './RainingWasteComponent.css';
import ButtonAppComponent from "../../../ButtonAppComponent/ButtonAppComponent";
import {useNavigate} from "react-router-dom";
import { useTranslation} from "react-i18next";

interface WasteItem {
    name: string;
    img: string;
    type: string;
    id: number;
    position: { top: number, left: number };
}



const initialWasteItems: WasteItem[] = [
    { id: 1, name: 'plastic-bottle', img: Bouteille, type: 'recyclable', position: { top: -300, left: 0 } },
    { id: 2, name: 'bulky-cabinet', img: Armoire, type: 'bulky', position: { top: -300, left: 70 } },
    { id: 3, name: 'food-core', img: Trognon, type: 'food', position: { top: -300, left: 140 } },
    { id: 4, name: 'bulky-table', img: Table, type: 'bulky', position: { top: -300, left: 210 } },
    { id: 5, name: 'food-cookie', img: Cookie, type: 'food', position: { top: -300, left: 280 } },
    { id: 6, name: 'recyclable-cardboard', img: Carton, type: 'recyclable', position: { top: -300, left: 350 } },
];

const RainingWasteComponent = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [wasteType, setWasteType] = useState("none");

    const [score, setScore] = useState<number>(0);
    const [wasteItems, setWasteItems] = useState(initialWasteItems);
    const [binType, setBinType] = useState<string>(wasteType);
    const [binPosition, setBinPosition] = useState({ left: 0, width: 50, height: 80 });
    const containerRef = useRef<HTMLDivElement>(null);

    const [startTime, setStartTime] = useState<Date | null>(null);
    const [scoreError, setScoreError] = useState<number>(0);
    const [errorList, setErrorList] = useState<string[]>([]);

    const intialWasteItems = () => {
        const age = localStorage.getItem('childrenAge');
        if (age && parseInt(age) < 8) {
            setWasteItems(initialWasteItems.slice(0, 3));
        } else if (age && parseInt(age) < 12) {
            setWasteItems(initialWasteItems);
        } else {
            console.log('Age not found');
        }
    }

    useEffect(() => {
        intialWasteItems();
    }, []);

    useEffect(() => {
        if(wasteType === "none"){
            const backBtn = document.querySelector('.raining-waste-button-home') as HTMLDivElement;
            if(backBtn){
                backBtn.style.display = 'block';
            }
        }
    }, [wasteType]);

    useEffect(() => {
        setStartTime(new Date());
    }, []);

    useEffect(() => {
        if (score >= 10) {
            registerScore();
        }
    }, [score]);

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
                gameID: 'raining-waste',
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
                console.log('Score raining waste registered');
            }
        }
        catch (error) {
            console.error(error);
        }


    }

    const generateUniquePosition = (existingItems: WasteItem[], containerWidth: number) => {
        let newLeft: number;
        let isOverlapping: boolean;
        do {
            newLeft = Math.random() * (containerWidth - 80); // Adjusting for the width of the waste item
            isOverlapping = existingItems.some(item => Math.abs(item.position.left - newLeft) < 80);
        } while (isOverlapping);
        return { top: 0, left: newLeft };
    };

    const handleCatch = (id: number, type: string) => {
        if (type === binType || binType === 'all') {
            setScore((prevScore) => prevScore + 1);
            console.log(score)
            if(score === 9) {
                const btnBack = document.querySelector('.raining-waste-button-home') as HTMLDivElement;
                if (btnBack) {
                    btnBack.style.display = 'none';
                }
            }
        } else {
            setScoreError((prevScore) => prevScore + 1);
            setErrorList((prevErrorList) => [...prevErrorList, wasteItems.find((item) => item.id === id)?.name || '']);
        }

        setWasteItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, position: generateUniquePosition(prevItems, containerRef.current?.clientWidth || window.innerWidth) }
                    : item
            )
        );
    };

    const playAgain = () => {
        setScore(0);
        setScoreError(0);
        setErrorList([]);
        intialWasteItems();
        setStartTime(new Date());
        setWasteType("none")
    }

    const backToGameChoice = () => {
        navigate('/game-choice');
    }

    return (
        <main>
            <div className="raining-waste">
                <div className="raining-waste-info">
                    <h1>Raining Waste</h1>
                </div>
                { wasteType === "none" ?
                    <div className="raining-waste-choice">
                        <h1 className="choice-title">{t('waste-type-choice')}</h1>
                        <div className="button-container">
                            <ButtonAppComponent content={t('recyclable')} action={() => setWasteType("recyclable")} type={"classic"}></ButtonAppComponent>
                            <ButtonAppComponent content={t('food')} action={() => setWasteType("food")} type={"classic"}></ButtonAppComponent>
                            <ButtonAppComponent content={t('bulky')} action={() => setWasteType("bulky")} type={"classic"}></ButtonAppComponent>
                            <ButtonAppComponent content={t('all')} action={() => setWasteType("all")} type={"classic"}></ButtonAppComponent>
                        </div>
                    </div> :
                (score >= 10) ?
                    (
                    <div className="raining-waste-final-content">
                        <h2 className="raining-waste-final-message">{t('game-over')}</h2>
                        <div className="raining-waste-final-btn-container">
                            <ButtonAppComponent content={t('play-again')} type={"classic"} action={playAgain} />
                            <ButtonAppComponent content={t('change-game')} type={"classic"} action={backToGameChoice} />
                        </div>
                    </div>
                ) : (
                    <div className="game-content-raining">
                        <h2 className="raining-waste-info" style={{display: "none"}}>Score: {score}</h2>
                        <div className="raining-waste-container" ref={containerRef}>
                            {wasteItems.map((wasteItem) => (
                                <FallingWaste
                                    key={wasteItem.id}
                                    id={wasteItem.id}
                                    name={wasteItem.name}
                                    img={wasteItem.img}
                                    type={wasteItem.type}
                                    onCatch={handleCatch}
                                    binPosition={binPosition}
                                    containerRef={containerRef}
                                />
                            ))}
                            <TrashBin type={wasteType} img={PoubelleDnd} setBinType={setBinType} setBinPosition={setBinPosition} containerRef={containerRef} />
                        </div>
                    </div>
                )}
            </div>
            <div className="raining-waste-button-home">
                <ButtonAppComponent content={t('back')} action={backToGameChoice} type={"classic"}/>
            </div>
        </main>
    );
};

export default RainingWasteComponent;
