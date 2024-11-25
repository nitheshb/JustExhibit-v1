import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const orderData = [
  { name: 'Jan', total: 28, unique: 25 },
  { name: 'Feb', total: 24, unique: 22 },
  { name: 'Mar', total: 20, unique: 18 },
  { name: 'Apr', total: 22, unique: 20 },
  { name: 'May', total: 24, unique: 21 },
  { name: 'Jun', total: 18, unique: 16 }

];

const userData = [
  { name: 'Jan', total: 28, unique: 25 },
  { name: 'Feb', total: 24, unique: 22 },
  { name: 'Mar', total: 20, unique: 18 },
  { name: 'Apr', total: 22, unique: 20 },
  { name: 'May', total: 24, unique: 21 },
  { name: 'Jun', total: 18, unique: 16 }
  
];

const DashboardStats = () => {



  const  metricsone = [
    { label: "Today", total: "1337", secondary: "1322",  highlight: true },
    { label: "Yesterday", total: "20k", secondary: "17.5k" },
    { label: "Last 7 Days", total: "152k", secondary: "105k" },
    { label: "Last 30 Days", total: "565.8k", secondary: "358.9k" },
    { label: "Last 90 Days", total: "1.8m", secondary: "902.6k" }
  ];





  const metrics = [
    { period: 'Today', amount: '₹ 199.98', orders: 2, highlight: true },
    { period: 'Yesterday', amount: '₹ 119.97', orders: 3 },
    { period: 'Last 7 Days', amount: '₹ 829.87', orders: 13 },
    { period: 'Last 30 Days', amount: '₹ 3.9k', orders: 62 },
    { period: 'Last 90 Days', amount: '₹ 10.3k', orders: 164 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-xs text-gray-600">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className=" bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">

   
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">

          <div className="text-sm font-semibold text-gray-800  pb-2">
          Units Sold
  </div>
            <div className="flex mt-8 space-x-8">
     
              <div className="flex-1 ">
<div className="space-y-1 ">





  <div className="grid grid-cols-3 pb-1">
    <div className="text-gray-600 font-medium"></div>
    <div className="text-[#6A6A6A] font-medium text-xs">Total</div>
    <div className="text-[#6A6A6A] font-medium text-xs">Orders</div>
  </div>

  {metrics.map((item) => (
    <div key={item.period} className="grid grid-cols-3 m-0 items-center">
      <p className={`text-xs ${item.highlight ? 'text-[#29AAE3] font-medium' : 'text-gray-500'}`}>
        {item.period}
      </p>
      <p className={`text-sm ${item.highlight ? 'text-[#29AAE3] font-medium' : 'text-gray-700'}`}>
        {item.amount}
      </p>
      <p className="text-sm text-gray-700">
        {item.orders}
      </p>
    </div>
  ))}
</div>





              </div>



<div className="flex-1">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={orderData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `₹${value}k`}
                      dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="total" fill="#BBE4F6" radius={[4, 4, 0, 0]} maxBarSize={35} />
                    <Bar dataKey="unique" fill="#29AAE3" radius={[4, 4, 0, 0]} maxBarSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>







        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">




          <div className="text-sm font-semibold text-gray-800  pb-2">
          Collections
  </div>


            <div className="flex mt-8 space-x-8">
     

<div className="flex-1 ">




<div className="space-y-1 ">







  <div className="grid grid-cols-3 pb-1">
    <div className="text-gray-600 font-medium"></div>
    <div className="text-[#6A6A6A] font-medium text-xs">Total</div>
    <div className="text-[#6A6A6A] font-medium text-xs">Orders</div>
  </div>

  {metricsone.map((item) => (
    <div key={item.label} className="grid grid-cols-3 m-0 items-center">
      <p className={`text-xs ${item.highlight ? 'text-[#29AAE3] font-medium' : 'text-gray-500'}`}>
        {item.label}
      </p>
      <p className={`text-sm ${item.highlight ? 'text-[#29AAE3] font-medium' : 'text-gray-700'}`}>
        {item.total}
      </p>
      <p className="text-sm text-gray-700">
        {item.secondary}
      </p>
    </div>
  ))}
</div>





              </div>


              <div className="flex-1">
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={userData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6B7280', fontSize: 12 }}
                      tickFormatter={(value) => `₹${value}k`}
                      dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="total" fill="#BBE4F6" radius={[4, 4, 0, 0]} maxBarSize={35} />
                    <Bar dataKey="unique" fill="#29AAE3" radius={[4, 4, 0, 0]} maxBarSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardStats;
