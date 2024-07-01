import React, { useEffect, useState } from 'react';

interface TrashBinProps {
    type: string;
    img: string;
    setBinType: (type: string) => void;
    setBinPosition: (position: { left: number, width: number, height: number }) => void;
}

const TrashBin: React.FC<TrashBinProps> = ({ type, img, setBinType, setBinPosition }) => {
    const [position, setPosition] = useState({ left: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({ left: event.clientX - 40 });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        setBinType(type);
        setBinPosition({ left: position.left, width: 80, height: 80 });
    }, [type, setBinType, position, setBinPosition]);

    return (
        <img
            src={img}
            alt={type}
            style={{
                position: 'fixed',
                bottom: '10px',
                left: position.left,
                width: '80px',
                height: '80px',
            }}
        />
    );
};

export default TrashBin;
