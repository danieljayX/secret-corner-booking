import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { PieChart, BarChart3, TrendingUp, Download, Calendar, Box, ClipboardList, AlertTriangle } from 'lucide-react';

const ReportStat = ({ title, value, icon: Icon, color, iconBg }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`p-3 rounded-lg ${iconBg} ${color}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <h4 className="text-xl font-black text-slate-800">{value}</h4>
    </div>
  </div>
);

const Reports = () => {
  const { items, categories } = useInventory();

  const totalQuantity = items.reduce((acc, item) => acc + parseInt(item.quantity || 0), 0);
  const lowStockItems = items.filter(item => parseInt(item.quantity) < 10);
  
  const categoryStats = categories.map(cat => ({
    name: cat,
    itemCount: items.filter(item => item.category === cat).length,
    totalQuantity: items.filter(item => item.category === cat).reduce((acc, item) => acc + parseInt(item.quantity || 0), 0)
  })).sort((a, b) => b.totalQuantity - a.totalQuantity);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">From</label>
            <input type="date" className="block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none" defaultValue="2024-05-01" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight ml-1">To</label>
            <input type="date" className="block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none" defaultValue="2024-05-25" />
          </div>
        </div>
        <button className="bg-[#1a4d2e] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#2d6a4f] transition-all self-end md:self-center">
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ReportStat title="Total Items" value={items.length} icon={Box} color="text-green-600" iconBg="bg-green-50" />
        <ReportStat title="Total Quantity" value={totalQuantity} icon={ClipboardList} color="text-blue-600" iconBg="bg-blue-50" />
        <ReportStat title="Low Stock Items" value={lowStockItems.length} icon={AlertTriangle} color="text-red-600" iconBg="bg-red-50" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800 uppercase tracking-tight">Category Breakdown</h3>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#e9f5ee] text-[#1a4d2e]">
                <tr>
                  <th className="px-4 py-3 text-xs font-bold uppercase">Category</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase">Total Items</th>
                  <th className="px-4 py-3 text-xs font-bold uppercase">Total Quantity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categoryStats.map((stat) => (
                  <tr key={stat.name} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-bold text-slate-700">{stat.name}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 font-medium">{stat.itemCount}</td>
                    <td className="px-4 py-3 text-xs text-slate-600 font-black">{stat.totalQuantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
