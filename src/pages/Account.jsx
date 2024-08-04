// src/pages/Account.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';



export default function Account() {
  const { username } = useParams();
  const { currentUser } = useAuth();

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h1>Account Page</h1>
        <h2>Welcome, {currentUser.email}!</h2>
        {/* Tambahkan konten halaman akun di sini */}
      </div>
    </div>
  );
}
