import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { Save, X, ArrowLeft, Package, Box } from 'lucide-react';

const AddItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, categories, addItem, updateItem } = useInventory();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: '',
    unit: 'pcs',
    description: ''
  });

  useEffect(() => {
    if (id) {
      const itemToEdit = items.find(item => item.id === id);
      if (itemToEdit) {
        setFormData(itemToEdit);
      }
    }
  }, [id, items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateItem(formData);
    } else {
      addItem(formData);
    }
    navigate('/inventory');
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Box size={20} className="text-[#1a4d2e]" />
            <h3 className="text-base font-bold text-slate-800">{id ? 'Edit Item' : 'Add New Item'}</h3>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {id ? `Inventory / Edit / ${id}` : 'Dashboard / Add Item'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">Item Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e]"
              placeholder="Enter item name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">Category</label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] cursor-pointer"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">Quantity</label>
            <input
              type="number"
              name="quantity"
              required
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e]"
              placeholder="Enter quantity"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">Unit</label>
            <input
              type="text"
              name="unit"
              required
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e]"
              placeholder="Enter unit (e.g. pcs, boxes)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-tight">Description (Optional)</label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] resize-none"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-4 justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-200 transition-all uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#1a4d2e] text-white text-xs font-bold rounded-lg hover:bg-[#2d6a4f] transition-all shadow-md uppercase"
            >
              {id ? 'Update Item' : 'Save Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
