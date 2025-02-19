import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Fashion ', value: 502, percentage: '47%' },
  { name: 'Accessories', value: 248, percentage: '47%' },
  { name: 'Art Supplies', value: 178, percentage: '45%' },
  { name: 'Digital', value: 149, percentage: '47%' },
  { name: 'Technology', value: 121, percentage: '47%' }
];

const CustomBar = (props: any) => {
  const { x, y, width, height } = props;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#0EA5E9" rx={2} ry={2} />
    </g>
  );
};

export const StatisticsBarChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Interested In

      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 10, left: 30, bottom: 5 }}
        >
          <CartesianGrid horizontal={false} strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 shadow-lg rounded border">
                    <p className="font-semibold">{payload[0].payload.name}</p>
                    <p>Value: {payload[0].value}</p>
                    <p>Percentage: {payload[0].payload.percentage}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="value"
            shape={<CustomBar />}
            label={{ position: 'right', fill: '#666' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};



