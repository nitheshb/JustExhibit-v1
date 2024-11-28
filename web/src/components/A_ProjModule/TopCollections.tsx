import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip, 
} from 'recharts';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const TopCollections = () => {
  const data = [
    { name: 'Start', current: 0, previous: 0 },
    { name: 'Raja1', current: 0, previous: 0 },
    { name: 'Raja2', current: 75000, previous: 25000 },
    { name: 'Raja3', current: 5000, previous: 5000 },
    { name: 'Mid1', current: 5000, previous: 5000 },
    { name: 'Rani1', current: 5000, previous: 5000 },
    { name: 'Rani2', current: 60000, previous: 5000 },
    { name: 'Rani3', current: 5000, previous: 5000 },
    { name: 'Mid2', current: 5000, previous: 5000 },
    { name: 'Luffy1', current: 5000, previous: 90000 },
    { name: 'Luffy2', current: 35000, previous: 35000 },
    { name: 'End', current: 5000, previous: 5000 },
  ];

  return (
    <div className="w-full max-w-4xl  h-full flex flex-col justify-between p-4 gap-6 overflow-hidden  bg-white">
      <div className="px-0 pt-0">
        <div className="flex flex-col gap-1">
          <h2 className="text-[19px] text-[#000000] ml-4 font-normal">Top Collections</h2>
          <div className="flex items-center ml-4 gap-3">
            <span className="text-[30px] text-[#000000] font-semibold">&#8377; 387.75</span>
            <div className="flex items-center text-[#00A236]">
              <TrendingUp className="w-5 h-5 mx-3" />
              <span className="text-[18]">23%</span>
            </div>
          </div>
        </div>
      </div>


      <div className="px-0 pb-0">
        <div className="relative h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#CCCCCC" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={false}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#3D3D3D' }}
                ticks={[10000, 50000, 100000]}
                tickFormatter={(value) =>
                  value >= 1000 ? `${value / 1000}K` : value
                }
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#CCCCCC"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#0ea5e9"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
              {/* <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '5px', border: '1px solid #ddd' }}
                itemStyle={{ color: '#000' }}
                formatter={(value) => new Intl.NumberFormat().format(value)}
              /> */}


<Tooltip
  content={({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md text-sm text-gray-700 min-w-[150px]">
          <p className="font-bold text-blue-500 mb-2">{label}</p>
          {payload.map((item, index) => (
            <div key={index} className="flex justify-between items-center mt-2">
              <div className="flex items-center">
                <span
                  className="w-3 h-3  mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="font-semibold">₹{new Intl.NumberFormat().format(item.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  }}
/>












            </LineChart>
          </ResponsiveContainer>

          {/* Custom X-axis Labels */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between px-16">
            <span className="text-[#3D3D3D]">Raja</span>
            <span className="text-[#3D3D3D]">Rani</span>
            <span className="text-[#3D3D3D]">Luffy</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-8 mt-8">
        <button className="flex items-center px-6 py-2 rounded-lg bg-gray-100 text-sm text-gray-600 relative">
          <div className="flex items-center pl-3">
            <div className="w-7 h-[2p] bg-[#29AAE3] mr-2"></div>
            Nov 18, 2024
          </div>
        </button>
        <button className="flex items-center px-6 py-2 rounded-lg bg-gray-100 text-sm text-gray-600 relative">
          <div className="flex items-center pl-3">
            <div className="w-7 h-[2px] border-t-4 font-medium border-[#CCCCCC] border-dotted mr-2"></div>
            Nov 17, 2024
          </div>
        </button>
      </div>
    </div>
  );
};

export default TopCollections;


