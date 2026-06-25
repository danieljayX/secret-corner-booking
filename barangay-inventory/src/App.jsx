import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import AddItem from './pages/AddItem';
import Categories from './pages/Categories';
import Reports from './pages/Reports';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <InventoryProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="add-item" element={<AddItem />} />
              <Route path="edit-item/:id" element={<AddItem />} />
              <Route path="categories" element={<Categories />} />
              <Route path="reports" element={<Reports />} />
              {/* Mock routes */}
              <Route path="users" element={<div className="bg-white p-8 rounded-3xl border border-slate-100 text-center py-20 text-slate-400 font-bold">User Management Module Coming Soon</div>} />
              <Route path="settings" element={<div className="bg-white p-8 rounded-3xl border border-slate-100 text-center py-20 text-slate-400 font-bold">System Settings Module Coming Soon</div>} />
            </Route>
          </Routes>
        </Router>
      </InventoryProvider>
    </AuthProvider>
  );
};

export default App;
