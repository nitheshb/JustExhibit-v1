import React from 'react'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

import { ChartTooltip, ChartTooltipContent } from './ui/charts'

const data = [
  { name: 'Mon', 'Hall-1': 75, 'Hall-2': 30 },
  { name: 'Tue', 'Hall-1': 80, 'Hall-2': 40 },
  { name: 'Wed', 'Hall-1': 60, 'Hall-2': 25 },
  { name: 'Thu', 'Hall-1': 45, 'Hall-2': 35 },
  { name: 'Fri', 'Hall-1': 55, 'Hall-2': 28 },
  { name: 'Sat', 'Hall-1': 65, 'Hall-2': 32 },
  { name: 'Sun', 'Hall-1': 50, 'Hall-2': 25 },
]

// Define colors based on Figma specs
const hall1Color = '#FCC8BA' // Lighter color for the top area
const hall2Color = '#F6714D' // Darker color for the bottom area

const AttendanceChart = () => {
  return (
    <div className="h-full w-full flex flex-col p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2
          className="tracking-[2px] uppercase"
          style={{
            fontFamily: 'var(--font-heading, Inter, serif)',
            fontWeight: 700,
            fontSize: 16,
            color: '#0D0A1E',
          }}
        >
          Attendance
        </h2>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: hall1Color }}
            ></span>
            <span
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                color: '#222F36',
              }}
            >
              Hall 1
            </span>
          </span>
          <span className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: hall2Color }}
            ></span>
            <span
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                color: '#222F36',
              }}
            >
              Hall 2
            </span>
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 -ml-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ top: 5, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#F3F3F3"
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 12,
                fill: '#60646C',
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              ticks={[0, 25, 50, 75, 100]}
              tick={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 12,
                fill: '#60646C',
              }}
            />
            <Tooltip
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
                              background: entry.color,
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
            <defs>
              <linearGradient id="fillHall1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={hall1Color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={hall1Color} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillHall2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={hall2Color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={hall2Color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="Hall-1"
              type="monotone"
              fill="url(#fillHall1)"
              stroke={hall1Color}
              strokeWidth={2}
            />
            <Area
              dataKey="Hall-2"
              type="monotone"
              fill="url(#fillHall2)"
              stroke={hall2Color}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AttendanceChart
