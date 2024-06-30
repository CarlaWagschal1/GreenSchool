import React, { useState } from 'react';
import FallingWaste from './FallingWaste';
import TrashBin from './TrashBin';
import Bouteille from '../../mocks/img/bouteille.png';
import Armoire from '../../mocks/img/armoire.png';
import Trognon from '../../mocks/img/trognon.png';
import PoubelleDnd from '../../mocks/img/poubelle-tri-dnd.png';

interface WasteItem {
    name: string;
    img: string;
    type: string;
}

const initialWasteItems: WasteItem[] = [
    { name: 'bouteille en plastique', img: Bouteille, type: 'plastique' },
    { name: 'armoire encombrant', img: Armoire, type: 'encombrant' },
    { name: 'trognon alimentaire', img: Trognon, type: 'alimentaire' },
];

const RainingWasteComponent: React.FC = () => {
    const [score, setScore] = useState(0);
    const [wasteItems, setWasteItems] = useState(initialWasteItems);
    const [binType, setBinType] = useState<string>('plastique');

    const handleCatch = (type: string) => {
        console.log(type, binType)
        if (type === binType) {
            setScore((prevScore) => prevScore + 1);
        } else {
            setScore((prevScore) => prevScore - 1);
        }
        setWasteItems((prevItems) => prevItems.filter((item) => item.type !== type));
    };

    return (
        <div className="App" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <h1>Jeu de Tri des Déchets</h1>
            <h2>Score: {score}</h2>
            {wasteItems.length === 0 ? (
                <h2>Jeu terminé! Score final: {score}</h2>
            ) : (
                <>
                    {wasteItems.map((wasteItem, index) => (
                        <FallingWaste
                            key={index}
                            name={wasteItem.name}
                            img={wasteItem.img}
                            type={wasteItem.type}
                            onCatch={handleCatch}
                            binType={binType}
                        />
                    ))}
                    <TrashBin type="plastique" img={PoubelleDnd} setBinType={setBinType} />
                </>
            )}
        </div>
    );
};

export default RainingWasteComponent;
