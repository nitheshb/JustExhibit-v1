import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const generateMonthData = (month) => {
  return Array(15).fill().map((_, i) => ({
    day: i + 1,
    sales: Math.random() * (31800 - 12300) + 12300
  }));
};

const data = {
  month1: generateMonthData(1),
  month2: generateMonthData(2),
  month3: generateMonthData(3),
  month4: generateMonthData(4)
};

const TotalsalesDashboard = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">

      <div className="w-full bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-lg font-bold">TOTAL SALES</h2>
          <span className="text-sm text-gray-500">Today</span>
        </div>
        <div className="space-y-4">
          <div>
            <span className="text-3xl font-bold">₹ 218.84</span>
            <span className="text-sm text-gray-500 ml-4">4 orders</span>
          </div>
          
          {/* Main Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[...data.month1, ...data.month2, ...data.month3, ...data.month4]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" hide />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹ ${(value/1000).toFixed(1)}k`}
                />
                <Bar 
                  dataKey="sales" 
                  fill="#0EA5E9" 
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
    
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Month 1</span>
            <span>Month 2</span>
            <span>Month 3</span>
            <span>Month 4</span>
          </div>
        </div>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-lg font-bold">SALES BREAKDOWN</h2>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Orders</span>
              <span>₹ 123.45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Returns</span>
              <span>₹ 0.0</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total sales</span>
              <span>₹ 214.84</span>
            </div>
          </div>
        </div>

      
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-lg font-bold">SALES BY CHANNEL</h2>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Online store</span>
              <span>₹ 200.45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">other</span>
              <span>₹ 0.0</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total sales</span>
              <span>₹ 214.84</span>
            </div>
          </div>
        </div>

    
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-lg font-bold">SALES BY CHANNEL</h2>
            <span className="text-sm text-gray-500">Today</span>
          </div>
          <div className="space-y-4 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Online store</span>
              <span>₹ 200.45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">other</span>
              <span>₹ 0.0</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total sales</span>
              <span>₹ 214.84</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalsalesDashboard;