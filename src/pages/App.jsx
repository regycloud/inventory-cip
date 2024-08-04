import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';
import InventoryList from '../components/GetData';
import AddItemForm from '../components/AddItemForm';
import InventoryPage from './InventoryPage';
import Account from './Account';
import Layout from '../components/Layout';
import { AuthProvider } from '../context/AuthContext';


function App() {
  return (
    <AuthProvider>

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <Layout>
            <Home /> 
          </Layout>
          }/>
        <Route path="/home/account/:username" element={
          <Layout>
            <Account />
          </Layout>
          } />
        <Route path="/inventory" element={
          <Layout>
            <InventoryPage />
          </Layout>
      } />
        <Route path="/inventory/add" element={
          <Layout>
            <AddItemForm />
          </Layout>
          } />
          <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
          } />
        {/* Tambahkan rute lainnya di sini */}
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
