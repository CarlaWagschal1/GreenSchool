import React, { useEffect, useState } from 'react';

interface TrashBinProps {
    type: string;
    img: string;
    setBinType: (type: string) => void;
}

const TrashBin: React.FC<TrashBinProps> = ({ type, img, setBinType }) => {
    const [position, setPosition] = useState({ left: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setPosition({ left: event.clientX - 25 });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        setBinType(type);
    }, [type, setBinType]);

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
