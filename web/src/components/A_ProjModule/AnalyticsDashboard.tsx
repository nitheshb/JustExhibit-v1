import React, { useState } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { scaleLinear } from 'd3-scale';
import UnitsSoldChart from './UnitsSoldChart';
import { TopProducts } from './TopProducts';
import CollectionsDashboard from './CollectionsDashboard';
import CRMInventoryReport from './CRMInventoryReport';
import TaskTable from './TaskTable';
import ExpenseBreakdown from './ExpenseBreakdown';
import ExpenseLineChart from './ExpenseLineChart';
import ExpenseChart from './ExpenseChart';
import TopCollections from './TopCollections';
import ProjectCollections from './ProjectCollections';
import ProjectInventoryDashboard from './ProjectInventory';
import OverviewDash from './OverviewDash';
import SoldUnitsone from './SoldUnitsone';
import TotalsalesDashboard from './TotalsalesDashboard';
import SalesDashboardtwo from './SalesDashboardtwo';
import SalesDashboardthree from './SalesDashboardthree';
import UnitsSoldDashboardone from './UnitsSoldDashboardone';
import TicketConfirmation from './TicketConfirmation';
import UpcomingEvents from './UpcomingEvents';
import ProjectCards from './ProjectCards';





const AnalyticsDashboard = () => {
  const timeSeriesData = [
    { time: '12', value: 5, prevValue: 5 },
    { time: '13', value: 5, prevValue: 5 },
    { time: '14', value: 20, prevValue: 5 },
    { time: '15', value: 5, prevValue: 5 },
    { time: '16', value: 5, prevValue: 5 },
    { time: '17', value: 90, prevValue: 30 },
    { time: '18', value: 5, prevValue: 5 },
  ];

  const channelData = [
    { name: 'Make an offer', value1: 80, value2: 120, value3: 0 },
    { name: 'Online store', value1: 20, value2: 0, value3: 0 },
  ];

  const customScale = scaleLinear()
    .domain([5, 10, 50, 100])
    .range([0, 50, 75, 100]);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
  
    const options = [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
      { label: "Option 3", value: "option3" },
    ];
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelectedOption(option.label); 
      setIsOpen(false); 
    };







