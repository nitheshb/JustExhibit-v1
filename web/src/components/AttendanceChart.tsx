import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the attendance chart
const data = [
  { name: "Mon", 'Hall-1': 60, 'Hall-2': 40 },
  { name: "Tue", 'Hall-1': 70, 'Hall-2': 60 },
  { name: "Wed", 'Hall-1': 90, 'Hall-2': 75 },
  { name: "Thu", 'Hall-1': 90, 'Hall-2': 75 },
  { name: "Fri", 'Hall-1': 65, 'Hall-2': 55 },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <img src="/moreDark.png" alt="More Options" width={20} height={20} /> {/* Use img tag for standard React */}
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
          <Legend align="left" verticalAlign="top" wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }} />
          <Bar dataKey="Hall-1" fill="#0EA5E9" legendType="circle" radius={[10, 10, 0, 0]} />
          <Bar dataKey="Hall-2" fill="#C3EBFA" legendType="circle" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
