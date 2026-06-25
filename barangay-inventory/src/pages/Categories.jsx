import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Plus, Trash2, Layers, AlertCircle } from 'lucide-react';

const Categories = () => {
  const { categories, addCategory, deleteCategory, items } = useInventory();
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
    }
  };

  const handleDelete = (category) => {
    const isUsed = items.some(item => item.category === category);
    if (isUsed) {
      alert(`Cannot delete "${category}" because it is currently assigned to items in the inventory.`);
      return;
    }
    if (window.confirm(`Are you sure you want to delete the category "${category}"?`)) {
      deleteCategory(category);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Plus size={24} className="text-green-600" />
          Add New Category
        </h3>
        <form onSubmit={handleAdd} className="flex gap-4">
          <input
            type="text"
            required
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all"
            placeholder="e.g. Disaster Relief"
          />
          <button
            type="submit"
            className="px-8 py-3 green-gradient text-white font-bold rounded-xl shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Add Category
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const itemCount = items.filter(item => item.category === category).length;
          return (
            <div key={category} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                  <Layers size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{category}</h4>
                  <p className="text-xs text-slate-500 font-medium">{itemCount} Items</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(category)}
                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex gap-4 items-start">
        <AlertCircle className="text-blue-500 shrink-0" size={24} />
        <div>
          <h4 className="text-sm font-bold text-blue-800">Note on Categories</h4>
          <p className="text-sm text-blue-600 mt-1 leading-relaxed">
            Categories help you organize your inventory. You cannot delete a category that is currently being used by items in the inventory list.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
