import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis } from 'recharts';
import { ChevronDown } from 'lucide-react';

const ExpenseBreakdown = () => {
  const data = [
    { name: 'Bills Payment', value: 52.66, percentage: 17, color: '#4C3BCF' },
    { name: 'Foods and Drinks', value: 635.18, percentage: 63, color: '#605EA1' }, 
    { name: 'Uncategorized', value: 71.00, percentage: 20, color: '#9CA3AF' }
  ];

  const ProgressBar = ({ percentage, color }) => (
    <div className="w-48 h-4 bg-white transform scale-x-[-1] rounded-md overflow-hidden">
      <div
        className="h-full rounded-md transform scale-x-[-1] transition-all duration-300"
        style={{
          width: `${percentage}%`,
          backgroundColor: color
        }}
      />
    </div>
  );

 
  const CustomTooltip = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
      const { color, name, value } = payload[0].payload;
      return (
        <div className="bg-white border p-2 rounded shadow-lg">
          <div className="flex items-center space-x-2">
            <div 
              className="w-4 h-4 rounded"
              style={{ backgroundColor: color }}
            />
            <span className="text-black font-semibold">{name}</span>
          </div>
          <div className="text-gray-600 text-sm">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 2,
            }).format(value)}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-3xl p-8 bg-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-[#6A6A6A] text-[14px] font-medium mb-1">Total Expenses</h2>
          <p className="text-[24px] font-semibold text-[#454545]">₹ 708.84</p>
        </div>
        
        <button className="flex items-center space-x-2 px-4 py-2 border border-[#CCCCCC] rounded-lg">
          <span className="text-[#6A6A6A] text-[14px]">View:</span>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="8" y1="8" x2="16" y2="8" />
              <line x1="8" y1="16" x2="16" y2="16" />
            </svg>
            <span className="text-[#6A6A6A] text-[14px]">Bar Line Chart</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </button>
      </div>

      <div className="flex items-center space-x-2 text-[#6A6A6A] mb-8">
        <span role="img" aria-label="calendar" className="text-xl">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.98926 16.7705C3.57676 16.7705 3.22363 16.6236 2.92988 16.3299C2.63613 16.0361 2.48926 15.683 2.48926 15.2705V4.77051C2.48926 4.35801 2.63613 4.00488 2.92988 3.71113C3.22363 3.41738 3.57676 3.27051 3.98926 3.27051H4.73926V1.77051H6.23926V3.27051H12.2393V1.77051H13.7393V3.27051H14.4893C14.9018 3.27051 15.2549 3.41738 15.5486 3.71113C15.8424 4.00488 15.9893 4.35801 15.9893 4.77051V15.2705C15.9893 15.683 15.8424 16.0361 15.5486 16.3299C15.2549 16.6236 14.9018 16.7705 14.4893 16.7705H3.98926ZM3.98926 15.2705H14.4893V7.77051H3.98926V15.2705ZM3.98926 6.27051H14.4893V4.77051H3.98926V6.27051ZM9.23926 10.7705C9.02676 10.7705 8.84863 10.6986 8.70488 10.5549C8.56113 10.4111 8.48926 10.233 8.48926 10.0205C8.48926 9.80801 8.56113 9.62988 8.70488 9.48613C8.84863 9.34238 9.02676 9.27051 9.23926 9.27051C9.45176 9.27051 9.62988 9.34238 9.77363 9.48613C9.91738 9.62988 9.98926 9.80801 9.98926 10.0205C9.98926 10.233 9.91738 10.4111 9.77363 10.5549C9.62988 10.6986 9.45176 10.7705 9.23926 10.7705Z" fill="#6A6A6A"/>
          </svg>
        </span>
        <span className="text-[14px]">Jun 07, 2024</span>
        <span>&rarr;</span>
        <span className="text-[14px]">Jun 13, 2024</span>
        <ChevronDown className="w-4 h-4 text-[#6A6A6A]" />
      </div>

      <div className="flex">
        <div className="w-[300px] h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                startAngle={90}
                endAngle={450}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 pl-12">
          {data.map((item, index) => (
            <div key={index} className="mb-8 last:mb-0 border-b pb-6 border-[#CCCCCC]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#454545] text-[14px]">{item.name}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-[20px] text-[#454545] font-medium">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2,
                  }).format(item.value)}
                </div>
                <ProgressBar percentage={item.percentage} color={item.color} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseBreakdown;
