import React from 'react'

import Paper from '@material-ui/core/Paper'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import '../../../styles/myStyles.css'

const rows = [
  {
    id: 1,
    date: '2024-03-11',
    status: 'New',
    name: 'John 1',
    mobile: '1234567890',
    email: 'john@example.com',
    project: 'Event A',
    source: 'Referral',
  },
  {
    id: 2,
    date: '2024-03-10',
    status: 'Contacted',
    name: 'Jane Smith',
    mobile: '9876543210',
    email: 'jane@example.com',
    project: 'Event B',
    source: 'Website',
  },
  {
    id: 3,
    date: '2024-03-09',
    status: 'Pending',
    name: 'Alice Johnson',
    mobile: '5556667777',
    email: 'alice@example.com',
    project: 'Event C',
    source: 'Advertisement',
  },
  {
    id: 4,
    date: '2024-03-08',
    status: 'Closed',
    name: 'Bob Brown',
    mobile: '9998887777',
    email: 'bob@example.com',
    project: 'Event D',
    source: 'Social Media',
  },
  {
    id: 5,
    date: '2024-03-07',
    status: 'New',
    name: 'Eva White',
    mobile: '4443332222',
    email: 'eva@example.com',
    project: 'Event E',
    source: 'Referral',
  },
]

const data1 = ['BTC']
const data2 = ['SOL']
const data3 = ['ETH ']
const data4 = ['ADA']
const data5 = ['BHB']
const data6 = ['Highest volume(24h)']

const totalProfit = '98,6543.53'
const profitPercentage = '24.21%'
const performanceText = 'You have a great Performance'
const avgGrowingData = [
  {
    percentage: '2.34%',
    text: 'Booked',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#cfe5eb',
          padding: '8px',
        }}
      >
        <path
          fillRule="evenodd"
          d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm1 5.75A.75.75 0 0 1 5.75 7h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 7.75Zm0 3a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    percentage: '3.45%',
    text: 'Registered',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#e2d9f7',
          padding: '8px',
        }}
      >
        <path
          fillRule="evenodd"
          d="M12 1.69a.494.494 0 0 0-.438-.494 32.352 32.352 0 0 0-7.124 0A.494.494 0 0 0 4 1.689v.567c-.811.104-1.612.24-2.403.406a.75.75 0 0 0-.595.714 4.5 4.5 0 0 0 4.35 4.622A3.99 3.99 0 0 0 7 8.874V10H6a1 1 0 0 0-1 1v2h-.667C3.597 13 3 13.597 3 14.333c0 .368.298.667.667.667h8.666a.667.667 0 0 0 .667-.667c0-.736-.597-1.333-1.333-1.333H11v-2a1 1 0 0 0-1-1H9V8.874a3.99 3.99 0 0 0 1.649-.876 4.5 4.5 0 0 0 4.35-4.622.75.75 0 0 0-.596-.714A30.897 30.897 0 0 0 12 2.256v-.567ZM4 3.768c-.49.066-.976.145-1.458.235a3.004 3.004 0 0 0 1.64 2.192A3.999 3.999 0 0 1 4 5V3.769Zm8 0c.49.066.976.145 1.458.235a3.004 3.004 0 0 1-1.64 2.192C11.936 5.818 12 5.416 12 5V3.769Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    percentage: '1.98%',
    text: 'Resilience index',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#e2d9f7',
          padding: '8px',
        }}
      >
        <path
          fillRule="evenodd"
          d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"
        />
        <path
          fillRule="evenodd"
          d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"
        />
      </svg>
    ),
  },
  {
    percentage: '2.87%',
    text: 'Portfolio score',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="currentColor"
        className="w-4 h-4"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#ffe0bb',
          padding: '8px',
        }}
      >
        <path
          fillRule="evenodd"
          d="M9.808 4.057a.75.75 0 0 1 .92-.527l3.116.849a.75.75 0 0 1 .528.915l-.823 3.121a.75.75 0 0 1-1.45-.382l.337-1.281a23.484 23.484 0 0 0-3.609 3.056.75.75 0 0 1-1.07.01L6 8.06l-3.72 3.72a.75.75 0 1 1-1.06-1.061l4.25-4.25a.75.75 0 0 1 1.06 0l1.756 1.755a25.015 25.015 0 0 1 3.508-2.85l-1.46-.398a.75.75 0 0 1-.526-.92Z"
        />
      </svg>
    ),
  },
]

