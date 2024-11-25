import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from 'recharts';

const SalesDashboardtwo = () => {
  const totalSoldData = [
    { 
      name: 'Month', 
      phase1: 20,  // darkest blue
      phase2: 7,   // medium blue
      phase3: 3    // lightest blue
    }
  ];

  const projectData = [
    { name: 'Project 1', value: 100, label: '10 units', maxValue: 100 },
    { name: 'Project 2', value: 80, label: '8 sessions', maxValue: 100 },
    { name: 'Project 3', value: 61.2, label: '612 sessions', maxValue: 100 },
    { name: 'Project 3', value: 61.2, label: '612 sessions', maxValue: 100 },
    { name: 'Project 3', value: 61.2, label: '612 sessions', maxValue: 100 }
  ];

  const CustomBar = (props) => {
    const { x, y, width, height, fill } = props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={4}
          ry={4}
        />
      </g>
    );
  };

  return (
    <div className="p-8 w-full max-w-3xl bg-white rounded-3xl shadow">
      {/* Header Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-900">Sold units   box</h2>
          <span className="text-gray-500">Month</span>
        </div>
        <div className="text-4xl font-bold mb-6">30 units sold</div>
        
        {/* Top Stacked Bar */}
        <div className="h-8 mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={totalSoldData}
              layout="vertical"
              barSize={32}
            >
              <XAxis type="number" hide domain={[0, 30]} />
              <YAxis type="category" hide dataKey="name" />
              <Bar 
                dataKey="phase1" 
                stackId="a" 
                fill="#2196f3" 
                shape={<CustomBar />} 
              />
              <Bar 
                dataKey="phase2" 
                stackId="a" 
                fill="#90caf9" 
                shape={<CustomBar />} 
              />
              <Bar 
                dataKey="phase3" 
                stackId="a" 
                fill="#bbdefb" 
                shape={<CustomBar />} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Projects Section */}
      <div className="space-y-8">
        {projectData.map((item, index) => (
          <div key={index} className="relative">
            <div className="mb-2">
              <span className="text-lg font-semibold text-gray-900">{item.name}</span>
            </div>
            <div className="h-8 relative">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[item]}
                  layout="vertical"
                  barSize={32}
                >
                  <XAxis 
                    type="number" 
                    hide 
                    domain={[0, item.maxValue]} 
                  />
                  <YAxis 
                    type="category" 
                    hide 
                    dataKey="name" 
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#2196f3" 
                    shape={<CustomBar />}
                  />
                </BarChart>
              </ResponsiveContainer>
              <span className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-700">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesDashboardtwo;