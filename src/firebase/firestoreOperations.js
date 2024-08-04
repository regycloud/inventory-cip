// src/firebase/firestoreOperations.js
import { db } from './firebaseConfig'; // Pastikan path ini benar
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addItem = async (item) => {
  try {
    await addDoc(collection(db, 'inventory'), item);
  } catch (error) {
    console.error('Error adding item:', error);
  }
};

export const fetchItems = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'inventory'));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return items;
  } catch (error) {
    console.error('Error fetching items:', error);
    return [];
  }
};
