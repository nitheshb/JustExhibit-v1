// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// const data = [
//   { name: 'Category 1', value: 0.8 },
//   { name: 'Category 2', value: 0.75 },
//   { name: 'Category 3', value: 0.7 },
// ];

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white px-3 py-2 rounded-md shadow-md">
//         <p className="text-gray-800 font-medium">{payload[0].value}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const CustomBarChart: React.FC = () => {
//   return (
//     <div className="w-full h-[410px] bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Top selling products</h2>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//           barGap={0}
//         >
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           <XAxis
//             dataKey="name"
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: '#6B7280' }}
//             tickMargin={12}
//             interval={0}
//             textAnchor="middle"
//           />
//           <YAxis
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: '#6B7280' }}
//             domain={[0, 1]}
//             ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]}
//           />
//           <Tooltip
//             content={<CustomTooltip />}
//             cursor={{ fill: 'transparent' }}
//           />
//           <Bar
//             dataKey="value"
//             fill="#3B82F6"
//             radius={[4, 4, 4, 4]}
//             barSize={40}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default CustomBarChart;

// import React from 'react';
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// const data = [
//   { name: 'Category 1', value: 0.8 },
//   { name: 'Category 2', value: 0.75 },
//   { name: 'Category 3', value: 0.7 },
// ];

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white px-3 py-2 rounded-md shadow-md">
//         <p className="text-gray-800 font-medium">{`Value: ${payload[0].value}`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const CustomBarChart: React.FC = () => {
//   return (
//     <div className="w-full h-[410px] bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Visit Source
//       </h2>
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           {/* Grid */}
//           <CartesianGrid strokeDasharray="3 3" vertical={false} />
//           {/* Fixed X-Axis */}
//           <XAxis
//             dataKey="name"
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: '#6B7280', fontSize: 12 }}
//             tickMargin={12}
//             interval={0}
//           />
//           {/* Fixed Y-Axis */}
//           <YAxis
//             axisLine={false}
//             tickLine={false}
//             tick={{ fill: '#6B7280', fontSize: 12 }}
//             domain={[0, 1]} // Fixed domain between 0 and 1
//             ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} // Fixed tick values
//             tickCount={6} // Ensures consistent tick spacing
//           />
//           {/* Tooltip */}
//           <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
//           {/* Bar */}
//           <Bar
//             dataKey="value"
//             fill="#3B82F6"
//             radius={[4, 4, 0, 0]} // Rounded top corners
//             barSize={40} // Fixed bar size
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default CustomBarChart;



import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from 'recharts';

const data = [
  { time: 'Instagram Ad', sales: 0, orders: 5 },
  { time: 'Hoardings', sales: 0, orders: 10 },
  { time: 'Google Adwords', sales: 0, orders: 20 },

];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded">
        <p className="text-sm text-gray-600">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-semibold">
            {entry.name === 'sales' ? 'Sales' : 'Orders'}: ₹{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SalesLineChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Visit Source*
      </h2>
      <p className="text-2xl font-bold mb-4">₹0.00</p>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="orders"
              fill="#90caf9"
              radius={[4, 4, 0, 0]}
              barSize={30}
              name="Orders"
            />
            {/* <Line
              type="monotone"
              dataKey="sales"
              stroke="#2563eb"
              strokeWidth={2}
              name="Sales"
              dot={{
                stroke: '#2563eb',
                strokeWidth: 2,
                fill: '#ffffff',
                r: 4,
              }}
              activeDot={{
                stroke: '#2563eb',
                strokeWidth: 2,
                fill: '#ffffff',
                r: 6,
              }}
            /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesLineChart;