const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const time = payload[0].payload.time; 

    return (
      <div className="bg-white p-3 rounded-md">
        <p className="text-black">Time: {time}</p>

        {payload.map((entry, index) => {
          const { value, prevValue } = entry.payload; 
          const strokeColor = entry.stroke; 

      
          return (
            <div key={index} className="flex items-center gap-2">
            
              <div
                style={{ backgroundColor: strokeColor }}
                className="w-4 h-4 "
              ></div>
          
              <p className="text-black">
                {entry.dataKey === "value"
                  ? `Current Value: ${value}`
                  : entry.dataKey === "prevValue"
                  ? `Previous Value: ${prevValue}`
                  : null}
              </p>
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};
 


 

  return (
    <>
      <div className="w-full bg-[#F1F1F1] p-6 space-y-6">
        <h1 className="text-2xl text-[#000000] font-semibold">Analytics</h1>

    
        <div className="flex justify-between items-center gap-4">
          <div className="flex flex-row gap-6 items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 bg-white px-4 py-1 rounded-md">
                Nov 18, 2024
              </span>
            </div>
            {/* <select className="px-4 py-2 border rounded-md bg-white">
              <option>Select module</option>
            </select> */}



<div className="p-6">
      <div className="relative w-[170px]">

        <button
          onClick={toggleDropdown}
          className="w-full px-4 py-1 text-left text-[#3D3D3D] bg-white   rounded-md  text-[16px] font-normal hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center justify-between"
        >
          {selectedOption || "Select Module"}
          <ChevronDown className='w-5 h-5' />
        </button>


        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
            <ul className="py-1 text-sm text-[#374151]">
              {options.map((option) => (
                <li
                  key={option.value}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
          </div>
          <button className="relative bg-white text-[#000000] px-4 py-2 rounded-md">
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#27CA02] rounded-full"></div>
            Live Data
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 h-full items-end">
      
          <div className="flex flex-col rounded-lg py-5 h-full bg-white shadow">
            <div className="pt-6 px-4">
              <h2 className="text-[#000000] text-[19px] ml-4">Total Sales</h2>
              <div className="flex items-center gap-3 mt-4 mb-4 ml-4">
                <span className="text-[30px] text-[#000000] font-semibold">&#8377; 387.75</span>
                <div className="flex items-center text-[#00A236]">
                  <TrendingUp className="w-5 h-5 mx-3" />
                  <span className="text-[18px]">23%</span>
                </div>
              </div>
            </div>
            <div className="h-96 px-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData} margin={{ top: 0, right: 30, bottom: 0, left: 0 }}>
                  <CartesianGrid vertical={false} stroke="#CCCCCC" />
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    stroke="#3D3D3D"
                    tick={{ dy: 10 }}
                    interval={0}
                  />
                  <YAxis
                    domain={[5, 100]}
                    ticks={[5, 25, 50, 75, 100]}
                    axisLine={false}
                    tickLine={false}
                    stroke="#3D3D3D"
                  />


             
                  {/* <Tooltip contentStyle={{ backgroundColor: '#333333', color: 'white' }} /> */}


                  <Tooltip content={<CustomTooltip />} />


                  <Line
                    type="monotone"
                    dataKey="prevValue"
                    stroke="#CCCCCC"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        
          <div className="flex flex-col rounded-lg py-5 h-full bg-white shadow">
            <div className="pt-6 px-4 flex flex-col h-full">
              <h2 className="text-[#000000] mb-4 ml-5">Top 5 Channels</h2>
              <div className="h-72 mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={channelData} margin={{ top: 0, right: 30, bottom: 0, left: 0 }} barGap={0}>
                    <CartesianGrid vertical={false} stroke="#CCCCCC" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#3D3D3D" />
                    <YAxis domain={[0, 'dataMax']} ticks={[10, 50, 100, 150]} axisLine={false} tickLine={false} stroke="#3D3D3D" />




                    <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md text-sm text-gray-700 min-w-[150px]">
                    <p className="font-bold text-blue-500 mb-2">{label}</p>
                    {payload.map((item, index) => (
                      <div key={index} className="flex justify-between items-center mt-2">
                        <div className="flex items-center">
                          {/* Color Block */}
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







                    <Bar dataKey="value1" fill="#29AAE3" radius={[4, 4, 0, 0]} barSize={70} />
                    <Bar dataKey="value2" fill="#87CDEE" radius={[4, 4, 0, 0]} barSize={70} />
                    <Bar dataKey="value3" fill="#29AAE3" radius={[4, 4, 0, 0]} barSize={70} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>


{/* 
      <div className="grid bg-[#F1F1F1] grid-cols-1 sm:grid-cols-2 gap-6">
        <TopCollections />
        <ProjectCollections />
        <ProjectInventoryDashboard />
        <ExpenseBreakdown />
      </div>

      <div className="py-20">
        <TaskTable />
      </div> */}




<div className="bg-[#F1F1F1] grid grid-cols-1 lg:grid-cols-2  gap-8 px-6 py-8">
  <div className="bg-white rounded-lg shadow-lg p-6">
    <TopCollections />
  </div>
  <div className="bg-white rounded-lg shadow-lg p-6">
    <ProjectCollections />
  </div>
  <div className="bg-white rounded-lg shadow-lg p-6">
    <ProjectInventoryDashboard />
  </div>

  <div className="bg-white rounded-lg shadow-lg p-6">
    <ExpenseChart />
  </div> 
   <div className="bg-white rounded-lg shadow-lg p-6">
    <ExpenseLineChart />
  </div>









  <div className="bg-white rounded-lg shadow-lg p-6">
    <ExpenseBreakdown />
  </div>





  


  


  
  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
    <TaskTable />
  </div>


{/* 
  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
    <DashboardComponent/>
  </div> */}


  
  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
    <OverviewDash/>
  </div>



  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
  <CRMInventoryReport/>
  </div>


  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
  <SoldUnitsone/>
  </div>

  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
  <TotalsalesDashboard/>
  </div>







  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
  <CollectionsDashboard/>
  </div>





  


    
  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
  <SalesDashboardtwo/>
  </div>


  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
  <SalesDashboardthree/>
  </div>


  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
  <UnitsSoldDashboardone/>
  </div>


  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
  <TicketConfirmation/>
  </div>





  <div className="col-span-full bg-white rounded-lg shadow-lg p-6">
  <UpcomingEvents/>
  </div>







  








 
  
<div className="bg-white rounded-lg shadow-lg ">
<TopProducts />
  </div>



    
<div className="bg-white rounded-lg shadow-lg ">
<UnitsSoldChart />
  </div>









<div className="col-span-full bg-white rounded-lg shadow-lg p-6">
<ProjectCards/>
  </div>








</div>

    </>
  );
};

export default AnalyticsDashboard;





