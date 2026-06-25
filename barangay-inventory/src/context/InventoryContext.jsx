import React, { createContext, useContext, useState, useEffect } from 'react';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('barangay_inventory');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Monoblock Chair', category: 'Furniture', quantity: 50, unit: 'pcs', dateAdded: '2023-10-01', description: 'White plastic chairs' },
      { id: '2', name: 'Foldable Table', category: 'Furniture', quantity: 10, unit: 'pcs', dateAdded: '2023-10-05', description: 'Long rectangular tables' },
      { id: '3', name: 'First Aid Kit', category: 'Medical', quantity: 5, unit: 'kits', dateAdded: '2023-11-12', description: 'Emergency medical supplies' },
      { id: '4', name: 'Wheelchair', category: 'Medical', quantity: 2, unit: 'pcs', dateAdded: '2023-11-15', description: 'For community use' },
      { id: '5', name: 'Megaphone', category: 'Electronics', quantity: 3, unit: 'pcs', dateAdded: '2023-12-01', description: 'Battery operated' },
    ];
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('barangay_categories');
    return saved ? JSON.parse(saved) : ['Furniture', 'Medical', 'Electronics', 'Office Supplies', 'Maintenance'];
  });

  useEffect(() => {
    localStorage.setItem('barangay_inventory', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('barangay_categories', JSON.stringify(categories));
  }, [categories]);

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split('T')[0]
    };
    setItems(prev => [...prev, newItem]);
  };

  const updateItem = (updatedItem) => {
    setItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories(prev => [...prev, category]);
    }
  };

  const deleteCategory = (category) => {
    setCategories(prev => prev.filter(c => c !== category));
  };

  return (
    <InventoryContext.Provider value={{ 
      items, 
      categories, 
      addItem, 
      updateItem, 
      deleteItem, 
      addCategory, 
      deleteCategory 
    }}>
      {children}
    </InventoryContext.Provider>
  );
};
