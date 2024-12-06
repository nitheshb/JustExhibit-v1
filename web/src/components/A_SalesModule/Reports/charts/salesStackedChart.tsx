import React from 'react'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Apr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'May',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'June',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'July',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip bg-[#fff] py-[4px] shadow  rounded-lg border-[#90a4ae] text-[#373d3f] w-full  flex flex-col">
        <div className="label border-b border-[#90a4ae] ">
          <div className="px-[10px] flex flex-row justify-between ">
            <div>Month:</div>
            <div>{` ${label}`}</div>
          </div>
        </div>

        <section className="px-[10px] py-2">
          <div className="flex flex-row">
            <div className="w-3 h-3 mt-2 mr-3 rounded-full bg-[#8884d8]"> </div>{' '}
            <div>{`UV: ${payload[0].value}`}</div>
          </div>{' '}
          <div className="flex flex-row">
            <div className="w-3 h-3 mt-2 mr-3 rounded-full bg-[#8884d8]"> </div>{' '}
            <div>{`PV: ${payload[1].value}`}</div>
          </div>
        </section>
      </div>
    )
  }

  return null
}
const StackedLeadsChart = () => {
  return (
    <ResponsiveContainer width="100%" height="90%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          axisLine={{ stroke: 'transparent' }}
          tickLine={false}
          tick={{ fill: '#9ca3af' }}

        />
        <YAxis axisLine={{ stroke: 'transparent' }} tickLine={false}   tick={{ fill: '#9ca3af' }} />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="linear"
          dataKey="uv"
          stackId="1"
          stroke="#2563eb"
          fill="#b9ccf7"
          // stroke="#22D3EE"
          // fill="#a5f3ff"
          strokeWidth={2}

        />
        <Area
          type="linear"
          dataKey="pv"
          stackId="1"
          stroke="#9333EA"
          fill="#D2CBFA"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default StackedLeadsChart
