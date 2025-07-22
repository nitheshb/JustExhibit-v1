'use client'

import React, { useState } from 'react'

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from 'recharts'

const DROPDOWN_OPTIONS = ['Palace Ground', 'Option 2', 'Option 3']

const chartData = [
  { name: 'Source 1', value: 60, top: 20 },
  { name: 'Source 2', value: 40, top: 20 },
  { name: 'Source 3', value: 50, top: 20 },
]

const valueColors = [
  'var(--Primary-Primary-400, #F6714D)',
  'var(--Primary-Primary-300, #F8886A)',
  'var(--Primary-Primary-100, #FCC8BA)',
]

export default function StackedVisitSourceChart() {
  const [selected, setSelected] = useState(DROPDOWN_OPTIONS[0])

  return (
    <div className="bg-white rounded-xl p-6 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
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
          <div className="mt-1 text-[21px] font-medium text-[#0D0A1E] leading-none">
            ₹2,132
          </div>
        </div>

        <select
          className="border border-gray-200 rounded px-3 py-1 text-sm focus:outline-none"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {DROPDOWN_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barCategoryGap={40}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="6 6"
              vertical={false}
              stroke="#E5E5E5"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={false}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#B0B0B0', fontWeight: 500, fontSize: 14 }}
              domain={[0, 80]}
              ticks={[0, 20, 40, 60, 80]}
              tickFormatter={(v) => `${v} Hr`}
            />
            <Tooltip
              cursor={false}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div
                      style={{
                        background: 'white',
                        border: '1px solid #eee',
                        borderRadius: 8,
                        padding: 8,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 14,
                      }}
                    >
                      {payload.map((entry) => (
                        <div
                          key={entry.dataKey}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 4,
                          }}
                        >
                          <span
                            style={{
                              display: 'inline-block',
                              width: 16,
                              height: 16,
                              borderRadius: 4,
                              background:
                                entry.dataKey === 'top'
                                  ? '#F3F3F3'
                                  : valueColors[
                                      chartData.findIndex(
                                        (d) => d.name === entry.payload.name
                                      )
                                    ],
                              marginRight: 8,
                            }}
                          />
                          <span
                            style={{
                              fontWeight: 600,
                              color: '#222F36',
                              minWidth: 70,
                            }}
                          >
                            {entry.name}
                          </span>
                          <span style={{ marginLeft: 8, color: '#222F36' }}>
                            {entry.value !== undefined
                              ? entry.value.toLocaleString()
                              : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
            {/* Orange bars */}
            <Bar
              dataKey="value"
              stackId="a"
              barSize={40}
              radius={[0, 0, 10, 10]}
            >
              <Cell fill="var(--Primary-Primary-400, #F6714D)" />
              <Cell fill="var(--Primary-Primary-300, #F8886A)" />
              <Cell fill="var(--Primary-Primary-100, #FCC8BA)" />
            </Bar>

            {/* Top gray bars */}
            <Bar
              dataKey="top"
              stackId="a"
              barSize={40}
              fill="#F3F3F3"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
