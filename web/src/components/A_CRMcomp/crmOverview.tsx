import React from 'react';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';
import { ArrowUpRight, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent,  CardHeader, CardTitle } from '../ui/card';
import FinancialSemicircleChart from '../A_CrmModule/FinancialSemicircleChart';
import VisitMetricsChart from 'src/StallBookingOverview';

const JewelleryExpoDashboard = () => {
  // Sample data for enquiry trend
  const enquiryData = [
    { name: 'Jan', value: 80 },
    { name: 'Feb', value: 60 },
    { name: 'Mar', value: 120 },
    { name: 'Apr', value: 180 },
    { name: 'May', value: 200 }
  ];

  // Sample data for stall booking overview
  const stallBookingData = [
    { name: 'Jan', active: 80, booked: 30, notInterested: 25 },
    { name: 'Feb', active: 95, booked: 35, notInterested: 30 },
    { name: 'Mar', active: 70, booked: 40, notInterested: 35 },
    { name: 'Apr', active: 85, booked: 45, notInterested: 28 },
    { name: 'May', active: 110, booked: 50, notInterested: 32 },
    { name: 'Jun', active: 120, booked: 55, notInterested: 35 }
  ];


  const data = [
  { month: 'Jan', value: 70 },
  { month: 'Feb', value: 95 },
  { month: 'Mar', value: 25 },
  { month: 'Apr', value: 80 },
  { month: 'May', value: 100 }
];


  return (
    <div className="min-h-screen  p-6">





      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-manrope font-normal text-[20px] leading-[28px] tracking-[0px] text-[#1A1A1A] mb-4">Good Morning, Rubi !</h1>
            <div className="flex items-center space-x-4">
              <h2 className="font-manrope font-semibold text-[30px] leading-[40px] tracking-[0px] text-[#1A1A1A]">Jewellery expo - 2025</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
                ● Active
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Today</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>



        <div className="flex flex-wrap justify-between my-4">
  {/* Original Ticket */}
  <div className="relative inline-block">
    <img 
      src="/ticket.svg" 
      alt="Ticket" 
      className="w-full h-auto" 
    />
    <div className="absolute bottom-6 left-6 flex flex-col gap-[7px]">
      <p className="m-0 font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
        Tickets
      </p>
      <p className="m-0 font-number font-bold text-[29.93px] leading-[22px] tracking-[1.87px] uppercase text-[#1A1A1A]">
        110
      </p>
    </div>
  </div>

  {/* Ticket 2 */}
  <div className="relative inline-block">
    <img 
      src="/ticket.svg" 
      alt="Ticket" 
      className="w-full h-auto" 
    />
    <div className="absolute bottom-6 left-6 flex flex-col gap-[7px]">
      <p className="m-0 font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
        Tickets
      </p>
      <p className="m-0 font-number font-bold text-[29.93px] leading-[22px] tracking-[1.87px] uppercase text-[#1A1A1A]">
        75
      </p>
    </div>
  </div>

  {/* Ticket 3 */}
  <div className="relative inline-block">
    <img 
      src="/ticket.svg" 
      alt="Ticket" 
      className="w-full h-auto" 
    />
    <div className="absolute bottom-6 left-6 flex flex-col gap-[7px]">
      <p className="m-0 font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
        Tickets
      </p>
      <p className="m-0 font-number font-bold text-[29.93px] leading-[22px] tracking-[1.87px] uppercase text-[#1A1A1A]">
        42
      </p>
    </div>
  </div>

  {/* Ticket 4 */}
  <div className="relative inline-block">
    <img 
      src="/ticket.svg" 
      alt="Ticket" 
      className="w-full h-auto" 
    />
    <div className="absolute bottom-6 left-6 flex flex-col gap-[7px]">
      <p className="m-0 font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
        Tickets
      </p>
      <p className="m-0 font-number font-bold text-[29.93px] leading-[22px] tracking-[1.87px] uppercase text-[#1A1A1A]">
        89
      </p>
    </div>
  </div>

  {/* Ticket 5 */}
  <div className="relative inline-block">
    <img 
      src="/ticket.svg" 
      alt="Ticket" 
      className="w-full h-auto" 
    />
    <div className="absolute bottom-6 left-6 flex flex-col gap-[7px]">
      <p className="m-0 font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
        Tickets
      </p>
      <p className="m-0 font-number font-bold text-[29.93px] leading-[22px] tracking-[1.87px] uppercase text-[#1A1A1A]">
        63
      </p>
    </div>
  </div>
</div>







        {/* Top Row Cards */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  {/* Stall Insight - Modified to match others */}
  <Card className="relative bg-white border border-gray-200 rounded-[8px] p-6 shadow-sm h-96">
    {/* <CardHeader className="pb-3">
      <div className="flex justify-between items-center">
        <CardTitle className="text-base font-medium text-gray-900 tracking-widest">
          STALL INSIGHT
        </CardTitle>
        <ExternalLink className="h-4 w-4 text-gray-600" />
      </div>
    </CardHeader> */}
        <div className="flex justify-between items-center mb-8">
      <h2 className="font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
        STALL INSIGHT
      </h2>
      <ArrowUpRight className="w-4 h-4 text-gray-600" />
    </div>
    <div>
      <div className="text-center">
        <p className="text-gray-600 text-lg font-normal mb-6">
          Booked Stalls <span className="font-medium">vs</span> Expected stalls<br />till now
        </p>
        
        <FinancialSemicircleChart
          paidValue={0}
          remainingValue={0}
          size={270}
        />
        
        <div className="flex justify-between items-end mt-4">
          <div className="text-left">
            <div className="font-manrope font-bold text-[40px] leading-none tracking-[0px] text-center  text-[#F44D21]">20</div>
            <div className="text-xs text-gray-500">Till 12/06/2025</div>
          </div>
          <div className="text-right">
            <div className="font-manrope font-bold text-[40px] leading-none tracking-[0px] text-center  text-[#F44D21]">200</div>
            <div className="text-xs text-gray-500">Due 12/08/2025</div>
          </div>
        </div>
      </div>
    </div>
  </Card>

  {/* Payment Insight - Already properly sized */}
  <Card className="relative bg-white border border-gray-200 rounded-[8px] p-6 shadow-sm h-96">
    <div className="flex justify-between items-center mb-8">
      <h2 className="font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
        PAYMENT INSIGHT
      </h2>
      <ArrowUpRight className="w-4 h-4 text-gray-600" />
    </div>

    <div className="relative mx-auto w-80 h-72 mb-0 overflow-hidden">
      <div className="absolute inset-0 top-0 w-80 h-80 rounded-full border-2 border-red-300 bg-red-50/40">
        <div className="flex flex-col items-center justify-center h-72 text-center px-4 py-6">
          <div className="mb-4">
            <p className="text-gray-600 text-lg font-normal">Till Today</p>
          </div>
          <div className="mb-2">
            <p className="font-manrope font-bold text-[40px] leading-none tracking-[0px]  text-[#F44D21]">
              ₹2,00,000
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700 text-sm font-medium">
              Received payment
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-xs mb-1">out of</p>
            <p className="text-gray-900 text-lg font-semibold">
              ₹3,00,000
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
    </div>
  </Card>

  {/* Enquiry Insight - Already properly sized */}
  <Card className="relative bg-white border border-gray-200 rounded-[8px] p-6 shadow-sm h-96">
    <div className="flex justify-between items-center mb-8">
      <h2 className="font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
        ENQUIRY INSIGHT
      </h2>
      <ArrowUpRight className="w-4 h-4 text-gray-600" />
    </div>

    <div className="mb-1">
      <h1 className="font-manrope font-bold text-[40px] leading-none tracking-[0px]  text-[#F44D21]">
        200
      </h1>
    </div>
    
    <div className="mb-8">
      <p className="text-gray-700 text-lg font-normal">
        enquires
      </p>
    </div>

    <div className="h-48 relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 30,
          }}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity={0.6} />
              <stop offset="100%" stopColor="#fca5a5" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          
          <CartesianGrid 
            strokeDasharray="3 3" 
            vertical={false} 
            stroke="#e5e7eb" 
            horizontal={true}
          />
          
          <XAxis 
            dataKey="month" 
            axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            tickLine={false}
            tick={{ fontSize: 14, fill: '#9ca3af', fontWeight: 'normal' }}
            dy={10}
            interval={0}
          />
          
          <YAxis 
            domain={[0, 100]} 
            hide={true}
          />
          
          <Area
            type="monotone"
            dataKey="value"
            stroke="#ef4444"
            strokeWidth={2.5}
            fill="url(#colorGradient)"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </Card>
</div>
        {/* Bottom Chart */}
        <Card className="relative bg-white shadow-sm border rounded-[8px] border-gray-200">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="font-playfair font-bold text-[16px] leading-[24px] tracking-[2px] uppercase text-[#1A1A1A]">
                STALL BOOKING OVERVIEW
              </CardTitle>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>

                    {/* <CardContent> */}
<div className="flex justify-center items-center space-x-8 mb-6">
  <div className="flex items-center space-x-2">
    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
    <span className="text-sm text-gray-600">Active leads</span>
  </div>
  <div className="flex items-center space-x-2">
    <div className="w-3 h-3 rounded-full bg-green-500"></div>
    <span className="text-sm text-gray-600">Booked leads</span>
  </div>
  <div className="flex items-center space-x-2">
    <div className="w-3 h-3 rounded-full bg-red-500"></div>
    <span className="text-sm text-gray-600">Not interested leads</span>
  </div>
</div>

          

            <div>
              <VisitMetricsChart/>
            </div>

          {/* </CardContent> */}




        </Card>
      </div>
    </div>
  );
};

export default JewelleryExpoDashboard;