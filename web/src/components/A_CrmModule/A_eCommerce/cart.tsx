import { Plus, Minus } from 'lucide-react';


export function Cart({ cart, onUpdateQuantity, total }) {
  if (cart.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="text-gray-600">
                    Rs.{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex  flex-col items-center space-x-4">
            <div className="text-xl font-bold">Total: Rs.{total}</div>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
