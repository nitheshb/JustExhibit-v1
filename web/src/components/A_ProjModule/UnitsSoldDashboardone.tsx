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

const UnitsSoldDashboardone = () => {
  const salesData = [
    { name: 'Jan', value: 31500 },
    { name: 'Jan', value: 30500 },
    { name: 'Jan', value: 29000 },
    { name: 'Feb', value: 31500 },
    { name: 'Feb', value: 29500 },
    { name: 'Feb', value: 28500 },
    { name: 'Mar', value: 29000 },
    { name: 'Mar', value: 28000 },
    { name: 'Mar', value: 27500 },
    { name: 'Apr', value: 28000 },
    { name: 'Apr', value: 28000 },
    { name: 'May', value: 30500 },
    { name: 'May', value: 28500 },
    { name: 'Jun', value: 28000 },
    { name: 'Jun', value: 7000 }
  ];

  const timeFrameData = [
    { period: 'Today', amount: '₹ 199.98', orders: '2', highlight: true },
    { period: 'Yesterday', amount: '₹ 119.97', orders: '3' },
    { period: 'Last 7 Days', amount: '₹ 829.87', orders: '13' },
    { period: 'Last 30 Days', amount: '₹ 3.9k', orders: '62' },
    { period: 'Last 90 Days', amount: '₹ 10.3k', orders: '164' }
  ];

  const formatCurrency = (value) => {
    return `₹ ${(value / 1000).toFixed(1)}k`;
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white rounded-3xl shadow-lg">
      <h1 className="text-2xl font-bold mb-8">Units Sold</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-gray-500">Total</div>
            <div className="text-gray-500">Orders</div>
          </div>
          
          {timeFrameData.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <div className={`text-lg ${item.highlight ? 'text-blue-500' : 'text-gray-500'}`}>
                {item.period}
              </div>
              <div className={`text-lg font-medium ${item.highlight ? 'text-blue-500' : 'text-gray-600'}`}>
                {item.amount}
              </div>
              <div className={`text-lg ${item.highlight ? 'text-blue-500' : 'text-gray-600'}`}>
                {item.orders}
              </div>
            </div>
          ))}
        </div>


        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData} barSize={12}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="#E5E7EB"
              />
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                stroke="#6B7280"
              />
              <YAxis 
                tickFormatter={formatCurrency}
                axisLine={false}
                tickLine={false}
                tickMargin={8}
                stroke="#6B7280"
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
              <Bar 
                dataKey="value" 
                fill="#93C5FD"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UnitsSoldDashboardone;

