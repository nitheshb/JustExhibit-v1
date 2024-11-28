import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Added to Cart', value: 10, percentage: 0.33 },
  { name: 'Reached Checkout', value: 2, percentage: 0.33 },
  { name: 'Purchased', value: 0, percentage: 0 },
];

export function ConversionChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-2 shadow-lg rounded border">
                    <p className="text-sm">{payload[0].payload.name}</p>
                    <p className="text-sm font-bold">
                      {(payload[0].payload.percentage * 100).toFixed(2)}%
                    </p>
                    <p className="text-xs text-gray-500">
                      {payload[0].payload.value} customers
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="percentage"
            stroke="#0ea5e9"
            fill="#0ea5e9"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}