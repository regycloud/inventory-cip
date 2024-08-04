// src/components/NotFound.jsx
import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <Container sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Halaman tidak ditemukan
      </Typography>
      <Typography variant="body1" gutterBottom>
        Maaf, halaman yang Anda cari tidak tersedia.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Kembali ke Beranda
      </Button>
    </Container>
  );
};

export default NotFound;
