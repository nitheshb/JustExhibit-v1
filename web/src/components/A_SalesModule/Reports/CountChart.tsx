import React from "react"


import maleFemale from '../../../../public/maleFemale.png'
import moreDark from '../../../../public/moreDark.png'


//import Image from "./path-to-your-image-component"; // Use your image import approach
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Total",
    count: 106,
    fill: "white",
  },
  {
    name: "Girls",
    count: 53,
    fill: "#F0c1b7",
  },
  {
    name: "Boys",
    count: 53,
    fill: "#E06349",
  },
];

const CountChart = () => {
  return (
    <div className="">
      <div className="">
        <div className="bg-white rounded-xl p-4">
          {/* TITLE */}
          <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Active</h1>
            <img src={moreDark} alt="More" width={20} height={20} />
          </div>
          {/* CHART */}
          <div className="relative w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="100%"
                barSize={32}
                data={data}
              >
                <RadialBar background dataKey="count" />
              </RadialBarChart>
            </ResponsiveContainer>
            <img
              src={maleFemale}
              alt="Gender Distribution"
              width={50}
              height={50}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          {/* BOTTOM */}
          <div className="flex justify-center gap-16">
            <div className="flex flex-col gap-1 items-center">
              <div className="w-5 h-5 bg-[#E06349] rounded-full" />
              <h1 className="font-bold">1,634</h1>
              <h2 className="text-xs text-gray-300">Boys (55%)</h2>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-5 h-5 bg-[#F0c1b7] rounded-full" />
              <h1 className="font-bold">1,234</h1>
              <h2 className="text-xs text-gray-300">Girls (45%)</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
