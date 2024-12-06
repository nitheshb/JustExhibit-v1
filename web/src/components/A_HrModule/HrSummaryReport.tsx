import React, { useState } from 'react'
import HrPieChart from './Report/Chart/HrPieChart'
import HrStackedChart from './Report/Chart/HrStackedChart'

const data = [
  { label: 'Desktop', value: 20, color: '#ff6347' }, 
  { label: 'Mobile', value: 30, color: '#4682b4' }, 
  { label: 'Others', value: 40, color: '#32cd32' },
]

const data1 = ['Inprogress']
const data2 = ['Not Interested']
const data3 = ['Site Visits ']
const data4 = ['Followup']
const data5 = ['Booking']
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
    text: 'Site Visit',
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
    text: 'LeadSources',
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
    text: 'Cost per lead',
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

const HrSummaryReport = () => {
  const [isClicked, setisClicked] = useState('business_tasks')
  return (
    <div className="flex flex-col  mt-4 drop-shadow-md rounded-lg  px-4">
      <div className="flex flex-col  mt-4 drop-shadow-md rounded-lg  px-4">
        <div className="m-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row flex-wrap">
              <div className="bg-[#fff] rounded-lg shadow-xl  ">
                {/* Block 1 */}
                <div className="flex flex-col h-full">
                  <div className="card-block1 flex justify-between mb-8">
                    <div className="flex-1 mr-4  p-4">
                      <div>
                        <section className="text-black  font-weight-[600] mt-1 mb-2">
                          Total Leads
                        </section>

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
                  <div className=" flex flex-wrap">
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
              {/* section 2 */}
              <div className="bg-[#fff]  rounded-lg shadow-xl min-h-[340px] min-w-[200px] ml-2">
                {/* Block 2 */}
                <div className="w-full flex">
                  <div className="bg-[#fff] rounded-lg  min-h-[175px] min-w-[100px] row-span-1">
                    {/* Block Blue 1 */}
                    <p
                      className="crnsr-text pl-2 py-2"
                      style={{ fontWeight: '600', fontSize: '1.1rem' }}
                    >
                      Leads
                    </p>
                    <div className="flex flex-row gap-3 p-4 pt-2">
                      {/* inner block1 */}
                      <div className="bg-[#ffe0bb] rounded-lg shadow-xl min-h-[150px] min-w-[100px]">
                        {data1.map((item, index) => (
                          <div
                            key={index}
                            className="relative flex flex-col justify-between h-full"
                          >
                            <div className="flex justify-between p-2">
                              <p className="text-black">Leads</p>
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
                      {/* Row 2 */}
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
                              className=" flex flex-col justify-between h-full"
                            >
                              <div className="flex justify-between p-2">
                                <p className="text-black">{item}</p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 16 16"
                                  fill="currentColor"
                                  className="w-4 h-4 mt-1 ml-2 right-2 top-2"
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
                              className=" flex flex-col justify-between h-full"
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
                </div>
              </div>
            </div>

            {/* section - 2 */}
            <section className="w-full border-[#e7e5eb] bg-white rounded-lg p-4">
              <div className="flex flex-col"></div>
              <section className="flex flex-row justify-between">
                <article className="flex flex-col">
                  <div className="text-[#1f2937]">Revenue</div>
                  <div className="text-[#1f2937] font-[700] text-2xl mt-2">
                    ₹62,820.59
                  </div>
                  <div className="text-[#EF4444] text-xs mt-1">
                    0.2% less than the previous 30 days
                  </div>
                </article>
                <article>date</article>
              </section>

              <div className="w-full h-[400px] mt-4">
                <section className="flex flex-row justify-between">
                  <article></article>
                  <article className="flex flex-row mr-2 mb-3">
                    <section className="flex flex-row">
                      <div className="text-[#1f2937] w-3 h-3 mt-1 mx-2 rounded-sm bg-[#9333ea]"></div>
                      <div className="text-[#4b5563] text-xs"> This month</div>
                    </section>
                    <section className="flex flex-row">
                      <div className="text-[#2563eb] w-3 h-3 mt-1 mx-2 rounded-sm bg-[#2563eb]"></div>
                      <div className="text-[#4b5563] text-xs"> Last month</div>
                    </section>
                  </article>
                </section>
                <HrStackedChart/>
              </div>
            </section>
            {/* section - 3 */}
            <section className="flex flex-row flex-wrap gap-2">
              <section className="w-[49%] border-[#e7e5eb] bg-white rounded-lg p-4">
                <div className="flex flex-col"></div>
                <section className="flex flex-row justify-between">
                  <article className="flex flex-col">
                    <div className="text-[#1f2937]">Revenue</div>
                    <div className="text-[#1f2937] font-[700] text-2xl mt-2">
                      ₹62,820.59
                    </div>
                    <div className="text-[#EF4444] text-xs mt-1">
                      0.2% less than the previous 30 days
                    </div>
                  </article>
                  <article>date</article>
                </section>

                <div className="w-full h-[400px] mt-4">
                  <section className="flex flex-row justify-between">
                    <article></article>
                    <article className="flex flex-row mr-2 mb-3">
                      <section className="flex flex-row">
                        <div className="text-[#1f2937] w-3 h-3 mt-1 mx-2 rounded-sm bg-[#9333ea]"></div>
                        <div className="text-[#4b5563] text-xs">
                          {' '}
                          This month
                        </div>
                      </section>
                      <section className="flex flex-row">
                        <div className="text-[#2563eb] w-3 h-3 mt-1 mx-2 rounded-sm bg-[#2563eb]"></div>
                        <div className="text-[#4b5563] text-xs">
                          {' '}
                          Last month
                        </div>
                      </section>
                    </article>
                  </section>
                  <HrStackedChart/>
                </div>
                {/* bottom sheet */}
                <section className="mt-3 ml-4">
                  <div className="text-[#1f2937] font-[600] text-xl">
                    Conversion funnel
                  </div>
                  <div className="flex flex-row border-b border-gray-200">
                    <ul
                      className="flex flex-wrap -mb-px mt-1"
                      id="myTab"
                      data-tabs-toggle="#myTabContent"
                      role="tablist"
                    >
                      {[
                        {
                          lab: 'First-Time',
                          val: 'business_tasks',
                          color: '#4F46E5',
                        },
                        {
                          lab: 'Returning',
                          val: 'personal_tasks',
                          color: '#9333EA',
                        },
                      ].map((d, i) => {
                        return (
                          <li key={i} className="mr-4">
                            {' '}
                            <button
                              className={`inline-block pb-[6px] mr-3 text-sm  text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${
                                isClicked === d.val
                                  ? 'border-black'
                                  : 'border-transparent'
                              }`}
                              type="button"
                              role="tab"
                              onClick={() => setisClicked(d.val)}
                            >
                              <section className="flex flex-row text-[15px] mb-1ss ">
                                <div
                                  className={`w-3 h-3 bg-[${d.color}] mt-1 mr-1 rounded-sm`}
                                ></div>
                                {d.lab}
                              </section>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </section>
                <article className="text-[#4f46e5] text-center font-[500] text-[13px]">
                  View full Report
                </article>
              </section>
              <section className="w-[49%] border-[#e7e5eb] bg-white rounded-lg p-4">
                <div className="flex flex-col"></div>
                <section className="flex flex-row justify-between">
                  <article className="flex flex-col">
                    <div className="text-[#1f2937]">Revenue</div>
                    <div className="text-[#1f2937] font-[700] text-2xl mt-2">
                      ₹62,820.59
                    </div>
                    <div className="text-[#EF4444] text-xs mt-1">
                      0.2% less than the previous 30 days
                    </div>
                  </article>
                  <article>date</article>
                </section>

                <div className="w-full h-[400px] mt-4">
                  <section className="flex flex-row justify-between">
                    <article></article>
                    <article className="flex flex-row mr-2 mb-3">
                      <section className="flex flex-row">
                        <div className="text-[#1f2937] w-3 h-3 mt-1 mx-2 rounded-sm bg-[#9333ea]"></div>
                        <div className="text-[#4b5563] text-xs">
                          {' '}
                          This month
                        </div>
                      </section>
                      <section className="flex flex-row">
                        <div className="text-[#2563eb] w-3 h-3 mt-1 mx-2 rounded-sm bg-[#2563eb]"></div>
                        <div className="text-[#4b5563] text-xs">
                          {' '}
                          Last month
                        </div>
                      </section>
                    </article>
                  </section>
                  <HrPieChart/>
                </div>
              </section>
            </section>
            {/* section-4 */}
            <section className="flex flex-row flex-wrap gap-2">
              <section className="w-[49%] border-[#e7e5eb] bg-white rounded-lg p-4">
                <div className="text-[#1f2937] font-[600] text-xl mb-2 ml-2">
                  Location
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3 w-[200px]">
                        Color
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Apple MacBook Pro 17
                      </th>
                      <td className="px-6 py-4 flex justify-end">
                        <div className="w-full mt-2 h-[6px] rounded-md bg-[#6366F1]"></div>
                      </td>

                      <td className="px-6 py-4 ">$2999</td>
                    </tr>
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Microsoft Surface Pro
                      </th>
                      <td className="px-6 py-4 flex justify-end">
                        <div className="w-[50%] mt-2 h-[6px] rounded-md bg-[#6366F1]"></div>
                      </td>
                      <td className="px-6 py-4 ">$1999</td>
                    </tr>
                    <tr className="bg-white ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        Magic Mouse 2
                      </th>
                      <td className="px-6 py-4 flex justify-end">
                        <div className=" w-[25%] mt-2 h-[6px] rounded-md bg-[#6366F1]"></div>
                      </td>
                      <td className="px-6 py-4">$99</td>
                    </tr>
                  </tbody>
                </table>
              </section>
              <section className="w-[49%] border-[#e7e5eb] bg-white rounded-lg p-4">
                <div className="">
                  <ul className="divide-y divide-gray-200">
                    {/* Table Header */}
                    <li className="flex items-center py-2">
                      <div className="w-2/4 px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Header 1
                      </div>
                      <div className="w-1/4 px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Header 2
                      </div>
                      <div className="w-1/4 px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Header 3
                      </div>
                      <div className="w-1/4 px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Header 4
                      </div>
                    </li>
                    {/* Table Rows */}
                    <li className="flex items-center py-2">
                      <div className="relative w-full raxhy truncate">
                        <span
                          className="block text-blue-300  relative truncate w-full"
                          style={{ zIndex: '1' }}
                        >
                          preiline.co
                        </span>
                        <div
                          className="absolute bg-[$e0e7ff] dark:bg-indigo-500/20"
                          style={{ width: '100%', top: '0px', bottom: '0px' }}
                        ></div>
                      </div>
                      <div className="w-1/4 px-6 py-4 bg-white text-sm text-gray-500">
                        Row 1, Column 2
                      </div>
                      <div className="w-1/4 px-6 py-4 bg-white text-sm text-gray-500">
                        Row 1, Column 3
                      </div>
                      <div className="w-1/4 px-6 py-4 bg-white text-sm text-gray-500">
                        Row 1, Column 4
                      </div>
                    </li>
                    {/* Add more rows as needed */}
                  </ul>
                </div>
              </section>
            </section>
            {/* section-5 */}
            <section className="flex flex-col flex-wrap gap-2">
              <ul
                className="flex flex-wrap -mb-px mt-1"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                {[
                  {
                    lab: 'Users',
                    val: 'business_tasks',
                    color: '#4F46E5',
                    digit: 54382,
                  },
                  {
                    lab: 'New users',
                    val: 'new_users',
                    color: '#9333EA',
                    digit: '3.301',
                  },
                  {
                    lab: 'Returning users',
                    val: 'returning_users',
                    color: '#9333EA',
                    digit: '50,402',
                  },
                  {
                    lab: 'Avg. engagement time',
                    val: 'avg_engagement_time',
                    color: '#9333EA',
                    digit: '2m 25s',
                  },
                ].map((d, i) => {
                  return (
                    <li key={i} className="border ">
                      {' '}
                      <button
                        className={`inline-block pb-[6px]  text-sm  text-center text-black rounded-t-lg border-t-[4px]  hover:text-black hover:border-gray-300   ${
                          isClicked === d.val
                            ? 'border-[#4f46e5]'
                            : 'border-transparent'
                        }`}
                        type="button"
                        role="tab"
                        onClick={() => setisClicked(d.val)}
                      >
                        <div>
                          {/* <section className={` border-t border-2 ${
                                isClicked === d.val
                                  ? 'border-black'
                                  : 'border-transparent'
                              }`} ></section> */}
                        </div>
                        <div className=" px-[24px] py-[14px]">
                          <section className="flex flex-row text-[15px] mb-1ss ">
                            <div
                              className={`w-3 h-3 bg-[${d.color}] mt-1 mr-1 rounded-sm`}
                            ></div>
                            {d.lab}
                          </section>
                          <section className="flex flex-row text-[15px] mb-1ss ">
                            {d.digit}
                          </section>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <article className="flex flex-row">
                <div className="w-[100%]">
                  <svg
                    width={863}
                    data-width={863}
                    className="datamap"
                    height={430}
                    style={{
                      overflow: 'hidden',
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <g id className="datamaps-subunits">
                      <path
                        d="M578.4378937893789,242.7792215120154L580.8573357335733,243.9264048521731L582.6719171917192,243.52801371140873L583.1903690369037,242.17847239647614L585.0913591359136,241.72689985402909L586.3874887488748,240.82112740347816L586.9059405940594,238.4391941032182L588.8933393339335,237.8781237762032L589.3253825382538,236.80311695018457L590.448694869487,237.57150008042237L591.1399639963997,237.67375408025734L592.522502250225,237.72486377772208L594.2506750675068,238.33728417896813L595.0283528352836,238.6937697952079L596.7565256525653,237.72486377772208L597.534203420342,238.33728417896813L598.3118811881188,236.957003071408L599.7808280828083,237.00827509630642L600.1264626462646,236.54640600461357L600.385688568857,235.31008385367886L601.4225922592259,234.27454749297607L602.7187218721872,234.9481956145293L602.459495949595,235.87758012468234L603.2371737173717,236.03210189316206L602.9779477947795,238.59197360541032L603.9284428442844,239.55721361339045L604.7925292529253,238.948061983043L605.8294329432944,238.64287737513382L607.2983798379838,237.26446054443414L608.9401440144015,237.52035575870585L611.4459945994599,237.52035575870585L611.8780378037804,238.38824483973042L610.495499549955,238.6937697952079L609.2857785778579,239.2528400502007L606.5207020702071,239.60790335623693L603.9284428442844,240.2658568848806L602.545904590459,241.52592092589464L603.0643564356435,242.7792215120154L603.4099909990999,244.2744511763563L602.2002700270027,245.51336037361273L602.2866786678668,246.59836320713907L601.595409540954,247.67855645877006L599.3487848784878,247.58055349839282L600.2992799279928,249.4846406613292L598.7439243924393,250.21312539240745L597.7070207020702,251.90479583691797L597.8798379837983,253.63321112749537L596.9293429342935,254.39771451509282L596.0652565256526,254.15904735492995L594.1642664266427,254.5408105776118L593.9050405040504,255.30267816270882L592.1768676867687,255.30267816270882L590.7943294329433,256.91442165476747L590.7079207920792,259.2672783679322L587.5972097209722,260.3895326549146L585.9554455445544,260.1561029416788L585.43699369937,260.76261528789513L584.0544554455446,260.4361951907736L581.6350135013502,260.8092157167879L577.5738073807381,259.4078088178081L579.7340234023402,256.91442165476747L579.561206120612,255.1124174592241L577.7466246624663,254.63616464395594L577.5738073807381,252.81845739421783L576.7961296129613,250.55236413664764L577.8330333033304,248.9978035402437L576.7961296129613,248.5588348783482L577.40099009901,246.45069345859156Z"
                        className="datamaps-subunit AFG"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M480.8825382538254,223.69138044149412L480.62331233123314,224.77930687232373L480.96894689468945,226.13124556934008L481.91944194419443,226.9382306056289L481.91944194419443,227.74213069424871L481.1417641764176,228.22300628834452L480.96894689468945,229.2346248808514L479.8456345634564,230.76949996013565L479.4135913591359,230.50564765039223L479.4135913591359,229.8181128008698L478.1174617461746,228.8092662814073L477.8582358235824,227.26015862886953L478.03105310531055,225.10457373083807L478.3766876687669,224.12723827306885L478.03105310531055,223.58227190117566L477.8582358235824,222.59768065087977L478.8951395139514,221.00135588701113L478.9815481548155,221.60833184589683L479.67281728172816,221.27747884748675L480.1912691269127,222.15856181760955L480.7961296129613,222.4879892969014Z"
                        className="datamaps-subunit ALB"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M555.2803780378038,274.468570403091L555.7124212421242,274.3348759497841L555.7988298829883,275.0472983026221L557.6998199819982,274.6467466927177L559.6872187218722,274.7357993723551L561.1561656165617,274.78031686496604L562.7979297929793,273.03971541276604L564.526102610261,271.3348142788504L566.0814581458146,269.6660122271381L566.513501350135,270.5691593292017L566.8591359135913,272.6815318525448L565.6494149414941,272.6815318525448L565.3901890189019,274.4240115216798L565.8222322232224,274.78031686496604L564.7853285328533,275.31406884234235L564.7853285328533,276.37906535762045L564.0940594059406,277.4407803665858L564.0076507650765,278.4992870815444L563.489198919892,279.02735993806823L556.3172817281728,277.7498396732203L555.3667866786678,275.09177467328874Z"
                        className="datamaps-subunit ARE"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M270.8231323132313,492.7971091786498L269.3541854185419,492.6558538262634L266.7619261926193,492.6558538262634L266.7619261926193,483.58379402266326L267.71242124212426,485.40069293404406L268.9221422142215,488.47223570114977L272.03285328532854,490.9000867622026L275.40279027902795,491.95135068849515L274.2794779477948,494.07378436328406L272.03285328532854,494.21623923457116ZM281.0193519351935,389.2800971845194L285.42619261926194,393.5190953580064L287.4135913591359,393.9191735734901L290.3514851485149,395.88201669840856L292.85733573357334,396.91271882863924L293.2029702970297,398.08183207099023L290.78352835283533,402.16270046974626L293.2029702970297,402.89392138305607L295.9680468046805,403.3060197377872L297.86903690369036,402.8481677898551L300.02925292529255,400.79640868992067L300.37488748874887,398.44242185830615L301.5846084608461,397.9467162822101L302.7943294329433,399.48141768627113L302.7079207920792,401.61544677947313L300.72052205220524,403.122794564653L299.0787578757876,404.22384831960653L296.4000900090009,406.8556006620346L293.2029702970297,410.63795613666446L292.5981098109811,412.85676786706307L291.9932493249325,415.7643559534585L291.9932493249325,418.55952529799515L291.47479747974796,419.23885603988646L291.3019801980198,421.0921225122647L291.12916291629165,422.61437727788075L294.1534653465347,425.08994294164773L293.8078307830783,427.1392701193911L295.3631863186319,428.4481831817982L295.1903690369037,429.91690795551597L292.9437443744374,433.75987913498085L289.3145814581458,435.41985885715434L284.5621062106211,436.0455891832038L281.8834383438344,435.7325008913707L282.4018901890189,437.61780413090435L281.8834383438344,439.9446067093137L282.3154815481548,441.54572871332596L280.93294329432945,442.6199274841205L278.42709270927094,443.0511518324523L276.1804680468047,441.9210744319632L275.22997299729974,442.7276502933398L275.5756075607561,445.93083179997024L277.13096309630964,446.9180627024345L278.513501350135,445.87612485530246L279.20477047704776,447.5788780444028L276.9581458145815,448.57414870962293L275.0571557155716,450.6355350739491L274.7115211521152,453.9673578555186L274.10666066606666,455.7983300085858L271.8600360036004,455.7983300085858L269.9590459045905,457.58868543042524L269.2677767776778,460.1587917345721L271.6872187218722,462.70449288970224L273.9338433843385,463.4211017602707L273.1561656165617,466.6194622843432L270.3046804680468,468.6391968253873L268.74932493249327,472.998949782457L266.5891089108911,474.4547302916885L265.55220522052207,476.2431390309372L266.32988298829883,480.2029862899299L267.9716471647165,482.4495397629062L266.93474347434744,482.2501447300632L264.68811881188117,481.6533278838017L258.89873987398744,481.12453566502484L257.94824482448246,478.8948426994924L257.94824482448246,475.98654967644325L256.3928892889289,476.2431390309372L255.52880288028805,474.9001536047705L255.2695769576958,470.9305764562033L257.1705670567057,469.31741460859655L257.94824482448246,467.0460421695982L257.60261026102614,465.22473127825486L258.89873987398744,462.1688243551142L259.7628262826283,457.58868543042524L259.503600360036,455.5685162900913L260.54050405040505,454.9379235780011L260.2812781278128,453.6828097258257L259.1579657965797,453.0015694421944L260.0220522052206,451.589822130393L258.89873987398744,450.35572877123536L258.38028802880285,446.58845620540126L259.33078307830783,445.93083179997024L258.89873987398744,442.02843907925876L259.503600360036,438.7780548586412L260.10846084608465,436.0455891832038L261.5774077407741,434.89977437848563L260.79972997299734,431.90708182744277L260.79972997299734,429.1560533758104L262.61431143114316,427.2396952999032L262.5279027902791,424.74182247163424L263.91044104410446,421.92573470465595L263.91044104410446,419.23885603988646L263.3055805580558,418.704941842031L262.1822682268227,413.8065428157493L263.65121512151217,410.96726708190704L263.478397839784,408.2505105314511L264.34248424842485,405.7907806952052L265.8978397839784,403.214393052709L267.6260126012602,401.5698868822427L266.84833483348336,400.4784844934676L267.3667866786679,399.6171930797827L267.2803780378038,395.21156248522436L269.87263726372635,393.9191735734901L270.73672367236725,391.172495473247L270.477497749775,390.55526369305693L272.46489648964894,388.18440160012364L275.5756075607561,388.84142550056L276.9581458145815,390.687437153064L277.9086408640864,388.6222870185767L280.67371737173715,388.7099266887062Z"
                        className="datamaps-subunit ARG"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M536.0976597659766,226.13124556934008L539.467596759676,225.6455572656958L539.8996399639964,226.45441230783504L540.8501350135014,226.99191948475269L540.3316831683168,227.79561530898147L541.6278127812782,228.91568555615723L540.9365436543654,229.87107836093622L541.9734473447345,230.7167553369713L543.0967596759676,231.24362248576415L543.0967596759676,233.39051134765538L542.2326732673267,233.49470008194294L541.2821782178219,231.71670822582587L541.2821782178219,231.1909935487232L540.2452745274527,231.24362248576415L539.467596759676,230.40001613752176L539.0355535553556,230.45283837555564L538.0850585058506,229.5530883439298L536.2704770477047,228.75603668706526L536.529702970297,227.26015862886953Z"
                        className="datamaps-subunit ARM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M596.9293429342935,468.39319420545996L598.484698469847,469.56466497336714L600.7313231323133,469.9981616372483L600.8177317731772,470.68146408978924L600.2128712871287,472.3696629941975L596.4972997299731,472.6211138767953L596.4108910891089,470.68146408978924L596.7565256525653,469.1321963811587Z"
                        className="datamaps-subunit ATF"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M542.2326732673267,233.49470008194294L540.5909090909091,233.0776480629225L539.3811881188119,231.6641940980943L539.0355535553556,230.45283837555564L539.467596759676,230.40001613752176L540.2452745274527,231.24362248576415L541.2821782178219,231.1909935487232L541.2821782178219,231.71670822582587ZM548.1084608460847,223.85493503551055L549.404590459046,225.53747289852942L550.6143114311432,227.79561530898147L551.7376237623762,227.9025439746682L552.4288928892889,228.75603668706526L550.441494149415,229.0220516875774L550.0094509450945,231.45401034448065L549.6638163816382,232.55521395940397L548.7133213321332,233.23413548638487L548.7997299729973,234.79292001306695L548.1948694869487,234.9481956145293L546.7259225922593,233.33839843896453L547.5900090009001,231.7692096507719L546.8123312331234,230.87495052474L545.9482448244825,231.08569723206944L543.0967596759676,233.39051134765538L543.0967596759676,231.24362248576415L541.9734473447345,230.7167553369713L540.9365436543654,229.87107836093622L541.6278127812782,228.91568555615723L540.3316831683168,227.79561530898147L540.8501350135014,226.99191948475269L539.8996399639964,226.45441230783504L539.467596759676,225.6455572656958L539.9860486048605,225.10457373083807L541.8006300630063,226.02341235125272L543.0967596759676,226.23902323830328L543.442394239424,225.86155816170253L542.2326732673267,224.12723827306885L542.8375337533754,223.6368333940317L543.528802880288,223.74591305596806L545.1705670567057,225.69957845155324L546.2938793879388,225.91552348906498L546.6395139513952,225.10457373083807Z"
                        className="datamaps-subunit AZE"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M501.8798379837983,345.2802271842749L501.79342934293425,342.389121934674L501.1885688568857,341.29067203858693L502.65751575157515,341.49405385738396L503.34878487848783,340.1113368472148L504.6449144914492,340.27397722000717L504.73132313231326,341.20932350226053L505.2497749774978,341.7788142502916L505.3361836183619,342.55189643327014L504.73132313231326,343.04028861142166L503.7808280828083,344.3024826338234L502.91674167416744,345.1987283393365Z"
                        className="datamaps-subunit BDI"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M439.492799279928,190.39758995502177L441.2209720972097,190.72250612088013L443.467596759676,189.9416975355112L444.93654365436544,191.56449789869453L446.3190819081908,192.46679734886973L445.9734473447345,195.01984746894044L445.3685868586859,195.14654702258565L445.1093609360936,197.2242956834936L443.0355535553556,195.58929185082798L441.8258325832583,195.84179950955343L440.09765976597663,194.06673103029038L438.97434743474344,192.59532314766125L437.85103510351036,192.53107188317767L437.50540054005404,191.17638517767415Z"
                        className="datamaps-subunit BEL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M437.93744374437443,319.44233429338095L435.95004500450045,319.728380259031L435.3451845184519,318.05202292908825L435.51800180018006,312.472587276008L434.9995499549955,311.9786865132691L434.9131413141314,310.7838915478312L434.04905490549055,309.917592931093L433.35778577857786,309.2155978515829L433.6170117011701,307.93379779658045L434.481098109811,307.6440472917341L434.9995499549955,306.5667898792521L436.12286228622867,306.3594330526645L436.64131413141314,305.6124225516313L437.50540054005404,304.90614114093785L438.3694869486949,304.90614114093785L440.1840684068407,306.3179541320746L440.09765976597663,307.1056258782106L440.61611161116116,308.5543015279961L440.09765976597663,309.54602851471327L440.35688568856887,310.2064646945968L439.2335733573358,311.7316285707737L438.45589558955896,312.472587276008L438.0238523852385,313.99370507354917L438.1102610261026,315.5533495826275Z"
                        className="datamaps-subunit BEN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M424.71692169216925,311.2372934699761L423.0751575157516,310.61895509840036L421.95184518451845,310.7014275577109L421.0877587758776,311.31970315369324L420.0508550855086,310.7838915478312L419.6188118811881,310.00013861308787L418.495499549955,309.4634342730827L418.40909090909093,308.05794087805197L419.0139513951395,306.9813162193567L418.9275427542754,306.15201313455344L420.91494149414945,304.157474859422L421.26057605760576,302.4488361196906L421.86543654365437,301.8642966481263L423.0751575157516,302.19838940855743L424.02565256525656,301.697179478319L424.3712871287129,301.0282327911496L426.2722772277228,299.939528992598L426.7043204320432,299.1425980338207L428.95094509450945,298.13428216180716L430.24707470747074,297.7556734404679L430.85193519351935,298.2604251146023L432.40729072907294,298.2604251146023L432.2344734473448,299.43633799633096L432.493699369937,300.5678820268165L433.8762376237624,302.19838940855743L433.96264626462647,303.36625470774885L436.7277227722772,303.9493558212628L436.64131413141314,305.6124225516313L436.12286228622867,306.3594330526645L434.9995499549955,306.5667898792521L434.481098109811,307.6440472917341L433.6170117011701,307.93379779658045L431.5432043204321,307.89241202412506L430.4198919891989,307.685447397249L429.64221422142214,308.05794087805197L428.60531053105314,307.89241202412506L424.457695769577,308.0165622196603L424.3712871287129,309.3808311025374Z"
                        className="datamaps-subunit BFA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M653.8726372637265,280.21270356471524L653.8726372637265,282.09262087340875L653.0085508550856,281.699932368943L653.1813681368137,283.74619146786944L652.4900990099011,282.4413352911356L652.4036903690369,281.08826548878324L651.8852385238524,279.8618937170424L650.9347434743474,278.3671467176862L648.6881188118812,278.2349572137974L648.9473447344735,279.3350439385881L648.1696669666967,280.7382898463729L647.1327632763275,280.21270356471524L646.7871287128712,280.69451961874006L646.0958595859586,280.43178911870723L645.1453645364536,280.21270356471524L644.7997299729973,278.05862785906305L643.9356435643565,276.0687836307547L644.3676867686768,274.51312335543673L642.8987398739874,273.7995615618312L643.4171917191719,272.8158966615364L644.9725472547254,271.82926304524875L643.2443744374438,270.43385203525384L644.0220522052205,268.624159400664L645.9230423042304,269.801649753812L647.1327632763275,269.93722863840793L647.3055805580557,271.7843445575986L649.5522052205221,272.14351756989356L651.7988298829882,272.0986427648963L653.1813681368137,272.5471116903262L652.0580558055806,274.78031686496604L651.0211521152115,274.91383401931057L650.2434743474347,276.4233684882481L651.6260126012601,277.7939688285213L651.9716471647164,276.11312675188935L652.6629162916292,276.11312675188935Z"
                        className="datamaps-subunit BGD"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M485.89423942394245,215.85178828224014L486.5855085508551,217.26433301556375L487.53600360036006,216.98262906523132L489.3505850585059,217.48940882322177L492.89333933393345,217.7142301725887L494.01665166516653,216.81341445486936L496.8681368136814,216.0784748062713L498.5963096309631,217.26433301556375L500.06525652565256,217.60185124960697L498.76912691269126,219.0020591462873L497.9050405040504,221.3326584153413L498.6827182718272,223.19993593550527L496.60891089108907,222.76210758741297L494.1894689468947,223.74591305596806L494.1894689468947,225.37524117940615L491.9428442844284,225.6455572656958L490.3010801080108,224.56217871242924L488.4000900090009,225.42933245756075L486.5855085508551,225.32113584678396L486.4126912691269,223.19993593550527L485.20297029702976,222.15856181760955L485.63501350135016,221.7184967350675L485.3757875787579,221.3326584153413L485.72142214221424,220.28167058639386L486.6719171917192,219.2809289100042L485.462196219622,217.826545703045L485.28937893789384,216.64405520072734Z"
                        className="datamaps-subunit BGR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M245.41899189918993,275.7582209219447L244.81413141314133,275.89135374951906L244.20927092709272,274.3794467057347L243.34518451845187,273.62093153636886L243.8636363636364,271.91908125416774L244.55490549054906,272.05376173647153L245.41899189918993,274.24571659596296ZM244.72772277227725,268.2609525756655L242.13546354635466,268.71489430383036L241.9626462646265,267.71533546953316L243.08595859585964,267.4877071279977L244.64131413141317,267.57877887549296ZM246.71512151215123,268.2609525756655L246.2830783078308,270.1630635568817L245.85103510351038,269.801649753812L245.85103510351038,268.397205341141L244.81413141314133,267.3510483593058L244.81413141314133,267.0319383671599Z"
                        className="datamaps-subunit BHS"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M477.08055805580557,213.74244368469778L477.94464446444647,213.74244368469778L477.3397839783978,215.227051746106L478.5495049504951,216.53106848566486L478.20387038703876,218.10705791243697L477.59900990099015,218.21915243888168L477.16696669666965,218.55505907785067L476.3892889288929,219.2809289100042L476.04365436543657,221.1118501473778L473.8834383438344,219.83751015755396L473.0193519351935,218.49911382282218L472.0688568856886,217.77039585496163L471.03195319531955,216.53106848566486L470.5135013501351,215.4544582594538L469.3037803780378,213.91432114098706L469.8222322232224,212.4773480040127L470.68631863186323,213.28336112598296L471.2047704770477,212.5926979953514L472.32808280828084,212.4773480040127L474.40189018901896,213.05341295303234L476.04365436543657,212.99588336202294Z"
                        className="datamaps-subunit BIH"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M487.8816381638164,180.28801468337343L490.21467146714673,180.28801468337343L492.8069306930694,178.764150087509L493.32538253825385,176.3817611728889L495.31278127812783,175.03559341527992L495.05355535553554,173.17575244202493L496.522502250225,172.45487089233887L499.11476147614763,170.78487647501893L501.6206120612061,171.87590744308633L501.96624662466246,172.95981554235448L503.26237623762376,172.45487089233887L505.5954095409541,173.4632337235406L505.8546354635464,175.39089652644353L505.3361836183619,176.52283749107943L506.8051305130513,179.25050176813875L507.8420342034203,180.0119633025049L507.66921692169217,180.7700299489325L509.31098109810983,181.45626751637045L510.0022502250225,182.54854746833615L509.0517551755176,183.43092695796432L507.06435643564356,183.29547105711728L506.63231323132317,183.6339108970224L507.2371737173717,184.98105768197576L507.75562556255625,187.44595760673127L505.76822682268227,187.71035136624752L504.9905490549055,188.5668752606199L504.81773177317734,190.5276283381772L503.86723672367236,190.13722467886652L501.70702070207017,190.33253473488938L501.1021602160216,189.41922565142605L500.15166516651664,190.07207311663834L499.2875787578758,189.5499894361011L497.38658865886595,189.4846197226698L494.7079207920792,188.50113765938917L492.2884788478848,188.23793981936265L490.3874887488749,188.30377644338114L489.09135913591365,189.35380719849897L487.96804680468045,189.4846197226698L487.8816381638164,187.77638721086763L487.1903690369037,185.9845668156412L488.65931593159314,185.18222568535637L488.65931593159314,183.5662762031185L487.96804680468045,182.07153267704655Z"
                        className="datamaps-subunit BLR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M217.5954095409541,291.0191846096612L217.50900090009003,290.6776840390847L217.85463546354637,290.54955400821433L218.2866786678668,290.8484668787757L219.15076507650767,289.30904269245235L219.5828082808281,289.30904269245235L219.5828082808281,289.6516035316055L220.0148514851485,289.69440470597397L220.0148514851485,290.3786565339333L219.5828082808281,291.4456959736185L219.84203420342035,291.8292135192885L219.5828082808281,292.72284401166075L219.75562556255628,292.97785149355417L219.40999099909993,294.25083067462964L218.9779477947795,294.9283781529434L218.5459045904591,294.97069369569016L218.02745274527453,295.8584855131079L217.33618361836184,295.8584855131079L217.50900090009003,293.0203392515218Z"
                        className="datamaps-subunit BLZ"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M270.477497749775,390.55526369305693L268.74932493249327,390.90783573287536L267.79882988298834,387.31017927510555L266.50270027002705,384.4394420862687L267.2803780378038,381.9768883376785L265.98424842484246,380.90146772806304L265.63861386138615,379.05808757032196L264.515301530153,377.3502437769836L265.98424842484246,374.63085082059115L264.9473447344735,372.5591392421723L265.55220522052207,371.7159834186058L265.1201620162017,370.7900865924981L265.98424842484246,369.5300796295362L266.07065706570654,367.4363995413364L266.1570657065707,365.72517855342534L266.6755175517552,364.89217508756894L264.6017101710171,360.9084644246293L266.4162916291629,361.11538168482326L267.6260126012602,361.0739934821398L268.14446444644466,360.32940891756346L270.3046804680468,359.33778957672126L271.51440144014407,358.4299282687077L274.7115211521152,358.01760771187406L274.452295229523,359.8334363022385L274.7115211521152,360.7843424636527L274.53870387038705,362.4410836991853L277.13096309630964,364.64248934532657L279.8096309630963,365.0170549157643L280.7601260126013,365.9752982243804L282.4018901890189,366.4341176682595L283.3523852385239,367.14389206485504L284.9077407740774,367.14389206485504L286.2902790279028,367.85452166010094L286.37668766876686,369.27842669366237L286.89513951395145,370.0337312614373L286.89513951395145,371.08451378462854L286.2038703870387,371.1265881692086L287.1543654365437,374.0380473223267L291.7340234023402,374.12268950671745L291.3883888388839,375.6063250707283L291.6476147614761,376.58381336307826L292.9437443744374,377.26502149859533L293.462196219622,378.8442482556006L293.11656165616563,380.8585081499098L292.42529252925294,381.9768883376785L292.6845184518452,383.40074587806043L291.9068406840684,383.91975583539465L291.82043204320433,383.14149192499474L289.6602160216022,381.8476913675458L287.4135913591359,381.8046346548857L283.1795679567957,382.5372097330533L282.0562556255626,384.7862794089101L281.9698469846985,386.17672105100155L281.0193519351935,389.2800971845194L280.67371737173715,388.7099266887062L277.9086408640864,388.6222870185767L276.9581458145815,390.687437153064L275.5756075607561,388.84142550056L272.46489648964894,388.18440160012364Z"
                        className="datamaps-subunit BOL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M293.2029702970297,410.63795613666446L296.4000900090009,406.8556006620346L299.0787578757876,404.22384831960653L300.72052205220524,403.122794564653L302.7079207920792,401.61544677947313L302.7943294329433,399.48141768627113L301.5846084608461,397.9467162822101L300.37488748874887,398.44242185830615L300.8933393339334,396.91271882863924L301.1525652565257,395.34554442321894L301.23897389738977,393.9191735734901L300.37488748874887,393.43025313311716L299.42439243924395,393.83022643376495L298.5603060306031,393.74130268419754L298.21467146714673,392.72034676060156L298.0418541854186,390.3350836221725L297.6098109810981,389.5435545294515L295.9680468046805,388.84142550056L295.01755175517553,389.36789502315446L292.42529252925294,388.88526893994526L292.5981098109811,385.3505453906298L291.9068406840684,383.91975583539465L292.6845184518452,383.40074587806043L292.42529252925294,381.9768883376785L293.11656165616563,380.8585081499098L293.462196219622,378.8442482556006L292.9437443744374,377.26502149859533L291.6476147614761,376.58381336307826L291.3883888388839,375.6063250707283L291.7340234023402,374.12268950671745L287.1543654365437,374.0380473223267L286.2038703870387,371.1265881692086L286.89513951395145,371.08451378462854L286.89513951395145,370.0337312614373L286.37668766876686,369.27842669366237L286.2902790279028,367.85452166010094L284.9077407740774,367.14389206485504L283.3523852385239,367.14389206485504L282.4018901890189,366.4341176682595L280.7601260126013,365.9752982243804L279.8096309630963,365.0170549157643L277.13096309630964,364.64248934532657L274.53870387038705,362.4410836991853L274.7115211521152,360.7843424636527L274.452295229523,359.8334363022385L274.7115211521152,358.01760771187406L271.51440144014407,358.4299282687077L270.3046804680468,359.33778957672126L268.14446444644466,360.32940891756346L267.6260126012602,361.0739934821398L266.4162916291629,361.11538168482326L264.6017101710171,360.9084644246293L263.3055805580558,361.36376108198704L262.1822682268227,361.0739934821398L262.3550855085509,357.3583288944243L260.3676867686769,358.8011990033918L258.2938793879388,358.71867932438465L257.3433843384339,357.44070995639504L255.78802880288032,357.27595596704026L256.22007200720077,356.24696836668306L254.92394239423945,354.7673318918452L253.97344734473447,352.5931649999934L254.5783078307831,352.1425039673459L254.5783078307831,351.1189678679645L256.04725472547256,350.42349027695195L255.78802880288032,349.1154422455509L256.3928892889289,348.29858897769503L256.5657065706571,347.1558037088216L259.33078307830783,345.52474654538446L261.2317731773178,345.07648710612983L261.5774077407741,344.70981314592694L263.73762376237624,344.7912898844294L264.8609360936093,338.2008407840457L264.8609360936093,337.1849351469639L264.515301530153,335.8035294259748L263.478397839784,334.9097584226606L263.478397839784,333.20348664502285L264.77452745274525,332.7972122622501L265.29297929792983,333.04097843048265L265.3793879387939,332.1065101451691L263.99684968496854,331.8627195114611L263.91044104410446,330.3591327957204L268.5765076507651,330.44041874154277L269.44059405940595,329.5868404459358L270.04545454545456,330.3591327957204L270.5639063906391,331.78145417486365L270.9959495949595,331.45638311117534L272.2920792079208,332.7565840732769L274.19306930693074,332.5940697751281L274.62511251125113,331.8627195114611L276.43969396939696,331.29384135138497L277.3901890189019,330.88746696452745L277.73582358235825,329.8713858746248L279.3775877587759,329.180310320915L279.29117911791184,328.6924127067622L277.2173717371737,328.48910088291484L276.9581458145815,326.9841568507281L277.04455445544556,325.3561748646022L275.9212421242124,324.74536437442055L276.3532853285329,324.5009871343153L278.1678667866787,324.82681659427334L280.06885688568855,325.43760241746253L280.7601260126013,324.86754143407273L282.488298829883,324.5009871343153L285.16696669666965,323.5639093460155L286.03105310531055,322.6671009307114L285.7718271827183,321.9737710443482L286.9815481548155,321.8921823072838L287.5864086408641,322.4224313793385L287.24077407740776,323.4824010253562L288.0184518451846,323.84915851124083L288.62331233123314,324.98971091603585L287.93204320432045,325.8039876275651L287.5864086408641,327.87908506012536L288.19126912691274,329.0989988506312L288.3640864086409,330.19655655407723L289.83303330333035,331.3344772001046L291.04275427542757,331.45638311117534L291.3019801980198,330.96874423980347L291.9932493249325,330.84682785774913L293.11656165616563,330.44041874154277L293.8942394239424,329.7900892479935L295.1903690369037,329.9933278025533L295.79522952295235,329.9120335819811L297.0913591359136,330.11526620139097L297.3505850585059,329.6274910474851L296.91854185418543,329.13965481918393L297.17776777677767,328.44843696100673L298.12826282628265,328.6517513682111L299.2515751575158,328.40777251173984L300.6341134113411,328.9363702370143L301.67101710171016,329.4242337273416L302.448694869487,328.7737338694691L302.96714671467146,328.8957118809595L303.31278127812783,329.54618941670407L304.4360936093609,329.38358095180655L305.3865886588659,328.48910088291484L306.07785778577863,326.6993422157759L307.54680468046803,324.5009871343153L308.3244824482448,324.37878675991925L308.92934293429346,325.72257410046717L310.31188118811883,329.9120335819811L311.521602160216,330.31848928439024L311.6080108010801,331.9846158097146L309.7934293429343,333.93475477806925L310.57110711071107,334.6660074137216L314.8051305130514,335.0316343823962L314.89153915391546,337.46937147746013L316.7061206120612,335.8847835347974L319.7304230423042,336.73798665711286L323.7052205220522,338.2008407840457L324.91494149414945,339.62346203198115L324.482898289829,340.9246219611086L327.3343834383438,340.19265603573217L332.0004500450045,341.49405385738396L335.5432043204321,341.3720229556088L339.08595859585955,343.36594292247247L342.1966696669667,346.0546590696561L344.01125112511255,346.7478816005202L346.08505850585055,346.8702467682865L346.9491449144915,347.6046466491383L347.7268226822683,350.7098132415199L348.15886588658867,352.1425039673459L347.20837083708375,356.1647022907197L345.9986498649865,357.7703161578406L342.6287128712871,361.1567722706002L341.0733573357336,363.93557484882285L339.2587758775878,366.05869417174387L338.65391539153916,366.10039642424454L338.0490549054906,367.89635046101796L338.22187218721876,372.5591392421723L337.530603060306,376.41366838385767L337.2713771377138,378.07528092914885L336.493699369937,379.05808757032196L336.06165616561657,382.4509567149681L333.64221422142214,385.78515403524773L333.21017101710174,388.44707038629593L331.3091809180918,389.58748273363017L330.7043204320432,391.1283717271881L328.11206120612064,391.1283717271881L324.31008100810084,392.1446257578582L322.66831683168317,393.2970332740244L319.98964896489645,394.09713819697726L317.1381638163817,396.1953639085939L315.1507650765077,398.80342273111484L314.7187218721873,400.79640868992067L315.1507650765077,402.29966892359204L314.7187218721873,405.05235025085835L314.2002700270027,406.3458455062494L312.472097209721,407.8778602053269L309.7934293429343,412.7619765847186L307.7196219621962,414.998586187109L306.07785778577863,416.2921374696235L304.9545454545455,419.04457411025487L303.39918991899196,420.65193858909504L302.7079207920792,419.04457411025487L303.83123312331236,417.68877807087034L302.448694869487,415.7643559534585L300.547704770477,414.1874088398214L298.0418541854186,412.38314716749915L297.17776777677767,412.47780427863256L294.7583258325833,410.3090416949177Z"
                        className="datamaps-subunit BRA"
                        data-info='{"active":{"value":"5,101","percent":"42.2","isGrown":false},"new":{"value":"444","percent":"41.2","isGrown":false},"fillKey":"MAJOR","short":"br"}'
                        style={{
                          fill: 'rgb(79, 70, 229)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M705.6314131413142,323.6046620690135L706.5819081908191,322.7078755409154L708.5693069306931,321.40255604468575L708.4828982898289,322.58554859758885L708.3100810081007,324.09362140801085L707.1867686768677,324.05287988844174L706.6683168316832,324.86754143407273Z"
                        className="datamaps-subunit BRN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M651.5396039603961,265.06421872855356L652.576507650765,265.9352755251389L652.4036903690369,267.57877887549296L650.4162916291629,267.66982340047275L648.428892889289,267.4877071279977L646.8735373537354,267.8973159295031L644.7133213321333,266.8950738927365L644.6269126912691,266.34699369601685L646.2686768676867,264.3286991423005L647.564806480648,263.63746616321293L649.2929792979298,264.2826678754727L650.502700270027,264.3286991423005Z"
                        className="datamaps-subunit BTN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M502.1390639063907,388.88526893994526L498.76912691269126,390.77558013698217L496.60891089108907,392.72034676060156L495.7448244824482,394.49790311742527L495.05355535553554,395.4795806639901L493.7574257425743,395.6583803809497L493.32538253825385,396.95760621988904L493.0661566156616,397.7666509102497L491.5972097209721,398.3973257141869L489.6098109810981,398.26207576335764L488.486498649865,397.4967428514031L487.449594959496,397.1821368118497L486.23987398739877,397.8116577332938L485.72142214221424,399.0744449403692L484.511701170117,399.8889215322039L483.3883888388839,401.0691774580174L481.6602160216022,401.3421897230364L481.1417641764176,400.4330935440524L481.3145814581459,398.80342273111484L479.93204320432045,396.2849468527171L479.24077407740776,395.88201669840856L479.24077407740776,388.2281667555567L481.5738073807381,388.1406416231473L481.6602160216022,379.05808757032196L483.47479747974796,378.97253936947817L487.1903690369037,378.07528092914885L488.05445544554453,379.10086792185115L489.6098109810981,378.1179665418575L490.3874887488749,378.1179665418575L491.6836183618362,377.56336935315176L492.11566156615663,377.73394198601494L493.0661566156616,379.785924236368L493.498199819982,380.214635291968L494.27587758775877,381.67549128347173L497.0409540954096,384.48278006122416L498.0778577857786,384.7862794089101L498.0778577857786,385.6547201625664L498.76912691269126,387.31017927510555L500.58370837083714,387.703325560188Z"
                        className="datamaps-subunit BWA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M468.18046804680466,316.6190703014121L470.1678667866787,316.4551842741819L470.59990999099915,315.79938314600554L471.03195319531955,315.88138108740003L471.63681368136815,316.41420879772693L474.5747074707471,315.4713250494035L475.6116111611161,314.52755226457225L476.9077407740774,313.70612237498625L476.6485148514851,312.84282783232254L477.3397839783978,312.59601824536446L479.67281728172816,312.7605656906063L481.91944194419443,311.64925978626377L483.6476147614762,308.9676802383657L484.85733573357334,307.9751811937975L486.4126912691269,307.5612398694367L486.6719171917192,308.6369956830621L488.05445544554453,310.1239407782893L488.05445544554453,311.15487551520073L487.62241224122414,312.1433517689263L487.7952295229523,312.8839560211516L488.65931593159314,313.62393937573074L490.473897389739,314.6507050807019L491.77002700270026,315.63536742332326L491.77002700270026,316.41420879772693L493.4117911791179,317.68372510101665L494.448694869487,318.74737880690753L495.05355535553554,320.1777530725302L496.78172817281734,321.1576812828948L497.21377137713773,321.8921823072838L496.4360936093609,322.1777237382834L494.8807380738074,322.0961459252538L493.0661566156616,321.85138628295397L492.2020702070207,322.0553553900851L491.77002700270026,322.62632528413985L490.9923492349235,322.7078755409154L490.12826282628265,322.2185110233796L487.449594959496,323.4008888477961L486.32628262826285,323.15632888542063L485.98064806480653,323.3601313036705L485.28937893789384,324.7860909089192L483.47479747974796,324.33805153645113L481.7466246624663,324.09362140801085L480.1912691269127,323.19709134076993L478.20387038703876,322.3816494386972L476.9077407740774,323.15632888542063L476.04365436543657,324.37878675991925L475.7844284428443,326.0482100952928L474.22907290729074,325.9261022308678L472.5873087308731,325.5190268033198L471.2047704770477,326.8214096440656L469.90864086408646,329.0583424116974L469.6494149414941,328.32644201687725L469.56300630063004,327.22825805860606L468.43969396939696,326.45518888114617L467.5756075607561,325.23402753444884L467.4027902790279,324.37878675991925L466.2794779477948,323.1155654370103L466.452295229523,322.3816494386972L466.19306930693074,321.36174647693116L466.3658865886589,319.5240682735643L466.9707470747075,319.0744654601174Z"
                        className="datamaps-subunit CAF"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M454.5279027902791,204.5257923092684L454.61431143114316,205.12641160334098L454.26867686768674,206.02373953113874L455.30558055805585,206.67906352719456L456.6017101710171,206.73852538817283L456.34248424842485,208.16001880900257L455.30558055805585,208.74917261344615L453.57740774077405,208.33695701839747L453.0589558955896,209.7465661237165L451.84923492349236,209.86356446648728L451.41719171917197,209.27785454764384L450.1210621062106,210.4474852967532L448.9977497749775,210.6223150645166L447.9608460846085,209.86356446648728L447.09675967596763,208.3958997711311L445.9734473447345,208.92556312682575L445.9734473447345,207.3321146046066L447.7880288028803,205.36611977013166L447.70162016201624,204.46562391102202L448.73852385238524,204.76627196833377L449.42979297929793,204.16449012926705L451.50360036003605,204.22475585048542L451.93564356435644,203.4397739184806Z"
                        className="datamaps-subunit CHE"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M266.7619261926193,483.58379402266326L266.7619261926193,492.6558538262634L269.3541854185419,492.6558538262634L270.8231323132313,492.7971091786498L269.9590459045905,494.5015132779839L267.9716471647165,495.7913086485339L266.7619261926193,495.6475047028915L265.3793879387939,495.28853654168967L263.5648064806481,494.00260235310856L261.0589558955896,493.4342322765591L258.03465346534654,491.10981644973424L255.61521152115213,488.8859808707565L252.33168316831686,484.3889431359534L254.31908190819087,485.19786686478756L257.6890189018902,487.92213437481786L260.79972997299734,489.3699593010323L262.0958595859586,487.5107196063702L262.8735373537354,484.72553335621035L265.0337533753376,483.11584888487255ZM270.477497749775,390.55526369305693L270.73672367236725,391.172495473247L269.87263726372635,393.9191735734901L267.2803780378038,395.21156248522436L267.3667866786679,399.6171930797827L266.84833483348336,400.4784844934676L267.6260126012602,401.5698868822427L265.8978397839784,403.214393052709L264.34248424842485,405.7907806952052L263.478397839784,408.2505105314511L263.65121512151217,410.96726708190704L262.1822682268227,413.8065428157493L263.3055805580558,418.704941842031L263.91044104410446,419.23885603988646L263.91044104410446,421.92573470465595L262.5279027902791,424.74182247163424L262.61431143114316,427.2396952999032L260.79972997299734,429.1560533758104L260.79972997299734,431.90708182744277L261.5774077407741,434.89977437848563L260.10846084608465,436.0455891832038L259.503600360036,438.7780548586412L258.89873987398744,442.02843907925876L259.33078307830783,445.93083179997024L258.38028802880285,446.58845620540126L258.89873987398744,450.35572877123536L260.0220522052206,451.589822130393L259.1579657965797,453.0015694421944L260.2812781278128,453.6828097258257L260.54050405040505,454.9379235780011L259.503600360036,455.5685162900913L259.7628262826283,457.58868543042524L258.89873987398744,462.1688243551142L257.60261026102614,465.22473127825486L257.94824482448246,467.0460421695982L257.1705670567057,469.31741460859655L255.2695769576958,470.9305764562033L255.52880288028805,474.9001536047705L256.3928892889289,476.2431390309372L257.94824482448246,475.98654967644325L257.94824482448246,478.8948426994924L258.89873987398744,481.12453566502484L264.68811881188117,481.6533278838017L266.93474347434744,482.2501447300632L264.77452745274525,482.2501447300632L263.65121512151217,483.18262082843034L261.49099909991,484.6581627296149L261.0589558955896,488.40337583699466L260.10846084608465,488.47223570114977L257.3433843384339,487.1686293909845L254.5783078307831,484.3889431359534L251.64041404140417,482.11734169147013L250.86273627362738,479.67855773119163L251.5540054005401,477.40240613134335L250.34428442844285,474.9001536047705L249.99864986498653,468.57766518487995L251.03555355535553,465.1039446109886L253.62781278127812,462.40671101429444L249.91224122412243,461.3385765006043L252.24527452745275,458.28621078739604L253.02295229522952,452.6618302268728L255.7016201620162,453.853489115136L256.99774977497754,446.97304888226586L255.3559855985599,446.1498055336874L254.5783078307831,450.1880326436122L253.10936093609362,449.74152784671975L253.88703870387045,445.1117518377819L254.6647164716472,439.2015202899779L255.78802880288032,437.0924689361396L255.09675967596763,434.0701788274374L254.92394239423945,430.68029923901554L255.8744374437444,430.57836602102583L257.3433843384339,425.7378072413296L259.0715571557156,421.0921225122647L260.0220522052206,416.82100178237516L259.503600360036,412.5724948473714L260.19486948694873,410.262086147576L259.93564356435644,406.9019872078559L261.31818181818187,403.535210136634L261.75022502250226,398.35223598749553L262.5279027902791,392.853342139991L263.3055805580558,387.0483104909043L263.13276327632764,382.8824039500498L262.61431143114316,379.27203110814435L263.8240324032404,378.6305125963344L264.515301530153,377.3502437769836L265.63861386138615,379.05808757032196L265.98424842484246,380.90146772806304L267.2803780378038,381.9768883376785L266.50270027002705,384.4394420862687L267.79882988298834,387.31017927510555L268.74932493249327,390.90783573287536Z"
                        className="datamaps-subunit CHL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M424.6305130513052,322.4632122619344L423.59360936093606,322.50399209009913L421.86543654365437,322.0145637643229L420.31008100810084,322.0553553900851L417.45859585958596,322.4632122619344L415.8168316831683,323.19709134076993L413.483798379838,324.05287988844174L412.9653465346535,324.01213745504555L413.1381638163817,322.0145637643229L413.3973897389739,321.72899154332293L413.31098109810983,320.749462666724L412.27407740774083,319.76923874847057L411.5828082808281,319.60579699000334L410.8915391539154,318.9109330997238L411.40999099909993,317.8474276739415L411.15076507650764,316.70100383965064L411.2371737173717,315.96337245508226L411.66921692169217,315.96337245508226L411.75562556255625,314.9380003984413L411.5828082808281,314.4454415620307L411.8420342034203,314.1169275031476L412.7061206120612,313.829383074746L412.10126012601256,311.8963419039466L411.5828082808281,310.86634709928506L411.75562556255625,310.04140817869467L412.18766876687675,309.8763168070371L412.53330333033307,309.62861385818866L413.22457245724576,310.00013861308787L415.0391539153915,310.04140817869467L415.471197119712,309.29821897230147L415.90324032403237,309.3395261593049L416.5945094509451,309.09164924595234L416.9401440144015,310.1239407782893L417.5450045004501,309.835038489162L418.495499549955,309.4634342730827L419.6188118811881,310.00013861308787L420.0508550855086,310.7838915478312L421.0877587758776,311.31970315369324L421.95184518451845,310.7014275577109L423.0751575157516,310.61895509840036L424.71692169216925,311.2372934699761L425.32178217821786,314.69175250429987L424.3712871287129,316.7419682528651L423.68001800180025,319.44233429338095L424.71692169216925,321.5249778711305Z"
                        className="datamaps-subunit CIV"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M462.90954095409546,329.0583424116974L462.5639063906391,328.8957118809595L461.18136813681366,329.22096535938346L459.7124212421242,328.8957118809595L458.5891089108911,329.0583424116974L454.70072007200724,329.0176854988232L455.04635463546356,327.1062103574799L454.0958595859586,325.5190268033198L452.9725472547255,325.11187291720574L452.45409540954097,324.01213745504555L451.84923492349236,323.6861646583548L451.93564356435644,323.0340355465803L452.54050405040505,321.3209357569959L453.6638163816382,318.9927020068327L454.3550855085508,318.951818236836L455.8240324032403,317.5609326350502L456.68811881188117,317.51999883414493L458.07065706570654,318.5020057317099L459.7124212421242,317.68372510101665L459.8852385238524,316.660037857065L460.490099009901,315.71737860121266L460.83573357335734,314.48649779830373L462.1318631863187,313.45955116353656L462.5639063906391,311.7728099278592L463.0823582358236,311.2372934699761L463.42799279927993,309.9588668651651L464.03285328532854,308.4302429075607L466.10666066606666,306.5253235376995L466.19306930693074,305.6954648104521L466.452295229523,305.28014941867906L465.501800180018,304.2823134485892L465.5882088208821,303.4912509288797L466.2794779477948,303.36625470774885L467.22997299729974,304.9477082107094L467.4027902790279,306.5667898792521L467.3163816381638,308.18206268721565L468.6125112511251,310.4127366969683L467.3163816381638,310.3714865998627L466.62511251125113,310.53647413936085L465.501800180018,310.2889799582491L464.98334833483347,311.44330223758607L466.3658865886589,312.8839560211516L467.48919891989203,313.29513313282695L467.74842484248427,314.28119884215266L468.52610261026103,315.96337245508226L468.18046804680466,316.6190703014121L466.9707470747075,319.0744654601174L466.3658865886589,319.5240682735643L466.19306930693074,321.36174647693116L466.452295229523,322.3816494386972L466.2794779477948,323.1155654370103L467.4027902790279,324.37878675991925L467.5756075607561,325.23402753444884L468.43969396939696,326.45518888114617L469.56300630063004,327.22825805860606L469.6494149414941,328.32644201687725L469.90864086408646,329.0583424116974L469.7358235823582,330.31848928439024L467.83483348334835,329.7494403216065L465.9338433843385,329.13965481918393Z"
                        className="datamaps-subunit CMR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M505.50900090009003,326.0482100952928L505.3361836183619,328.8550530367241L506.2866786678668,329.180310320915L505.50900090009003,330.0339743228801L504.6449144914492,330.6842682201536L503.6944194419442,331.9439839331172L503.1759675967597,333.04097843048265L503.0895589558956,334.99100901930524L502.484698469847,335.8847835347974L502.484698469847,337.7131841698428L501.79342934293425,338.36340307534385L501.70702070207017,339.7860794810307L501.3613861386139,339.9893617441696L501.1885688568857,341.29067203858693L501.79342934293425,342.389121934674L501.8798379837983,345.2802271842749L502.31188118811883,347.5230286128799L502.1390639063907,348.7477963209511L502.57110711071107,350.17812538989386L503.95364536453644,351.52826911866543L505.2497749774978,354.5620149130788L504.29927992799287,354.3156931569377L501.1021602160216,354.7262649185417L500.49729972997307,355.01377158404534L499.8060306030603,356.5761102319515L500.3244824482448,357.64669839950244L499.8924392439244,360.53616194192864L499.6332133213321,362.98037649971513L500.2380738073807,363.43703863840494L501.8798379837983,364.39290143721166L502.57110711071107,363.93557484882285L502.7439243924392,366.60104752622334L500.92934293429346,366.5593107122541L499.9788478847885,365.2252430869009L499.11476147614763,364.18498562750017L497.21377137713773,363.810905288339L496.69531953195326,362.5240240179135L495.22637263726375,363.3124634095327L493.32538253825385,362.98037649971513L492.46129612961295,361.860780613325L490.9923492349235,361.6122271109172L489.8690369036904,361.69506851750384L489.6962196219622,360.9084644246293L488.9185418541854,360.867088079139L487.7952295229523,360.7429731858979L486.32628262826285,361.0739934821398L485.28937893789384,361.0326076586635L484.6845184518452,361.2395606069855L484.77092709270926,358.34744721829026L483.9932493249325,357.44070995639504L483.82043204320433,355.959070703926L484.16606660666065,354.47990059065233L483.73402340234026,353.5360872725712L483.6476147614762,352.0196293456433L480.7097209720972,352.06058600066615L480.96894689468945,351.15989133427223L479.7592259225923,351.2008162704942L479.5864086408641,351.61014728745295L478.1174617461746,351.6920314978683L477.5126012601261,353.12601423859246L477.16696669666965,353.70016344023503L475.7844284428443,353.37203805472956L475.0067506750675,353.70016344023503L473.4513951395139,353.9052969106959L472.500900090009,352.6341437050245L471.98244824482447,351.85581816152785L471.29117911791184,350.42349027695195L470.68631863186323,348.6252703829472L463.6008100810081,348.58443089466124L462.73672367236725,348.87033354514296L462.0454545454545,348.8294865436545L461.0949594959496,349.1562981782208L460.74932493249327,348.42108529969926L461.3541854185419,348.13527752729453L461.44059405940595,347.11500655196414L461.78622862286227,346.46240037402265L462.65031503150317,345.9731231017092L463.34158415841586,346.2177432118308L464.1192619261926,345.2802271842749L465.4153915391539,345.3209780243845L465.5882088208821,346.01389058009516L466.53870387038705,346.42162157416044L467.9212421242124,344.9135117745364L469.3037803780378,343.7323635921589L469.90864086408646,342.9588825936857L469.8222322232224,341.00596238971406L470.8591359135914,338.6479002690637L471.98244824482447,337.4287369620882L473.537803780378,336.2504334919118L473.79702970297035,335.51914349039464L473.8834383438344,334.6253823222288L474.3154815481548,333.7722528158941L474.14266426642666,332.43155283909584L474.48829882988304,330.31848928439024L474.92034203420343,328.8143937007476L475.6116111611161,327.5130139920178L475.7844284428443,326.0482100952928L476.04365436543657,324.37878675991925L476.9077407740774,323.15632888542063L478.20387038703876,322.3816494386972L480.1912691269127,323.19709134076993L481.7466246624663,324.09362140801085L483.47479747974796,324.33805153645113L485.28937893789384,324.7860909089192L485.98064806480653,323.3601313036705L486.32628262826285,323.15632888542063L487.449594959496,323.4008888477961L490.12826282628265,322.2185110233796L490.9923492349235,322.7078755409154L491.77002700270026,322.62632528413985L492.2020702070207,322.0553553900851L493.0661566156616,321.85138628295397L494.8807380738074,322.0961459252538L496.4360936093609,322.1777237382834L497.21377137713773,321.8921823072838L498.6827182718272,323.889904635921L499.71962196219624,324.17510172005484L500.4108910891089,323.7676634628299L501.447794779478,323.93064983238304L502.83033303330336,323.44164542049015L503.34878487848783,324.4602545552579Z"
                        className="datamaps-subunit COD"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M462.65031503150317,345.9731231017092L461.78622862286227,345.1579803273072L461.0949594959496,345.56550313888994L460.0580558055806,346.5847430934354L458.1570657065706,344.0581258361918L459.9716471647165,342.71468222629375L459.0211521152116,341.12797731809127L459.8852385238524,340.5179530323017L461.52700270027003,340.23331637661937L461.6998199819982,339.1763004133898L462.99594959495954,340.31463856945703L465.06975697569754,340.39596280078945L465.8474347434743,339.29824846321276L466.10666066606666,337.67254803667635L465.8474347434743,335.8035294259748L464.72412241224123,334.38163191058413L465.76102610261023,331.61892064327094L465.1561656165617,331.1312951366785L463.34158415841586,331.3344772001046L462.73672367236725,330.07462045464104L462.90954095409546,329.0583424116974L465.9338433843385,329.13965481918393L467.83483348334835,329.7494403216065L469.7358235823582,330.31848928439024L469.90864086408646,329.0583424116974L471.2047704770477,326.8214096440656L472.5873087308731,325.5190268033198L474.22907290729074,325.9261022308678L475.7844284428443,326.0482100952928L475.6116111611161,327.5130139920178L474.92034203420343,328.8143937007476L474.48829882988304,330.31848928439024L474.14266426642666,332.43155283909584L474.3154815481548,333.7722528158941L473.8834383438344,334.6253823222288L473.79702970297035,335.51914349039464L473.537803780378,336.2504334919118L471.98244824482447,337.4287369620882L470.8591359135914,338.6479002690637L469.8222322232224,341.00596238971406L469.90864086408646,342.9588825936857L469.3037803780378,343.7323635921589L467.9212421242124,344.9135117745364L466.53870387038705,346.42162157416044L465.5882088208821,346.01389058009516L465.4153915391539,345.3209780243845L464.1192619261926,345.2802271842749L463.34158415841586,346.2177432118308Z"
                        className="datamaps-subunit COG"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M250.6035103510351,334.82850797509315L249.56660666066608,334.25975663347293L248.35688568856887,333.48787185799L247.7520252025203,333.8535039068273L245.67821782178217,333.5284979412632L245.0733573357336,332.51281165103745L244.64131413141317,332.55344079729036L242.22187218721874,331.1719321204308L241.9626462646265,330.44041874154277L242.82673267326734,330.2372011671228L242.74032403240327,329.0583424116974L243.2587758775878,328.163774542058L244.46849684968498,328.0010982303567L245.505400540054,326.4958828383475L246.36948694869488,325.23402753444884L245.505400540054,324.6639087436285L245.93744374437446,323.27861328670906L245.41899189918993,321.0760470384269L245.93744374437446,320.4228010696259L245.5918091809181,318.3793002435429L244.55490549054906,317.11057795960267L244.9005400540054,315.9223775911002L245.67821782178217,316.08634724580537L246.11026102610262,315.38929379391766L245.5918091809181,313.95262730555527L245.85103510351038,313.58284510502307L247.06075607560757,313.665031797801L248.87533753375342,311.9786865132691L249.91224122412243,311.7316285707737L249.91224122412243,310.9075717200465L250.34428442844285,308.84369072469195L251.72682268226825,307.7268451041974L253.1957695769577,307.685447397249L253.45499549954997,307.14705751964664L255.2695769576958,307.35417906621785L257.1705670567057,306.11052153672887L258.1210621062106,305.5708975323853L259.33078307830783,304.40712754413653L260.10846084608465,304.53191725368043L260.79972997299734,305.19705495289327L260.2812781278128,306.02753069541444L258.7259225922592,306.4423833267952L258.1210621062106,307.6440472917341L257.25697569756977,308.34752552355957L256.5657065706571,309.2569095376777L256.22007200720077,310.99001467069877L255.52880288028805,312.4314397164847L256.8249324932493,312.59601824536446L257.0841584158416,313.70612237498625L257.60261026102614,314.24013369979497L257.8618361836184,315.22521099716494L257.51620162016206,316.127335587997L257.60261026102614,316.6190703014121L258.2074707470747,316.82389238596147L258.81233123312336,317.64279576480527L261.9230423042304,317.4381267418701L263.3055805580558,317.7246529563571L264.9473447344735,319.81009594387325L265.8978397839784,319.5649332879261L267.6260126012602,319.687520471906L269.00855085508556,319.4014653202552L269.87263726372635,319.81009594387325L269.44059405940595,321.11686474763684L268.9221422142215,321.9329772265418L268.74932493249327,323.6454138385928L269.1813681368137,325.274744116062L269.87263726372635,325.9668055963335L269.9590459045905,326.4958828383475L268.74932493249327,327.7163927348266L269.6134113411341,328.24510936982017L270.3046804680468,329.0989988506312L270.9959495949595,331.45638311117534L270.5639063906391,331.78145417486365L270.04545454545456,330.3591327957204L269.44059405940595,329.5868404459358L268.5765076507651,330.44041874154277L263.91044104410446,330.3591327957204L263.99684968496854,331.8627195114611L265.3793879387939,332.1065101451691L265.29297929792983,333.04097843048265L264.77452745274525,332.7972122622501L263.478397839784,333.20348664502285L263.478397839784,334.9097584226606L264.515301530153,335.8035294259748L264.8609360936093,337.1849351469639L264.8609360936093,338.2008407840457L263.73762376237624,344.7912898844294L262.5279027902791,343.52878862321484L261.83663366336634,343.4880760192477L263.3919891989199,341.00596238971406L261.5774077407741,339.90804742042275L260.10846084608465,340.1113368472148L259.24437443744375,339.7047698440631L257.94824482448246,340.31463856945703L256.1336633663367,340.03001962596784L254.7511251125113,337.510006253589L253.62781278127812,336.90051037606514L252.85013501350136,335.7629025462649L251.20837083708375,334.6253823222288Z"
                        className="datamaps-subunit COL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M232.3712871287129,314.69175250429987L231.07515751575158,314.1169275031476L230.55670567056708,313.62393937573074L230.90234023402343,313.212912860377L230.81593159315935,312.6782958383447L230.12466246624666,312.1021884409193L229.17416741674168,311.60807235125156L228.31008100810084,311.27849934381504L228.22367236723676,310.577715683256L227.53240324032404,310.16520381993905L227.7052205220522,310.86634709928506L227.27317731773178,311.44330223758607L226.66831683168317,310.74266060951174L225.8906390639064,310.53647413936085L225.54500450045006,310.04140817869467L225.63141314131414,309.29821897230147L225.8906390639064,308.51295097676496L225.19936993699372,308.18206268721565L225.80423042304233,307.685447397249L226.14986498649864,307.39559607073056L227.7052205220522,308.0165622196603L228.31008100810084,307.7268451041974L229.0877587758776,307.93379779658045L229.43339333933397,308.4302429075607L230.12466246624666,308.59564976213903L230.72952295229524,308.05794087805197L231.33438343834385,309.3808311025374L232.2848784878488,310.3714865998627L233.4081908190819,311.40210459677746L232.457695769577,311.64925978626377L232.457695769577,312.59601824536446L232.9761476147615,312.9662066535948L232.63051305130514,313.25402393782616L232.71692169216925,313.70612237498625L232.54410441044107,314.19906676500244Z"
                        className="datamaps-subunit CRI"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M234.0994599459946,277.264052628148L236.0868586858686,277.4407803665858L237.9878487848785,277.4407803665858L240.23447344734473,278.3671467176862L241.18496849684973,279.29110516147404L243.43159315931595,279.02735993806823L244.29567956795682,279.598564508048L246.36948694869488,281.21942135516304L247.83843384338437,282.3977635008181L248.61611161116116,282.3541867170055L250.0850585058506,282.87677963901945L249.91224122412243,283.6159041020866L251.64041404140417,283.7027671937737L253.45499549954997,284.74362339032353L253.1957695769577,285.34952703734854L251.5540054005401,285.6521353207278L249.99864986498653,285.7817550482006L248.35688568856887,285.60891949239203L244.9005400540054,285.8249523873804L246.45589558955896,284.44032473614294L245.505400540054,283.74619146786944L243.95004500450048,283.5724652747463L243.17236723672372,282.8332575120236L242.56750675067508,281.3942240746126L241.18496849684973,281.48159476641683L238.93834383438346,280.78205489061077L238.24707470747077,280.25653114353366L235.13636363636368,279.818018757571L234.2722772277228,279.3350439385881L235.22277227722776,278.6753980356719L232.80333033303333,278.5433229737369L231.07515751575158,279.90576339161817L230.12466246624666,279.9496277863994L229.77902790279032,280.5631777849671L228.5693069306931,280.8695694490849L227.53240324032404,280.6069635930904L228.82853285328534,279.818018757571L229.3469846984699,278.8514222108283L230.470297029703,278.27902585043034L231.6800180018002,277.7939688285213L233.49459945994602,277.52911079587096Z"
                        className="datamaps-subunit CUB"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M510.0886588658866,244.32413067064925L510.26147614761476,244.2744511763563L510.60711071107113,243.57784914105767L512.3352835283529,243.62767411409862L514.495499549955,242.72921758279176L512.8537353735373,243.9761568731035L513.0265526552655,244.5227454704352L512.7673267326733,244.42345868877953L512.3352835283529,244.67159847512755L511.98964896489656,244.62199108447567L511.8168316831683,244.72119559964625L511.8168316831683,244.42345868877953L511.64401440144013,244.22476134707028L511.1255625562556,244.22476134707028L510.52070207020705,244.47310722986026Z"
                        className="datamaps-subunit -99"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M513.0265526552655,244.5227454704352L513.1129612961296,244.770782466607L510.6935193519352,245.95781217810702L509.483798379838,245.56278428011788L508.8789378937894,244.42345868877953L510.0886588658866,244.32413067064925L510.52070207020705,244.47310722986026L511.1255625562556,244.22476134707028L511.64401440144013,244.22476134707028L511.8168316831683,244.42345868877953L511.8168316831683,244.72119559964625L511.98964896489656,244.62199108447567L512.3352835283529,244.67159847512755L512.7673267326733,244.42345868877953Z"
                        className="datamaps-subunit CYP"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M455.30558055805585,175.81626896330872L455.39198919891993,177.43696350688433L457.8114311431143,178.41589916065436L457.7250225022502,179.87376938798988L460.23087308730874,179.11168646526593L461.52700270027003,177.99704962180653L464.2920792079208,179.59704395630703L465.4153915391539,180.90749849234447L465.9338433843385,182.95636327010317L465.24257425742576,184.03916174647378L466.19306930693074,185.45008614205764L466.71152115211527,187.51209365328424L466.53870387038705,188.89519332920125L467.5756075607561,191.30585083054652L466.452295229523,191.6936796812061L465.8474347434743,191.30585083054652L465.24257425742576,192.01622216210387L463.514401440144,192.7237559569143L462.65031503150317,193.68405600223292L460.83573357335734,194.51215093854924L461.26777677767774,195.58929185082798L461.52700270027003,197.1616842737648L462.73672367236725,198.09858804680016L464.1192619261926,199.6494283773862L463.2551755175518,201.3096708027947L462.39108910891093,201.79872392147445L462.73672367236725,204.10420488986387L462.5639063906391,204.70618110816244L461.78622862286227,203.98357578483464L460.6629162916292,203.86286839185172L458.93474347434744,204.5257923092684L456.7745274527453,204.3452288099114L456.42889288928893,205.30622151861914L455.2191719171918,204.3452288099114L454.5279027902791,204.5257923092684L451.93564356435644,203.4397739184806L451.50360036003605,204.22475585048542L449.42979297929793,204.16449012926705L449.68901890189017,201.6154812623737L450.89873987398744,199.15459555440424L447.44239423942395,198.4719976493268L446.3190819081908,197.47452470287533L446.49189918991897,195.84179950955343L445.9734473447345,195.01984746894044L446.3190819081908,192.46679734886973L445.88703870387036,188.4353753390054L447.35598559855987,188.4353753390054L447.9608460846085,186.982300737606L448.479297929793,183.36321235296296L448.04725472547256,182.00327908942825L448.5657065706571,181.1134937391507L450.5531053105311,180.90749849234447L450.9851485148515,181.79835479243144L452.6269126912691,179.80463027379963L452.10846084608465,178.27639788658968L451.93564356435644,175.8870596735955L453.75022502250226,176.45231412209648Z"
                        className="datamaps-subunit DEU"
                        data-info='{"active":{"value":"8,408","percent":"5.4","isGrown":false},"new":{"value":"1001","percent":"5.1","isGrown":true},"fillKey":"MAJOR","short":"de"}'
                        style={{
                          fill: 'rgb(79, 70, 229)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M534.8879387938794,303.7411679466829L535.492799279928,304.53191725368043L535.4063906390639,305.5293699146505L534.0238523852386,306.11052153672887L535.0607560756076,306.77408410487055L534.1966696669667,308.0993171728546L533.5918091809181,307.6440472917341L533.0733573357336,307.85102387254597L531.6908190819082,307.8096333379568L531.6908190819082,307.064191783622L531.5180018001801,306.3594330526645L532.2956795679568,305.2386035008484L533.1597659765977,304.157474859422L534.1966696669667,304.365525560489Z"
                        className="datamaps-subunit DJI"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M461.9590459045904,173.17575244202493L460.490099009901,176.59333131078128L457.98424842484246,174.25126258609936L457.63861386138615,172.45487089233887L461.18136813681366,171.07652102896424ZM455.30558055805585,175.81626896330872L453.75022502250226,176.45231412209648L451.93564356435644,175.8870596735955L450.9851485148515,173.60678870779194L450.89873987398744,169.1715702501287L451.3307830783079,167.98826162005219L452.0220522052205,166.72158733145804L454.0958595859586,166.42211829917568L454.9599459945995,165.21872741419523L456.8609360936094,163.93032289795607L456.7745274527453,166.19715635658685L456.0832583258326,167.69109912042688L456.42889288928893,168.8765396335069L457.7250225022502,169.53961744935208L457.1201620162016,171.14935199845146L456.42889288928893,170.7118849943711L454.70072007200724,173.75022027168097Z"
                        className="datamaps-subunit DNK"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M259.4171917191719,286.21352154213275L259.6764176417642,285.7817550482006L261.5774077407741,285.7817550482006L262.9599459945995,286.4292332039805L263.65121512151217,286.38609997863284L264.0832583258326,287.2909497232137L265.3793879387939,287.247906484716L265.29297929792983,287.97903950328083L266.32988298829883,288.06497157564934L267.53960396039605,289.0090798224342L266.6755175517552,290.0366635864691L265.465796579658,289.4803568271549L264.42889288928893,289.6087981611001L263.65121512151217,289.4803568271549L263.2191719171917,289.9511238883894L262.26867686768685,290.0794272004491L261.9230423042304,289.4803568271549L261.0589558955896,289.8227830978232L260.10846084608465,291.57357105284063L259.503600360036,291.14718035335085L259.4171917191719,290.4213870696054L259.4171917191719,289.73720168876304L258.81233123312336,289.0090798224342L259.4171917191719,288.5801985415083L259.5900090009001,287.59212805229816Z"
                        className="datamaps-subunit DOM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M515.2731773177318,260.34286232570224L514.6683168316831,261.41431995696695L514.1498649864986,263.49902214735056L513.4585958595859,264.926448848473L512.9401440144014,265.38543209892214L512.0760576057606,264.51275184951135L511.0391539153915,263.31432710778085L509.31098109810983,259.360973278154L509.0517551755176,259.5950716981583L510.0886588658866,262.5280505691161L511.55760576057605,265.2478119416387L513.3721872187218,269.4398189393372L514.2362736273627,270.8846520112987L515.0139513951394,272.41263602357657L517.1741674167416,275.31406884234235L516.6557155715572,275.7582209219447L516.7421242124212,277.4849483635056L519.5936093609361,279.818018757571L519.9392439243925,280.3441705889919L510.434293429343,280.3441705889919L501.1885688568857,280.3441705889919L491.510801080108,280.3441705889919L491.510801080108,270.65933209570005L491.510801080108,261.0421019919397L490.81953195319534,258.8452567163381L491.42439243924395,257.10340230007955L490.9923492349235,255.92008382534104L491.85643564356434,254.5408105776118L495.05355535553554,254.5408105776118L497.38658865886595,255.25512581952438L499.8060306030603,256.1097667781612L500.92934293429346,256.53606148034714L502.7439243924392,255.6353057624882L503.6944194419442,254.82676909864315L505.8546354635464,254.58849193677943L507.5828082808281,254.96963195084413L508.18766876687675,256.3466810473674L508.7925292529253,255.44528396263235L510.6935193519352,256.1097667781612L512.5945094509451,256.25194054605834L513.7178217821782,255.5403118766621Z"
                        className="datamaps-subunit EGY"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M533.1597659765977,304.157474859422L532.2956795679568,303.3245836869599L531.3451845184519,301.90606854296516L530.3082808280828,301.1118932953508L529.6170117011701,300.23284757766777L527.5432043204321,299.2685058390104L525.9014401440145,299.2265397858414L525.2965796579658,298.72269527842633L523.9140414041404,299.3104686824917L522.445094509451,298.1763331295432L521.7538253825383,300.023349957816L518.9023402340234,299.47828804257557L518.6431143114312,298.51262176817727L519.6800180018002,294.8437361252425L519.9392439243925,293.19025190486883L520.7169216921692,292.4251589884678L522.445094509451,291.99956244508917L523.6548154815482,290.54955400821433L525.0373537353736,293.4874519679961L525.7286228622862,295.77400201152255L527.0247524752475,296.9976363879038L530.3082808280828,299.3104686824917L531.6908190819082,300.73532516045975L532.9869486948695,302.1566380848784L533.6782178217823,302.99111389462183L534.8879387938794,303.7411679466829L534.1966696669667,304.365525560489Z"
                        className="datamaps-subunit ERI"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M409.85463546354634,223.58227190117566L409.9410441044105,221.27747884748675L408.9905490549055,219.89308373463686L412.3604860486049,217.48940882322177L415.2983798379838,218.10705791243697L418.495499549955,218.05098702873687L421.0877587758776,218.61098869081326L423.0751575157516,218.44315291209037L426.96354635463547,218.55505907785067L427.91404140414045,219.83751015755396L432.32088208820886,221.3326584153413L433.1849684968497,220.6141510344711L435.8636363636364,222.10360556423382L438.6287128712871,221.6634217406686L438.8015301530153,223.58227190117566L436.55490549054906,225.69957845155324L433.44419441944194,226.34674545293296L433.2713771377138,227.42093833329136L431.71602160216025,229.18150143811766L430.85193519351935,231.71670822582587L431.80243024302433,233.49470008194294L430.4198919891989,234.8446906200661L429.90144014401443,236.85442400814117L428.0868586858686,237.41803242324445L426.35868586858686,239.7599055987588L423.3343834383438,239.81055071537847L421.0013501350135,239.7599055987588L419.532403240324,240.82112740347816L418.5819081908191,241.927706221976L417.45859585958596,241.67667132205662L416.50810081008103,240.66982188575406L415.8168316831683,238.948061983043L413.57020702070207,238.49013197897327L413.3973897389739,237.46919987621135L414.26147614761476,236.3408258707995L414.60711071107113,235.5166132288013L413.82943294329436,234.63753563108133L414.4342934293429,232.60751359149975L413.483798379838,230.7167553369713L414.52070207020705,230.45283837555564L414.60711071107113,229.0220516875774L415.0391539153915,228.5429849993089L415.0391539153915,226.07733590986854L416.1624662466247,225.21288297000444L415.471197119712,223.58227190117566L414.0886588658866,223.47310552959894L413.65661566156615,223.90942442532793L412.27407740774083,223.90942442532793L411.66921692169217,222.3233419182442L410.71872187218725,222.76210758741297Z"
                        className="datamaps-subunit ESP"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M489.8690369036904,163.6256809293397L490.12826282628265,160.93537001067378L489.2641764176418,161.55425169747997L487.7088208820882,159.9245988158033L487.53600360036006,157.25062271056012L490.5603060306031,155.89671675537193L493.58460846084614,155.25559145840228L496.1768676867687,156.05659642530702L498.6827182718272,155.89671675537193L499.02835283528356,156.69451978115663L497.3001800180018,159.37769990307382L497.9914491449145,163.6256809293397L496.9545454545455,165.0676780737706L495.05355535553554,165.0676780737706L492.97974797479753,163.39682411337174L491.85643564356434,162.8615671547083Z"
                        className="datamaps-subunit EST"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M533.1597659765977,304.157474859422L532.2956795679568,305.2386035008484L531.5180018001801,306.3594330526645L531.6908190819082,307.064191783622L531.6908190819082,307.8096333379568L533.0733573357336,307.85102387254597L533.5918091809181,307.6440472917341L534.1966696669667,308.0993171728546L533.6782178217823,308.9676802383657L534.542304230423,310.2889799582491L535.4063906390639,311.4844978296393L536.3568856885688,312.34913872016864L544.1336633663366,315.22521099716494L546.2074707470747,315.22521099716494L539.3811881188119,322.4632122619344L536.2704770477047,322.58554859758885L534.1102610261025,324.25657841994723L532.6413141314131,324.29731542432523L531.9500450045005,325.07115307536833L530.3082808280828,325.07115307536833L529.3577857785779,324.25657841994723L527.1111611161116,325.274744116062L526.419891989199,326.2517084898851L524.8645364536453,326.08891123594555L524.3460846084608,325.8039876275651L523.7412241224123,325.84469325006415L522.9635463546355,325.84469325006415L519.9392439243925,323.8084114547435L518.2974797479749,323.8084114547435L517.433393339334,322.99326909734657L517.433393339334,321.64738945848205L516.2236723672368,321.23931084607364L514.7547254725473,318.62469855317346L513.7178217821782,318.05202292908825L513.2857785778577,317.11057795960267L512.0760576057606,315.9223775911002L510.60711071107113,315.75838170088974L511.3847884788479,314.3633237645243L512.6809180918092,314.28119884215266L513.0265526552655,313.54174898192446L513.0265526552655,311.3609049034134L513.7178217821782,308.80235631188236L514.8411341134113,308.14069110794924L515.1003600360036,307.14705751964664L516.1372637263727,305.28014941867906L517.6062106210621,304.03261166891684L518.5567056705671,301.6136030822035L518.9023402340234,299.47828804257557L521.7538253825383,300.023349957816L522.445094509451,298.1763331295432L523.9140414041404,299.3104686824917L525.2965796579658,298.72269527842633L525.9014401440145,299.2265397858414L527.5432043204321,299.2685058390104L529.6170117011701,300.23284757766777L530.3082808280828,301.1118932953508L531.3451845184519,301.90606854296516L532.2956795679568,303.3245836869599Z"
                        className="datamaps-subunit ETH"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M859.6116111611161,376.7540208800583L860.3892889288929,377.4781071208766L860.0436543654366,378.8014928494531L858.574707470747,379.14365244684757L857.1921692169217,378.8442482556006L857.0193519351935,377.73394198601494L857.8834383438343,376.8391481788948L859.0067506750675,377.1798151392356ZM863.5,374.8005218376685L861.9446444644464,375.3940959664654L860.475697569757,375.9460898395909L860.1300630063006,374.9699211061252L861.3397839783977,374.4614047786636L862.1174617461745,374.3343590007092L863.5,373.5730137607437L863.5,374.8005218376685ZM-0.49999999999994316,373.5730137607437L-0.4995679999999538,373.57277507509986L-0.49999999999994316,374.80035617027465L-0.49999999999994316,374.80035617027465L-0.49999999999994316,374.8005218376685L-0.49999999999994316,373.5730137607437ZM-0.49999999999994316,373.57277507509986L0.01845184518458609,373.4459584563L-0.3271827182717857,374.63085082059115L-0.49999999999994316,374.80035617027465Z"
                        className="datamaps-subunit FJI"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M284.6485148514852,480.531553592038L287.5,478.17949261582453L289.5738073807381,479.1556927049538L290.9563456345635,477.5963574596491L292.85733573357334,479.3515846404194L292.16606660666065,480.7289907072187L288.96894689468945,481.8520394683434L287.8456345634564,480.531553592038L285.8582358235824,482.2501447300632Z"
                        className="datamaps-subunit FLK"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M300.6341134113411,328.9363702370143L301.23897389738977,327.91975668937704L301.498199819982,326.8214096440656L301.8438343834384,325.7632812455599L300.9797479747975,324.37878675991925L300.72052205220524,322.7078755409154L302.01665166516653,320.626973717632L302.7943294329433,320.9127643894524L304.6089108910891,321.48417173815943L307.11476147614763,323.5231556659971L307.54680468046803,324.5009871343153L306.07785778577863,326.6993422157759L305.3865886588659,328.48910088291484L304.4360936093609,329.38358095180655L303.31278127812783,329.54618941670407L302.96714671467146,328.8957118809595L302.448694869487,328.7737338694691L301.67101710171016,329.4242337273416Z"
                        className="datamaps-subunit GUF"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M416.5945094509451,180.42587260960426L414.7799279927993,179.59704395630703L413.31098109810983,179.66626758694102L413.82943294329436,177.43696350688433L413.31098109810983,175.17780506255204L415.2983798379838,175.03559341527992L417.8906390639064,177.64721360018515ZM424.2848784878488,159.8465840415022L421.6926192619262,164.68944141052734L424.1984698469847,164.0824301242317L426.7907290729073,164.15843043764266L426.1858685868587,167.76544016881257L424.02565256525656,171.65827475229395L426.531503150315,171.94838831548083L426.7043204320432,172.38261066600018L428.86453645364537,177.29665107354873L430.506300630063,177.99704962180653L431.9752475247525,182.6165841513609L432.6665166516652,184.24143009837903L435.51800180018006,184.98105768197576L435.2587758775878,187.51209365328424L434.04905490549055,188.63258816700693L434.9995499549955,190.59261154799617L432.83933393339333,192.59532314766125L429.64221422142214,192.59532314766125L425.494599459946,193.62019691342388L424.3712871287129,192.85209595586358L422.8159315931593,194.63921016200442L420.5693069306931,194.1941072292995L418.9275427542754,195.65245204808235L417.63141314131417,194.89305825524312L421.1741674167417,190.91716871271413L423.3343834383438,190.07207311663834L423.24797479747974,190.07207311663834L419.532403240324,189.4846197226698L418.84113411341133,187.90838395877094L421.34698469846984,186.71679818728148L420.0508550855086,184.57801749870941L420.482898289829,181.9349982646004L424.11206120612064,182.34427520833L424.457695769577,179.94288038793093L422.8159315931593,177.43696350688433L422.8159315931593,177.366821880901L419.87803780378044,176.66379561210152L419.2731773177318,175.53280720092366L420.1372637263727,173.60678870779194L419.35958595859586,172.45487089233887L418.06345634563456,174.46553593008264L417.9770477047705,170.34644379945428L416.76732673267327,168.1366415443619L417.63141314131417,163.54943113764202L419.44599459945994,159.8465840415022L421.433393339334,160.15841672440285Z"
                        className="datamaps-subunit GBR"
                        data-info='{"active":{"value":"4,889","percent":"9.1","isGrown":false},"new":{"value":"2,001","percent":"3.2","isGrown":true},"fillKey":"MAJOR","short":"gb"}'
                        style={{
                          fill: 'rgb(79, 70, 229)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M531.2587758775878,224.72504614395L531.6044104410441,223.30924732093465L530.9995499549955,221.1118501473778L529.6170117011701,219.89308373463686L528.2344734473447,219.55941202153366L527.3703870387039,218.49911382282218L527.7160216021603,218.16311304457287L529.7034203420342,218.72280104501982L533.2461746174617,219.22518594324208L536.529702970297,220.78018659295853L536.9617461746175,221.38782300537295L538.4306930693069,220.89080140364553L540.5909090909091,221.60833184589683L541.368586858686,222.9264027136926L542.8375337533754,223.6368333940317L542.2326732673267,224.12723827306885L543.442394239424,225.86155816170253L543.0967596759676,226.23902323830328L541.8006300630063,226.02341235125272L539.9860486048605,225.10457373083807L539.467596759676,225.6455572656958L536.0976597659766,226.13124556934008L533.7646264626462,224.56217871242924Z"
                        className="datamaps-subunit GEO"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M434.04905490549055,320.218597528098L430.24707470747074,321.64738945848205L428.95094509450945,322.4632122619344L426.7907290729073,323.15632888542063L424.6305130513052,322.4632122619344L424.71692169216925,321.5249778711305L423.68001800180025,319.44233429338095L424.3712871287129,316.7419682528651L425.32178217821786,314.69175250429987L424.71692169216925,311.2372934699761L424.3712871287129,309.3808311025374L424.457695769577,308.0165622196603L428.60531053105314,307.89241202412506L429.64221422142214,308.05794087805197L430.4198919891989,307.685447397249L431.5432043204321,307.89241202412506L431.37038703870394,308.6369956830621L432.40729072907294,309.8763168070371L432.40729072907294,311.64925978626377L432.5801080108011,313.58284510502307L433.1849684968497,314.4454415620307L432.6665166516652,316.660037857065L432.83933393339333,317.8474276739415L433.530603060306,319.3605950202363Z"
                        className="datamaps-subunit GHA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M411.2371737173717,315.96337245508226L410.54590459045903,315.9223775911002L410.11386138613864,316.9058102859088L409.42259225922595,316.8648521132321L408.9041404140414,316.3732317260135L409.0769576957696,315.38929379391766L408.1264626462646,313.91154771892144L407.4351935193519,314.19906676500244L406.91674167416744,314.24013369979497L406.31188118811883,314.3633237645243L406.31188118811883,313.5006510026806L405.96624662466246,312.84282783232254L405.96624662466246,312.1433517689263L405.447794779478,311.11366342665417L404.8429342934294,310.247723406091L402.85553555355534,310.247723406091L402.33708370837087,310.7014275577109L401.6458145814582,310.74266060951174L401.3001800180018,311.27849934381504L400.9545454545455,311.9786865132691L399.7448244824482,313.04844965086556L398.62151215121514,311.60807235125156L397.7574257425743,310.61895509840036L397.0661566156616,310.33023435489787L396.547704770477,309.835038489162L396.2020702070207,308.7610196051781L395.85643564356434,308.2234319145327L395.16516651665165,307.8096333379568L396.2884788478848,306.6082537167683L396.97974797479753,306.69117389537394L397.58460846084614,306.2764726838982L398.1030603060306,306.2764726838982L398.53510351035106,305.9445296336415L398.27587758775877,305.11394995076876L398.53510351035106,304.86457140932856L398.62151215121514,304.03261166891684L399.7448244824482,304.07423547255405L401.47299729973,304.6566826847359L401.9914491449145,304.61509689869473L402.2506750675068,304.3239208633018L403.54680468046803,304.53191725368043L403.8924392439244,304.365525560489L403.9788478847885,305.28014941867906L404.4108910891089,305.28014941867906L405.01575157515754,304.9477082107094L405.447794779478,305.0308343806119L406.0526552655266,305.65394497633764L407.0895589558956,305.8615183199075L407.7808280828083,305.3216927103439L408.5585058505851,304.9892726226117L409.0769576957696,304.6566826847359L409.5954095409541,304.6982657851031L410.11386138613864,305.2386035008484L410.3730873087309,305.9445296336415L411.40999099909993,306.9398747418618L410.8915391539154,307.602644783761L410.8051305130513,308.3888853818458L411.3235823582358,308.14069110794924L411.5828082808281,308.4302429075607L411.496399639964,309.1329677095734L412.18766876687675,309.8763168070371L411.75562556255625,310.04140817869467L411.5828082808281,310.86634709928506L412.10126012601256,311.8963419039466L412.7061206120612,313.829383074746L411.8420342034203,314.1169275031476L411.5828082808281,314.4454415620307L411.75562556255625,314.9380003984413L411.66921692169217,315.96337245508226Z"
                        className="datamaps-subunit GIN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M391.1039603960396,302.65746197417343L391.36318631863185,301.5300147685302L394.0418541854186,301.48821613242563L394.5603060306031,300.9027192505624L395.33798379837987,300.8608753115152L396.2884788478848,301.4464145047085L396.97974797479753,301.48821613242563L397.7574257425743,301.07006455947453L398.27587758775877,301.7807439894446L397.23897389738977,302.3236258607376L396.2020702070207,302.28188329243534L395.16516651665165,301.73896321747094L394.3010801080108,302.3236258607376L393.8690369036904,302.3653655186822L393.2641764176418,302.69917849488496Z"
                        className="datamaps-subunit GMB"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M395.16516651665165,307.8096333379568L393.8690369036904,306.81553548099606L392.9185418541854,306.6497150541689L392.3136813681368,305.9445296336415L392.4000900090009,305.5708975323853L391.62241224122414,305.0308343806119L391.449594959496,304.53191725368043L392.7457245724572,304.1158565347247L393.52340234023404,304.1990904506382L394.21467146714673,303.9077237692529L398.62151215121514,304.03261166891684L398.53510351035106,304.86457140932856L398.27587758775877,305.11394995076876L398.53510351035106,305.9445296336415L398.1030603060306,306.2764726838982L397.58460846084614,306.2764726838982L396.97974797479753,306.69117389537394L396.2884788478848,306.6082537167683Z"
                        className="datamaps-subunit GNB"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M454.26867686768674,332.0658789121919L453.83663366336634,331.7001878949318L454.70072007200724,329.0176854988232L458.5891089108911,329.0583424116974L458.5891089108911,331.9439839331172L455.13276327632764,331.90335183488236Z"
                        className="datamaps-subunit GNQ"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M215.26237623762378,301.1955416861159L214.05265526552657,300.777178270563L212.5837083708371,300.73532516045975L211.46039603960398,300.23284757766777L210.16426642664268,299.2265397858414L210.2506750675068,298.47059722874L210.50990099009906,297.92397740323224L210.16426642664268,297.4189039547114L211.28757875787582,295.393649545L214.3982898289829,295.393649545L214.484698469847,294.5473736808648L214.05265526552657,294.37794273952727L213.7934293429343,293.8692933814825L212.92934293429343,293.2751852660139L211.9788478847885,292.4251589884678L213.1021602160216,292.4251589884678L213.1021602160216,291.0191846096612L215.34878487848786,291.0191846096612L217.5954095409541,291.0191846096612L217.50900090009003,293.0203392515218L217.33618361836184,295.8584855131079L218.02745274527453,295.8584855131079L218.89153915391543,296.3228917715097L219.0643564356436,295.94295480948L219.75562556255628,296.238485975063L218.63231323132317,297.2083128598469L217.50900090009003,297.88190643814306L217.33618361836184,298.38653827903084L217.50900090009003,298.8487001853856L217.0769576957696,299.47828804257557L216.472097209721,299.64605637961927L216.64491449144919,299.939528992598L216.12646264626466,300.19095429927967L215.34878487848786,300.8190283195482Z"
                        className="datamaps-subunit GTM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M288.10486048604866,314.32226219581594L289.6602160216022,315.22521099716494L291.12916291629165,316.78293110040386L291.2155715571557,318.05202292908825L292.07965796579657,318.09293762207335L293.3757875787579,319.27885042490385L294.32628262826285,320.1369073593779L293.9806480648065,322.3000823688197L292.511701170117,322.9117331728024L292.5981098109811,323.4824010253562L292.16606660666065,324.74536437442055L293.2893789378938,326.45518888114617L294.06705670567055,326.4958828383475L294.32628262826285,327.838412853611L295.79522952295235,329.9120335819811L295.1903690369037,329.9933278025533L293.8942394239424,329.7900892479935L293.11656165616563,330.44041874154277L291.9932493249325,330.84682785774913L291.3019801980198,330.96874423980347L291.04275427542757,331.45638311117534L289.83303330333035,331.3344772001046L288.3640864086409,330.19655655407723L288.19126912691274,329.0989988506312L287.5864086408641,327.87908506012536L287.93204320432045,325.8039876275651L288.62331233123314,324.98971091603585L288.0184518451846,323.84915851124083L287.24077407740776,323.4824010253562L287.5864086408641,322.4224313793385L286.9815481548155,321.8921823072838L285.7718271827183,321.9737710443482L284.13006300630065,320.1369073593779L284.73492349234925,319.48320194326647L284.73492349234925,318.3793002435429L286.2038703870387,317.97018919609746L286.80873087308726,317.51999883414493L285.94464446444647,316.6190703014121L286.2038703870387,315.75838170088974Z"
                        className="datamaps-subunit GUY"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M221.91584158415844,303.0328075365083L221.483798379838,302.28188329243534L220.79252925292528,302.07312665377077L220.96534653465346,301.07006455947453L220.61971197119712,300.8190283195482L220.10126012601262,300.65160974049195L219.0643564356436,300.9445601407871L218.9779477947795,300.6097474224203L218.2866786678668,300.19095429927967L217.7682268226823,299.68799052261227L217.0769576957696,299.47828804257557L217.50900090009003,298.8487001853856L217.33618361836184,298.38653827903084L217.50900090009003,297.88190643814306L218.63231323132317,297.2083128598469L219.75562556255628,296.238485975063L220.0148514851485,296.36508941117444L220.53330333033304,295.9007219348039L221.22457245724578,295.8584855131079L221.483798379838,296.0696321941922L221.82943294329436,295.94295480948L222.95274527452747,296.1962778097472L224.0760576057606,296.11185092358375L224.85373537353738,295.8584855131079L225.11296129612964,295.5627308846969L225.8906390639064,295.68950427044024L226.4090909090909,295.8584855131079L227.10036003600362,295.816245540109L227.53240324032404,295.6049922555498L228.65571557155718,295.94295480948L229.00135013501352,295.98518414141734L229.77902790279032,296.44947419470844L230.470297029703,296.9976363879038L231.33438343834385,297.3767925405311L231.93924392439246,298.09222787167465L231.16156615661566,298.00810930743376L230.81593159315935,298.3445038603901L229.95184518451848,298.6806871207075L229.3469846984699,298.6806871207075L228.82853285328534,299.0166612292211L228.31008100810084,298.8906953128771L227.96444644464447,298.51262176817727L227.7052205220522,298.5966609971274L227.3595859585959,299.1845705188301L227.10036003600362,299.1425980338207L227.10036003600362,299.64605637961927L226.23627362736275,300.3585087420144L225.80423042304233,300.65160974049195L225.54500450045006,300.9445601407871L224.85373537353738,300.4422673337334L224.33528352835287,301.1118932953508L223.81683168316832,301.07006455947453L223.29837983798382,301.15371900286846L223.29837983798382,302.3653655186822L222.95274527452747,302.3653655186822L222.6935193519352,302.9494174069906Z"
                        className="datamaps-subunit HND"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M476.6485148514851,210.1557475159096L477.2533753375337,211.49408512672883L478.03105310531055,212.4773480040127L477.08055805580557,213.74244368469778L476.04365436543657,212.99588336202294L474.40189018901896,213.05341295303234L472.32808280828084,212.4773480040127L471.2047704770477,212.5926979953514L470.68631863186323,213.28336112598296L469.8222322232224,212.4773480040127L469.3037803780378,213.91432114098706L470.5135013501351,215.4544582594538L471.03195319531955,216.53106848566486L472.0688568856886,217.77039585496163L473.0193519351935,218.49911382282218L473.8834383438344,219.83751015755396L476.04365436543657,221.1118501473778L475.7844284428443,221.6634217406686L473.537803780378,220.44797915054784L472.1552655265527,219.2809289100042L469.90864086408646,218.27517610908632L467.9212421242124,215.85178828224014L468.43969396939696,215.56806297570245L467.3163816381638,214.14325582039305L467.22997299729974,213.05341295303234L465.76102610261023,212.4773480040127L464.98334833483347,213.97157998779835L464.2920792079208,212.82319223252546L464.2920792079208,211.61002336414242L464.3784878487849,211.55206296176797L466.10666066606666,211.66796634938794L466.53870387038705,211.14585115837173L467.3163816381638,211.66796634938794L468.2668766876688,211.72589193302372L468.2668766876688,210.79698567997087L469.13096309630964,210.4474852967532L469.3037803780378,209.04306602586445L471.29117911791184,208.1010027002984L471.98244824482447,208.51373040012103L473.79702970297035,210.03892784016455L475.7844284428443,210.6805562655026Z"
                        className="datamaps-subunit HRV"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M259.4171917191719,286.21352154213275L259.5900090009001,287.59212805229816L259.4171917191719,288.5801985415083L258.81233123312336,289.0090798224342L259.4171917191719,289.73720168876304L259.4171917191719,290.4213870696054L257.7754275427543,289.9938958172963L256.65211521152116,290.2076931566124L255.1831683168317,289.9938958172963L254.05985598559855,290.4641134908627L252.76372637263728,289.69440470597397L253.02295229522952,288.8804604271483L255.1831683168317,289.22336024735495L256.99774977497754,289.437534626484L257.8618361836184,288.8804604271483L256.8249324932493,287.76413266933827L256.8249324932493,286.7741358168229L255.2695769576958,286.38609997863284L255.8744374437444,285.69534651963323L257.3433843384339,285.8249523873804Z"
                        className="datamaps-subunit HTI"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M470.42709270927094,206.91679843593926L471.2047704770477,204.64607089008197L470.68631863186323,203.86286839185172L472.0688568856886,203.86286839185172L472.24167416741676,202.40822050536664L473.4513951395139,203.31871244433887L474.3154815481548,203.6816601976355L476.3892889288929,203.2581520600709L476.56210621062104,202.52987867316017L477.5126012601261,202.40822050536664L478.72232223222323,201.85976431783374L478.9815481548155,202.10372395249425L480.1048604860486,201.6154812623737L480.62331233123314,200.81931315665636L481.40099009900996,200.57364209817123L483.9932493249325,201.6765824125055L484.511701170117,201.3096708027947L485.8078307830783,202.28648215269843L485.98064806480653,203.2581520600709L484.511701170117,203.98357578483464L483.3883888388839,206.3814721168209L481.91944194419443,208.74917261344615L480.01845184518453,209.39514043065594L478.5495049504951,209.27785454764384L476.6485148514851,210.1557475159096L475.7844284428443,210.6805562655026L473.79702970297035,210.03892784016455L471.98244824482447,208.51373040012103L471.29117911791184,208.1010027002984L470.7727272727273,206.91679843593926Z"
                        className="datamaps-subunit HUN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M721.1849684968497,359.1726452716185L720.2344734473447,359.25521300566277L717.0373537353735,357.5230991833262L719.2839783978399,357.0700590382014L720.4936993699371,357.81152621551536L721.3577857785779,358.5124178497364ZM731.4675967596759,355.91795011695706L731.640414041404,356.3703819762227L731.7268226822682,357.11123439461056L730.1714671467148,358.9662643969398L728.0976597659767,359.50296935280664L727.8384338433843,359.1726452716185L728.0112511251125,358.34744721829026L729.0481548154817,356.8642122868634ZM714.445094509451,353.98736229781684L715.3091809180918,354.64413634573964L716.7781278127813,354.43884608643447L717.38298829883,355.46574832115454L714.6179117911792,355.959070703926L712.9761476147614,356.28810430001147L711.6800180018001,356.24696836668306L712.5441044104409,354.84947123096293L713.8402340234024,354.84947123096293ZM726.455895589559,353.98736229781684L726.1102610261026,355.3013673670035L722.4810981098109,356.00019319600256L719.2839783978399,355.7123756269734L719.2839783978399,354.8084006614049L721.1849684968497,354.3156931569377L722.7403240324032,355.05485120975266L724.2956795679568,354.84947123096293ZM692.2380738073807,350.79163261329535L696.8177317731772,351.0371253303842L697.3361836183617,350.014576484149L701.7430243024303,351.2008162704942L702.6071107110711,352.7570894513726L706.2362736273628,353.2080155488388L709.1741674167417,354.64413634573964L706.495499549955,355.58905355343126L703.8168316831683,354.60307473876105L701.6566156615661,354.64413634573964L699.1507650765077,354.47990059065233L696.9041404140414,354.0283975774783L694.1390639063907,353.12601423859246L692.3244824482448,352.8800497223774L691.3739873987399,353.1670140682511L686.9671467146716,352.1834652863886L686.5351035103511,351.15989133427223L684.3748874887489,350.9552886283437L686.0166516651666,348.66611111433036L688.9545454545455,348.7886408034715L690.8555355535555,349.7284183952303L691.8924392439244,349.93281024908373ZM754.7979297929792,349.4423260443185L753.5882088208821,351.078045867894L753.3289828982898,349.2380139186111L753.7610261026102,348.3802519723111L754.2794779477947,347.5638370566932L754.8843384338434,348.25775930319423ZM736.9113411341134,342.79607942975315L735.9608460846084,343.56950201900963L734.3190819081908,343.1624032632836L733.8870387038704,342.10429305105197L736.3064806480647,341.9822335996645ZM744.6017101710172,341.9008639173341L745.465796579658,343.7323635921589L743.4783978397841,342.75538046612985L741.49099909991,342.55189643327014L740.1084608460847,342.71468222629375L738.4666966696669,342.6332879036723L738.9851485148515,341.29067203858693L742.0094509450945,341.20932350226053ZM769.9194419441944,340.7212806810403L769.9194419441944,348.58443089466124L770.0058505850584,356.4526674236639L767.8456345634563,354.47990059065233L765.4261926192619,353.98736229781684L764.8213321332133,354.6851997377533L761.7970297029702,354.7262649185417L762.8339333933393,352.7570894513726L764.3028802880289,352.1015442066695L763.6980198019803,349.48319240289953L762.488298829883,347.441415156644L757.9086408640864,345.40248255788885L755.9212421242125,345.1987283393365L752.2920792079208,342.9995852299233L751.6008100810081,344.13957470996826L750.6503150315032,344.3432117557937L750.1318631863186,343.4880760192477L750.1318631863186,342.42981451298704L748.3172817281729,341.24999747462056L750.8231323132313,340.39596280078945L752.5513051305131,340.436625689796L752.378487848785,339.7860794810307L748.8357335733574,339.7860794810307L747.8852385238524,338.36340307534385L745.7250225022502,337.91636913757634L744.7745274527454,336.73798665711286L747.9716471647164,336.1691769568174L749.1813681368137,335.35663930963904L753.0697569756976,336.37231946068414L753.4153915391539,337.2662014371728L754.1066606660665,341.12797731809127L756.6125112511252,342.55189643327014L758.5999099909991,340.03001962596784L761.3649864986498,338.56661359107375L763.5252025202522,338.56661359107375L765.512601260126,339.4202002988427L767.3271827182718,340.27397722000717ZM732.0724572457245,331.0906578602908L730.1714671467148,333.447245687879L728.3568856885688,333.93475477806925L726.0238523852386,333.447245687879L722.0490549054906,333.5691239412447L719.9752475247525,333.8941293681367L719.6296129612962,335.7222757782939L721.7034203420342,337.87573155860633L722.9995499549956,336.77861728266896L727.492799279928,335.9660381331353L727.3199819981998,337.06303747210086L726.2830783078308,336.6973562284308L725.2461746174617,338.11956160066615L723.0859585958596,339.0543560533509L725.4189918991899,342.1449808632426L724.9869486948694,342.9588825936857L727.1471647164716,345.72853926404105L727.0607560756075,347.31900349638806L725.8510351035104,348.01280654647877L724.9005400540054,347.1966019780707L726.0238523852386,345.1987283393365L723.6908190819082,346.13619909673844L723.0859585958596,345.48399091978433L723.3451845184519,344.5468703912562L721.6170117011701,343.12169762452123L721.8762376237623,340.8026155323587L720.2344734473447,341.5347320459139L720.4072907290729,344.3432117557937L720.4936993699371,347.76789657777937L719.0247524752475,348.13527752729453L717.9878487848785,347.4006101369704L718.6791179117912,345.1987283393365L718.3334833483349,342.87747954267417L717.2965796579658,342.83677912074177L716.518901890189,341.20932350226053L717.5558055805582,339.62346203198115L717.9014401440145,337.7131841698428L719.1111611161117,334.09725597494946L719.543204320432,333.1222327752647L721.6170117011701,331.3344772001046L723.5180018001801,332.0658789121919L726.542304230423,332.3909231663118L729.3073807380738,332.2690330381322L731.640414041404,330.5217032752719ZM740.3676867686768,331.78145417486365L740.1948694869486,333.8535039068273L738.9851485148515,333.6097498614808L738.6395139513951,335.0722597933941L739.5900090009001,336.37231946068414L738.8987398739874,336.6567259930748L737.9482448244825,335.112885255845L737.2569756975697,332.0658789121919L737.7754275427543,330.15591156668484L738.5531053105311,329.26161993814827L738.7259225922593,330.56234502148476L740.1084608460847,330.7655486881522ZM694.6575157515751,329.6681412249088L695.0895589558957,331.2532052242332L696.7313231323133,332.6346985880982L698.2866786678669,332.14714117070343L699.8420342034203,332.30966326937784L701.2245724572458,331.0906578602908L702.347884788479,330.88746696452745L704.594509450945,331.5782866441684L706.5819081908191,331.05002028771656L707.7916291629163,327.7163927348266L708.7421242124212,326.86209744191234L709.606210621062,324.13436201734976L712.3712871287128,324.13436201734976L714.445094509451,324.54171883908884L713.0625562556256,326.6993422157759L714.7907290729073,328.97702810844885L714.3586858685869,330.11526620139097L717.1237623762377,332.30966326937784L714.2722772277228,332.5940697751281L713.4081908190819,334.21913150690256L713.5810081008101,336.41294844209926L711.2479747974799,338.03828368757604L711.1615661566157,340.436625689796L710.2974797479749,344.13957470996826L709.8654365436544,343.28452475139426L707.1867686768677,344.3432117557937L706.2362736273628,342.87747954267417L704.508100810081,342.75538046612985L703.2983798379838,341.9822335996645L700.4468946894689,342.83677912074177L699.5828082808281,341.65677032528504L698.0274527452746,341.8194968298739L696.0400540054005,341.5347320459139L695.6944194419442,338.32276200307075L694.484698469847,337.6319121820182L693.3613861386139,335.60039610934905L693.0157515751575,333.48787185799L693.2749774977497,331.2532052242332ZM685.4981998199819,348.5435926458327L682.8195319531953,348.58443089466124L680.7457245724573,346.5847430934354L677.7214221422142,344.62833999112155L676.6845184518452,343.1624032632836L674.8699369936994,341.20932350226053L673.6602160216021,339.4202002988427L671.8456345634563,336.0472932493627L669.7718271827183,334.056630735065L668.9941494149415,331.9846158097146L668.1300630063006,330.11526620139097L665.9698469846985,328.6110895201128L664.7601260126013,326.5365760968764L662.9455445544554,325.19331014315924L660.4396939693969,322.5447708674462L660.1804680468047,321.3209357569959L661.7358235823582,321.40255604468575L665.4513951395139,321.8921823072838L667.6116111611161,324.2158405197221L669.426192619262,325.84469325006415L670.8087308730874,326.86209744191234L673.0553555355535,329.4242337273416L675.4747974797481,329.4648860609644L677.462196219622,331.1312951366785L678.8447344734473,333.1222327752647L680.7457245724573,334.21913150690256L679.7088208820882,336.20980514898736L681.0913591359136,337.0224053690702L681.9554455445544,337.103669800394L682.3874887488748,338.76983302313903L683.2515751575158,340.1113368472148L684.9797479747974,340.31463856945703L686.1894689468947,341.8194968298739L685.5846084608461,344.8320296065553Z"
                        className="datamaps-subunit IDN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M618.2722772277227,243.27867940783585L620.8645364536453,246.6967600079055L620.6053105310532,249.04653004064585L621.6422142214221,250.50392937739107L621.5558055805582,251.95296445891069L619.8276327632763,251.61559337467162L620.4324932493249,254.73148413152495L622.8519351935194,256.48872892556545L626.1354635463547,258.4225857448806L624.6665166516652,259.68865566608855L623.7160216021603,262.25002594419277L626.0490549054906,263.31432710778085L628.2956795679568,264.65071557781954L631.4063906390639,266.1640778005812L634.6899189918992,266.52979808279315L636.0724572457245,267.8973159295031L637.9734473447345,268.1246393667461L640.8249324932494,268.76025176752876L642.8123312331232,268.71489430383036L643.1579657965797,267.66982340047275L642.8123312331232,265.9352755251389L642.9851485148515,264.7886145211277L644.454095409541,264.1905835897123L644.6269126912691,266.34699369601685L644.7133213321333,266.8950738927365L646.8735373537354,267.8973159295031L648.428892889289,267.4877071279977L650.4162916291629,267.66982340047275L652.4036903690369,267.57877887549296L652.576507650765,265.9352755251389L651.5396039603961,265.06421872855356L653.52700270027,264.69668908223446L655.6872187218721,262.66696166380046L658.452295229523,260.9489706292379L660.4396939693969,261.6002451860995L662.1678667866787,260.482849939953L663.2911791179117,262.157290898293L662.513501350135,263.31432710778085L665.1057605760576,263.7297254770336L665.2785778577858,264.74265539458366L664.414491449145,265.2478119416387L664.5873087308731,266.8950738927365L662.9455445544554,266.4384098035354L659.8348334833483,268.3063768721625L659.8348334833483,269.801649753812L658.538703870387,272.05376173647153L658.452295229523,273.3528053817492L657.3289828982898,275.4917992811663L655.514401440144,274.91383401931057L655.42799279928,277.6174189879573L654.8231323132313,278.4992870815444L655.0823582358234,279.598564508048L653.8726372637265,280.21270356471524L652.6629162916292,276.11312675188935L651.9716471647164,276.11312675188935L651.6260126012601,277.7939688285213L650.2434743474347,276.4233684882481L651.0211521152115,274.91383401931057L652.0580558055806,274.78031686496604L653.1813681368137,272.5471116903262L651.7988298829882,272.0986427648963L649.5522052205221,272.14351756989356L647.3055805580557,271.7843445575986L647.1327632763275,269.93722863840793L645.9230423042304,269.801649753812L644.0220522052205,268.624159400664L643.2443744374438,270.43385203525384L644.9725472547254,271.82926304524875L643.4171917191719,272.8158966615364L642.8987398739874,273.7995615618312L644.3676867686768,274.51312335543673L643.9356435643565,276.0687836307547L644.7997299729973,278.05862785906305L645.1453645364536,280.21270356471524L644.7997299729973,281.13198924730904L643.1579657965797,281.08826548878324L640.2200720072008,281.6562750143876L640.3928892889289,283.5724652747463L639.0967596759676,285.0899667200645L635.6404140414041,286.81722831537905L632.9617461746175,289.77999448452834L631.1471647164716,291.4030629402358L628.7277227722773,293.0203392515218L628.7277227722773,294.16607072859745L627.6044104410441,294.80140963164126L625.3577857785779,295.68950427044024L624.3208820882088,295.816245540109L623.543204320432,297.7135890597495L624.0616561656166,300.9445601407871L624.1480648064806,302.99111389462183L623.1975697569757,305.3216927103439L623.1975697569757,309.5047325080895L621.9014401440145,309.5873222967985L620.8645364536453,311.4844978296393L621.5558055805582,312.2668298623004L619.3955895589559,312.9662066535948L618.5315031503151,314.60965590203693L617.5810081008101,315.30725578642404L615.3343834383439,313.04844965086556L614.2110711071107,309.62861385818866L613.2605760576057,307.14705751964664L612.482898289829,305.98603144405376L611.1867686768677,303.6578734106521L610.5819081908191,300.5678820268165L610.1498649864986,299.0166612292211L607.9896489648966,295.6049922555498L606.9527452745274,290.720385868719L606.2614761476148,287.50609925806634L606.2614761476148,284.3969773406244L605.8294329432944,282.0053920862605L602.2866786678668,283.5290215865715L600.6449144914491,283.22477925569206L597.534203420342,280.1250326695044L598.6575157515751,279.15925670079196L597.9662466246625,278.14680350849244L595.1147614761477,275.93571984004893L596.7565256525653,274.15653341637864L602.0274527452746,274.20112798713313L601.50900090009,271.91908125416774L600.2128712871287,270.5691593292017L599.8672367236724,268.488007017713L598.3118811881188,267.30548177300454L600.9905490549055,264.46674951414343L603.7556255625562,264.65071557781954L606.2614761476148,261.8324802911767L607.8168316831683,259.032901761816L610.1498649864986,256.2045576993334L610.0634563456346,254.20679819344048L612.1372637263727,252.5783346615425L610.1498649864986,251.1811738659054L609.3721872187218,249.2413408244666L608.508100810081,246.6967600079055L609.7178217821782,245.46392634579416L613.3469846984699,246.15508476667708L616.0256525652566,245.71099535627584Z"
                        className="datamaps-subunit IND"
                        data-info='{"active":{"value":"1,408","percent":"19.2","isGrown":true},"new":{"value":"392","percent":"11.1","isGrown":true},"fillKey":"MAJOR","short":"in"}'
                        style={{
                          fill: 'rgb(79, 70, 229)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M416.5945094509451,180.42587260960426L417.02655265526556,183.29547105711728L415.2119711971197,186.84960013718097L410.9779477947795,189.15740531044366L407.521602160216,188.5668752606199L409.50900090009003,184.44346135789445L408.2128712871287,180.3569576029453L411.496399639964,177.15622179301212L413.31098109810983,175.17780506255204L413.82943294329436,177.43696350688433L413.31098109810983,179.66626758694102L414.7799279927993,179.59704395630703Z"
                        className="datamaps-subunit IRL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M548.0220522052205,259.17355163791206L546.6395139513952,259.032901761816L544.9977497749776,258.798325431388L543.2695769576958,261.41431995696695L538.7763276327632,261.22827236602114L532.0364536453645,255.6353057624882L528.493699369937,253.6810582685901L525.5558055805581,252.9144439529478L524.6053105310531,249.43599964205254L529.8762376237623,246.40145029650307L530.8267326732673,242.87919758724533L530.5675067506751,240.720268022137L531.9500450045005,239.96241930304438L533.1597659765977,238.08230958149008L534.1966696669667,237.6226328510471L536.9617461746175,238.03128033623335L537.8258325832583,238.7955206243992L538.9491449144915,238.28631211138128L540.504500450045,241.8273245719792L542.0598559855986,242.72921758279176L542.2326732673267,244.42345868877953L541.0229522952295,245.46392634579416L540.504500450045,247.7275433012918L542.1462646264627,250.45548532497523L545.0841584158416,252.00112401883987L546.3802880288029,254.15904735492995L545.9482448244825,256.2045576993334L546.7259225922593,256.2045576993334L546.7259225922593,257.66955186391897Z"
                        className="datamaps-subunit IRQ"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M396.7205220522052,118.7784291270101L396.11566156615663,122.69459803733355L398.7943294329433,126.6082218639014L395.6836183618362,130.89356297630133L388.77092709270926,134.69583412777206L386.6971197119712,135.6090756832232L383.5864086408641,134.8789175750227L376.84653465346537,133.1307337296701L379.2659765976598,130.70564394621056L373.99504950495054,127.95443326427161L378.22907290729074,126.80127083985937L378.14266426642666,125.1524587424176L373.13096309630964,123.78098894388685L374.7727272727273,119.9943070289809L378.40189018901896,119.08332330616975L382.1174617461746,123.09055509485802L385.7466246624663,119.89335911921725L388.77092709270926,121.60032130462253L392.65931593159314,118.37093699514227Z"
                        className="datamaps-subunit ISL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M517.2605760576057,251.3260627536166L516.8285328532853,252.24178615370852L515.9644464446445,251.85661814524474L515.4459945994599,253.72889661796776L516.0508550855086,254.063519516773L515.4459945994599,254.44542187408098L515.3595859585959,255.15999547501275L516.482898289829,254.77913092649854L516.482898289829,255.8726419808113L515.2731773177318,260.34286232570224L513.7178217821782,255.5403118766621L514.409090909091,254.63616464395594L514.2362736273627,254.44542187408098L514.9275427542755,253.15425453916754L515.3595859585959,250.9878600612271L515.7052205220522,250.26161602769292L515.7916291629163,250.26161602769292L516.5693069306931,250.26161602769292L516.8285328532853,249.7277040432548L517.433393339334,249.7277040432548L517.519801980198,250.89114789662545L517.1741674167416,251.3260627536166Z"
                        className="datamaps-subunit ISR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M245.33258325832583,289.30904269245235L246.9743474347435,289.5231748134375L248.1840684068407,290.16494198098474L248.61611161116116,290.8484668787757L246.9743474347435,290.8911524041947L246.19666966696673,291.31778483616085L244.9005400540054,290.8911524041947L243.51800180018006,289.9938958172963L243.7772277227723,289.39470820685705L244.81413141314133,289.22336024735495Z"
                        className="datamaps-subunit JAM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M516.8285328532853,252.24178615370852L517.2605760576057,251.3260627536166L519.9392439243925,252.48222287613595L524.6053105310531,249.43599964205254L525.5558055805581,252.9144439529478L525.1237623762377,253.29803434862254L520.2848784878488,254.73148413152495L522.7043204320432,257.5281254908747L521.9266426642664,257.9992604549728L521.494599459946,258.93909524428454L519.6800180018002,259.31412979712314L519.0751575157516,260.29618419645794L518.0382538253825,261.1817412999035L515.3595859585959,260.71600711890767L515.2731773177318,260.34286232570224L516.482898289829,255.8726419808113L516.482898289829,254.77913092649854L516.8285328532853,253.96795674804744Z"
                        className="datamaps-subunit JOR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M754.625112511251,247.1881501194394L754.9707470747076,248.16798722036958L753.5882088208821,249.92198516564514L752.6377137713771,248.9978035402437L751.3415841584158,249.67911023576022L750.7367236723671,251.3260627536166L749.1813681368137,250.55236413664764L749.1813681368137,249.19265239523764L750.477497749775,247.43347574692382L751.8600360036003,247.7765203962486L752.8969396939694,246.5491499055878ZM769.8330333033302,238.33728417896813L768.9689468946895,240.720268022137L769.3145814581458,242.22859348303308L768.1048604860487,244.32413067064925L765.0805580558056,245.66160176300423L760.8465346534654,245.85911564460275L757.3901890189019,249.14395446016871L755.7484248424844,248.07017872315078L755.6620162016202,245.90846893828586L751.514401440144,246.5491499055878L748.6629162916292,247.87444537606672L745.8978397839784,247.97233146335788L748.3172817281729,250.0675974150222L746.6755175517551,254.9220196035472L745.1201620162017,256.0623586894658L743.9968496849685,254.96963195084413L744.6017101710172,252.43415351920828L743.0463546354636,251.61559337467162L742.0958595859587,249.63050700172533L744.3424842484249,248.75402781229096L745.6386138613861,246.9425785499454L748.0580558055806,245.46392634579416L749.7862286228624,243.42831144731343L754.538703870387,242.57914212234385L757.1309630963095,243.17887218363438L759.6368136813682,237.8781237762032L761.2785778577858,239.30359701310263L764.7349234923493,236.28940139717628L766.1174617461745,235.10336270947369L767.6728172817282,231.34884197139766L767.2407740774077,227.79561530898147L768.1912691269129,225.80757888761468L770.7835283528352,225.21288297000444L772.0796579657966,229.60611949326386L771.9932493249325,232.13636484696855L769.8330333033302,235.20674729301194ZM776.9185418541855,216.0784748062713L778.560306030603,216.7569774604645L780.2884788478848,215.34078788814253L780.8069306930693,219.11365355770454L777.2641764176418,220.0041849451904L775.1039603960396,223.25459889450934L771.3883888388839,221.00135588701113L770.0922592259226,224.56217871242924L767.413591359136,224.6164820761823L767.0679567956795,221.38782300537295L768.2776777677768,218.8345509942593L770.7835283528352,218.66690267533332L771.4747974797481,214.02882204007753L772.2524752475248,211.3780770964276L775.0175517551756,214.94242288282865Z"
                        className="datamaps-subunit JPN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M531.3451845184519,338.5259707888353L529.6170117011701,339.50150367324767L529.0121512151215,340.4772890991126L528.1480648064806,340.63994801073295L527.8024302430243,342.34843004795914L527.0247524752475,343.3252334499781L526.5927092709271,344.9135117745364L525.5558055805581,345.72853926404105L522.0994599459947,343.3252334499781L522.0130513051306,341.9008639173341L513.2857785778577,337.0224053690702L512.8537353735373,336.77861728266896L512.8537353735373,334.21913150690256L513.5450045004501,333.2441134106345L514.7547254725473,331.6595543923422L515.6188118811881,329.9120335819811L514.495499549955,327.1468935648297L514.2362736273627,325.9261022308678L513.1129612961296,324.25657841994723L514.5819081908191,322.8301931894328L516.2236723672368,321.23931084607364L517.433393339334,321.64738945848205L517.433393339334,322.99326909734657L518.2974797479749,323.8084114547435L519.9392439243925,323.8084114547435L522.9635463546355,325.84469325006415L523.7412241224123,325.84469325006415L524.3460846084608,325.8039876275651L524.8645364536453,326.08891123594555L526.419891989199,326.2517084898851L527.1111611161116,325.274744116062L529.3577857785779,324.25657841994723L530.3082808280828,325.07115307536833L531.9500450045005,325.07115307536833L529.8762376237623,327.7977400662675L529.8762376237623,336.5348364114826Z"
                        className="datamaps-subunit KEN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M601.7682268226822,222.3782391077354L602.3730873087309,220.94608617971846L603.9284428442844,220.44797915054784L607.9032403240324,221.60833184589683L608.2488748874888,219.6706973793992L609.6314131413142,219.0020591462873L613.0013501350135,220.33712198308336L613.8654365436544,220.0041849451904L617.8402340234024,220.11522498612277L621.469396939694,220.44797915054784L622.6791179117912,221.60833184589683L624.1480648064806,222.10360556423382L623.8024302430243,222.81688725827823L620.0004500450045,224.56217871242924L619.1363636363636,225.80757888761468L616.1120612061206,226.18514134153347L615.1615661566157,228.22300628834452L612.6557155715572,227.79561530898147L610.9275427542755,228.43637901049277L608.6809180918092,229.92403083647056L609.0265526552655,230.66399780534675L608.3352835283529,231.34884197139766L603.7556255625562,231.82169838365655L600.8177317731772,230.82223168575644L598.2254725472548,231.0330298307764L598.484698469847,229.2346248808514L601.0769576957696,229.7651341451784L601.9410441044105,228.8092662814073L603.7556255625562,229.12836476581654L606.8663366336634,226.83081170368717L604.0148514851485,225.15873540175107L602.2866786678668,225.96947488161462L600.4720972097209,224.77930687232373L602.545904590459,222.65250429633835Z"
                        className="datamaps-subunit KGZ"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M677.7214221422142,305.0308343806119L677.1165616561656,302.0313665382305L678.6719171917191,299.9814410448529L681.7826282628263,299.52023489988204L684.0292529252926,299.8556954536953L686.0166516651666,300.8190283195482L687.0535553555355,299.1425980338207L689.2137713771376,300.023349957816L689.7322232223223,301.697179478319L689.47299729973,304.6566826847359L685.4117911791179,306.5253235376995L686.5351035103511,308.0165622196603L683.9428442844285,308.18206268721565L681.8690369036904,309.1742839101657L679.8816381638163,308.80235631188236L678.9311431143115,307.5612398694367Z"
                        className="datamaps-subunit KHM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M739.503600360036,233.85897237062568L741.577407740774,237.46919987621135L742.1822682268227,239.40507726790904L742.1822682268227,242.82921484388245L741.3181818181819,244.47310722986026L739.1579657965797,245.01856323768098L737.2569756975697,246.2536609558732L735.0967596759676,246.4999266588448L734.8375337533753,244.91948160778827L735.2695769576958,242.67920304735145L734.1462646264627,239.60790335623693L735.9608460846084,239.1005017066666L734.3190819081908,236.49502861550656L734.491899189919,236.23796512770764L735.5288028802879,236.3408258707995L736.4792979297929,234.9481956145293L738.2074707470748,234.8446906200661L739.1579657965797,234.63753563108133Z"
                        className="datamaps-subunit KOR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M480.8825382538254,223.69138044149412L480.7961296129613,222.4879892969014L480.1912691269127,222.15856181760955L479.67281728172816,221.27747884748675L480.1048604860486,220.55877557126573L480.7097209720972,220.33712198308336L481.05535553555353,219.22518594324208L481.48739873987404,219.05786411197755L481.83303330333035,219.50374625079763L482.2650765076508,219.72631699325888L482.52430243024304,220.28167058639386L482.9563456345635,220.39255816674108L483.3883888388839,221.00135588701113L483.73402340234026,221.00135588701113L483.47479747974796,221.77355684195598L483.2155715571557,222.15856181760955L483.3019801980198,222.43312156305626L482.7835283528353,222.5428423219529L481.3145814581459,223.03585973790848L481.2281728172817,223.69138044149412Z"
                        className="datamaps-subunit -99"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M546.6395139513952,259.032901761816L547.1579657965797,260.2494982604986L546.8987398739874,260.85580841222225L547.6764176417641,262.9445822895875L546.0346534653465,262.9908263404219L545.429792979298,261.6931620463284L543.2695769576958,261.41431995696695L544.9977497749776,258.798325431388Z"
                        className="datamaps-subunit KWT"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M684.0292529252926,299.8556954536953L684.8069306930693,298.7647001723307L684.8933393339333,296.66037512687933L682.9923492349235,294.4626655974121L682.8195319531953,291.99956244508917L681.0049504950495,289.9511238883894L679.1903690369037,289.77999448452834L678.6719171917191,290.63497812212995L677.2893789378937,290.720385868719L676.5981098109811,290.29318310125205L674.0058505850584,291.7866163832672L674.0058505850584,289.5231748134375L674.6107110711071,286.86031631227974L672.9689468946896,286.7310388119086L672.7961296129613,285.1765055409517L671.7592259225923,284.3969773406244L672.2776777677768,283.48557303268143L674.3514851485149,281.7872318640726L674.5243024302431,282.3977635008181L675.8204320432044,282.4849020929044L675.4747974797481,279.510745635121L676.6845184518452,279.11529648697467L678.1534653465346,281.17570786776156L679.1903690369037,283.5290215865715L682.1282628262827,283.5290215865715L683.0787578757877,285.7817550482006L681.523402340234,286.4292332039805L680.8321332133213,287.3339885116369L683.7700270027003,288.8804604271483L685.7574257425742,291.8718066890269L687.2263726372637,294.0812958864044L689.0409540954095,295.816245540109L689.6458145814581,297.5452178504536L689.2137713771376,300.023349957816L687.0535553555355,299.1425980338207L686.0166516651666,300.8190283195482Z"
                        className="datamaps-subunit LAO"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M517.433393339334,249.7277040432548L516.8285328532853,249.7277040432548L516.5693069306931,250.26161602769292L515.7916291629163,250.26161602769292L516.6557155715572,247.87444537606672L517.8654365436544,245.85911564460275L517.8654365436544,245.7603788620154L518.9887488748875,245.90846893828586L519.3343834383438,247.04083675664495L518.0382538253825,248.11908781302827Z"
                        className="datamaps-subunit LBN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M412.9653465346535,324.01213745504555L412.3604860486049,324.01213745504555L409.85463546354634,322.8709636902753L407.6944194419442,321.03522815163456L405.62061206120615,319.728380259031L404.06525652565256,318.1747626793895L404.58370837083714,317.397188443135L404.7565256525653,316.70100383965064L405.7934293429343,315.3482756360314L406.91674167416744,314.24013369979497L407.4351935193519,314.19906676500244L408.1264626462646,313.91154771892144L409.0769576957696,315.38929379391766L408.9041404140414,316.3732317260135L409.42259225922595,316.8648521132321L410.11386138613864,316.9058102859088L410.54590459045903,315.9223775911002L411.2371737173717,315.96337245508226L411.15076507650764,316.70100383965064L411.40999099909993,317.8474276739415L410.8915391539154,318.9109330997238L411.5828082808281,319.60579699000334L412.27407740774083,319.76923874847057L413.31098109810983,320.749462666724L413.3973897389739,321.72899154332293L413.1381638163817,322.0145637643229Z"
                        className="datamaps-subunit LBR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M627.7772277227723,316.3732317260135L627.4315931593159,318.9109330997238L626.3946894689469,319.5649332879261L624.3208820882088,320.1369073593779L623.1975697569757,318.2156730510652L622.7655265526553,314.7327981765633L623.8888388838884,310.7838915478312L625.530603060306,312.1433517689263L626.6539153915392,313.8704663099009Z"
                        className="datamaps-subunit LKA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M501.01575157515754,407.1340334096518L501.8798379837983,407.9709764912618L501.1021602160216,409.32465387986423L500.7565256525653,410.21513863716905L499.37398739873987,410.63795613666446L498.9419441944195,411.53272943818314L498.0778577857786,411.81590394332244L496.26327632763275,409.65239290580894L497.5594059405941,407.92441449805017L498.85553555355534,406.8556006620346L499.9788478847885,406.29954912795677Z"
                        className="datamaps-subunit LSO"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M486.0670567056706,178.55528551397697L485.89423942394245,177.5070759818769L486.1534653465347,176.3817611728889L485.0301530153015,175.67459792920863L482.52430243024304,174.96444229485041L482.0058505850585,171.36765305359071L484.77092709270926,170.0535081961751L488.8321332133213,170.34644379945428L491.16516651665165,169.906845406289L491.510801080108,170.78487647501893L492.8069306930694,171.07652102896424L495.05355535553554,173.17575244202493L495.31278127812783,175.03559341527992L493.32538253825385,176.3817611728889L492.8069306930694,178.764150087509L490.21467146714673,180.28801468337343L487.8816381638164,180.28801468337343L487.27677767776777,178.97275742386273Z"
                        className="datamaps-subunit LTU"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M445.9734473447345,195.01984746894044L446.49189918991897,195.84179950955343L446.3190819081908,197.47452470287533L445.6278127812781,197.59950952683076L445.1093609360936,197.2242956834936L445.3685868586859,195.14654702258565Z"
                        className="datamaps-subunit LUX"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M482.0058505850585,171.36765305359071L482.09225922592265,168.1366415443619L483.3019801980198,165.3696370371969L485.5486048604861,163.85421590530973L487.449594959496,167.16976674235488L489.3505850585059,167.09515523640712L489.8690369036904,163.6256809293397L491.85643564356434,162.8615671547083L492.97974797479753,163.39682411337174L495.05355535553554,165.0676780737706L496.9545454545455,165.0676780737706L498.1642664266427,166.12210023616785L498.33708370837087,168.21078130379325L499.11476147614763,170.78487647501893L496.522502250225,172.45487089233887L495.05355535553554,173.17575244202493L492.8069306930694,171.07652102896424L491.510801080108,170.78487647501893L491.16516651665165,169.906845406289L488.8321332133213,170.34644379945428L484.77092709270926,170.0535081961751Z"
                        className="datamaps-subunit LVA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M426.2722772277228,244.22476134707028L427.2227722772277,246.1057816583686L427.3091809180918,247.87444537606672L428.1732673267327,250.89114789662545L428.7781278127813,251.51911971143045L428.3460846084609,252.62637710510907L425.2353735373538,253.0583569776233L424.11206120612064,254.1112877984921L422.7295229522952,254.34999847486364L422.64311431143113,256.44138800653593L419.87803780378044,257.57527581550335L418.9275427542754,258.93909524428454L416.9401440144015,259.68865566608855L414.52070207020705,260.10939354542825L410.71872187218725,262.157290898293L410.71872187218725,265.38543209892214L410.3730873087309,265.38543209892214L410.3730873087309,266.8037964389212L408.9041404140414,266.8950738927365L408.1264626462646,267.53324640756443L407.0031503150315,267.53324640756443L406.1390639063907,267.1687409394708L404.15166516651664,267.4421610307784L403.37398739873987,269.5303159009955L402.5963096309631,269.7564437684735L401.47299729973,273.08446082368596L398.1894689468947,275.93571984004893L397.4117911791179,279.510745635121L396.37488748874887,280.69451961874006L396.11566156615663,281.6126125818517L390.6719171917192,281.83087401462006L390.7583258325833,280.65074420266325L391.7088208820882,279.90576339161817L392.486498649865,278.587353426699L392.3136813681368,277.70570498485364L393.1777677767777,275.84698190323724L394.47389738973897,274.15653341637864L395.25157515751573,273.7549130864114L395.9428442844284,272.1883861571048L395.9428442844284,270.79454321642123L396.80693069306926,269.1228725473835L398.448694869487,268.17008382891186L400.0040504050405,265.43129127922435L400.0040504050405,265.38543209892214L401.21377137713773,264.3286991423005L403.46039603960395,264.05240268620287L405.3613861386139,262.157290898293L406.57110711071107,261.41431995696695L408.5585058505851,259.1266763234917L407.95364536453644,255.6827899627977L408.81773177317734,253.2501166065658L409.1633663366337,251.7602355223604L410.71872187218725,249.82486341019836L413.1381638163817,248.5100126402673L414.95274527452744,247.2863098259046L416.50810081008103,244.2744511763563L417.2857785778578,242.4790386659629L419.0139513951395,242.4790386659629L420.482898289829,243.7272927252854L422.7295229522952,243.52801371140873L425.2353735373538,244.1750611741516Z"
                        className="datamaps-subunit MAR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M495.3991899189919,202.04276429907836L495.91764176417644,201.49321807684308L497.5594059405941,201.12594008049876L499.2875787578758,202.28648215269843L500.3244824482448,202.40822050536664L501.3613861386139,203.379253057747L501.1885688568857,204.58594129636606L502.1390639063907,205.12641160334098L502.484698469847,206.61958288195913L503.26237623762376,207.5098279435517L503.0895589558956,208.04196821117407L503.521602160216,208.3958997711311L502.91674167416744,208.63148797035848L501.534203420342,208.57261830935175L501.27497749774983,208.04196821117407L500.7565256525653,208.33695701839747L500.92934293429346,208.98432364310668L500.3244824482448,210.0973465913762L499.8924392439244,211.2619991486097L499.2875787578758,211.61002336414242L498.85553555355534,210.03892784016455L499.11476147614763,208.57261830935175L499.02835283528356,207.0355535251789L497.6458145814582,204.94642857834404L496.8681368136814,203.4397739184806L496.0904590459046,202.40822050536664Z"
                        className="datamaps-subunit MDA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M550.441494149415,364.64248934532657L551.0463546354636,365.68350184097085L551.6512151215121,367.31102134997786L551.9968496849685,370.2857317531935L552.6017101710171,371.4633042676155L552.4288928892889,372.64353117172215L551.9968496849685,373.40369342720487L551.1327632763276,371.92664313998495L550.7007200720072,372.68573239092774L551.1327632763276,374.50376074425174L550.9599459945995,375.563871653056L550.2686768676867,376.15856755358334L550.1822682268227,378.28874973167405L549.2317731773178,381.24530193173223L548.0220522052205,384.74290801935877L546.5531053105311,389.6314162791099L545.6026102610261,393.25263822697667L544.5657065706571,396.32974754769486L542.578307830783,396.95760621988904L540.504500450045,398.08183207099023L539.1219621962197,397.40682398235475L537.2209720972097,396.46418659150913L536.529702970297,395.07763470086246L536.3568856885688,392.72034676060156L535.492799279928,390.64337386948193L535.3199819981999,388.79758731561435L535.7520252025203,386.9174443165291L536.8753375337534,386.4815501451123L536.8753375337534,385.6112519920561L537.9986498649864,383.6601668376971L538.1714671467147,382.0630420581251L537.6530153015301,380.8585081499098L537.2209720972097,379.22923403544166L537.0481548154816,376.9242912186565L537.8258325832583,375.5214220381783L538.1714671467147,373.9111113803502L539.3811881188119,373.82650559171526L540.6773177317732,373.31917410898956L541.6278127812782,372.896791201957L542.6647164716471,372.8545723968501L544.0472547254725,371.4212029499969L546.0346534653465,369.9077748530909L546.7259225922593,368.6497914113513L546.3802880288029,367.6036123089233L547.4171917191719,367.89635046101796L548.7133213321332,366.18380950703886L548.7997299729973,364.6840968184076L549.5774077407741,363.60317539735587Z"
                        className="datamaps-subunit MDG"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M480.8825382538254,223.69138044149412L481.2281728172817,223.69138044149412L481.3145814581459,223.03585973790848L482.7835283528353,222.5428423219529L483.3019801980198,222.43312156305626L484.07965796579657,222.21350328590796L485.20297029702976,222.15856181760955L486.4126912691269,223.19993593550527L486.5855085508551,225.32113584678396L486.1534653465347,225.42933245756075L485.72142214221424,226.02341235125272L484.42529252925294,225.91552348906498L483.47479747974796,226.61580899719505L481.91944194419443,226.9382306056289L480.96894689468945,226.13124556934008L480.62331233123314,224.77930687232373Z"
                        className="datamaps-subunit MKD"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M668.0436543654366,310.53647413936085L667.7844284428443,308.71968060071606L668.5621062106211,306.8569843765939L667.6980198019803,305.40477143100486L667.9572457245724,302.69917849488496L666.9203420342035,301.4464145047085L666.1426642664267,298.47059722874L665.7106210621062,295.30908730118597L664.6737173717372,293.2327204955719L663.1183618361836,294.5050214837721L660.3532853285328,296.2806906275613L659.0571557155715,296.0696321941922L657.5882088208821,295.4781973947013L658.3658865886589,292.3826169756648L657.8474347434743,289.9938958172963L656.0328532853287,287.0756889363871L656.2920792079208,286.170365525586L654.9095409540953,285.8681451161657L653.1813681368137,283.74619146786944L653.0085508550856,281.699932368943L653.8726372637265,282.09262087340875L653.8726372637265,280.21270356471524L655.0823582358234,279.598564508048L654.8231323132313,278.4992870815444L655.42799279928,277.6174189879573L655.514401440144,274.91383401931057L657.3289828982898,275.4917992811663L658.452295229523,273.3528053817492L658.538703870387,272.05376173647153L659.8348334833483,269.801649753812L659.8348334833483,268.3063768721625L662.9455445544554,266.4384098035354L664.5873087308731,266.8950738927365L664.414491449145,265.2478119416387L665.2785778577858,264.74265539458366L665.1057605760576,263.7297254770336L666.488298829883,263.49902214735056L667.2659765976598,265.1101277294084L668.3028802880289,265.7521073008528L668.3892889288929,267.85183097496935L668.3028802880289,270.0275820601293L666.0562556255625,272.2781047007171L665.7106210621062,275.40294569168566L668.3028802880289,274.95832798106153L668.8213321332133,277.35242765804594L670.3766876687669,277.8822105608749L669.6854185418541,280.0373407569689L671.5,281.00080253740884L672.5369036903691,281.48159476641683L674.2650765076507,280.7382898463729L674.3514851485149,281.7872318640726L672.2776777677768,283.48557303268143L671.7592259225923,284.3969773406244L670.3766876687669,285.0034091329505L668.9941494149415,286.1272049366049L667.2659765976598,286.21352154213275L666.2290729072906,288.96621096154576L665.1921692169217,289.437534626484L666.4018901890188,291.6588011329222L667.8708370837085,293.4874519679961L668.9077407740774,295.13991949345274L667.9572457245724,297.29255951343384L667.1795679567956,297.7556734404679L667.6980198019803,299.0166612292211L669.3397839783978,300.9863979862847L669.5990099009902,302.3653655186822L669.5990099009902,303.4912509288797L670.549504950495,305.7369820579214L669.1669666966696,308.0165622196603Z"
                        className="datamaps-subunit MMR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M478.03105310531055,223.58227190117566L477.5126012601261,223.36388122727345L476.82133213321333,222.3233419182442L475.7844284428443,221.6634217406686L476.04365436543657,221.1118501473778L476.3892889288929,219.2809289100042L477.16696669666965,218.55505907785067L477.59900990099015,218.21915243888168L478.29027902790284,218.77868381346823L478.63591359135916,219.2809289100042L479.4135913591359,219.6150623932769L480.27767776777677,220.28167058639386L480.1048604860486,220.55877557126573L479.67281728172816,221.27747884748675L478.9815481548155,221.60833184589683L478.8951395139514,221.00135588701113L477.8582358235824,222.59768065087977Z"
                        className="datamaps-subunit MNE"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M642.1210621062106,198.09858804680016L644.6269126912691,197.47452470287533L649.2065706570658,194.2577612749597L652.8357335733574,192.46679734886973L654.9095409540953,193.62019691342388L657.4153915391539,193.68405600223292L659.0571557155715,195.4629047643903L661.4765976597661,195.58929185082798L664.9329432943294,196.5343731221679L667.2659765976598,193.93926387588618L666.3154815481548,191.6936796812061L668.7349234923493,187.71035136624752L671.413591359136,189.28836433998674L673.6602160216021,189.74595266776618L676.4252925292529,190.72250612088013L676.9437443744374,193.556314932557L680.3136813681368,195.14654702258565L682.560306030603,194.44858745717025L685.67101710171,194.0030088334122L688.0040504050405,194.44858745717025L690.423492349235,196.28283636048786L691.8060306030603,198.16087635849604L694.0526552655265,198.09858804680016L697.0769576957696,198.72051156280753L699.3235823582359,197.7868251138115L702.4342934293429,197.2242956834936L705.9770477047705,194.57569183296442L707.4459945994599,194.9564640802955L708.655715571557,196.2198972408838L711.507200720072,195.90487102356238L710.3838883888388,198.72051156280753L708.655715571557,202.3473613614042L709.2605760576057,203.8024852924284L710.6431143114312,203.31871244433887L712.9761476147614,203.92323188332202L714.8771377137714,202.59067773398576L716.7781278127813,203.74208256703542L718.9383438343834,206.20269097005612L718.6791179117912,207.45060873365776L716.7781278127813,207.0355535251789L713.3217821782177,207.5098279435517L711.5936093609362,208.51373040012103L709.8654365436544,210.79698567997087L706.2362736273628,212.130885073413L703.8168316831683,213.91432114098706L701.3109810981098,213.22589958123842L700.0148514851486,212.9383367216942L698.7187218721872,215.1132497174353L699.496399639964,216.41801720216205L699.9284428442844,217.48940882322177L698.2002700270027,218.61098869081326L696.4720972097209,220.39255816674108L693.7070207020702,221.55322703787675L690.0778577857786,221.6634217406686L686.1894689468947,222.76210758741297L683.424392439244,224.5078611125041L682.3874887488748,223.5276959505081L679.4495949594959,223.5276959505081L675.9068406840685,221.55322703787675L673.4873987398739,221.05661053855752L670.3766876687669,221.49810730371934L665.3649864986498,220.78018659295853L662.7727272727273,220.83550154574561L661.3037803780379,218.8904026009599L660.2668766876687,215.85178828224014L658.7115211521152,215.4544582594538L655.8600360036003,213.34080569683266L652.6629162916292,212.8807730169119L649.8114311431144,212.30419408285155L648.9473447344735,210.85517392502516L649.8114311431144,206.73852538817283L648.1696669666967,203.92323188332202L644.7133213321333,202.59067773398576L642.7259225922593,200.6350907325153Z"
                        className="datamaps-subunit MNG"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M514.409090909091,362.3166920216113L516.2236723672368,362.10942243236076L519.1615661566157,362.8143945901939L519.7664266426643,362.48255260256633L521.4081908190819,362.4410836991853L522.2722772277228,361.69506851750384L523.7412241224123,361.7364928752734L526.3334833483348,360.7843424636527L528.2344734473447,359.3790811857325L528.6665166516651,360.45345377292966L528.580108010801,362.8973804424284L528.8393339333933,365.0586870269138L528.9257425742575,368.9011608722646L529.3577857785779,370.1177184086722L528.6665166516651,371.92664313998495L527.7160216021603,373.6573374735668L526.1606660666066,375.18196149387296L524.0004500450045,376.15856755358334L521.3217821782179,377.3502437769836L518.5567056705671,380.0859771139604L517.6926192619262,380.55791297142696L515.9644464446445,382.36472183577735L515.0139513951394,382.9255737965037L514.7547254725473,384.74290801935877L515.9644464446445,386.6994346250542L516.3964896489649,388.2281667555567L516.3964896489649,388.9729716023868L516.8285328532853,388.84142550056L516.7421242124212,391.3931972274459L516.3964896489649,392.63171174844206L516.9149414941494,393.07511575859104L516.5693069306931,394.18615576764756L515.6188118811881,395.1222712877749L513.6314131413142,396.0162716470745L510.6935193519352,397.4517802682784L509.65661566156615,398.3973257141869L509.91584158415844,399.52666958620597L510.52070207020705,399.7077428706881L510.26147614761476,401.11466255778134L508.446894689469,401.11466255778134L508.27407740774083,399.93423270678966L507.9284428442844,398.7131338120501L507.66921692169217,397.7666509102497L508.10126012601256,394.8099409977897L507.496399639964,392.9420343627203L506.3730873087309,389.2800971845194L508.8789378937894,386.35087930126565L509.483798379838,384.48278006122416L509.91584158415844,384.26613768009L510.1750675067507,382.7529218838071L509.7430243024303,382.01996295407093L509.82943294329436,380.12885888853594L510.34788478847884,378.37416583305793L510.34788478847884,375.18196149387296L509.0517551755176,374.37670391123L507.9284428442844,374.20734630991586L507.40999099909993,373.57277507509986L506.2866786678668,373.0657017651249L504.29927992799287,373.1079382629955L504.1264626462646,372.1795481118854L503.95364536453644,370.4117760618112L511.21197119711974,368.35666831932144L512.5945094509451,369.5300796295362L513.2857785778577,369.32036090469853L514.2362736273627,369.9497570864253L514.3226822682269,370.9162496811498L513.8042304230423,372.09523266962486L513.9770477047705,373.8688066716421L515.6188118811881,375.3940959664654L516.3100810081008,373.6573374735668L517.3469846984699,373.15017831226095L517.1741674167416,369.9497570864253L516.1372637263727,368.14738709303344L515.2731773177318,367.35281109959647L514.409090909091,367.3946038286916L513.8042304230423,364.18498562750017Z"
                        className="datamaps-subunit MOZ"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M514.409090909091,362.3166920216113L513.8042304230423,364.18498562750017L514.409090909091,367.3946038286916L515.2731773177318,367.35281109959647L516.1372637263727,368.14738709303344L517.1741674167416,369.9497570864253L517.3469846984699,373.15017831226095L516.3100810081008,373.6573374735668L515.6188118811881,375.3940959664654L513.9770477047705,373.8688066716421L513.8042304230423,372.09523266962486L514.3226822682269,370.9162496811498L514.2362736273627,369.9497570864253L513.2857785778577,369.32036090469853L512.5945094509451,369.5300796295362L511.21197119711974,368.35666831932144L509.91584158415844,367.7290534116755L510.6935193519352,365.4335005967313L511.471197119712,364.5592825480118L510.95274527452744,362.5240240179135L511.471197119712,360.53616194192864L511.90324032403237,359.8747548144718L511.2983798379838,357.81152621551536L510.0886588658866,356.7407281243047L512.508100810081,357.1935911438838L512.9401440144014,357.8527383486462L513.8042304230423,359.00753619174225Z"
                        className="datamaps-subunit MWI"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M676.5981098109811,319.5240682735643L677.2029702970298,319.728380259031L678.5855085508551,321.1984966478306L679.6224122412241,322.8301931894328L679.7952295229524,324.41952109832357L679.53600360036,325.5190268033198L679.7088208820882,326.37379885642224L679.8816381638163,327.7977400662675L680.7457245724573,328.44843696100673L681.6962196219622,330.56234502148476L681.6098109810981,331.3751127739426L679.9680468046805,331.53765239148487L677.6350135013502,329.7494403216065L674.8699369936994,327.838412853611L674.5243024302431,326.6179605322192L673.1417641764177,325.03043240950757L672.7961296129613,323.0340355465803L671.9320432043205,321.72899154332293L672.2776777677768,319.97351185806093L671.6728172817282,318.951818236836L672.1048604860487,318.5020057317099L674.0922592259226,319.5649332879261L674.2650765076507,320.7902898982864L675.8204320432044,320.5044738105789ZM714.445094509451,324.54171883908884L712.3712871287128,324.13436201734976L709.606210621062,324.13436201734976L708.7421242124212,326.86209744191234L707.7916291629163,327.7163927348266L706.5819081908191,331.05002028771656L704.594509450945,331.5782866441684L702.347884788479,330.88746696452745L701.2245724572458,331.0906578602908L699.8420342034203,332.30966326937784L698.2866786678669,332.14714117070343L696.7313231323133,332.6346985880982L695.0895589558957,331.2532052242332L694.6575157515751,329.6681412249088L696.4720972097209,330.48106118314223L698.2866786678669,330.0339743228801L698.8051305130514,328.0010982303567L699.8420342034203,327.5536909450456L702.6935193519353,327.02484200400073L704.4216921692168,325.11187291720574L705.6314131413142,323.6046620690135L706.6683168316832,324.86754143407273L707.1867686768677,324.05287988844174L708.3100810081007,324.09362140801085L708.4828982898289,322.58554859758885L708.5693069306931,321.40255604468575L710.470297029703,319.728380259031L711.6800180018001,317.8065042391414L712.6305130513051,317.8065042391414L713.8402340234024,319.03358441337355L713.9266426642664,320.0960603849984L715.568406840684,320.749462666724L717.5558055805582,321.48417173815943L717.38298829883,322.4224313793385L715.7412241224122,322.5447708674462L716.1732673267327,323.7269145319004Z"
                        className="datamaps-subunit MYS"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M829.3685868586858,386.26379025807245L831.3559855985598,387.83446635775704L832.5657065706571,389.06069534367094L831.7016201620162,389.67535517102533L830.3190819081908,388.9729716023868L828.6773177317732,387.7907476270818L827.1219621962196,386.43798822004004L825.480198019802,384.6128225594944L825.1345634563456,383.74667778167486L826.1714671467147,383.7899402672008L827.5540054005401,384.65617959949105L828.590909090909,385.52433030224796Z"
                        className="datamaps-subunit NCL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M451.93564356435644,323.0340355465803L449.42979297929793,323.889904635921L448.479297929793,323.7676634628299L447.61521152115216,324.29731542432523L445.6278127812781,324.25657841994723L444.33168316831683,322.74864911836306L443.55400540054006,320.9944080836291L441.9122412241224,319.4014653202552L440.09765976597663,319.44233429338095L437.93744374437443,319.44233429338095L438.1102610261026,315.5533495826275L438.0238523852385,313.99370507354917L438.45589558955896,312.472587276008L439.2335733573358,311.7316285707737L440.35688568856887,310.2064646945968L440.09765976597663,309.54602851471327L440.61611161116116,308.5543015279961L440.09765976597663,307.1056258782106L440.1840684068407,306.3179541320746L440.35688568856887,304.1158565347247L441.04815481548155,303.11618629915336L441.3937893789379,301.697179478319L441.9986498649865,301.15371900286846L444.5909090909091,300.8608753115152L447.01035103510355,301.7807439894446L447.8744374437444,302.74089214162575L449.0841584158416,302.78260291843196L450.2074707470747,302.1566380848784L453.14536453645366,303.4495883246943L454.3550855085508,303.36625470774885L455.73762376237624,302.3236258607376L457.2065706570657,302.4071022703175L457.8978397839784,302.07312665377077L459.19396939693974,302.19838940855743L461.0085508550855,302.9077180695863L462.90954095409546,301.5300147685302L463.42799279927993,301.65539276792L465.06975697569754,304.3239208633018L465.501800180018,304.2823134485892L466.452295229523,305.28014941867906L466.19306930693074,305.6954648104521L466.10666066606666,306.5253235376995L464.03285328532854,308.4302429075607L463.42799279927993,309.9588668651651L463.0823582358236,311.2372934699761L462.5639063906391,311.7728099278592L462.1318631863187,313.45955116353656L460.83573357335734,314.48649779830373L460.490099009901,315.71737860121266L459.8852385238524,316.660037857065L459.7124212421242,317.68372510101665L458.07065706570654,318.5020057317099L456.68811881188117,317.51999883414493L455.8240324032403,317.5609326350502L454.3550855085508,318.951818236836L453.6638163816382,318.9927020068327L452.54050405040505,321.3209357569959Z"
                        className="datamaps-subunit NGA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M225.80423042304233,307.685447397249L224.94014401440145,306.9398747418618L223.81683168316832,305.9445296336415L223.29837983798382,305.11394995076876L222.2614761476148,304.3239208633018L221.13816381638162,303.2412332006669L221.39738973897394,302.86601587837924L221.74302430243029,303.2412332006669L221.91584158415844,303.0328075365083L222.6935193519352,302.9494174069906L222.95274527452747,302.3653655186822L223.29837983798382,302.3653655186822L223.29837983798382,301.15371900286846L223.81683168316832,301.07006455947453L224.33528352835287,301.1118932953508L224.85373537353738,300.4422673337334L225.54500450045006,300.9445601407871L225.80423042304233,300.65160974049195L226.23627362736275,300.3585087420144L227.10036003600362,299.64605637961927L227.10036003600362,299.1425980338207L227.3595859585959,299.1845705188301L227.7052205220522,298.5966609971274L227.96444644464447,298.51262176817727L228.31008100810084,298.8906953128771L228.82853285328534,299.0166612292211L229.3469846984699,298.6806871207075L229.95184518451848,298.6806871207075L230.81593159315935,298.3445038603901L231.16156615661566,298.00810930743376L231.93924392439246,298.09222787167465L231.76642664266427,298.30246614031L231.5936093609361,298.8487001853856L231.85283528352835,299.77184930805794L231.33438343834385,300.6097474224203L231.07515751575158,301.6136030822035L230.9887488748875,302.69917849488496L231.07515751575158,303.3245836869599L231.16156615661566,304.448726818229L230.81593159315935,304.6982657851031L230.55670567056708,305.7369820579214L230.72952295229524,306.3594330526645L230.21107110711074,307.0227552319735L230.3838883888389,307.685447397249L230.72952295229524,308.05794087805197L230.12466246624666,308.59564976213903L229.43339333933397,308.4302429075607L229.0877587758776,307.93379779658045L228.31008100810084,307.7268451041974L227.7052205220522,308.0165622196603L226.14986498649864,307.39559607073056Z"
                        className="datamaps-subunit NIC"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M448.04725472547256,182.00327908942825L448.479297929793,183.36321235296296L447.9608460846085,186.982300737606L447.35598559855987,188.4353753390054L445.88703870387036,188.4353753390054L446.3190819081908,192.46679734886973L444.93654365436544,191.56449789869453L443.467596759676,189.9416975355112L441.2209720972097,190.72250612088013L439.492799279928,190.39758995502177L440.70252025202524,189.35380719849897L442.77632763276324,183.5662762031185L446.0598559855986,181.8666901748513Z"
                        className="datamaps-subunit NLD"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M642.9851485148515,264.7886145211277L642.8123312331232,265.9352755251389L643.1579657965797,267.66982340047275L642.8123312331232,268.71489430383036L640.8249324932494,268.76025176752876L637.9734473447345,268.1246393667461L636.0724572457245,267.8973159295031L634.6899189918992,266.52979808279315L631.4063906390639,266.1640778005812L628.2956795679568,264.65071557781954L626.0490549054906,263.31432710778085L623.7160216021603,262.25002594419277L624.6665166516652,259.68865566608855L626.1354635463547,258.4225857448806L627.1723672367236,257.7637951576312L629.0733573357336,258.61051999215397L631.492799279928,260.4361951907736L632.8753375337533,260.8092157167879L633.6530153015301,262.157290898293L635.5540054005401,262.66696166380046L637.45499549955,263.8680595297587L640.2200720072008,264.51275184951135Z"
                        className="datamaps-subunit NPL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M846.7367236723671,442.29709084340476L847.2551755175518,443.5914371457059L848.9833483348335,442.29709084340476L849.6746174617462,443.64554278010274L849.6746174617462,445.0027868242228L848.8105310531054,446.4787053843123L847.2551755175518,448.9069962336091L846.0454545454545,450.2439157467582L846.9095409540953,451.8150268714646L845.0085508550856,451.87136799081225L843.0211521152114,453.1149459726447L842.3298829882988,455.3389736785037L840.9473447344735,458.8110229635413L839.1327632763275,460.3352925648879L837.9230423042304,461.3385765006043L835.6764176417641,461.27941248527463L834.1210621062106,460.0999945121647L831.5288028802879,459.8649871246707L831.0967596759676,458.57759568672304L832.3928892889289,456.0859798680269L835.4171917191718,452.7184128485052L836.9725472547254,452.0968926244889L838.7007200720072,450.85966258033005L840.7745274527454,449.129199995282L842.1570657065706,447.4134730495905L843.2803780378038,445.0027868242228L844.1444644464448,444.18737478656016L844.576507650765,442.4046478534844L846.2182718271827,440.95724521745274ZM850.538703870387,427.6418281523396L852.2668766876687,430.8332847143522L852.3532853285328,428.7512905531047L853.4765976597661,429.56152874127935L853.8222322232223,431.85583285909723L855.7232223222322,432.8315646631406L857.3649864986498,433.0890429717737L858.7475247524753,431.95834244433775L859.9572457245724,432.26615131312104L859.3523852385238,435.0036931031187L858.6611161116111,436.7778767089275L856.7601260126013,436.72548885720505L856.1552655265527,437.67040775361943L856.414491449145,438.98968307328704L856.0688568856885,439.57274046634524L855.1183618361836,441.2780330467194L853.9086408640864,443.4832680290702L852.0940594059406,444.7306255744366L851.6620162016202,443.9162821944523L850.625112511251,443.42920452280583L852.0076507650765,440.85042389866663L851.2299729972997,439.0955755120873L848.6377137713772,437.8809502443953L848.7241224122413,436.72548885720505L850.4522952295229,435.6803629564705L850.8843384338434,433.2952393188868L850.7979297929793,431.3439817020893L849.7610261026102,429.30802288041497L849.8474347434743,428.8018471015333L848.7241224122413,427.5412299750513L846.8231323132313,424.94068620110136L845.7862286228623,422.86079385682467L846.7367236723671,422.6636406028965L848.0328532853287,424.294983353059L849.8474347434743,425.04018030188433Z"
                        className="datamaps-subunit NZL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M611.8780378037804,238.38824483973042L613.6926192619262,239.7599055987588L614.3838883888388,242.07819810189355L618.2722772277227,243.27867940783585L616.0256525652566,245.71099535627584L613.3469846984699,246.15508476667708L609.7178217821782,245.46392634579416L608.508100810081,246.6967600079055L609.3721872187218,249.2413408244666L610.1498649864986,251.1811738659054L612.1372637263727,252.5783346615425L610.0634563456346,254.20679819344048L610.1498649864986,256.2045576993334L607.8168316831683,259.032901761816L606.2614761476148,261.8324802911767L603.7556255625562,264.65071557781954L600.9905490549055,264.46674951414343L598.3118811881188,267.30548177300454L599.8672367236724,268.488007017713L600.2128712871287,270.5691593292017L601.50900090009,271.91908125416774L602.0274527452746,274.20112798713313L596.7565256525653,274.15653341637864L595.1147614761477,275.93571984004893L593.3865886588659,275.26962168171605L592.6089108910892,273.3528053817492L590.7943294329433,271.3348142788504L586.3874887488748,271.8741752755511L582.499099909991,271.91908125416774L579.1291629162916,272.2781047007171L579.9932493249325,269.1681703670599L583.4495949594959,267.8063392507885L583.2767776777678,266.57548180208425L582.1534653465346,266.11833135759406L582.0670567056707,263.7297254770336L579.7340234023402,262.5280505691161L578.7835283528353,260.85580841222225L577.5738073807381,259.4078088178081L581.6350135013502,260.8092157167879L584.0544554455446,260.4361951907736L585.43699369937,260.76261528789513L585.9554455445544,260.1561029416788L587.5972097209722,260.3895326549146L590.7079207920792,259.2672783679322L590.7943294329433,256.91442165476747L592.1768676867687,255.30267816270882L593.9050405040504,255.30267816270882L594.1642664266427,254.5408105776118L596.0652565256526,254.15904735492995L596.9293429342935,254.39771451509282L597.8798379837983,253.63321112749537L597.7070207020702,251.90479583691797L598.7439243924393,250.21312539240745L600.2992799279928,249.4846406613292L599.3487848784878,247.58055349839282L601.595409540954,247.67855645877006L602.2866786678668,246.59836320713907L602.2002700270027,245.51336037361273L603.4099909990999,244.2744511763563L603.0643564356435,242.7792215120154L602.545904590459,241.52592092589464L603.9284428442844,240.2658568848806L606.5207020702071,239.60790335623693L609.2857785778579,239.2528400502007L610.495499549955,238.6937697952079Z"
                        className="datamaps-subunit PAK"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M244.55490549054906,317.11057795960267L243.7772277227723,316.41420879772693L243.2587758775878,315.1021310323409L243.8636363636364,314.4454415620307L243.2587758775878,314.28119884215266L242.82673267326734,313.45955116353656L241.61701170117016,312.8016977233973L240.5801080108011,312.9662066535948L240.06165616561657,313.7882980097083L239.11116111611162,314.4043835520165L238.59270927092712,314.48649779830373L238.33348334833485,315.0200691583979L239.45679567956796,316.3322530553405L238.85193519351938,316.6190703014121L238.50630063006304,316.9877219822506L237.3829882988299,317.11057795960267L236.95094509450948,315.67637384326156L236.60531053105314,316.08634724580537L235.82763276327637,315.9223775911002L235.39558955895595,314.9380003984413L234.3586858685869,314.814884282012L233.75382538253825,314.52755226457225L232.71692169216925,314.52755226457225L232.63051305130514,315.0611009542583L232.3712871287129,314.69175250429987L232.54410441044107,314.19906676500244L232.71692169216925,313.70612237498625L232.63051305130514,313.25402393782616L232.9761476147615,312.9662066535948L232.457695769577,312.59601824536446L232.457695769577,311.64925978626377L233.4081908190819,311.40210459677746L234.2722772277228,312.3079852758184L234.18586858685867,312.8016977233973L235.13636363636368,312.9250822936531L235.39558955895595,312.71943173017917L236.0868586858686,313.29513313282695L237.21017101710171,313.1306850430892L238.24707470747077,312.51373288147823L239.71602160216023,312.01985581687654L240.49369936993702,311.31970315369324L241.8762376237624,311.44330223758607L241.7898289828983,311.6904451915064L243.08595859585964,311.7728099278592L244.12286228622864,312.1845131126366L244.9869486948695,312.9250822936531L245.85103510351038,313.58284510502307L245.5918091809181,313.95262730555527L246.11026102610262,315.38929379391766L245.67821782178217,316.08634724580537L244.9005400540054,315.9223775911002Z"
                        className="datamaps-subunit PAN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M264.515301530153,377.3502437769836L263.8240324032404,378.6305125963344L262.61431143114316,379.27203110814435L260.19486948694873,377.86191374906775L260.0220522052206,376.79658256408214L255.2695769576958,374.29201776653844L250.94914491449146,371.5475170638613L249.04815481548158,370.0337312614373L248.09765976597663,367.98001716455263L248.443294329433,367.26923457576413L246.45589558955896,364.0602682595048L244.03645364536456,359.5442698679931L241.7898289828983,354.6851997377533L240.8393339333934,353.5771037786453L240.06165616561657,351.8148692060419L238.24707470747077,350.2190160617719L236.51890189018903,349.2380139186111L237.2965796579658,348.1761035816288L236.0868586858686,345.8508266975219L236.86453645364537,344.18030041350937L238.76552655265527,342.67398470666706L239.02475247524754,343.6509312004201L238.33348334833485,344.22102696627206L238.41989198919893,345.1172332507714L239.45679567956796,344.9135117745364L240.40729072907294,345.1987283393365L241.44419441944197,346.3808438215802L242.74032403240327,345.40248255788885L243.2587758775878,343.7730810008654L244.72772277227725,341.69745100156763L247.57920792079207,340.76194783229107L250.1714671467147,338.24148086097426L250.94914491449146,336.6567259930748L250.6035103510351,334.82850797509315L251.20837083708375,334.6253823222288L252.85013501350136,335.7629025462649L253.62781278127812,336.90051037606514L254.7511251125113,337.510006253589L256.1336633663367,340.03001962596784L257.94824482448246,340.31463856945703L259.24437443744375,339.7047698440631L260.10846084608465,340.1113368472148L261.5774077407741,339.90804742042275L263.3919891989199,341.00596238971406L261.83663366336634,343.4880760192477L262.5279027902791,343.52878862321484L263.73762376237624,344.7912898844294L261.5774077407741,344.70981314592694L261.2317731773178,345.07648710612983L259.33078307830783,345.52474654538446L256.5657065706571,347.1558037088216L256.3928892889289,348.29858897769503L255.78802880288032,349.1154422455509L256.04725472547256,350.42349027695195L254.5783078307831,351.1189678679645L254.5783078307831,352.1425039673459L253.97344734473447,352.5931649999934L254.92394239423945,354.7673318918452L256.22007200720077,356.24696836668306L255.78802880288032,357.27595596704026L257.3433843384339,357.44070995639504L258.2938793879388,358.71867932438465L260.3676867686769,358.8011990033918L262.3550855085509,357.3583288944243L262.1822682268227,361.0739934821398L263.3055805580558,361.36376108198704L264.6017101710171,360.9084644246293L266.6755175517552,364.89217508756894L266.1570657065707,365.72517855342534L266.07065706570654,367.4363995413364L265.98424842484246,369.5300796295362L265.1201620162017,370.7900865924981L265.55220522052207,371.7159834186058L264.9473447344735,372.5591392421723L265.98424842484246,374.63085082059115Z"
                        className="datamaps-subunit PER"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M734.8375337533753,314.19906676500244L735.0103510351034,315.8403829402719L735.1831683168316,317.1924742761119L734.4054905490549,319.4014653202552L733.45499549955,316.9467669076843L732.3316831683169,318.1747626793895L733.1093609360937,319.93265980233406L732.4180918091809,321.0760470384269L729.6530153015302,319.6466593834466L728.9617461746175,317.92927014874334L729.6530153015302,316.78293110040386L728.1840684068407,315.63536742332326L727.4063906390638,316.6190703014121L726.2830783078308,316.5371304561167L724.4684968496849,317.8883496425833L724.1228622862286,317.1924742761119L725.0733573357336,315.1431593963704L726.542304230423,314.4454415620307L727.8384338433843,313.54174898192446L728.7025202520251,314.6507050807019L730.5171017101711,313.95262730555527L730.9491449144914,312.8839560211516L732.590909090909,312.84282783232254L732.504500450045,310.9487942425807L734.4054905490549,312.1021884409193L734.6647164716471,313.3362404491395ZM729.0481548154817,309.669903202726L728.1840684068407,310.49523046289517L727.4063906390638,312.01985581687654L726.7151215121512,312.71943173017917L725.2461746174617,311.0724492589267L725.6782178217823,310.4127366969683L726.2830783078308,309.71119033425214L726.542304230423,308.2234319145327L727.9248424842483,308.05794087805197L727.492799279928,309.71119033425214L729.3073807380738,307.35417906621785ZM715.9140414041403,312.01985581687654L712.7169216921691,314.32226219581594L713.9266426642664,312.63715801133077L715.6548154815481,311.11366342665417L717.0373537353735,309.42213380584747L718.3334833483349,307.0227552319735L718.7655265526553,309.0090055142047L717.2101710171016,310.3714865998627ZM724.0364536453644,305.7369820579214L725.4189918991899,306.4838546881883L726.9743474347434,306.4838546881883L726.9743474347434,307.51983254486714L725.8510351035104,308.5543015279961L724.2956795679568,309.29821897230147L724.2092709270926,308.14069110794924L724.382088208821,306.8984307955782ZM732.6773177317732,305.07239348867597L733.3685868586858,307.8096333379568L731.5540054005401,307.14705751964664L731.5540054005401,307.9751811937975L732.1588658865887,309.5047325080895L731.0355535553556,310.04140817869467L730.9491449144914,308.30616332882846L730.1714671467148,308.18206268721565L729.8258325832584,306.69117389537394L731.2083708370837,306.8984307955782L731.2083708370837,305.98603144405376L729.7394239423943,304.1158565347247L732.0724572457245,304.157474859422ZM723.1723672367237,302.82431082933863L722.5675067506751,304.9477082107094L721.530603060306,303.7411679466829L720.2344734473447,301.8642966481263L722.3082808280827,301.9478374868877ZM722.653915391539,289.2662035885282L724.1228622862286,289.9938958172963L724.9005400540054,289.3518775637039L725.0733573357336,289.9938958172963L724.7277227722773,291.0191846096612L725.5054005400541,292.8503651220789L724.9005400540054,294.9283781529434L723.5180018001801,295.7317549230623L723.0859585958596,297.7556734404679L723.6908190819082,299.72992149737917L724.9005400540054,300.023349957816L726.0238523852386,299.72992149737917L728.9617461746175,301.07006455947453L728.7889288928893,302.4071022703175L729.5666066606661,303.0328075365083L729.3073807380738,304.157474859422L727.4063906390638,302.9494174069906L726.542304230423,301.65539276792L725.9374437443745,302.57402029468625L724.382088208821,301.07006455947453L722.2218721872188,301.4464145047085L721.0121512151215,300.9027192505624L721.0985598559855,299.8556954536953L721.8762376237623,299.2265397858414L721.1849684968497,298.6806871207075L720.8393339333934,299.56217857239585L719.6296129612962,298.13428216180716L719.2839783978399,297.03977853785193L719.1975697569757,294.67440817991553L720.1480648064806,295.4781973947013L720.4072907290729,291.57357105284063L721.1849684968497,289.2662035885282Z"
                        className="datamaps-subunit PHL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M805.606210621062,350.8734577324437L804.9149414941494,351.1189678679645L803.8780378037803,350.2190160617719L802.8411341134114,348.66611111433036L802.3226822682268,346.82945729680193L802.6683168316832,346.5847430934354L802.9275427542755,347.31900349638806L803.6188118811881,347.8495285282108L804.8285328532852,349.40146100175184L805.9518451845186,350.2190160617719ZM796.2740774077407,347.645457393842L794.9779477947794,347.8495285282108L794.6323132313231,348.5435926458327L793.3361836183617,349.1154422455509L792.0400540054005,349.6875440638541L790.8303330333033,349.6875440638541L788.8429342934294,348.9520313466098L787.4603960396039,348.29858897769503L787.633213321332,347.5638370566932L789.7934293429344,347.89034626265635L791.0895589558957,347.72708235453445L791.521602160216,346.5439611300462L791.8672367236724,346.50318022478L792.0400540054005,347.76789657777937L793.4225922592259,347.6046466491383L794.1138613861385,346.7886689087523L795.4963996399639,345.9323566308901L795.1507650765076,344.5061369154412L796.6197119711971,344.4654043175801L797.1381638163816,344.8320296065553L797.0517551755175,346.1769706414784ZM770.0058505850584,356.4526674236639L769.9194419441944,348.58443089466124L769.9194419441944,340.7212806810403L774.0670567056704,342.389121934674L778.473897389739,343.7730810008654L780.1156615661566,344.9949975981349L781.4981998199819,346.2177432118308L781.8438343834384,347.6046466491383L785.8186318631863,349.1154422455509L786.423492349235,350.38259264093006L784.2632763276328,350.66890570171904L784.7817281728172,352.2653926143499L786.9419441944194,353.8642667957847L788.497299729973,356.4115237266523L789.7934293429344,356.3292421686004L789.7070207020702,357.44070995639504L791.6080108010801,357.8527383486462L790.8303330333033,358.30620988251184L793.4225922592259,359.33778957672126L793.1633663366335,360.0400515716279L791.6080108010801,360.20538484712523L791.0031503150315,359.5442698679931L788.9293429342933,359.29650018464514L786.5099009900991,358.9249947845354L784.6089108910891,357.3583288944243L783.2263726372637,356.04131759695287L782.0166516651666,353.9052969106959L778.9059405940594,352.83906134535073L776.8321332133213,353.5360872725712L775.363186318632,354.3567423733116L775.7088208820883,356.1235721405432L773.8078307830783,356.9465449964085L772.4252925292529,356.5761102319515ZM799.0391539153916,345.2802271842749L798.2614761476148,345.9323566308901L797.8294329432943,344.5061369154412L797.3109810981098,343.56950201900963L796.1876687668768,342.79607942975315L794.8051305130513,341.7788142502916L793.0769576957696,341.04663345754466L793.7682268226822,340.4772890991126L795.0643564356436,341.16865011793976L795.8420342034204,341.69745100156763L796.8789378937894,342.26704833502424L797.8294329432943,343.28452475139426L798.7799279927993,344.0581258361918Z"
                        className="datamaps-subunit PNG"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M272.46489648964894,289.2662035885282L273.67461746174615,289.4803568271549L274.10666066606666,289.9938958172963L273.501800180018,290.63497812212995L271.6872187218722,290.59226811334406L270.2182718271827,290.6776840390847L270.13186318631864,289.6087981611001L270.477497749775,289.22336024735495Z"
                        className="datamaps-subunit PRI"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M745.0337533753376,221.9386479659898L745.3793879387939,222.4879892969014L744.428892889289,222.3233419182442L743.3919891989199,223.4185006260058L742.7007200720072,224.5078611125041L742.7871287128712,226.7770816574697L741.577407740774,227.47450434078058L741.1453645364537,228.06283573613533L740.1948694869486,228.96887525914525L738.6395139513951,229.50004404334697L737.6026102610261,230.347180925312L737.5162016201621,231.6641940980943L737.2569756975697,232.03152660871427L738.2074707470748,232.50290179491725L739.503600360036,233.85897237062568L739.1579657965797,234.63753563108133L738.2074707470748,234.8446906200661L736.4792979297929,234.9481956145293L735.5288028802879,236.3408258707995L734.491899189919,236.23796512770764L734.3190819081908,236.49502861550656L733.1957695769577,235.92909924288492L732.8501350135014,236.49502861550656L732.1588658865887,236.75179819493886L732.0724572457245,236.18651705248953L731.4675967596759,235.92909924288492L730.7763276327632,235.41337247211146L731.4675967596759,234.06685777108623L732.0724572457245,233.7029295093189L731.8132313231322,233.12982295062488L732.4180918091809,231.50657539079555L732.2452745274527,230.98034958636924L730.8627362736274,230.61122735433526L729.7394239423943,229.8181128008698L731.7268226822682,227.79561530898147L734.3190819081908,226.07733590986854L735.9608460846084,223.80043124984667L737.0841584158416,224.8335534132432L739.1579657965797,224.9420039813054L738.8123312331232,223.25459889450934L742.527902790279,221.82860207418366L743.4783978397841,220.0041849451904Z"
                        className="datamaps-subunit PRK"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M409.85463546354634,223.58227190117566L410.71872187218725,222.76210758741297L411.66921692169217,222.3233419182442L412.27407740774083,223.90942442532793L413.65661566156615,223.90942442532793L414.0886588658866,223.47310552959894L415.471197119712,223.58227190117566L416.1624662466247,225.21288297000444L415.0391539153915,226.07733590986854L415.0391539153915,228.5429849993089L414.60711071107113,229.0220516875774L414.52070207020705,230.45283837555564L413.483798379838,230.7167553369713L414.4342934293429,232.60751359149975L413.82943294329436,234.63753563108133L414.60711071107113,235.5166132288013L414.26147614761476,236.3408258707995L413.3973897389739,237.46919987621135L413.57020702070207,238.49013197897327L412.61971197119715,239.2528400502007L411.40999099909993,238.84637905249122L410.11386138613864,239.15129240639573L410.54590459045903,236.80311695018457L410.2866786678668,234.9481956145293L409.2497749774978,234.63753563108133L408.6449144914492,233.49470008194294L408.81773177317734,231.45401034448065L409.76822682268227,230.347180925312L409.9410441044105,229.07521485271707L410.45949594959495,227.15290397489412L410.3730873087309,225.80757888761468L409.9410441044105,224.67077121596074Z"
                        className="datamaps-subunit PRT"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M281.0193519351935,389.2800971845194L281.9698469846985,386.17672105100155L282.0562556255626,384.7862794089101L283.1795679567957,382.5372097330533L287.4135913591359,381.8046346548857L289.6602160216022,381.8476913675458L291.82043204320433,383.14149192499474L291.9068406840684,383.91975583539465L292.5981098109811,385.3505453906298L292.42529252925294,388.88526893994526L295.01755175517553,389.36789502315446L295.9680468046805,388.84142550056L297.6098109810981,389.5435545294515L298.0418541854186,390.3350836221725L298.21467146714673,392.72034676060156L298.5603060306031,393.74130268419754L299.42439243924395,393.83022643376495L300.37488748874887,393.43025313311716L301.23897389738977,393.9191735734901L301.1525652565257,395.34554442321894L300.8933393339334,396.91271882863924L300.37488748874887,398.44242185830615L300.02925292529255,400.79640868992067L297.86903690369036,402.8481677898551L295.9680468046805,403.3060197377872L293.2029702970297,402.89392138305607L290.78352835283533,402.16270046974626L293.2029702970297,398.08183207099023L292.85733573357334,396.91271882863924L290.3514851485149,395.88201669840856L287.4135913591359,393.9191735734901L285.42619261926194,393.5190953580064Z"
                        className="datamaps-subunit PRY"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M553.465796579658,273.129200134502L553.2929792979298,271.1998322169732L553.8978397839784,269.801649753812L554.5891089108911,269.5303159009955L555.2803780378038,270.34361500919874L555.3667866786678,271.91908125416774L554.8483348334834,273.4868956846177L554.1570657065706,273.66559807920237Z"
                        className="datamaps-subunit QAT"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M485.98064806480653,203.2581520600709L487.01755175517553,202.46905960311594L488.486498649865,202.8943735453394L490.0418541854186,202.8943735453394L491.16516651665165,203.74208256703542L492.02925292529255,203.19757188673648L493.7574257425743,202.8943735453394L494.3622862286229,202.04276429907836L495.3991899189919,202.04276429907836L496.0904590459046,202.40822050536664L496.8681368136814,203.4397739184806L497.6458145814582,204.94642857834404L499.02835283528356,207.0355535251789L499.11476147614763,208.57261830935175L498.85553555355534,210.03892784016455L499.2875787578758,211.61002336414242L500.3244824482448,212.24644166550814L501.447794779478,211.72589193302372L502.57110711071107,212.30419408285155L502.57110711071107,213.16842104754699L501.447794779478,213.91432114098706L500.6701170117012,213.57041454175823L500.06525652565256,217.60185124960697L498.5963096309631,217.26433301556375L496.8681368136814,216.0784748062713L494.01665166516653,216.81341445486936L492.89333933393345,217.7142301725887L489.3505850585059,217.48940882322177L487.53600360036006,216.98262906523132L486.5855085508551,217.26433301556375L485.89423942394245,215.85178828224014L485.462196219622,215.28392804570342L485.98064806480653,214.7144220805843L485.3757875787579,214.314780902415L484.6845184518452,215.0563239593227L483.2155715571557,214.08604731266695L483.04275427542757,212.65034724998924L481.5738073807381,211.84169095745563L481.3145814581459,210.79698567997087L480.01845184518453,209.39514043065594L481.91944194419443,208.74917261344615L483.3883888388839,206.3814721168209L484.511701170117,203.98357578483464Z"
                        className="datamaps-subunit ROU"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M504.472097209721,337.22556817233885L505.42259225922595,338.56661359107375L505.3361836183619,339.9893617441696L504.6449144914492,340.27397722000717L503.34878487848783,340.1113368472148L502.65751575157515,341.49405385738396L501.1885688568857,341.29067203858693L501.3613861386139,339.9893617441696L501.70702070207017,339.7860794810307L501.79342934293425,338.36340307534385L502.484698469847,337.7131841698428L503.0895589558956,337.95700701636036Z"
                        className="datamaps-subunit RWA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M410.71872187218725,265.38543209892214L410.71872187218725,265.56882629053024L410.63231323132317,266.07257791469544L410.63231323132317,270.1630635568817L402.76912691269126,269.98240859552766L402.85553555355534,276.77758908341997L400.60891089108907,276.9987931885593L400.0040504050405,278.32308901665897L400.4360936093609,282.09262087340875L391.1039603960396,282.0490089964143L390.5855085508551,282.9202968267899L390.6719171917192,281.83087401462006L396.11566156615663,281.6126125818517L396.37488748874887,280.69451961874006L397.4117911791179,279.510745635121L398.1894689468947,275.93571984004893L401.47299729973,273.08446082368596L402.5963096309631,269.7564437684735L403.37398739873987,269.5303159009955L404.15166516651664,267.4421610307784L406.1390639063907,267.1687409394708L407.0031503150315,267.53324640756443L408.1264626462646,267.53324640756443L408.9041404140414,266.8950738927365L410.3730873087309,266.8037964389212L410.3730873087309,265.38543209892214Z"
                        className="datamaps-subunit ESH"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M534.1966696669667,294.7167456633066L533.8510351035104,293.6147664269167L533.1597659765977,292.8928644332396L532.9869486948695,291.8718066890269L531.6908190819082,290.9765112651398L530.3946894689469,288.83757874445075L529.7898289828984,286.7741358168229L528.0616561656166,285.0466902746833L527.0247524752475,284.6136667290999L525.469396939694,282.1798295477855L525.1237623762377,280.3879824657816L525.2965796579658,278.8514222108283L523.9140414041404,275.93571984004893L522.7907290729073,274.91383401931057L521.494599459946,274.3794467057347L520.6305130513051,272.86067265659494L520.8033303330333,272.2781047007171L520.1120612061206,270.8846520112987L519.4207920792079,270.2984868298198L518.470297029703,268.3063768721625L517.0013501350135,266.11833135759406L515.7916291629163,264.2826678754727L514.5819081908191,264.2826678754727L515.0139513951394,262.75953169068833L515.1003600360036,261.8324802911767L515.3595859585959,260.71600711890767L518.0382538253825,261.1817412999035L519.0751575157516,260.29618419645794L519.6800180018002,259.31412979712314L521.494599459946,258.93909524428454L521.9266426642664,257.9992604549728L522.7043204320432,257.5281254908747L520.2848784878488,254.73148413152495L525.1237623762377,253.29803434862254L525.5558055805581,252.9144439529478L528.493699369937,253.6810582685901L532.0364536453645,255.6353057624882L538.7763276327632,261.22827236602114L543.2695769576958,261.41431995696695L545.429792979298,261.6931620463284L546.0346534653465,262.9908263404219L547.6764176417641,262.9445822895875L548.6269126912691,265.29369243633386L549.8366336633663,265.8894940211824L550.2686768676867,266.84943861696024L551.8240324032403,267.9882655535586L551.9968496849685,269.0775681241523L551.7376237623762,269.98240859552766L552.0832583258326,270.8846520112987L552.7745274527454,271.6046079201593L553.1201620162017,272.50229264272616L553.465796579658,273.129200134502L554.1570657065706,273.66559807920237L554.8483348334834,273.4868956846177L555.2803780378038,274.468570403091L555.3667866786678,275.09177467328874L556.3172817281728,277.7498396732203L563.489198919892,279.02735993806823L564.0076507650765,278.4992870815444L565.1309630963096,280.3441705889919L563.489198919892,285.47924418314324L556.3172817281728,288.0220077249087L549.404590459046,289.0090798224342L547.1579657965797,290.1221866637753L545.429792979298,292.765354915702L544.3064806480648,293.19025190486883L543.7016201620162,292.3400710543493L542.7511251125113,292.46769709718876L540.418091809181,292.21240979499476L539.9860486048605,291.99956244508917L537.2209720972097,292.04213979423076L536.6161116111612,292.25496746844954L535.5792079207921,291.616188087176L534.9743474347434,292.8503651220789L535.2335733573358,293.9117013741304Z"
                        className="datamaps-subunit SAU"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M513.0265526552655,311.64925978626377L512.6809180918092,311.60807235125156L512.6809180918092,310.4127366969683L512.421692169217,309.5873222967985L511.21197119711974,308.59564976213903L510.86633663366337,306.8569843765939L511.21197119711974,305.0308343806119L510.0886588658866,304.86457140932856L509.91584158415844,305.40477143100486L508.446894689469,305.5293699146505L509.0517551755176,306.23498870420616L509.22457245724576,307.7268451041974L507.9284428442844,309.0503285154481L506.71872187218725,310.82512037648434L505.50900090009003,311.0724492589267L503.521602160216,309.669903202726L502.57110711071107,310.16520381993905L502.31188118811883,310.86634709928506L501.1021602160216,311.31970315369324L501.01575157515754,311.8139892665556L498.5963096309631,311.8139892665556L498.33708370837087,311.31970315369324L496.60891089108907,311.2372934699761L495.7448244824482,311.64925978626377L495.05355535553554,311.44330223758607L493.8438343834384,310.04140817869467L493.4117911791179,309.3395261593049L491.6836183618362,309.71119033425214L490.9923492349235,310.82512037648434L490.3874887488749,313.0073291047436L489.52340234023404,313.45955116353656L488.8321332133213,313.70612237498625L488.65931593159314,313.62393937573074L487.7952295229523,312.8839560211516L487.62241224122414,312.1433517689263L488.05445544554453,311.15487551520073L488.05445544554453,310.1239407782893L486.6719171917192,308.6369956830621L486.4126912691269,307.5612398694367L486.4126912691269,306.9813162193567L485.5486048604861,306.2764726838982L485.462196219622,304.822999011912L485.0301530153015,303.8660889597904L484.16606660666065,304.03261166891684L484.42529252925294,303.11618629915336L485.0301530153015,302.07312665377077L484.77092709270926,301.07006455947453L485.5486048604861,300.3166247949171L485.0301530153015,299.72992149737917L485.63501350135016,298.21838077907717L486.7583258325833,296.36508941117444L488.8321332133213,296.53384501225815L488.7457245724572,286.55860563453746L488.7457245724572,285.47924418314324L491.510801080108,285.47924418314324L491.510801080108,280.3441705889919L501.1885688568857,280.3441705889919L510.434293429343,280.3441705889919L519.9392439243925,280.3441705889919L520.7169216921692,282.87677963901945L520.1984698469847,283.31173006226936L520.544104410441,285.9545167615629L521.494599459946,289.0090798224342L522.3586858685869,289.6087981611001L523.6548154815482,290.54955400821433L522.445094509451,291.99956244508917L520.7169216921692,292.4251589884678L519.9392439243925,293.19025190486883L519.6800180018002,294.8437361252425L518.6431143114312,298.51262176817727L518.9023402340234,299.47828804257557L518.5567056705671,301.6136030822035L517.6062106210621,304.03261166891684L516.1372637263727,305.28014941867906L515.1003600360036,307.14705751964664L514.8411341134113,308.14069110794924L513.7178217821782,308.80235631188236L513.0265526552655,311.3609049034134Z"
                        className="datamaps-subunit SDN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M513.0265526552655,311.64925978626377L513.0265526552655,313.54174898192446L512.6809180918092,314.28119884215266L511.3847884788479,314.3633237645243L510.60711071107113,315.75838170088974L512.0760576057606,315.9223775911002L513.2857785778577,317.11057795960267L513.7178217821782,318.05202292908825L514.7547254725473,318.62469855317346L516.2236723672368,321.23931084607364L514.5819081908191,322.8301931894328L513.1129612961296,324.25657841994723L511.64401440144013,325.3968890386999L509.91584158415844,325.3561748646022L508.0148514851485,325.9261022308678L506.45949594959495,325.3968890386999L505.50900090009003,326.0482100952928L503.34878487848783,324.4602545552579L502.83033303330336,323.44164542049015L501.447794779478,323.93064983238304L500.4108910891089,323.7676634628299L499.71962196219624,324.17510172005484L498.6827182718272,323.889904635921L497.21377137713773,321.8921823072838L496.78172817281734,321.1576812828948L495.05355535553554,320.1777530725302L494.448694869487,318.74737880690753L493.4117911791179,317.68372510101665L491.77002700270026,316.41420879772693L491.77002700270026,315.63536742332326L490.473897389739,314.6507050807019L488.8321332133213,313.70612237498625L489.52340234023404,313.45955116353656L490.3874887488749,313.0073291047436L490.9923492349235,310.82512037648434L491.6836183618362,309.71119033425214L493.4117911791179,309.3395261593049L493.8438343834384,310.04140817869467L495.05355535553554,311.44330223758607L495.7448244824482,311.64925978626377L496.60891089108907,311.2372934699761L498.33708370837087,311.31970315369324L498.5963096309631,311.8139892665556L501.01575157515754,311.8139892665556L501.1021602160216,311.31970315369324L502.31188118811883,310.86634709928506L502.57110711071107,310.16520381993905L503.521602160216,309.669903202726L505.50900090009003,311.0724492589267L506.71872187218725,310.82512037648434L507.9284428442844,309.0503285154481L509.22457245724576,307.7268451041974L509.0517551755176,306.23498870420616L508.446894689469,305.5293699146505L509.91584158415844,305.40477143100486L510.0886588658866,304.86457140932856L511.21197119711974,305.0308343806119L510.86633663366337,306.8569843765939L511.21197119711974,308.59564976213903L512.421692169217,309.5873222967985L512.6809180918092,310.4127366969683L512.6809180918092,311.60807235125156Z"
                        className="datamaps-subunit SSD"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M391.36318631863185,301.5300147685302L390.4126912691269,299.6041190642607L389.20297029702976,298.72269527842633L390.23987398739877,298.2604251146023L391.449594959496,296.53384501225815L391.96804680468045,295.22451062882436L392.8321332133213,294.4203060174445L394.0418541854186,294.63206702460064L395.16516651665165,294.1236851716981L396.547704770477,294.0812958864044L397.6710171017102,294.80140963164126L399.22637263726375,295.4781973947013L400.69531953195326,297.29255951343384L402.2506750675068,299.0166612292211L402.42349234923495,300.5678820268165L402.85553555355534,301.9896034839559L403.8060306030603,302.65746197417343L403.9788478847885,303.61622197243446L403.8924392439244,304.365525560489L403.54680468046803,304.53191725368043L402.2506750675068,304.3239208633018L401.9914491449145,304.61509689869473L401.47299729973,304.6566826847359L399.7448244824482,304.07423547255405L398.62151215121514,304.03261166891684L394.21467146714673,303.9077237692529L393.52340234023404,304.1990904506382L392.7457245724572,304.1158565347247L391.449594959496,304.53191725368043L391.1039603960396,302.65746197417343L393.2641764176418,302.69917849488496L393.8690369036904,302.3653655186822L394.3010801080108,302.3236258607376L395.16516651665165,301.73896321747094L396.2020702070207,302.28188329243534L397.23897389738977,302.3236258607376L398.27587758775877,301.7807439894446L397.7574257425743,301.07006455947453L396.97974797479753,301.48821613242563L396.2884788478848,301.4464145047085L395.33798379837987,300.8608753115152L394.5603060306031,300.9027192505624L394.0418541854186,301.48821613242563Z"
                        className="datamaps-subunit SEN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M820.5549054905491,359.7921200531166L821.2461746174617,360.6188794260568L819.6044104410441,360.6188794260568L818.6539153915392,359.09008634387675L820.1228622862286,359.7094943287935ZM817.530603060306,358.30620988251184L816.580108010801,358.34744721829026L815.1111611161117,358.1000549452375L814.6791179117912,357.7291081718165L814.7655265526552,356.78188752996874L816.4072907290729,357.1524117619077L817.1849684968497,357.64669839950244ZM819.51800180018,357.64669839950244L819.1723672367236,358.1000549452375L817.3577857785779,355.959070703926L816.9257425742574,354.52095686495494L817.7034203420342,354.52095686495494L818.5675067506751,356.4526674236639ZM815.1975697569757,354.5620149130788L815.2839783978399,355.05485120975266L813.3829882988299,354.0283975774783L812.0868586858685,353.1670140682511L811.2227722772277,352.3473262201138L811.568406840684,352.1015442066695L812.6917191719172,352.67512401279623L814.6791179117912,353.7822117046376ZM809.5810081008101,352.1834652863886L809.1489648964896,352.3063586306586L808.0256525652565,351.73297587789966L807.0751575157516,350.75072221082183L807.1615661566157,350.3416964050659L808.6305130513051,351.36453078809257Z"
                        className="datamaps-subunit SLB"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M404.06525652565256,318.1747626793895L403.37398739873987,317.97018919609746L401.6458145814582,316.9877219822506L400.4360936093609,315.71737860121266L400.0040504050405,314.814884282012L399.7448244824482,313.04844965086556L400.9545454545455,311.9786865132691L401.3001800180018,311.27849934381504L401.6458145814582,310.74266060951174L402.33708370837087,310.7014275577109L402.85553555355534,310.247723406091L404.8429342934294,310.247723406091L405.447794779478,311.11366342665417L405.96624662466246,312.1433517689263L405.96624662466246,312.84282783232254L406.31188118811883,313.5006510026806L406.31188118811883,314.3633237645243L406.91674167416744,314.24013369979497L405.7934293429343,315.3482756360314L404.7565256525653,316.70100383965064L404.58370837083714,317.397188443135Z"
                        className="datamaps-subunit SLE"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M220.79252925292528,302.07312665377077L220.53330333033304,302.65746197417343L219.15076507650767,302.6157425754535L218.2866786678668,302.3653655186822L217.24977497749776,301.8642966481263L215.9536453645365,301.73896321747094L215.26237623762378,301.1955416861159L215.34878487848786,300.8190283195482L216.12646264626466,300.19095429927967L216.64491449144919,299.939528992598L216.472097209721,299.64605637961927L217.0769576957696,299.47828804257557L217.7682268226823,299.68799052261227L218.2866786678668,300.19095429927967L218.9779477947795,300.6097474224203L219.0643564356436,300.9445601407871L220.10126012601262,300.65160974049195L220.61971197119712,300.8190283195482L220.96534653465346,301.07006455947453Z"
                        className="datamaps-subunit SLV"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M546.2074707470747,315.22521099716494L544.1336633663366,315.22521099716494L536.3568856885688,312.34913872016864L535.4063906390639,311.4844978296393L534.542304230423,310.2889799582491L533.6782178217823,308.9676802383657L534.1966696669667,308.0993171728546L535.0607560756076,306.77408410487055L535.8384338433843,307.2299134586849L536.2704770477047,308.2647987937781L537.393789378938,309.2569095376777L538.6035103510351,309.29821897230147L540.8501350135014,308.6369956830621L543.442394239424,308.34752552355957L545.6026102610261,307.602644783761L546.7259225922593,307.4370106494108L547.5900090009001,306.9813162193567L548.9725472547254,306.8984307955782L548.9725472547254,306.9398747418618L548.9725472547254,307.9751811937975L548.9725472547254,310.4127366969683L548.9725472547254,311.6904451915064L547.8492349234923,313.1717998967187Z"
                        className="datamaps-subunit -99"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M531.3451845184519,338.5259707888353L529.8762376237623,336.5348364114826L529.8762376237623,327.7977400662675L531.9500450045005,325.07115307536833L532.6413141314131,324.29731542432523L534.1102610261025,324.25657841994723L536.2704770477047,322.58554859758885L539.3811881188119,322.4632122619344L546.2074707470747,315.22521099716494L547.8492349234923,313.1717998967187L548.9725472547254,311.6904451915064L548.9725472547254,310.4127366969683L548.9725472547254,307.9751811937975L548.9725472547254,306.9398747418618L548.9725472547254,306.8984307955782L549.7502250225023,306.8569843765939L550.8735373537354,306.4838546881883L552.0832583258326,306.23498870420616L553.2929792979298,305.40477143100486L554.1570657065706,305.40477143100486L554.2434743474348,306.06902739166077L553.9842484248425,307.51983254486714L553.9842484248425,308.80235631188236L553.465796579658,309.669903202726L552.8609360936093,312.3079852758184L551.6512151215121,315.0200691583979L550.1822682268227,318.09293762207335L548.1084608460847,321.64738945848205L546.1210621062106,324.33805153645113L543.2695769576958,327.63504303726614L540.8501350135014,329.5868404459358L537.2209720972097,331.9439839331172L535.0607560756076,333.7722528158941L532.3820882088208,336.6973562284308L531.8636363636364,337.95700701636036Z"
                        className="datamaps-subunit SOM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M485.89423942394245,215.85178828224014L485.28937893789384,216.64405520072734L485.462196219622,217.826545703045L486.6719171917192,219.2809289100042L485.72142214221424,220.28167058639386L485.3757875787579,221.3326584153413L485.63501350135016,221.7184967350675L485.20297029702976,222.15856181760955L484.07965796579657,222.21350328590796L483.3019801980198,222.43312156305626L483.2155715571557,222.15856181760955L483.47479747974796,221.77355684195598L483.73402340234026,221.00135588701113L483.3883888388839,221.00135588701113L482.9563456345635,220.39255816674108L482.52430243024304,220.28167058639386L482.2650765076508,219.72631699325888L481.83303330333035,219.50374625079763L481.48739873987404,219.05786411197755L481.05535553555353,219.22518594324208L480.7097209720972,220.33712198308336L480.1048604860486,220.55877557126573L480.27767776777677,220.28167058639386L479.4135913591359,219.6150623932769L478.63591359135916,219.2809289100042L478.29027902790284,218.77868381346823L477.59900990099015,218.21915243888168L478.20387038703876,218.10705791243697L478.5495049504951,216.53106848566486L477.3397839783978,215.227051746106L477.94464446444647,213.74244368469778L477.08055805580557,213.74244368469778L478.03105310531055,212.4773480040127L477.2533753375337,211.49408512672883L476.6485148514851,210.1557475159096L478.5495049504951,209.27785454764384L480.01845184518453,209.39514043065594L481.3145814581459,210.79698567997087L481.5738073807381,211.84169095745563L483.04275427542757,212.65034724998924L483.2155715571557,214.08604731266695L484.6845184518452,215.0563239593227L485.3757875787579,214.314780902415L485.98064806480653,214.7144220805843L485.462196219622,215.28392804570342Z"
                        className="datamaps-subunit SRB"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M294.32628262826285,320.1369073593779L297.2641764176418,320.58614163768095L297.43699369936996,320.1777530725302L299.42439243924395,320.014362637984L302.01665166516653,320.626973717632L300.72052205220524,322.7078755409154L300.9797479747975,324.37878675991925L301.8438343834384,325.8039876275651L301.498199819982,326.8214096440656L301.23897389738977,327.91975668937704L300.6341134113411,328.9363702370143L299.2515751575158,328.40777251173984L298.12826282628265,328.6517513682111L297.17776777677767,328.44843696100673L296.91854185418543,329.13965481918393L297.3505850585059,329.6274910474851L297.0913591359136,330.11526620139097L295.79522952295235,329.9120335819811L294.32628262826285,327.838412853611L294.06705670567055,326.4958828383475L293.2893789378938,326.45518888114617L292.16606660666065,324.74536437442055L292.5981098109811,323.4824010253562L292.511701170117,322.9117331728024L293.9806480648065,322.3000823688197Z"
                        className="datamaps-subunit SUR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M464.63771377137715,208.1010027002984L466.62511251125113,208.33695701839747L467.83483348334835,207.56902860609387L469.90864086408646,207.5098279435517L470.42709270927094,206.91679843593926L470.7727272727273,206.91679843593926L471.29117911791184,208.1010027002984L469.3037803780378,209.04306602586445L469.13096309630964,210.4474852967532L468.2668766876688,210.79698567997087L468.2668766876688,211.72589193302372L467.3163816381638,211.66796634938794L466.53870387038705,211.14585115837173L466.10666066606666,211.66796634938794L464.3784878487849,211.55206296176797L464.98334833483347,211.2619991486097L464.3784878487849,209.80507424850086Z"
                        className="datamaps-subunit SVN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M508.446894689469,401.11466255778134L508.0148514851485,402.29966892359204L506.54590459045903,402.57379301703475L505.1633663366337,401.11466255778134L505.1633663366337,400.2062388849163L505.76822682268227,399.21004377420496L506.02745274527456,398.44242185830615L506.71872187218725,398.2170052544007L507.9284428442844,398.7131338120501L508.27407740774083,399.93423270678966Z"
                        className="datamaps-subunit SWZ"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M524.6053105310531,249.43599964205254L519.9392439243925,252.48222287613595L517.2605760576057,251.3260627536166L517.1741674167416,251.3260627536166L517.519801980198,250.89114789662545L517.433393339334,249.7277040432548L518.0382538253825,248.11908781302827L519.3343834383438,247.04083675664495L518.9887488748875,245.90846893828586L517.8654365436544,245.7603788620154L517.6926192619262,243.52801371140873L518.2974797479749,242.27870387436013L518.9023402340234,241.6264319960627L519.507200720072,240.97233438432102L519.6800180018002,239.30359701310263L520.457695769577,239.9118075582141L523.1363636363636,239.04969974248854L524.3460846084608,239.65858192851942L526.3334833483348,239.60790335623693L529.0985598559856,238.49013197897327L530.3946894689469,238.541058476529L533.1597659765977,238.08230958149008L531.9500450045005,239.96241930304438L530.5675067506751,240.720268022137L530.8267326732673,242.87919758724533L529.8762376237623,246.40145029650307Z"
                        className="datamaps-subunit SYR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M435.95004500450045,319.728380259031L434.04905490549055,320.218597528098L433.530603060306,319.3605950202363L432.83933393339333,317.8474276739415L432.6665166516652,316.660037857065L433.1849684968497,314.4454415620307L432.5801080108011,313.58284510502307L432.40729072907294,311.64925978626377L432.40729072907294,309.8763168070371L431.37038703870394,308.6369956830621L431.5432043204321,307.89241202412506L433.6170117011701,307.93379779658045L433.35778577857786,309.2155978515829L434.04905490549055,309.917592931093L434.9131413141314,310.7838915478312L434.9995499549955,311.9786865132691L435.51800180018006,312.472587276008L435.3451845184519,318.05202292908825Z"
                        className="datamaps-subunit TGO"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M677.7214221422142,305.0308343806119L675.561206120612,303.8660889597904L673.4873987398739,303.9493558212628L673.8330333033302,301.9896034839559L671.7592259225923,301.9896034839559L671.5864086408642,304.6982657851031L670.2902790279028,308.30616332882846L669.426192619262,310.45398465003825L669.5990099009902,312.22567247583373L671.1543654365437,312.3079852758184L672.1912691269127,314.48649779830373L672.6233123312331,316.6190703014121L673.9194419441944,317.97018919609746L675.3883888388839,318.256581989648L676.5981098109811,319.5240682735643L675.8204320432044,320.5044738105789L674.2650765076507,320.7902898982864L674.0922592259226,319.5649332879261L672.1048604860487,318.5020057317099L671.6728172817282,318.951818236836L670.7223222322232,318.0111067883209L670.3766876687669,316.82389238596147L669.0805580558057,315.4303102638022L667.8708370837085,314.28119884215266L667.5252025202522,315.71737860121266L667.0931593159316,314.3633237645243L667.3523852385238,312.84282783232254L668.0436543654366,310.53647413936085L669.1669666966696,308.0165622196603L670.549504950495,305.7369820579214L669.5990099009902,303.4912509288797L669.5990099009902,302.3653655186822L669.3397839783978,300.9863979862847L667.6980198019803,299.0166612292211L667.1795679567956,297.7556734404679L667.9572457245724,297.29255951343384L668.9077407740774,295.13991949345274L667.8708370837085,293.4874519679961L666.4018901890188,291.6588011329222L665.1921692169217,289.437534626484L666.2290729072906,288.96621096154576L667.2659765976598,286.21352154213275L668.9941494149415,286.1272049366049L670.3766876687669,285.0034091329505L671.7592259225923,284.3969773406244L672.7961296129613,285.1765055409517L672.9689468946896,286.7310388119086L674.6107110711071,286.86031631227974L674.0058505850584,289.5231748134375L674.0058505850584,291.7866163832672L676.5981098109811,290.29318310125205L677.2893789378937,290.720385868719L678.6719171917191,290.63497812212995L679.1903690369037,289.77999448452834L681.0049504950495,289.9511238883894L682.8195319531953,291.99956244508917L682.9923492349235,294.4626655974121L684.8933393339333,296.66037512687933L684.8069306930693,298.7647001723307L684.0292529252926,299.8556954536953L681.7826282628263,299.52023489988204L678.6719171917191,299.9814410448529L677.1165616561656,302.0313665382305Z"
                        className="datamaps-subunit THA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M601.9410441044105,228.8092662814073L601.0769576957696,229.7651341451784L598.484698469847,229.2346248808514L598.2254725472548,231.0330298307764L600.8177317731772,230.82223168575644L603.7556255625562,231.82169838365655L608.3352835283529,231.34884197139766L608.9401440144015,234.2226433713703L609.7178217821782,233.91096210165557L611.1867686768677,234.5857166161699L611.1003600360036,235.77450625231603L611.4459945994599,237.52035575870585L608.9401440144015,237.52035575870585L607.2983798379838,237.26446054443414L605.8294329432944,238.64287737513382L604.7925292529253,238.948061983043L603.9284428442844,239.55721361339045L602.9779477947795,238.59197360541032L603.2371737173717,236.03210189316206L602.459495949595,235.87758012468234L602.7187218721872,234.9481956145293L601.4225922592259,234.27454749297607L600.385688568857,235.31008385367886L600.1264626462646,236.54640600461357L599.7808280828083,237.00827509630642L598.3118811881188,236.957003071408L597.534203420342,238.33728417896813L596.7565256525653,237.72486377772208L595.0283528352836,238.6937697952079L594.2506750675068,238.33728417896813L595.633213321332,235.25842157116114L595.1147614761477,232.97326099552868L593.3865886588659,232.2411526161266L593.9914491449144,230.87495052474L595.9788478847885,231.0330298307764L597.1021602160216,229.28773510523803L597.8798379837983,227.26015862886953L601.0769576957696,226.56202389743072L600.5585058505851,228.0094186319501L600.9041404140414,228.91568555615723Z"
                        className="datamaps-subunit TJK"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M731.4675967596759,355.91795011695706L731.7268226822682,355.3424598287105L733.8006300630063,354.8084006614049L735.442394239424,354.7262649185417L736.2200720072008,354.3977933485658L737.0841584158416,354.7262649185417L736.2200720072008,355.38355413913564L733.7142214221423,356.4115237266523L731.7268226822682,357.11123439461056L731.640414041404,356.3703819762227Z"
                        className="datamaps-subunit TLS"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M283.43879387938796,308.51295097676496L284.82133213321333,308.18206268721565L285.33978397839786,308.2647987937781L285.2533753375337,310.08267556581796L283.2659765976598,310.3714865998627L282.83393339333935,310.1239407782893L283.52520252025204,309.4634342730827Z"
                        className="datamaps-subunit TTO"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M454.26867686768674,258.09338954479756L453.23177317731773,253.0583569776233L451.7628262826283,251.90479583691797L451.7628262826283,251.2294793361798L449.77542754275424,249.53327222242092L449.516201620162,247.33537494319046L451.0715571557156,245.71099535627584L451.5900090009001,243.27867940783585L451.24437443744375,240.46792748795588L451.6764176417642,238.948061983043L454.3550855085508,237.72486377772208L455.99684968496854,238.08230958149008L455.9104410441044,239.60790335623693L457.98424842484246,238.49013197897327L458.1570657065706,239.1005017066666L456.94734473447346,240.56889667568646L456.94734473447346,241.927706221976L457.7250225022502,242.67920304735145L457.465796579658,245.21660409056375L455.8240324032403,246.64756657181L456.34248424842485,248.26575701983444L457.55220522052207,248.314627428137L458.1570657065706,249.67911023576022L459.10756075607566,250.11611609390872L458.93474347434744,252.28989150088023L457.7250225022502,253.1063101988989L457.03375337533754,254.01574250241305L455.39198919891993,255.1124174592241L455.65121512151217,256.25194054605834L455.39198919891993,257.4338002059172Z"
                        className="datamaps-subunit TUN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M723.7772277227723,274.06732636714105L722.3082808280827,278.27902585043034L721.2713771377138,280.43178911870723L720.0616561656166,278.2349572137974L719.7160216021603,276.29044200029125L721.1849684968497,273.710258594042L723.0859585958596,271.6944887875898L724.2092709270926,272.50229264272616Z"
                        className="datamaps-subunit TWN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M512.8537353735373,336.77861728266896L513.2857785778577,337.0224053690702L522.0130513051306,341.9008639173341L522.0994599459947,343.3252334499781L525.5558055805581,345.72853926404105L524.518901890189,348.70695309245133L524.6053105310531,350.05546165064294L526.1606660666066,350.9552886283437L526.2470747074708,351.569207449698L525.5558055805581,353.04401951721854L525.7286228622862,353.7822117046376L525.5558055805581,354.9316177850456L526.419891989199,356.4526674236639L527.3703870387039,358.8424620915924L528.2344734473447,359.3790811857325L526.3334833483348,360.7843424636527L523.7412241224123,361.7364928752734L522.2722772277228,361.69506851750384L521.4081908190819,362.4410836991853L519.7664266426643,362.48255260256633L519.1615661566157,362.8143945901939L516.2236723672368,362.10942243236076L514.409090909091,362.3166920216113L513.8042304230423,359.00753619174225L512.9401440144014,357.8527383486462L512.508100810081,357.1935911438838L510.0886588658866,356.7407281243047L508.7925292529253,356.00019319600256L507.2371737173717,355.58905355343126L506.2866786678668,355.17810103666886L505.2497749774978,354.5620149130788L503.95364536453644,351.52826911866543L502.57110711071107,350.17812538989386L502.1390639063907,348.7477963209511L502.31188118811883,347.5230286128799L501.8798379837983,345.2802271842749L502.91674167416744,345.1987283393365L503.7808280828083,344.3024826338234L504.73132313231326,343.04028861142166L505.3361836183619,342.55189643327014L505.2497749774978,341.7788142502916L504.73132313231326,341.20932350226053L504.6449144914492,340.27397722000717L505.3361836183619,339.9893617441696L505.42259225922595,338.56661359107375L504.472097209721,337.22556817233885L505.3361836183619,336.90051037606514L508.0148514851485,336.94114182460106Z"
                        className="datamaps-subunit TZA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M504.472097209721,337.22556817233885L503.0895589558956,337.95700701636036L502.484698469847,337.7131841698428L502.484698469847,335.8847835347974L503.0895589558956,334.99100901930524L503.1759675967597,333.04097843048265L503.6944194419442,331.9439839331172L504.6449144914492,330.6842682201536L505.50900090009003,330.0339743228801L506.2866786678668,329.180310320915L505.3361836183619,328.8550530367241L505.50900090009003,326.0482100952928L506.45949594959495,325.3968890386999L508.0148514851485,325.9261022308678L509.91584158415844,325.3561748646022L511.64401440144013,325.3968890386999L513.1129612961296,324.25657841994723L514.2362736273627,325.9261022308678L514.495499549955,327.1468935648297L515.6188118811881,329.9120335819811L514.7547254725473,331.6595543923422L513.5450045004501,333.2441134106345L512.8537353735373,334.21913150690256L512.8537353735373,336.77861728266896L508.0148514851485,336.94114182460106L505.3361836183619,336.90051037606514Z"
                        className="datamaps-subunit UGA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M507.75562556255625,187.44595760673127L508.7061206120612,187.64429050826692L509.31098109810983,186.71679818728148L510.0022502250225,186.91596309351337L512.508100810081,186.58389468654332L514.0634563456346,188.76393999232982L513.4585958595859,189.5499894361011L513.6314131413142,190.72250612088013L515.532403240324,190.91716871271413L516.3964896489649,192.59532314766125L516.3964896489649,193.3645314174878L519.4207920792079,194.63921016200442L521.2353735373538,194.06673103029038L522.7043204320432,195.84179950955343L524.0868586858686,195.77870585634722L527.6296129612962,196.9737197450178L527.7160216021603,198.09858804680016L526.6791179117912,199.95801893220224L527.2839783978397,201.98178448794098L526.8519351935194,203.19757188673648L524.518901890189,203.4397739184806L523.3091809180918,204.46562391102202L523.2227722772277,206.02373953113874L521.3217821782179,206.32189729391033L519.7664266426643,207.45060873365776L517.519801980198,207.6282107380623L515.4459945994599,208.92556312682575L515.532403240324,211.08775085823763L516.7421242124212,211.89956442920467L519.1615661566157,211.66796634938794L518.7295229522953,212.8807730169119L516.0508550855086,213.51303771629102L512.8537353735373,215.4544582594538L511.471197119712,214.7714471488057L511.98964896489656,213.16842104754699L509.3973897389739,212.18867200081195L509.82943294329436,211.49408512672883L512.0760576057606,210.38917326640626L511.3847884788479,209.57093414771043L507.66921692169217,208.69033939958243L507.496399639964,207.3913709596148L505.3361836183619,207.86475429510148L504.38568856885695,209.7465661237165L502.57110711071107,212.30419408285155L501.447794779478,211.72589193302372L500.3244824482448,212.24644166550814L499.2875787578758,211.61002336414242L499.8924392439244,211.2619991486097L500.3244824482448,210.0973465913762L500.92934293429346,208.98432364310668L500.7565256525653,208.33695701839747L501.27497749774983,208.04196821117407L501.534203420342,208.57261830935175L502.91674167416744,208.63148797035848L503.521602160216,208.3958997711311L503.0895589558956,208.04196821117407L503.26237623762376,207.5098279435517L502.484698469847,206.61958288195913L502.1390639063907,205.12641160334098L501.1885688568857,204.58594129636606L501.3613861386139,203.379253057747L500.3244824482448,202.40822050536664L499.2875787578758,202.28648215269843L497.5594059405941,201.12594008049876L495.91764176417644,201.49321807684308L495.3991899189919,202.04276429907836L494.3622862286229,202.04276429907836L493.7574257425743,202.8943735453394L492.02925292529255,203.19757188673648L491.16516651665165,203.74208256703542L490.0418541854186,202.8943735453394L488.486498649865,202.8943735453394L487.01755175517553,202.46905960311594L485.98064806480653,203.2581520600709L485.8078307830783,202.28648215269843L484.511701170117,201.3096708027947L484.9437443744374,199.83464526086013L485.63501350135016,198.90667434981555L486.1534653465347,199.09264689151505L485.5486048604861,197.47452470287533L487.7088208820882,194.32139264703167L488.9185418541854,193.93926387588618L489.1777677767777,192.85209595586358L487.96804680468045,189.4846197226698L489.09135913591365,189.35380719849897L490.3874887488749,188.30377644338114L492.2884788478848,188.23793981936265L494.7079207920792,188.50113765938917L497.38658865886595,189.4846197226698L499.2875787578758,189.5499894361011L500.15166516651664,190.07207311663834L501.1021602160216,189.41922565142605L501.70702070207017,190.33253473488938L503.86723672367236,190.13722467886652L504.81773177317734,190.5276283381772L504.9905490549055,188.5668752606199L505.76822682268227,187.71035136624752Z"
                        className="datamaps-subunit UKR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M293.2029702970297,410.63795613666446L294.7583258325833,410.3090416949177L297.17776777677767,412.47780427863256L298.0418541854186,412.38314716749915L300.547704770477,414.1874088398214L302.448694869487,415.7643559534585L303.83123312331236,417.68877807087034L302.7079207920792,419.04457411025487L303.39918991899196,420.65193858909504L302.3622862286229,422.515880555565L299.68361836183624,424.09665548618545L297.86903690369036,423.55209635554513L296.57290729072906,423.8489758100361L294.32628262826285,422.61437727788075L292.77092709270926,422.6636406028965L291.3019801980198,421.0921225122647L291.47479747974796,419.23885603988646L291.9932493249325,418.55952529799515L291.9932493249325,415.7643559534585L292.5981098109811,412.85676786706307Z"
                        className="datamaps-subunit URY"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M591.1399639963997,237.67375408025734L591.2263726372637,235.82604913115125L588.0292529252926,234.53388547381718L585.523402340234,233.02546074804985L583.9680468046804,231.55912769132823L581.2029702970297,229.393915943798L579.9932493249325,226.13124556934008L579.2155715571557,225.59152208534493L576.6233123312331,225.69957845155324L575.6728172817282,225.0503979451879L575.4135913591359,222.4879892969014L572.2164716471648,220.78018659295853L570.2290729072907,222.65250429633835L568.1552655265527,223.80043124984667L568.500900090009,225.37524117940615L565.8222322232224,225.42933245756075L565.7358235823583,213.28336112598296L571.8708370837085,211.2619991486097L572.3892889288929,211.55206296176797L576.1048604860487,214.02882204007753L578.0058505850585,215.28392804570342L580.3388838883889,218.27517610908632L583.1039603960396,217.826545703045L587.2515751575158,217.54563798127873L590.1030603060306,219.94864199275256L589.9302430243024,223.25459889450934L591.1399639963997,223.25459889450934L591.57200720072,225.86155816170253L594.6827182718272,225.96947488161462L595.2875787578758,227.47450434078058L596.2380738073807,227.47450434078058L597.2749774977498,225.21288297000444L600.4720972097209,222.9264027136926L601.7682268226822,222.3782391077354L602.545904590459,222.65250429633835L600.4720972097209,224.77930687232373L602.2866786678668,225.96947488161462L604.0148514851485,225.15873540175107L606.8663366336634,226.83081170368717L603.7556255625562,229.12836476581654L601.9410441044105,228.8092662814073L600.9041404140414,228.91568555615723L600.5585058505851,228.0094186319501L601.0769576957696,226.56202389743072L597.8798379837983,227.26015862886953L597.1021602160216,229.28773510523803L595.9788478847885,231.0330298307764L593.9914491449144,230.87495052474L593.3865886588659,232.2411526161266L595.1147614761477,232.97326099552868L595.633213321332,235.25842157116114L594.2506750675068,238.33728417896813L592.522502250225,237.72486377772208Z"
                        className="datamaps-subunit UZB"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M690.8555355535555,281.48159476641683L687.6584158415842,283.7027671937737L685.5846084608461,286.1272049366049L685.0661566156615,287.89308992879904L686.9671467146716,290.54955400821433L689.1273627362737,293.82688163427457L691.3739873987399,295.393649545L692.8429342934294,297.3767925405311L693.8798379837983,301.9478374868877L693.6206120612062,306.2764726838982L691.5468046804681,307.89241202412506L688.8681368136813,309.4634342730827L686.8807380738074,311.4844978296393L683.8564356435644,313.7472111110384L682.9923492349235,312.22567247583373L683.6836183618362,310.577715683256L681.8690369036904,309.1742839101657L683.9428442844285,308.18206268721565L686.5351035103511,308.0165622196603L685.4117911791179,306.5253235376995L689.47299729973,304.6566826847359L689.7322232223223,301.697179478319L689.2137713771376,300.023349957816L689.6458145814581,297.5452178504536L689.0409540954095,295.816245540109L687.2263726372637,294.0812958864044L685.7574257425742,291.8718066890269L683.7700270027003,288.8804604271483L680.8321332133213,287.3339885116369L681.523402340234,286.4292332039805L683.0787578757877,285.7817550482006L682.1282628262827,283.5290215865715L679.1903690369037,283.5290215865715L678.1534653465346,281.17570786776156L676.6845184518452,279.11529648697467L677.9806480648065,278.4992870815444L679.8816381638163,278.4992870815444L682.2146714671467,278.1908831015543L684.2884788478848,276.82184118133875L685.4117911791179,277.7939688285213L687.6584158415842,278.27902585043034L687.2263726372637,279.7741385081002L688.4360936093609,280.82581475650017Z"
                        className="datamaps-subunit VNM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M834.2938793879388,374.54612040354067L833.516201620162,374.8851311725104L832.7385238523852,373.78420813625564L832.8249324932493,373.1079382629955ZM832.5657065706571,370.74803887179144L832.9113411341134,372.7279371187748L832.3064806480647,372.43257755606027L831.7880288028803,372.5591392421723L831.442394239424,371.8845043484372L831.442394239424,369.9917425544862Z"
                        className="datamaps-subunit VUT"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M516.8285328532853,252.24178615370852L516.8285328532853,253.96795674804744L516.482898289829,254.77913092649854L515.3595859585959,255.15999547501275L515.4459945994599,254.44542187408098L516.0508550855086,254.063519516773L515.4459945994599,253.72889661796776L515.9644464446445,251.85661814524474Z"
                        className="datamaps-subunit PSE"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M470.68631863186323,406.1144382692969L471.8960396039604,404.72987605878063L472.84653465346537,405.51364864761325L473.1921692169217,406.67012991022835L474.3154815481548,406.8556006620346L475.7844284428443,407.36626933084256L477.08055805580557,407.1804653902014L479.24077407740776,405.7907806952052L479.24077407740776,395.88201669840856L479.93204320432045,396.2849468527171L481.3145814581459,398.80342273111484L481.1417641764176,400.4330935440524L481.6602160216022,401.3421897230364L483.3883888388839,401.0691774580174L484.511701170117,399.8889215322039L485.72142214221424,399.0744449403692L486.23987398739877,397.8116577332938L487.449594959496,397.1821368118497L488.486498649865,397.4967428514031L489.6098109810981,398.26207576335764L491.5972097209721,398.3973257141869L493.0661566156616,397.7666509102497L493.32538253825385,396.95760621988904L493.7574257425743,395.6583803809497L495.05355535553554,395.4795806639901L495.7448244824482,394.49790311742527L496.60891089108907,392.72034676060156L498.76912691269126,390.77558013698217L502.1390639063907,388.88526893994526L503.0895589558956,388.88526893994526L504.29927992799287,389.3239934485607L505.07695769576964,389.0168308356261L506.3730873087309,389.2800971845194L507.496399639964,392.9420343627203L508.10126012601256,394.8099409977897L507.66921692169217,397.7666509102497L507.9284428442844,398.7131338120501L506.71872187218725,398.2170052544007L506.02745274527456,398.44242185830615L505.76822682268227,399.21004377420496L505.1633663366337,400.2062388849163L505.1633663366337,401.11466255778134L506.54590459045903,402.57379301703475L508.0148514851485,402.29966892359204L508.446894689469,401.11466255778134L510.26147614761476,401.11466255778134L509.65661566156615,403.07700587909676L509.3973897389739,405.3290412913001L508.7925292529253,406.57743970226966L507.15076507650764,407.9709764912618L506.71872187218725,408.3437504490942L505.6818181818182,409.74610406060714L504.9905490549055,411.20273325464586L503.6080108010801,413.18880300004525L500.92934293429346,416.1000921625049L499.2011701170117,417.83369508053056L497.38658865886595,419.09313049203706L494.8807380738074,420.2125363478824L493.6710171017102,420.35891727108594L493.4117911791179,421.1900479097998L491.9428442844284,420.74968947854074L490.73312331233126,421.2880122656947L488.1408640864086,420.74968947854074L486.6719171917192,421.0921225122647L485.63501350135016,420.9453073204338L483.2155715571557,422.07313746472346L481.1417641764176,422.5651239315498L479.67281728172816,423.6510155294981L478.5495049504951,423.7004903453148L477.59900990099015,422.6636406028965L476.73492349234925,422.61437727788075L475.6980198019802,421.3370090734104L475.6116111611161,421.72933572863235L475.2659765976598,420.9453073204338L475.2659765976598,419.2874500496144L474.48829882988304,417.35095895218507L475.2659765976598,416.82100178237516L475.2659765976598,414.6642678787686L473.6242124212422,412.0521099399101L472.4144914491449,409.699244505661L472.4144914491449,409.65239290580894ZM501.01575157515754,407.1340334096518L499.9788478847885,406.29954912795677L498.85553555355534,406.8556006620346L497.5594059405941,407.92441449805017L496.26327632763275,409.65239290580894L498.0778577857786,411.81590394332244L498.9419441944195,411.53272943818314L499.37398739873987,410.63795613666446L500.7565256525653,410.21513863716905L501.1021602160216,409.32465387986423L501.8798379837983,407.9709764912618Z"
                        className="datamaps-subunit ZAF"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M510.0886588658866,356.7407281243047L511.2983798379838,357.81152621551536L511.90324032403237,359.8747548144718L511.471197119712,360.53616194192864L510.95274527452744,362.5240240179135L511.471197119712,364.5592825480118L510.6935193519352,365.4335005967313L509.91584158415844,367.7290534116755L511.21197119711974,368.35666831932144L503.95364536453644,370.4117760618112L504.1264626462646,372.1795481118854L502.31188118811883,372.51694852330104L501.01575157515754,373.48822707111503L500.6701170117012,374.37670391123L499.8060306030603,374.54612040354067L497.73222322232226,376.6263593683284L496.4360936093609,378.24604781436324L495.57200720072007,378.331455736402L494.7943294329433,378.0325993813339L492.11566156615663,377.73394198601494L491.6836183618362,377.56336935315176L491.6836183618362,377.3502437769836L490.73312331233126,376.79658256408214L489.1777677767777,376.6263593683284L487.1903690369037,377.22241633126777L485.63501350135016,375.6487822955825L483.9932493249325,373.57277507509986L484.16606660666065,365.68350184097085L489.1777677767777,365.72517855342534L488.9185418541854,364.89217508756894L489.2641764176418,363.97713666374057L488.8321332133213,362.8143945901939L489.1777677767777,361.6122271109172L488.9185418541854,360.867088079139L489.6962196219622,360.9084644246293L489.8690369036904,361.69506851750384L490.9923492349235,361.6122271109172L492.46129612961295,361.860780613325L493.32538253825385,362.98037649971513L495.22637263726375,363.3124634095327L496.69531953195326,362.5240240179135L497.21377137713773,363.810905288339L499.11476147614763,364.18498562750017L499.9788478847885,365.2252430869009L500.92934293429346,366.5593107122541L502.7439243924392,366.60104752622334L502.57110711071107,363.93557484882285L501.8798379837983,364.39290143721166L500.2380738073807,363.43703863840494L499.6332133213321,362.98037649971513L499.8924392439244,360.53616194192864L500.3244824482448,357.64669839950244L499.8060306030603,356.5761102319515L500.49729972997307,355.01377158404534L501.1021602160216,354.7262649185417L504.29927992799287,354.3156931569377L505.2497749774978,354.5620149130788L506.2866786678668,355.17810103666886L507.2371737173717,355.58905355343126L508.7925292529253,356.00019319600256Z"
                        className="datamaps-subunit ZMB"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M506.3730873087309,389.2800971845194L505.07695769576964,389.0168308356261L504.29927992799287,389.3239934485607L503.0895589558956,388.88526893994526L502.1390639063907,388.88526893994526L500.58370837083714,387.703325560188L498.76912691269126,387.31017927510555L498.0778577857786,385.6547201625664L498.0778577857786,384.7862794089101L497.0409540954096,384.48278006122416L494.27587758775877,381.67549128347173L493.498199819982,380.214635291968L493.0661566156616,379.785924236368L492.11566156615663,377.73394198601494L494.7943294329433,378.0325993813339L495.57200720072007,378.331455736402L496.4360936093609,378.24604781436324L497.73222322232226,376.6263593683284L499.8060306030603,374.54612040354067L500.6701170117012,374.37670391123L501.01575157515754,373.48822707111503L502.31188118811883,372.51694852330104L504.1264626462646,372.1795481118854L504.29927992799287,373.1079382629955L506.2866786678668,373.0657017651249L507.40999099909993,373.57277507509986L507.9284428442844,374.20734630991586L509.0517551755176,374.37670391123L510.34788478847884,375.18196149387296L510.34788478847884,378.37416583305793L509.82943294329436,380.12885888853594L509.7430243024303,382.01996295407093L510.1750675067507,382.7529218838071L509.91584158415844,384.26613768009L509.483798379838,384.48278006122416L508.8789378937894,386.35087930126565Z"
                        className="datamaps-subunit ZWE"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: 1,
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                        }}
                      />
                      <path
                        d="M578.4378937893789,242.7792215120154L578.1786678667867,240.31639108715353L576.3640864086409,240.2153116328802L573.6854185418542,237.52035575870585L571.7844284428443,237.2132467124593L569.1057605760576,235.67138479878568L567.3775877587759,235.36173415064036L566.3406840684069,235.92909924288492L564.6989198919891,235.87758012468234L563.0571557155715,237.57150008042237L560.8969396939694,238.18433371749092L560.4648964896489,236.03210189316206L560.8105310531053,232.81658700714448L558.9095409540954,231.7692096507719L559.6008100810081,229.6591375024948L557.9590459045904,229.4469865803587L558.477497749775,226.83081170368717L560.7241224122413,227.58159558428656L562.8843384338434,226.56202389743072L561.1561656165617,224.67077121596074L560.4648964896489,222.81688725827823L558.477497749775,223.6368333940317L558.2182718271828,225.96947488161462L557.52700270027,223.90942442532793L558.5639063906391,222.81688725827823L561.3289828982898,222.15856181760955L562.8843384338434,223.09056636972855L564.6125112511252,225.59152208534493L565.8222322232224,225.42933245756075L568.500900090009,225.37524117940615L568.1552655265527,223.80043124984667L570.2290729072907,222.65250429633835L572.2164716471648,220.78018659295853L575.4135913591359,222.4879892969014L575.6728172817282,225.0503979451879L576.6233123312331,225.69957845155324L579.2155715571557,225.59152208534493L579.9932493249325,226.13124556934008L581.2029702970297,229.393915943798L583.9680468046804,231.55912769132823L585.523402340234,233.02546074804985L588.0292529252926,234.53388547381718L591.2263726372637,235.82604913115125L591.1399639963997,237.67375408025734L590.448694869487,237.57150008042237L589.3253825382538,236.80311695018457L588.8933393339335,237.8781237762032L586.9059405940594,238.4391941032182L586.3874887488748,240.82112740347816L585.0913591359136,241.72689985402909L583.1903690369037,242.17847239647614L582.6719171917192,243.52801371140873L580.8573357335733,243.9264048521731Z"
                        className="datamaps-subunit TKM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M560.8969396939694,238.18433371749092L563.0571557155715,237.57150008042237L564.6989198919891,235.87758012468234L566.3406840684069,235.92909924288492L567.3775877587759,235.36173415064036L569.1057605760576,235.67138479878568L571.7844284428443,237.2132467124593L573.6854185418542,237.52035575870585L576.3640864086409,240.2153116328802L578.1786678667867,240.31639108715353L578.4378937893789,242.7792215120154L577.40099009901,246.45069345859156L576.7961296129613,248.5588348783482L577.8330333033304,248.9978035402437L576.7961296129613,250.55236413664764L577.5738073807381,252.81845739421783L577.7466246624663,254.63616464395594L579.561206120612,255.1124174592241L579.7340234023402,256.91442165476747L577.5738073807381,259.4078088178081L578.7835283528353,260.85580841222225L579.7340234023402,262.5280505691161L582.0670567056707,263.7297254770336L582.1534653465346,266.11833135759406L583.2767776777678,266.57548180208425L583.4495949594959,267.8063392507885L579.9932493249325,269.1681703670599L579.1291629162916,272.2781047007171L574.549504950495,271.46973946197454L571.9572457245724,270.8846520112987L569.2785778577858,270.5240633228766L568.2416741674167,267.21432806912276L567.1183618361836,266.7581473525461L565.2173717371737,267.25990834495474L562.7979297929793,268.5333978236878L559.8600360036004,267.6243045377936L557.440594059406,265.56882629053024L555.1075607560756,264.7886145211277L553.5522052205221,262.20366218949636L551.7376237623762,258.5165689969688L550.441494149415,258.98600250094034L548.9725472547254,258.0463290664668L548.0220522052205,259.17355163791206L546.7259225922593,257.66955186391897L546.7259225922593,256.2045576993334L545.9482448244825,256.2045576993334L546.3802880288029,254.15904735492995L545.0841584158416,252.00112401883987L542.1462646264627,250.45548532497523L540.504500450045,247.7275433012918L541.0229522952295,245.46392634579416L542.2326732673267,244.42345868877953L542.0598559855986,242.72921758279176L540.504500450045,241.8273245719792L538.9491449144915,238.28631211138128L537.6530153015301,235.82604913115125L538.0850585058506,234.8964491505041L537.393789378938,231.34884197139766L539.0355535553556,230.45283837555564L539.3811881188119,231.6641940980943L540.5909090909091,233.0776480629225L542.2326732673267,233.49470008194294L543.0967596759676,233.39051134765538L545.9482448244825,231.08569723206944L546.8123312331234,230.87495052474L547.5900090009001,231.7692096507719L546.7259225922593,233.33839843896453L548.1948694869487,234.9481956145293L548.7997299729973,234.79292001306695L549.5774077407741,237.00827509630642L551.8240324032403,237.67375408025734L553.5522052205221,239.15129240639573L556.9221422142214,239.65858192851942L560.7241224122413,238.8972261688836Z"
                        className="datamaps-subunit IRN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M558.9959495949595,293.9541056165839L558.2182718271828,292.21240979499476L556.3172817281728,288.0220077249087L563.489198919892,285.47924418314324L565.1309630963096,280.3441705889919L564.0076507650765,278.4992870815444L564.0940594059406,277.4407803665858L564.7853285328533,276.37906535762045L564.7853285328533,275.31406884234235L565.8222322232224,274.78031686496604L565.3901890189019,274.4240115216798L565.6494149414941,272.6815318525448L566.8591359135913,272.6815318525448L567.8960396039604,274.468570403091L569.2785778577858,275.4473753912091L571.0067506750675,275.802604295836L572.4756975697569,276.24612176291953L573.5126012601261,277.7498396732203L574.2038703870387,278.6313784456164L575.0679567956796,278.9394018597754L575.0679567956796,279.510745635121L574.2038703870387,281.08826548878324L573.7718271827183,281.7872318640726L572.7349234923493,282.615572616344L571.8708370837085,284.3969773406244L570.7475247524753,284.2669065233038L570.3154815481548,284.87353748165214L569.8834383438344,286.170365525586L570.2290729072907,287.8501085666576L569.9698469846985,288.15088618301996L568.8465346534654,288.15088618301996L567.3775877587759,289.0948047545462L567.1183618361836,290.33592187932385L566.5999099909991,290.8484668787757L565.0445544554456,290.8484668787757L564.1804680468047,291.48832500053186L564.1804680468047,292.51023130625634L562.9707470747074,293.19025190486883L561.6746174617462,292.97785149355417L560.0328532853285,293.7844661281393ZM566.513501350135,270.5691593292017L566.0814581458146,269.6660122271381L566.7727272727273,268.76025176752876L567.0319531953195,268.98693944349833L566.8591359135913,270.11790953500434Z"
                        className="datamaps-subunit OMN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M460.3172817281728,276.51195768008284L452.10846084608465,281.4379119720011L445.1093609360936,286.51548602721317L441.73942394239424,287.63513582099665L439.0607560756076,287.89308992879904L439.0607560756076,286.2566729909796L437.93744374437443,285.8249523873804L436.468496849685,285.13323847388966L435.8636363636364,283.9198401995544L427.7412241224123,278.27902585043034L419.7052205220522,272.5471116903262L410.63231323132317,266.07257791469544L410.71872187218725,265.56882629053024L410.71872187218725,265.38543209892214L410.71872187218725,262.157290898293L414.52070207020705,260.10939354542825L416.9401440144015,259.68865566608855L418.9275427542754,258.93909524428454L419.87803780378044,257.57527581550335L422.64311431143113,256.44138800653593L422.7295229522952,254.34999847486364L424.11206120612064,254.1112877984921L425.2353735373538,253.0583569776233L428.3460846084609,252.62637710510907L428.7781278127813,251.51911971143045L428.1732673267327,250.89114789662545L427.3091809180918,247.87444537606672L427.2227722772277,246.1057816583686L426.2722772277228,244.22476134707028L428.60531053105314,242.62917789682712L431.19756975697567,242.07819810189355L432.6665166516652,240.87154066676334L434.9995499549955,239.96241930304438L439.0607560756076,239.40507726790904L443.0355535553556,239.20207185110138L444.24527452745275,239.60790335623693L446.49189918991897,238.4391941032182L449.0841584158416,238.4391941032182L450.03465346534654,239.1005017066666L451.6764176417642,238.948061983043L451.24437443744375,240.46792748795588L451.5900090009001,243.27867940783585L451.0715571557156,245.71099535627584L449.516201620162,247.33537494319046L449.77542754275424,249.53327222242092L451.7628262826283,251.2294793361798L451.7628262826283,251.90479583691797L453.23177317731773,253.0583569776233L454.26867686768674,258.09338954479756L455.04635463546356,260.5294969091218L455.13276327632764,261.8324802911767L454.70072007200724,264.05240268620287L454.8735373537354,265.29369243633386L454.61431143114316,266.7581473525461L454.7871287128713,268.44260952550866L453.83663366336634,269.57555455271165L455.30558055805585,271.51470190988624L455.39198919891993,272.63673128963006L456.2560756075608,274.11193287821163L457.37938793879385,273.62093153636886L459.2803780378038,274.86933418300254Z"
                        className="datamaps-subunit DZA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M468.78532853285327,235.05165238388872L467.9212421242124,237.41803242324445L468.2668766876688,238.38824483973042L467.74842484248427,239.9118075582141L465.9338433843385,238.7955206243992L464.72412241224123,238.4391941032182L461.3541854185419,236.90571937861614L461.6998199819982,235.36173415064036L464.464896489649,235.67138479878568L466.8843384338434,235.31008385367886ZM453.57740774077405,225.753585654877L455.04635463546356,228.0094186319501L454.70072007200724,232.13636484696855L453.57740774077405,231.92663781608832L452.6269126912691,232.97326099552868L451.7628262826283,232.13636484696855L451.5900090009001,228.38305594009785L451.0715571557156,226.56202389743072L452.3676867686769,226.72333786546926ZM464.63771377137715,208.1010027002984L464.3784878487849,209.80507424850086L464.98334833483347,211.2619991486097L463.0823582358236,210.79698567997087L461.0949594959496,211.95742056124925L461.18136813681366,213.68511751101488L460.9221422142214,214.65738040954162L461.6998199819982,216.36146731183177L463.94644464446446,217.99490037972066L465.1561656165617,220.72485653221054L467.83483348334835,223.36388122727345L469.7358235823582,223.36388122727345L470.34068406840686,224.0728063432L469.6494149414941,224.67077121596074L471.8096309630963,225.86155816170253L473.537803780378,226.83081170368717L475.6116111611161,228.43637901049277L475.87083708370835,229.0220516875774L475.43879387938796,230.18859733368825L474.0562556255626,228.70279377300693L471.98244824482447,228.16962955288992L470.94554455445547,230.24147153439958L472.67371737173715,231.34884197139766L472.4144914491449,232.97326099552868L471.46399639964,233.18198542162597L470.1678667866787,235.77450625231603L469.13096309630964,236.03210189316206L469.13096309630964,235.10336270947369L469.6494149414941,233.44261189184445L470.1678667866787,232.81658700714448L469.2173717371737,230.98034958636924L468.52610261026103,229.4469865803587L467.48919891989203,229.0220516875774L466.79792979297935,227.68863254290756L465.24257425742576,227.09925615771954L464.2056705670567,225.80757888761468L462.39108910891093,225.59152208534493L460.5765076507651,224.1816558687484L458.3298829882989,222.04863451302197L456.68811881188117,220.17072210112838L455.99684968496854,216.9262402431878L454.7871287128713,216.53106848566486L452.7997299729973,215.39763128790406L451.7628262826283,215.85178828224014L450.38028802880285,217.43316376153965L449.34338433843385,217.65804864208798L449.6026102610261,216.24831896305488L448.30648064806485,215.7950759044311L447.70162016201624,213.16842104754699L448.5657065706571,212.130885073413L447.7880288028803,210.85517392502516L447.9608460846085,209.86356446648728L448.9977497749775,210.6223150645166L450.1210621062106,210.4474852967532L451.41719171917197,209.27785454764384L451.84923492349236,209.86356446648728L453.0589558955896,209.7465661237165L453.57740774077405,208.33695701839747L455.30558055805585,208.74917261344615L456.34248424842485,208.16001880900257L456.6017101710171,206.73852538817283L457.98424842484246,207.27283965179765L458.3298829882989,206.5600834353999L460.6629162916292,205.96405112837758L461.18136813681366,207.2135460843336Z"
                        className="datamaps-subunit ITA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M531.2587758775878,224.72504614395L533.7646264626462,224.56217871242924L536.0976597659766,226.13124556934008L536.529702970297,227.26015862886953L536.2704770477047,228.75603668706526L538.0850585058506,229.5530883439298L539.0355535553556,230.45283837555564L537.393789378938,231.34884197139766L538.0850585058506,234.8964491505041L537.6530153015301,235.82604913115125L538.9491449144915,238.28631211138128L537.8258325832583,238.7955206243992L536.9617461746175,238.03128033623335L534.1966696669667,237.6226328510471L533.1597659765977,238.08230958149008L530.3946894689469,238.541058476529L529.0985598559856,238.49013197897327L526.3334833483348,239.60790335623693L524.3460846084608,239.65858192851942L523.1363636363636,239.04969974248854L520.457695769577,239.9118075582141L519.6800180018002,239.30359701310263L519.507200720072,240.97233438432102L518.9023402340234,241.6264319960627L518.2974797479749,242.27870387436013L517.3469846984699,240.92194299066304L518.2974797479749,239.81055071537847L516.8285328532853,240.063609486005L514.8411341134113,239.40507726790904L513.1993699369937,241.1234430751654L509.483798379838,241.42536657121568L507.5828082808281,239.86118469875987L504.9905490549055,239.7599055987588L504.472097209721,240.97233438432102L502.7439243924392,241.324768859593L500.49729972997307,239.7599055987588L497.81863186318634,239.81055071537847L496.4360936093609,236.80311695018457L494.62151215121514,235.10336270947369L495.8312331233123,232.7120753007722L494.27587758775877,231.24362248576415L496.9545454545455,228.27636959042235L500.6701170117012,228.1162393726326L501.70702070207017,225.69957845155324L506.2866786678668,226.13124556934008L509.1381638163817,224.0728063432L511.90324032403237,223.1452584314175L515.8780378037804,223.09056636972855L520.1120612061206,225.37524117940615L523.5684068406841,226.56202389743072L526.3334833483348,226.07733590986854L528.4072907290729,226.4005857944443ZM494.01665166516653,226.99191948475269L494.62151215121514,226.61580899719505L495.31278127812783,224.6164820761823L494.1894689468947,223.74591305596806L496.60891089108907,222.76210758741297L498.6827182718272,223.19993593550527L498.9419441944195,224.45352926419702L501.1021602160216,225.48340969326637L500.6701170117012,226.23902323830328L497.81863186318634,226.4005857944443L496.78172817281734,227.42093833329136L494.7943294329433,229.07521485271707L494.01665166516653,227.63512084343233Z"
                        className="datamaps-subunit TUR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M488.4000900090009,242.62917789682712L489.6962196219622,243.62767411409862L491.5972097209721,243.4781678164102L493.32538253825385,243.67748863926556L493.32538253825385,244.1750611741516L494.62151215121514,243.82686961475412L494.27587758775877,244.72119559964625L490.81953195319534,244.96902753012847L490.9059405940594,244.47310722986026L487.96804680468045,243.8766424356201ZM494.01665166516653,226.99191948475269L492.547704770477,226.88452801583838L491.33798379837987,226.56202389743072L488.4000900090009,227.42093833329136L490.0418541854186,229.18150143811766L488.8321332133213,229.7121423827581L487.53600360036006,229.7121423827581L486.23987398739877,228.06283573613533L485.8078307830783,228.75603668706526L486.32628262826285,230.66399780534675L487.53600360036006,232.08395204180448L486.6719171917192,232.76433739905136L487.96804680468045,234.17072705070098L489.1777677767777,235.10336270947369L489.1777677767777,236.80311695018457L487.01755175517553,235.98060649572554L487.7088208820882,237.52035575870585L486.1534653465347,237.8781237762032L487.1039603960396,240.51841758362764L485.462196219622,240.56889667568646L483.47479747974796,239.2528400502007L482.6107110711071,236.85442400814117L482.1786678667867,234.79292001306695L481.2281728172817,233.39051134765538L480.01845184518453,231.61166725684313L479.8456345634564,230.76949996013565L480.96894689468945,229.2346248808514L481.1417641764176,228.22300628834452L481.91944194419443,227.74213069424871L481.91944194419443,226.9382306056289L483.47479747974796,226.61580899719505L484.42529252925294,225.91552348906498L485.72142214221424,226.02341235125272L486.1534653465347,225.42933245756075L486.5855085508551,225.32113584678396L488.4000900090009,225.42933245756075L490.3010801080108,224.56217871242924L491.9428442844284,225.6455572656958L494.1894689468947,225.37524117940615L494.1894689468947,223.74591305596806L495.31278127812783,224.6164820761823L494.62151215121514,226.61580899719505Z"
                        className="datamaps-subunit GRC"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M402.2506750675068,299.0166612292211L400.69531953195326,297.29255951343384L399.22637263726375,295.4781973947013L397.6710171017102,294.80140963164126L396.547704770477,294.0812958864044L395.16516651665165,294.1236851716981L394.0418541854186,294.63206702460064L392.8321332133213,294.4203060174445L391.96804680468045,295.22451062882436L391.7952295229523,293.8692933814825L392.486498649865,292.63781057979605L392.7457245724572,290.29318310125205L392.486498649865,287.76413266933827L392.22727272727275,286.51548602721317L392.4000900090009,285.21976792604147L391.7952295229523,284.0066356146732L390.5855085508551,282.9202968267899L391.1039603960396,282.0490089964143L400.4360936093609,282.09262087340875L400.0040504050405,278.32308901665897L400.60891089108907,276.9987931885593L402.85553555355534,276.77758908341997L402.76912691269126,269.98240859552766L410.63231323132317,270.1630635568817L410.63231323132317,266.07257791469544L419.7052205220522,272.5471116903262L415.98964896489645,272.59192457075847L417.1993699369937,283.8330254969187L418.32268226822686,294.75907947910525L418.75472547254725,295.0553138605807L418.2362736273627,296.82903338317686L408.5585058505851,296.87118930358116L408.2128712871287,297.4189039547114L407.26237623762376,297.25043789206546L405.96624662466246,297.7135890597495L404.2380738073807,297.03977853785193L403.46039603960395,297.0819172557848L403.11476147614763,298.5546430229129Z"
                        className="datamaps-subunit MRT"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M467.14356435643566,278.10271842940017L465.4153915391539,279.0713309011173L464.1192619261926,277.6174189879573L460.3172817281728,276.51195768008284L459.2803780378038,274.86933418300254L457.37938793879385,273.62093153636886L456.2560756075608,274.11193287821163L455.39198919891993,272.63673128963006L455.30558055805585,271.51470190988624L453.83663366336634,269.57555455271165L454.7871287128713,268.44260952550866L454.61431143114316,266.7581473525461L454.8735373537354,265.29369243633386L454.70072007200724,264.05240268620287L455.13276327632764,261.8324802911767L455.04635463546356,260.5294969091218L454.26867686768674,258.09338954479756L455.39198919891993,257.4338002059172L455.65121512151217,256.25194054605834L455.39198919891993,255.1124174592241L457.03375337533754,254.01574250241305L457.7250225022502,253.1063101988989L458.93474347434744,252.28989150088023L459.10756075607566,250.11611609390872L461.87263726372635,251.08453536371533L462.90954095409546,250.8427779716883L464.8969396939694,251.3260627536166L468.0940594059406,252.5783346615425L469.2173717371737,255.1124174592241L471.3775877587759,255.6353057624882L474.7475247524753,256.81988155621934L477.3397839783978,258.18748612962935L478.463096309631,257.48096695667164L479.5864086408641,256.2045576993334L479.0679567956796,254.063519516773L479.8456345634564,252.67441059263336L481.5738073807381,251.3260627536166L483.2155715571557,250.9395085905577L486.4126912691269,251.51911971143045L487.27677767776777,252.81845739421783L488.1408640864086,252.81845739421783L488.9185418541854,253.29803434862254L491.33798379837987,253.63321112749537L491.85643564356434,254.5408105776118L490.9923492349235,255.92008382534104L491.42439243924395,257.10340230007955L490.81953195319534,258.8452567163381L491.510801080108,261.0421019919397L491.510801080108,270.65933209570005L491.510801080108,280.3441705889919L491.510801080108,285.47924418314324L488.7457245724572,285.47924418314324L488.7457245724572,286.55860563453746L479.1543654365437,281.6562750143876L469.56300630063004,276.6890679351335Z"
                        className="datamaps-subunit LBY"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M458.1570657065706,344.0581258361918L455.65121512151217,341.616090276295L454.0958595859586,339.62346203198115L452.6269126912691,337.14430235749865L452.7133213321332,336.37231946068414L453.23177317731773,335.60039610934905L453.83663366336634,333.8535039068273L454.26867686768674,332.0658789121919L455.13276327632764,331.90335183488236L458.5891089108911,331.9439839331172L458.5891089108911,329.0583424116974L459.7124212421242,328.8957118809595L461.18136813681366,329.22096535938346L462.5639063906391,328.8957118809595L462.90954095409546,329.0583424116974L462.73672367236725,330.07462045464104L463.34158415841586,331.3344772001046L465.1561656165617,331.1312951366785L465.76102610261023,331.61892064327094L464.72412241224123,334.38163191058413L465.8474347434743,335.8035294259748L466.10666066606666,337.67254803667635L465.8474347434743,339.29824846321276L465.06975697569754,340.39596280078945L462.99594959495954,340.31463856945703L461.6998199819982,339.1763004133898L461.52700270027003,340.23331637661937L459.8852385238524,340.5179530323017L459.0211521152116,341.12797731809127L459.9716471647165,342.71468222629375Z"
                        className="datamaps-subunit GAB"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M488.9185418541854,360.867088079139L489.1777677767777,361.6122271109172L488.8321332133213,362.8143945901939L489.2641764176418,363.97713666374057L488.9185418541854,364.89217508756894L489.1777677767777,365.72517855342534L484.16606660666065,365.68350184097085L483.9932493249325,373.57277507509986L485.63501350135016,375.6487822955825L487.1903690369037,377.22241633126777L482.7835283528353,378.24604781436324L476.9941494149415,377.86191374906775L475.3523852385239,376.6689092866186L465.5882088208821,376.79658256408214L465.24257425742576,376.96686865249524L463.7736273627363,375.8186493546327L462.2182718271828,375.73370818439594L460.83573357335734,376.15856755358334L459.62601260126013,376.6689092866186L459.45319531953197,375.0547260059924L459.79882988298834,372.896791201957L460.5765076507651,370.57988108804676L460.74932493249327,369.5300796295362L461.52700270027003,367.31102134997786L462.0454545454545,366.30895063621733L463.42799279927993,364.6840968184076L464.2056705670567,363.60317539735587L464.464896489649,361.7779196745639L464.3784878487849,360.37075488809324L463.6008100810081,359.50296935280664L462.99594959495954,358.01760771187406L462.39108910891093,356.5761102319515L462.5639063906391,356.08244391054376L463.2551755175518,355.09593265792705L462.5639063906391,352.7570894513726L462.0454545454545,351.15989133427223L460.83573357335734,349.6057994112496L461.0949594959496,349.1562981782208L462.0454545454545,348.8294865436545L462.73672367236725,348.87033354514296L463.6008100810081,348.58443089466124L470.68631863186323,348.6252703829472L471.29117911791184,350.42349027695195L471.98244824482447,351.85581816152785L472.500900090009,352.6341437050245L473.4513951395139,353.9052969106959L475.0067506750675,353.70016344023503L475.7844284428443,353.37203805472956L477.16696669666965,353.70016344023503L477.5126012601261,353.12601423859246L478.1174617461746,351.6920314978683L479.5864086408641,351.61014728745295L479.7592259225923,351.2008162704942L480.96894689468945,351.15989133427223L480.7097209720972,352.06058600066615L483.6476147614762,352.0196293456433L483.73402340234026,353.5360872725712L484.16606660666065,354.47990059065233L483.82043204320433,355.959070703926L483.9932493249325,357.44070995639504L484.77092709270926,358.34744721829026L484.6845184518452,361.2395606069855L485.28937893789384,361.0326076586635L486.32628262826285,361.0739934821398L487.7952295229523,360.7429731858979ZM460.74932493249327,348.42108529969926L460.0580558055806,346.5847430934354L461.0949594959496,345.56550313888994L461.78622862286227,345.1579803273072L462.65031503150317,345.9731231017092L461.78622862286227,346.46240037402265L461.44059405940595,347.11500655196414L461.3541854185419,348.13527752729453Z"
                        className="datamaps-subunit AGO"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M558.9959495949595,293.9541056165839L557.1813681368137,294.63206702460064L556.7493249324932,295.7317549230623L556.6629162916292,296.5760251944363L554.3298829882989,297.62941020081246L550.441494149415,298.80670180659337L548.3676867686769,300.52601354957335L547.2443744374438,300.65160974049195L546.5531053105311,300.52601354957335L545.1705670567057,301.57181041709794L543.6152115211521,302.0313665382305L541.6278127812782,302.1566380848784L541.0229522952295,302.28188329243534L540.504500450045,302.9494174069906L539.8132313231323,303.11618629915336L539.467596759676,303.7411679466829L538.2578757875788,303.69952206739947L537.4801980198021,304.03261166891684L535.8384338433843,303.9077237692529L535.2335733573358,302.4488361196906L535.3199819981999,301.1118932953508L534.8879387938794,300.400389586915L534.455895589559,298.5546430229129L533.7646264626462,297.5452178504536L534.1966696669667,297.4189039547114L534.0238523852386,296.2806906275613L534.2830783078308,295.77400201152255L534.1966696669667,294.7167456633066L535.2335733573358,293.9117013741304L534.9743474347434,292.8503651220789L535.5792079207921,291.616188087176L536.6161116111612,292.25496746844954L537.2209720972097,292.04213979423076L539.9860486048605,291.99956244508917L540.418091809181,292.21240979499476L542.7511251125113,292.46769709718876L543.7016201620162,292.3400710543493L544.3064806480648,293.19025190486883L545.429792979298,292.765354915702L547.1579657965797,290.1221866637753L549.404590459046,289.0090798224342L556.3172817281728,288.0220077249087L558.2182718271828,292.21240979499476Z"
                        className="datamaps-subunit YEM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M476.73492349234925,197.3494534761862L476.9077407740774,197.59950952683076L477.8582358235824,197.09905116112768L479.0679567956796,198.4098160266351L480.53690369036906,197.59950952683076L481.6602160216022,197.97394720902736L483.3883888388839,197.47452470287533L485.63501350135016,198.90667434981555L484.9437443744374,199.83464526086013L484.511701170117,201.3096708027947L483.9932493249325,201.6765824125055L481.40099009900996,200.57364209817123L480.62331233123314,200.81931315665636L480.1048604860486,201.6154812623737L478.9815481548155,202.10372395249425L478.72232223222323,201.85976431783374L477.5126012601261,202.40822050536664L476.56210621062104,202.52987867316017L476.3892889288929,203.2581520600709L474.3154815481548,203.6816601976355L473.4513951395139,203.31871244433887L472.24167416741676,202.40822050536664L471.98244824482447,201.12594008049876L472.24167416741676,200.69651877427788L472.5873087308731,199.89634250865038L473.6242124212422,199.95801893220224L474.40189018901896,199.52584597657037L474.48829882988304,199.21652315803857L474.92034203420343,199.03067714963268L475.0931593159316,198.2231432922396L475.6980198019802,198.03627833702694L476.04365436543657,197.3494534761862Z"
                        className="datamaps-subunit SVK"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M454.441494149415,222.7073132709725L453.6638163816382,225.21288297000444L452.54050405040505,224.56217871242924L452.0220522052205,222.3782391077354L452.45409540954097,221.1670747264791L454.0094509450945,219.94864199275256ZM445.1093609360936,197.2242956834936L445.6278127812781,197.59950952683076L446.3190819081908,197.47452470287533L447.44239423942395,198.4719976493268L450.89873987398744,199.15459555440424L449.68901890189017,201.6154812623737L449.42979297929793,204.16449012926705L448.73852385238524,204.76627196833377L447.70162016201624,204.46562391102202L447.7880288028803,205.36611977013166L445.9734473447345,207.3321146046066L445.9734473447345,208.92556312682575L447.09675967596763,208.3958997711311L447.9608460846085,209.86356446648728L447.7880288028803,210.85517392502516L448.5657065706571,212.130885073413L447.70162016201624,213.16842104754699L448.30648064806485,215.7950759044311L449.6026102610261,216.24831896305488L449.34338433843385,217.65804864208798L447.1831683168317,219.55941202153366L442.4306930693069,218.66690267533332L438.97434743474344,219.72631699325888L438.6287128712871,221.6634217406686L435.8636363636364,222.10360556423382L433.1849684968497,220.6141510344711L432.32088208820886,221.3326584153413L427.91404140414045,219.83751015755396L426.96354635463547,218.55505907785067L428.1732673267327,216.5875699071758L428.60531053105314,209.80507424850086L426.1858685868587,206.14305943472505L424.3712871287129,204.3452288099114L420.7421242124213,202.9550529378535L420.482898289829,200.3276412510745L423.59360936093606,199.58764763785328L427.6548154815482,200.51217285206764L426.8771377137714,196.3457534875794L429.12376237623766,197.91159464262796L434.74032403240324,195.01984746894044L435.431593159316,191.95176065768703L437.50540054005404,191.17638517767415L437.85103510351036,192.53107188317767L438.97434743474344,192.59532314766125L440.09765976597663,194.06673103029038L441.8258325832583,195.84179950955343L443.0355535553556,195.58929185082798Z"
                        className="datamaps-subunit FRA"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M260.2812781278128,306.02753069541444L260.19486948694873,306.6082537167683L258.81233123312336,306.8984307955782L259.5900090009001,307.9751811937975L259.5900090009001,309.2569095376777L258.55310531053107,310.7014275577109L259.4171917191719,312.63715801133077L260.45409540954097,312.472587276008L260.9725472547255,310.7014275577109L260.2812781278128,309.835038489162L260.10846084608465,307.9751811937975L263.13276327632764,306.9813162193567L262.7871287128713,305.8615183199075L263.65121512151217,305.07239348867597L264.515301530153,306.77408410487055L266.1570657065707,306.81553548099606L267.71242124212426,308.18206268721565L267.79882988298834,309.0090055142047L269.9590459045905,309.0090055142047L272.551305130513,308.7610196051781L273.9338433843385,309.8763168070371L275.74842484248427,310.16520381993905L277.13096309630964,309.42213380584747L277.13096309630964,308.80235631188236L280.06885688568855,308.6369956830621L283.00675067506756,308.59564976213903L280.93294329432945,309.3395261593049L281.79702970297035,310.49523046289517L283.6980198019802,310.6601923886127L285.512601260126,311.85516659065445L285.8582358235824,313.829383074746L287.1543654365437,313.7472111110384L288.10486048604866,314.32226219581594L286.2038703870387,315.75838170088974L285.94464446444647,316.6190703014121L286.80873087308726,317.51999883414493L286.2038703870387,317.97018919609746L284.73492349234925,318.3793002435429L284.73492349234925,319.48320194326647L284.13006300630065,320.1369073593779L285.7718271827183,321.9737710443482L286.03105310531055,322.6671009307114L285.16696669666965,323.5639093460155L282.488298829883,324.5009871343153L280.7601260126013,324.86754143407273L280.06885688568855,325.43760241746253L278.1678667866787,324.82681659427334L276.3532853285329,324.5009871343153L275.9212421242124,324.74536437442055L277.04455445544556,325.3561748646022L276.9581458145815,326.9841568507281L277.2173717371737,328.48910088291484L279.29117911791184,328.6924127067622L279.3775877587759,329.180310320915L277.73582358235825,329.8713858746248L277.3901890189019,330.88746696452745L276.43969396939696,331.29384135138497L274.62511251125113,331.8627195114611L274.19306930693074,332.5940697751281L272.2920792079208,332.7565840732769L270.9959495949595,331.45638311117534L270.3046804680468,329.0989988506312L269.6134113411341,328.24510936982017L268.74932493249327,327.7163927348266L269.9590459045905,326.4958828383475L269.87263726372635,325.9668055963335L269.1813681368137,325.274744116062L268.74932493249327,323.6454138385928L268.9221422142215,321.9329772265418L269.44059405940595,321.11686474763684L269.87263726372635,319.81009594387325L269.00855085508556,319.4014653202552L267.6260126012602,319.687520471906L265.8978397839784,319.5649332879261L264.9473447344735,319.81009594387325L263.3055805580558,317.7246529563571L261.9230423042304,317.4381267418701L258.81233123312336,317.64279576480527L258.2074707470747,316.82389238596147L257.60261026102614,316.6190703014121L257.51620162016206,316.127335587997L257.8618361836184,315.22521099716494L257.60261026102614,314.24013369979497L257.0841584158416,313.70612237498625L256.8249324932493,312.59601824536446L255.52880288028805,312.4314397164847L256.22007200720077,310.99001467069877L256.5657065706571,309.2569095376777L257.25697569756977,308.34752552355957L258.1210621062106,307.6440472917341L258.7259225922592,306.4423833267952Z"
                        className="datamaps-subunit VEN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M238.76552655265527,342.67398470666706L240.06165616561657,340.8432837848077L239.54320432043204,339.8267349927436L238.59270927092712,340.9246219611086L237.21017101710171,339.86739097135444L237.64221422142214,339.21694934861324L237.2965796579658,337.0224053690702L238.0742574257426,336.6567259930748L238.50630063006304,335.15351077329484L239.45679567956796,333.6097498614808L239.2839783978398,332.6346985880982L240.5801080108011,332.1065101451691L242.22187218721874,331.1719321204308L244.64131413141317,332.55344079729036L245.0733573357336,332.51281165103745L245.67821782178217,333.5284979412632L247.7520252025203,333.8535039068273L248.35688568856887,333.48787185799L249.56660666066608,334.25975663347293L250.6035103510351,334.82850797509315L250.94914491449146,336.6567259930748L250.1714671467147,338.24148086097426L247.57920792079207,340.76194783229107L244.72772277227725,341.69745100156763L243.2587758775878,343.7730810008654L242.74032403240327,345.40248255788885L241.44419441944197,346.3808438215802L240.40729072907294,345.1987283393365L239.45679567956796,344.9135117745364L238.41989198919893,345.1172332507714L238.33348334833485,344.22102696627206L239.02475247524754,343.6509312004201Z"
                        className="datamaps-subunit ECU"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M780.461296129613,441.8674126454957L782.7943294329434,442.9972001409528L784.0904590459046,442.5660868456948L785.9914491449144,441.9210744319632L787.3739873987399,442.13585857023605L787.5468046804681,445.93083179997024L786.7691269126913,447.0830657257279L786.5099009900991,449.68578454787104L785.6458145814581,448.7959860824151L784.0040504050405,451.0840421167474L783.485598559856,450.9157338022477L782.0166516651666,450.8036071102718L780.547704770477,448.02061744844923L780.2020702070207,445.87612485530246L778.8195319531953,443.0511518324523L778.9059405940594,441.5993086188872ZM776.0544554455445,367.85452166010094L776.9185418541855,369.78184751983423L778.473897389739,368.8592581583475L779.2515751575157,369.9077748530909L780.3748874887489,370.8741919929819L780.1156615661566,371.9687853636388L780.6341134113411,374.12268950671745L781.0661566156616,375.35166151892815L781.67101710171,375.6487822955825L782.2758775877587,377.819252458281L782.0166516651666,379.10086792185115L782.7943294329434,380.81555293346884L785.47299729973,382.14921374800474L787.1147614761476,383.3575253160162L788.7565256525652,384.48278006122416L788.4108910891089,385.0900136076621L789.7934293429344,386.6994346250542L790.7439243924393,389.49963166144215L791.6944194419442,388.9291176388575L792.6449144914491,390.07104663646754L793.2497749774977,389.67535517102533L793.6818181818182,392.454510109813L795.3235823582357,394.0526382345274L796.446894689469,395.03300411447617L798.3478847884788,397.1821368118497L799.0391539153916,399.345701303675L799.1255625562557,400.8418532965476L798.9527452745275,402.52808829547973L800.0760576057605,404.82197517234454L799.9032403240324,407.2269049660531L799.471197119712,408.53032345974657L798.8663366336634,410.96726708190704L798.9527452745275,412.5724948473714L798.4342934293429,414.6165429634143L797.397389738974,417.15812016933114L795.5828082808281,418.55952529799515L794.7187218721872,420.79857941899706L793.9410441044104,422.2206292108033L793.2497749774977,424.74182247163424L792.2992799279928,426.23737298013504L791.6944194419442,428.4481831817982L791.3487848784879,430.5274165130252L791.521602160216,431.4462592902638L790.1390639063907,432.52298083564705L787.4603960396039,432.6257949404204L785.2137713771376,433.8632642343005L784.0904590459046,435.05567083636805L782.6215121512153,436.41142589596916L780.6341134113411,435.0036931031187L779.1651665166517,434.4845878629196L779.597209720972,432.88303663352065L778.3010801080109,433.450011657038L776.1408640864087,435.6803629564705L774.0670567056704,434.8478333664976L772.7709270927093,434.380912919558L771.3883888388839,434.1737084832637L769.0553555355535,433.2952393188868L767.5,431.3951147205267L767.0679567956795,429.10541915358056L766.4630963096308,427.59152363944827L765.3397839783978,426.387449124351L763.0067506750675,426.0374199029494L763.7844284428443,424.64245270442325L763.1795679567956,422.4666471415941L762.0562556255625,424.49347548115304L759.8960396039604,425.04018030188433L761.1057605760576,423.4037936116649L761.537803780378,421.72933572863235L762.4018901890188,420.3101140387216L762.2290729072906,418.17215686862806L760.3280828082808,420.60307762393916L758.7727272727273,421.63119525125694L757.9086408640864,423.94801705264183L756.0076507650765,422.71291391494293L756.0940594059407,421.1900479097998L754.538703870387,419.09313049203706L753.3289828982898,418.02704649145466L753.7610261026102,417.35095895218507L750.6503150315032,415.6685112304793L749.0085508550856,415.57270191275796L746.6755175517551,414.1874088398214L742.3550855085508,414.4734203203982L739.2443744374438,415.476927940722L736.5657065706571,416.43626538476144L734.2326732673267,416.2441127386344L731.7268226822682,417.68877807087034L729.6530153015302,418.36576686124096L729.1345634563456,419.87131571414227L728.2704770477048,421.0431744025235L726.2830783078308,421.0921225122647L724.7277227722773,421.3370090734104L722.653915391539,420.8474790340639L720.9257425742574,421.1410803453106L719.2839783978399,421.2880122656947L717.8150315031503,422.8114905335443L717.1237623762377,422.71291391494293L715.9140414041403,423.50265198044826L714.7907290729073,424.44383701959475L712.9761476147614,424.34459096414105L711.420792079208,424.34459096414105L708.8285328532852,422.4666471415941L707.532403240324,421.92573470465595L707.6188118811881,420.2613204003299L708.8285328532852,419.87131571414227L709.1741674167417,419.1902714489728L709.0877587758775,418.17215686862806L709.4333933393339,416.1960969487959L709.1741674167417,414.5211191915526L707.8780378037803,411.6742795897692L707.532403240324,410.12126769977647L707.6188118811881,408.53032345974657L706.6683168316832,406.76285021283644L706.5819081908191,405.92944654871803L705.54500450045,404.86803562745695L705.1993699369937,402.71094898598244L703.8168316831683,400.6146974835933L703.471197119712,399.43617234310227L704.594509450945,400.6146974835933L703.7304230423042,398.1268834139615L704.9401440144013,398.89373752792187L705.6314131413142,399.93423270678966L705.6314131413142,398.57774885289035L704.4216921692168,396.46418659150913L704.1624662466246,395.6583803809497L703.6440144014401,394.854541664092L703.9032403240324,393.34143410380784L704.4216921692168,392.6760264006727L704.7673267326732,391.3931972274459L704.508100810081,389.8511643058338L705.458595859586,388.0093927125336L705.6314131413142,389.9830775465273L706.6683168316832,388.18440160012364L708.5693069306931,387.31017927510555L709.7790279027904,386.2202531774863L711.5936093609362,385.2636820907085L712.7169216921691,385.0900136076621L713.3217821782177,385.3939843222441L715.2227722772277,384.4394420862687L716.6917191719172,384.17951390570556L717.0373537353735,383.61691836967555L717.7286228622863,383.3575253160162L719.0247524752475,383.4439710791691L721.530603060306,382.6666233532141L722.8267326732674,381.54638796364503L723.4315931593159,380.214635291968L724.9005400540054,378.92977151107505L724.9869486948694,377.9045790822747L725.0733573357336,376.5412712664357L726.7151215121512,374.4190525024359L727.7520252025201,376.58381336307826L728.7889288928893,376.0735649056938L727.9248424842483,374.8851311725104L728.7025202520251,373.6573374735668L729.7394239423943,374.20734630991586L729.9986498649866,372.3060472175877L731.2947794779477,371.08451378462854L731.8996399639964,370.1177184086722L733.1093609360937,369.69791206169833L733.1093609360937,368.9849756976049L734.2326732673267,369.27842669366237L734.2326732673267,368.6497914113513L735.2695769576958,368.3148059352417L736.4792979297929,367.98001716455263L738.2074707470748,369.1107214912946L739.5900090009001,370.57988108804676L741.0589558955895,370.57988108804676L742.614311431143,370.8321376314967L742.0958595859587,369.4461825890985L743.2191719171917,367.47819824160536L744.3424842484249,366.8515295861L743.9104410441043,366.2255203453985L744.9473447344735,364.8089355831935L746.4162916291629,363.93557484882285L747.6260126012601,364.226563425874L749.6998199819982,363.7693540497222L749.6134113411342,362.5240240179135L747.8852385238524,361.7364928752734L749.1813681368137,361.36376108198704L750.7367236723671,361.9850904305108L752.0328532853287,362.98037649971513L754.0202520252025,363.60317539735587L754.7115211521152,363.3539858898826L756.1804680468047,364.1018380482871L757.6494149414942,363.395510964857L758.513501350135,363.60317539735587L759.1183618361836,363.1463993554372L760.1552655265526,364.35131290374926L759.5504050405041,365.68350184097085L758.5999099909991,366.68452987739875L757.8222322232224,366.76802388655284L758.0814581458146,367.7290534116755L757.3901890189019,368.9849756976049L756.5261026102611,370.2017185614696L756.6989198919892,370.9162496811498L758.5999099909991,372.26387738438115L760.414491449145,373.0657017651249L761.7106210621062,373.9111113803502L763.438793879388,375.3940959664654L764.1300630063006,375.3940959664654L765.3397839783978,376.0310693673032L765.6854185418541,376.8391481788948L768.0184518451847,377.69129279556404L769.5738073807381,376.8391481788948L770.0922592259226,375.47897622170944L770.5243024302431,374.37670391123L770.8699369936994,372.981239406438L771.561206120612,371.0003750543267L771.2155715571557,369.82382007395523L771.3883888388839,369.1107214912946L771.1291629162918,367.68723670001845L771.4747974797481,365.8085404474214L771.9068406840685,365.30853774215575L771.561206120612,364.47608658926066L772.1660666066607,363.1879114967565L772.5981098109811,361.860780613325L772.6845184518452,361.1567722706002L773.548604860486,360.246723900945L774.2398739873988,361.4465734243421L774.412691269127,362.98037649971513L775.0175517551756,363.27094351985926L775.1039603960396,364.30972706002336L775.9680468046805,365.55848859355615L776.1408640864087,366.9350470084764Z"
                        className="datamaps-subunit AUS"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M696.2992799279928,288.83757874445075L694.2254725472546,290.0366635864691L692.2380738073807,289.2662035885282L692.2380738073807,287.0756889363871L693.3613861386139,285.9545167615629L696.0400540054005,285.21976792604147L697.4225922592259,285.2630256339473L697.9410441044104,286.2566729909796L696.9041404140414,287.37702285466133ZM745.0337533753376,221.9386479659898L743.4783978397841,220.0041849451904L742.527902790279,221.82860207418366L738.8123312331232,223.25459889450934L739.1579657965797,224.9420039813054L737.0841584158416,224.8335534132432L735.9608460846084,223.80043124984667L734.3190819081908,226.07733590986854L731.7268226822682,227.79561530898147L729.7394239423943,229.8181128008698L726.3694869486949,230.7167553369713L724.6413141314131,232.13636484696855L722.0490549054906,233.02546074804985L723.3451845184519,231.55912769132823L722.8267326732674,230.347180925312L724.7277227722773,228.22300628834452L723.4315931593159,226.61580899719505L721.3577857785779,227.68863254290756L718.5927092709271,229.87107836093622L717.1237623762377,231.92663781608832L714.7907290729073,232.03152660871427L713.5810081008101,233.49470008194294L714.8771377137714,235.56821568410635L716.7781278127813,236.08358544514311L716.8645364536453,237.41803242324445L718.7655265526553,238.28631211138128L721.4441944194419,236.13505716160864L723.6044104410441,237.31566276707196L725.1597659765978,237.41803242324445L725.5054005400541,238.99888650442796L722.1354635463546,239.81055071537847L721.0121512151215,241.42536657121568L718.6791179117912,242.92916975094911L717.469396939694,244.96902753012847L720.0616561656166,246.59836320713907L721.0121512151215,249.43599964205254L722.4810981098109,252.04927452431636L724.0364536453644,254.20679819344048L724.0364536453644,256.2993149930327L722.5675067506751,257.05616956513865L723.0859585958596,258.56354852324034L724.5549054905491,259.4078088178081L724.1228622862286,261.64670742361136L723.5180018001801,263.82195549278606L722.2218721872188,264.05240268620287L720.4072907290729,266.986323761773L718.506300630063,270.5240633228766L716.2596759675966,273.66559807920237L712.9761476147614,276.11312675188935L709.606210621062,278.32308901665897L706.9275427542755,278.587353426699L705.458595859586,279.7741385081002L704.594509450945,278.8954147342147L703.2983798379838,280.21270356471524L699.9284428442844,281.48159476641683L697.4225922592259,281.8745111071338L696.558505850585,284.6136667290999L695.2623762376238,284.74362339032353L694.5711071107112,282.87677963901945L695.1759675967597,281.9181431465939L691.9788478847885,281.08826548878324L690.8555355535555,281.48159476641683L688.4360936093609,280.82581475650017L687.2263726372637,279.7741385081002L687.6584158415842,278.27902585043034L685.4117911791179,277.7939688285213L684.2884788478848,276.82184118133875L682.2146714671467,278.1908831015543L679.8816381638163,278.4992870815444L677.9806480648065,278.4992870815444L676.6845184518452,279.11529648697467L675.4747974797481,279.510745635121L675.8204320432044,282.4849020929044L674.5243024302431,282.3977635008181L674.3514851485149,281.7872318640726L674.2650765076507,280.7382898463729L672.5369036903691,281.48159476641683L671.5,281.00080253740884L669.6854185418541,280.0373407569689L670.3766876687669,277.8822105608749L668.8213321332133,277.35242765804594L668.3028802880289,274.95832798106153L665.7106210621062,275.40294569168566L666.0562556255625,272.2781047007171L668.3028802880289,270.0275820601293L668.3892889288929,267.85183097496935L668.3028802880289,265.7521073008528L667.2659765976598,265.1101277294084L666.488298829883,263.49902214735056L665.1057605760576,263.7297254770336L662.513501350135,263.31432710778085L663.2911791179117,262.157290898293L662.1678667866787,260.482849939953L660.4396939693969,261.6002451860995L658.452295229523,260.9489706292379L655.6872187218721,262.66696166380046L653.52700270027,264.69668908223446L651.5396039603961,265.06421872855356L650.502700270027,264.3286991423005L649.2929792979298,264.2826678754727L647.564806480648,263.63746616321293L646.2686768676867,264.3286991423005L644.6269126912691,266.34699369601685L644.454095409541,264.1905835897123L642.9851485148515,264.7886145211277L640.2200720072008,264.51275184951135L637.45499549955,263.8680595297587L635.5540054005401,262.66696166380046L633.6530153015301,262.157290898293L632.8753375337533,260.8092157167879L631.492799279928,260.4361951907736L629.0733573357336,258.61051999215397L627.1723672367236,257.7637951576312L626.1354635463547,258.4225857448806L622.8519351935194,256.48872892556545L620.4324932493249,254.73148413152495L619.8276327632763,251.61559337467162L621.5558055805582,251.95296445891069L621.6422142214221,250.50392937739107L620.6053105310532,249.04653004064585L620.8645364536453,246.6967600079055L618.2722772277227,243.27867940783585L614.3838883888388,242.07819810189355L613.6926192619262,239.7599055987588L611.8780378037804,238.38824483973042L611.4459945994599,237.52035575870585L611.1003600360036,235.77450625231603L611.1867686768677,234.5857166161699L609.7178217821782,233.91096210165557L608.9401440144015,234.2226433713703L608.3352835283529,231.34884197139766L609.0265526552655,230.66399780534675L608.6809180918092,229.92403083647056L610.9275427542755,228.43637901049277L612.6557155715572,227.79561530898147L615.1615661566157,228.22300628834452L616.1120612061206,226.18514134153347L619.1363636363636,225.80757888761468L620.0004500450045,224.56217871242924L623.8024302430243,222.81688725827823L624.1480648064806,222.10360556423382L623.9752475247525,220.22620396347816L625.6170117011702,219.39236845879068L623.456795679568,213.57041454175823L628.2092709270926,212.18867200081195L629.4189918991899,211.43608984347202L631.1471647164716,205.1863674527563L635.8996399639964,206.3814721168209L637.1957695769577,204.76627196833377L637.3685868586858,201.18720406928364L639.3559855985599,200.81931315665636L641.1705670567057,198.4098160266351L642.1210621062106,198.09858804680016L642.7259225922593,200.6350907325153L644.7133213321333,202.59067773398576L648.1696669666967,203.92323188332202L649.8114311431144,206.73852538817283L648.9473447344735,210.85517392502516L649.8114311431144,212.30419408285155L652.6629162916292,212.8807730169119L655.8600360036003,213.34080569683266L658.7115211521152,215.4544582594538L660.2668766876687,215.85178828224014L661.3037803780379,218.8904026009599L662.7727272727273,220.83550154574561L665.3649864986498,220.78018659295853L670.3766876687669,221.49810730371934L673.4873987398739,221.05661053855752L675.9068406840685,221.55322703787675L679.4495949594959,223.5276959505081L682.3874887488748,223.5276959505081L683.424392439244,224.5078611125041L686.1894689468947,222.76210758741297L690.0778577857786,221.6634217406686L693.7070207020702,221.55322703787675L696.4720972097209,220.39255816674108L698.2002700270027,218.61098869081326L699.9284428442844,217.48940882322177L699.496399639964,216.41801720216205L698.7187218721872,215.1132497174353L700.0148514851486,212.9383367216942L701.3109810981098,213.22589958123842L703.8168316831683,213.91432114098706L706.2362736273628,212.130885073413L709.8654365436544,210.79698567997087L711.5936093609362,208.51373040012103L713.3217821782177,207.5098279435517L716.7781278127813,207.0355535251789L718.6791179117912,207.45060873365776L718.9383438343834,206.20269097005612L716.7781278127813,203.74208256703542L714.8771377137714,202.59067773398576L712.9761476147614,203.92323188332202L710.6431143114312,203.31871244433887L709.2605760576057,203.8024852924284L708.655715571557,202.3473613614042L710.3838883888388,198.72051156280753L711.507200720072,195.90487102356238L714.445094509451,197.3494534761862L717.8150315031503,194.9564640802955L717.7286228622863,193.30055764813022L719.9752475247525,189.28836433998674L721.2713771377138,188.0402809491433L721.2713771377138,185.85110116197947L719.8888388838884,184.9139496067136L721.8762376237623,182.95636327010317L724.9005400540054,182.2079582513111L728.0976597659767,182.07153267704655L731.640414041404,183.29547105711728L733.8006300630063,184.77965518838667L735.2695769576958,188.69827640282813L736.1336633663366,190.39758995502177L736.9977497749776,192.7237559569143L737.8618361836184,196.4086486430101L742.0958595859587,197.59950952683076L744.8609360936093,200.20451677231728L745.8978397839784,203.56075645455982L749.52700270027,203.56075645455982L751.6008100810081,202.16466346682822L755.575607560756,201.12594008049876L754.2794779477947,204.3452288099114L753.3289828982898,205.60552130820957L752.5513051305131,209.45375633448378L750.9095409540953,212.82319223252546L748.0580558055806,212.18867200081195L745.9842484248425,213.39823330882354L746.5891089108911,216.30490123686508L746.2434743474347,220.17072210112838L745.0337533753376,220.28167058639386Z"
                        className="datamaps-subunit CHN"
                        data-info='{"active":{"value":"10,101","percent":"13.7","isGrown":true},"new":{"value":"509","percent":"0.1","isGrown":false},"fillKey":"MAJOR","short":"cn"}'
                        style={{
                          fill: 'rgb(79, 70, 229)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgb(79, 70, 229)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M601.7682268226822,222.3782391077354L600.4720972097209,222.9264027136926L597.2749774977498,225.21288297000444L596.2380738073807,227.47450434078058L595.2875787578758,227.47450434078058L594.6827182718272,225.96947488161462L591.57200720072,225.86155816170253L591.1399639963997,223.25459889450934L589.9302430243024,223.25459889450934L590.1030603060306,219.94864199275256L587.2515751575158,217.54563798127873L583.1039603960396,217.826545703045L580.3388838883889,218.27517610908632L578.0058505850585,215.28392804570342L576.1048604860487,214.02882204007753L572.3892889288929,211.55206296176797L571.8708370837085,211.2619991486097L565.7358235823583,213.28336112598296L565.8222322232224,225.42933245756075L564.6125112511252,225.59152208534493L562.8843384338434,223.09056636972855L561.3289828982898,222.15856181760955L558.5639063906391,222.81688725827823L557.52700270027,223.90942442532793L557.3541854185419,223.1452584314175L557.9590459045904,221.77355684195598L557.52700270027,220.6141510344711L554.7619261926193,219.50374625079763L553.6386138613861,216.53106848566486L552.3424842484249,215.68160215230455L552.2560756075608,214.6003221210255L554.5891089108911,214.94242288282865L554.6755175517552,212.41964723679575L556.6629162916292,211.89956442920467L558.8231323132313,212.41964723679575L559.2551755175517,209.04306602586445L558.8231323132313,206.91679843593926L556.4036903690369,207.0355535251789L554.3298829882989,206.20269097005612L551.564806480648,207.74651947729683L549.3181818181818,208.45482422620682L548.1084608460847,207.92384402521225L548.3676867686769,206.08340896083368L546.8123312331234,203.74208256703542L545.0841584158416,203.86286839185172L543.0103510351036,201.4320560037886L544.3928892889289,198.6584149311214L543.7016201620162,197.91159464262796L545.6026102610261,193.8117055915315L548.1084608460847,195.96792041940682L548.3676867686769,193.23656087644645L553.3793879387938,189.09188909145388L557.0949594959495,188.96078312490587L562.3658865886589,191.62910058349624L565.2173717371737,193.17254108029948L567.8096309630963,191.56449789869453L571.6116111611161,191.49987160392146L574.6359135913591,193.42848220662862L575.3271827182718,192.3381783808509L578.6971197119711,192.46679734886973L579.3019801980198,190.65757080112292L575.4135913591359,188.0402809491433L577.7466246624663,186.1179298013777L577.3145814581459,185.0481397027937L579.561206120612,184.03916174647378L577.8330333033304,181.25068585439408L578.9563456345635,179.87376938798988L587.9428442844285,178.41589916065436L589.0661566156616,177.43696350688433L595.1147614761477,175.8870596735955L597.2749774977498,174.1797770576441L601.595409540954,175.03559341527992L602.3730873087309,179.3198668409216L604.8789378937894,178.34616290360157L607.9032403240324,179.7354630164375L607.7304230423042,181.9349982646004L610.0634563456346,181.72999208955326L616.0256525652566,177.85720215219297L615.1615661566157,179.18110831934936L618.1858685868588,182.34427520833L623.543204320432,192.27383390210363L624.8393339333934,190.26745546447327L628.2092709270926,192.46679734886973L631.5792079207921,191.43522167626907L632.9617461746175,192.14507484232848L634.0850585058506,194.32139264703167L635.8132313231323,195.08320844257904L636.7637263726374,196.66000996426268L639.8744374437445,196.15693610788995L641.1705670567057,198.4098160266351L639.3559855985599,200.81931315665636L637.3685868586858,201.18720406928364L637.1957695769577,204.76627196833377L635.8996399639964,206.3814721168209L631.1471647164716,205.1863674527563L629.4189918991899,211.43608984347202L628.2092709270926,212.18867200081195L623.456795679568,213.57041454175823L625.6170117011702,219.39236845879068L623.9752475247525,220.22620396347816L624.1480648064806,222.10360556423382L622.6791179117912,221.60833184589683L621.469396939694,220.44797915054784L617.8402340234024,220.11522498612277L613.8654365436544,220.0041849451904L613.0013501350135,220.33712198308336L609.6314131413142,219.0020591462873L608.2488748874888,219.6706973793992L607.9032403240324,221.60833184589683L603.9284428442844,220.44797915054784L602.3730873087309,220.94608617971846Z"
                        className="datamaps-subunit KAZ"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M500.15166516651664,102.22494747933351L499.8060306030603,106.92578933754027L503.4351935193519,111.16100955566156L501.1885688568857,115.90242527803471L504.0400540054005,122.69459803733355L502.3982898289829,127.66696311076589L504.5585058505851,131.73634608360481L503.6080108010801,135.33567306188502L507.15076507650764,138.9417050136512L506.2002700270027,141.6795898958228L504.0400540054005,144.62793771916705L498.85553555355534,150.94156345058235L494.53510351035106,151.35360048154402L490.3010801080108,153.07253602425138L486.4126912691269,154.1273779665349L485.0301530153015,151.51811506750954L482.6971197119712,149.8652083485807L483.2155715571557,144.97116286566657L482.0058505850585,140.3608495785834L483.2155715571557,137.23936072790164L485.3757875787579,133.86924326697212L490.81953195319534,127.85867034189619L492.46129612961295,126.70477708272244L492.2020702070207,124.27222979257652L488.8321332133213,121.50044620130856L488.05445544554453,119.18481716501225L487.96804680468045,109.65455160915099L484.2524752475247,105.2640501024834L481.05535553555353,101.99731565110304L482.52430243024304,100.1634687538521L485.1165616561657,103.80859539613601L488.3136813681368,103.47067204937625L490.9059405940594,105.04106606382928L493.1525652565257,102.11117556481904L494.3622862286229,97.01596333710182L498.0778577857786,94.64009879011499L501.1021602160216,97.48654441743284Z"
                        className="datamaps-subunit FIN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M457.98424842484246,158.7503874794753L459.0211521152116,156.05659642530702L461.0085508550855,152.82811246882906L461.78622862286227,147.01483813330282L460.3172817281728,144.5420133792097L460.14446444644466,137.59931373138457L461.6998199819982,132.5745037594359L464.03285328532854,132.66734932717293L464.8969396939694,130.4233304242646L464.03285328532854,128.52774640847545L467.74842484248427,120.39742175078939L470.1678667866787,113.60324038324165L471.72322232223223,109.11280391084321L474.0562556255626,109.22131186509304L474.6611161116112,105.59789615859665L479.24077407740776,106.59493245629673L479.5864086408641,102.22494747933351L481.05535553555353,101.99731565110304L484.2524752475247,105.2640501024834L487.96804680468045,109.65455160915099L488.05445544554453,119.18481716501225L488.8321332133213,121.50044620130856L484.77092709270926,123.18938213903996L482.43789378937896,127.18663298108413L482.7835283528353,130.61159751557585L478.9815481548155,135.0617828723692L474.3154815481548,139.5641834467814L472.5873087308731,146.8455471758586L474.3154815481548,150.28006039302053L476.56210621062104,152.9911033419013L474.40189018901896,158.35706989618083L471.8960396039604,159.45594217909368L470.94554455445547,167.02050975547152L469.6494149414941,171.07652102896424L466.71152115211527,170.63886130741355L465.32898289828984,174.0367141857193L462.5639063906391,174.25126258609936L461.78622862286227,170.20004090002067L459.79882988298834,165.21872741419523Z"
                        className="datamaps-subunit SWE"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M776.2272727272726,192.65955116476732L778.6467146714672,199.27842972213284L775.1039603960396,198.09858804680016L773.6350135013502,203.31871244433887L775.9680468046805,206.97618533016657L775.8816381638163,209.39514043065594L774.0670567056704,207.27283965179765L772.511701170117,209.9804912462863L772.0796579657966,207.0355535251789L772.3388838883889,203.62121816617017L772.0796579657966,199.7111882147185L772.5981098109811,196.91102140042665L772.7709270927093,191.8872756801371L771.3019801980199,188.10619209672868L771.561206120612,182.75257657623843L773.7214221422141,180.83877807739805L772.7709270927093,178.97275742386273L773.8942394239423,178.41589916065436L774.499099909991,181.1134937391507L775.363186318632,184.98105768197576L775.2767776777678,188.82957895972652ZM486.0670567056706,178.55528551397697L481.6602160216022,178.62493566968908L478.72232223222323,178.1367814533438L479.24077407740776,176.31117861246875L482.52430243024304,174.96444229485041L485.0301530153015,175.67459792920863L486.1534653465347,176.3817611728889L485.89423942394245,177.5070759818769ZM-0.49999999999994316,102.90573912525576L5.375787578757922,107.91394432109536L11.683618361836182,114.23381237771585L11.424392439244002,118.06458937379628L13.066156615661612,119.59010764049665L12.547704770477083,115.17470057584575L19.0283528352835,116.00609721821178L23.78082808280834,121.70013018788524L21.36138613861391,124.27222979257652L17.38658865886589,124.85961817895404L17.38658865886589,130.32910960356827L16.436093609360967,131.54946268093758L14.189468946894692,131.36235024071556L12.288478847884846,129.38368210983484L9.177767776777728,127.76284698562742L8.57290729072912,125.2499464005038L6.153465346534688,124.3702865399388L3.474797479747963,125.05490821260955L2.0922592259225894,123.09055509485802L2.6107110711071186,120.89979953322779L-0.2407740774077638,122.29759825358528L0.8825382538254303,125.05490821260955L-0.49999999999994316,127.47501346561134ZM863.5,87.35357249231086L863.499568,89.89297627843101L860.9077407740774,90.26367794786566L860.475697569757,87.8997917875736L863.5,84.8582191296691L863.5,87.35357249231086ZM-0.49999999999994316,84.8582191296691L-0.4995679999999538,84.85779365646746L-0.49999999999994316,84.85779365646746L-0.49999999999994316,87.35357249231086L-0.49999999999994316,84.8582191296691ZM-0.49999999999994316,84.85779365646746L-0.15436543654362822,84.47302012194604L1.83303330333041,84.47302012194604L5.289378937893844,86.64002966019768L5.116561656165629,87.6487117122511L2.6107110711071186,89.39723440365054L-0.49999999999994316,89.89297627843101ZM776.1408640864087,71.30483685270832L772.511701170117,71.44547033079346L767.5864086408642,70.45813147096237L767.1543654365437,70.03289875190751L769.4873987398739,66.73020866938424L772.4252925292529,65.85597033798092L775.8816381638163,69.17863426207384ZM793.2497749774977,54.92531096481713L790.484698469847,58.50890711573891L786.6827182718273,57.7374963766207L782.1894689468947,54.13418730923979L782.7943294329434,50.92492898194155L787.2011701170118,52.378068774327346ZM779.6836183618362,50.27428656090939L777.7826282628263,57.27263775250236L768.9689468946895,57.117347241974926L764.9941494149415,59.276166366306086L760.2416741674167,53.17899419632067L761.537803780378,46.64143677727503L764.7349234923493,44.78950128071148L771.0427542754276,45.128022286887926ZM569.6242124212422,90.7564835487866L568.1552655265527,91.37015564282055L560.2920792079208,90.38703575378364L559.6872187218722,87.14524623946826L555.3667866786678,85.11374323616369L555.0211521152115,80.96327165134028L557.440594059406,79.24252744188917L557.3541854185419,74.91732006623096L562.1066606660667,67.88762074391292L559.9464446444645,66.87539758004675L565.6494149414941,59.12304441145642L565.0445544554456,54.92531096481713L570.4018901890189,49.947843928078726L578.2650765076507,43.59826466433884L586.3010801080108,41.70582892382953L590.448694869487,37.84324765875374L595.1147614761477,36.41207210466666L596.7565256525653,40.48823605752807L595.1147614761477,43.76905613496268L586.6467146714672,48.634513756226625L579.3019801980198,53.17899419632067L571.8708370837085,62.00463036272953L568.2416741674167,70.31652716251199L564.526102610261,78.17332601472697L564.9581458145815,84.60139147082123ZM863.5,127.47535017383447L860.3892889288929,129.95164261287022L857.2785778577858,129.57323781268514L859.438793879388,132.4816017843505L860.9077407740774,136.96884301857588L862.0310531053105,138.40614876700386L862.2902790279027,140.53733117064297L861.6854185418542,141.94199811799896L857.1921692169217,140.80167720759556L850.4522952295229,144.62793771916705L848.2920792079208,145.22808756138275L844.6629162916292,148.7814535187021L841.2065706570658,151.7645665686366L840.2560756075609,153.965549690451L836.8861386138615,150.61115838012927L830.578307830783,154.3698120508261L829.5414041404141,152.5833116356258L827.2083708370837,154.69248399396577L824.0112511251125,154.04648441640708L823.2335733573357,157.0919332523111L820.382088208821,161.63144555693657L820.4684968496849,163.47314554575206L823.1471647164716,164.4620772876646L822.8015301530153,170.8578357841184L820.6413141314131,171.00365802645854L819.6044104410441,174.53689940530018L820.5549054905491,176.3817611728889L816.4072907290729,178.48560668753217L815.543204320432,183.0920867546629L812.0004500450045,184.1066109182031L811.2227722772277,188.10619209672868L807.7664266426642,191.6936796812061L806.9023402340234,189.02634837096042L805.8654365436544,183.29547105711728L804.5693069306931,174.1797770576441L805.6926192619262,168.21078130379325L807.6800180018001,165.595740181191L807.8528352835283,163.47314554575206L811.568406840684,162.4781566117464L815.8888388838884,156.61491846188594L819.9500450045005,151.7645665686366L824.2704770477048,147.77439406787843L826.2578757875788,140.62549663165396L823.3199819981999,141.06557317460832L821.8510351035104,145.3136353150068L815.8024302430243,150.7764473197942L813.8150315031503,144.62793771916705L807.5936093609361,146.336574049487L801.6314131413142,154.5312297893944L803.6188118811881,157.40915504598962L798.2614761476148,158.67180098730142L794.545904590459,159.14274447956856L794.7187218721872,155.73667680202476L791.0031503150315,155.01450334864876L787.9788478847885,157.32990849571965L780.6341134113411,156.53527749284393L772.7709270927093,157.96278615221473L764.9941494149415,166.79636908768475L755.8348334833483,176.87501171410923L759.5504050405041,177.43696350688433L760.7601260126013,180.0119633025049L763.0931593159316,180.90749849234447L764.6485148514852,178.83371440880947L767.2407740774077,179.11168646526593L770.6971197119713,183.5662762031185L770.7835283528352,186.91596309351337L768.9689468946895,190.78741753056084L768.7097209720971,195.33642861416087L767.6728172817282,201.18720406928364L764.0436543654366,206.3814721168209L763.2659765976598,208.80798762835374L759.9824482448245,212.82319223252546L756.6989198919892,216.70052438045127L755.1435643564357,218.66690267533332L751.9464446444645,220.55877557126573L750.477497749775,220.6141510344711L749.0085508550856,219.0020591462873L745.7250225022502,221.442972630523L745.3793879387939,222.4879892969014L745.0337533753376,221.9386479659898L745.0337533753376,220.28167058639386L746.2434743474347,220.17072210112838L746.5891089108911,216.30490123686508L745.9842484248425,213.39823330882354L748.0580558055806,212.18867200081195L750.9095409540953,212.82319223252546L752.5513051305131,209.45375633448378L753.3289828982898,205.60552130820957L754.2794779477947,204.3452288099114L755.575607560756,201.12594008049876L751.6008100810081,202.16466346682822L749.52700270027,203.56075645455982L745.8978397839784,203.56075645455982L744.8609360936093,200.20451677231728L742.0958595859587,197.59950952683076L737.8618361836184,196.4086486430101L736.9977497749776,192.7237559569143L736.1336633663366,190.39758995502177L735.2695769576958,188.69827640282813L733.8006300630063,184.77965518838667L731.640414041404,183.29547105711728L728.0976597659767,182.07153267704655L724.9005400540054,182.2079582513111L721.8762376237623,182.95636327010317L719.8888388838884,184.9139496067136L721.2713771377138,185.85110116197947L721.2713771377138,188.0402809491433L719.9752475247525,189.28836433998674L717.7286228622863,193.30055764813022L717.8150315031503,194.9564640802955L714.445094509451,197.3494534761862L711.507200720072,195.90487102356238L708.655715571557,196.2198972408838L707.4459945994599,194.9564640802955L705.9770477047705,194.57569183296442L702.4342934293429,197.2242956834936L699.3235823582359,197.7868251138115L697.0769576957696,198.72051156280753L694.0526552655265,198.09858804680016L691.8060306030603,198.16087635849604L690.423492349235,196.28283636048786L688.0040504050405,194.44858745717025L685.67101710171,194.0030088334122L682.560306030603,194.44858745717025L680.3136813681368,195.14654702258565L676.9437443744374,193.556314932557L676.4252925292529,190.72250612088013L673.6602160216021,189.74595266776618L671.413591359136,189.28836433998674L668.7349234923493,187.71035136624752L666.3154815481548,191.6936796812061L667.2659765976598,193.93926387588618L664.9329432943294,196.5343731221679L661.4765976597661,195.58929185082798L659.0571557155715,195.4629047643903L657.4153915391539,193.68405600223292L654.9095409540953,193.62019691342388L652.8357335733574,192.46679734886973L649.2065706570658,194.2577612749597L644.6269126912691,197.47452470287533L642.1210621062106,198.09858804680016L641.1705670567057,198.4098160266351L639.8744374437445,196.15693610788995L636.7637263726374,196.66000996426268L635.8132313231323,195.08320844257904L634.0850585058506,194.32139264703167L632.9617461746175,192.14507484232848L631.5792079207921,191.43522167626907L628.2092709270926,192.46679734886973L624.8393339333934,190.26745546447327L623.543204320432,192.27383390210363L618.1858685868588,182.34427520833L615.1615661566157,179.18110831934936L616.0256525652566,177.85720215219297L610.0634563456346,181.72999208955326L607.7304230423042,181.9349982646004L607.9032403240324,179.7354630164375L604.8789378937894,178.34616290360157L602.3730873087309,179.3198668409216L601.595409540954,175.03559341527992L597.2749774977498,174.1797770576441L595.1147614761477,175.8870596735955L589.0661566156616,177.43696350688433L587.9428442844285,178.41589916065436L578.9563456345635,179.87376938798988L577.8330333033304,181.25068585439408L579.561206120612,184.03916174647378L577.3145814581459,185.0481397027937L577.7466246624663,186.1179298013777L575.4135913591359,188.0402809491433L579.3019801980198,190.65757080112292L578.6971197119711,192.46679734886973L575.3271827182718,192.3381783808509L574.6359135913591,193.42848220662862L571.6116111611161,191.49987160392146L567.8096309630963,191.56449789869453L565.2173717371737,193.17254108029948L562.3658865886589,191.62910058349624L557.0949594959495,188.96078312490587L553.3793879387938,189.09188909145388L548.3676867686769,193.23656087644645L548.1084608460847,195.96792041940682L545.6026102610261,193.8117055915315L543.7016201620162,197.91159464262796L544.3928892889289,198.6584149311214L543.0103510351036,201.4320560037886L545.0841584158416,203.86286839185172L546.8123312331234,203.74208256703542L548.3676867686769,206.08340896083368L548.1084608460847,207.92384402521225L549.3181818181818,208.45482422620682L548.2812781278128,210.50577959598039L545.9482448244825,211.08775085823763L543.528802880288,214.6003221210255L545.6890189018902,217.77039585496163L545.5162016201621,220.0041849451904L548.1084608460847,223.85493503551055L546.6395139513952,225.10457373083807L546.2938793879388,225.91552348906498L545.1705670567057,225.69957845155324L543.528802880288,223.74591305596806L542.8375337533754,223.6368333940317L541.368586858686,222.9264027136926L540.5909090909091,221.60833184589683L538.4306930693069,220.89080140364553L536.9617461746175,221.38782300537295L536.529702970297,220.78018659295853L533.2461746174617,219.22518594324208L529.7034203420342,218.72280104501982L527.7160216021603,218.16311304457287L527.3703870387039,218.49911382282218L524.3460846084608,215.73834719923872L521.5810081008101,214.42904740387854L519.507200720072,212.4773480040127L521.2353735373538,211.89956442920467L523.2227722772277,209.04306602586445L521.9266426642664,207.6282107380623L525.469396939694,206.20269097005612L525.3829882988299,205.42599885737494L523.2227722772277,206.02373953113874L523.3091809180918,204.46562391102202L524.518901890189,203.4397739184806L526.8519351935194,203.19757188673648L527.2839783978397,201.98178448794098L526.6791179117912,199.95801893220224L527.7160216021603,198.09858804680016L527.6296129612962,196.9737197450178L524.0868586858686,195.77870585634722L522.7043204320432,195.84179950955343L521.2353735373538,194.06673103029038L519.4207920792079,194.63921016200442L516.3964896489649,193.3645314174878L516.3964896489649,192.59532314766125L515.532403240324,190.91716871271413L513.6314131413142,190.72250612088013L513.4585958595859,189.5499894361011L514.0634563456346,188.76393999232982L512.508100810081,186.58389468654332L510.0022502250225,186.91596309351337L509.31098109810983,186.71679818728148L508.7061206120612,187.64429050826692L507.75562556255625,187.44595760673127L507.2371737173717,184.98105768197576L506.63231323132317,183.6339108970224L507.06435643564356,183.29547105711728L509.0517551755176,183.43092695796432L510.0022502250225,182.54854746833615L509.31098109810983,181.45626751637045L507.66921692169217,180.7700299489325L507.8420342034203,180.0119633025049L506.8051305130513,179.25050176813875L505.3361836183619,176.52283749107943L505.8546354635464,175.39089652644353L505.5954095409541,173.4632337235406L503.26237623762376,172.45487089233887L501.96624662466246,172.95981554235448L501.6206120612061,171.87590744308633L499.11476147614763,170.78487647501893L498.33708370837087,168.21078130379325L498.1642664266427,166.12210023616785L496.9545454545455,165.0676780737706L497.9914491449145,163.6256809293397L497.3001800180018,159.37769990307382L499.02835283528356,156.69451978115663L498.6827182718272,155.89671675537193L501.3613861386139,153.23527613062217L498.85553555355534,150.94156345058235L504.0400540054005,144.62793771916705L506.2002700270027,141.6795898958228L507.15076507650764,138.9417050136512L503.6080108010801,135.33567306188502L504.5585058505851,131.73634608360481L502.3982898289829,127.66696311076589L504.0400540054005,122.69459803733355L501.1885688568857,115.90242527803471L503.4351935193519,111.16100955566156L499.8060306030603,106.92578933754027L500.15166516651664,102.22494747933351L502.0526552655266,101.65520645108609L506.11386138613864,98.88929153577837L508.61971197119715,96.54386571374357L512.5945094509451,100.62407917843029L519.1615661566157,102.22494747933351L528.2344734473447,109.65455160915099L530.0490549054905,112.65235124958517L530.2218721872187,116.83289503523793L527.5432043204321,119.9943070289809L523.6548154815482,121.50044620130856L512.9401440144014,117.03888240877046L511.1255625562556,117.75761419487577L515.0139513951394,122.09870544644716L515.1867686768677,124.85961817895404L515.3595859585959,130.61159751557585L518.470297029703,132.2956283051853L520.3712871287129,133.68494947449162L520.6305130513051,131.08125076146936L519.1615661566157,128.62308865089773L520.7169216921692,126.51160509661162L526.506300630063,130.04609707786514L528.580108010801,128.62308865089773L526.9383438343834,124.46827969300094L532.554905490549,118.67665985920965L534.7151215121512,119.08332330616975L536.9617461746175,121.10028165133346L538.3442844284428,117.03888240877046L536.3568856885688,113.39245557575583L537.5666066606661,109.54636023391643L535.7520252025203,105.59789615859665L542.491899189919,107.58529173646741L543.8744374437443,111.26803135407317L540.8501350135014,112.01503467470823L540.8501350135014,115.48701678368161L542.7511251125113,117.55261404138665L546.4666966696669,116.21322564095416L547.0715571557156,112.22777693341473L552.0832583258326,109.22131186509304L560.4648964896489,103.69604031688769L562.1930693069307,104.03344815059697L559.8600360036004,107.91394432109536L562.8843384338434,108.67797625114179L564.526102610261,106.37394927136842L569.0193519351935,106.2633337010464L572.6485148514852,103.47067204937625L575.3271827182718,107.47557855136589L578.0922592259226,103.13197225045968L575.5864086408641,99.12178413928535L576.7961296129613,96.89808151434988L583.8816381638164,99.00558387473714L587.2515751575158,101.08325075265583L595.8924392439244,108.67797625114179L597.534203420342,105.2640501024834L595.1147614761477,101.76933124095805L595.0283528352836,100.27875678068375L592.0904590459046,99.5856675638093L592.9545454545455,96.30724493071665L591.6584158415842,90.7564835487866L591.57200720072,88.40065454872118L595.9788478847885,81.61967953828972L597.534203420342,74.36742477857928L599.3487848784878,72.84428565579111L605.7430243024303,74.91732006623096L606.1750675067507,79.37562253581532L603.9284428442844,85.62429130500988L605.3973897389739,88.02516935547044L606.1750675067507,93.07482286591505L605.6566156615662,102.5657366842442L608.3352835283529,106.59493245629673L607.2983798379838,110.94673448038645L602.545904590459,119.69125952529154L605.3109810981098,120.49803169925082L606.2614761476148,118.37093699514227L608.9401440144015,116.83289503523793L609.5450045004501,113.81372751148439L611.6188118811881,110.73214996190384L610.2362736273627,107.14595020389925L611.3595859585959,102.79249215574663L608.6809180918092,102.22494747933351L608.1624662466247,98.4231983060663L610.0634563456346,91.37015564282055L606.9527452745274,85.36924189403595L611.2731773177318,80.17162770597562L610.6683168316831,74.50509568141615L611.8780378037804,74.22962204915558L613.1741674167416,78.70891674486143L612.2236723672368,86.1330490403715L614.7295229522953,87.52300880819757L613.6926192619262,82.01209906472877L617.6674167416743,78.9759686355373L622.6791179117912,78.5752052929609L627.0859585958596,83.05337814467993L624.9257425742574,76.5545176988901L624.7529252925292,67.74345448224187L628.9005400540054,66.00204792351968L634.6899189918992,66.29375671334054L639.8744374437445,65.2701646512092L637.8870387038704,60.64691793964789L640.7385238523852,54.609389169807L643.4171917191719,54.29276435917882L648.0832583258325,49.620648934698636L654.477497749775,48.3042731572657L655.2551755175518,45.63429186776841L661.56300630063,44.61993690029527L663.5504050405041,46.97556770751652L668.9077407740774,41.532527556050354L673.3145814581458,41.70582892382953L674.0058505850584,37.30825529512572L676.2524752475248,32.76931573850999L681.9554455445544,28.07935428495199L686.1030603060306,31.657882585203026L682.8195319531953,34.42020705565261L688.2632763276328,36.05199975791999L688.8681368136813,41.1852865099537L691.0283528352836,38.73042298696788L698.1138613861385,38.90719144927493L703.471197119712,43.93964182140621L705.458595859586,47.641476524448024L704.8537353735373,52.53861527685086L702.1750675067508,55.39788255123415L695.8672367236724,60.495260856981076L694.0526552655265,63.05177778944369L697.0769576957696,64.23919819262431L700.6197119711971,66.43938854853667L702.7799279927993,64.82923131547L703.9896489648964,70.31652716251199L705.0265526552655,68.17551896740838L708.8285328532852,66.73020866938424L716.6053105310532,68.17551896740838L717.1237623762377,72.14657999700836L727.1471647164716,73.40002243297448L727.3199819981998,66.87539758004675L732.4180918091809,68.4628401424111L736.2200720072008,68.3192515350915L740.1084608460847,72.84428565579111L741.2317731773177,77.90478329965237L739.7628262826283,81.22619246991087L742.7871287128712,87.27127627172709L746.5891089108911,90.26367794786566L748.9221422142216,82.4034571326967L752.7241224122413,85.75164806382554L756.8717371737174,83.70039501642853L761.4513951395139,86.00602672497931L763.2659765976598,83.95839471979716L767.1543654365437,84.98582491658496L765.4261926192619,77.77032425132091L768.6233123312331,74.36742477857928L790.3118811881188,79.50859507414287L792.3856885688568,84.08722249877451L798.6071107110711,89.76919900881015L808.2848784878488,88.40065454872118L813.1237623762377,89.64531640007687L815.1111611161117,92.58980426468537L814.7655265526552,97.83849123548279L817.7898289828984,99.70140978577146L820.9869486948696,98.30644324431648L825.2209720972098,98.18959516512626L829.7142214221423,99.46983404264645L834.2938793879388,98.77290696621208L838.527902790279,104.70595726686062L841.465796579658,102.5657366842442L839.4783978397841,98.30644324431648L840.6017101710172,95.1183683539723L848.2056705670568,97.1337503764262L853.2173717371737,96.66203286626069L860.1300630063006,100.04809019351964L863.5,102.90536428702057L863.5,127.47535017383447ZM-0.49999999999994316,102.90536428702057L-0.4995679999999538,102.90573912525576L-0.49999999999994316,127.47501346561134L-0.49999999999994316,127.47501346561134L-0.49999999999994316,127.47535017383447L-0.49999999999994316,102.90536428702057ZM683.6836183618362,21.038745762906615L670.1174617461746,25.577392567312245L674.5243024302431,9.767860756727146L676.511701170117,8.23812145427496L678.3262826282628,9.114304581553768L684.3748874887489,16.140962573700165ZM554.2434743474348,-8.304578019269343L551.0463546354636,-6.339560943422214L548.8861386138615,-5.367339435195049L548.540504050405,-2.9660226373887326L545.6890189018902,-0.6053267670230298L543.0967596759676,-3.921595656569707L544.479297929793,-8.552164000437187L539.1219621962197,-9.048659141916119L543.7880288028803,-11.558018634970779L547.503600360036,-11.811458190092367L547.9356435643564,-7.810721317822754L549.3181818181818,-11.305039297064582L551.564806480648,-13.85574840431292L555.1939693969397,-10.548845729096058ZM671.3271827182718,14.048640740920575L666.1426642664267,15.724989041685944L659.4027902790278,12.138463909159668L655.42799279928,7.135120042323024L653.6134113411341,-2.4906786898123983L650.3298829882989,-5.367339435195049L656.5513051305131,-15.408904000346126L661.7358235823582,-19.10178233996811L666.4018901890188,-11.305039297064582L671.9320432043205,2.4050963733646427Z"
                        className="datamaps-subunit RUS"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M506.11386138613864,98.88929153577837L502.0526552655266,101.65520645108609L500.15166516651664,102.22494747933351L501.1021602160216,97.48654441743284L498.0778577857786,94.64009879011499L494.3622862286229,97.01596333710182L493.1525652565257,102.11117556481904L490.9059405940594,105.04106606382928L488.3136813681368,103.47067204937625L485.1165616561657,103.80859539613601L482.52430243024304,100.1634687538521L481.05535553555353,101.99731565110304L479.5864086408641,102.22494747933351L479.24077407740776,106.59493245629673L474.6611161116112,105.59789615859665L474.0562556255626,109.22131186509304L471.72322232223223,109.11280391084321L470.1678667866787,113.60324038324165L467.74842484248427,120.39742175078939L464.03285328532854,128.52774640847545L464.8969396939694,130.4233304242646L464.03285328532854,132.66734932717293L461.6998199819982,132.5745037594359L460.14446444644466,137.59931373138457L460.3172817281728,144.5420133792097L461.78622862286227,147.01483813330282L461.0085508550855,152.82811246882906L459.0211521152116,156.05659642530702L457.98424842484246,158.7503874794753L456.34248424842485,155.89671675537193L451.5900090009001,161.32244873840847L448.3928892889289,162.32453809096788L445.1093609360936,160.00257582550321L444.24527452745275,155.01450334864876L443.467596759676,143.59370798680075L445.7142214221422,140.272533317593L452.0220522052205,135.88199268320187L456.7745274527453,130.2348304925676L461.18136813681366,122.29759825358528L466.8843384338434,110.40969085467435L470.94554455445547,105.59789615859665L477.5126012601261,97.1337503764262L482.7835283528353,94.04005277766885L486.7583258325833,94.40037595556083L490.3874887488749,88.40065454872118L494.7943294329433,88.77517259648562L499.11476147614763,87.27127627172709L506.63231323132317,92.58980426468537L503.521602160216,94.52028651983065ZM490.81953195319534,26.351977277935703L485.462196219622,30.912027140264513L481.2281728172817,28.46035315327748L482.8699369936994,25.383077929911394L481.48739873987404,21.639124452066937L486.4126912691269,19.4250706229285L487.36318631863185,23.818816089547738ZM475.2659765976598,3.545895049444823L483.2155715571557,13.202886892215531L477.16696669666965,17.997723780750334L475.87083708370835,26.737675835029563L473.71062106210627,28.840323520492575L472.5873087308731,37.84324765875374L469.6494149414941,38.19878668824049L464.5513051305131,31.657882585203026L466.71152115211527,27.697321198781538L463.0823582358236,24.40745598984421L458.41629162916297,14.259284010857641L456.6017101710171,4.225931057366836L463.0823582358236,-0.6053267670230298L464.464896489649,3.9996198051040324L467.83483348334835,3.9996198051040324L468.78532853285327,-0.8396080448014231L472.24167416741676,-1.309353283852488ZM492.547704770477,-6.339560943422214L497.3001800180018,-1.309353283852488L493.7574257425743,6.023352124608152L486.7583258325833,7.577364698749761L479.67281728172816,5.352024135857391L479.24077407740776,1.716119568488864L475.7844284428443,1.485703504138712L473.1921692169217,-4.883758170608985L480.62331233123314,-9.048659141916119L484.07965796579657,-5.609760208352327L486.499099909991,-9.796733814227366Z"
                        className="datamaps-subunit NOR"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M319.2983798379838,-42.6392616361893L327.3343834383438,-54.191345884147836L335.71602160216025,-53.50462820045061L338.8267326732673,-60.89088010390651L347.2947794779478,-63.07571593665426L366.477497749775,-60.53007116125622L381.5126012601261,-44.552471794014366L377.0193519351935,-37.3575914564106L367.8600360036004,-36.446053916069445L354.89873987398744,-34.94000576154417L356.1084608460846,-31.683120582970048L364.6629162916292,-33.746824306841745L371.83483348334835,-27.645500849250027L376.500900090009,-32.85862096516229L378.48829882988304,-26.795356205834253L375.8960396039604,-17.507106374100715L382.03105310531055,-23.44584903051657L393.6962196219622,-29.938320425881898L400.8681368136814,-26.513126626993312L402.16426642664266,-19.637428628011378L392.4000900090009,-8.80019051059162L391.01755175517553,-5.367339435195049L383.4135913591359,-2.9660226373887326L388.9437443744374,-2.2536124399313735L386.1786678667867,7.577364698749761L384.1912691269127,15.724989041685944L384.27767776777677,28.840323520492575L387.12916291629165,35.87161852983587L383.4135913591359,36.41207210466666L379.43879387938796,39.787732028589346L383.93204320432045,45.128022286887926L384.4504950495049,53.338639253694794L381.8582358235824,54.29276435917882L384.96894689468945,62.00463036272953L379.6980198019802,62.753375061120096L382.463096309631,66.29375671334054L381.68541854185423,69.17863426207384L378.3154815481548,70.59959623242543L374.94554455445547,70.59959623242543L377.9698469846985,76.1469593536072L377.9698469846985,79.64144529395017L373.2173717371737,76.41879294901162L372.0076507650765,78.44136984867151L375.2047704770477,80.43599111553758L378.40189018901896,85.11374323616369L379.2659765976598,91.1249968271672L375.03195319531955,92.46829731521316L373.13096309630964,89.76919900881015L370.19306930693074,85.49682265105972L371.0571557155716,90.51028916446842L368.2056705670567,94.28036692540937L374.513501350135,94.52028651983065L377.8834383438344,94.87942913411615L371.4027902790279,100.96859222479239L364.9221422142214,106.15263530092079L357.9230423042304,108.46008314524991L355.24437443744375,108.46008314524991L352.73852385238524,110.94673448038645L349.45499549954997,117.45000863985007L344.2704770477048,121.70013018788524L342.6287128712871,121.89954967986736L339.431593159316,123.38684221811101L335.9752475247525,124.66407557994071L333.9014401440145,128.24136027247295L333.9014401440145,132.1094282742811L332.60531053105314,135.7001018786601L328.71692169216925,139.9187636522995L329.6674167416742,144.02547109823846L328.6305130513052,148.1107981942393L327.4207920792079,152.90962884012495L324.0508550855086,153.23527613062217L320.50810081008103,149.1991655091159L315.66921692169217,149.1991655091159L313.3361836183619,146.5064155904285L311.7808280828083,141.50440434310832L307.54680468046803,134.97037745594807L306.33708370837087,131.36235024071556L306.07785778577863,126.31818656860551L302.7079207920792,121.00007399381485L303.57200720072007,116.52338125598175L302.01665166516653,114.3386489662148L304.34968496849683,106.92578933754027L307.97884788478854,104.48212797006283L308.92934293429346,101.65520645108609L309.447794779478,96.30724493071665L306.6827182718272,98.77290696621208L305.3865886588659,99.8170608624294L303.22637263726375,100.73900658765578L300.2884788478848,98.53986050852572L300.11566156615663,93.79934269259098L301.0661566156616,90.01664839871455L303.22637263726375,89.89297627843101L308.15166516651664,91.73712249367975L304.0040504050405,87.14524623946826L301.93024302430246,84.60139147082123L299.5108010801081,85.62429130500988L297.52340234023404,83.70039501642853L300.2020702070207,76.41879294901162L298.73312331233126,73.40002243297448L296.83213321332136,67.59914304848292L293.8942394239424,58.35495857569475L290.8699369936994,54.76743774220171L290.8699369936994,50.76254762682453L284.475697569757,45.128022286887926L279.3775877587759,44.280197880476805L272.98334833483347,44.78950128071148L267.1075607560756,45.465736271323635L264.34248424842485,42.224462824787054L260.10846084608465,35.69100645934918L266.4162916291629,32.214694726022L271.2551755175518,31.657882585203026L260.9725472547255,28.840323520492575L255.61521152115213,24.211516469973105L255.8744374437444,19.627797361374974L265.0337533753376,13.837680370951603L273.76102610261023,7.577364698749761L274.7115211521152,2.862534015676772L268.23087308730874,-2.2536124399313735L270.3046804680468,-7.810721317822754L278.6863186318632,-18.30215988968348L282.14266426642666,-20.17514535932304L281.10576057605766,-27.36154094200839L286.80873087308726,-31.976063984058555L294.23987398739877,-34.64074742905217L301.5846084608461,-34.94000576154417L304.1768676867687,-29.361557795832255L310.57110711071107,-39.1988321630987L316.27407740774083,-32.56381151639624L319.64401440144013,-31.099081343730802L324.6557155715572,-25.669860852447187L318.9527452745275,-34.94000576154417Z"
                        className="datamaps-subunit GRL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M198.32628262826285,270.1630635568817L197.462196219622,272.50229264272616L197.03015301530158,274.4240115216798L196.8573357335734,277.9263231483944L196.5981098109811,279.2032115477175L197.03015301530158,280.6069635930904L197.80783078307834,281.8745111071338L198.23987398739877,283.8330254969187L199.8816381638164,285.7385530938708L200.4000900090009,287.2048587914658L201.35058505850586,288.45145030699507L203.85643564356437,289.13766083494556L204.89333933393343,290.2076931566124L206.96714671467146,289.4803568271549L208.7817281728173,289.22336024735495L210.59630963096313,288.75180252507084L212.15166516651666,288.32266315105466L213.62061206120615,287.2909497232137L214.22547254725472,285.8249523873804L214.3982898289829,283.6593380734705L214.83033303330336,282.9202968267899L216.472097209721,282.22342635509415L218.9779477947795,281.6562750143876L221.13816381638162,281.7435846505087L222.60711071107113,281.5252724628635L223.12556255625566,282.0490089964143L223.03915391539155,283.31173006226936L221.74302430243029,284.83023750651057L221.22457245724578,286.38609997863284L221.6566156615662,286.81722831537905L221.31098109810986,287.9360669061252L220.7061206120612,289.9083477952055L220.10126012601262,289.2662035885282L219.5828082808281,289.30904269245235L219.15076507650767,289.30904269245235L218.2866786678668,290.8484668787757L217.85463546354637,290.54955400821433L217.50900090009003,290.6776840390847L217.5954095409541,291.0191846096612L215.34878487848786,291.0191846096612L213.1021602160216,291.0191846096612L213.1021602160216,292.4251589884678L211.9788478847885,292.4251589884678L212.92934293429343,293.2751852660139L213.7934293429343,293.8692933814825L214.05265526552657,294.37794273952727L214.484698469847,294.5473736808648L214.3982898289829,295.393649545L211.28757875787582,295.393649545L210.16426642664268,297.4189039547114L210.50990099009906,297.92397740323224L210.2506750675068,298.47059722874L210.16426642664268,299.2265397858414L207.3991899189919,296.53384501225815L206.1894689468947,295.7317549230623L204.2020702070207,295.0553138605807L202.90594059405944,295.2668007707269L201.0049504950495,296.1962778097472L199.79522952295233,296.44947419470844L198.06705670567058,295.77400201152255L196.25247524752479,295.30908730118597L194.00585058505854,294.16607072859745L192.19126912691272,293.82688163427457L189.51260126012605,292.63781057979605L187.52520252025204,291.4456959736185L186.92034203420343,290.7630836155415L185.53780378037806,290.63497812212995L183.11836183618365,289.8227830978232L182.08145814581462,288.6660091363698L179.489198919892,287.2048587914658L178.27947794779482,285.60891949239203L177.7610261026103,284.3536251765347L178.53870387038705,284.13679265824646L178.27947794779482,283.39866130822077L178.8843384338434,282.70266144646223L178.8843384338434,281.83087401462006L178.02025202520255,280.65074420266325L177.8474347434744,279.64246596861074L177.0697569756976,278.32308901665897L174.9095409540954,275.7138317761899L172.49009900990103,273.66559807920237L171.3667866786679,272.0088744789745L169.29297929792983,270.9296968402844L168.86093609360938,270.2984868298198L169.20657065706575,268.624159400664L167.99684968496848,268.0337302350355L166.52790279027903,266.71249135175793L165.92304230423048,264.8345664681231L164.7133213321332,264.6047348750741L163.2443744374438,263.1757283409104L162.12106210621067,261.8324802911767L162.03465346534654,260.9489706292379L160.73852385238524,258.89217998502625L159.8744374437444,256.7725990383251L159.96084608460848,255.6827899627977L158.2326732673268,254.58849193677943L157.3685868586859,254.68382870643998L156.0724572457246,253.9201622463055L155.6404140414042,255.06483087143016L156.0724572457246,256.39403871616827L156.24527452745275,258.5165689969688L157.10936093609365,259.641867632512L158.92394239423942,261.55377532723946L159.2695769576958,262.20366218949636L159.6152115211521,262.38907205416496L159.96084608460848,263.31432710778085L160.39288928892893,263.2681349092083L160.9113411341134,265.018302585601L161.6026102610261,265.7062976373846L162.12106210621067,266.66682843047556L163.59000900090012,268.0337302350355L164.45409540954097,270.5240633228766L165.1453645364537,271.6944887875898L165.83663366336634,272.95020626833093L165.92304230423048,274.3348759497841L167.04635463546356,274.4240115216798L168.08325832583262,275.62503614757924L168.94734473447346,276.77758908341997L168.86093609360938,277.264052628148L167.82403240324032,278.1908831015543L167.39198919891987,278.1908831015543L166.78712871287132,276.6005241481915L165.2317731773178,275.13624519111244L163.50360036003605,273.8442040258185L162.29387938793877,273.1739333507812L162.38028802880285,271.24483256696675L161.94824482448246,269.801649753812L160.82493249324932,268.94161517430217L159.1831683168317,267.7608407509734L158.83753375337534,268.1246393667461L158.2326732673268,267.39660810988846L156.76372637263728,266.7581473525461L155.3811881188119,265.20192432973L155.55400540054006,264.97237929431935L156.50450045004504,265.15602959439286L157.45499549954997,264.1445305581696L157.5414041404141,262.8983308056272L155.6404140414042,260.9489706292379L154.25787578757883,260.1561029416788L153.39378937893792,258.46958140647274L152.44329432943294,256.630701525501L151.4063906390639,254.39771451509282L150.36948694869488,251.80843137626846L153.1345634563457,251.61559337467162L156.15886588658867,251.27777562951687L155.9860486048605,251.85661814524474L159.52880288028803,253.2501166065658L165.05895589558958,255.20756492603508L169.81143114311436,255.20756492603508L171.71242124212426,255.20756492603508L171.71242124212426,254.063519516773L175.86003600360038,254.063519516773L176.72412241224126,255.01723570438668L178.02025202520255,255.92008382534104L179.40279027902793,257.15062676247123L180.1804680468047,258.61051999215397L180.7853285328533,260.10939354542825L182.08145814581462,260.9489706292379L184.0688568856886,261.786048473569L185.53780378037806,259.5950716981583L187.52520252025204,259.5482678562728L189.1669666966697,260.6693912031846L190.3766876687669,262.5280505691161L191.24077407740774,264.1445305581696L192.62331233123314,265.7062976373846L193.14176417641764,267.57877887549296L193.83303330333032,268.8509467487108L195.73402340234026,269.6660122271381L197.462196219622,270.2533521984983Z"
                        className="datamaps-subunit MEX"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M278.6863186318632,207.92384402521225L280.414491449145,208.3958997711311L282.6611161116112,208.33695701839747L281.451395139514,209.7465661237165L280.58730873087313,209.9804912462863L277.56300630063004,208.51373040012103L276.9581458145815,207.3321146046066L277.82223222322233,206.26230358405002ZM283.1795679567957,198.84464125228448L281.9698469846985,198.90667434981555L278.8591359135914,197.7244081109242L276.61251125112517,195.96792041940682L277.47659765976596,195.65245204808235L280.67371737173715,196.59720248747035L283.09315931593164,198.16087635849604ZM135.07515751575158,201.00335076400177L133.86543654365443,201.49321807684308L129.8906390639064,199.83464526086013L129.19936993699372,198.53415799432338L127.03915391539158,197.2242956834936L126.60711071107113,196.2198972408838L124.18766876687675,195.52610942998513L123.23717371737172,193.49241003763376L123.40999099909993,192.59532314766125L126.00225022502258,193.42848220662862L127.47119711971203,194.0030088334122L129.71782178217825,194.385001367212L130.495499549955,195.71559004288517L131.70522052205223,197.47452470287533L134.1246624662466,198.96868630899496ZM296.7457245724572,192.91623120736088L295.1903690369037,196.2198972408838L296.7457245724572,194.9564640802955L298.38748874887494,195.71559004288517L297.52340234023404,197.0363963250609L299.68361836183624,198.03627833702694L300.72052205220524,197.1616842737648L303.1399639963997,198.2853888681308L302.448694869487,200.9420253982747L304.0904590459046,200.3276412510745L304.4360936093609,202.28648215269843L305.12736273627365,204.46562391102202L304.1768676867687,207.56902860609387L303.0535553555356,207.6873743562166L301.498199819982,207.0355535251789L302.01665166516653,204.16449012926705L301.32538253825385,203.6816601976355L298.5603060306031,206.797968481941L297.0913591359136,206.67906352719456L298.81953195319534,205.00644218372824L296.486498649865,204.16449012926705L293.8942394239424,204.3452288099114L289.22817281728175,204.22475585048542L288.8825382538254,203.19757188673648L290.3514851485149,201.92078450042072L289.3145814581458,200.9420253982747L291.3883888388839,198.72051156280753L293.8078307830783,192.7879375464925L295.3631863186319,190.65757080112292L297.43699369936996,189.28836433998674L298.5603060306031,189.4846197226698L298.0418541854186,190.5276283381772ZM112.9545454545455,179.7354630164375L115.28757875787585,179.3892035669444L114.59630963096316,183.97168615157028L116.67011701170117,187.18116204715534L115.71962196219619,187.18116204715534L114.25067506750685,185.38315990157727L113.38658865886583,183.5662762031185L112.17686768676867,182.27613029319136L111.74482448244828,180.49475973195345L111.8312331233123,179.18110831934936ZM241.2713771377138,142.6395940909346L240.3208820882088,145.3136353150068L239.2839783978398,144.88542729226944L238.59270927092712,143.42066714553062L238.76552655265527,143.07400747364125L239.62961296129615,141.50440434310832L240.66651665166518,141.59202183547336ZM234.9635463546355,139.83019475338008L232.11206120612061,142.6395940909346L230.470297029703,142.55256562499795L229.95184518451848,141.15343878182364L231.6800180018002,138.76339253683832L234.9635463546355,138.76339253683832ZM227.10036003600362,123.5840442389619L227.53240324032404,126.12452080088647L228.82853285328534,125.2499464005038L230.21107110711074,126.70477708272244L232.80333033303333,128.62308865089773L235.5684068406841,130.4233304242646L235.74122412241226,133.03816905340136L237.55580558055806,132.5745037594359L239.2839783978398,134.4207986451304L237.12376237623764,136.06366851656676L233.4081908190819,134.78740315665638L232.02565256525654,132.38864332521663L229.69261926192624,135.24443060274933L226.23627362736275,138.04807630264312L225.45859585958598,134.8789175750227L222.1750675067507,135.42686134687065L224.24887488748877,132.66734932717293L224.5945094509451,128.33688230286094L225.37218721872188,123.09055509485802ZM249.39378937893792,114.65271742891628L246.71512151215123,114.96612629147057L246.11026102610262,111.90854935783597L247.14716471647165,108.2418691660688L249.39378937893792,107.36578398789467L251.20837083708375,109.22131186509304L251.29477947794783,111.90854935783597L250.94914491449146,112.75830588755073ZM201.95544554455446,101.99731565110304L200.486498649865,104.37008587703673L197.20297029702974,102.3386315404804L195.30198019801983,103.01889910903097L192.01845184518456,100.04809019351964L194.09225922592262,97.83849123548279L195.73402340234026,94.87942913411615L198.32628262826285,96.78010474519738L199.79522952295233,98.07265390995067L200.486498649865,99.35390906800723ZM270.39108910891093,212.82319223252546L268.8357335733574,210.91334454964527L268.8357335733574,206.14305943472505L267.71242124212426,205.12641160334098L266.1570657065707,205.72510744072298L265.29297929792983,204.76627196833377L263.478397839784,207.45060873365776L262.7871287128713,210.1557475159096L261.9230423042304,211.72589193302372L260.8861386138614,212.24644166550814L260.10846084608465,212.41964723679575L259.84923492349236,213.28336112598296L255.44239423942398,213.28336112598296L251.81323132313233,213.28336112598296L250.7763276327633,213.91432114098706L248.1840684068407,216.30490123686508L247.92484248424844,216.5875699071758L247.14716471647165,217.8826797306623L244.9005400540054,217.8826797306623L242.56750675067508,217.8826797306623L241.53060306030605,218.44315291209037L241.8762376237624,219.05786411197755L242.04905490549058,220.0597126052263L242.04905490549058,220.39255816674108L238.93834383438346,222.04863451302197L236.43249324932495,222.5428423219529L233.66741674167417,224.23605914253358L233.06255625562557,224.23605914253358L232.19846984698472,223.74591305596806L231.93924392439246,223.30924732093465L232.02565256525654,222.98113852341493L232.54410441044107,221.82860207418366L233.66741674167417,220.0041849451904L234.3586858685869,218.05098702873687L233.92664266426644,215.17015897485402L233.4081908190819,212.130885073413L230.90234023402343,210.50577959598039L231.16156615661566,209.86356446648728L230.81593159315935,209.45375633448378L230.12466246624666,209.45375633448378L229.69261926192624,208.92556312682575L229.51980198019805,208.1010027002984L229.0877587758776,208.45482422620682L228.48289828982902,208.33695701839747L228.5693069306931,207.98291532502103L228.05085508550854,207.6282107380623L227.79162916291634,206.73852538817283L225.97704770477048,205.60552130820957L223.98964896489653,204.40543608383908L221.6566156615662,203.01571244994744L219.40999099909993,201.73766329261505L217.24977497749776,202.77295504568906L216.472097209721,202.77295504568906L213.53420342034207,201.85976431783374L211.54680468046806,202.3473613614042L209.21377137713773,201.18720406928364L206.7943294329433,200.6350907325153L205.1525652565257,200.38917244775467L204.3748874887489,199.77292716937572L203.94284428442847,197.7868251138115L203.1651665166517,197.7868251138115L203.0787578757876,199.21652315803857L198.15346534653466,199.21652315803857L189.94464446444647,199.21652315803857L181.82223222322233,199.21652315803857L174.5639063906391,199.21652315803857L167.39198919891987,199.21652315803857L160.30648064806485,199.21652315803857L152.96174617461753,199.21652315803857L150.62871287128718,199.21652315803857L143.5432043204321,199.21652315803857L136.71692169216925,199.21652315803857L136.37128712871288,199.21652315803857L131.70522052205223,195.58929185082798L129.97704770477054,193.93926387588618L125.65661566156615,192.4024995222622L124.36048604860491,188.96078312490587L124.61971197119715,186.58389468654332L121.59540954095417,184.9139496067136L121.16336633663366,181.66160203839132L118.22547254725475,178.6945571843274L118.22547254725475,176.59333131078128L119.52160216021599,174.53689940530018L119.52160216021599,171.87590744308633L115.37398739873987,169.1715702501287L112.9545454545455,164.0824301242317L111.48559855985599,160.85784281518409L109.23897389738977,158.7503874794753L107.59720972097216,156.85360365591134L106.38748874887489,154.3698120508261L103.96804680468045,155.97667660220924L101.63501350135016,158.59317602746808L99.47479747974796,155.49631551407913L97.83303330333035,153.3978495582968L95.50000000000006,152.09257269143393L93.08055805580557,151.92865458465414L93.08055805580557,121.50044620130856L93.1669666966697,97.83849123548279L97.57380738073812,99.46983404264645L101.37578757875792,102.79249215574663L103.88163816381643,103.35785857810501L105.9554455445545,100.62407917843029L108.8933393339334,98.4231983060663L112.43609360936097,99.2378924852338L116.06525652565256,96.18879097054199L119.9536453645365,94.52028651983065L121.68181818181819,97.36904075463906L123.40999099909993,95.71401413984279L123.9284428442844,92.46829731521316L125.65661566156615,93.19582610696096L129.71782178217825,99.46983404264645L132.91494149414945,94.75981293787069L133.17416741674174,100.04809019351964L136.11206120612064,98.88929153577837L137.06255625562557,96.89808151434988L140.00045004500453,97.25144279488649L143.62961296129617,100.1634687538521L149.2461746174618,102.67915805676978L152.52970297029702,103.80859539613601L154.9491449144915,103.35785857810501L158.14626462646265,106.70530033696673L154.77632763276335,109.87069798552847L159.09675967596763,111.26803135407317L165.5774077407741,110.5172550300284L167.65121512151217,109.32974048682388L170.15706570657068,113.18137217205646L172.83573357335734,109.97865323482782L170.32988298829883,107.25590791564395L171.88523852385242,105.04106606382928L174.82313231323133,104.70595726686062L176.72412241224126,104.03344815059697L178.71152115211524,105.59789615859665L181.13096309630964,109.11280391084321L183.80963096309634,108.569069743614L188.04365436543654,111.4818440740012L191.7592259225923,110.5172550300284L195.21557155715576,110.62474135844963L194.95634563456346,106.59493245629673L197.11656165616566,105.48669795842281L200.83213321332133,107.69492367330474L200.83213321332133,113.70852110011779L202.30108010801084,108.67797625114179L204.2884788478848,108.7868027949512L205.32538253825385,102.22494747933351L202.73312331233126,98.07265390995067L199.96804680468048,95.23769171744331L200.14086408640867,87.27127627172709L202.99234923492352,81.75060436140228L206.1894689468947,82.9236271517785L208.60891089108915,86.2599602867408L211.8924392439244,94.52028651983065L209.73222322232226,97.95561931984875L214.22547254725472,99.35390906800723L214.13906390639065,106.15263530092079L217.42259225922595,100.96859222479239L220.27407740774078,105.2640501024834L219.496399639964,110.08653002316433L221.82943294329436,114.3386489662148L224.33528352835287,109.7626641516147L226.14986498649864,104.14574610679003L226.23627362736275,96.66203286626069L229.69261926192624,97.25144279488649L233.23537353735375,98.18959516512626L236.43249324932495,101.65520645108609L236.60531053105314,104.9294476340483L234.79072907290734,108.35101632863746L236.51890189018903,111.80198775814932L236.1732673267327,114.86172977331586L231.507200720072,119.08332330616975L228.13726372637268,119.9943070289809L225.63141314131414,118.16677483753779L224.94014401440145,121.2004226034673L222.60711071107113,126.12452080088647L221.91584158415844,128.62308865089773L219.15076507650767,132.38864332521663L215.6944194419442,132.76013856411132L213.7934293429343,135.0617828723692L213.62061206120615,138.49553723013628L210.8555355535554,139.11981193561206L207.91764176417644,143.33407456794544L205.32538253825385,149.0322137356178L204.3748874887489,152.82811246882906L204.2884788478848,158.35706989618083L207.74482448244825,159.14274447956856L208.8681368136814,163.39682411337174L209.9914491449145,166.79636908768475L213.36138613861388,165.89672492184766L217.7682268226823,167.8397475769472L220.1876687668767,169.46607369145212L221.91584158415844,171.51302755647907L224.94014401440145,172.74359827231496L227.44599459945997,174.46553593008264L231.42079207920793,174.75080736359024L234.01305130513052,175.17780506255204L233.66741674167417,178.764150087509L234.3586858685869,182.82053237272552L236.1732673267327,187.24739869283366L239.71602160216023,190.91716871271413L241.53060306030605,189.68065588485547L242.82673267326734,185.65070973083473L241.61701170117016,179.3198668409216L239.88883888388838,177.15622179301212L243.7772277227723,175.17780506255204L246.45589558955896,172.2379959206738L247.83843384338437,169.24524544343944L247.57920792079207,166.27217804849602L245.93744374437446,162.4781566117464L243.08595859585964,159.0643496600015L245.85103510351038,154.1273779665349L244.81413141314133,149.69896141506527L244.03645364536456,141.85457797387886L245.67821782178217,140.62549663165396L249.82583258325835,142.02936908293034L252.33168316831686,142.55256562499795L254.31908190819087,141.24125463837663L256.479297929793,142.98722178389264L259.503600360036,145.91116224906284L260.19486948694873,147.85856268294975L264.515301530153,148.194786771787L264.42889288928893,152.3381321652593L265.20657065706575,158.27829061951684L267.3667866786679,159.0643496600015L269.1813681368137,161.7857228370921L272.63771377137715,159.22110109725077L274.88433843384337,154.04648441640708L276.5261026102611,151.7645665686366L278.34068406840686,156.05659642530702L281.451395139514,161.939853144234L284.13006300630065,167.31888797890934L283.1795679567957,170.0535081961751L286.37668766876686,172.45487089233887L288.53690369036906,174.8932609340563L292.33888388838886,175.9578205545133L293.8942394239424,177.29665107354873L294.8447344734474,180.7700299489325L296.7457245724572,181.31924058174354L297.6962196219622,182.82053237272552L297.86903690369036,187.31361015137935L296.14086408640867,188.76393999232982L294.4126912691269,190.13722467886652L290.43789378937896,191.49987160392146L287.4135913591359,194.57569183296442L283.3523852385239,195.2098632303084L278.2542754275428,194.385001367212L274.62511251125113,194.385001367212L272.1192619261926,194.63921016200442L270.13186318631864,197.3494534761862L267.1075607560756,198.96868630899496L263.65121512151217,203.74208256703542L260.8861386138614,206.97618533016657L262.8735373537354,206.44102806994624L266.7619261926193,201.73766329261505L271.7736273627363,198.72051156280753L275.40279027902795,198.34761310624552L277.47659765976596,200.14292345163105L275.22997299729974,202.59067773398576L276.0076507650765,206.3814721168209L276.7853285328533,209.04306602586445L279.8960396039604,210.73877979872245L283.87083708370835,210.27249594880587L286.2902790279028,206.32189729391033L286.46309630963094,208.86678446069115L287.93204320432045,210.1557475159096L284.9941494149415,212.36192926817532L279.72322232223223,214.42904740387854L277.3037803780378,215.73834719923872L274.62511251125113,218.16311304457287L272.8105310531053,217.93879795162252L272.72412241224123,215.1132497174353L276.8717371737174,212.30419408285155L273.0697569756976,212.41964723679575ZM157.5414041404141,72.14657999700836L156.33168316831689,75.87461193804097L161.6026102610261,73.53862170932712L164.9725472547255,77.50102954615505L167.65121512151217,73.40002243297448L169.89783978397844,76.1469593536072L171.88523852385242,83.8294522975142L173.09495949594958,80.56799168752309L171.3667866786679,72.42606880333335L173.44059405940595,71.16406553718451L175.86003600360038,72.42606880333335L178.53870387038705,75.73824491017422L180.0076507650765,83.4419350128758L180.7853285328533,88.6504403821528L184.84653465346537,92.346689088495L189.1669666966697,95.71401413984279L188.90774077407744,98.77290696621208L184.93294329432945,99.2378924852338L186.488298829883,101.8833675919972L185.7106210621062,104.37008587703673L181.30378037803783,103.35785857810501L177.15616561656168,101.5409930751241L174.39108910891093,101.8833675919972L169.89783978397844,104.14574610679003L163.84923492349236,105.15260017430174L159.52880288028803,105.82004178197963L158.2326732673268,102.67915805676978L154.9491449144915,100.85384421972327L152.8753375337534,101.5409930751241L149.85103510351036,96.07024107745488L151.49279927992802,95.35691780912947L155.20837083708375,94.16025925703863L158.5783078307831,94.52028651983065L161.68901890189022,93.19582610696096L157.02295229522952,91.6149028153809L151.92484248424847,92.10316808443827L148.55490549054906,91.9812549464871L147.25877587758782,89.27303463388316L152.78892889288937,86.38676066921369L149.15976597659767,86.51345039236074L144.92574257425747,84.47302012194604L146.91314131413145,78.70891674486143L148.64131413141314,75.46512293268114L155.03555355535553,70.45813147096237ZM180.69891989198922,69.60640230582152L178.62511251125116,75.0544662946611L174.82313231323133,69.32136538743885L175.68721872187223,68.03164213783572L178.8843384338434,67.74345448224187ZM248.2704770477048,72.28639234105367L248.52970297029708,74.50509568141615L245.93744374437446,74.22962204915558L243.34518451845187,74.09168722839212L240.75292529252926,75.19148200860235L240.06165616561657,74.78004306243793L237.3829882988299,70.31652716251199L237.46939693969398,67.31008344260772L238.6791179117912,66.73020866938424L244.12286228622864,67.59914304848292ZM223.73042304230424,71.86654655532868L225.63141314131414,76.82558436600965L227.87803780378042,70.31652716251199L233.92664266426644,66.87539758004675L238.0742574257426,75.46512293268114L237.72862286228627,80.56799168752309L242.481098109811,78.30741017011763L244.72772277227725,75.19148200860235L250.0850585058506,79.24252744188917L253.36858685868586,82.9236271517785L253.62781278127812,86.1330490403715L258.1210621062106,84.47302012194604L260.6269126912691,89.27303463388316L266.4162916291629,92.10316808443827L268.49009900990103,94.99894754943438L270.73672367236725,101.42669096545634L266.32988298829883,104.59408505378525L272.03285328532854,108.7868027949512L275.83483348334835,110.19432847390695L279.29117911791184,116.00609721821178L283.09315931593164,116.31668234041575L282.3154815481548,120.5985743531044L278.0814581458146,127.37894752506176L275.14356435643566,124.85961817895404L271.34158415841586,119.18481716501225L268.23087308730874,119.9943070289809L267.9716471647165,123.38684221811101L270.477497749775,126.70477708272244L273.76102610261023,129.28881564692577L274.7115211521152,130.79963240658066L276.2668766876688,136.15442599752217L275.48919891989203,140.0072818926068L272.46489648964894,138.58487396776283L266.4162916291629,134.3290104405887L269.78622862286227,138.9417050136512L272.2920792079208,142.02936908293034L272.72412241224123,143.85290937742442L266.1570657065707,141.7671085875366L261.0589558955896,138.76339253683832L258.1210621062106,136.15442599752217L258.9851485148515,134.60421041515195L255.3559855985599,131.82970209129917L251.89963996399644,129.09890508802636L251.89963996399644,130.79963240658066L244.9869486948695,131.64293297283842L242.9995499549955,129.76255776315708L244.55490549054906,125.5420330383906L249.04815481548158,125.4447334592777L253.97344734473447,124.76187849520778L253.1957695769577,122.69459803733355L254.05985598559855,119.69125952529154L257.1705670567057,113.81372751148439L256.479297929793,110.94673448038645L255.52880288028805,108.7868027949512L251.89963996399644,105.59789615859665L246.9743474347435,103.35785857810501L248.52970297029708,101.65520645108609L246.02385238523854,97.48654441743284L243.8636363636364,97.01596333710182L241.9626462646265,94.64009879011499L240.75292529252926,96.78010474519738L236.34608460846087,97.60395394461179L227.61881188118812,96.07024107745488L222.52070207020705,94.04005277766885L218.63231323132317,92.95371923868422L216.64491449144919,90.38703575378364L219.15076507650767,87.01910676373177L215.7808280828083,87.01910676373177L215.0031503150315,79.24252744188917L216.81773177317734,72.00663149433285L219.32358235823585,68.6062850899632L225.54500450045006,66.29375671334054ZM190.63591359135916,66.00204792351968L193.48739873987398,67.74345448224187L197.80783078307834,66.73020866938424L198.41269126912692,69.17863426207384L196.16606660666068,73.12242252057968L199.79522952295233,76.69011475393376L199.3631863186319,83.70039501642853L195.47479747974802,86.64002966019768L193.14176417641764,86.00602672497931L191.50000000000003,83.05337814467993L185.53780378037806,77.09614226507028L185.53780378037806,74.50509568141615L190.46309630963097,75.46512293268114L187.78442844284427,70.17478301910836ZM207.83123312331236,74.91732006623096L205.23897389738977,80.96327165134028L202.47389738973902,80.56799168752309L201.0049504950495,73.53862170932712L201.0913591359136,69.46395463729124L202.30108010801084,65.85597033798092L204.72052205220524,63.49821697655409L209.73222322232226,63.79507041281346L214.31188118811883,65.85597033798092L210.6827182718272,73.40002243297448ZM142.41989198919896,85.75164806382554L136.11206120612064,89.39723440365054L134.8159315931593,86.1330490403715L129.2857785778578,82.14266939493498L130.32268226822686,78.84250444555624L131.96444644464447,72.98342134310013L134.03825382538258,67.45468613734988L131.70522052205223,62.15469356785934L139.82763276327637,60.64691793964789L143.19756975697567,62.603939702666935L149.33258325832583,63.05177778944369L151.66561656165618,65.5633672009127L154.25787578757883,69.17863426207384L151.23357335733573,71.30483685270832L145.35778577857786,76.96092678625303L142.41989198919896,82.53367498648157ZM206.7943294329433,55.86889039463239L205.49819981998203,59.42912410807497L202.0418541854186,58.662689598707004L199.1039603960396,56.338345177320775L200.4000900090009,52.056430681465145L203.85643564356437,49.456768181688574L205.93024302430246,52.859165312470054ZM195.12916291629168,38.73042298696788L196.94374437443747,43.42726689750168L197.03015301530158,48.634513756226625L195.90684068406844,55.712060867757714L191.93204320432045,56.650457447336294L189.3397839783979,55.08300924006062L189.42619261926197,49.620648934698636L185.53780378037806,50.27428656090939L185.36498649864987,42.7412025608694L187.95724572457246,43.08465041757478L191.50000000000003,39.436173887565985L194.95634563456346,40.13841793884279ZM171.79882988298834,44.11002223381979L172.74932493249327,47.641476524448024L174.9095409540954,45.97080272813918L177.41539153915392,46.306516403057344L177.8474347434744,51.08712490274121L176.3784878487849,55.55505838517013L168.25607560756077,57.117347241974926L162.20747074707475,60.94974955122109L158.49189918991902,61.251940115610296L158.2326732673268,58.20084360609826L163.15796579657967,54.13418730923979L152.35688568856887,55.240532968972786L148.9869486948695,53.65739268146342L152.2704770477048,44.11002223381979L154.51710171017106,41.1852865099537L161.25697569756977,44.61993690029527L165.5774077407741,50.43722685731814L169.72502250225023,51.249135826384986L166.2686768676868,41.70582892382953L168.515301530153,38.02112904084447L171.02115211521158,39.26006633402744ZM204.2884788478848,34.784462128303915L206.88073807380738,38.19878668824049L211.63321332133216,38.19878668824049L213.70702070207022,41.532527556050354L213.18856885688572,45.29697990889622L215.9536453645365,47.641476524448024L217.42259225922595,49.947843928078726L220.7061206120612,50.27428656090939L224.1624662466247,51.08712490274121L227.96444644464447,48.963987477848605L232.8897389738974,48.13886412540597L236.7781278127813,48.963987477848605L239.37038703870388,52.53861527685086L239.88883888388838,56.338345177320775L238.41989198919893,58.81630639584239L234.79072907290734,60.79841405288141L231.76642664266427,59.58191800192367L224.85373537353738,61.10092478805183L219.92844284428443,61.251940115610296L216.04005400540058,60.039320229561156L209.64581458145815,57.117347241974926L208.8681368136814,52.056430681465145L208.52250225022507,47.30891302274853L206.1894689468947,42.91303067091155L201.17776777677767,41.70582892382953L198.41269126912692,38.37622117851777L199.27677767776777,34.05500890486098ZM152.61611161116116,28.65046654406558L152.2704770477048,37.129473153845026L150.45589558955896,40.6628210731206L148.20927092709275,41.1852865099537L143.71602160216025,45.63429186776841L139.91404140414045,47.14233832877517L136.63051305130512,44.958862909897505L140.69171917191727,37.30825529512572L145.6170117011701,30.162201800801313L149.33258325832583,30.350032682557128ZM206.2758775877588,30.162201800801313L205.1525652565257,30.537613412350368L200.65931593159317,29.785786840534286L200.05445544554456,26.544958751612228L204.89333933393343,26.737675835029563L206.53510351035104,28.840323520492575ZM167.04635463546356,28.07935428495199L162.55310531053112,31.285448405469026L159.01035103510355,27.697321198781538L160.99774977497754,24.01530343049899L164.45409540954097,22.832237262740307L167.82403240324032,24.798517581731574ZM168.34248424842485,17.587229104963114L165.40459045904595,19.83023171936935L161.42979297929793,19.83023171936935L161.42979297929793,18.202521576380605L163.93564356435644,14.469611150944445L165.1453645364537,15.098705427840684ZM201.52340234023401,24.01530343049899L197.9806480648065,26.351977277935703L195.99324932493252,23.818816089547738L194.95634563456346,19.222050640478983L194.7835283528353,14.259284010857641L197.89423942394242,14.679623126947547L199.27677767776777,15.516538552340023L202.12826282628268,19.83023171936935ZM191.32718271827187,20.8380477633184L192.2776777677768,25.77143906650889L188.38928892889288,24.40745598984421L184.41449144914495,20.637062485927515L179.05715571557158,20.23422672931514L181.3901890189019,16.555705726380722L178.45229522952297,13.626401926325343L178.27947794779482,8.895772565068L183.03195319531957,10.634549259543462L189.51260126012605,15.098705427840684ZM222.6935193519352,3.9996198051040324L225.54500450045006,8.45768209395419L222.2614761476148,12.138463909159668L217.85463546354637,21.43928327518205L213.53420342034207,22.236947575529314L208.60891089108915,20.637062485927515L206.01665166516653,15.724989041685944L206.01665166516653,11.281062834364661L207.91764176417644,7.797963864918131L203.59720972097213,7.797963864918131L200.91854185418543,3.545895049444823L199.3631863186319,-2.7281482904044196L201.0913591359136,-9.048659141916119L202.73312331233126,-13.598565124665697L205.1525652565257,-14.630160551300037L204.11566156615663,-18.30215988968348L209.73222322232226,-19.10178233996811L212.75652565256527,-10.800454520653886L216.81773177317734,-7.810721317822754L220.79252925292528,-5.125339248583771ZM267.1075607560756,-51.80258520778045L273.501800180018,-50.45585107405776L278.6863186318632,-47.801032537077106L283.09315931593164,-42.6392616361893L282.92034203420343,-37.662772939158685L277.13096309630964,-30.227602389158847L271.2551755175518,-26.795356205834253L269.09495949594964,-22.895361430835237L274.3658865886589,-23.17033277984524L268.6629162916292,-13.598565124665697L264.77452745274525,-9.297571495201282L260.6269126912691,2.175814738810459L255.7016201620162,4.451876502864081L254.14626462646265,7.135120042323024L246.88793879387939,8.45768209395419L250.25787578757877,10.201875711284174L248.52970297029708,12.35199654493124L250.51710171017103,18.407020866030678L248.2704770477048,22.6340875056502L244.55490549054906,25.77143906650889L243.43159315931595,30.350032682557128L240.06165616561657,33.50543240579816L240.40729072907294,36.05199975791999L244.55490549054906,35.51016293905769L244.55490549054906,38.19878668824049L238.1606660666067,44.280197880476805L231.85283528352835,41.532527556050354L224.85373537353738,43.08465041757478L221.22457245724578,41.87891823595106L216.73132313231326,41.3590135972247L216.38568856885692,36.23215074863646L220.87893789378938,33.87205460665001L219.6692169216922,25.77143906650889L221.13816381638162,24.993641201006255L227.53240324032404,29.974120082563218L224.24887488748877,22.6340875056502L220.36048604860486,20.43578908954629L222.3478847884789,15.724989041685944L226.5819081908191,12.778087751675855L227.27317731773178,8.23812145427496L223.90324032403245,3.090692514555826L222.8663366336634,-4.161514925145241L229.43339333933397,-3.44299118939864L231.33438343834385,-2.0169481522523256L235.0499549954996,-7.07320091656868L229.69261926192624,-8.80019051059162L221.22457245724578,-7.810721317822754L216.99054905490553,-12.829852717968379L215.0031503150315,-19.10178233996811L212.23807380738074,-23.721912370907603L211.71962196219624,-29.6496397345706L215.26237623762378,-32.85862096516229L218.02745274527453,-33.45012464999462L222.77992799279932,-36.14353390341654L226.32268226822683,-42.956302183349635L229.26057605760582,-42.00734703316715L231.85283528352835,-37.05307976173958L233.66741674167417,-47.145200223008146L236.86453645364537,-50.12120337800428L241.18496849684973,-52.48089449177297L248.52970297029708,-53.16254212638472L249.73942394239427,-51.127581500227336L256.73852385238524,-54.53598599716298L261.9230423042304,-53.16254212638472Z"
                        className="datamaps-subunit CAN"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M467.5756075607561,191.30585083054652L466.53870387038705,188.89519332920125L466.71152115211527,187.51209365328424L466.19306930693074,185.45008614205764L465.24257425742576,184.03916174647378L465.9338433843385,182.95636327010317L465.4153915391539,180.90749849234447L467.0571557155716,179.66626758694102L470.7727272727273,177.78723497798995L473.79702970297035,176.3817611728889L476.2164716471647,177.08596325885685L476.3892889288929,178.0669299773324L478.72232223222323,178.1367814533438L481.6602160216022,178.62493566968908L486.0670567056706,178.55528551397697L487.27677767776777,178.97275742386273L487.8816381638164,180.28801468337343L487.96804680468045,182.07153267704655L488.65931593159314,183.5662762031185L488.65931593159314,185.18222568535637L487.1903690369037,185.9845668156412L487.8816381638164,187.77638721086763L487.96804680468045,189.4846197226698L489.1777677767777,192.85209595586358L488.9185418541854,193.93926387588618L487.7088208820882,194.32139264703167L485.5486048604861,197.47452470287533L486.1534653465347,199.09264689151505L485.63501350135016,198.90667434981555L483.3883888388839,197.47452470287533L481.6602160216022,197.97394720902736L480.53690369036906,197.59950952683076L479.0679567956796,198.4098160266351L477.8582358235824,197.09905116112768L476.9077407740774,197.59950952683076L476.73492349234925,197.3494534761862L475.6116111611161,195.52610942998513L473.8834383438344,195.33642861416087L473.6242124212422,194.13043048832668L471.98244824482447,193.74789222095453L471.63681368136815,194.7027059472309L470.34068406840686,193.93926387588618L470.5135013501351,192.85209595586358L468.6989198919892,192.53107188317767Z"
                        className="datamaps-subunit POL"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M472.24167416741676,200.69651877427788L471.1183618361836,199.95801893220224L469.99504950495054,200.14292345163105L468.0940594059406,199.03067714963268L467.22997299729974,199.34031526637787L465.9338433843385,200.81931315665636L464.1192619261926,199.6494283773862L462.73672367236725,198.09858804680016L461.52700270027003,197.1616842737648L461.26777677767774,195.58929185082798L460.83573357335734,194.51215093854924L462.65031503150317,193.68405600223292L463.514401440144,192.7237559569143L465.24257425742576,192.01622216210387L465.8474347434743,191.30585083054652L466.452295229523,191.6936796812061L467.5756075607561,191.30585083054652L468.6989198919892,192.53107188317767L470.5135013501351,192.85209595586358L470.34068406840686,193.93926387588618L471.63681368136815,194.7027059472309L471.98244824482447,193.74789222095453L473.6242124212422,194.13043048832668L473.8834383438344,195.33642861416087L475.6116111611161,195.52610942998513L476.73492349234925,197.3494534761862L476.04365436543657,197.3494534761862L475.6980198019802,198.03627833702694L475.0931593159316,198.2231432922396L474.92034203420343,199.03067714963268L474.48829882988304,199.21652315803857L474.40189018901896,199.52584597657037L473.6242124212422,199.95801893220224L472.5873087308731,199.89634250865038Z"
                        className="datamaps-subunit CZE"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M472.24167416741676,202.40822050536664L472.0688568856886,203.86286839185172L470.68631863186323,203.86286839185172L471.2047704770477,204.64607089008197L470.42709270927094,206.91679843593926L469.90864086408646,207.5098279435517L467.83483348334835,207.56902860609387L466.62511251125113,208.33695701839747L464.63771377137715,208.1010027002984L461.18136813681366,207.2135460843336L460.6629162916292,205.96405112837758L458.3298829882989,206.5600834353999L457.98424842484246,207.27283965179765L456.6017101710171,206.73852538817283L455.30558055805585,206.67906352719456L454.26867686768674,206.02373953113874L454.61431143114316,205.12641160334098L454.5279027902791,204.5257923092684L455.2191719171918,204.3452288099114L456.42889288928893,205.30622151861914L456.7745274527453,204.3452288099114L458.93474347434744,204.5257923092684L460.6629162916292,203.86286839185172L461.78622862286227,203.98357578483464L462.5639063906391,204.70618110816244L462.73672367236725,204.10420488986387L462.39108910891093,201.79872392147445L463.2551755175518,201.3096708027947L464.1192619261926,199.6494283773862L465.9338433843385,200.81931315665636L467.22997299729974,199.34031526637787L468.0940594059406,199.03067714963268L469.99504950495054,200.14292345163105L471.1183618361836,199.95801893220224L472.24167416741676,200.69651877427788L471.98244824482447,201.12594008049876Z"
                        className="datamaps-subunit AUT"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M470.68631863186323,406.1144382692969L468.9581458145814,404.040054249886L468.0076507650765,402.07142271964966L467.48919891989203,399.43617234310227L466.8843384338434,397.54171173741855L466.10666066606666,393.4746713434185L466.0202520252026,390.3350836221725L465.76102610261023,388.9291176388575L464.8105310531053,387.83446635775704L463.514401440144,385.7416711792652L462.30468046804685,382.6666233532141L461.78622862286227,381.0733497505554L459.79882988298834,378.58777785327294L459.62601260126013,376.6689092866186L460.83573357335734,376.15856755358334L462.2182718271828,375.73370818439594L463.7736273627363,375.8186493546327L465.24257425742576,376.96686865249524L465.5882088208821,376.79658256408214L475.3523852385239,376.6689092866186L476.9941494149415,377.86191374906775L482.7835283528353,378.24604781436324L487.1903690369037,377.22241633126777L489.1777677767777,376.6263593683284L490.73312331233126,376.79658256408214L491.6836183618362,377.3502437769836L491.6836183618362,377.56336935315176L490.3874887488749,378.1179665418575L489.6098109810981,378.1179665418575L488.05445544554453,379.10086792185115L487.1903690369037,378.07528092914885L483.47479747974796,378.97253936947817L481.6602160216022,379.05808757032196L481.5738073807381,388.1406416231473L479.24077407740776,388.2281667555567L479.24077407740776,395.88201669840856L479.24077407740776,405.7907806952052L477.08055805580557,407.1804653902014L475.7844284428443,407.36626933084256L474.3154815481548,406.8556006620346L473.1921692169217,406.67012991022835L472.84653465346537,405.51364864761325L471.8960396039604,404.72987605878063Z"
                        className="datamaps-subunit NAM"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M466.2794779477948,303.36625470774885L466.53870387038705,302.19838940855743L464.98334833483347,302.1566380848784L464.98334833483347,300.5678820268165L464.03285328532854,299.64605637961927L465.06975697569754,296.36508941117444L468.0940594059406,293.9965061132064L468.18046804680466,290.720385868719L469.13096309630964,285.56569902986115L469.6494149414941,284.48366736792195L468.6989198919892,283.6159041020866L468.6125112511251,282.78973044088144L467.74842484248427,282.13622772221095L467.14356435643566,278.10271842940017L469.56300630063004,276.6890679351335L479.1543654365437,281.6562750143876L488.7457245724572,286.55860563453746L488.8321332133213,296.53384501225815L486.7583258325833,296.36508941117444L485.63501350135016,298.21838077907717L485.0301530153015,299.72992149737917L485.5486048604861,300.3166247949171L484.77092709270926,301.07006455947453L485.0301530153015,302.07312665377077L484.42529252925294,303.11618629915336L484.16606660666065,304.03261166891684L485.0301530153015,303.8660889597904L485.462196219622,304.822999011912L485.5486048604861,306.2764726838982L486.4126912691269,306.9813162193567L486.4126912691269,307.5612398694367L484.85733573357334,307.9751811937975L483.6476147614762,308.9676802383657L481.91944194419443,311.64925978626377L479.67281728172816,312.7605656906063L477.3397839783978,312.59601824536446L476.6485148514851,312.84282783232254L476.9077407740774,313.70612237498625L475.6116111611161,314.52755226457225L474.5747074707471,315.4713250494035L471.63681368136815,316.41420879772693L471.03195319531955,315.88138108740003L470.59990999099915,315.79938314600554L470.1678667866787,316.4551842741819L468.18046804680466,316.6190703014121L468.52610261026103,315.96337245508226L467.74842484248427,314.28119884215266L467.48919891989203,313.29513313282695L466.3658865886589,312.8839560211516L464.98334833483347,311.44330223758607L465.501800180018,310.2889799582491L466.62511251125113,310.53647413936085L467.3163816381638,310.3714865998627L468.6125112511251,310.4127366969683L467.3163816381638,308.18206268721565L467.4027902790279,306.5667898792521L467.22997299729974,304.9477082107094Z"
                        className="datamaps-subunit TCD"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M436.64131413141314,305.6124225516313L436.7277227722772,303.9493558212628L433.96264626462647,303.36625470774885L433.8762376237624,302.19838940855743L432.493699369937,300.5678820268165L432.2344734473448,299.43633799633096L432.40729072907294,298.2604251146023L433.96264626462647,298.13428216180716L434.8267326732673,297.25043789206546L438.1102610261026,297.03977853785193L440.2704770477048,296.66037512687933L440.44329432943294,295.097618491361L441.73942394239424,293.44500623300223L441.73942394239424,287.63513582099665L445.1093609360936,286.51548602721317L452.10846084608465,281.4379119720011L460.3172817281728,276.51195768008284L464.1192619261926,277.6174189879573L465.4153915391539,279.0713309011173L467.14356435643566,278.10271842940017L467.74842484248427,282.13622772221095L468.6125112511251,282.78973044088144L468.6989198919892,283.6159041020866L469.6494149414941,284.48366736792195L469.13096309630964,285.56569902986115L468.18046804680466,290.720385868719L468.0940594059406,293.9965061132064L465.06975697569754,296.36508941117444L464.03285328532854,299.64605637961927L464.98334833483347,300.5678820268165L464.98334833483347,302.1566380848784L466.53870387038705,302.19838940855743L466.2794779477948,303.36625470774885L465.5882088208821,303.4912509288797L465.501800180018,304.2823134485892L465.06975697569754,304.3239208633018L463.42799279927993,301.65539276792L462.90954095409546,301.5300147685302L461.0085508550855,302.9077180695863L459.19396939693974,302.19838940855743L457.8978397839784,302.07312665377077L457.2065706570657,302.4071022703175L455.73762376237624,302.3236258607376L454.3550855085508,303.36625470774885L453.14536453645366,303.4495883246943L450.2074707470747,302.1566380848784L449.0841584158416,302.78260291843196L447.8744374437444,302.74089214162575L447.01035103510355,301.7807439894446L444.5909090909091,300.8608753115152L441.9986498649865,301.15371900286846L441.3937893789379,301.697179478319L441.04815481548155,303.11618629915336L440.35688568856887,304.1158565347247L440.1840684068407,306.3179541320746L438.3694869486949,304.90614114093785L437.50540054005404,304.90614114093785Z"
                        className="datamaps-subunit NER"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M402.2506750675068,299.0166612292211L403.11476147614763,298.5546430229129L403.46039603960395,297.0819172557848L404.2380738073807,297.03977853785193L405.96624662466246,297.7135890597495L407.26237623762376,297.25043789206546L408.2128712871287,297.4189039547114L408.5585058505851,296.87118930358116L418.2362736273627,296.82903338317686L418.75472547254725,295.0553138605807L418.32268226822686,294.75907947910525L417.1993699369937,283.8330254969187L415.98964896489645,272.59192457075847L419.7052205220522,272.5471116903262L427.7412241224123,278.27902585043034L435.8636363636364,283.9198401995544L436.468496849685,285.13323847388966L437.93744374437443,285.8249523873804L439.0607560756076,286.2566729909796L439.0607560756076,287.89308992879904L441.73942394239424,287.63513582099665L441.73942394239424,293.44500623300223L440.44329432943294,295.097618491361L440.2704770477048,296.66037512687933L438.1102610261026,297.03977853785193L434.8267326732673,297.25043789206546L433.96264626462647,298.13428216180716L432.40729072907294,298.2604251146023L430.85193519351935,298.2604251146023L430.24707470747074,297.7556734404679L428.95094509450945,298.13428216180716L426.7043204320432,299.1425980338207L426.2722772277228,299.939528992598L424.3712871287129,301.0282327911496L424.02565256525656,301.697179478319L423.0751575157516,302.19838940855743L421.86543654365437,301.8642966481263L421.26057605760576,302.4488361196906L420.91494149414945,304.157474859422L418.9275427542754,306.15201313455344L419.0139513951395,306.9813162193567L418.40909090909093,308.05794087805197L418.495499549955,309.4634342730827L417.5450045004501,309.835038489162L416.9401440144015,310.1239407782893L416.5945094509451,309.09164924595234L415.90324032403237,309.3395261593049L415.471197119712,309.29821897230147L415.0391539153915,310.04140817869467L413.22457245724576,310.00013861308787L412.53330333033307,309.62861385818866L412.18766876687675,309.8763168070371L411.496399639964,309.1329677095734L411.5828082808281,308.4302429075607L411.3235823582358,308.14069110794924L410.8051305130513,308.3888853818458L410.8915391539154,307.602644783761L411.40999099909993,306.9398747418618L410.3730873087309,305.9445296336415L410.11386138613864,305.2386035008484L409.5954095409541,304.6982657851031L409.0769576957696,304.6566826847359L408.5585058505851,304.9892726226117L407.7808280828083,305.3216927103439L407.0895589558956,305.8615183199075L406.0526552655266,305.65394497633764L405.447794779478,305.0308343806119L405.01575157515754,304.9477082107094L404.4108910891089,305.28014941867906L403.9788478847885,305.28014941867906L403.8924392439244,304.365525560489L403.9788478847885,303.61622197243446L403.8060306030603,302.65746197417343L402.85553555355534,301.9896034839559L402.42349234923495,300.5678820268165Z"
                        className="datamaps-subunit MLI"
                        data-info="{}"
                        style={{
                          fill: 'rgba(189, 197, 208, 0.7)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgba(189, 197, 208, 0.7)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                      <path
                        d="M58.17146714671469,287.80712281505373L57.825832583258375,288.2367833624731L57.22097209720971,287.89308992879904L57.307380738073846,287.161806638783L56.96174617461753,286.2566729909796L57.04815481548155,285.9545167615629L57.480198019802,285.5224739283681L57.307380738073846,285.0466902746833L57.39378937893787,284.7869328110043L57.65301530153022,284.83023750651057L58.51710171017106,285.2630256339473L58.9491449144914,285.47924418314324L59.381188118811906,285.8249523873804L59.986048604860514,286.7310388119086L59.899639963996435,286.86031631227974L58.9491449144914,287.42005275696056ZM56.875337533753395,283.8330254969187L56.09765976597669,284.0066356146732L55.66561656165618,283.48557303268143L55.40639063906394,283.2682571065064L55.40639063906394,283.09431628394617L55.66561656165618,282.87677963901945L56.443294329433,283.13780884931384L57.13456345634569,283.5290215865715ZM55.319981998199864,282.4413352911356L55.233573357335786,282.74619842066966L53.93744374437449,282.65911951333067L54.11026102610265,282.3541867170055ZM53.15976597659767,282.09262087340875L52.98694869486951,282.22342635509415L52.8141314131413,282.1798295477855L52.03645364536453,282.09262087340875L51.69081908190822,281.5252724628635L51.60441044104414,281.4379119720011L52.209270927092746,281.08826548878324L52.46849684968498,281.21942135516304ZM49.098559855985684,280.3879824657816L48.75292529252931,280.65074420266325L47.97524752475249,280.16887074173275L48.061656165616625,279.99348690648446L48.49369936993702,279.73025296352324L49.01215121512155,279.7741385081002ZM270.39108910891093,212.82319223252546L270.8231323132313,213.91432114098706L268.23087308730874,215.56806297570245L265.7250225022502,216.70052438045127L263.2191719171917,217.7142301725887L261.9230423042304,219.6706973793992L261.5774077407741,220.39255816674108L261.49099909991,222.10360556423382L262.3550855085509,223.85493503551055L263.3055805580558,223.90942442532793L263.04635463546356,222.76210758741297L263.73762376237624,223.47310552959894L263.5648064806481,224.39918315528647L261.9230423042304,224.88778577885796L260.79972997299734,224.8335534132432L259.0715571557156,225.37524117940615L258.03465346534654,225.53747289852942L256.5657065706571,225.69957845155324L254.5783078307831,226.61580899719505L258.1210621062106,226.02341235125272L258.81233123312336,226.61580899719505L255.44239423942398,227.58159558428656L253.97344734473447,227.58159558428656L253.97344734473447,227.20653812806495L253.28217821782178,228.06283573613533L253.97344734473447,228.22300628834452L253.45499549954997,230.50564765039223L251.72682268226825,232.86882413557868L251.5540054005401,232.08395204180448L251.03555355535553,231.92663781608832L250.25787578757877,231.13835180110334L250.6899189918992,232.81658700714448L251.29477947794783,233.33839843896453L251.3811881188119,234.53388547381718L250.6035103510351,235.722951478192L249.22097209720977,238.13332737204522L249.04815481548158,237.98023962667412L249.73942394239427,235.92909924288492L248.52970297029708,234.79292001306695L248.2704770477048,232.2411526161266L247.83843384338437,233.54677592835236L248.2704770477048,235.5166132288013L246.71512151215123,234.99993002228092L248.35688568856887,235.98060649572554L248.443294329433,238.8972261688836L249.13456345634566,239.1005017066666L249.39378937893792,240.11418794270128L249.73942394239427,243.0790228524438L248.2704770477048,245.26608885202867L245.7646264626463,246.15508476667708L244.20927092709272,247.82548775179188L242.9995499549955,248.02125994263145L241.7898289828983,249.09524701129504L241.44419441944197,250.0675974150222L238.76552655265527,251.90479583691797L237.3829882988299,253.2501166065658L236.2596759675968,254.9220196035472L235.91404140414045,256.91442165476747L236.34608460846087,258.8452567163381L237.12376237623764,261.22827236602114L238.24707470747077,263.12951395838576L238.24707470747077,264.3286991423005L239.37038703870388,267.4877071279977L239.2839783978398,269.25874621925414L239.1975697569757,270.2984868298198L238.59270927092712,271.91908125416774L237.90144014401443,272.2781047007171L236.6917191719172,271.9639809867571L236.34608460846087,270.79454321642123L235.39558955895595,270.1630635568817L234.0994599459946,267.85183097496935L232.9761476147615,265.7979099151987L232.63051305130514,264.74265539458366L233.14896489648967,262.9445822895875L232.457695769577,261.41431995696695L230.55670567056708,259.1266763234917L229.69261926192624,258.704438785349L227.27317731773178,259.96921832887534L226.84113411341136,259.828972429628L225.63141314131414,258.5165689969688L224.1624662466247,257.85800575227256L221.39738973897394,258.18748612962935L219.32358235823585,257.85800575227256L217.50900090009003,258.09338954479756L216.472097209721,258.5165689969688L216.90414041404142,259.22041898379285L216.90414041404142,260.34286232570224L217.33618361836184,260.90239338082995L216.90414041404142,261.2747957581986L216.04005400540058,260.85580841222225L215.08955895589563,261.36781954708835L213.36138613861388,261.2747957581986L211.63321332133216,259.828972429628L209.47299729973,260.2028045111364L207.74482448244825,259.5482678562728L206.2758775877588,259.7354358056375L204.2020702070207,260.3895326549146L202.0418541854186,262.435405727736L199.70882088208825,263.59132550363904L198.32628262826285,264.8805112418222L197.80783078307834,266.11833135759406L197.80783078307834,267.9882655535586L197.89423942394242,269.25874621925414L198.32628262826285,270.1630635568817L197.462196219622,270.2533521984983L195.73402340234026,269.6660122271381L193.83303330333032,268.8509467487108L193.14176417641764,267.57877887549296L192.62331233123314,265.7062976373846L191.24077407740774,264.1445305581696L190.3766876687669,262.5280505691161L189.1669666966697,260.6693912031846L187.52520252025204,259.5482678562728L185.53780378037806,259.5950716981583L184.0688568856886,261.786048473569L182.08145814581462,260.9489706292379L180.7853285328533,260.10939354542825L180.1804680468047,258.61051999215397L179.40279027902793,257.15062676247123L178.02025202520255,255.92008382534104L176.72412241224126,255.01723570438668L175.86003600360038,254.063519516773L171.71242124212426,254.063519516773L171.71242124212426,255.20756492603508L169.81143114311436,255.20756492603508L165.05895589558958,255.20756492603508L159.52880288028803,253.2501166065658L155.9860486048605,251.85661814524474L156.15886588658867,251.27777562951687L153.1345634563457,251.61559337467162L150.36948694869488,251.80843137626846L150.0238523852385,250.35856930947273L148.46849684968498,248.70524396549297L147.34518451845184,248.36348818626135L147.0859585958596,247.53153736420148L145.70342034203418,247.38443024746218L144.83933393339333,246.59836320713907L142.59270927092712,246.302934053486L141.9878487848785,245.85911564460275L141.72862286228627,244.2744511763563L139.39558955895592,241.27445372225873L137.40819081908194,237.11078418153932L137.49459945994602,236.39223855847285L136.37128712871288,235.41337247211146L134.5567056705671,232.81658700714448L134.21107110711074,230.29433272793767L132.91494149414945,228.59626794046213L133.43339333933397,225.96947488161462L133.3469846984699,223.19993593550527L132.6557155715572,220.72485653221054L133.51980198019805,217.60185124960697L133.86543654365443,214.6003221210255L134.1246624662466,211.49408512672883L133.69261926192627,206.85739282552703L132.91494149414945,203.8024852924284L132.22367236723676,202.16466346682822L132.56930693069307,201.4320560037886L136.02565256525656,202.65145680405732L137.3217821782178,206.02373953113874L137.9266426642664,205.12641160334098L137.49459945994602,202.16466346682822L136.71692169216925,199.21652315803857L143.5432043204321,199.21652315803857L150.62871287128718,199.21652315803857L152.96174617461753,199.21652315803857L160.30648064806485,199.21652315803857L167.39198919891987,199.21652315803857L174.5639063906391,199.21652315803857L181.82223222322233,199.21652315803857L189.94464446444647,199.21652315803857L198.15346534653466,199.21652315803857L203.0787578757876,199.21652315803857L203.1651665166517,197.7868251138115L203.94284428442847,197.7868251138115L204.3748874887489,199.77292716937572L205.1525652565257,200.38917244775467L206.7943294329433,200.6350907325153L209.21377137713773,201.18720406928364L211.54680468046806,202.3473613614042L213.53420342034207,201.85976431783374L216.472097209721,202.77295504568906L217.24977497749776,202.77295504568906L219.40999099909993,201.73766329261505L221.6566156615662,203.01571244994744L223.98964896489653,204.40543608383908L225.97704770477048,205.60552130820957L227.79162916291634,206.73852538817283L228.05085508550854,207.6282107380623L228.5693069306931,207.98291532502103L228.48289828982902,208.33695701839747L229.0877587758776,208.45482422620682L229.51980198019805,208.1010027002984L229.69261926192624,208.92556312682575L230.12466246624666,209.45375633448378L230.81593159315935,209.45375633448378L231.16156615661566,209.86356446648728L230.90234023402343,210.50577959598039L233.4081908190819,212.130885073413L233.92664266426644,215.17015897485402L234.3586858685869,218.05098702873687L233.66741674167417,220.0041849451904L232.54410441044107,221.82860207418366L232.02565256525654,222.98113852341493L231.93924392439246,223.30924732093465L232.19846984698472,223.74591305596806L233.06255625562557,224.23605914253358L233.66741674167417,224.23605914253358L236.43249324932495,222.5428423219529L238.93834383438346,222.04863451302197L242.04905490549058,220.39255816674108L242.04905490549058,220.0597126052263L241.8762376237624,219.05786411197755L241.53060306030605,218.44315291209037L242.56750675067508,217.8826797306623L244.9005400540054,217.8826797306623L247.14716471647165,217.8826797306623L247.92484248424844,216.5875699071758L248.1840684068407,216.30490123686508L250.7763276327633,213.91432114098706L251.81323132313233,213.28336112598296L255.44239423942398,213.28336112598296L259.84923492349236,213.28336112598296L260.10846084608465,212.41964723679575L260.8861386138614,212.24644166550814L261.9230423042304,211.72589193302372L262.7871287128713,210.1557475159096L263.478397839784,207.45060873365776L265.29297929792983,204.76627196833377L266.1570657065707,205.72510744072298L267.71242124212426,205.12641160334098L268.8357335733574,206.14305943472505L268.8357335733574,210.91334454964527ZM64.30648064806485,166.64677141228677L61.88703870387042,168.35896060037396L60.67731773177326,167.24434431073473L60.33168316831683,165.14322022812456L62.491899189919025,163.54943113764202L63.78802880288032,162.8615671547083L65.3433843384339,163.1676443693674L66.38028802880291,164.53790059748084ZM34.14986498649864,153.80355651492872L32.59450945094511,154.5312297893944L31.03915391539158,153.6413980468964L29.57020702070207,152.3381321652593L31.989648964896503,151.51811506750954L33.890639063906406,152.01063485112758ZM19.37398739873987,134.05331566301498L20.84293429342938,135.15313389708368L22.31188118811889,134.60421041515195L24.299279927992814,135.9728574355547L26.632313231323167,136.69784925691877L26.45949594959501,137.32942783375248L24.644914491449185,138.40614876700386L22.83033303330336,137.23936072790164L21.87983798379838,136.24512994956885L19.80603060306032,136.60741188691037L19.201170117011714,136.15442599752217ZM93.1669666966697,97.83849123548279L93.08055805580557,121.50044620130856L93.08055805580557,151.92865458465414L95.50000000000006,152.09257269143393L97.83303330333035,153.3978495582968L99.47479747974796,155.49631551407913L101.63501350135016,158.59317602746808L103.96804680468045,155.97667660220924L106.38748874887489,154.3698120508261L107.59720972097216,156.85360365591134L109.23897389738977,158.7503874794753L111.48559855985599,160.85784281518409L112.9545454545455,164.0824301242317L115.37398739873987,169.1715702501287L119.52160216021599,171.87590744308633L119.52160216021599,174.53689940530018L118.22547254725475,176.59333131078128L116.92934293429346,175.03559341527992L114.76912691269132,173.67851990088724L114.07785778577863,169.906845406289L110.96714671467146,166.42211829917568L109.67101710171016,162.1707737597266L107.424392439244,161.86280634142318L103.62241224122408,161.70860258952416L100.77092709270931,160.39189591956682L95.84563456345637,155.57647618758088L93.51260126012602,154.69248399396577L89.27857785778582,152.9911033419013L85.99504950495054,153.3978495582968L81.24257425742576,151.18891454517768L78.39108910891093,149.1157117565898L75.79882988298829,150.11425050138854L76.2308730873088,153.47907389196195L74.93474347434744,153.80355651492872L72.1696669666967,154.7730498920545L70.00945094509456,156.37587641946058L67.41719171917191,157.40915504598962L67.0715571557156,154.61187730919906L68.1084608460846,149.8652083485807L70.70072007200724,148.3626293697089L70.00945094509456,147.0994151021256L66.98514851485146,149.8652083485807L65.3433843384339,153.07253602425138L61.88703870387042,156.45559682755334L63.61521152115216,158.7503874794753L61.368586858685944,162.01686328717588L58.77632763276324,163.93032289795607L56.356885688568866,165.29419967092517L55.75202520252026,167.24434431073473L52.03645364536453,169.53961744935208L51.258775877587766,171.58566705066457L48.49369936993702,173.39140986668713L46.76552655265533,173.03182561687834L44.605310531053135,174.25126258609936L42.099459945994624,175.67459792920863L40.11206120612064,177.08596325885685L36.0508550855086,178.20660407979304L35.61881188118815,177.57715933621324L38.29747974797482,175.60371754257298L40.63051305130517,174.32271755276403L43.13636363636368,171.94838831548083L46.160666066606666,171.51302755647907L47.370387038703825,169.68660669199826L50.653915391539215,167.09515523640712L51.17236723672369,166.19715635658685L52.98694869486951,164.61368862529224L53.41899189918996,161.24510715165468L54.62871287128718,158.5145125554284L51.863636363636374,159.9245988158033L51.08595859585961,159.0643496600015L49.78982898289837,160.7802783706589L48.23447344734484,158.43581052656324L47.54320432043215,160.08051511394518L46.67911791179125,157.80480087164793L44.25967596759676,159.61231269651714L42.79072907290731,159.61231269651714L42.531503150315075,156.85360365591134L42.963546354635525,155.17526926931174L41.494599459946016,153.3978495582968L38.29747974797482,154.3698120508261L36.31008100810084,152.09257269143393L34.66831683168323,150.94156345058235L34.66831683168323,148.1107981942393L32.76732673267327,145.99633717663949L33.717821782178305,143.07400747364125L35.70522052205223,140.184166659801L36.569306930693074,137.5094042662724L38.47029702970298,137.14924093647625L40.11206120612064,137.95842819328908L42.099459945994624,135.42686134687065L43.82763276327637,135.88199268320187L45.64221422142214,134.14526902352728L45.210171017101686,131.64293297283842L43.82763276327637,130.70564394621056L45.64221422142214,128.52774640847545L44.173267326732685,128.62308865089773L41.58100810081015,129.85712953498367L40.889738973897465,131.08125076146936L38.98874887488745,129.85712953498367L35.61881188118815,130.4233304242646L32.07605760576058,129.09890508802636L31.03915391539158,126.80127083985937L28.01485148514854,123.48547543934819L31.384788478847895,121.00007399381485L36.74212421242129,118.06458937379628L38.72952295229527,118.06458937379628L38.383888388838955,121.10028165133346L43.48199819982,120.89979953322779L41.494599459946016,117.14176987179627L38.55670567056711,114.75726018962382L36.828532853285424,111.69534975696266L34.58190819081915,109.00421649841681L31.29837983798376,106.92578933754027L32.59450945094511,103.47067204937625L36.828532853285424,103.24495869258473L39.85283528352841,100.1634687538521L40.45769576957696,96.78010474519738L42.87713771377139,93.43753213736974L45.29657965796582,92.71121011604933L49.78982898289837,89.39723440365054L52.03645364536453,89.89297627843101L55.66561656165618,86.00602672497931L59.29477947794783,87.52300880819757L61.109360936093594,90.87942489551403L62.14626462646271,89.52132826195157L66.20747074707475,89.89297627843101L66.0346534653466,91.6149028153809L69.75022502250226,92.8325150479788L72.1696669666967,92.10316808443827L77.2677767776778,94.28036692540937L81.84743474347437,94.99894754943438L83.66201620162019,95.95159508557842L86.85913591359139,94.75981293787069L90.48829882988304,96.89808151434988Z"
                        className="datamaps-subunit USA"
                        data-info='{"active":{"value":"392","percent":"0.9","isGrown":true},"new":{"value":"1,408","percent":"2.2","isGrown":true},"fillKey":"MAJOR","short":"us","customName":"United States"}'
                        style={{
                          fill: 'rgb(79, 70, 229)',
                          strokeWidth: '1px',
                          strokeOpacity: 1,
                          stroke: 'rgba(0, 0, 0, 0.09)',
                          fillOpacity: 1,
                        }}
                        data-previousattributes='{"fill":"rgb(79, 70, 229)","stroke":"rgba(0, 0, 0, 0.09)","stroke-width":"1px","fill-opacity":"1"}'
                      />
                    </g>
                    <g id className="update" />
                  </svg>
                </div>
                <div style={{ position: 'absolute', right: 0 }}>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Product name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Color
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            Apple MacBook Pro 17
                          </th>
                          <td className="px-6 py-4">Silver</td>
                          <td className="px-6 py-4">Laptop</td>
                          <td className="px-6 py-4">$2999</td>
                        </tr>
                        <tr className="bg-white border-b ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            Microsoft Surface Pro
                          </th>
                          <td className="px-6 py-4">White</td>
                          <td className="px-6 py-4">Laptop PC</td>
                          <td className="px-6 py-4">$1999</td>
                        </tr>
                        <tr className="bg-white ">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                          >
                            Magic Mouse 2
                          </th>
                          <td className="px-6 py-4">Black</td>
                          <td className="px-6 py-4">Accessories</td>
                          <td className="px-6 py-4">$99</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}


export default HrSummaryReport

