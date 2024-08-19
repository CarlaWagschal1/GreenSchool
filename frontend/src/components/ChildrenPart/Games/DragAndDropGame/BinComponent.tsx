import React from 'react';
import { useDrop } from 'react-dnd';

import './BinComponent.css';

const ItemType = {
    WASTE: 'waste',
};

interface BinProps {
    type: string;
    img? : string;
    onDrop: (item: { name: string; img: string; type: string }) => void;
}

const BinComponent: React.FC<BinProps> = (props: BinProps) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType.WASTE,
        drop: (item : { name: string; img: string; type: string }) => props.onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div className="bin-container" ref={drop}>
            {props.img ? <div className="binImg">
                    <img src={props.img} alt={props.type} style={{

                        filter: isOver ? 'brightness(1.5)' : 'brightness(1)',
                    }} />
                    <a className="type-container"> {props.type}</a>

                </div>

                : <a className="type-container"> {props.type}</a>}
        </div>
    );
};

export default BinComponent;