/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react'

import { ArrowNarrowRightIcon, PlusIcon } from '@heroicons/react/solid'
import { PaperClipIcon, UsersIcon } from '@heroicons/react/solid'
import { TabList } from '@mui/lab'
import { Box, Card, Grid, styled } from '@mui/material'
import { useTranslation } from 'react-i18next' // styled components

import { streamGetAllTaskManTasks } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { supabase } from 'src/context/supabase'
import {
  formatToPhone,
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDateTime,
} from 'src/util/dateConverter'
import uniqueId from 'src/util/generatedId'

import LLeadsTableBody from '../LLeadsTableBody/LLeadsTableBody'

import SiderForm from './SiderForm/SiderForm'

const torrowDate = new Date(
  +new Date().setHours(0, 0, 0, 0) + 86400000
).getTime()

const TodoListView = ({
  taskListA,
  setisImportLeadsOpen,
  selUserProfileF,
  selTaskManObjF,
  leadsFetchedData,
  leadsTyper,
  leadByViewLayout,
  setLeadByViewLayout,
  searchKey,
  setSearchKey,
}) => {
  // change navbar title
  // useTitle('Data Table V1')
  const { t } = useTranslation()
  const [value, setValue] = useState('new')
  const { user } = useAuth()
  const { orgId } = user
  const [tableData, setTableData] = useState([])
  const [businessData_F, setBusinessData_F] = useState([])
  const [businessSection_D, setBusinessSection_D] = useState([])

  const [personalData_F, setPersonalData_F] = useState([])
  const [tabHeadFieldsA, settabHeadFieldsA] = useState([])
  const [isImportLeadsOpen1, setisImportLeadsOpen1] = useState(false)
  const [isClicked, setisClicked] = useState('dept_tasks')
  const [subSection, setSubSection] = useState('all_business')

  // const [leadsFetchedData, setLeadsFetchedData] = useState([])
  useEffect(() => {
    getTasksDataFun()
    // Subscribe to real-time changes in the `${orgId}_accounts` table
    const subscription = supabase
      .from(`maahomes_TM_Tasks`)
      .on('*', (payload) => {
        // When a change occurs, update the 'leadLogs' state with the latest data
        console.log('account records', payload)
        // Check if the updated data has the id 12
        const updatedData = payload.new
        const { id } = payload.old
        const updatedLeadLogs = [...businessData_F]
        setBusinessData_F((prevLogs) => {
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
  useEffect(() => {
    // first

    // return () => {
    //   second
    // }
    if (subSection == 'all_business') {
      setBusinessSection_D(businessData_F)
    } else if (subSection == 'assigned_to_me') {
      setBusinessSection_D(
        businessData_F.filter(
          (d) => d.by_uid != user?.uid && d.to_uid === user?.uid
        )
      )
    } else if (subSection == 'created_by_me') {
      setBusinessSection_D(
        businessData_F.filter(
          (d) => d.by_uid === user?.uid && d.to_uid != user?.uid
        )
      )
    } else if (subSection == 'participants') {
      setBusinessSection_D(businessData_F)
    }
  }, [businessData_F, subSection])

  const getTasksDataFun = async () => {
    console.log('login role detials', user)
    const { uid } = user

    const steamLeadLogs = await streamGetAllTaskManTasks(
      orgId,
      'snap',
      {
        uid,
      },
      (error) => []
    )

    await setPersonalData_F(
      steamLeadLogs.filter(
        (d) => d.by_uid === user?.uid && d.to_uid === user?.uid
      )
    )
    await setBusinessData_F(
      steamLeadLogs.filter(
        (d) =>
          (d.by_uid != user?.uid && d.to_uid === user?.uid) ||
          (d.by_uid === user?.uid && d.to_uid != user?.uid)
      )
    )
    return
  }
  const handleDelete = async (ids) => {
    const { data } = await axios.post('/api/tableData1/delete', {
      ids,
    })
    setTableData(data)
  }

  const filterTable = tableData.filter((item) =>
    value !== '' ? item.role.toLowerCase() === value : item.role
  )

  const openingTaskAddWindow = () => {
    console.log('i was clicked')
    setisImportLeadsOpen1(true)
  }
  const archieveTab = [
    { lab: 'Archieve', val: 'all' },
    { lab: 'Dead', val: 'dead' },
    { lab: 'Not Interested', val: 'notinterested' },
    { lab: 'Blocked', val: 'blockded' },
  ]
  const financeTab = [
    { lab: 'All', val: 'all' },
    { lab: 'In Review', val: 'inReview' },
    { lab: 'Cleared', val: 'cleared' },
    { lab: 'Uncleared', val: 'uncleared' },
  ]
  return (
    <>
      <Box pb={4} className="font-Rubik">
        <div className=" w-full font-Rubik">
          <div className="bg-white py-4 md:py-7 px-4 md:px-4 xl:px-6 rounded">
            <div className="flex flex-row justify-between border-gray-200 border-b">
              <ul
                className="flex w-full  rounded-t-lg  mx-"
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                {[
                  { lab: 'Sales Tasks', val: 'dept_tasks' },
                  { lab: 'Personal', val: 'personal_tasks' },
                  { lab: 'Business Tasks', val: 'business_tasks' },
                ].map((d, i) => {
                  return (
                    <li key={i} className="mr-4" role="presentation">
                      <button
                        className={`inline-block pb-[6px] mr-3 text-sm font-medium text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${
                          isClicked === d.val
                            ? 'border-black'
                            : 'border-transparent'
                        }`}
                        type="button"
                        role="tab"
                        onClick={() => setisClicked(d.val)}
                      >
                        <section className="flex flex-row text-[15px] h-[24px]">
                          {' '}
                          {/* <img
                            className="px-1 w-5 h-4"
                            src="/Award_3.png"
                            alt="/Award_3.png"
                          /> */}
                          {/* 🏆 */}
                          {d.val === 'dept_tasks' && (
                            <>
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 15 15"
                                className="fill-current mt-[4px] mr-1 text-purple-500"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M14.1755 7.88376L11.9493 9.56253L12.7948 12.266C12.9314 12.6853 12.9331 13.1389 12.7997 13.5593C12.6663 13.9797 12.4049 14.3444 12.0544 14.5988C11.7099 14.8615 11.2925 15.0022 10.8643 15C10.436 14.9978 10.02 14.8528 9.67807 14.5866L7.50125 12.9323L5.3238 14.5846C4.97996 14.8458 4.56476 14.9876 4.13792 14.9898C3.71108 14.9919 3.29457 14.8542 2.94827 14.5966C2.60197 14.3389 2.34373 13.9745 2.21066 13.5557C2.0776 13.1369 2.07657 12.6854 2.20772 12.266L3.05318 9.56253L0.826957 7.88376C0.483556 7.62452 0.22828 7.25987 0.0975914 6.84188C-0.0330973 6.4239 -0.0325136 5.97396 0.0992584 5.55633C0.23103 5.13871 0.487251 4.77476 0.831323 4.51648C1.17539 4.25819 1.58972 4.11878 2.01511 4.11815H4.74974L5.57957 1.44762C5.71006 1.02726 5.96649 0.660548 6.31187 0.400372C6.65724 0.140196 7.07372 0 7.50125 0C7.92878 0 8.34526 0.140196 8.69064 0.400372C9.03601 0.660548 9.29244 1.02726 9.42293 1.44762L10.2528 4.11815H12.9849C13.4103 4.11878 13.8246 4.25819 14.1687 4.51648C14.5127 4.77476 14.769 5.13871 14.9007 5.55633C15.0325 5.97396 15.0331 6.4239 14.9024 6.84188C14.7717 7.25987 14.5164 7.62452 14.173 7.88376H14.1755Z"></path>
                              </svg>
                              {`${d.lab} `}

                              <span className="text-[#606c82] ml-1 text-[11px]  border border-[#dfe1e6] text-gray-800 px-1  rounded-full ml-[4px] text-[10px]">
                                {
                                  taskListA?.filter(
                                    (d) =>
                                      searchKey.includes(d['sts']) ||
                                      searchKey.includes('upcoming')
                                  ).length
                                }
                              </span>
                            </>
                          )}{' '}
                          {d.val === 'personal_tasks' && (
                            <>
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 15 20"
                                className="fill-current mt-[5px] mr-1 text-purple-500"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10.8692 11.6667H4.13085C3.03569 11.668 1.98576 12.1036 1.21136 12.878C0.436961 13.6524 0.00132319 14.7023 0 15.7975V20H15.0001V15.7975C14.9987 14.7023 14.5631 13.6524 13.7887 12.878C13.0143 12.1036 11.9644 11.668 10.8692 11.6667Z"></path>
                                <path d="M7.49953 10C10.261 10 12.4995 7.76145 12.4995 5.00002C12.4995 2.23858 10.261 0 7.49953 0C4.7381 0 2.49951 2.23858 2.49951 5.00002C2.49951 7.76145 4.7381 10 7.49953 10Z"></path>
                              </svg>
                              {`${d.lab} `}
                              <span className="text-[#606c82] ml-1 text-[11px]  border border-[#dfe1e6] text-gray-800 px-1  rounded-full ml-[4px] text-[10px]">
                                {personalData_F.length}
                              </span>
                            </>
                          )}
                          {d.val === 'business_tasks' && (
                            <>
                              <svg
                                className="fill-current mt-[5px] mr-1 text-purple-500"
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 16 16"
                                fill="blue"
                              >
                                <path d="M0.800781 2.60005V7.40005H7.40078V0.800049H2.60078C2.12339 0.800049 1.66555 0.989691 1.32799 1.32726C0.990424 1.66482 0.800781 2.12266 0.800781 2.60005H0.800781Z"></path>
                                <path d="M13.4016 0.800049H8.60156V7.40005H15.2016V2.60005C15.2016 2.12266 15.0119 1.66482 14.6744 1.32726C14.3368 0.989691 13.879 0.800049 13.4016 0.800049V0.800049Z"></path>
                                <path d="M0.800781 13.4001C0.800781 13.8775 0.990424 14.3353 1.32799 14.6729C1.66555 15.0105 2.12339 15.2001 2.60078 15.2001H7.40078V8.6001H0.800781V13.4001Z"></path>
                                <path d="M8.60156 15.2001H13.4016C13.879 15.2001 14.3368 15.0105 14.6744 14.6729C15.0119 14.3353 15.2016 13.8775 15.2016 13.4001V8.6001H8.60156V15.2001Z"></path>
                              </svg>
                              {`${d.lab} `}
                              <span className="text-[#606c82] ml-1 text-[11px]  border border-[#dfe1e6] text-gray-800 px-1  rounded-full ml-[4px] text-[10px]">
                                {businessData_F.length}
                              </span>
                            </>
                          )}
                        </section>

                        {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                      </button>
                    </li>
                  )
                })}
              </ul>
              {['business_tasks', 'personal_tasks'].includes(isClicked) && (
                <button
                  className="w-[104px] focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 sm:mt-0 inline-flex items-start justify-start px-2 mb-[4px] mr-2
                 focus:outline-none rounded-full hover:text-[#027576] hover:bg-gradient-to-r from-violet-200 to-pink-200 bg-gradient-to-r from-violet-200 to-pink-200 text-black-900 hover:text-[#025e5e] hover:scale-95 font-light "
                  onClick={() => openingTaskAddWindow()}
                >
                  <PlusIcon className="w-[13px] h-[13px] mt-[9px] mr-[2px]" />
                  <p className="text-sm text-black-900 font-medium leading-none mt-2">
                    New Task
                  </p>
                </button>
              )}
              {/* {selFeature != 'lead_strength' && (
          <span
            className="font-bodyLato text-xs text-blue-400 mr-2 mt-2 cursor-pointer"
            onClick={() => setFeature('lead_strength')}
          >
            LEAD STRENGTH
          </span>
        )}
        {selFeature == 'lead_strength' && (
          <span
            className="font-bodyLato text-xs text-red-400 mr-2 mt-2 cursor-pointer"
            onClick={() => setFeature('appointments')}
          >
            CLOSE
          </span>
        )} */}
            </div>
            {isClicked === 'dept_tasks' && (
              <div className=" rounded px-1 mt-4 mb-3">
                <div className="sm:flex items-center justify-between bg-white rounded">
                  <div className="flex items-center">
                    {[
                      {
                        lab: 'All',
                        val: 'dept_tasks',
                        match: ['completed', 'pending'],
                      },
                      {
                        lab: 'Done',
                        val: '',
                        match: ['completed', 'pending'],
                      },
                      {
                        lab: 'Todo',
                        val: 'upcoming',
                        match: ['pending'],
                      },
                    ].map((d, i) => {
                      return (
                        <a
                          key={i}
                          className="rounded-full focus:outline-none mr-2"
                          href="javascript:void(0)"
                          onClick={() => setSearchKey(d.match)}
                        >
                          <div
                            className={`px-3 rounded-full pt-[2px] pb-[4px] text-[14px]  ${
                              searchKey.includes(d.match)
                                ? 'bg-gradient-to-r from-violet-200 to-pink-200 scale-105  font-normal'
                                : 'hover:text-[#027576] hover:bg-[#E7DDFF] bg-[#F2F7FA] text-gray-800  hover:scale-95 font-light'
                            }`}
                          >
                            {d.lab}
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
            {isClicked === 'business_tasks' && (
              <div className=" rounded px-1 mt-4 mb-3">
                <div className="sm:flex items-center justify-between bg-white rounded">
                  <div className="flex items-center">
                    {[
                      {
                        lab: 'All',
                        val: 'all_business',
                        match: ['completed', 'pending'],
                      },
                      {
                        lab: 'Assigned to me',
                        val: 'assigned_to_me',
                        match: ['completed', 'pending'],
                      },
                      {
                        lab: 'Created by me',
                        val: 'created_by_me',
                        match: ['pending'],
                      },
                      {
                        lab: 'Participants',
                        val: 'participants',
                        match: ['upcoming'],
                      },
                    ].map((d, i) => {
                      return (
                        <a
                          key={i}
                          className="rounded-full focus:outline-none mr-2"
                          href="javascript:void(0)"
                          onClick={() => setSubSection(d.val)}
                        >
                          <div
                            className={`px-3 rounded-full pt-[2px] pb-[4px] text-[14px]  ${
                              subSection === d.val
                                ? 'bg-gradient-to-r from-violet-200 to-pink-200 scale-105 text-black-900 font-normal'
                                : 'hover:text-[#027576] hover:bg-[#E7DDFF] bg-[#F2F7FA] text-gray-800 hover:scale-95 font-light'
                            }`}
                          >
                            <section className="flex flex-row">
                              {d.lab}
                              {d.val === 'all_business' && (
                                <section className="text-[11px]  ml-1 mt-[3px]">
                                  ({businessData_F.length})
                                </section>
                              )}
                              {d.val === 'assigned_to_me' && (
                                <section className="text-[11px]  ml-1 mt-[4px]">
                                  (
                                  {
                                    businessData_F.filter(
                                      (d) =>
                                        d.by_uid != user?.uid &&
                                        d.to_uid === user?.uid
                                    ).length
                                  }
                                  )
                                </section>
                              )}
                              {d.val === 'created_by_me' && (
                                <section className="text-[11px]  ml-1 mt-[4px]">
                                  (
                                  {
                                    businessData_F.filter(
                                      (d) =>
                                        d.by_uid === user?.uid &&
                                        d.to_uid != user?.uid
                                    ).length
                                  }
                                  ){' '}
                                </section>
                              )}
                              {d.val === 'participants' && (
                                <section className="text-[11px]  ml-1 mt-[4px]">
                                  ({businessData_F.length})
                                </section>
                              )}
                            </section>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
            {((isClicked === 'dept_tasks' && taskListA.length === 0) ||
              (isClicked === 'personal_tasks' && personalData_F.length === 0) ||
              (isClicked === 'business_tasks' &&
                businessData_F.length === 0)) && (
              <div className="py-8 px-8 flex flex-col items-center bg-red-100 rounded">
                <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                  <img
                    className="w-[180px] h-[180px] inline"
                    alt=""
                    src="../note-widget.svg"
                  />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900">
                  No Tasks Found
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  <span className="text-blue-600"> Add New Task</span>
                </time>
              </div>
            )}
            {isClicked === 'dept_tasks' && (
              <div className="overflow-x-auto mt-2">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    {
                      // [
                      //   {
                      //     title: 'Marketing Keynote Presentation1',
                      //     p: 'Urgent',
                      //     date: '04/07',
                      //     due: 'Today',
                      //   },
                      // ]
                      taskListA
                        ?.filter(
                          (d) =>
                            searchKey.includes(d['sts']) ||
                            searchKey.includes('upcoming')
                        )
                        .map((dat, i) => (
                          <tr
                            tabIndex={0}
                            className="focus:outline-none h-16 border border-gray-100 rounded"
                            key={i}
                            onClick={() => {
                              console.log('macho 1', dat?.leadUser, dat)
                              const y = dat.leadUser
                              y.id = dat?.uid
                              console.log('macho 1', y)
                              selUserProfileF('User Profile', y)
                            }}
                          >
                            <td>
                              <div className="ml-5">
                                <div className="rounded-sm h-5 w-5 flex flex-shrink-0 justify-center items-center relative">
                                  {/* <input
                                placeholder="checkbox"
                                type="checkbox"
                                className="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                              /> */}
                                  {i + 1}
                                  {/* <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                <svg
                                  className="icon icon-tabler icon-tabler-check"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path stroke="none" d="M0 0h24v24H0z"></path>
                                  <path d="M5 12l5 5l10 -10"></path>
                                </svg>
                              </div> */}
                                </div>
                              </div>
                            </td>
                            <td className=" max-w-[300px]">
                              <div className="flex items-center ">
                                <div className="flex flex-col">
                                  <p className="text-base max-w-[350px] overflow-ellipsis overflow-hidden font-semibold leading-none text-blue-800 mr-2 mt-2">
                                    {dat?.notes}
                                  </p>
                                  <div className="flex flex-row">
                                    <p className="text-[9px]   leading-none  pr-2 text-green-800  mt-[6px]  py-[4px]  rounded-full   mb-1 mr-2  ">
                                      {dat?.leadUser?.Project?.toUpperCase()}
                                    </p>

                                    {/* <p className="text-[11px]  leading-none text-red-800  mt-1  py-[4px]  rounded-full  text-2xl  mb-1 mr-2  ">
                                  {dat?.pri}
                                </p> */}
                                    <p className="text-[9px]  leading-none text-red-800  mt-[6px] font-bodyLato  py-[4px]  rounded-full   mb-1 mr-4  ">
                                      {dat?.leadUser?.Status?.toUpperCase()}
                                    </p>
                                    <p className="text-[9px]  leading-none text-gray-600  mt-[6px] font-bodyLato  py-[4px]  rounded-full    mb-1 mr-2  ">
                                      {dat?.sts?.toUpperCase()}
                                    </p>
                                    <p
                                      className={`text-[9px]  leading-none ${
                                        user?.uid == dat?.leadUser?.assignedTo
                                          ? 'text-green-800'
                                          : 'text-red-800 '
                                      }   mt-[6px] font-bodyLato  py-[4px]  rounded-full    mb-1 mr-2  `}
                                    >
                                      {dat?.leadUser?.assignedToObj?.name?.toUpperCase()}
                                    </p>
                                  </div>
                                </div>
                                {/*
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                              stroke="#3B82F6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                              stroke="#3B82F6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg> */}
                              </div>
                            </td>
                            <td className="pl-24">
                              {/* <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M9.16667 2.5L16.6667 10C17.0911 10.4745 17.0911 11.1922 16.6667 11.6667L11.6667 16.6667C11.1922 17.0911 10.4745 17.0911 10 16.6667L2.5 9.16667V5.83333C2.5 3.99238 3.99238 2.5 5.83333 2.5H9.16667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <circle
                              cx="7.50004"
                              cy="7.49967"
                              r="1.66667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></circle>
                          </svg>
                          <p className="text-sm leading-none text-gray-600 ml-2">
                            {dat?.pri}
                          </p>
                        </div> */}
                            </td>
                            <td className="pl-5">
                              <div className="flex flex-col">
                                <p className="text-[12px] leading-none text-blue-600 ml-2">
                                  {dat?.status}
                                </p>
                                <p className="text-[11px] leading-none text-gray-600 ml-2 mt-2">
                                  {dat?.leadUser?.Name}
                                </p>
                                {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M7.5 5H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.5 10H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.5 15H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 5V5.00667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 10V10.0067"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 15V15.0067"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg> */}
                                <p className="text-sm leading-none text-gray-600 ml-2">
                                  {/* {prettyDateTime(dat['schTime'])} */}
                                </p>
                              </div>
                            </td>
                            <td className="pl-5">
                              <div className="flex flex-row">
                                {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M7.5 5H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.5 10H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M7.5 15H16.6667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 5V5.00667"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 10V10.0067"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M4.16669 15V15.0067"
                              stroke="#52525B"
                              strokeWidth="1.25"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg> */}

                                <button className="py-3 px-3 text-[13px] focus:outline-none leading-none text-red-700 rounded">
                                  {Math.abs(
                                    getDifferenceInMinutes(dat['schTime'], '')
                                  ) > 60
                                    ? Math.abs(
                                        getDifferenceInMinutes(
                                          dat['schTime'],
                                          ''
                                        )
                                      ) > 1440
                                      ? `${getDifferenceInDays(
                                          dat['schTime'],
                                          ''
                                        )} Days `
                                      : `${getDifferenceInHours(
                                          dat['schTime'],
                                          ''
                                        )} Hours `
                                    : `${getDifferenceInMinutes(
                                        dat['schTime'],
                                        ''
                                      )} Min`}
                                  {getDifferenceInMinutes(dat['schTime'], '') <
                                  0
                                    ? 'Due'
                                    : 'Left'}
                                  <p className="text-[11px] leading-none text-gray-600 ml-2 mt-2">
                                    {prettyDateTime(dat['schTime'])}
                                  </p>
                                </button>
                              </div>
                            </td>
                            {/* <td className="pl-4">

                          <span className="ml-4 px-4 py-[4px] inline-flex text-xs leading-5 font-semibold rounded-full  text-green-800">
                            {dat?.sts}
                          </span>
                        </td> */}
                            {/* <td>
                        <div className="relative px-1">
                          <button
                            className="focus:ring-2 rounded-md focus:outline-none"
                            role="button"
                            aria-label="option"
                          >
                            <ArrowNarrowRightIcon className="w-4 h-4 inline text-[#058527]" />

                          </button>
                          <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                            <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Edit</p>
                            </div>
                            <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Delete</p>
                            </div>
                          </div>
                        </div>
                      </td> */}
                          </tr>
                        ))
                    }

                    <tr className="h-3"></tr>
                  </tbody>
                </table>
              </div>
            )}
            {['personal_tasks'].includes(isClicked) && (
              <div className="overflow-x-auto mt-2">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    {personalData_F?.map((dat, i) => (
                      <tr
                        tabIndex={0}
                        className="focus:outline-none h-16 border border-gray-100 rounded"
                        key={i}
                        onClick={() => {
                          selTaskManObjF(dat)
                        }}
                      >
                        <td>
                          <div className="ml-5">
                            <div className="rounded-sm h-5 w-5 flex flex-shrink-0 justify-center items-center relative">
                              {i + 1}
                            </div>
                          </div>
                        </td>
                        <td className=" max-w-[300px]">
                          <div className="flex items-center ">
                            <div className="flex flex-col">
                              <p className="text-base max-w-[350px] overflow-ellipsis overflow-hidden font-semibold leading-none text-blue-800 mr-2 mt-2">
                                {dat?.title}
                              </p>
                              <div className="flex flex-row">
                                <p className="text-[9px]   leading-none  pr-2 text-green-800  mt-[6px]  py-[4px]  rounded-full   mb-1 mr-2  ">
                                  {dat?.priority?.toUpperCase()}
                                </p>
                                <section>
                                  <PaperClipIcon className="w-3 h-3 mr-[2px] inline-block text-gray-400 " />
                                </section>
                                <p className="text-[9px]  leading-none text-red-800  mt-[6px] font-bodyLato  py-[4px]  rounded-full   mb-1 mr-4  ">
                                  {dat?.attachmentsCount || 0}
                                </p>
                                <section>
                                  <UsersIcon className="w-3 h-3 mr-[2px]  inline-block text-gray-400  " />{' '}
                                </section>
                                <p className="text-[9px]  leading-none text-red-800  mt-[6px] font-bodyLato  py-[4px]  rounded-full   mb-1 mr-4  ">
                                  {dat?.participantsA?.length || 0}
                                </p>
                              </div>
                            </div>

                          </div>
                        </td>
                        <td className="pl-24">

                        </td>
                        <td className="pl-5">
                          <div className="flex flex-col">
                            <p className="text-[12px] leading-none text-blue-600 ml-2">
                            {dat?.status}
                            </p>
                            <p className="text-[11px] leading-none text-gray-600 ml-2 mt-2">
                              {dat?.by_name}
                            </p>

                            <p className="text-sm leading-none text-gray-600 ml-2">
                              {/* {prettyDateTime(dat['schTime'])} */}
                            </p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex flex-row">


                            <button className="py-3 px-3 text-[13px] focus:outline-none leading-none text-red-700 rounded">
                              {Math.abs(
                                getDifferenceInMinutes(dat['due_date'], '')
                              ) > 60
                                ? Math.abs(
                                    getDifferenceInMinutes(dat['due_date'], '')
                                  ) > 1440
                                  ? `${getDifferenceInDays(
                                      dat['due_date'],
                                      ''
                                    )} Days `
                                  : `${getDifferenceInHours(
                                      dat['due_date'],
                                      ''
                                    )} Hours `
                                : `${getDifferenceInMinutes(
                                    dat['due_date'],
                                    ''
                                  )} Min`}
                              {getDifferenceInMinutes(dat['due_date'], '') < 0
                                ? 'Due'
                                : 'Left'}
                              <p className="text-[11px] leading-none text-gray-600 ml-2 mt-2">
                                {prettyDateTime(dat['due_date'])}
                              </p>
                            </button>
                          </div>
                        </td>
                        {/* <td className="pl-4">

                          <span className="ml-4 px-4 py-[4px] inline-flex text-xs leading-5 font-semibold rounded-full  text-green-800">
                            {dat?.sts}
                          </span>
                        </td> */}
                        {/* <td>
                        <div className="relative px-1">
                          <button
                            className="focus:ring-2 rounded-md focus:outline-none"
                            role="button"
                            aria-label="option"
                          >
                            <ArrowNarrowRightIcon className="w-4 h-4 inline text-[#058527]" />

                          </button>
                          <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6 hidden">
                            <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Edit</p>
                            </div>
                            <div className="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                              <p>Delete</p>
                            </div>
                          </div>
                        </div>
                      </td> */}
                      </tr>
                    ))}

                    <tr className="h-3"></tr>
                  </tbody>
                </table>
              </div>
            )}
            {['business_tasks'].includes(isClicked) && (
              <div className="overflow-x-auto mt-2">
                <table className="w-full whitespace-nowrap">
                  <tbody>
                    {businessSection_D?.map((dat, i) => (
                      <tr
                        tabIndex={0}
                        className="focus:outline-none h-16 border border-gray-100 rounded"
                        key={i}
                        onClick={() => {
                     
                          selTaskManObjF(dat)

                        }}
                      >
                        <td>
                          <div className="ml-5">
                            <div className="rounded-sm h-5 w-5 flex flex-shrink-0 justify-center items-center relative">
                              {i + 1}
                            </div>
                          </div>
                        </td>
                        <td className=" max-w-[300px]">
                          <div className="flex items-center ">
                            <div className="flex flex-col">
                              <p className="text-base max-w-[350px] overflow-ellipsis overflow-hidden font-semibold leading-none text-blue-800 mr-2 mt-2">
                                {dat?.title}
                              </p>
                              <div className="flex flex-row">
                                <p className="text-[9px]   leading-none  pr-2 text-green-800  mt-[6px]  py-[4px]  rounded-full   mb-1 mr-2  ">
                                  {dat?.priority?.toUpperCase()}
                                </p>
                                <section>
                                  <PaperClipIcon className="w-3 h-3 mr-[2px] inline-block text-gray-400 " />
                                </section>
                                <p className="text-[9px]  leading-none text-red-800  mt-[6px] font-bodyLato  py-[4px]  rounded-full   mb-1 mr-4  ">
                                  {dat?.attachmentsCount || 0}
                                </p>
                                <section>
                                  <UsersIcon className="w-3 h-3 mr-[2px]  inline-block text-gray-400  " />{' '}
                                </section>
                                <p className="text-[9px]  leading-none text-red-800  mt-[6px] font-bodyLato  py-[4px]  rounded-full   mb-1 mr-4  ">
                                  {dat?.participantsA?.length || 0}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="pl-24">
                        </td>
                        <td className="pl-5">
                          <div className="flex flex-col">
                            <p className="text-[12px] leading-none text-blue-600 ml-2">
                            {dat?.status}
                            </p>
                            <p className="text-[11px] leading-none text-gray-600 ml-2 mt-2">
                              {dat?.by_name}
                            </p>
                            <p className="text-sm leading-none text-gray-600 ml-2">
                            </p>
                          </div>
                        </td>
                        <td className="pl-5">
                          <div className="flex flex-row">
                            <button className="py-3 px-3 text-[13px] focus:outline-none leading-none text-red-700 rounded">
                              {Math.abs(
                                getDifferenceInMinutes(dat['due_date'], '')
                              ) > 60
                                ? Math.abs(
                                    getDifferenceInMinutes(dat['due_date'], '')
                                  ) > 1440
                                  ? `${getDifferenceInDays(
                                      dat['due_date'],
                                      ''
                                    )} Days `
                                  : `${getDifferenceInHours(
                                      dat['due_date'],
                                      ''
                                    )} Hours `
                                : `${getDifferenceInMinutes(
                                    dat['due_date'],
                                    ''
                                  )} Min`}
                              {getDifferenceInMinutes(dat['due_date'], '') < 0
                                ? 'Due'
                                : 'Left'}
                              <p className="text-[11px] leading-none text-gray-600 ml-2 mt-2">
                                {prettyDateTime(dat['due_date'])}
                              </p>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    <tr className="h-3"></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* <script src="./index.js"></script>
        <style>.checkbox:checked + .check-icon {
  display: flex;
}
</style>
        <script>function dropdownFunction(element) {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                let list = element.parentElement.parentElement.getElementsByClassName("dropdown-content")[0];
                list.classList.add("target");
                for (i = 0; i < dropdowns.length; i++) {
                    if (!dropdowns[i].classList.contains("target")) {
                        dropdowns[i].classList.add("hidden");
                    }
                }
                list.classList.toggle("hidden");
            }</script> */}

        {/* <Card
        sx={{
          boxShadow: 4,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">

              <ul
                className="flex flex-wrap -mb-px "
                id="myTab"
                data-tabs-toggle="#myTabContent"
                role="tablist"
              >
                {tabHeadFieldsA.map((d, i) => {
                  return (
                    <li key={i} className="mr-2" role="presentation">
                      <button
                        className={`inline-block py-4 px-4 text-sm font-medium text-center text-gray-500 rounded-t-lg border-b-2  hover:text-gray-600 hover:border-blue-600 dark:text-gray-400 dark:hover:text-gray-300  ${
                          value === d.val
                            ? 'border-blue-600 text-gray-800'
                            : 'border-transparent'
                        }`}
                        type="button"
                        role="tab"
                        onClick={() => setValue(d.val)}
                      >
                        {`${d.lab} `}
                        <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {rowsCounter(leadsFetchedData, d.val).length}
                        </span>

                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

          </Grid>
        </Grid>
      </Card> */}
      </Box>
      <SiderForm
        open={isImportLeadsOpen1}
        setOpen={setisImportLeadsOpen1}
        title={'Add Task'}
        // customerDetails={selUserProfile}
        widthClass="max-w-md"
      />
    </>
  )
}

export default TodoListView

// {todaySch && schFetData.length > 0 && (
//   <TodoListView
//     taskListA={schFetCleanData}
//     setisImportLeadsOpen={undefined}
//     selUserProfileF={undefined}
//     leadsFetchedData={undefined}
//     leadsTyper={undefined}
//   />
// )}
// const [schFetCleanData, setSchFetCleanData] = React.useState([])
// React.useEffect(() => {
//   if (todaySch) {
//     console.log('my value is ', todaySch)
//     const streamedTodo = []
//     setSchFetData(todaySch)
//     const z = todaySch.map((data1) => {
//       data1['staDA'].map((data2) => {
//         const y = data1[data2]
//         y.uid = data1.uid
//         y.leadUser = data1.leadUser
//         streamedTodo.push(y)
//         console.log('my value is 1', y)
//         return y
//       })
//     })
//     setSchFetCleanData(streamedTodo)
//     console.log('my value is 1', z, streamedTodo)
//   } else {
//     console.log('my value is ', todaySch)
//   }
// }, [todaySch])
