import React, { useState } from 'react';
import FallingWaste from './FallingWaste';
import TrashBin from './TrashBin';
import Bouteille from '../../mocks/img/bouteille.png';
import Armoire from '../../mocks/img/armoire.png';
import Trognon from '../../mocks/img/trognon.png';
import PoubelleDnd from '../../mocks/img/poubelle-tri-dnd.png';
import Table from '../../mocks/img/table.png';
import Cookie from '../../mocks/img/cookie.png';
import Carton from '../../mocks/img/carton.png';

import './RainingWasteComponent.css';

interface WasteItem {
    name: string;
    img: string;
    type: string;
    id: number;
    position: { top: number, left: number };
}

interface RainingWasteProps {
    wasteType: string;
}

const initialWasteItems: WasteItem[] = [
    { id: 1, name: 'bouteille en plastique', img: Bouteille, type: 'recyclable', position: { top: 150, left: 0 } },
    { id: 2, name: 'armoire encombrant', img: Armoire, type: 'bulky', position: { top: 150, left: 70 } },
    { id: 3, name: 'trognon alimentaire', img: Trognon, type: 'food', position: { top: 150, left: 140 } },
    { id: 4, name: 'table encombrant', img: Table, type: 'bulky', position: { top: 150, left: 210 } },
    { id: 5, name: 'cookie alimentaire', img: Cookie, type: 'food', position: { top: 150, left: 280 } },
    { id: 6, name: 'carton recyclable', img: Carton, type: 'recyclable', position: { top: 150, left: 350 } },
];

const RainingWasteComponent: React.FC<RainingWasteProps> = ({wasteType}) => {
    const [score, setScore] = useState(0);
    const [wasteItems, setWasteItems] = useState(initialWasteItems);
    const [binType, setBinType] = useState<string>(wasteType);
    const [binPosition, setBinPosition] = useState({ left: 0, width: 80, height: 80 });

    const generateUniquePosition = (existingItems: WasteItem[]) => {
        let newLeft: number;
        let isOverlapping: boolean;
        do {

            newLeft = Math.random() * window.innerWidth;
            isOverlapping = existingItems.some(item => Math.abs(item.position.left - newLeft) < 80);
        } while (isOverlapping);
        return { top: 150, left: newLeft };
    };

    const handleCatch = (id: number, type: string) => {
        console.log('catch', id, type, binType)
        if (type === binType) {
            setScore((prevScore) => prevScore + 1);
        } else {
            setScore((prevScore) => prevScore - 1);
        }

        setWasteItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, position: generateUniquePosition(prevItems) }
                    : item
            )
        );
    };

    return (
        <main>
            <div className="raining-waste">
                <div className="raining-waste-info">
                    <h1>Jeu de Tri des Déchets</h1>
                </div>

                    {score >= 10 ? (
                        <h2 className="raining-waste-final-message">Jeu terminé! Score final: {score}</h2>
                    ) : (
                        <>
                            <h2 className="raining-waste-info">Score: {score}</h2>
                            <div className="raining-waste-container">
                                {wasteItems.map((wasteItem) => (
                                    <FallingWaste
                                        key={wasteItem.id}
                                        id={wasteItem.id}
                                        name={wasteItem.name}
                                        img={wasteItem.img}
                                        type={wasteItem.type}
                                        onCatch={handleCatch}
                                        binType={binType}
                                        binPosition={binPosition}
                                    />
                                ))}
                                <TrashBin type={wasteType} img={PoubelleDnd} setBinType={setBinType} setBinPosition={setBinPosition} />
                            </div>


                        </>
                    )}
                </div>
        </main>
    );
};

export default RainingWasteComponent;
