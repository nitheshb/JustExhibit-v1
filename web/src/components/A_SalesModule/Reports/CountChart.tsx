import React from 'react'

import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarRadiusAxis,
  Label,
  Tooltip,
} from 'recharts'

const boys = 1654
const girls = 1654
const totalVisitors = 3308

const chartData = [
  {
    name: 'Visitors',
    boys: (boys / totalVisitors) * 100,
    girls: (girls / totalVisitors) * 100,
  },
]

const CountChart = () => {
  return (
    <div className="flex flex-col w-full h-[400px] justify-between bg-white">
      {/* Header */}
      <div className="pt-5 px-5">
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
          Active
        </h2>
      </div>

      {/* Chart */}
      <div className="flex-1 flex items-center justify-center px-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={0}
            innerRadius="100%" // ← controls thickness
            outerRadius="180%" // ← full width
            barSize={36} // ← THICKNESS of bar
            cy="80%" // ← controls vertical shift
          >
            <PolarRadiusAxis
              type="number"
              domain={[0, 100]}
              tick={false}
              axisLine={false}
            >
              <Label
                position="center"
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    const { cx, cy } = viewBox
                    return (
                      <text x={cx} y={cy - 15} textAnchor="middle">
                        <tspan
                          x={cx}
                          y={cy - 15}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 700,
                            fontSize: '28px',
                            fill: '#1C2024',
                          }}
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={cx}
                          y={cy + 25}
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 400,
                            fontSize: '16px',
                            fill: '#60646C',
                            letterSpacing: 0.5,
                          }}
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                  return null
                }}
              />
            </PolarRadiusAxis>
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
                            {entry.dataKey === 'boys' ? 'Boys' : 'Girls'}
                          </span>
                          <span style={{ marginLeft: 8, color: '#222F36' }}>
                            {entry.value !== undefined
                              ? Math.round(
                                  (Number(entry.value) / 100) * totalVisitors
                                ).toLocaleString()
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
            <RadialBar
              dataKey="boys"
              stackId="a"
              cornerRadius={7}
              fill="#F44D21"
            />
            <RadialBar
              dataKey="girls"
              stackId="a"
              cornerRadius={7}
              fill="#FAAD99"
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend (moved below chart) */}
      <div className="flex justify-center items-center gap-8 pb-2 pt-0">
        <div className="flex flex-col items-center text-center">
          <span
            className="w-3 h-3 rounded-full mb-0"
            style={{ backgroundColor: '#F44D21' }}
          ></span>
          <div
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: 0,
              verticalAlign: 'middle',
              color: '#222F36',
              marginTop: 8,
            }}
          >
            {boys.toLocaleString()}
          </div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#B0B0B0',
              marginTop: 0,
              letterSpacing: 0.2,
            }}
          >
            Boys
          </div>
        </div>

        <div className="h-10 w-px bg-gray-200" />

        <div className="flex flex-col items-center text-center">
          <span
            className="w-3 h-3 rounded-full mb-0"
            style={{ backgroundColor: '#FAAD99' }}
          ></span>
          <div
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '100%',
              letterSpacing: 0,
              verticalAlign: 'middle',
              color: '#222F36',
              marginTop: 8,
            }}
          >
            {girls.toLocaleString()}
          </div>
          <div
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              color: '#B0B0B0',
              marginTop: 0,
              letterSpacing: 0.2,
            }}
          >
            Girls
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountChart
