import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('Active');
  
  const dummyOrders = [
    { id: '#1234', date: 'Today, 10:00 AM', items: '2x Classic Cheeseburger', total: 11.98, status: 'On the Way', type: 'Active' },
    { id: '#1200', date: 'Yesterday', items: '1x Pepperoni Pizza', total: 12.99, status: 'Delivered', type: 'Past' },
    { id: '#1150', date: 'Last Week', items: '3x Chocolate Cake', total: 14.97, status: 'Delivered', type: 'Past' },
  ];

  const filteredOrders = dummyOrders.filter(o => o.type === activeTab);

  return (
    <div className="p-4 pt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Orders</h1>
      
      <div className="flex gap-2 mb-6">
        {['Active', 'Past'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${
              activeTab === tab 
                ? 'bg-green-500 text-white shadow-md shadow-green-500/30' 
                : 'bg-white text-gray-500 border border-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? filteredOrders.map((order, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-800">{order.id}</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                order.status === 'Delivered' ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-600'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">{order.date}</p>
            <p className="text-sm font-medium text-gray-800 mb-3">{order.items}</p>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="font-bold text-green-500">${order.total.toFixed(2)}</span>
              {order.type === 'Past' && (
                <button className="flex items-center gap-1 text-sm font-semibold text-green-500 bg-green-50 px-3 py-1.5 rounded-lg">
                  <RefreshCw size={14} /> Reorder
                </button>
              )}
            </div>
          </div>
        )) : (
          <div className="text-center py-10 text-gray-500">
            No {activeTab.toLowerCase()} orders found.
          </div>
        )}
      </div>
    </div>
  );
}
