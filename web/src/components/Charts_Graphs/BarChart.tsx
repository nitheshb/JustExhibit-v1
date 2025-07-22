import React, { useState } from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts'

const data = [
  { name: 'Fashion', value: 570 },
  { name: 'Accessories', value: 237 },
  { name: 'Art Supplies', value: 73 },
  { name: 'Digital', value: 209 },
  { name: 'Technology', value: 214 },
]

const DROPDOWN_OPTIONS = ['Palace Ground', 'Option 2', 'Option 3']

// Custom label renderer for right-aligned bar values
const CustomBarLabel = (props) => {
  const { x, y, width, value } = props
  return (
    <text
      x={x + width + 8}
      y={y + 12}
      textAnchor="start"
      style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: 12,
        lineHeight: '100%',
        letterSpacing: 0,
        fill: '#85878D',
      }}
    >
      {value}
    </text>
  )
}

export const VisitSourceChart = () => {
  const [selected, setSelected] = useState(DROPDOWN_OPTIONS[0])
  return (
    <div className="w-full h-full flex flex-col bg-white  border-[#e5e7eb] rounded-[14px] p-5">
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
            Visit Source
          </h2>
          <div
            className=""
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 500,
              fontSize: 21,
              lineHeight: '100%',
              color: '#0D0A1E',
              marginTop: 2,
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
          <BarChart
            data={data}
            layout="vertical"
            barCategoryGap={16}
            margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />
            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 12,
                fill: '#85878D',
              }}
            />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              width={110}
              tick={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                fontSize: 12,
                fill: '#1A1A1A',
              }}
            />
            <Tooltip
              cursor={{ fill: '#f9fafb' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-white p-2 shadow-sm">
                      <p className="font-semibold">{`${payload[0].payload.name}: ${payload[0].value}`}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="value" fill="#F8886A" radius={5} barSize={25}>
              <LabelList dataKey="value" content={CustomBarLabel} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
