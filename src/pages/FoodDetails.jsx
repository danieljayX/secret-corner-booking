import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Minus, Plus, Heart } from 'lucide-react';
import { foods } from '../data/foods';
import { CartContext } from '../context/CartContext';

export default function FoodDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const food = foods.find(f => f.id === parseInt(id));
  
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('Regular');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!food) return <div className="p-8 text-center">Food not found</div>;

  const handleAddToCart = () => {
    addToCart(food, quantity, size);
    navigate(-1);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-10 bg-white/80 p-2 rounded-full backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full backdrop-blur-sm"
        >
          <Heart size={24} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
        </button>
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-64 object-cover rounded-b-3xl"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-bold text-gray-800">{food.name}</h1>
          <div className="text-xl font-bold text-green-500">${food.price.toFixed(2)}</div>
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-4">
          <Star size={16} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-700">{food.rating}</span>
          <span className="mx-2">•</span>
          <span>15-20 mins</span>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {food.description}
        </p>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Size</h3>
          <div className="flex gap-3">
            {['Small', 'Regular', 'Large'].map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors border ${
                  size === s 
                    ? 'border-green-500 bg-green-50 text-green-600' 
                    : 'border-gray-200 text-gray-600 hover:border-green-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h3 className="font-semibold text-gray-800">Quantity</h3>
          <div className="flex items-center gap-4 bg-gray-100 p-1 rounded-full">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm"
            >
              <Minus size={16} />
            </button>
            <span className="w-4 text-center font-semibold">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white shadow-sm"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

      </div>
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 max-w-[420px] mx-auto pb-6">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-green-500 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-green-500/30 active:scale-[0.98] transition-transform"
        >
          Add to Cart • ${(food.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}
