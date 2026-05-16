import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ChevronRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, total } = useContext(CartContext);
  const navigate = useNavigate();

  const fee = 2.50;
  const finalTotal = total + (cart.length > 0 ? fee : 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] p-6 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Trash2 size={40} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any food to your cart yet.</p>
        <button 
          onClick={() => navigate('/services')}
          className="bg-green-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-green-600 transition"
        >
          Browse Food
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 pt-8 h-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Cart</h1>
      
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-4 mb-6">
        {cart.map((item, index) => (
          <div key={`${item.id}-${item.size}-${index}`} className="bg-white p-3 rounded-2xl shadow-sm flex gap-3 items-center">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
              <p className="text-xs text-gray-500 mb-2">Size: {item.size}</p>
              <div className="font-bold text-green-500">${item.price.toFixed(2)}</div>
            </div>
            
            <div className="flex flex-col items-center bg-gray-100 rounded-full p-1 gap-2">
              <button 
                onClick={() => updateQuantity(index, 1)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm"
              >
                <Plus size={14} />
              </button>
              <span className="text-sm font-semibold">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(index, -1)}
                className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm"
              >
                <Minus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-sm mb-4">
        <div className="flex mb-4">
          <input 
            type="text" 
            placeholder="Promo Code" 
            className="flex-1 bg-gray-100 border-none rounded-l-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-green-500"
          />
          <button className="bg-gray-800 text-white px-4 rounded-r-xl text-sm font-semibold">Apply</button>
        </div>

        <div className="space-y-3 text-sm mb-4">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span>
            <span className="font-medium text-gray-800">${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500">
            <span>Delivery Fee</span>
            <span className="font-medium text-gray-800">${fee.toFixed(2)}</span>
          </div>
          <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-800">Total</span>
            <span className="font-bold text-xl text-green-500">${finalTotal.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-green-500 text-white font-semibold py-4 rounded-xl flex justify-between items-center px-6 shadow-lg shadow-green-500/30"
        >
          <span>Checkout</span>
          <div className="flex items-center gap-2">
            <span>${finalTotal.toFixed(2)}</span>
            <ChevronRight size={18} />
          </div>
        </button>
      </div>
    </div>
  );
}
