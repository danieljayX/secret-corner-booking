import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Box, Layers, AlertTriangle, PackageCheck, ClipboardList, Plus, Minus, Check, X, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, unit, icon: Icon, color, iconBg }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3 md:gap-5">
    <div className={`p-3 md:p-4 rounded-xl ${iconBg} ${color}`}>
      <Icon size={24} className="md:w-7 md:h-7" />
    </div>
    <div>
      <p className="text-[10px] md:text-sm font-semibold text-slate-500">{title}</p>
      <div className="flex items-baseline gap-1 md:gap-2">
        <h3 className="text-xl md:text-2xl font-black text-slate-800">{value}</h3>
        <span className="text-[10px] md:text-xs font-bold text-slate-400">{unit}</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { items, categories, deleteItem, updateItem } = useInventory();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  const totalItems = items.length;
  const totalQuantity = items.reduce((acc, item) => acc + parseInt(item.quantity || 0), 0);
  const lowStockItems = items.filter(item => parseInt(item.quantity) < 10);
  const totalCategories = categories.length;

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

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteItem(id);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <StatCard 
          title="Total Items" 
          value={totalItems} 
          unit="items"
          icon={Box} 
          color="text-green-600"
          iconBg="bg-green-50"
        />
        <StatCard 
          title="Total Quantity" 
          value={totalQuantity} 
          unit="units"
          icon={ClipboardList} 
          color="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatCard 
          title="Low Stock Items" 
          value={lowStockItems.length} 
          unit="items"
          icon={AlertTriangle} 
          color="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatCard 
          title="Categories" 
          value={totalCategories} 
          unit="types"
          icon={Layers} 
          color="text-purple-600"
          iconBg="bg-purple-50"
        />
      </div>

      {/* Main Inventory List Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Box size={18} className="text-[#1a4d2e] md:w-5 md:h-5" />
            <h3 className="text-sm md:text-base font-bold text-slate-800">Recent Items</h3>
          </div>
          <Link 
            to="/add-item" 
            className="bg-[#1a4d2e] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#2d6a4f] transition-colors w-full sm:w-auto justify-center"
          >
            <Plus size={16} />
            Add New Item
          </Link>
        </div>

        <div className="p-4 md:p-6 space-y-4">
          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {items.slice(0, 5).map((item, index) => (
              <div key={item.id} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800">{item.name}</h4>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-slate-200 rounded text-[10px] font-medium text-slate-600">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <Link to={`/edit-item/${item.id}`} className="p-1.5 bg-blue-500 text-white rounded">
                      <Edit2 size={12} />
                    </Link>
                    <button onClick={() => handleDelete(item.id, item.name)} className="p-1.5 bg-red-500 text-white rounded">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-xs text-slate-500">{item.unit}</span>
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
                        className="w-14 px-2 py-1 text-xs font-bold border-2 border-[#1a4d2e] rounded"
                        autoFocus
                      />
                      <button onClick={() => saveEdit(item)} className="p-1 bg-green-500 text-white rounded">
                        <Check size={12} />
                      </button>
                      <button onClick={cancelEdit} className="p-1 bg-gray-400 text-white rounded">
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="p-1 bg-slate-200 text-slate-700 rounded disabled:opacity-30"
                        disabled={parseInt(item.quantity) === 0}
                      >
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span
                        onClick={() => startEditing(item)}
                        className={`px-3 py-1 rounded-md text-xs font-black cursor-pointer ${getQuantityColor(item.quantity)}`}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="p-1 bg-[#1a4d2e] text-white rounded"
                      >
                        <Plus size={12} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
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
                  <th className="px-4 py-3 text-xs font-bold uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.slice(0, 8).map((item, index) => (
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
                      <div className="flex gap-2">
                        <Link to={`/edit-item/${item.id}`} className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" title="Edit Details">
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
              </tbody>
            </table>
          </div>
          
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Showing 1 to {Math.min(items.length, 8)} of {items.length} entries
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
