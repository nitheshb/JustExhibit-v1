import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Download } from 'lucide-react';

const ProjectCollections = () => {
  const data = [
    { name: 'week 1', current: 15000, previous: 40000 },
    { name: 'week 2', current: 8000, previous: 12000 },
    { name: 'week 3', current: 15000, previous: 55000 },

    { name: 'week 4', current: 9000, previous: 55000 },


    { name: 'week 5', current: 16000, previous: 55000 },
    { name: 'week 6', current: 12000, previous: 55000 },


  ];

  const formatYAxis = (value) => {
    if (value >= 1000) {
      return `${value / 1000}K`;
    }
    return value;
  };

  // Custom Legend Component
  const CustomLegend = ({ payload }) => {
    if (!payload.length) return null;
    
    return (

      <>
      </>

    );
  };




  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
          <p className="font-bold text-gray-800">{label}</p>
          {payload.map((item, index) => (
            <div key={index} className="flex items-center mt-2">
            
              <div
                className="w-4 h-4  mr-2"
                style={{ backgroundColor: item.stroke }}
              />
              <span className="font-medium">{item.name}</span>
              <span className="ml-auto font-semibold text-gray-800">{`${formatYAxis(item.value)}`}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };








  return (
    <div className="w-full max-w-4xl p-6 relative">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-[19px] font-normal text-[#000000]">Project collections</h1>
          <div className="text-[30px] font-semibold mt-2 text-[#000000]">&#8377;  2613</div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Download className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="h-[400px] relative">
        <ResponsiveContainer width="100%" height="100%">
 


<LineChart
  data={data}
  margin={{ top: 0, right: 0, left: 0, bottom: 30 }}
>

<CartesianGrid vertical={false} stroke="#CCCCCC" />

  <XAxis
    dataKey="name"
    axisLine={{ stroke: '#E5E7EB' }}
    tick={{ fill: '#6B7280', fontSize: 14 }}
    tickLine={false}
    dy={10}
  />
  <YAxis
    tickFormatter={formatYAxis}
    axisLine={false}
    tickLine={false}
    tick={{ fill: '#6B7280', fontSize: 14 }}
    domain={[0, 100000]}
    ticks={[1000, 10000, 50000, 100000]}
    
  />
  {/* <Tooltip 
    contentStyle={{ 
      borderRadius: '8px',
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}
    formatter={(value) => [`${formatYAxis(value)}`, '']}
  />
  <Legend content={<CustomLegend payload={undefined} />} /> */}


    
    <Tooltip content={<CustomTooltip />} />
    <Legend content={<CustomLegend payload={undefined} />} />

  <Line
    type="monotone"
    dataKey="current"
    stroke="#2196F3" 
    strokeWidth={2}
    dot={false} 
    activeDot={{ r: 6 }}  
    name="current"
  />

  <Line
    type="monotone"
    dataKey="previous"
    stroke="#E5E7EB"  
    strokeWidth={2}
    strokeDasharray="5 5" 
    dot={false}  
    activeDot={{ r: 6 }}  
    name="previous"
  />
</LineChart>

        </ResponsiveContainer>
      </div>


      <div className="flex flex-row items-end gap-2 absolute bottom-0 right-8">


<button className="flex items-center px-6 py-2 rounded-lg bg-gray-100 text-sm text-gray-600 relative">
          <div className="flex items-center pl-3">
            <div className="w-7 h-[2px] bg-[#29AAE3] mr-2"></div>
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

export default ProjectCollections;




