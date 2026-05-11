import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { ThemeProvider } from './context/ThemeContext';
import { useContext } from 'react';
import ClientLayout from './layouts/ClientLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import PackageDetails from './pages/PackageDetails';
import Booking from './pages/Booking'; // Fixed import
import MyBookings from './pages/MyBookings';
import Admin from './pages/Admin';
import Login from './pages/Login';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookingProvider>
          <Router>
            <Routes>
              {/* Client Routes (Mobile View) */}
              <Route element={<ClientLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/package/:id" element={<PackageDetails />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/checkout" element={<Booking />} />
                <Route path="/tickets" element={<MyBookings />} />
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/confirmation" element={<MyBookings />} />
                <Route path="/login" element={<Login />} />
              </Route>

              {/* Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Admin defaultTab="bookings" />} />
                <Route path="packages" element={<Admin defaultTab="packages" />} />
                <Route path="calendar" element={<Admin defaultTab="calendar" />} />
                <Route path="chat" element={<Admin defaultTab="chat" />} />
                <Route path="analytics" element={<Admin defaultTab="analytics" />} />
                <Route path="customers" element={<Admin defaultTab="customers" />} />
                <Route path="settings" element={<Admin defaultTab="settings" />} />
                <Route path="help" element={<Admin defaultTab="help" />} />
              </Route>
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </BookingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
