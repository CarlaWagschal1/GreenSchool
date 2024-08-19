import React from 'react';
import { useDrag } from 'react-dnd';

const ItemType = {
  WASTE: 'waste',
};

interface WasteProps {
  name: string;
  img: string;
  type: string;
}

const WasteComponent: React.FC<WasteProps> = (props: WasteProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.WASTE,
    item: { name: props.name, img: props.img, type: props.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
      <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
            display: 'inline-block',
            margin: '10px',
          }}
      >
        <img src={props.img} alt={props.name} style={{ width: '100px', height: '100px' }} />
      </div>
  );
};

export default WasteComponent;