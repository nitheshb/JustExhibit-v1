import React from 'react';
import { ChevronDown } from 'lucide-react';

const CRMInventoryReport = () => {
  const projects = [
    { name: 'Test_1', totalUnits: 100, available: 20, sold: 60, blocked: 10, mortgaged: 10 },
    { name: 'A', totalUnits: 80, available: 10, sold: 50, blocked: 15, mortgaged: 5 },
    { name: 'B', totalUnits: 90, available: 30, sold: 40, blocked: 10, mortgaged: 10 },
    { name: 'C', totalUnits: 75, available: 25, sold: 40, blocked: 5, mortgaged: 5 },
    { name: 'D', totalUnits: 110, available: 35, sold: 50, blocked: 15, mortgaged: 10 },
    { name: 'E', totalUnits: 95, available: 20, sold: 55, blocked: 10, mortgaged: 10 },
    { name: 'F', totalUnits: 85, available: 15, sold: 50, blocked: 15, mortgaged: 5 },
    { name: 'G', totalUnits: 70, available: 10, sold: 50, blocked: 5, mortgaged: 5 },
    { name: 'H', totalUnits: 60, available: 15, sold: 30, blocked: 10, mortgaged: 5 },
    { name: 'I', totalUnits: 100, available: 20, sold: 60, blocked: 15, mortgaged: 5 },
  ];

  return (
    <div className="p-4 w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-medium text-gray-800">CRM Inventory Report</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-600">
          Project Name
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full bg-white rounded-lg overflow-hidden shadow-md">
        <div className="bg-[#F8F9FC] p-4 rounded-t-lg">
          <h2 className="text-lg text-center font-medium text-[#000000]" >
            Inventory Summary Report By Project
          </h2>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-[#F8F9FC] border-t border-b border-[#E8ECF4]">
                  <th className="text-left p-1 font-medium text-[#000000] whitespace-nowrap border-r border-[#E8ECF4]">
                    Project Name
                  </th>
                  <th className="text-left p-1 font-medium text-[#000000] whitespace-nowrap border-r border-[#E8ECF4]">
                    Total Units
                  </th>
                  <th className="text-left p-1 font-medium text-[#000000] whitespace-nowrap border-r border-[#E8ECF4]">
                    Available
                  </th>
                  <th className="text-left p-1 font-medium text-[#000000] whitespace-nowrap border-r border-[#E8ECF4]">
                    Sold
                  </th>
                  <th className="text-left p-1 font-medium text-[#000000] whitespace-nowrap border-r border-[#E8ECF4]">
                    Blocked
                  </th>
                  <th className="text-left p-1 font-medium text-[#000000] whitespace-nowrap">
                    Mortgaged
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.name}
                    className="hover:bg-gray-50 border-b border-[#E8ECF4]"
                  >
                    <td className="p-4 text-gray-700 border-r border-[#E8ECF4]">
                      {project.name}
                    </td>
                    <td className="p-4 text-gray-700 border-r border-[#E8ECF4]">
                      {project.totalUnits}
                    </td>
                    <td className="p-4 text-gray-700 border-r border-[#E8ECF4]">
                      {project.available}
                    </td>
                    <td className="p-4 text-gray-700 border-r border-[#E8ECF4]">
                      {project.sold}
                    </td>
                    <td className="p-4 text-gray-700 border-r border-[#E8ECF4]">
                      {project.blocked}
                    </td>
                    <td className="p-4 text-gray-700">{project.mortgaged}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CRMInventoryReport;
