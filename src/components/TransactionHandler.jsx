// src/components/TransactionHandler.jsx
import React, { useState } from 'react';
import { doc, updateDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig'; // Pastikan impor sudah benar
import { Button, TextField, Box, Typography } from '@mui/material'; // Implikasi button MUI

const TransactionHandler = ({ selectedRow, setRows, currentUser, handleModalClose }) => {
  const [reason, setReason] = useState('');
  const [pic, setPic] = useState('');

  // Fungsi untuk mencatat transaksi
  const addTransaction = async (itemId, type, quantity, userId, reason, pic) => {
    try {
      await addDoc(collection(db, 'transactions'), {
        itemId,
        type,
        quantity,
        date: serverTimestamp(),
        userId,
        reason,
        pic,
      });
      console.log('Transaksi berhasil dicatat.');
    } catch (error) {
      console.error('Error mencatat transaksi:', error);
    }
  };

  // Fungsi untuk mengambil item
  const handleTakeItem = async () => {
    if (selectedRow && selectedRow.quantity > 0) {
      const newQuantity = selectedRow.quantity - 1;
      try {
        const itemRef = doc(db, 'inventory', selectedRow.id);
        await updateDoc(itemRef, { quantity: newQuantity });

        // Catat transaksi dengan tambahan reason dan pic
        await addTransaction(selectedRow.id, 'remove', 1, currentUser.uid, reason, pic);

        // Perbarui state lokal
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === selectedRow.id ? { ...row, quantity: newQuantity } : row
          )
        );

        // Tutup modal
        handleModalClose();
      } catch (error) {
        console.error('Error memperbarui kuantitas:', error);
      }
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="PIC"
        value={pic}
        onChange={(e) => setPic(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleTakeItem}
        disabled={!reason || !pic} // Nonaktifkan jika reason atau pic kosong
      >
        Konfirmasi
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleModalClose}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default TransactionHandler;