const CrmSummaryReport = () => {
  return (
    <div className="mx-auto m-2 max-w-screen-2xl">
      <div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-3 grid-flow-row-dense">
          <div className="bg-[#fff] rounded-lg shadow-xl min-h-[340px] min-w-[200px] col-span-2">
            {/* Block 1 */}
            <div className="flex flex-col h-full">
              <div className="card-block1 flex justify-between mb-8">
                <div className="flex-1 mr-4  p-4">
                  <div>
                    <h5 className="text-black text-xl font-medium mt-1 mb-2">
                      Total Collected
                    </h5>

                    <span>12 January 2023 - 12 January 2024</span>
                  </div>
                  <div className="inline-flex mt-8">
                    <p className="text-3xl font-bold">₹{totalProfit}</p>
                    <span className="p-3 pl-4 font-medium">
                      {profitPercentage}
                    </span>
                  </div>
                  <p className="p-0 cursor-pointer">
                    <span className="border p-1 border-gray-300 text-black m-1 rounded-tl-2xl rounded-br-2xl rounded-tr-2xl font-medium text-sm">
                      {performanceText}
                    </span>
                  </p>
                </div>
                <div className="flex-1 bg-green-200 rounded-lg p-4">
                  <p>Graph</p>
                </div>
              </div>

              {/*  card-block2 */}
              <div className="card-block2 flex flex-wrap">
                {avgGrowingData.map((data, index) => (
                  <div
                    key={index}
                    className={`flex-1 p-4 ${
                      index !== avgGrowingData.length - 1
                        ? 'border-r border-gray-300'
                        : ''
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      {data.icon}
                      <p className="ml-2">{data.text}</p>
                    </div>
                    <p className="font-bold text-xl">{data.percentage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#fff] rounded-lg shadow-xl min-h-[340px] min-w-[200px]">
            {/* Block 2 */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2  grid-rows-1  grid-flow-row-dense">
              <div className="bg-[#fff] rounded-lg shadow-xl min-h-[175px] min-w-[100px] row-span-1">
                {/* Block Blue 1 */}
                <p
                  className="crnsr-text pl-2 py-4"
                  style={{ fontWeight: '600', fontSize: '1.1rem' }}
                >
                  Token allocation
                </p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 grid-rows-1 grid-flow-row-dense p-2">
                  {/* inner block1 */}
                  <div className="grid grid-cols-1 gap-x-2 gap-y-2 grid-rows-1 grid-flow-row-dense">
                    <div className="bg-[#ffe0bb] rounded-lg shadow-xl min-h-[150px] min-w-[100px]">
                      {data1.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex flex-col justify-between h-full"
                        >
                          <div className="flex justify-between p-2">
                            <p className="text-black">{item}</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="w-4 h-4 absolute right-2 top-2"
                              style={{
                                backgroundColor: 'white',
                                borderRadius: '50%',
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 8 2Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex justify-start p-2">
                            <p>$16,987 6</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#cfe5eb] rounded-lg shadow-xl min-h-[130px] min-w-[100px]">
                      {data2.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex flex-col justify-between h-full"
                        >
                          <div className="flex justify-between p-2">
                            <p className="text-black">{item}</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="w-4 h-4 absolute right-2 top-2"
                              style={{
                                backgroundColor: 'white',
                                borderRadius: '50%',
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 8 2Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex justify-start p-2">
                            <p>$6,000</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* inner block2 */}
                  <div className="grid gap-x-2 gap-y-2">
                    <div className="bg-[#e2d9f7] rounded-lg shadow-xl min-h-[80px] min-w-[100px]">
                      {data3.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex flex-col justify-between h-full"
                        >
                          <div className="flex justify-between p-2">
                            <p className="text-black">{item}</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="w-4 h-4 absolute right-2 top-2"
                              style={{
                                backgroundColor: 'white',
                                borderRadius: '50%',
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 8 2Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex justify-start p-2">
                            <p>$11,000</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#d2f2fa] rounded-lg shadow-xl min-h-[80px] min-w-[100px]">
                      {data4.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex flex-col justify-between h-full"
                        >
                          <div className="flex justify-between p-2">
                            <p className="text-black">{item}</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="w-4 h-4 absolute right-2 top-2"
                              style={{
                                backgroundColor: 'white',
                                borderRadius: '50%',
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 8 2Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex justify-start p-2">
                            <p>$3,765</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#f7f6b9] rounded-lg shadow-xl min-h-[80px] min-w-[100px]">
                      {data5.map((item, index) => (
                        <div
                          key={index}
                          className="relative flex flex-col justify-between h-full"
                        >
                          <div className="flex justify-between p-2">
                            <p className="text-black">{item}</p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              className="w-4 h-4 absolute right-2 top-2"
                              style={{
                                backgroundColor: 'white',
                                borderRadius: '50%',
                              }}
                            >
                              <path
                                fillRule="evenodd"
                                d="M8 2a.75.75 0 0 1 .75.75v8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 1 1 1.06-1.06l1.22 1.22V2.75A.75.75 0 0 1 8 2Z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="flex justify-start p-2">
                            <p>$2,567</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className=" p-2 pt-2 bg-[#fff] rounded-lg shadow-xl min-h-[170px] min-w-[100px]">
                  {data6.map((item, index) => (
                    <div
                      key={index}
                      className="relative flex flex-col justify-between h-full"
                    >
                      <div className="flex justify-between p-2">
                        <p
                          className="text-black"
                          style={{ fontSize: '1.2rem' }}
                        >
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div
                    className="flex  justify-start  p-2"
                    style={{ paddingTop: '0.5rem' }}
                  >
                    <p className="p-0" style={{ fontSize: '2.3rem' }}>
                      <span style={{ fontSize: '1.1rem' }}>ETH</span> <br />{' '}
                      ₹82,567
                    </p>
                  </div>
                </div>

                <div className="mt-2"></div>
                <div className="p-2 pt-4 bg-[#fff] rounded-lg shadow-xl min-h-[170px] min-w-[100px]">
                  <div>
                    <p>
                      Performance <br /> <span>comparison</span>{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4"></div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-3 grid-flow-row-dense">
          {/*Table*/}
          <div className="bg-[#fff] rounded-lg shadow-xl min-h-[350px] min-w-[200px] col-span-2">
            <div className="box-crm-summary p-5" style={{ fontWeight: 'bold' }}>
              <h5>My Portfolio</h5>
              <Paper className="w-full mt-6 overflow-x-auto">
                <table
                  className="w-full"
                  style={{ borderCollapse: 'collapse', border: 'none' }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" className="text-left">
                        Name
                      </TableCell>
                      <TableCell align="left" className="text-left">
                        Mobile
                      </TableCell>
                      <TableCell align="left" className="text-left">
                        Email
                      </TableCell>
                      <TableCell align="left" className="text-left">
                        Event
                      </TableCell>
                      <TableCell align="left" className="text-left">
                        Date
                      </TableCell>
                      <TableCell align="left" className="text-left">
                        Status
                      </TableCell>
                      <TableCell align="left" className="text-left">
                        Source
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell align="left" className="text-left">
                          {row.name}
                        </TableCell>
                        <TableCell align="left" className="text-left">
                          {row.mobile}
                        </TableCell>
                        <TableCell align="left" className="text-left">
                          {row.email}
                        </TableCell>
                        <TableCell align="left" className="text-left">
                          {row.project}
                        </TableCell>
                        <TableCell align="left" className="text-left">
                          {row.date}
                        </TableCell>
                        <TableCell align="left" className="text-left">
                          {row.status}
                        </TableCell>
                        <TableCell align="left" className="text-left">
                          {row.source}
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </table>
              </Paper>
            </div>
          </div>
          <div className="bg-[#fff] rounded-lg shadow-xl min-h-[350px] min-w-[200px]" />
        </div>
      </div>
    </div>
  )
}

export default CrmSummaryReport
