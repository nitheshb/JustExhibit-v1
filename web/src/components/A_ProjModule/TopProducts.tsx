import { ArrowRight } from "lucide-react";


const products = [
  {
    id: 'SKF533',
    name: 'Bird Shorts',
    category: 'Summer Knits',
    sales: 197,
    revenue: '$1,890',
    stock: 120,
    status: 'In stock',
  },
  {
    id: 'SKF534',
    name: 'T-Shirts, Max',
    category: 'Summer Knits',
    sales: 540,
    revenue: '$2,889',
    stock: 100,
    status: 'Out of stock',
  },
];

export function TopProducts() {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-gray-600 text-sm flex items-center gap-1">
            Bookings
          </h3>
        </div>
        <button
          className="text-sm text-orange-500 flex items-center gap-1 hover:text-orange-600"
          aria-label="See Details"
        >
          See Details
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        {products.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left font-normal pb-3">Product Name</th>
                <th className="text-left font-normal pb-3">Sales</th>
                <th className="text-left font-normal pb-3">Revenue</th>
                <th className="text-left font-normal pb-3">Stock</th>
                <th className="text-left font-normal pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={idx} className="text-sm border-b border-gray-50 last:border-0">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-orange-500">🛍️</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">{product.sales} pcs</td>
                  <td className="py-3">{product.revenue}</td>
                  <td className="py-3">{product.stock} pcs</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.status === 'In stock'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center py-6">No products available.</p>
        )}
      </div>
    </div>
  );
}
