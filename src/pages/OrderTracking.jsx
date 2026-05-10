import { ChevronLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OrderTracking() {
  const navigate = useNavigate();

  const steps = [
    { id: 1, title: 'Order Placed', time: '10:00 AM', status: 'completed' },
    { id: 2, title: 'Preparing', time: '10:05 AM', status: 'completed' },
    { id: 3, title: 'On the Way', time: '10:15 AM', status: 'current' },
    { id: 4, title: 'Delivered', time: '--:--', status: 'pending' },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center p-4 border-b border-gray-100">
        <button onClick={() => navigate('/')} className="p-2 -ml-2">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2">Track Order</h1>
      </div>

      <div className="p-4 relative">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=60" 
          alt="Map" 
          className="w-full h-48 object-cover rounded-2xl mb-6 shadow-sm"
        />
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md font-semibold text-sm flex items-center gap-2">
          <MapPin size={16} className="text-green-500" />
          <span>15 mins away</span>
        </div>
      </div>

      <div className="px-6 py-2">
        <div className="flex items-center gap-4 mb-8 bg-gray-50 p-4 rounded-2xl">
          <img src="https://ui-avatars.com/api/?name=John+Driver&background=22c55e&color=fff" alt="Driver" className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">John Driver</h3>
            <p className="text-sm text-gray-500">Delivery Partner</p>
          </div>
          <button className="bg-green-100 text-green-600 p-2 rounded-full">
            Call
          </button>
        </div>

        <h2 className="font-bold text-lg text-gray-800 mb-6">Delivery Status</h2>
        
        <div className="relative pl-4 space-y-8">
          <div className="absolute top-2 bottom-2 left-[23px] w-0.5 bg-gray-200"></div>
          
          {steps.map((step, index) => (
            <div key={step.id} className="flex gap-4 relative z-10">
              <div className={`w-4 h-4 rounded-full mt-1 ${
                step.status === 'completed' ? 'bg-green-500' :
                step.status === 'current' ? 'bg-green-500 ring-4 ring-green-100' :
                'bg-gray-300'
              }`}></div>
              <div className="flex-1">
                <h4 className={`font-semibold ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-800'}`}>
                  {step.title}
                </h4>
                <p className={`text-sm ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {step.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
