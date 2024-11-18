import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Childcare', value: 45, color: '#818CF8' },
  { name: 'Parents ', value: 35, color: '#0EA5E9' },
  { name: 'Kids under 4', value: 15, color: '#6366F1' },
  { name: 'Grandparents', value: 5, color: '#A5B4FC' }
];

export const StatisticsDonutChart = () => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Visitor Category </h2>
      <div className="relative h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-2 shadow-lg rounded border">
                      <p className="font-semibold">{payload[0].name}</p>
                      <p>{payload[0].value}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-bold">{total}K</div>
          <div className="text-gray-500 text-sm">Total</div>
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};