// import React from 'react'

// import { PieChart, Pie, Cell, Tooltip } from 'recharts'

// const data = [
//   { name: 'Group A', value: 400, color: '#8884d8' },
//   { name: 'Group B', value: 300, color: '#fff' },
//   // { name: 'Group C', value: 300, color: '#ffc658' },
//   // { name: 'Group D', value: 200, color: '#ff8042' },
// ]

// const DoughnutChartWithRoundedSegments = () => {
//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         data={data}
//         // cx={200} // center X
//         // cy={200} // center Y
//         // innerRadius={80} // This makes it a doughnut
//         // outerRadius={120} // Controls the thickness
//         fill="#8884d8"
//         paddingAngle={-10} // Space between segments
//         // cornerRadius={50} // Rounds the corners
//         dataKey="value"
//         startAngle={180}
//         endAngle={-180}
//         cornerRadius={100}
//         innerRadius={90}
//         outerRadius={140}
//         isAnimationActive={true}
//         stroke="none"
//         legendType="circle"
//       >
//         {data.map((entry, index) => (
//           <Cell key={`cell-${index}`} fill={entry.color} />
//         ))}
//       </Pie>
//       <Tooltip />
//     </PieChart>
//   )
// }

// export default DoughnutChartWithRoundedSegments




import { Check } from 'lucide-react';

const DoughnutChartWithRoundedSegments = ({ progress = 0, size = 60, strokeWidth = 15 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-[#E3BDFF] transition-all duration-300 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {progress < 100 ? (
          <span className="text-[7px] font-bold">{Math.round(progress)}%</span>
        ) : (
          <DoughnutChartWithRoundedSegments className="text-green-500" size={size / 3} />
        )}
      </div>
    </div>
  );
};

export default DoughnutChartWithRoundedSegments
