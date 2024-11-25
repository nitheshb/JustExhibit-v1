import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer } from 'recharts';

const CollectionsDashboard = () => {
  const progressData = [
    { name: 'completed', value: 50 },
    { name: 'inProgress', value: 30 },
    { name: 'remaining', value: 20 }
  ];

  const COLORS = ['#0EA5E9', '#93C5FD', '#DBEAFE'];

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow-sm">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-normal">Collections</h1>
        <span className="text-gray-500">Month</span>
      </div>

   
      <div className="mb-6">
        <h2 className="text-4xl font-semibold">₹ 492,767.93</h2>
      </div>


      <div className="h-8 mb-12">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={progressData}
            layout="vertical"
            barSize={32}
          >
            <Bar
              dataKey="value"
              fill="#0EA5E9"
              background={false}
              radius={[4, 4, 4, 4]}
            >
              {progressData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

 
      <div className="mb-12">
        <h3 className="text-xl font-normal mb-6">Project-wise Breakdown</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Project 1</span>
            <span className="text-gray-500">₹ 123.45</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Project 2</span>
            <span className="text-gray-500">₹ 0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Project 3</span>
            <span className="text-gray-500">₹ 214.84</span>
          </div>
        </div>
      </div>

      {/* Employee Breakdown */}
      <div>
        <h3 className="text-xl font-normal mb-6">Employee-wise Breakdown</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Person 1</span>
            <span className="text-gray-500">₹ 200.45</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Person 2</span>
            <span className="text-gray-500">₹ 0.0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Person 3</span>
            <span className="text-gray-500">₹ 214.84</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsDashboard;