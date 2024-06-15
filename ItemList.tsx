import React, { FC } from 'react';

interface Item {
  id: number;
  name: string;
  quantity: number;
}

const items: Item[] = [
  { id: 1, name: 'Item 1', quantity: 10 },
  { id: 2, name: 'Item 2', quantity: 5 },
  { id: 3, name: 'Item 3', quantity: 20 },
];

const ItemList: FC = () => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name} - Quantity: {item.quantity}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
