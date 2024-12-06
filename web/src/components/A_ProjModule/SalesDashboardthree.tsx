import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const SalesDashboardthree = () => {

  const salesData = [
    { step: 'Step 1', value: 31800 },
    { step: 'Step 1', value: 29500 },
    { step: 'Step 1', value: 28000 },
    { step: 'Step 1', value: 27500 },
    { step: 'Step 2', value: 31800 },
    { step: 'Step 2', value: 29000 },
    { step: 'Step 2', value: 28500 },
    { step: 'Step 2', value: 27000 },
    { step: 'Step 2', value: 28000 },
    { step: 'Step 3', value: 29500 },
    { step: 'Step 3', value: 28000 },
    { step: 'Step 3', value: 31800 },
    { step: 'Step 3', value: 27500 },
    { step: 'Step 3', value: 28500 },
    { step: 'Step 3', value: 12300 }
  ];

  const formatCurrency = (value) => {
    return `₹ ${(value / 1000).toFixed(1)}k`;
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-3xl shadow-lg space-y-8">
      {/* Total Sales Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">TOTAL SALES</h2>
          <span className="text-gray-500">Today</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-4xl font-bold">₹ 218.84</span>
          <span className="text-gray-500">4 orders</span>
        </div>
        
        {/* Bar Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis 
                dataKey="step" 
                axisLine={false}
                tickLine={false}
                tickCount={3}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                axisLine={false}
                tickLine={false}
              />
              <Bar 
                dataKey="value" 
                fill="#2196f3"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Breakdown Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">TOTAL SALES BREAKDOWN</h2>
          <span className="text-gray-500">Today</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Orders</span>
            <span className="text-gray-600">₹ 123.45</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Returns</span>
            <span className="text-gray-600">₹ 0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Total sales</span>
            <span className="text-gray-600">₹ 214.84</span>
          </div>
        </div>
      </div>

      {/* Sales by Channel Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">TOTAL SALES BY CHANNEL</h2>
          <span className="text-gray-500">Today</span>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Online store</span>
            <span className="text-gray-600">₹ 200.45</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">other</span>
            <span className="text-gray-600">₹ 0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-lg">Total sales</span>
            <span className="text-gray-600">₹ 214.84</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboardthree;