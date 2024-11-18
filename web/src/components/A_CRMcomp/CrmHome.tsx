import { useEffect, useState } from 'react'
import { Search, Bell, Plus, Filter, ArrowRight } from 'lucide-react';
import { CleaningServicesRounded } from '@mui/icons-material'
import { TabList } from '@mui/lab'
import { Box, Card, Grid, styled } from '@mui/material'
import { yearsToMonths } from 'date-fns'
// import LLeadsTableBody from '../LLeadsTableBody/LLeadsTableBody'
import { useTranslation } from 'react-i18next' // styled components

// import uniqueId from '../../util/generatedId'
import {
  getCRMdocById1,
  getCRMTeamTasks,
  getLeadbyId1,
  getTodayTodoLeadsData,
  getTodayTodoLeadsDataByUser,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import uniqueId from 'src/util/generatedId'

import TodayLeadsActivitySearchView from '../TodayLeadsActivitySearchView'

const rowsCounter = (parent, searchKey) => {
  return parent.filter((item) => {
    if (searchKey === 'all') {
      return item
    } else if (item.Status.toLowerCase() === searchKey.toLowerCase()) {
      console.log('All1', item)
      return item
    }
  })
}

const CrmHome = ({ setisImportLeadsOpen, selUserProfileF, taskType }) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { t } = useTranslation()
  const { user } = useAuth()
  const { orgId } = user
  const [value, setValue] = useState('new')
  const [tableData, setTableData] = useState([])
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [todaySchL, setTodaySchL] = useState([])
  const [searchKey, setSearchKey] = useState(['pending'])
  const [schLoading, setSchLoading] = useState(true)

  useEffect(() => {
    console.log('check if this is loading on new page check', user?.uid)
    getLeadsDataFun()
  }, [taskType, user])

  const getLeadsDataFun = async () => {
    const uid = user?.uid
    const { orgId } = user
    if (uid) {
      const torrowDate = new Date(
        +new Date().setHours(0, 0, 0, 0) + 86400000
      ).getTime()

      console.log('what is thes ==> ', taskType)
      if (true) {
        setSchLoading(false)
        console.log('torw date', torrowDate)
        try {
          const todoData = await getCRMTeamTasks(
            orgId,
            (querySnapshot) => {
              let pro
              let y = []
              setTodaySchL([])
              console.log('git values is 0', querySnapshot.docs[0].id)
              const projects = querySnapshot.docs.map(async (docSnapshot) => {
                const x = docSnapshot.data()
                const { staDA } = x
                y = staDA
                if (y.length > 0) {
                  x.uid = docSnapshot.id
                  // eslint-disable-next-line prefer-const
                  let y1 = await getCRMdocById1(orgId, x.uid)
                  console.log('fetched customer doc is ', y1, x.uid)
                  x.leadUser = await y1
                  return x
                } else {
                  setSchLoading(false)
                  return 'remove'
                }
              })

              //  get the task details from docid
              if (projects.length > 0) {
                console.log(
                  'my values are ',
                  projects.filter((data) => data != 'remove')
                )
                projects.filter((data) => data != undefined)
                Promise.all(projects).then(function (results) {
                  console.log(
                    'my values are ',
                    results.filter((data) => data != 'remove')
                  )
                  results.filter((data) => data != 'remove')
                  setTodaySchL(results.filter((data) => data != 'remove'))
                  setSchLoading(false)
                })
              } else {
                setSchLoading(false)
                console.log('my values are 1 ', projects)
              }
            },
            { type: 'upcoming' },
            () => {
              console.log('error')
            }
          )
        } catch (error) {
          setSchLoading(false)
        }
        // await console.log('what are we', todoData)
      } else {
        console.log('git values is 1', taskType)
        setSchLoading(true)
        const todoData = await getTodayTodoLeadsDataByUser(
          orgId,
          (querySnapshot) => {
            let pro
            let y = []
            setTodaySchL([])
            console.log('git values is 2', querySnapshot.docs)
            const projects = querySnapshot.docs.map(async (docSnapshot) => {
              const x = docSnapshot.data()
              console.log('git values is 2', x)
              const { staDA } = x
              y = staDA
              // if (taskType === 'Today1') {

              //   console.log('git values is ', staDA)
              //   y = staDA
              // } else {
              //   y = staDA.filter((da) => x[da]['schTime'] > torrowDate)
              // }
              if (y.length > 0) {
                x.uid = docSnapshot.id
                // eslint-disable-next-line prefer-const
                let y1 = await getLeadbyId1(orgId, x.uid)
                await console.log('fetched value is ', x, y)
                x.leadUser = await y1
                return x
              } else {
                setSchLoading(false)

                return
                // return 'remove'
              }
            })
            //  get the task details from docid
            if (projects.length > 0) {
              // projects.filter((data) => data != undefined)
              Promise.all(projects).then(function (results) {
                console.log(
                  'my values are ',
                  results.filter((data) => data != 'remove')
                )
                results.filter((data) => data != 'remove')

                setTodaySchL(results.filter((data) => data != 'remove'))
                console.log(
                  'fetched values is',
                  results.filter((data) => data != 'remove')
                )
                setSchLoading(false)
              })
            } else {
              setSchLoading(false)
              console.log('my values are 1 ', projects)
            }
          },
          { uid: uid, type: 'today' },
          () => {
            console.log('error')
          }
        )
        await console.log('what are we', todoData)
      }
    }
  }

  useEffect(() => {
    // getValueByIdFun()
  }, [todaySchL])

  const filterTable = tableData.filter((item) =>
    value !== '' ? item.role.toLowerCase() === value : item.role
  )
  return (
    <div className="flex  flex-row mt-1  text-gray-700">
      <div className="flex-1  overflow-auto">
        <div className='p-6 bg-[#F9FAFB] rounded-xl'>
          {/* <TodayLeadsActivitySearchView
            moduleName={"Stalls"}
            data={filterTable}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            handleDelete={{}}
            selStatus={value}
            todaySch={todaySchL}
            schLoading={schLoading}
            rowsParent={leadsFetchedData}
            selUserProfileF={selUserProfileF}
            taskType={taskType}
          /> */}

<div className="mb-8">
          <div className="flex items-center justify-between mb-">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-2">
              {/* <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                <Filter size={16} />
                Filters
              </button> */}
              <button className="px-4 py-2 bg-black text-white rounded-lg">
                Add Widget
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-xs">Track your sales and performance of your strategy</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Stalls"
            value="100"
            subtext="2 Halls"
            change=""
            changeType="positive"
          />
          <StatCard
            title="Sales"
            value="₹27,064"
            subtext="vs last month"
            change="+2.4%"
            changeType="positive"
          />
          <StatCard
            title="Enquiries"
            value="600"
            subtext="Conversion"
            change="20%"
            changeType="positive"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 ">
            <section className='rounded-xl bg-white p-6 mb-8'>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-600 text-sm flex items-center gap-1">
                Meetings
                {/* <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-xs">?</span> */}
              </h3>
              <div className="flex items-center gap-4">
                <select className="px-4 py-2 rounded-lg border border-gray-200">
                  <option>This year</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200">
                  <Filter size={16} />
                  Filters
                </button>
              </div>
            </div>
            <VisitsCard />

            </section>
              <section className='rounded-xl bg-white p-6'>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-gray-600 text-sm flex items-center gap-1">
                Stall Bookings
                {/* <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-xs">?</span> */}
              </h3>
              <div className="flex items-center gap-4">
                <select className="px-4 py-2 rounded-lg border border-gray-200">
                  <option>This year</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200">
                  <Filter size={16} />
                  Filters
                </button>
              </div>
            </div>
            <AnalyticsChart />
            </section>
          </div>

          <div className="space-y-6">
            <StatCard
              title="Sales Performance"
              value="17.9%"
              subtext="Since yesterday"
              change="+4.3%"
              changeType="positive"
            />
            <VisitsCard />
            <TopProducts />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default CrmHome



interface StatCardProps {
  title: string;
  value: string;
  subtext: string;
  change: string;
  changeType: 'positive' | 'negative';
  chart?: React.ReactNode;
}

export function StatCard({ title, value, subtext, change, changeType, chart }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm flex items-center gap-1">
          {title}
          {/* <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-xs">?</span> */}
        </h3>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">{value}</h2>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            {subtext}
            <span className={`${
              changeType === 'positive' ? 'text-green-500' : 'text-red-500'
            }`}>
              {change}
            </span>
          </p>
        </div>
        {chart}
      </div>

      <button className="mt-4 text-sm text-gray-600 flex items-center gap-1 hover:text-gray-800">
        See Details
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
export  function AnalyticsChart() {
  // Simplified chart implementation
  return (
    <div className="w-full h-64 mt-4">
      <div className="relative h-full">
        {/* Chart background */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 to-transparent rounded-lg" />

        {/* Chart line */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full h-1/2 bg-orange-500/20 rounded-lg relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500" />

            {/* Data points */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 w-2 h-2 bg-orange-500 rounded-full"
                style={{
                  left: `${(i * 100) / 7}%`,
                  bottom: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



const days = ['Hall-1', 'Hall-2' ];
const hours = Array.from({ length: 25 }, (_, i) => i);
const hours1 = Array.from({ length: 100 }, (_, i) => i);


// Generate sample data
const generateHeatmapData = () => {
  return days.map(() =>
    hours.map(() => Math.floor(Math.random() * 5))
  );
};

export  function VisitsCard() {
  const data = generateHeatmapData();

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-gray-600 text-sm flex items-center gap-1">
            Total visits by hourly
            <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-xs">?</span>
          </h3>
        </div>
        <button className="text-sm text-orange-500 flex items-center gap-1 hover:text-orange-600">
          See Details
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-1">
        {hours1.map((value, index) => (
          <div
            key={index}
            className={`aspect-square rounded transition-colors ${
              value === 0
                ? 'bg-gray-50'
                : value === 1
                ? 'bg-orange-100'
                : value === 2
                ? 'bg-orange-200'
                : value === 3
                ? 'bg-orange-300'
                : 'bg-orange-400'
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="text-2xl font-semibold">288,822</div>
        <span className="text-green-500 text-sm">+3.5%</span>
      </div>

      <div className="relative overflow-x-auto">
        <div className="flex text-xs text-gray-400 mb-2">
          {days.map((day) => (
            <div key={day} className="flex-1 text-center">{day}</div>
          ))}
        </div>

        <div className="relative">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="flex mb-1">
              {row.map((value, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex-1 aspect-square m-0.5 rounded ${
                    value === 0
                      ? 'bg-gray-50'
                      : value === 1
                      ? 'bg-orange-100'
                      : value === 2
                      ? 'bg-orange-200'
                      : value === 3
                      ? 'bg-orange-300'
                      : 'bg-orange-400'
                  }`}
                />
              ))}
            </div>
          ))}

          {/* Highlight overlay */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[calc(100%/7-2px)] h-full bg-orange-500/10 rounded border border-orange-500" />
        </div>

        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>1-30</span>
          <span>12:00 PM</span>
          <span>11:59 PM</span>
        </div>
      </div>
    </div>
  );
}



const products = [
  {
    id: 'SKF533',
    name: 'Bird Shorts',
    category: 'Summer Knits',
    sales: 197,
    revenue: '$1,890',
    stock: 120,
    status: 'In stock'
  },
  {
    id: 'SKF534',
    name: 'T-Shirts, Max',
    category: 'Summer Knits',
    sales: 540,
    revenue: '$2,889',
    stock: 100,
    status: 'Out of stock'
  }
];

export  function TopProducts() {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-gray-600 text-sm flex items-center gap-1">
            Bookings
            {/* <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-xs">?</span> */}
          </h3>
        </div>
        <button className="text-sm text-orange-500 flex items-center gap-1 hover:text-orange-600">
          See Details
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-100">
              <th className="text-left font-normal pb-3">Company name</th>
              <th className="text-left font-normal pb-3">Stall No</th>
              <th className="text-left font-normal pb-3">Cost</th>
              <th className="text-left font-normal pb-3">Balance</th>
              <th className="text-left font-normal pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className="text-sm border-b border-gray-50 last:border-0">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-orange-500">🛍️</span>
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <span>{product.sales}</span>
                    <span className="text-xs text-gray-500">pcs</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <span>{product.revenue}</span>
                    <span className="text-xs text-gray-500">USD</span>
                  </div>
                </td>
                <td className="py-3">
                  <div className="flex flex-col">
                    <span>{product.stock}</span>
                    <span className="text-xs text-gray-500">pcs</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    product.status === 'In stock'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-red-50 text-red-600'
                  }`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
