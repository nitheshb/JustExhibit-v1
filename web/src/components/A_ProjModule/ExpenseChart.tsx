import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Calendar, ChevronRight } from 'lucide-react';

const ExpenseChart = () => {
  const data = [
    { day: '7', 'Bills Payment': 110, 'Foods and Drinks': 165, 'Uncategorized': 52 },
    { day: '8', 'Bills Payment': 108, 'Foods and Drinks': 165, 'Uncategorized': 52 },
    { day: '9', 'Bills Payment': 108, 'Foods and Drinks': 165, 'Uncategorized': 52 },
    { day: '10', 'Bills Payment': 108, 'Foods and Drinks': 165, 'Uncategorized': 52 },
    { day: '11', 'Bills Payment': 108, 'Foods and Drinks': 165, 'Uncategorized': 52 },
    { day: '12', 'Bills Payment': 108, 'Foods and Drinks': 165, 'Uncategorized': 52 },
    { day: '13', 'Bills Payment': 108, 'Foods and Drinks': 165, 'Uncategorized': 52 },
  ];





  const customTooltip = ({ payload, label }) => {
    if (!payload || payload.length === 0) return null;

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg text-sm">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-item-${index}`} className="flex items-center space-x-2 mb-2">
            <div
              className="w-3 h-3 "
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-gray-700">{`${entry.name}: ₹  ${entry.value}`}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-white ">
  
      <div className="mb-6">
        <h2 className="text-[18px] text-[#6A6A6A] font-medium">Total Expenses</h2>
        <div className="flex items-center justify-between mt-1">
          <div className="text-[30px] font-semibold text-[#00000]">&#8377; 708.84</div>
          <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
            <span className="text-gray-600">View:</span>
            <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h2v10H7V7zm4 0h2v10h-2V7zm4 0h2v10h-2V7z" />
            </svg>
            <span className="text-gray-600">Bar Line Chart</span>
          </div>
        </div>
        

        <div className="flex items-center gap-2 mt-4 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span>Jun 07, 2024</span>
          <ChevronRight className="w-5 h-5" />
          <i data-lucide="arrow-right"></i>
          <span>Jun 13, 2024</span>
        </div>
      </div>


 






      <div className="flex gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-indigo-600 rounded"></div>
          <span>Bills Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-sky-400 rounded"></div>
          <span>Foods and Drinks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-400 rounded"></div>
          <span>Uncategorized</span>
        </div>
      </div>


      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="day" />
            <YAxis
              tickFormatter={(value) => `$ ${value}`}
              ticks={[0, 50, 100, 150, 200, 250]}
            />
            {/* <Tooltip 
              formatter={(value) => [`$ ${value}`, '']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '8px'
              }}
            /> */}

            <Tooltip content={customTooltip} />

            <Bar dataKey="Bills Payment" fill="#6366f1" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Foods and Drinks" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Uncategorized" fill="#9ca3af" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;