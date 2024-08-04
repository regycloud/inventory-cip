// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
// import { useUser } from '../context/UserContext'; // pastikan impor dari 'context'
import { useUser } from '../context/UserContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('currentUser'); // Hapus dari local storage saat logout
      console.log('Logout successful');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const username = user?.email || 'exampleUser'; // Menggunakan email sebagai nama pengguna

  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate('/home')}>
            Inventory 
          </Button>
        </Typography>
        <Button color="inherit" onClick={() => navigate(`/home/account/${username}`)}>Account</Button>
        <Button color="inherit" onClick={() => navigate('/home/sparepart')}>Sparepart</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
