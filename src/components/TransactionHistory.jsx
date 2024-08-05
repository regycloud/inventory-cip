// src/components/TransactionHistory.jsx
import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { db } from '../firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const TransactionHistory = ({ itemId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const q = query(collection(db, 'transactions'), where('itemId', '==', itemId));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    if (itemId) {
      fetchTransactions();
    }
  }, [itemId]);

  return (
    <div>
      <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
        Transactions:
      </Typography>
      {transactions.map((transaction) => (
        <Typography key={transaction.id} variant="body1" sx={{ color: 'black' }}>
          {transaction.date.toDate().toLocaleString()} - {transaction.type} - Qty: {transaction.quantity} - Reason: {transaction.reason} - For: {transaction.pic}
        </Typography>
      ))}
    </div>
  );
};

export default TransactionHistory;
