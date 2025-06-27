import React from 'react';

import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent,  CardHeader, CardTitle } from '../ui/card';

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-normal text-gray-900 mb-4">Good Morning, Rubi !</h1>
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold text-gray-900">Jewellery expo - 2025</h2>
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

        {/* Top Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stall Insight */}
          <Card className="relative bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  STALL INSIGHT
                </CardTitle>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-6">
                  Booked Stalls <span className="font-medium">vs</span> Expected stalls<br />till now
                </p>
                
                {/* Custom Circular Progress */}
                <div className="relative w-40 h-40 mx-auto mb-6">
                  <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 42 42">
                    <circle
                      cx="21"
                      cy="21"
                      r="18"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <circle
                      cx="21"
                      cy="21"
                      r="18"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeDasharray={`${10 * 1.13} ${100 * 1.13}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-orange-500">10%</div>
                    <div className="text-sm text-orange-500 font-medium">Stalls</div>
                    <div className="text-sm text-orange-500 font-medium">Booked</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="text-left">
                    <div className="text-4xl font-bold text-orange-500">20</div>
                    <div className="text-xs text-gray-500">Till 12/06/2025</div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-gray-900">200</div>
                    <div className="text-xs text-gray-500">Due 12/08/2025</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Insight */}
          <Card className="relative bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  PAYMENT INSIGHT
                </CardTitle>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="bg-orange-50 rounded-full w-56 h-56 mx-auto flex items-center justify-center mb-4 relative">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-3">Till Today</p>
                    <div className="text-4xl font-bold text-orange-500 mb-2">₹2,00,000</div>
                    <p className="text-sm text-gray-600 mb-4">Received payment</p>
                    <div className="border-t pt-3">
                      <p className="text-xs text-gray-500">out of</p>
                      <p className="text-xl font-bold text-gray-900">₹3,00,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enquiry Insight */}
          <Card className="relative bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  ENQUIRY INSIGHT
                </CardTitle>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-orange-500 mb-2">200</div>
                <p className="text-sm text-gray-600">enquiries</p>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={enquiryData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#f97316" 
                      strokeWidth={3}
                      dot={false}
                    />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <YAxis hide />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Chart */}
        <Card className="relative bg-white shadow-sm border border-gray-200">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                STALL BOOKING OVERVIEW
              </CardTitle>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-8 mb-6">
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
            
            {/* Lead Summary Box */}
            <div className="absolute top-20 right-6 bg-white rounded-lg shadow-md border p-4 z-10">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="font-medium">Active</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="font-medium">Booked</span>
                  <span className="font-bold">34</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="font-medium">Not Interested</span>
                  <span className="font-bold">24</span>
                </div>
              </div>
            </div>

            <div className="h-96 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stallBookingData}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6b7280' }}
                  />
                  <YAxis hide />
                  <Area
                    type="monotone"
                    dataKey="active"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#93c5fd"
                    fillOpacity={0.7}
                  />
                  <Area
                    type="monotone"
                    dataKey="notInterested"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#fca5a5"
                    fillOpacity={0.7}
                  />
                  <Area
                    type="monotone"
                    dataKey="booked"
                    stackId="1"
                    stroke="#22c55e"
                    fill="#86efac"
                    fillOpacity={0.7}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JewelleryExpoDashboard;