import React, { useEffect, useState } from 'react';

interface FallingWasteProps {
    name: string;
    img: string;
    type: string;
    onCatch: (type: string) => void;
    binType: string;
}

const FallingWaste: React.FC<FallingWasteProps> = ({ name, img, type, onCatch, binType }) => {
    const [position, setPosition] = useState({ top: 0, left: Math.random() * window.innerWidth });

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prev => ({ ...prev, top: prev.top + 5 }));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (position.top > window.innerHeight - 100) {
            if (type === binType) {
                onCatch(type);
            }
            setPosition({ top: 0, left: Math.random() * window.innerWidth });
        }
    }, [position, onCatch, type, binType]);

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
