import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Edit2, Trash2, Search, Filter, Plus, FileDown, Box, Minus, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const { items, categories, deleteItem, updateItem } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteItem(id);
    }
  };

  const handleQuantityChange = (item, delta) => {
    const newQuantity = Math.max(0, parseInt(item.quantity) + delta);
    updateItem({ ...item, quantity: newQuantity });
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditValue(item.quantity);
  };

  const saveEdit = (item) => {
    const newQuantity = parseInt(editValue) || 0;
    if (newQuantity >= 0) {
      updateItem({ ...item, quantity: newQuantity });
    }
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const getQuantityColor = (quantity) => {
    const qty = parseInt(quantity);
    if (qty === 0) return 'text-red-600 bg-red-50';
    if (qty < 5) return 'text-red-500 bg-red-50';
    if (qty < 10) return 'text-orange-500 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Box size={20} className="text-[#1a4d2e]" />
          <h3 className="text-base font-bold text-slate-800">Inventory List</h3>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="hidden sm:flex bg-slate-100 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold items-center gap-2 hover:bg-slate-200 transition-colors">
            <FileDown size={16} />
            Export
          </button>
          <Link 
            to="/add-item" 
            className="bg-[#1a4d2e] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#2d6a4f] transition-colors flex-1 sm:flex-none"
          >
            <Plus size={16} />
            <span className="sm:inline">Add New Item</span>
          </Link>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative w-full sm:max-w-md">
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e]"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e]"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredItems.map((item, index) => (
            <div key={item.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-slate-200 rounded text-[10px] font-medium text-slate-600">
                    {item.category}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <Link 
                    to={`/edit-item/${item.id}`} 
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={14} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <span className="text-slate-500">Unit:</span>
                  <span className="ml-1 font-medium text-slate-700">{item.unit}</span>
                </div>
                <div>
                  <span className="text-slate-500">Date:</span>
                  <span className="ml-1 font-medium text-slate-700">{item.dateAdded}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-xs font-medium text-slate-600">Quantity</span>
                {editingId === item.id ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => saveEdit(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(item);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                      className="w-16 px-2 py-1 text-xs font-bold border-2 border-[#1a4d2e] rounded focus:outline-none"
                      autoFocus
                    />
                    <button onClick={() => saveEdit(item)} className="p-1.5 bg-green-500 text-white rounded">
                      <Check size={14} />
                    </button>
                    <button onClick={cancelEdit} className="p-1.5 bg-gray-400 text-white rounded">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item, -1)}
                      className="p-1.5 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 disabled:opacity-30"
                      disabled={parseInt(item.quantity) === 0}
                    >
                      <Minus size={14} strokeWidth={3} />
                    </button>
                    <span
                      onClick={() => startEditing(item)}
                      className={`px-4 py-1.5 rounded-md text-sm font-black cursor-pointer ${getQuantityColor(item.quantity)}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item, 1)}
                      className="p-1.5 bg-[#1a4d2e] text-white rounded hover:bg-[#2d6a4f]"
                    >
                      <Plus size={14} strokeWidth={3} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm">
              No items found.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left">
            <thead className="bg-[#e9f5ee] text-[#1a4d2e]">
              <tr>
                <th className="px-4 py-3 text-xs font-bold uppercase">ID</th>
                <th className="px-4 py-3 text-xs font-bold uppercase">Item Name</th>
                <th className="px-4 py-3 text-xs font-bold uppercase">Category</th>
                <th className="px-4 py-3 text-xs font-bold uppercase">Quantity</th>
                <th className="px-4 py-3 text-xs font-bold uppercase">Unit</th>
                <th className="px-4 py-3 text-xs font-bold uppercase">Date Added</th>
                <th className="px-4 py-3 text-xs font-bold uppercase text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-medium text-slate-500">{index + 1}</td>
                  <td className="px-4 py-3 text-xs font-bold text-slate-800">{item.name}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded-md font-medium">{item.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min="0"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => saveEdit(item)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(item);
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          className="w-16 px-2 py-1 text-xs font-bold border-2 border-[#1a4d2e] rounded focus:outline-none focus:ring-1 focus:ring-[#1a4d2e]"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(item)}
                          className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                          title="Save"
                        >
                          <Check size={12} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
                          title="Cancel"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                          className="p-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Decrease"
                          disabled={parseInt(item.quantity) === 0}
                        >
                          <Minus size={12} strokeWidth={3} />
                        </button>
                        <span
                          onDoubleClick={() => startEditing(item)}
                          className={`px-3 py-1 rounded-md text-xs font-black cursor-pointer select-none hover:ring-2 hover:ring-[#1a4d2e] hover:ring-offset-1 transition-all ${getQuantityColor(item.quantity)}`}
                          title="Double-click to edit"
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, 1)}
                          className="p-1 bg-[#1a4d2e] text-white rounded hover:bg-[#2d6a4f] transition-colors"
                          title="Increase"
                        >
                          <Plus size={12} strokeWidth={3} />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500 font-medium">{item.unit}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">{item.dateAdded}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <Link 
                        to={`/edit-item/${item.id}`} 
                        className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        title="Edit Details"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-10 text-center text-slate-400 text-sm">
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Showing {filteredItems.length} of {items.length} entries
        </div>
      </div>
    </div>
  );
};

export default Inventory;
