import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, IconButton } from '@mui/material';
import { Upload as UploadIcon, Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebase/firebaseConfig'; // Pastikan import sesuai konfigurasi Anda

const AddItemForm = () => {
  const [items, setItems] = useState([{ description: '', manufacturer: '', serialNumber: '', quantity: '', unit: '', location: '', warehouseLocation: '', remarks: '', photo: null }]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const newItems = [...items];
      newItems[index].photo = file;
      setItems(newItems);
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleAddForm = () => {
    setItems([...items, { description: '', manufacturer: '', serialNumber: '', quantity: '', unit: '', location: '', warehouseLocation: '', remarks: '', photo: null }]);
  };

  const handleRemoveForm = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.some(item => !item.photo)) {
      setError('Please upload a photo for all items.');
      return;
    }

    setUploading(true);

    try {
      for (const item of items) {
        const storageRef = ref(storage, `images/${item.photo.name}`);
        const uploadTask = uploadBytesResumable(storageRef, item.photo);

        await new Promise((resolve, reject) => {
          uploadTask.on('state_changed', 
            () => {}, 
            (error) => reject(error), 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                try {
                  await addDoc(collection(db, 'inventory'), {
                    description: item.description,
                    manufacturer: item.manufacturer,
                    serialNumber: item.serialNumber,
                    quantity: item.quantity,
                    unit: item.unit,
                    location: item.location,
                    warehouseLocation: item.warehouseLocation,
                    photoURL: downloadURL,
                    remarks: item.remarks
                  });
                  resolve();
                } catch (err) {
                  reject(err);
                }
              });
            }
          );
        });
      }
      
      // Reset form after successful submission
      setItems([{ description: '', manufacturer: '', serialNumber: '', quantity: '', unit: '', location: '', warehouseLocation: '', remarks: '', photo: null }]);
      setUploading(false);
      setError('');
    } catch (err) {
      setError('Error adding items to Firestore.');
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Add New Items</Typography>
      {items.map((item, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={item.description}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Manufacturer"
              name="manufacturer"
              value={item.manufacturer}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Serial Number"
              name="serialNumber"
              value={item.serialNumber}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Unit"
              name="unit"
              value={item.unit}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={item.location}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Warehouse Location"
              name="warehouseLocation"
              value={item.warehouseLocation}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remarks"
              name="remarks"
              value={item.remarks}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e)}
            />
          </Grid>
          {items.length > 1 && (
            <Grid item xs={12}>
              <IconButton onClick={() => handleRemoveForm(index)} color="error">
                <RemoveIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      ))}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddForm}
          >
            Add Form
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={uploading}
            startIcon={<UploadIcon />}
          >
            {uploading ? 'Uploading...' : 'Submit'}
          </Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Grid>
      </Grid>
    </form>
  );
};

export default AddItemForm;
