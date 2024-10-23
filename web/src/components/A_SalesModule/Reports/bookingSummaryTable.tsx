/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react'

import { X, Add, Remove } from '@mui/icons-material'
import { endOfMonth } from 'date-fns/esm'

import TableSkeleton from 'src/components/A_CrmModule/Reports/_mock/comps/table/table-skeleton'
import ReportSideWindow from 'src/components/SiderForm/ReportSideView'
import {
  getAllProjectMonthlyBookingsSum,
  greProjectBookingsSum,
  gretProjectionSum,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import SkeletonLoaderPage from 'src/pages/SkeletonLoader/skeletonLoaderPage'

import BookingsMonthlyStackedChart from './charts/bookingsMonthlyStackedChart'

const capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase())
}

const getDateForWeek = (weekNumber) => {
  const today = new Date()
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const firstDayOfWeek = new Date(firstDayOfMonth)
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() + (weekNumber - 1) * 7)

  const day = String(firstDayOfWeek.getDate()).padStart(2, '0')
  const month = String(firstDayOfWeek.getMonth() + 1).padStart(2, '0')
  const year = firstDayOfWeek.getFullYear()

  return `${day}-${month}-${year}`
}

const getNextMonths = (startMonthOffset, monthCount) => {
  const months = []
  const today = new Date()
  today.setMonth(today.getMonth() + startMonthOffset)

  for (let i = 0; i < monthCount; i++) {
    const month = today.toLocaleString('default', { month: 'short' })
    const year = today.getFullYear()
    const startOfMonth = new Date(year, today.getMonth(), 1).getTime()
    const endOfMonth = new Date(
      year,
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    ).getTime()
    months.push({
      name: `${month} ${year}`,
      count: today.getMonth() + 1,
      startOfMonth: Number(startOfMonth),
      endOfMonth: Number(endOfMonth),
      currentYear: year,
    })
    today.setMonth(today.getMonth() + 1)
  }
  console.log('month is', months, startMonthOffset, monthCount)
  return months
}

const reportData = [
  {
    id: 1,
    eventName: 'Eco stone',
    soldUnits: 3,
    totalAmount: 1001010,
    monthly: {
      april: 25000,
      may: 25000,
      june: 10925500,
    },
    weekly: {
      week1: 5000,
      week2: 6000,
      week3: 7000,
      week4: 8000,
      week5: 9000,
    },
    oldDue: 150000,
  },
  {
    id: 2,
    eventName: 'green gardens',
    soldUnits: 5,
    totalAmount: 2002020,
    monthly: {
      april: 35000,
      may: 45000,
      june: 11925500,
    },
    weekly: {
      week1: 7000,
      week2: 8000,
      week3: 9000,
      week4: 10000,
      week5: 11000,
    },
    oldDue: 200000,
  },
]

