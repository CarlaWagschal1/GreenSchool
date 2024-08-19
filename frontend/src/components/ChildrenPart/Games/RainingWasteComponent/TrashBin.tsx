import React, { useEffect, useState, RefObject } from 'react';

interface TrashBinProps {
    type: string;
    img: string;
    setBinType: (type: string) => void;
    setBinPosition: (position: { left: number, width: number, height: number }) => void;
    containerRef: RefObject<HTMLDivElement>;
}

const TrashBin: React.FC<TrashBinProps> = ({ type, img, setBinType, setBinPosition, containerRef }) => {
    const [position, setPosition] = useState({ left: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                let newLeft = event.clientX - containerRect.left - 40;

                if (newLeft < 20) {
                    newLeft = -20;
                } else if (newLeft > containerRect.width - 95) {
                    newLeft = containerRect.width - 95;
                }
                setPosition({ left: newLeft });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [containerRef]);

    useEffect(() => {
        setBinType(type);
        setBinPosition({ left: position.left, width: 80, height: 80 });
    }, [type, setBinType, position, setBinPosition]);

    return (
        <img
            src={img}
            alt={type}
            style={{
                position: 'absolute',
                bottom: '0px',
                left: position.left,
                width: '80px',
                height: '80px',
                margin: '0',
            }}
        />
    );
};

export default TrashBin;
