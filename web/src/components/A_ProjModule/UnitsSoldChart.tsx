import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const UnitsSoldChart = () => {
    const data = [
        { name: 'Jan', value: 315 },
        { name: 'Feb', value: 285 },
        { name: 'Mar', value: 320 },
        { name: 'Apr', value: 300 },
        { name: 'May', value: 330 },
        { name: 'Jun', value: 310 },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Units Sold</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-500">Total</p>
                    <h3 className="text-2xl font-bold">₹199.98</h3>
                </div>
                <div>
                    <p className="text-gray-500">Orders</p>
                    <h3 className="text-2xl font-bold">2</h3>
                </div>
            </div>
            <div className="mt-4">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default   UnitsSoldChart;