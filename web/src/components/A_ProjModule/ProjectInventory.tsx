import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const ProjectInventoryDashboard = () => {
  const data = [
    {
      name: 'Project 1',
      sessions: 9,
      percentage: 0.34,
      growth: 106,
    },
    {
      name: 'Project 2',
      sessions: 9,
      percentage: 0.89,
      growth: 74,
    },
    {
      name: 'Project 3',
      sessions: 9,
      percentage: 0.11,
      growth: 74,
    },
    {
      name: 'Project 4',
      sessions: 12,
      percentage: 0.45,
      growth: 54,
    },
    {
      name: 'Project 5',
      sessions: 15,
      percentage: 0.78,
      growth: 32,
    },
 
  ];

  return (
    <div className="w-full max-w-3xl h-full bg-white flex flex-col justify-between p-4 gap-6 overflow-hidden">


<div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-lg font-normal text-[#3D3D3D]">Project Inventory</h2>
          <h2 className="text-[22px] text-[#3D3D3D]">11.0%</h2>
        </div>


        <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.54883 18.417H13.5488V16.167H4.54883V18.417ZM4.54883 13.917H13.5488V11.667H4.54883V13.917ZM2.29883 22.917C1.68008 22.917 1.15039 22.6967 0.709766 22.2561C0.269141 21.8154 0.0488281 21.2857 0.0488281 20.667V2.66699C0.0488281 2.04824 0.269141 1.51855 0.709766 1.07793C1.15039 0.637305 1.68008 0.416992 2.29883 0.416992H11.2988L18.0488 7.16699V20.667C18.0488 21.2857 17.8285 21.8154 17.3879 22.2561C16.9473 22.6967 16.4176 22.917 15.7988 22.917H2.29883ZM10.1738 8.29199V2.66699H2.29883V20.667H15.7988V8.29199H10.1738Z" fill="#3D3D3D"/>
</svg>

      
      </div>

      <div className="flex flex-col justify-between w-full gap-4">

        <table className="w-full border-collapse">
          <tbody>
            {data.map((project, index) => (
              <tr key={index} className="border-b">
                <td className="py-4 text-left">
                  <div className="flex flex-col">
                    <span className="font-medium text-[#3D3D3D]">{project.name}</span>
                    <span className="text-sm text-[#6A6A6A]">{project.sessions} sessions</span>
                  </div>
                </td>
                <td className="py-4 text-center text-gray-800">{(project.percentage * 100).toFixed(0)}%</td>
                <td className="py-4 text-right">
                  <span
                    className={`inline-flex items-center ${
                      project.growth > 0 ? 'text-[#00A236]' : 'text-red-500'
                    }`}
                  >
                    <ArrowUpRight
                      className={`ml-1 ${project.growth > 0 ? '' : 'rotate-180'}`}
                      size={20}
                    />
                   {project.growth}%

                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectInventoryDashboard;
