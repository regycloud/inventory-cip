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
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound from './NotFound';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home/account/:username" element={<Account />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/inventory/add" element={<AddItemForm />} />
            </Route>
          </Route>
          {/* Contoh di luar protected route */}
          {/* <Route path="/home/account/:username" element={
            <Layout>
              <Account />
            </Layout>
          } /> */}
          <Route path="/login" element={
            <Layout>
              <Login />
            </Layout>
          } />
          {/* Tambahkan rute lainnya di sini */}
          <Route path="*" element={
            <NotFound />
          } />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
