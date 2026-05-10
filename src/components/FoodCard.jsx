import { Plus, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FoodCard({ food, onAdd }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 relative group transition duration-200 hover:shadow-md hover:scale-[1.02]">
      <Link to={`/food/${food.id}`}>
        <img 
          src={food.image} 
          alt={food.name} 
          className="w-full h-32 object-cover rounded-xl mb-3"
        />
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{food.name}</h3>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span>{food.rating}</span>
        </div>
        <div className="mt-2 font-bold text-green-500">
          ${food.price.toFixed(2)}
        </div>
      </Link>
      
      <button 
        onClick={(e) => {
          e.preventDefault();
          onAdd(food);
        }}
        className="absolute bottom-3 right-3 bg-green-500 text-white p-2 rounded-xl hover:bg-green-600 transition-colors"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
