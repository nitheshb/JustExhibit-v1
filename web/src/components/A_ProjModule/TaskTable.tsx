import React, { useState } from 'react';
import { Flag } from 'lucide-react';

const TaskTable = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Wireframing",
      version: "3",
      description: "-",
      dueDate: "February 12, 2024",
      priority: "Urgent",
      progress: 85,
      checked: false
    },
    {
      id: 2,
      name: "Dashboard",
      description: "Create wireframe for Dashboard page",
      dueDate: "February 12, 2024",
      priority: "Urgent",
      progress: 95,
      checked: false
    },
    {
      id: 3,
      name: "Analytics",
      description: "Create wireframe for analytics page",
      dueDate: "February 12, 2024",
      priority: "Urgent",
      progress: 100,
      checked: false
    },
    {
      id: 4,
      name: "Messages",
      description: "Create wireframe for messages page",
      dueDate: "February 12, 2024",
      priority: "Normal",
      progress: 34,
      checked: false
    },
    {
      id: 5,
      name: "Hi-Fi Design",
      version: "3",
      description: "Create Hi-Fi Design for 3 main screens",
      dueDate: "February 14, 2024",
      priority: "Low",
      progress: 20,
      checked: false
    },
    {
      id: 6,
      name: "Dashboard",
      version: "3",
      description: "Create Hi-Fi Design for Onboarding step by step",
      dueDate: "February 14, 2024",
      priority: "Low",
      progress: 20,
      checked: false
    },
    {
      id: 7,
      name: "Analytics",
      version: "3",
      description: "Create Hi-Fi Design for login screen step by step",
      dueDate: "February 14, 2024",
      priority: "Low",
      progress: 20,
      checked: false
    },
    {
      id: 8,
      name: "Messages",
      version: "3",
      description: "Create Hi-Fi Design for sign up screen step by step",
      dueDate: "February 14, 2024",
      priority: "Low",
      progress: 20,
      checked: false
    }
  ]);

  const handleCheckboxChange = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, checked: !task.checked } : task
    ));
  };

  const [selectAll, setSelectAll] = useState(false);
  
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setTasks(tasks.map(task => ({ ...task, checked: !selectAll })));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'text-red-500';
      case 'Normal':
        return 'text-emerald-500';
      case 'Low':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  // Simple Progress Bar Component
  const ProgressBar = ({ progress }) => (
    <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-purple-600 rounded-full transition-all duration-300 ease-in-out" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <div className="w-[80%] bg-white rounded-[10px] shadow-sm overflow-hidden">
      <div className="overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-[#E6E6E6]">
            <tr>
              <th className="px-2 py-2 text-left text-sm font-medium text-[#000000] bg-[#E6E6E6] first:rounded-tl-lg border-b border-gray-200 w-2/12">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                  />
                  <span>Task</span>
                </div>
              </th>
              <th className="px-2 py-2 text-left text-sm font-medium text-[#000000] border-x border-b border-gray-200 w-3/12">Description</th>
              <th className="px-2 py-2 text-left text-sm font-medium text-[#000000] border-x border-b border-gray-200 w-2/12">Assignee</th>
              <th className="px-2 py-2 text-left text-sm font-medium text-[#000000] border-x border-b border-gray-200 w-2/12">Due Date</th>
              <th className="px-2 py-2 text-left text-sm font-medium text-[#000000] border-x border-b border-gray-200 w-2/12">Priority</th>
              <th className="px-2 py-2 text-left text-sm font-medium text-[#000000] last:rounded-tr-lg border-b border-gray-200 w-1/12">Progress</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr 
                key={task.id}
                className="hover:bg-gray-50/50"
              >
                <td className="px-2 py-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => handleCheckboxChange(task.id)}
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                    />
                    <span className="font-normal">
                      {task.name}
                    </span>
                    {task.version && (
                      <span className="text-[#000000] font-normal text-sm">&#8627;{task.version}</span>
                    )}
                  </div>
                </td>
                <td className="px-2 py-2 text-[#000000] font-normal border-x border-b border-gray-200">{task.description}</td>
                <td className="px-2 py-2 border-x border-b border-gray-200">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-[#EAFFDB]"></div>
                    <div className="w-8 h-8 rounded-full bg-[#B9B0FF]"></div>
                    <div className="w-8 h-8 rounded-full bg-[#FFBFBF]"></div>
                  </div>
                </td>
                <td className="px-2 py-2 text-[#000000] font-normal border-x border-b border-gray-200">{task.dueDate}</td>
                <td className="px-2 py-2 border-x border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Flag className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
                    <span className={getPriorityColor(task.priority)}>{task.priority}</span>
                  </div>
                </td>
                <td className="px-2 py-2 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <ProgressBar progress={task.progress} />
                    <span className="text-[#000000] font-normal">{task.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;