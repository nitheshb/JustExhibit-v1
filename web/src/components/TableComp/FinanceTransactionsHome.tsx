/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { Link, routes } from '@redwoodjs/router'

import { useState, useEffect } from 'react'
import { DocumentIcon, AdjustmentsIcon } from '@heroicons/react/outline'
import { startOfDay } from 'date-fns'
import { MetaTags } from '@redwoodjs/web'
import {
  streamGetAllTransactions,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { supabase } from 'src/context/supabase'
import CSVDownloader from 'src/util/csvDownload'
import {
  SlimDateSelectBox,
  SlimSelectBox,
} from 'src/util/formFields/slimSelectBoxField'
import {
  timeConv,
  prettyDate

} from 'src/util/dateConverter'
import SiderForm from '../SiderForm/SiderForm'
import { CountUpComp } from '../comps/countUpComp'

const FinanceTransactionsHome = ({ leadsTyper }) => {
  const d = new window.Date()
  const { user } = useAuth()
  const { orgId } = user
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)
  const [openTransactionDetails, setOpenTransactionDetails] = useState(false)

  // kanban board
  const [ready, setReady] = useState(false)

  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  const [selUserProfile, setSelUserProfile] = useState({})
  const [finFetchedData, setFinFetchedData] = useState([])
  const [finSelData, setFinSelData] = useState([])

  const [serialLeadsData, setSerialLeadsData] = useState([])
  const [showSettings, setShowSettings] = useState(true)
  const [transactionData, setTransactionData] = useState({})
  const [sourceDateRange, setSourceDateRange] = React.useState(
    startOfDay(d).getTime()
  )

  const [value, setValue] = useState('review')
  const tabHeadFieldsA = [
    { lab: 'All Transactions', val: 'all' },
    { lab: 'Reviewing', val: 'review' },
    { lab: 'Received', val: 'received' },
    { lab: 'Rejected', val: 'rejected' },
  ]
  useEffect(() => {
    getLeadsDataFun()
  }, [])

  useEffect(() => {
    // getFinanceTransactionsByStatus(orgId, 'all')
    if(value === 'all'){
      setFinSelData(finFetchedData)
    }else{

    const x =  finFetchedData?.filter((d) => d.status === value)
    setFinSelData(x)

    }
  }, [finFetchedData,value])

  useEffect(() => {
    // Subscribe to real-time changes in the `${orgId}_accounts` table
    const subscription = supabase
      .from(`${orgId}_accounts`)
      .on('*', (payload) => {
        // When a change occurs, update the 'leadLogs' state with the latest data
        console.log('account records', payload)
        // Check if the updated data has the id 12
        const updatedData = payload.new
        const { id } = payload.old
        const updatedLeadLogs = [...finFetchedData]
        setFinFetchedData((prevLogs) => {
          const existingLog = prevLogs.find((log) => log.id === id)

          if (existingLog) {
            console.log('Existing record found!')
            const updatedLogs = prevLogs.map((log) =>
              log.id === id ? payload.new : log
            )
            return [...updatedLogs]
          } else {
            console.log('New record added!')
            return [...prevLogs, payload.new]
          }
        })
        // const index = updatedLeadLogs.findIndex((log) => log.id === id)
        // if (index !== -1) {
        //   console.log('check it ..........!')
        //   updatedLeadLogs[index] = updatedData
        // } else {
        //   // Add new record to the 'leadLogs' state
        //   updatedLeadLogs.push(updatedData)
        // }

        // // Update the 'leadLogs' state with the latest data
        // setFinFetchedData(updatedLeadLogs)
      })
      .subscribe()

    // Clean up the subscription when the component unmounts
    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])

  const rowsCounter = (parent, searchKey) => {
    return parent?.filter((item) => {
      if (searchKey === 'all') {
        return item
      } else if (item?.status?.toLowerCase() === searchKey.toLowerCase()) {
        console.log('All1', item)
        return item
      }
    })
  }

  const totalAmountCounter = (parent, searchKey) => {
    return searchKey === 'all' ? finFetchedData?.reduce((a, b) => a + b.totalAmount, 0) : parent?.filter((item) => item?.status?.toLowerCase() === searchKey?.toLowerCase())?.reduce((a, b) => a + b.totalAmount, 0)

  }

  const getLeadsDataFun = async () => {
    console.log('login role detials', user)
    const { access, uid } = user

    const steamLeadLogs = await streamGetAllTransactions(
      orgId,
      'snap',
      {
        uid,
      },
      (error) => []
    )
    await setFinFetchedData(steamLeadLogs)

    return


    // if (access?.includes('manage_leads')) {
    //   const unsubscribe = getFinanceTransactionsByStatus(
    //     orgId,
    //     async (querySnapshot) => {
    //       const usersListA = querySnapshot.docs.map((docSnapshot) => {
    //         const x = docSnapshot.data()
    //         x.id = docSnapshot.id
    //         return x
    //       })
    //       // setBoardData
    //       console.log('my Array data is ', usersListA, finFetchedData)
    //       // await serealizeData(usersListA)
    //       await setFinFetchedData(usersListA)
    //       await console.log('my Array data is set it', finFetchedData)
    //     },
    //     {
    //       status: [
    //         'latest',
    //         'review',
    //         'review',
    //         'received',
    //         'rejected',
    //         '',
    //         // 'booked',
    //       ],
    //     },
    //     () => setFinFetchedData([])
    //   )
    //   return unsubscribe
    // } else {
    //   const unsubscribe = getFinanceTransactionsByStatus(
    //     orgId,
    //     async (querySnapshot) => {
    //       const usersListA = querySnapshot.docs.map((docSnapshot) => {
    //         const x = docSnapshot.data()
    //         x.id = docSnapshot.id
    //         return x
    //       })
    //       // setBoardData
    //       console.log('my Array data is ', usersListA)
    //       await serealizeData(usersListA)
    //       await setFinFetchedData(usersListA)
    //     },
    //     {
    //       uid: uid,
    //       status: [
    //         'new',
    //         'review',
    //         'review',
    //         'received',
    //         'rejected',
    //         '',
    //         // 'booked',
    //       ],
    //     },
    //     () => setFinFetchedData([])
    //   )
    //   return unsubscribe
    // }

    // await console.log('leadsData', leadsData)
  }










  const serealizeData = (array) => {
    // let newData =
    const x = [
      'new',
      'review',
      'received',
      'rejected',
      '',
      // 'booked',
    ].map((status) => {
      const items = array.filter((data) => data.Status.toLowerCase() == status)

      return { name: status, items }
    })
    setSerialLeadsData(x)
  }

  const selUserProfileF = (title, data) => {
    setAddLeadsTypes(title)
    setisImportLeadsOpen(true)
    setSelUserProfile(data)
  }

  const viewTransaction = (docData) => {
    setTransactionData(docData)
    setOpenTransactionDetails(!openTransactionDetails)
  }
  return (
    <>
      <div className="">
        <div className="">
          <div
            className="
            "
          >
            <div className="items-center justify-between  py-2 px-2  pl-[1%] ">
              {/* <div>
                <h2 className="text-lg font-semibold text-gray-900 leading-light py-2 ">
                  Accounts Transactions Space
                </h2>
              </div> */}
              <div className="flex flex-row items-center">
                <section className="min-w-[150px]">
                  <div className="flex flex-col ml-3">
                    <span className="text-[56px] text-black font-bold">0</span>
                    <span className="text-[18px] text-black">Todo Tasks</span>
                  </div>
                  {/* <CircleProgress /> */}
                </section>
                {/* <SemiCircleProgress /> */}
                <div className="flex flex-col">
                  {/* <div className="flex flex-row">
                    <h2 className="headTxt1 font-semibold text-[11px] ">
                      TOTAL COLLECTION
                    </h2>
                    <span className="headTxt1 font-semibold text-[11px] ml-4 bg-[#d6e9ed] text-[#53a0a3] px-2 rounded-md ">
                      10
                    </span>
                  </div> */}
                  <section className="flex flex-row justify-between">
                    <section className="flex flex-row mt-2 mr-1  mb-1 leading-7 text-gray-900  rounded-lg  ">
                      {[
    { lab: 'All Payments', val: 'all' },
    { lab: 'Reviewing', val: 'review' },
    { lab: 'Received', val: 'received' },
    { lab: 'Rejected', val: 'rejected' },
  ].map((dat, i) => {
                        return (
                          <div className=" m-1 cursor-pointer" key={i}  onClick={() => setValue(dat?.val)}>
                            <div className={`border-[#E5EAF2]  rounded-xl border w-60 p-2  ${value === dat?.val ? ' bg-[#ffe4c4]': 'bg-white'}`}>
                              <section>
                                <div className='flex flex-row justify-between'>
                                <span className="flex mt-[13px] ml-[12px] justify-center items-center w-6 h-6 bg-[#3cdc94] rounded-full ring-8 ring-white  ">
                                  <DocumentIcon className=" w-3 h-3" />
                                </span>
                                <div className="px-2 mt-[13px] flex flex-row justify-between">
                                  <h3 className=" css-5mn5yy">₹<CountUpComp value={totalAmountCounter(finFetchedData, dat?.val)} /></h3>
                                </div>
                               </div>
                                <div className="flex flex-row justify-between">
                                  <span className="css-1lpgd8m text-[#209653] text-black text-[16px] pt-4 ml-2">
                                    {dat?.lab}
                                  </span>
                                  <div className=" text-gray-800 px-1  rounded ml-[4px] text-[10px]  mt-3 mr-2">
                                  {
                                    rowsCounter(finFetchedData, dat?.val)
                                      ?.length
                                  }
                                </div>
                                </div>

                                <div
                                  className="flex flex-row justify-between bg-[#F7F7F7]"
                                  style={{
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                  }}
                                ></div>
                              </section>
                            </div>
                          </div>
                        )
                      })}
                    </section>
                  </section>
                </div>
              </div>

              <div className="flex px-6">
                {leadsTyper == 'inProgress' && (
                  <span className="inline-flex p-1  bg-gray-200 ">
                    <button
                      className={`px-2 py-1  rounded ${
                        ready ? 'bg-white shadow' : ''
                      }`}
                      onClick={() => setReady(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                        />
                      </svg>
                    </button>
                    <button
                      className={`px-2 py-1  rounded ${
                        !ready ? 'bg-white shadow' : ''
                      }`}
                      onClick={() => setReady(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </span>
                )}
                <></>
              </div>
            </div>

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />

            {!ready && (
              <div className="overflow-hidden  ">
                <div className="flex flex-col app-bg-white-1  pt-4  bg-[#FFF] pb-10">
                  <div className="flex flex-row ">
                    <span className="text-lg font-bold app-color-black"></span>
                  </div>
                  <div className="">
                    <div className="flex flex-row justify-between ">
                      <ul
                        className="flex flex-wrap -mb-px "
                        id="myTab"
                        data-tabs-toggle="#myTabContent"
                        role="tablist"
                      >
                        {tabHeadFieldsA.map((fieldHead, i) => {
                          return (
                            <li key={i} className="mr-2" role="presentation">
                              <button
                                className={`inline-block pt-3 pb-2  mx-2 text-sm font-medium text-center text-black rounded-t-lg border-b-[3px]  hover:text-gray-800    ${
                                  value === fieldHead?.val
                                    ? 'border-black text-gray-800'
                                    : 'border-transparent'
                                }`}
                                type="button"
                                role="tab"
                                onClick={() => setValue(fieldHead?.val)}
                              >
                                <span
                                  className={`font-PlayFair font-bold ${
                                    value === fieldHead.val
                                      ? 'text-[#0080ff] text-gray-800'
                                      : ''
                                  }`}
                                >
                                  {' '}
                                  {`${fieldHead.lab} `}
                                </span>
                                <span className="border border-[#29b777] text-gray-800 px-1 py-1 rounded-full ml-[4px] text-[10px] ">
                                  {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                                  {/* {statusSepA[0][d.val]?.length || 0} */}
                                  {
                                    rowsCounter(finFetchedData, fieldHead?.val)
                                      ?.length
                                  }
                                </span>
                                {/*
                        <div className="px-2 mt-1 text-[9px] text-black  rounded-full">
                          <span className="bg-gray-100 px-2 py-1 rounded-full">
                            {rowsCounter(leadsFetchedData, d.val).length}
                          </span>
                        </div> */}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                      <div className="flex flex-row mr-4">
                        <span
                          className="flex mt-[4px] mr-[0px] justify-center items-center w-6 h-6 bg-[#3cdc94] rounded-full ring-8 ring-[#3cdc94] cursor-pointer "
                          onClick={() => {
                            setShowSettings(!showSettings)
                          }}
                        >
                          <AdjustmentsIcon className=" w-4 h-4" />
                        </span>
                        <button
                          onClick={() => setisImportLeadsOpen(true)}
                          className={`flex items-center ml-5 pl-2 mt-2 pr-4 py-1 max-h-[30px] mt-[2px]  text-sm font-medium text-white bg-gray-800 rounded-[4px] hover:bg-gray-700  `}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 22 22"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>

                          <span className="ml-1">New</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`${
                      showSettings ? 'hidden' : ''
                    } flex flex-row py-2 `}
                  >
                    <span className="flex ml-5 mr-5 bg-gray-50 border border-gray-300 border-solid box-border w-1/3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4  mt-[10px] mx-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      <input
                        type="text"
                        id="globalSearch"
                        placeholder="Search Stall No, Customer name, Phone no, Dues..."
                        // onChange={searchKeyField}
                        autoComplete="off"
                        // value={searchKey}
                        className="w-52 bg-transparent focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none text-sm leading-7 text-gray-900 w-4/5 relative"
                      />
                    </span>
                    <div className="mt-1 mr-2">
                      <SlimSelectBox
                        name="project"
                        label=""
                        className="input "
                        onChange={(value) => {
                          // setSelProject(value)
                          // formik.setFieldValue('project', value.value)
                        }}
                        value={'alltransactions'}
                        // options={aquaticCreatures}
                        options={[
                          ...[
                            {
                              label: 'All Transactions',
                              value: 'alltransactions',
                            },
                            { label: 'Cheque', value: 'cheque' },
                            { label: 'Imps', value: 'imps' },
                            { label: 'Neft', value: 'neft' },
                            { label: 'Rtgs', value: 'rtgs' },
                            { label: 'Cash', value: 'cash' },
                          ],
                        ]}
                      />
                    </div>
                    <div>
                      <SlimDateSelectBox
                        onChange={async (value) => {
                          setSourceDateRange(value)
                          //getLeadsDataFun()
                        }}
                        label={sourceDateRange}
                        placeholder={undefined}
                      />
                    </div>
                    <span style={{ display: '' }}>
                      <CSVDownloader
                        className="mr-6 h-[20px] w-[20px] mt-2"
                        downloadRows={finFetchedData}
                        style={{ height: '20px', width: '20px' }}
                      />
                    </span>
                    <span className="mt-1"> clear</span>
                  </div>
                  <div className="flex flex-row bg-white px-[4px] py-2 relative">
                    <div className="flex w-full  ">
                      <table className="w-full pt-[1px]">
                        <thead className="">
                          <tr className="p-2">
                            <th className="w-2"></th>
                            <th className="text-left text-xs app-color-black py-2">
                              <span className="ml-4">From</span>
                            </th>
                            <th className="text-left text-xs app-color-black py-2">
                              <span className="ml-4">Dated as</span>
                            </th>
                            <th className="text-left text-xs app-color-black py-2">
                              Mode
                            </th>
                            <th className="text-left text-xs app-color-black py-2">
                              Details
                            </th>
                            <th className="text-right text-xs app-color-black py-2">
                              <span className="mr-10">Amount</span>
                            </th>
                            <th className="text-left text-xs app-color-black py-2">
                              <span className="mr-10">Assigned to</span>
                            </th>
                            <th className="text-left text-xs app-color-black py-2">
                              <span className="mr-10">Status</span>
                            </th>

                            <th className="text-left text-xs app-color-black py-2">
                              Comments
                            </th>

                            <th></th>
                          </tr>
                        </thead>
                        <tbody className="p-2">
                          {finSelData?.map((finData, i) => (
                            <tr
                              className="app-border-1 border-y border-slate-200 "
                              key={i}
                              onClick={() => viewTransaction(finData)}
                            >
                              <td className="pl-3 ">
                                <div className="flex justify-center text-right items-center rounded-md w-2 h-8 app-bg-yellow-2 app-color-yellow-1 text-xs font-semibold">
                                  {i + 1}
                                </div>
                                {/* <div
                                className={`${
                                  finData?.status === 'received'
                                    ? 'bg-green-700'
                                    : finData?.status === 'rejected'
                                    ? 'bg-yellow-600'
                                    : 'bg-violet-600'
                                }   w-24 text-xs font-semibold px-3 py-0.5 rounded-br-md rounded-tl-md text-white`}
                              >
                                {finData?.status?.toLocaleUpperCase()}
                              </div> */}
                              </td>
                              <td>
                                <div className="flex flex-row py-2 ml-4">
                                  <div className="mr-2 w-[3px] rounded-2xl  bg-violet-300 "></div>
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm app-color-black">
                                      {finData?.customerName ||
                                        finData?.fromObj?.name ||
                                        'NA'}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.towards}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.fromObj?.bankName}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.fromObj?.branch}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="flex flex-row ml-4 py-2">
                                  <span className="font-normal text-xs app-color-gray-1">
                                    {prettyDate(finData?.txt_dated)}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="flex flex-row py-2">
                                  {/* <div className="mr-2 w-[3px]  bg-gray-100 "></div> */}
                                  <div className="flex flex-col">
                                    <span className="font-semibold text-sm app-color-black">
                                      {finData?.mode}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.txt_id}
                                    </span>
                                    {/* <span className="font-normal text-xs app-color-gray-1">
                                      {timeConv(finData?.txt_dated)}
                                    </span> */}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="flex flex-row py-2">
                                  {/* <div className="mr-2 w-[3px]  bg-gray-100 "></div> */}
                                  <div className="flex flex-col">
                                    <span className="font-normal text-xs app-color-gray-1">
                                      {finData?.txt_id}
                                    </span>
                                    <span className="font-normal text-xs app-color-gray-1">
                                     {timeConv(finData?.txt_dated)}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="text-right">
                                <span className="text-right font-semibold text-sm app-color-gray-1 mr-10">
                                  ₹ {finData?.totalAmount?.toLocaleString('en-IN')}
                                </span>
                              </td>
                              <td className="text-left">
                                <span className="text-left font-semibold text-sm app-color-gray-1 mr-10">
                                  {finData?.assignedTo || 'NA'}
                                </span>
                              </td>

                              <td>
                                <span className=" text-left font-normal text-md app-color-gray-1">
                                  {finData?.status}
                                </span>
                              </td>
                              <td>
                                <span className="font-semibold text-left text-sm app-color-black">
                                  NA
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* {!ready && (
              <FinanceTableView
                leadsFetchedData={leadsFetchedData}
                setisImportLeadsOpen={setisImportLeadsOpen}
                selUserProfileF={selUserProfileF}
                leadsTyper={leadsTyper}
              />
            )} */}
          </div>
        </div>
      </div>
      <SiderForm
        open={openTransactionDetails}
        setOpen={setOpenTransactionDetails}
        title={'Transaction'}
        customerDetails={selUserProfile}
        widthClass="max-w-4xl"
        transactionData={transactionData}
      />
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={'New Transaction'}
        customerDetails={selUserProfile}
        widthClass="max-w-4xl"
        transactionData={transactionData}
      />
    </>
  )
}

export default FinanceTransactionsHome
