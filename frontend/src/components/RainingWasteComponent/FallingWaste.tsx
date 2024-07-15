import React, { useEffect, useState, RefObject } from 'react';

interface FallingWasteProps {
    id: number;
    name: string;
    img: string;
    type: string;
    onCatch: (id: number, type: string) => void;
    binPosition: { left: number, width: number, height: number };
    containerRef: RefObject<HTMLDivElement>;
}

const FallingWaste: React.FC<FallingWasteProps> = ({ id, name, img, type, onCatch, binPosition, containerRef }) => {
    const [position, setPosition] = useState({ top: 0, left: Math.random() * (window.innerWidth - 80) });
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
            if (containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const wasteBottom = position.top + 70;
                const wasteLeft = position.left - 10;
                const wasteRight = position.left + 70;
                const binTop = containerRect.height - 70;
                const binLeft = binPosition.left + 20;
                const binRight = binPosition.left + binPosition.width - 20;



                if (wasteBottom >= binTop && wasteLeft < binRight && wasteRight > binLeft) {
                    onCatch(id, type);
                    console.log("wasteBottom: " + wasteBottom)
                    console.log("binTop: " + binTop)
                    console.log("wasteLeft: " + wasteLeft)
                    console.log("binRight: " + binRight)
                    console.log("wasteRight: " + wasteRight)
                    console.log("binLeft: " + binLeft)
                    console.log("containerRect.height: " + containerRect.height)
                    console.log("containerRect.width: " + containerRect.width)
                    setPosition({ top: -300, left: Math.random() * (containerRect.width - 80) });
                    setIsFalling(false);
                    setTimeout(() => setIsFalling(true), Math.random() * 3000);
                } else if (wasteBottom >= containerRect.height - 0) {
                    setPosition({ top: -300, left: Math.random() * (containerRect.width - 80) });
                }
            }
        };

        checkCollision();
    }, [position, binPosition, id, onCatch, type, containerRef]);

    return (
        <img
            src={img}
            alt={name}
            className={isFalling ? 'falling-waste' : 'waiting-waste'}
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: '80px',
                height: '80px',
                margin: '0',
            }}
        />
    );
};

export default FallingWaste;
