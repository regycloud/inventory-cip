import React from 'react';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';



const Home = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Logout successful');
      navigate('/'); // Redirect ke halaman login
      // Optionally redirect to login page or perform other actions
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
    <Navbar />
      <Typography variant="h2" gutterBottom>
        Welcome, {user ? user.email : 'Guest'}!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;


