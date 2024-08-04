// ItemList.jsx
import React, { useEffect, useState } from 'react';
import { fetchItems } from '../firebase/firestoreOperations';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchItems();
      setItems(data);
    };
    getItems();
  }, []);

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}: {item.quantity}</li>
      ))}
    </ul>
  );
};

export default ItemList;
