import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Rectangle,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts'
import { steamLeadsVsSources } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { getLastFourMonths } from 'src/util/getLast6Months'

const data1 = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
]
const RoundedBar = (props) => {
  const { x, y, width, height, fill } = props

  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      radius={[10, 10, 0, 0]}
    />
  )
}
const CustomBarLabel = ({ x, y, value }) => (
  <text x={x} y={y} fill="#666" textAnchor="right" dy={-6} dx={10}>
    {/* {value} */}
  </text>
)

const StackedBarChart = () => {
  const { user } = useAuth()
  const { orgId } = user
  const [sourceLeads, setSourceLeads] = useState([])
  useEffect(() => {
    getLeadsSourcesDb()
  }, [])

  const getLeadsSourcesDb = async () => {
    const data = await steamLeadsVsSources(
      orgId,
      (doc) => {
        const leadsList = doc.data()
        const leadsListA = []
        console.log('my total fetched list is 3', leadsList)
        Object.entries(leadsList).forEach((entry) => {
          const [key, value] = entry
          leadsListA.push(value)
          console.log('my total fetched list is 3', `${key}: ${value}`)
        })
        setSourceLeads(leadsListA)
      },
      {
        uid: '',
      },
      (error) => setSourceLeads([])
    )
    const timestamp = 1710873000000
    const lastFourMonths = getLastFourMonths(data, timestamp)
    console.log(lastFourMonths)
    setSourceLeads(lastFourMonths)
    console.log('mydata is', data)
  }
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
              <div className="w-3 h-3 mt-2 mr-3 rounded-full bg-[#8884d8]">
                {' '}
              </div>{' '}
              <div>{`Total Leads: ${payload[5].value}`}</div>
            </div>
            <div className="flex flex-row">
              <div className="w-3 h-3 mt-2 mr-3 rounded-full bg-[#2562EB]">
                {' '}
              </div>{' '}
              <div>{`Booked: ${payload[1].value}`}</div>
            </div>{' '}
            <div className="flex flex-row">
              <div className="w-3 h-3 mt-2 mr-3 rounded-full bg-[#E1D9F7]">
                {' '}
              </div>{' '}
              <div>{`InProgress: ${payload[0].value}`}</div>
            </div>
            <div className="flex flex-row">
              <div className="w-3 h-3 mt-2 mr-3 rounded-full bg-[#8884d8]">
                {' '}
              </div>{' '}
              <div>{`Junk: ${payload[2].value}`}</div>
            </div>
            <div className="flex flex-row">
              <div className="w-3 h-3 mt-2 mr-3 rounded-full bg-[#D2F2FA]">
                {' '}
              </div>{' '}
              <div>{`NotInterested: ${payload[3].value}`}</div>
            </div>
            <div className="flex flex-row">
              <div className="w-3 h-3 mt-2 mr-3 rounded-full bg-[#F7F6B9]">
                {' '}
              </div>{' '}
              <div>{`Revisited: ${payload[4].value}`}</div>
            </div>
          </section>
        </div>
      )
    }

    return null
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={sourceLeads}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          axisLine={{ stroke: 'transparent' }}
          tickLine={false}
          tick={{ fill: '#9ca3af' }}
        />
        <YAxis
          axisLine={{ stroke: 'transparent' }}
          tickLine={false}
          tick={{ fill: '#9ca3af' }}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend icon={null} /> */}
        <Bar dataKey="counts" fill="#DCE0FE" shape={<RoundedBar />}>
          <LabelList dataKey="counts" content={<CustomBarLabel />} />
        </Bar>
        <Bar
          dataKey="InBooked"
          stackId="a"
          fill="#2562EB"
          shape={<RoundedBar />}
        >
          <LabelList dataKey="InBooked" content={<CustomBarLabel />} />
        </Bar>
        <Bar dataKey="InProgress" stackId="a" fill="#E1D9F7">
          <LabelList dataKey="InProgress" content={<CustomBarLabel />} />
        </Bar>
        <Bar dataKey="InJunk" stackId="a" fill="#E1D9F7">
          <LabelList dataKey="InJunk" content={<CustomBarLabel />} />
        </Bar>
        <Bar dataKey="InNotInterested" stackId="a" fill="#D2F2FA">
          <LabelList dataKey="InNotInterested" content={<CustomBarLabel />} />
        </Bar>
        <Bar
          dataKey="revisited"
          stackId="a"
          fill="#F7F6B9"
          shape={<RoundedBar />}
        >
          <LabelList dataKey="revisited" content={<CustomBarLabel />} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StackedBarChart
