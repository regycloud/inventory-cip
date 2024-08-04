// import React from 'react';
// import { useContext } from 'react';
// import UserContext from '../context/UserContext';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { signOut } from 'firebase/auth';
// import { auth } from '../firebase/firebaseConfig';
// import { useNavigate } from 'react-router-dom';


// const Home = () => {
//   const navigate = useNavigate();

//   const { user } = useContext(UserContext);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       console.log('Logout successful');
//       navigate('/login'); // Redirect ke halaman login
//       // Optionally redirect to login page or perform other actions
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h2" gutterBottom>
//         Welcome, {user ? user.email : 'Guest'}!
//       </Typography>
//       <Button variant="contained" color="primary" onClick={handleLogout}>
//         Logout
//       </Button>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>Welcome, {currentUser.email}</h1>
      {/* Konten lainnya */}
    </div>
  );
}

export default Home;
