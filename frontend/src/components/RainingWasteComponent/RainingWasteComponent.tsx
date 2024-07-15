import React, { useState, useRef } from 'react';
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
    { id: 1, name: 'bouteille en plastique', img: Bouteille, type: 'recyclable', position: { top: -300, left: 0 } },
    { id: 2, name: 'armoire encombrant', img: Armoire, type: 'bulky', position: { top: -300, left: 70 } },
    { id: 3, name: 'trognon alimentaire', img: Trognon, type: 'food', position: { top: -300, left: 140 } },
    { id: 4, name: 'table encombrant', img: Table, type: 'bulky', position: { top: -300, left: 210 } },
    { id: 5, name: 'cookie alimentaire', img: Cookie, type: 'food', position: { top: -300, left: 280 } },
    { id: 6, name: 'carton recyclable', img: Carton, type: 'recyclable', position: { top: -300, left: 350 } },
];

const RainingWasteComponent: React.FC<RainingWasteProps> = ({ wasteType }) => {
    const [score, setScore] = useState(0);
    const [wasteItems, setWasteItems] = useState(initialWasteItems);
    const [binType, setBinType] = useState<string>(wasteType);
    const [binPosition, setBinPosition] = useState({ left: 0, width: 50, height: 80 });
    const containerRef = useRef<HTMLDivElement>(null);

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
        if (type === binType) {
            setScore((prevScore) => prevScore + 1);
        } else {
            setScore((prevScore) => prevScore - 1);
        }

        setWasteItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, position: generateUniquePosition(prevItems, containerRef.current?.clientWidth || window.innerWidth) }
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
                    <div className="game-content-raining">
                        <h2 className="raining-waste-info">Score: {score}</h2>
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
        </main>
    );
};

export default RainingWasteComponent;
