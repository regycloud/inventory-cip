import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Button, Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Style untuk modal
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Lebar modal
  maxHeight: '80vh', // Maksimal tinggi modal
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Tambahkan scroll vertikal
};

// Style untuk DataGrid
const dataGridStyles = {
  '& .MuiDataGrid-cell': {
    color: '#fff', // Warna teks sel
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    color: '#fff', // Warna teks header
  },
  '& .MuiDataGrid-columnHeader': {
    backgroundColor: '#333', // Warna latar belakang header
    borderBottom: '2px solid #555', // Batas bawah header
  },
  '& .MuiDataGrid-footerContainer': {
    backgroundColor: '#333', // Warna latar belakang footer
    color: '#fff', // Warna teks footer
  },
  '& .MuiDataGrid-footerCell': {
    color: '#fff', // Warna teks footer cell
  },
  '& .MuiDataGrid-toolbarContainer': {
    color: '#fff', // Warna teks toolbar
  },
  '& .MuiDataGrid-selectedRowCount': {
    color: '#fff', // Warna teks row selected
  },
  '& .MuiDataGrid-pagination': {
    color: '#fff', // Warna teks pagination
  },
};

const InventoryPage = () => {
  const { currentUser } = useAuth();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([
    { field: 'description', headerName: 'Name', flex: 2 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'unit', headerName: 'Unit', flex: 1 },
    { field: 'warehouseLocation', headerName: 'Warehouse Location', flex: 2 },
  ]);
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
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

  const handleRowClick = (params) => {
    setSelectedItem(params.row);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
          onRowClick={handleRowClick}
          sx={dataGridStyles}
        />
      </div>
      
      {/* Modal for displaying item details */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
          {selectedItem ? (
            <div>
              {selectedItem.photoURL && (
                <img src={selectedItem.photoURL} alt="Item" style={{ width: '100%', marginBottom: 16 }} />
              )}
              <Typography id="modal-title" variant="h6" component="h2" sx={{ marginBottom: 2, color: 'black' }}>
                <strong>Description:</strong> {selectedItem.description}
              </Typography>
              <Typography id="modal-description" sx={{ mb: 2, color: 'black' }}>
                <strong>Location:</strong> {selectedItem.location}
              </Typography>
              <Typography id="modal-description" sx={{ mb: 2, color: 'black' }}>
                <strong>Manufacturer:</strong> {selectedItem.manufacturer}
              </Typography>
              <Typography id="modal-description" sx={{ mb: 2, color: 'black' }}>
                <strong>Quantity:</strong> {selectedItem.quantity}
              </Typography>
              <Typography id="modal-description" sx={{ mb: 2, color: 'black' }}>
                <strong>Remarks:</strong> {selectedItem.remarks}
              </Typography>
              <Typography id="modal-description" sx={{ mb: 2, color: 'black' }}>
                <strong>Serial Number:</strong> {selectedItem.serialNumber}
              </Typography>
              <Typography id="modal-description" sx={{ mb: 2, color: 'black' }}>
                <strong>Unit:</strong> {selectedItem.unit}
              </Typography>
              <Typography id="modal-description" sx={{ mb: 2, color: 'black' }}>
                <strong>Warehouse Location:</strong> {selectedItem.warehouseLocation}
              </Typography>
            </div>
          ) : (
            <Typography>No item selected</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default InventoryPage;