const ProjectBookingSummaryTable = ({ projects }) => {
  const { user } = useAuth()
  const { orgId } = user

  const [filter, setFilter] = useState('')
  const [dataView, setDataView] = useState('monthly')
  const [monthCount, setMonthCount] = useState(5)
  const [startMonthOffset, setStartMonthOffset] = useState(-4)
  const [monthsA, setMonthsA] = useState(
    getNextMonths(startMonthOffset, monthCount)
  )
  const [projectAValues, setProjectWithValues] = useState([])

  const [isOpenSideForm, setReportSideForm] = useState(false)
  const [drillDownPayload, setDrillDownPayload] = useState([])
  const [subTitle, setSubTitle] = useState('false')
  const [loader, setLoaderIcon] = useState(false)

  useEffect(() => {
    setMonthsA(getNextMonths(startMonthOffset, monthCount))
  }, [monthCount, startMonthOffset])

  useEffect(() => {
    calMonthlyProjectBookings(projects)
    // calMonthlyOverallBookings()
  }, [projects, monthsA])

  const handleIncreaseMonth = () => {
    setMonthCount((prevCount) => prevCount + 1)
  }

  const handleDecreaseMonth = () => {
    setStartMonthOffset((prevOffset) => prevOffset - 1)
    setMonthCount((prevCount) => prevCount + 1);

  }

  const filteredData = reportData.filter((item) => {
    return (
      (!filter || item.soldUnits === parseInt(filter)) &&
      (dataView === 'monthly' || dataView === 'weekly')
    )
  })

  const handleChangeView = (view) => {
    setDataView(view)
  }
  const showDrillDownFun = async (text, data) => {
    // Display sideForm
    setReportSideForm(true)
    setDrillDownPayload(data)
    setSubTitle(text)
  }
  const calculateTotal = (data, key) => {
    return data.reduce((acc, item) => {
      return acc + (item[key] || 0)
    }, 0)
  }

  const totalSoldSummary = calculateTotal(projects, 'soldUnitCount')

  const calMonthlyProjectBookings = async (projects) => {
    try {
      setLoaderIcon(true)
      const insideValues = []
      for (const projectData of projects) {
        const newProjectData = { ...projectData }
        const projectMonthArray = []

        await Promise.all(
          monthsA.map(async (month) => {
            const payload = {
              pId: projectData.uid,
              monthNo: month.count,
              startTime: month.startOfMonth,
              endTime: month.endOfMonth,
              currentYear: month.currentYear,
            }

            const totalReceivableValue = await greProjectBookingsSum(
              orgId,
              payload
            )
            const updatedMonth = { ...month, receive: totalReceivableValue }

            projectMonthArray.push(updatedMonth)
          })
        )

        newProjectData.months = projectMonthArray
        newProjectData.totalCount = projectMonthArray?.reduce(
          (accumulator, currentValue) => {
            return accumulator + (currentValue?.receive || 0)
          },
          0
        )
        insideValues.push(newProjectData)
      }

      setProjectWithValues(insideValues)
    } catch (error) {
      console.error('Error calculating monthly values:', error)
    } finally {
      setLoaderIcon(false)
    }
  }

  const calMonthlyValue = (pId, monthNo, currentYear) => {
    const data = { pId, monthNo, currentYear }

    let totalReceivableValue = 0

    gretProjectionSum(orgId, data)
      .then((payload) => {
        totalReceivableValue = payload
        console.log(
          'Total receivable stored in variable:',
          totalReceivableValue
        )
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    return totalReceivableValue
  }

  return (
    <div className="p-4 m-1 border-[#e7e5eb] bg-white rounded-lg">
      <div className="flex justify-between">
        <div className="text-[#1f2937] font-[600] text-xl mb-2 ml-2">
          Event Booking Report
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">

          </label>
          <select
            id="view"
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={dataView}
            onChange={(e) => handleChangeView(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value=''>Anually</option>
            <option value=''>Quarterly</option>
            <option value=''>Halferly</option>
          </select>
        </div> */}

        <div className="flex mb-2 space-x-2">
          <button
            onClick={handleDecreaseMonth}
            className="flex items-center space-x-2  bg-gray-200 text-gray-800 px-4 py-2 rounded"
          >
            <Remove /> <span>Previous Month</span>
          </button>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr
            className={
              dataView === 'monthly'
                ? 'bg-gray-100 text-gray-600 text-sm leading-normal'
                : 'bg-green-200 text-gray-600 text-sm leading-normal'
            }
          >
            <th className="py-3 px-6 text-center" colSpan="1"></th>
            <th className="py-3 px-6 text-center" colSpan="1"></th>
            <th className="py-3 px-6 text-center" colSpan="1"></th>
            {dataView === 'weekly' && (
              <th className="py-3 px-6 text-center border" colSpan="4">
                Weekly
              </th>
            )}
            {dataView === 'monthly' && (
              <th className="py-3 px-6 text-center" colSpan="5">
                Monthly
              </th>
            )}
          </tr>
          <tr className="bg-gray-50   text-gray-600 text-sm leading-normal">
            <th className="py-3 px-6 text-left">Event Name</th>

            <th className="py-3 px-6 text-right w-[100px]">Total Sold</th>
            <th className="py-3  text-right w-[100px]">Stats</th>
            {dataView === 'monthly' ? (
              <>
                {monthsA.map((month, i) => {
                  return (
                    <th key={i} className="py-4 px-6 text-right  w-[100px]">
                      {month?.name}
                    </th>
                  )
                })}
              </>
            ) : (
              <>
                <th className="py-3 px-6 text-right bg-white border-b ">
                  Week 1 <br /> ({getDateForWeek(1)})
                </th>
                <th className="py-3 px-6 text-right bg-white border-b ">
                  Week 2 <br /> ({getDateForWeek(2)})
                </th>
                <th className="py-3 px-6 text-right bg-white border-b ">
                  Week 3 <br /> ({getDateForWeek(3)})
                </th>
                <th className="py-3 px-6 text-right bg-white border-b ">
                  Week 4 <br /> ({getDateForWeek(4)})
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {/* <tr className="bg-gray-100">
            <td
              colSpan={dataView === 'monthly' ? 7 : 6}
              className="border border-black"
            ></td>
          </tr> */}

          {loader && <TableSkeleton rows={3} columns={7} />}
          {projectAValues
            ?.sort((a, b) => {
              return b.totalCount - a.totalCount
            })
            ?.map((data, index) => {
              const monthlyData = data?.monthly
              let totalReceived = 0
              let totalOutstanding = 0
              const week1 = data?.weekly?.week1
              const week2 = data?.weekly?.week2
              const week3 = data?.weekly?.week3
              const week4 = data?.weekly?.week4

              const getMonthlyValues = (data, dataView) => {
                const monthly = data.monthly
                const weekly = data.weekly
                const total = 0
                if (dataView === 'weekly') {
                  return (
                    weekly?.week1 +
                    weekly?.week2 +
                    weekly?.week3 +
                    weekly?.week4
                  )
                } else {
                  return monthly?.april + monthly?.may + monthly?.june
                }
              }

              if (dataView === 'weekly') {
                totalReceived = week1 + week2 + week3 + week4
                totalOutstanding =
                  data?.totalAmount - totalReceived - data?.oldDue
              } else {
                totalReceived = getMonthlyValues(data, 'monthly')
                totalOutstanding =
                  data?.totalAmount - totalReceived - data?.oldDue
              }
              const monthData = () => {
                if (dataView === 'monthly') {
                  return (
                    <>
                      {data?.months?.map((month, i) => {
                        return (
                          <td
                            key={i}
                            className="py-3 px-6 text-right font-medium text-gray-900"
                            onClick={() =>
                              showDrillDownFun('Bookings', {
                                uid: data.uid,
                                months: data?.months,
                                thisMonth: month,
                              })
                            }
                          >
                            {`${month?.receive?.toLocaleString('en-IN')}`}
                          </td>
                        )
                      })}
                    </>
                  )
                } else {
                  return (
                    <>
                      <td className="py-3 px-6 text-right bg-white border-b">
                        {data?.weekly?.week1.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-6 text-right bg-white border-b">
                        {data?.weekly?.week2.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-6 text-right bg-white border-b">
                        {data?.weekly?.week3.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-6 text-right bg-white border-b">
                        {data?.weekly?.week4.toLocaleString('en-IN')}
                      </td>
                    </>
                  )
                }
              }

              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap bg-white border-b font-medium text-gray-900">
                    {capitalizeFirstLetter(data?.eventName)}

                  </td>

                  <td
                    className="py-3 px-6  border text-right bg-white border-b font-medium text-gray-900"
                    onClick={() =>{
                      console.log('data is ', data)
                      showDrillDownFun('Bookings', {
                        uid: data.uid,
                        months: data?.months,
                       thisMonth: {
                          startOfMonth: data?.months[0]['startOfMonth'],
                          endOfMonth:
                            data?.months[data?.months.length - 1]['endOfMonth'],
                        },
                      })
                    }
                  }
                  >
                    {data?.totalCount?.toLocaleString('en-IN')}
                  </td>
                  <td className=" pl-2  border text-center bg-white border-b">
                    <section className="w-[100px] h-[30px]">
                      <BookingsMonthlyStackedChart payload={data?.months} />
                    </section>
                  </td>
                  {monthData()}
                </tr>
              )
            })}
        </tbody>
      </table>
      <ReportSideWindow
        open={isOpenSideForm}
        setOpen={setReportSideForm}
        title="Bookings"
        subtitle={subTitle}
        leadsLogsPayload={drillDownPayload}
        widthClass="max-w-5xl"
      />
    </div>
  )
}

export default ProjectBookingSummaryTable
