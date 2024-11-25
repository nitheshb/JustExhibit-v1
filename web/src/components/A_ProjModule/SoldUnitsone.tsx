import React from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';


const projectData = [
  { name: 'Project 1', units: 10 },
  { name: 'Project 2', units: 8 },
  { name: 'Project 3', units: 6 },
  { name: 'Project 4', units: 6 },
  { name: 'Project 5', units: 6 },
];

const totalUnits = projectData.reduce((sum, project) => sum + project.units, 0);
const maxUnits = Math.max(...projectData.map(p => p.units));

function SoldUnitsone() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm p-8">
        <div className="space-y-12">
    
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-1">Sold Units</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl font-semibold">$ 387.75</span>
              <div className="flex items-center text-emerald-500">
                <ArrowUpRight className="w-5 h-5" />
                <span className="font-medium">23%</span>
              </div>
            </div>
            <div className="flex items-center text-gray-500 gap-2">
              <Calendar className="w-5 h-5" />
              <span>{format(new Date('2024-06-07'), 'MMM dd, yyyy')}</span>
              <span>→</span>
              <span>{format(new Date('2024-06-13'), 'MMM dd, yyyy')}</span>
            </div>
          </div>

  
          <div>
            <h2 className="text-2xl font-medium mb-4">{totalUnits} units sold </h2>
            <div className="w-full h-3 bg-sky-100 rounded-full overflow-hidden mb-6">
              <div className="h-full w-3/4 bg-sky-400 rounded-full" />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-sky-400 rounded-full" />
                <span className="text-gray-600">Units sold</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded-full" />
                <span className="text-gray-600">In progress</span>
              </div>
            </div>
          </div>

    
          <div className="space-y-6">
            {projectData.map((project) => (
              <div key={project.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{project.name}</span>
                  <span className="text-gray-600 ml-4 min-w-[80px] text-right">
                    {project.units} units
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sky-400 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${(project.units / maxUnits) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  );
}

export default SoldUnitsone;




