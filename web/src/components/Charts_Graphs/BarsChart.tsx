


import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from 'recharts';

const data = [
  { time: 'Instagram Ad', sales: 0, orders: 5 },
  { time: 'Hoardings', sales: 0, orders: 10 },
  { time: 'Google Adwords', sales: 0, orders: 20 },

];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded">
        <p className="text-sm text-gray-600">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold">
            {entry.name === 'sales' ? 'Sales' : 'Orders'}: ₹{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SalesLineChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Visit Source*
      </h2>
      <p className="text-2xl font-bold mb-4">₹0.00</p>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="orders"
              fill="#90caf9"
              radius={[4, 4, 0, 0]}
              barSize={30}
              name="Orders"
            />
            {/* <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2}
              name="Sales"
              dot={{
                stroke: '#2563eb',
                strokeWidth: 2,
                fill: '#ffffff',
                r: 4,
              }}
              activeDot={{
                stroke: '#2563eb',
                strokeWidth: 2,
                fill: '#ffffff',
                r: 6,
              }}
            /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesLineChart;
