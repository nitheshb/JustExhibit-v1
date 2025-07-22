import React, { useState } from 'react'

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from 'recharts'

const data = [
  { name: "Instagram Ad's", value: 9 },
  { name: 'Hoardings', value: 17 },
  { name: 'Google Adwords', value: 12 },
  { name: 'Others', value: 5 },
]

const DROPDOWN_OPTIONS = ['Palace Ground', 'Option 2', 'Option 3']

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
    )
  }
  return null
}

const SalesLineChart = () => {
  const [selected, setSelected] = useState(DROPDOWN_OPTIONS[0])
  return (
    <div className="w-full h-full flex flex-col bg-white border-[#e5e7eb] rounded-[14px] p-5">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2
            className="tracking-[2px] uppercase"
            style={{
              fontFamily: 'var(--font-heading, Inter, serif)',
              fontWeight: 700,
              fontSize: 16,
              lineHeight: '24px',
              color: '#0D0A1E',
              marginBottom: 0,
            }}
          >
            Visit Source*
          </h2>
          <div
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 500,
              fontSize: 21,
              lineHeight: '100%',
              color: '#0D0A1E',
              marginTop: 2,
              textAlign: 'left',
            }}
          >
            ₹2,132
          </div>
        </div>
        <select
          className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none"
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 500,
            fontSize: 12,
            color: '#333333',
            background: 'white',
          }}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {DROPDOWN_OPTIONS.map((opt) => (
            <option key={opt} value={opt} style={{ color: '#333333' }}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 w-full flex items-center">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 500,
                fontSize: 12,
                fill: '#999999',
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                fill: '#999999',
              }}
              tickFormatter={(v) => `₹${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              fill="#F8886A"
              radius={4}
              barSize={48}
              name="Orders"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SalesLineChart
