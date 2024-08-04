import React, { useState } from 'react';
import { addItem } from '../firebase/firestoreOperations';

const AddItemForm = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, quantity, createdAt: new Date() };
    addItem(newItem);
    setName('');
    setQuantity(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Item Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;