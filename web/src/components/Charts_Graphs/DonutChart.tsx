import React from 'react'

import { PieChart, Pie, Cell, Label, Sector, Tooltip } from 'recharts'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card'

const data = [
  { name: 'Child Care', value: 40, fill: '#F6714D' },
  { name: 'Parents', value: 20, fill: '#F8886A' },
  { name: 'Kids Under 4', value: 15, fill: '#FAAD99' },
  { name: 'Grandparents', value: 15, fill: '#FCC8BA' },
  { name: 'Owners', value: 10, fill: '#FEEDE9' },
]

export const StatisticsDonutChart = () => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const onPieEnter = (_, index) => setActiveIndex(index)

  return (
    <Card className="w-full h-full flex flex-col rounded-[14px] shadow-sm">
      <CardHeader className="p-5 pb-2">
        <CardTitle
          className="tracking-[2px] uppercase text-left"
          style={{
            fontFamily: 'var(--font-heading, Inter, serif)',
            fontWeight: 700,
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: 2,
            color: '#0D0A1E',
          }}
        >
          Visit Category
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center p-0">
        <PieChart width={320} height={300} className="mx-auto">
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
                            background: entry.payload.fill,
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
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx={160}
            cy={150}
            innerRadius={55}
            outerRadius={120}
            paddingAngle={1}
            stroke="#fff"
            strokeWidth={1.27}
            activeIndex={activeIndex}
            activeShape={({ outerRadius = 0, ...props }) => (
              <g>
                <Sector {...props} outerRadius={outerRadius + 10} />
                <Sector
                  {...props}
                  outerRadius={outerRadius + 25}
                  innerRadius={outerRadius + 12}
                />
              </g>
            )}
            onMouseEnter={onPieEnter}
            isAnimationActive={false}
          >
            <Label
              position="center"
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 700,
                          fontSize: 26,
                          fill: '#1C2024',
                        }}
                      >
                        {total.toLocaleString('en-IN', {
                          maximumFractionDigits: 0,
                        })}
                        k
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          fontSize: 14,
                          fill: '#60646C',
                        }}
                      >
                        Total
                      </tspan>
                    </text>
                  )
                }
              }}
            />
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </CardContent>
      {/* Legend */}
      <CardFooter className="p-4">
        <div className="flex justify-center items-center flex-wrap w-full">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <div className="mx-4 h-4 w-px bg-gray-300" />}
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.fill,
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                  }}
                ></div>
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 500,
                    fontSize: 14,
                    color: '#222F36',
                    lineHeight: '100%',
                  }}
                >
                  {item.name}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}
