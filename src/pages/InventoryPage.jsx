import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Button, Modal, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TransactionHistory from '../components/TransactionHistory';
import TransactionHandler from '../components/TransactionHandler';

const InventoryPage = () => {
  const { currentUser } = useAuth();
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  const navigate = useNavigate();

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
    navigate('/inventory/add');
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setIsDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedRow(null);
  };

  const handleTransactionModalOpen = () => {
    setIsTransactionModalOpen(true);
  };

  const handleTransactionModalClose = () => {
    setIsTransactionModalOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClick}
        style={{ marginBottom: '16px' }}
      >
        Add Item
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={[
            { field: 'description', headerName: 'Name', width: 200 },
            { field: 'quantity', headerName: 'Quantity', width: 150 },
            { field: 'unit', headerName: 'Unit', width: 150 },
            { field: 'warehouseLocation', headerName: 'Warehouse Location', width: 200 },
          ]}
          pageSize={10}
          sx={{
            '& .MuiDataGrid-cell': {
              color: 'white',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              color: 'black',
            },
            '& .MuiDataGrid-footerContainer': {
              color: 'white',
            },
          }}
          onRowClick={handleRowClick}
        />
      </div>

      {/* Modal Detail Item */}
      <Modal open={isDetailModalOpen} onClose={handleDetailModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
            maxHeight: '80vh',
          }}
        >
          {selectedRow && (
            <>
              <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
                {selectedRow.description}
              </Typography>
              <img
                src={selectedRow.photoURL}
                alt={selectedRow.description}
                style={{ width: '100%', marginBottom: '16px' }}
              />
              <Typography variant="body1" sx={{ color: 'black' }}>
                <strong>Location:</strong> {selectedRow.location}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                <strong>Manufacturer:</strong> {selectedRow.manufacturer}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                <strong>Quantity:</strong> {selectedRow.quantity}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                <strong>Remarks:</strong> {selectedRow.remarks}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                <strong>Serial Number:</strong> {selectedRow.serialNumber}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                <strong>Unit:</strong> {selectedRow.unit}
              </Typography>
              <Typography variant="body1" sx={{ color: 'black' }}>
                <strong>Warehouse Location:</strong> {selectedRow.warehouseLocation}
              </Typography>
              <TransactionHistory itemId={selectedRow.id} />
              <Button
                variant="contained"
                color="primary"
                onClick={handleTransactionModalOpen}
                disabled={selectedRow.quantity === 0}
              >
                Kurangi Item
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Modal Formulir Transaksi */}
      <Modal open={isTransactionModalOpen} onClose={handleTransactionModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
            maxHeight: '80vh',
          }}
        >
          {selectedRow && (
            <TransactionHandler
              selectedRow={selectedRow}
              setRows={setRows}
              currentUser={currentUser}
              handleModalClose={handleTransactionModalClose}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default InventoryPage;
