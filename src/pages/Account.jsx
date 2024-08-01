// src/pages/Account.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Account() {
  const { username } = useParams();

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1>Account Page</h1>
        <h2>Welcome, {username}!</h2>
        {/* Tambahkan konten halaman akun di sini */}
      </div>
    </div>
  );
}
