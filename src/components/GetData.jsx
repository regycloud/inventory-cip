// src/pages/InventoryPage.jsx
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const InventoryPage = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'inventory'));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRows(data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  sx={{
    '& .MuiDataGrid-cell': {
      color: 'white',
    }
  }}
/>

    </div>
  );
};

export default InventoryPage;
