import React, { useEffect, useState } from 'react';

interface FallingWasteProps {
    id: number;
    name: string;
    img: string;
    type: string;
    onCatch: (id: number, type: string) => void;
    binType: string;
    binPosition: { left: number, width: number, height: number };
}

const FallingWaste: React.FC<FallingWasteProps> = ({ id, name, img, type, onCatch, binPosition }) => {
    const [position, setPosition] = useState({ top: 150, left: Math.random() * (window.innerWidth - 80) });
    const [isFalling, setIsFalling] = useState(false);

    useEffect(() => {
        const delay = Math.random() * 3000; // Random delay between 0 and 3000 milliseconds

        const timeout = setTimeout(() => {
            setIsFalling(true);
        }, delay);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (!isFalling) return;

        const interval = setInterval(() => {
            setPosition(prev => ({ ...prev, top: prev.top + 5 }));
        }, 50);

        return () => clearInterval(interval);
    }, [isFalling]);

    useEffect(() => {
        const checkCollision = () => {
            const wasteBottom = position.top + 80;
            const wasteLeft = position.left;
            const wasteRight = position.left + 80;
            const binTop = window.innerHeight - 90;
            const binLeft = binPosition.left;
            const binRight = binPosition.left + binPosition.width;

            if (wasteBottom >= binTop && wasteLeft < binRight && wasteRight > binLeft) {
                console.log('Collision detected:', name);
                onCatch(id, type);
                setPosition({ top: 150, left: Math.random() * (window.innerWidth - 80) });
                setIsFalling(false);
                setTimeout(() => setIsFalling(true), Math.random() * 3000);
            }
            else if(wasteBottom >= window.innerHeight - 80) {
                setPosition({ top: 150, left: Math.random() * (window.innerWidth - 80 ) });
            }
        };

        checkCollision();
    }, [position, binPosition, id, onCatch, type]);

    return (
        <img
            src={img}
            alt={name}
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: '80px',
                height: '80px',
            }}
        />
    );
};

export default FallingWaste;
