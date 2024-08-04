// src/pages/InventoryPage.jsx
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';




const InventoryPage = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
      return <p>Loading...</p>;}

  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'quantity', headerName: 'Quantity', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
  ]);
  const navigate = useNavigate(); // For navigation

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

  const handleAddClick = () => {
    navigate('/inventory/add'); // Navigate to /inventory/add page
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: '16px' }}
      >
        Add Inventory
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          sx={{
            '& .MuiDataGrid-cell': {
              color: 'white',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: 'white',
            },
          }}
        />
      </div>
    </div>
  );
};

export default InventoryPage;
