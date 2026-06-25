import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('barangay_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (username, password) => {
    // Simple mock login
    if (username === 'admin' && password === 'admin123') {
      const userData = { username: 'admin', role: 'Barangay Staff', name: 'Admin User' };
      setUser(userData);
      localStorage.setItem('barangay_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('barangay_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
