"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "src/components/ui/card"
import { ChartContainer, ChartLegend, ChartLegendContent } from "src/components/ui/charts"

export const description = "An interactive area chart showing visit metrics"

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-md rounded-md border border-gray-200">
        <p className="font-medium text-gray-700">
          {new Date(label).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}
        </p>
        <div className="mt-2 space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600">
                {entry.name}: <span className="font-medium">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

// Updated data structure with Visit Fixed, Visit Done, Cancelled
const chartData = [
  { date: "2024-04-01", visitFixed: 120, visitDone: 80, cancelled: 20 },
  { date: "2024-04-02", visitFixed: 150, visitDone: 90, cancelled: 15 },
  { date: "2024-04-03", visitFixed: 180, visitDone: 110, cancelled: 25 },
  { date: "2024-04-04", visitFixed: 90, visitDone: 60, cancelled: 10 },
  { date: "2024-04-05", visitFixed: 210, visitDone: 150, cancelled: 30 },
  { date: "2024-04-06", visitFixed: 130, visitDone: 95, cancelled: 18 },
  { date: "2024-04-07", visitFixed: 160, visitDone: 120, cancelled: 22 },
  { date: "2024-04-08", visitFixed: 190, visitDone: 140, cancelled: 25 },
  { date: "2024-04-09", visitFixed: 100, visitDone: 70, cancelled: 15 },
  { date: "2024-04-10", visitFixed: 220, visitDone: 160, cancelled: 35 },
  { date: "2024-04-11", visitFixed: 140, visitDone: 100, cancelled: 20 },
  { date: "2024-04-12", visitFixed: 170, visitDone: 125, cancelled: 22 },
  { date: "2024-04-13", visitFixed: 110, visitDone: 85, cancelled: 12 },
  { date: "2024-04-14", visitFixed: 200, visitDone: 145, cancelled: 30 },
  { date: "2024-04-15", visitFixed: 230, visitDone: 170, cancelled: 40 },
  { date: "2024-04-16", visitFixed: 95, visitDone: 65, cancelled: 15 },
  { date: "2024-04-17", visitFixed: 135, visitDone: 100, cancelled: 18 },
  { date: "2024-04-18", visitFixed: 175, visitDone: 130, cancelled: 25 },
  { date: "2024-04-19", visitFixed: 205, visitDone: 155, cancelled: 30 },
  { date: "2024-04-20", visitFixed: 125, visitDone: 90, cancelled: 20 },
  { date: "2024-04-21", visitFixed: 155, visitDone: 115, cancelled: 25 },
  { date: "2024-04-22", visitFixed: 185, visitDone: 135, cancelled: 30 },
  { date: "2024-04-23", visitFixed: 105, visitDone: 75, cancelled: 15 },
  { date: "2024-04-24", visitFixed: 215, visitDone: 165, cancelled: 35 },
  { date: "2024-04-25", visitFixed: 145, visitDone: 105, cancelled: 20 },
  { date: "2024-04-26", visitFixed: 165, visitDone: 120, cancelled: 25 },
  { date: "2024-04-27", visitFixed: 115, visitDone: 85, cancelled: 15 },
  { date: "2024-04-28", visitFixed: 195, visitDone: 150, cancelled: 30 },
  { date: "2024-04-29", visitFixed: 225, visitDone: 175, cancelled: 40 },
  { date: "2024-04-30", visitFixed: 85, visitDone: 60, cancelled: 10 },
  // May data
  { date: "2024-05-01", visitFixed: 130, visitDone: 95, cancelled: 20 },
  { date: "2024-05-02", visitFixed: 160, visitDone: 120, cancelled: 25 },
  { date: "2024-05-03", visitFixed: 190, visitDone: 140, cancelled: 30 },
  { date: "2024-05-04", visitFixed: 100, visitDone: 70, cancelled: 15 },
  { date: "2024-05-05", visitFixed: 220, visitDone: 170, cancelled: 35 },
  { date: "2024-05-06", visitFixed: 150, visitDone: 110, cancelled: 25 },
  { date: "2024-05-07", visitFixed: 180, visitDone: 135, cancelled: 30 },
  { date: "2024-05-08", visitFixed: 110, visitDone: 80, cancelled: 20 },
  { date: "2024-05-09", visitFixed: 240, visitDone: 190, cancelled: 40 },
  { date: "2024-05-10", visitFixed: 170, visitDone: 130, cancelled: 30 }
];

// Updated chart configuration
const chartConfig = {
  visitFixed: {
    label: "Visit Fixed",
    color: "#3b82f6", // Blue
  },
  visitDone: {
    label: "Visit Done",
    color: "#10b981", // Green
  },
  cancelled: {
    label: "Cancelled",
    color: "#ef4444", // Red
  },
} as const

export default function VisitMetricsChart() {
  const [timeRange, setTimeRange] = React.useState("30d")
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("visitFixed")

  
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-04-10")
    let daysToSubtract = 30
    if (timeRange === "90d") {
      daysToSubtract = 90
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  // Calculate totals
  const total = React.useMemo(
    () => ({
      visitFixed: chartData.reduce((acc, curr) => acc + curr.visitFixed, 0),
      visitDone: chartData.reduce((acc, curr) => acc + curr.visitDone, 0),
      cancelled: chartData.reduce((acc, curr) => acc + curr.cancelled, 0),
    }),
    []
  )

  return (
    <Card className="pt-0 pt-0 border-0 shadow-none">
   

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full border-0"
        >
          <AreaChart data={filteredData}>
            <defs>
              {/* Visit Fixed (Blue) gradient */}
              <linearGradient id="fillVisitFixed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>

              {/* Visit Done (Green) gradient */}
              <linearGradient id="fillVisitDone" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
              </linearGradient>

              {/* Cancelled (Red) gradient */}
              <linearGradient id="fillCancelled" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ stroke: '#ddd', strokeWidth: 1, strokeDasharray: '4 4' }}
            />

            {/* Visit Fixed Area (Blue) */}
            <Area
              name="Visit Fixed"
              dataKey="visitFixed"
              type="natural"
              fill="url(#fillVisitFixed)"
              stroke="#3b82f6"
              strokeWidth={2}
              stackId="stack"
            />

            {/* Visit Done Area (Green) */}
            <Area
              name="Visit Done"
              dataKey="visitDone"
              type="natural"
              fill="url(#fillVisitDone)"
              stroke="#10b981"
              strokeWidth={2}
              stackId="stack"
            />

            {/* Cancelled Area (Red) */}
            <Area
              name="Cancelled"
              dataKey="cancelled"
              type="natural"
              fill="url(#fillCancelled)"
              stroke="#ef4444"
              strokeWidth={2}
              stackId="stack"
            />

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}



