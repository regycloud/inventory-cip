import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import Account from './Account';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/account/:username" element={<Account />} />
        {/* Tambahkan rute lainnya di sini */}
      </Routes>
    </Router>
  );
}

export default App;
