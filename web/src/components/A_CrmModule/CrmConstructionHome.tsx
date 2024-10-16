/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Fragment, useState, useEffect } from 'react'

import DatePicker from 'react-datepicker'
import {
  PhoneIcon,
  PuzzleIcon,
  ShieldExclamationIcon,
} from '@heroicons/react/outline'
import {
  AdjustmentsIcon,
  ChartPieIcon,
  SearchIcon,
  OfficeBuildingIcon,
  NewspaperIcon,
  UserGroupIcon,
  ScaleIcon,
} from '@heroicons/react/solid'
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import {} from '@heroicons/react/solid'
import { Box, LinearProgress, useTheme } from '@mui/material'
import { startOfDay } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { MetaTags } from '@redwoodjs/web'

import {
  getCRMCustomerByProject,
  getBookedUnitsByProject,
  getAllProjects,
  getUnassignedCRMunits,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { computeTotal } from 'src/util/computeCsTotals'
import CSVDownloader from 'src/util/csvDownload'
import { prettyDate, prettyDateTime, timeConv } from 'src/util/dateConverter'
import {
  SlimDateSelectBox,
  SlimSelectBox,
  VerySlimSelectBox,
} from 'src/util/formFields/slimSelectBoxField'

import CrmSiderForm from '../SiderForm/CRM_SideForm'
import SiderForm from '../SiderForm/SiderForm'

const agreementItems = [
  {
    item: 'EC',
    status: 'completed',
  },
  {
    item: 'Customer Approve',
    status: 'completed',
  },
  {
    item: 'Franking Charges',
    status: 'pending',
  },
  {
    item: 'Purchase Stamp Duty',
    status: 'pending',
  },
  {
    item: 'Sign',
    status: 'pending',
  },
  {
    item: 'Save',
    status: 'completed',
  },
  {
    item: 'Share',
    status: 'completed',
  },
]
const loanItems = [
  {
    item: 'KYC',
    status: 'completed',
  },
  {
    item: 'Sanction Letter',
    status: 'completed',
  },
  {
    item: 'Builder Noc',
    status: 'pending',
  },
  {
    item: 'EC',
    status: 'pending',
  },
  {
    item: 'Demand Letter',
    status: 'pending',
  },
  {
    item: 'Receipt',
    status: 'completed',
  },
  {
    item: 'CS',
    status: 'completed',
  },
  {
    item: 'Agreement',
    status: 'completed',
  },
]
const modifyItems = [
  {
    item: 'New Modification',
    status: 'completed',
  },
  {
    item: 'Engineer Approval',
    status: 'completed',
  },
  {
    item: 'Quotation',
    status: 'pending',
  },
  {
    item: 'Cust Approval',
    status: 'pending',
  },
]
const CrmConstuctionModeHome = ({ leadsTyper }) => {
  const d = new window.Date()
  const { t } = useTranslation()
  const { user } = useAuth()
  const { orgId, access, projAccessA } = user
  const [isUnitDetailsOpen, setisUnitDetailsOpen] = useState(false)
  const [isSubTopicOpen, setIsSubTopicOpen] = useState(false)
  const [isSubTopic, setIsSubTopic] = useState('')
  const [selProjectIs, setSelProject] = useState({
    label: 'All Events',
    value: 'allprojects',
  })

  // kanban board
  const [ready, setReady] = useState(false)
  const [horizontalMode, setHorizontalMode] = useState(false)
  const [showSettings, setShowSettings] = useState(true)
  const [sourceDateRange, setSourceDateRange] = useState(
    startOfDay(d).getTime()
  )

  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  const [selUnitDetails, setSelUnitDetails] = useState({})
  const [crmCustomersDBData, setCrmCustomerDBData] = useState([])
  const [crmDBData, setCrmCutomerDBData] = useState([])
  const [crmBookineReviewDBData, setBookingReviewDBData] = useState([])
  const [serialLeadsData, setSerialLeadsData] = useState([])
  const [projectList, setprojectList] = useState([])
  const [transactionData, setTransactionData] = useState({})
  const [selMenTitle, setSelMenuTitle] = useState('agreeement_home')
  const [selMenuItem, setSelMenuItem] = useState(agreementItems)
  const [selSubMenu, setSelSubMenu] = useState('summary')

  const [selSubMenu1, setSelSubMenu1] = useState('summary')
  const [unitTotal, setUnitTotal] = useState(0)

  const DocumentationHeadA = [
    { lab: 'All Transactions', val: 'all' },
    { lab: 'For onBoarding', val: 'latest' },
    { lab: 'For Agreement', val: 'reviewing' },
    { lab: 'For Registration', val: 'cleared' },
    { lab: 'For Bank Loan', val: 'rejected' },
    { lab: 'For Position', val: 'rejected' },
  ]
  const perResisterTableHeadA = [
    { lab: 'Asset Details', val: 'all' },
    // { lab: 'Welcome Formalities', val: 'latest' },
    { lab: 'Payment Pending', val: 'reviewing' },
    { lab: 'Payment Review', val: 'cleared' },
    { lab: 'Agreement Payment', val: 'cleared' },
    { lab: 'Review Meeting', val: 'rejected' },
    { lab: 'Agreement Doc', val: 'rejected' },
    { lab: 'Agreement Schedule', val: 'rejected' },
    { lab: 'Bank Loan Approval ', val: 'rejected' },
    { lab: 'Modifications', val: 'rejected' },
    // { lab: 'Constuction Progress', val: 'rejected' },
    { lab: 'Legal Review', val: 'rejected' },
    { lab: '', val: 'rejected' },
    { lab: 'Comments', val: 'rejected' },
  ]

  const [tabHeadFieldsA, setTabHeadFields] = useState(DocumentationHeadA)
  const [tableHeadFieldsA, setTableHeadFieldsA] = useState(
    perResisterTableHeadA
  )
  const [tableData, setTableDataA] = useState([])
  const [bookingReviewA, setBookingReviewA] = useState([])
  const [agreePipeA, setAgreePipeA] = useState([])
  const [sdPipeA, setSdPipeA] = useState([])
  const [registeredA, setRegisteredA] = useState([])
  const [unassignedA, setUnAssignedA] = useState([])
  const [unqueriesA, setQueriesA] = useState([])

  const [bookingReviewCo, setBookingReviewCo] = useState([])
  const [agreePipeCo, setAgreePipeCo] = useState([])
  const [sdPipeCo, setSdPipeCo] = useState([])
  const [registeredCo, setRegisteredCo] = useState([])
  const [unassignedCo, setUnAssignedCo] = useState([])
  const [queryResult, setQueryResult] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isOpened, setIsOpened] = React.useState(false)
  const [selCategory, setSelCategory] = useState('booked')
  const [dateRange, setDateRange] = React.useState([null, null])
  const [startDate, endDate] = dateRange
  const [usersList, setusersList] = useState([])
  const [selLeadsOf, setSelLeadsOf] = useState({
    label: 'My Units',
    value: 'myunits',
  })
  useEffect(() => {
    console.log(' crm units data is ', crmCustomersDBData)
  }, [crmCustomersDBData])

  useEffect(() => {
    bootFun()
  }, [])
  useEffect(() => {
    if (selMenTitle === 'agreeement_home') {
      setSelMenuItem(agreementItems)
    } else if (selMenTitle === 'loan_home') {
      setSelMenuItem(loanItems)
    } else {
      setSelMenuItem(modifyItems)
    }
  }, [selMenTitle])

  const bootFun = async () => {
    await getProjectsListFun()
  }

  useEffect(() => {
    getLeadsDataFun(projectList, 'booked')
    getLeadsDataFun(projectList, 'agreement_pipeline')
    getLeadsDataFun(projectList, 'sd_pipeline')
    getLeadsDataFun(projectList, 'registered')
    getLeadsDataFun(projectList, 'unassigned')
  }, [projectList, selLeadsOf])

  useEffect(() => {
    filter_Leads_Projects_Users_Fun()
  }, [selProjectIs])

  const filter_Leads_Projects_Users_Fun = () => {
    // setFetchLeadsLoader(true)
    // const x = leadsFetchedRawData
    getLeadsDataFun(projectList, 'booked')
    getLeadsDataFun(projectList, 'agreement_pipeline')
    getLeadsDataFun(projectList, 'sd_pipeline')
    getLeadsDataFun(projectList, 'registered')
    getLeadsDataFun(projectList, 'unassigned')
    console.log(
      'my Array data is ',
      queryResult,
      crmCustomersDBData,
      bookingReviewA
    )
  }

  const getProjectsListFun = () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        projectsListA.filter((data)=> {
          console.log('fetched proejcts list is kk',data.label, data?.projectType?.name , data?.projectType?.name == 'Plots')
         return data?.projectType?.name == 'Plots'
        })


        console.log('fetched proejcts list is kk', projectsListA)
        setprojectList(projectsListA.filter((data)=> {
          console.log('fetched proejcts list is kk',data.label, data?.projectType?.name , data?.projectType?.name == 'Plots')
         return data?.projectType?.name != 'Plots'
        }))
      },
      (error) => setprojectList([])
    )
    return unsubscribe
  }

  useEffect(() => {
    // if (selCategory === 'manage') {
    //   setTabHeadFields(DocumentationHeadA)
    // } else if (selCategory === 'Query') {
    //   setTabHeadFields(QueriesHeadA)
    // } else if (selCategory === 'Finance') {
    //   setTabHeadFields(FinanceHeadA)
    // } else if (selCategory === 'Legal') {
    //   setTabHeadFields(LegalHeadA)
    // } else if (selCategory === 'Construction') {
    //   setTabHeadFields(ConstructionHeadA)
    // }
    // if (selCategory === 'unAssigned_crm') {
    //   setTableDataA(bookingReviewDummy)
    //   setTableHeadFieldsA(bookingReviewTableHeadA)
    // } else if (selCategory === 'agreement_pipeline') {
    //   setTableDataA(preRegisterDummy)
    //   setTableHeadFieldsA(perResisterTableHeadA)
    // } else if (selCategory === 'sd_pipeline') {
    //   setTableDataA(postRegisterDummy)
    //   setTableHeadFieldsA(postResisterTableHeadA)
    // } else if (selCategory === 'queries') {
    //   setTableDataA(queriesDummy)
    //   setTableHeadFieldsA(queriesTableHeadA)
    // } else if (selCategory === 'booked') {
    //   setTableDataA(bookingReviewDummy)
    //   setTableHeadFieldsA(bookingReviewTableHeadA)
    // }
  }, [selCategory])

  const rowsCounter = (parent, searchKey) => {
    return parent.filter((item) => {
      if (searchKey === 'all') {
        return item
      } else if (item.status.toLowerCase() === searchKey.toLowerCase()) {
        console.log('All1', item)
        return item
      }
    })
  }
  const getCustomerDataFun = async (projectList) => {
    console.log('login role detials', user)
    const { access, uid } = user

    const unsubscribe = getUnassignedCRMunits(
      orgId,
      async (querySnapshot) => {
        console.log('hello is ', querySnapshot.docs.length)
        const usersListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          const y = projectList.filter((proj) => proj?.uid == x?.pId)
          console.log(',my prject sel is  ===> ', projectList)
          if (y.length > 0) {
            console.log(',my prject sel is ', y)
            x.projName = y[0].projectName
          }
          return x
        })
        // setBoardData
        console.log('my Array data is ', usersListA, crmCustomersDBData)
        // await serealizeData(usersListA)

        // await setCrmCustomerDBData(usersListA)
        await console.log('my Array data is set it', crmCustomersDBData)
      },
      {
        status: [
          'latest',
          'reviewing',
          'review',
          'cleared',
          'rejected',
          '',
          // 'booked',
        ],
      },
      () => setCrmCustomerDBData([])
    )
    return unsubscribe
  }
  const getLeadsDataFun = async (projectList, statusFil) => {
    console.log('login role detials', user)
    const { access, uid } = user
    const unsubscribe = getBookedUnitsByProject(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          const y = projectList.filter((proj) => proj?.uid == x?.pId)
          console.log(',my prject sel is  ===> ', projectList)
          if (y.length > 0) {
            console.log(',my prject sel is ', y)
            x.projName = y[0].projectName
          }
          return x
        })
        // setBoardData
        console.log('my Array data is ', usersListA, crmCustomersDBData)
        // await serealizeData(usersListA)
        usersListA.sort((a, b) => {
          return b?.booked_on || 0 - b?.booked_on || 0
        })
        await setCrmCustomerDBData(usersListA)

        await console.log(
          'my Array data is =====>',
          usersListA.length,
          queryResult.length,
          crmCustomersDBData
        )
        if (statusFil === 'booked') {
          await console.log(
            'my Array data is ',
            usersListA.length,
            queryResult.length
          )
          await setBookingReviewA(usersListA)
          await setBookingReviewCo(usersListA.length)
          await usersListA.sort((a, b) => {
            return a.unit_no - b.unit_no
          })
          await setQueryResult(usersListA)
        } else if (statusFil === 'agreement_pipeline') {
          await setAgreePipeA(usersListA)
          await setAgreePipeCo(usersListA.length)
        } else if (statusFil === 'sd_pipeline') {
          await setSdPipeA(usersListA)
          await setSdPipeCo(usersListA.length)
        } else if (statusFil === 'registered') {
          await setRegisteredA(usersListA)
          await setRegisteredCo(usersListA.length)
        } else if (statusFil === 'unassigned') {
          await setUnAssignedA(usersListA)
          await setUnAssignedCo(usersListA.length)
        }
        await console.log('my Array data is set it', crmCustomersDBData)
      },
      {
        status: [statusFil],
        projectId: selProjectIs?.uid,
        assignedTo: selLeadsOf?.value === 'myunits' ? uid : undefined,
      },
      () => setCrmCustomerDBData([])
    )
    return unsubscribe

    // await console.log('leadsData', leadsData)
  }

  const serealizeData = (array) => {
    // let newData =
    const x = [
      'new',
      'review',
      'cleared',
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
    setisUnitDetailsOpen(true)
    setSelUnitDetails(data)
  }

  const viewTransaction = (docData, sideViewCategory, sideViewCategory1) => {
    console.log('check it ', docData, sideViewCategory, sideViewCategory1)
    setSelSubMenu(sideViewCategory)
    setSelSubMenu1(sideViewCategory1)
    setTransactionData(docData)
    setisUnitDetailsOpen(!isUnitDetailsOpen)
    setSelUnitDetails(docData)
  }
  return (
    <>
      <div className=" font-rubikF mt-2 bg-white rounded-t-lg ">
        <div className="">
          <div
            className="
            "
          >
            <div className="flex items-center flex-row flex-wrap justify-between py-1 pb-5  px-3 py-3 bg-gray-50 rounded-t-md ">
              <h2 className="text-md font-semibold text-black leading-light font-Playfair">
                Construction
              </h2>

              <div className="flex">
                <div className=" flex flex-col mr-5  w-40">
                  <VerySlimSelectBox
                    name="project"
                    label=""
                    className="input "
                    onChange={(value) => {
                      console.log('changed value is ', value.value)
                      setSelProject(value)
                      // formik.setFieldValue('project', value.value)
                    }}
                    value={selProjectIs?.value}
                    // options={aquaticCreatures}
                    options={[
                      ...[{ label: 'All Events', value: 'allprojects' }],
                      ...projectList,
                    ]}
                  />
                </div>
                {access?.includes('manage_leads') && (
                  <div className=" flex flex-col   w-40">
                    <VerySlimSelectBox
                      name="project"
                      label=""
                      placeholder="My Leads"
                      className="input "
                      onChange={(value) => {
                        console.log('changed value is ', value.value)
                        setSelLeadsOf(value)
                        // formik.setFieldValue('project', value.value)
                      }}
                      value={selLeadsOf?.value}
                      // options={aquaticCreatures}
                      options={[
                        ...[
                          { label: 'Team Units', value: 'teamunits' },
                          { label: 'My Units', value: 'myunits' },
                        ],
                        ...usersList,
                      ]}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="items-center justify-between  my-1 bg-white rounded-lg  ">
              {/* <div>
                <h2 className="text-lg font-semibold text-gray-900 leading-light py-2 ">
                  Accounts Transactions Space
                </h2>
              </div> */}

              <div className=" border-gray-900  bg-[#F1F5F9] rounded-t-lg flex flex-row justify-between">
                <ul
                  className="flex   rounded-t-lg "
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  {[
                    { lab: 'Booking Review', val: 'booked' },
                    { lab: 'Agreement Pipeline', val: 'agreement_pipeline' },

                    { lab: 'SD/Registration Pipeline', val: 'sd_pipeline' },

                    { lab: 'Registered', val: 'registered' },
                    { lab: 'Unassigned', val: 'unAssigned_crm' },

                    { lab: 'Queries', val: 'queries' },
                  ].map((d, b) => {
                    return (
                      <li
                        key={b}
                        className="mr-2 ml-2 text-sm font-bodyLato"
                        role="presentation"
                      >
                        <button
                          className={`inline-block py-3 mr-3 px-1 text-sm font-medium  font-rubikF text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${
                            selCategory === d.val
                              ? 'border-black text-black'
                              : 'border-transparent'
                          }`}
                          type="button"
                          role="tab"
                          onClick={() => setSelCategory(d.val)}
                        >
                          {`${d.lab} `}
                          <span className="border border-gray-300 text-gray-800 px-1 py-1 rounded-full ml-[4px] text-[10px] ">
                            {d.val === 'booked' && (
                              <span>{bookingReviewCo}</span>
                            )}
                            {d.val === 'agreement_pipeline' && (
                              <span>{agreePipeCo}</span>
                            )}
                            {d.val === 'sd_pipeline' && <span>{sdPipeCo}</span>}
                            {d.val === 'registered' && (
                              <span>{registeredCo}</span>
                            )}
                            {d.val === 'unAssigned_crm' && (
                              <span>{unassignedCo}</span>
                            )}
                            {d.val === 'queries' && <span>{unassignedCo}</span>}
                          </span>
                          {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                        </button>
                      </li>
                    )
                  })}
                </ul>
                <div className="flex flex-row mr-4 mt-2">
                  <span
                    className="flex mt-[4px] mr-[8px] justify-center items-center w-6 h-6 bg-gradient-to-r from-violet-200 to-pink-200 rounded-full  cursor-pointer "
                    onClick={() => {
                      console.log('chek it', horizontalMode)
                      setHorizontalMode(!horizontalMode)
                    }}
                  >
                    <PuzzleIcon className=" w-3 h-3" />
                  </span>
                  <span
                    className="flex mt-[4px] mr-[0px] justify-center items-center w-6 h-6 bg-gradient-to-r from-violet-200 to-pink-200 rounded-full  cursor-pointer "
                    onClick={() => {
                      setShowSettings(!showSettings)
                    }}
                  >
                    <SearchIcon className=" w-3 h-3" />
                  </span>
                </div>
              </div>
              <div
                className={`${
                  showSettings ? 'hidden' : ''
                } flex flex-row py-2 justify-between `}
              >
                <div className="flex flex-row w-full">
                  <span className="flex ml-2 mr-2 h-[34px] bg-gray-50 border border-gray-300 border-solid box-border w-1/3 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4  mt-[9px] mx-2"
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
                      placeholder="Search Unit No, Customer name, Phone no, Dues..."
                      // onChange={searchKeyField}
                      autoComplete="off"
                      // value={searchKey}
                      className="w-52 bg-transparent focus:border-transparent focus:ring-0 focus-visible:border-transparent focus-visible:ring-0 focus:outline-none text-sm leading-7 text-gray-900 w-4/5 relative"
                    />
                  </span>
                  <div className=" mr-2">
                    <SlimSelectBox
                      name="project"
                      label=""
                      className="input "
                      onChange={(value) => {
                        console.log('value is ', value)
                        setSelProject(value)
                        // formik.setFieldValue('project', value.value)
                      }}
                      value={selProjectIs?.value}
                      // options={aquaticCreatures}
                      options={[
                        ...[{ label: 'All Events', value: 'allprojects' }],
                        ...projectList,
                      ]}
                    />
                  </div>
                  <div className=" mt-[-4px]">
                    <SlimDateSelectBox
                      onChange={async (value) => {
                        setSourceDateRange(value)
                        //getLeadsDataFun()
                      }}
                      label={sourceDateRange}
                      placeholder={undefined}
                    />
                  </div>

                  <span className="mt-2 ml-2 text-red-400 cursor-pointer text-xs">
                    {' '}
                    Clear
                  </span>
                </div>
                <span style={{ display: '' }}>
                  <CSVDownloader
                    className="mr-6 h-[20px] w-[20px] mt-2"
                    downloadRows={bookingReviewA}
                    style={{ height: '20px', width: '20px' }}
                  />
                </span>
              </div>
              <div className="flex px-6">
                {leadsTyper == 'inProgress' && (
                  <span className="inline-flex p-1 border bg-gray-200 rounded-md">
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
              <div className="overflow-hidden  px-1 pb-1 rounded-md  ">
                <div className="flex flex-col app-bg-white-1  pb-[1px]">
                  <div className="flex flex-row pt-[1px]">
                    <span className="text-lg font-bold app-color-black"></span>
                  </div>

                  {selCategory === 'booked' && horizontalMode && (
                    <ul>
                      <li>
                        {queryResult.map((finData, c) => {
                          const {
                            uid,
                            assets,
                            customerDetailsObj,
                            customerName1,
                            phoneNo1,
                            unit_no,
                            T_balance,
                            T_elgible,
                            T_review,
                            T_captured,
                            pId,
                            projName,
                          } = finData
                          console.log('fin data is ', finData)
                          return (
                            <div
                              key={c}
                              className="w-3/12  relative  inline-block cursor-pointer"
                              onClick={() =>
                                viewTransaction(
                                  finData,
                                  'unit_information',
                                  'unit_information'
                                )
                              }
                            >
                              <div className="m-1 pt- pb-3 bg-white rounded-lg border border-gray-200">
                                <section className="flex flex-row px-3  pt-2 justify-between">
                                  <div className="flex flex-row">
                                    <section className="bg-violet-100  items-center rounded-2xl shadow-xs flex flex-col px-2 py-1">
                                      <div className="font-semibold text-[#053219]  text-[22px]  mb-[1] tracking-wide">
                                        {unit_no}
                                      </div>
                                      <span
                                        className={`items-center h-6   text-xs font-semibold text-gray-500  rounded-full
                      `}
                                      >
                                        Unit No
                                      </span>
                                    </section>
                                    <div className="flex flex-col ml-2 item-right">
                                      <span
                                        className={`items-center h-1 mt-[6px] mb-2  text-xs font-semibold text-green-600
                      `}
                                      >
                                        {customerDetailsObj?.customerName1 ||
                                          'NA'}
                                      </span>
                                      <div className="font text-[12px] text-gray-500 tracking-wide overflow-ellipsis overflow-hidden ">
                                        {projName}
                                      </div>
                                      <section>
                                        <span className="  text-[10px] h-[20px]  text-[#005E36] font-bodyLato font-[600] mt-[2px] border border-[#ECFDF5] px-[6px] py-[2px] rounded-xl mr-1 ">
                                          {finData?.area?.toLocaleString(
                                            'en-IN'
                                          )}{' '}
                                          sqft
                                        </span>

                                        <span className="  text-[10px] h-[20px] text-[#005E36] font-bodyLato font-[600] mt-[2px] border border-[#ECFDF5] px-[6px] py-[2px] rounded-xl mr-1 ">
                                          {finData?.facing}
                                        </span>
                                        {/* <span className=" text-[10px] h-[20px] text-[#823d00] font-bodyLato font-[600] mt-[2px] bg-[#ffeccf] px-[6px] py-[2px] rounded-xl mr-1 ">
                                        ₹{' '}
                                        {finData?.sqft_rate?.toLocaleString(
                                          'en-IN'
                                        )}
                                        /sqft
                                      </span> */}
                                      </section>
                                    </div>
                                  </div>
                                </section>
                                <div className="flex flex-row justify-between px-4 pt-4">
                                  <section className="flex flex-col ">
                                    <div className="flex flex-row">
                                      <div className="self-stretch text-zinc-500 text-sm font-medium font-['Lato'] tracking-wide">
                                        Unit Cost
                                      </div>
                                      <div className="px-1  h-[19px] rounded justify-center items-center gap-2 flex">
                                        <div className="text-right">
                                          <span className="text-emerald-600 text-xs font-medium font-['Lato'] tracking-wide">
                                            ▴{' '}
                                          </span>
                                          <span className="text-emerald-600 text-[9px] font-bold font-['Lato'] tracking-wide">
                                            ₹{' '}
                                            {finData?.sqft_rate?.toLocaleString(
                                              'en-IN'
                                            )}
                                            /sqft{' '}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="self-stretch justify-start items-center gap-3 inline-flex">
                                      <div className="text-zinc-800 text-[20px] font-bold font-['Lato'] tracking-wide">
                                        ₹
                                        {(
                                          (finData?.plotCS?.reduce(function (
                                            _this,
                                            val
                                          ) {
                                            return (
                                              _this + val.TotalNetSaleValueGsT
                                            )
                                          },
                                          0) || 0) +
                                            finData?.addChargesCS?.reduce(
                                              (partialSum, obj) =>
                                                partialSum +
                                                Number(
                                                  computeTotal(
                                                    obj,
                                                    finData?.super_built_up_area ||
                                                      finData?.area?.toString()?.replace(',', '')
                                                  )
                                                ),
                                              0
                                            ) || 0
                                        )?.toLocaleString('en-IN')}
                                      </div>
                                    </div>
                                  </section>

                                  <section className="flex flex-col mt-3">
                                    <div className=" text-zinc-500 text-[11px] font-normal font-['Lato'] tracking-wide">
                                      Balance ₹
                                      {finData?.T_elgible_balance?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </div>
                                    <div className="text-zinc-500 text-[11px] font-normal font-['Lato'] tracking-wide">
                                      Paid: ₹
                                      {(finData?.T_review || 0 + finData?.T_approved || 0)?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </div>
                                  </section>
                                </div>

                                <div className="flex flex-row mx-3 ml-4 pt-3">
                                  {[{ item: 'Paid', value: 3 }].map(
                                    (data, i) => (
                                      <div
                                        className=" w-3/4  "
                                        style={{
                                          display: 'inline-block',
                                          alignSelf: 'flex-end',
                                        }}
                                        key={i}
                                      >
                                        <div className="">
                                          <LinearProgress
                                            sx={{
                                              backgroundColor: 'white',
                                              '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#cdc4f7',
                                              },
                                            }}
                                            variant="determinate"
                                            value={100}
                                            style={{
                                              backgroundColor: '#cdc4f7',
                                              borderRadius: '3px',
                                              borderTopRightRadius: '0px',
                                              borderBottomRightRadius: '0px',
                                              height: `${data.value}px`,
                                              width: `100%`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )
                                  )}
                                  {[{ item: 'Due', value: 3 }].map(
                                    (data, i) => (
                                      <div
                                        className=" w-2/4  "
                                        style={{
                                          display: 'inline-block',
                                          alignSelf: 'flex-end',
                                        }}
                                        key={i}
                                      >
                                        <div className="">
                                          <LinearProgress
                                            sx={{
                                              backgroundColor: 'white',
                                              '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#F0F4F8',
                                              },
                                            }}
                                            variant="determinate"
                                            value={100}
                                            style={{
                                              backgroundColor: '#F0F4F8',
                                              borderRadius: '3px',
                                              borderTopLeftRadius: '0px',
                                              borderBottomLeftRadius: '0px',
                                              height: `${data.value}px`,
                                              width: `100%`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>

                                <div className="w-[253px] mx-4 left-[25px] mt-3 ml-4 justify-start items-center gap-2 inline-flex">
                                  <div
                                    className={`grow shrink basis-0 px-2.5 py-1.5 rounded-[16px] flex-col justify-center items-center gap-2 inline-flex ${
                                      finData?.man_cs_approval == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.man_cs_approval == 'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <div
                                      className={`self-stretch h-4 text-center  text-xs font-medium tracking-wide`}
                                      onClick={() => {
                                        setSelUnitDetails(finData)
                                        setIsSubTopicOpen(true)
                                        setIsSubTopic('crm_cs_approval')
                                      }}
                                    >
                                      CS Approval
                                    </div>
                                  </div>
                                  <div
                                    className={`grow shrink basis-0 px-2.5 py-1.5 bg-gray-200 rounded-[16px] flex-col justify-center items-center gap-2 inline-flex ${
                                      finData?.kyc_status == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.kyc_status == 'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_KYC')
                                    }}
                                  >
                                    <div className="self-stretch h-4 text-center text-zinc-800 text-xs font-medium font-['Lato'] tracking-wide">
                                      KYC
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}{' '}
                      </li>
                    </ul>
                  )}
                  {selCategory === 'booked' &&
                    !horizontalMode &&
                    queryResult.map((finData, c) => {
                      const {
                        uid,
                        assets,
                        customerDetailsObj,
                        customerName1,
                        phoneNo1,
                        unit_no,
                        T_balance,
                        T_elgible_balance,
                        T_elgible,
                        T_review,
                        T_captured,
                        pId,
                        projName,
                      } = finData
                      console.log('fin data is ', finData)
                      return (
                        <section
                          key={c}
                          className="border mb-1  shadow rounded-md  shadow "
                        >
                          <section className="flex flex-row bg-gradient-to-r from-[#F2F3F8] to-[#F2F3F8]">
                            <div className="w-[387px]">
                              <div className="flex flex-row   ">
                                <div
                                  className="flex flex-col bg-gradient-to-r from-[#d8daff] to-[#9ae8fd] text-black  py-1 rounded-sm w-[437px] "
                                  // className="flex flex-col bg-gradient-to-r from-[#d8daff] to-[#9ae8fd] text-black p-1 rounded-sm w-[220px] h-[96px]"
                                  onClick={() =>
                                    viewTransaction(
                                      finData,
                                      'unit_information',
                                      'unit_information'
                                    )
                                  }
                                >
                                  <section className="font-rubikF flex flex-row w-[100%] justify-between">
                                    <section className="flex flex-col ml-2 mt-[3px] w-[100%]">
                                      <section className="flex flex-row justify-between">
                                        {/* <section className="flex flex-col">
                                          <section className="flex flex-row justify-between">
                                            <span className=" text-[14px] text-black font-[500] ml-[2px]">
                                              Unit-{unit_no}
                                              {finData?.unit_type ===
                                                'apartment' && (
                                                <span className=" text-[10px] text-black font-[500] ml-[2px]">
                                                  Block-{finData?.blockId}
                                                </span>
                                              )}
                                              <span className=" text-[10px] text-black font-[500] ml-[2px]">
                                                Phase-{finData?.phaseId}{' '}

                                              </span>
                                            </span>
                                          </section>
                                          <span className=" text-[12px] text-[#036046] font-[400] ml-[2px]">
                                            {projName}
                                          </span>
                                        </section> */}
                                        <div className="flex flex-row w-full">
                                          <section className="bg-violet-100  items-center rounded-2xl shadow-xs flex flex-col px-2 py-1 min-w-[100px]">
                                            <div className="font-semibold text-[#053219]  text-[22px]  mb-[1] tracking-wide">
                                              {unit_no}
                                            </div>
                                            <span
                                              className={`items-center h-6   text-xs font-semibold text-gray-500  rounded-full
                      `}
                                            >
                                              Unit No
                                            </span>
                                          </section>
                                          <div className="flex flex-col w-full  ml-2 item-right bg-[#f0f8ff]  px-2  mr-2 rounded-lg">
                                            <span
                                              className={`items-center h-1 mt-[6px] mb-2  text-xs font-semibold text-green-600
                      `}
                                            >
                                              {customerDetailsObj?.customerName1 ||
                                                'NA'}
                                            </span>
                                            <div className="font text-[12px] text-gray-500 tracking-wide overflow-ellipsis overflow-hidden ">
                                              {projName}
                                            </div>
                                            <section className="flex flex-row justify-between">
                                              <span className="  text-[10px] h-[20px]  text-[#005E36] font-bodyLato font-[600] mt-[2px] border border-[#ECFDF5]  py-[2px] rounded-xl mr-1 ">
                                                {finData?.customerDetailsObj?.phoneNo1?.toLocaleString(
                                                  'en-IN'
                                                )}{' '}
                                              </span>

                                              <span className="  text-[10px] h-[20px] text-[#005E36] font-bodyLato font-[600] mt-[2px] border border-[#ECFDF5] px-[6px] py-[2px] rounded-xl mr-1 ">
                                                Booked:{' '}
                                                {prettyDate(
                                                  finData?.booked_on ||
                                                    finData?.ct ||
                                                    0
                                                )}
                                              </span>
                                            </section>
                                          </div>
                                        </div>
                                      </section>

                                      <section className="flex flex-row mt-3  ">
                                        {/* <span className=" text-[10px] h-[20px]  text-[#823d00] font-bodyLato font-[600] mt-[2px] bg-[#ffeccf] px-[6px] py-[2px] rounded-xl  mr-1">
                                          {finData?.unit_type}

                                        </span> */}
                                        <section>
                                          <span className="  text-[10px] h-[20px]  text-[#823d00] font-bodyLato font-[600] mt-[2px] bg-[#ffeccf] px-[6px] py-[2px] rounded-xl mr-1 ">
                                            {/* {finData?.[`${assets[0]}_unitDetails`]
                                          ?.unit_no || ''} */}
                                            {finData?.area?.toLocaleString(
                                              'en-IN'
                                            )}{' '}
                                            sqft
                                          </span>

                                          <span className="  text-[10px] h-[20px] text-[#823d00] font-bodyLato font-[600] mt-[2px] bg-[#ffeccf] px-[6px] py-[2px] rounded-xl mr-1 ">
                                            {finData?.facing}
                                          </span>
                                          <span className=" text-[10px] h-[20px] text-[#823d00] font-bodyLato font-[600] mt-[2px] bg-[#ffeccf] px-[6px] py-[2px] rounded-xl mr-1 ">
                                            {/* {finData?.[`${assets[0]}_unitDetails`]
                                          ?.unit_no || ''} */}
                                            ₹{' '}
                                            {finData?.sqft_rate?.toLocaleString(
                                              'en-IN'
                                            )}
                                            /sqft
                                          </span>
                                        </section>
                                        <span className=" truncate text-[10px] h-[18px] text-[#823d00] font-bodyLato font-[600] mt-[5px] bg-[#ffeccf] px-[6px] py-[2px] rounded-xl mr-1 ">
                                          {finData?.assignedToObj?.name ||
                                            'Not Assigned'}
                                        </span>
                                        {/* <span className=" text-[8px] h-[18px] text-black font-bodyLato font-[600] mt-[2px] bg-[#ffeccf] px-[6px] py-[2px] rounded-xl mr-1 ">
                                        Status:{' '}
                                            {prettyDate(finData?.Date || 0)}
                                        </span> */}
                                      </section>
                                    </section>
                                  </section>
                                  {/* <span className="font-normal text-xs app-color-gray-1">
                                  {finData?.ph}
                                </span> */}
                                </div>
                              </div>
                            </div>


                            <div className="w-2/4 bg-[#f2f3f8] px-1">
                              <div className="flex flex-col bg-white shadow rounded-md my-1   py-1">
                                <div className="flex flex-row justify-between px-1">
                                  <div
                                    className={`w-full cursor-pointer  h-[80px] ${
                                      T_elgible_balance <= 0
                                        ? 'bg-green-100'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_booking_payment')
                                    }}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            T_balance <= 0
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        Payment
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 2 */}
                                  <div
                                    className={`w-full  cursor-pointer  h-[80px] ${
                                      finData?.man_cs_approval == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.man_cs_approval == 'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_cs_approval')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-green-50 group-hover:bg-white">
                                        <ChartPieIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            finData?.man_cs_approval ===
                                            'approved'
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        Manager
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 3*/}
                                  <div
                                    className={`w-full cursor-pointer  h-[80px] ${
                                      finData?.kyc_status == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.kyc_status == 'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_KYC')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            finData?.kyc_status == 'approved'
                                              ? 'bg-green-100'
                                              : finData?.kyc_status ==
                                                'rejected'
                                              ? 'bg-[#ffdbdb]'
                                              : 'bg-[#F1F5F9] '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        KYC
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 4*/}
                                  <div
                                    className={`w-full cursor-pointer  h-[80px] ${
                                      true ? 'bg-green-100' : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_show_cs')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            1 === 1
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        CS
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                               {/* check it  */}
                               <div>
                              <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 pb-4 min-w-[244px] justify-between mx-2">
                                <div className="flex flex-row justify-between mx- mb-2">
                                  <section className="font-bodyLato font-semibold text-xs m-1 w-full">
                                    <div className="text-zinc-500 text-sm font-medium font-['Lato'] tracking-wide">
                                      Unit Cost
                                    </div>
                                    <div className="text-zinc-800 text-[20px] font-bold font-['Lato'] tracking-wide">
                                      ₹
                                      {(
                                        (finData?.plotCS?.reduce(function (
                                          _this,
                                          val
                                        ) {
                                          return (
                                            _this + val.TotalNetSaleValueGsT
                                          )
                                        },
                                        0) || 0) +
                                          finData?.addChargesCS?.reduce(
                                            (partialSum, obj) =>
                                              partialSum +
                                              Number(
                                                computeTotal(
                                                  obj,
                                                  finData?.super_built_up_area ||
                                                    finData?.area?.toString()?.replace(',', '')
                                                )
                                              ),
                                            0
                                          ) || 0
                                      )?.toLocaleString('en-IN')}
                                    </div>
                                  </section>
                                  <section className="flex flex-col mt-3 w-full">
                                    <p className="flex flex-row justify-end text-zinc-500 text-[11px] font-normal font-['Lato'] tracking-wide">
                                      Balance: ₹
                                      {finData?.T_balance?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </p>
                                    <div className="text-zinc-500 flex flex-row justify-end text-[11px] font-normal font-['Lato'] tracking-wide">
                                      Paid: ₹
                                      {(finData?.T_review || 0 + finData?.T_approved || 0).toLocaleString(
                                        'en-IN'
                                      ) || 0}
                                    </div>
                                  </section>
                                </div>
                                <div className="flex flex-row mx-1 pt-">
                                  {[{ item: 'Paid', value: 3 }].map(
                                    (data, i) => (
                                      <div
                                        className=" w-3/4  "
                                        style={{
                                          display: 'inline-block',
                                          alignSelf: 'flex-end',
                                        }}
                                        key={i}
                                      >
                                        <div className="">
                                          <LinearProgress
                                            sx={{
                                              backgroundColor: 'white',
                                              '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#ffab00',
                                              },
                                            }}
                                            variant="determinate"
                                            value={100}
                                            style={{
                                              backgroundColor: '#E5EAF2',
                                              borderRadius: '3px',
                                              borderTopRightRadius: '0px',
                                              borderBottomRightRadius: '0px',
                                              height: `${data.value}px`,
                                              width: `100%`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )
                                  )}
                                  {[{ item: 'Due', value: 3 }].map(
                                    (data, i) => (
                                      <div
                                        className=" w-2/4  "
                                        style={{
                                          display: 'inline-block',
                                          alignSelf: 'flex-end',
                                        }}
                                        key={i}
                                      >
                                        <div className="">
                                          <LinearProgress
                                            sx={{
                                              backgroundColor: 'white',
                                              '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#ffab003d',
                                              },
                                            }}
                                            variant="determinate"
                                            value={100}
                                            style={{
                                              backgroundColor: '#ffab003d',
                                              borderRadius: '3px',
                                              borderTopLeftRadius: '0px',
                                              borderBottomLeftRadius: '0px',
                                              height: `${data.value}px`,
                                              width: `100%`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 pb-4 min-w-[244px] justify-between mr-1">
                                <div className="flex flex-row justify-between mx- mb-2">
                                  <section className="font-bodyLato font-semibold text-xs m-1 w-full">
                                    <div className="mb-[2px] text-zinc-500 text-sm font-medium font-['Lato'] tracking-wide">
                                      Eligible Amount
                                    </div>
                                    <div className="text-zinc-800 text-[20px] font-bold font-['Lato'] tracking-wide">
                                      ₹
                                      {/* {finData?.T_elgible_balance?.toLocaleString(
                                          'en-IN'
                                        )} */}
                                      {finData?.T_elgible?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </div>
                                  </section>
                                  <section className="flex flex-col mt-3 w-full">
                                    <div className="flex flex-row justify-end text-zinc-500 text-[11px] font-normal font-['Lato'] tracking-wide">
                                      🔥 Balance: ₹
                                      {finData?.T_elgible_balance?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </div>
                                    <div className="text-zinc-500 flex flex-row justify-end text-[11px] font-normal font-['Lato'] tracking-wide">
                                      Paid: ₹
                                      {(finData?.T_review || 0 + finData?.T_approved || 0)?.toLocaleString(
                                        'en-IN'
                                      )}
                                    </div>
                                  </section>
                                </div>
                                <div className="flex flex-row mx-1 pt-">
                                  {[{ item: 'Paid', value: 3 }].map(
                                    (data, i) => (
                                      <div
                                        className=" w-3/4  "
                                        style={{
                                          display: 'inline-block',
                                          alignSelf: 'flex-end',
                                        }}
                                        key={i}
                                      >
                                        <div className="">
                                          <LinearProgress
                                            sx={{
                                              backgroundColor: 'white',
                                              '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#22c55e',
                                              },
                                            }}
                                            variant="determinate"
                                            value={100}
                                            style={{
                                              backgroundColor: '#E5EAF2',
                                              borderRadius: '3px',
                                              borderTopRightRadius: '0px',
                                              borderBottomRightRadius: '0px',
                                              height: `${data.value}px`,
                                              width: `100%`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )
                                  )}
                                  {[{ item: 'Due', value: 3 }].map(
                                    (data, i) => (
                                      <div
                                        className=" w-2/4  "
                                        style={{
                                          display: 'inline-block',
                                          alignSelf: 'flex-end',
                                        }}
                                        key={i}
                                      >
                                        <div className="">
                                          <LinearProgress
                                            sx={{
                                              backgroundColor: 'white',
                                              '& .MuiLinearProgress-bar': {
                                                backgroundColor: '#22c55e3d',
                                              },
                                            }}
                                            variant="determinate"
                                            value={100}
                                            style={{
                                              backgroundColor: '#22c55e3d',
                                              borderRadius: '3px',
                                              borderTopLeftRadius: '0px',
                                              borderBottomLeftRadius: '0px',
                                              height: `${data.value}px`,
                                              width: `100%`,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* <div className=" w-1/4 flex flex-col-reverse ml-3">
                            <div className="flex flex-wrap  p-1 pl-0 pt-0 pb-0  mb-[16px] bg-[#F1F5F9]">
                              {[

                                {
                                  item: 'Payment Schedule',
                                  status: 'completed',
                                },

                                {
                                  item: 'Cost Sheet',
                                  status: 'completed',
                                },



                                {
                                  item: 'Bank Loan',
                                  status: 'pending',
                                },
                              ].map((dat, i) => (
                                <span
                                  key={i}
                                  className={`pl-2 pr-1 py-[4px] mr-2  text-[#333] bg-[#${
                                    dat.status === 'completed'
                                      ? 'F1F5F9'
                                      : 'F1F5F9'
                                  }] font-bodyLato text-[10px] flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease`}
                                >
                                  {dat?.item}
                                  {dat?.status === 'completed' && (
                                    <CheckCircleIcon className="w-4 h-4 ml-1 inline text-[#3EE494]" />
                                  )}
                                  {dat?.status === 'pending' && (
                                    <ShieldExclamationIcon className="w-4 h-4 ml-1 inline text-[#8e544d]" />
                                  )}

                                </span>
                              ))}
                            </div>
                            <div className="flex flex-row justify-between px-2 py-1  text-black   w-[640px]">
                              <section>
                                <span className="font-normal text-sm text-uppercase app-color-gray-1 inline-block max-w-[100px] min-w-[100px] w-[100px] mb-[4px]">
                                  {finData?.ownerName}
                                </span>
                                <span className="font-normal ml-4 text-xs app-color-gray-1 inline-block max-w-[100px] min-w-[100px] w-[100px]">
                                  {finData?.ph}
                                </span>
                              </section>
                              <section className="inline-block max-w-[100px] min-w-[100px] w-[100px]">
                                <span className="font-normal ml-6 text-[10px] app-color-gray-1 text-[#b3b3b3]">
                                  Bal
                                </span>
                                <span className="font-normal ml-2 text-xs app-color-gray-1 text-[#F59A4C]">
                                  {finData?.pending || 0}
                                </span>
                              </section>
                              <section className="inline-block max-w-[400px] min-w-[100px]">
                                <span className="font-normal ml-6 text-[10px] app-color-gray-1 text-[#b3b3b3]">
                                  Review
                                </span>
                                <span className="font-normal ml-2 text-xs app-color-gray-1">
                                  {finData?.reviw || 0}
                                </span>
                              </section>
                              <section className="inline-block max-w-[400px] min-w-[100px] text-right">
                                <span className="font-normal ml-6 text-[10px] app-color-gray-1 text-[#b3b3b3]">
                                  T Cost
                                </span>
                                <span className="font-normal ml-2 text-xs app-color-gray-1 text-right">
                                  {finData?.Breviw || 0}
                                </span>
                              </section>
                            </div>
                          </div> */}
                          </section>
                        </section>
                      )
                    })}
                  {selCategory === 'agreement_pipeline' &&
                    agreePipeA.map((finData, g) => {
                      const {
                        uid,
                        assets,
                        customerDetailsObj,
                        customerName1,
                        phoneNo1,
                        unit_no,
                        T_balance,
                        T_elgible,
                        T_review,
                        T_captured,
                        pId,
                        projName,
                      } = finData
                      return (
                        <section
                          key={g}
                          className="border mb-1  shadow rounded-md  shadow"
                        >
                          <section className="flex flex-row">
                            <div className="">
                              <div className="flex flex-row   ">
                                <div
                                  className="flex flex-col bg-gradient-to-r from-[#d8daff] to-[#9ae8fd] text-black  py-1 rounded-sm w-[220px] h-[96px]"
                                  // className="flex flex-col bg-gradient-to-r from-[#d8daff] to-[#9ae8fd] text-black p-1 rounded-sm w-[220px] h-[96px]"
                                  onClick={() =>
                                    viewTransaction(
                                      finData,
                                      'unit_information',
                                      'unit_information'
                                    )
                                  }
                                >
                                  <section className="font-rubikF flex flex-row">
                                    {/* <img
                                      className="w-10 h-10 mr-2"
                                      alt=""
                                      src="/apart.svg"
                                    ></img> */}
                                    <section className="flex flex-col ml-2 mt-[3px]">
                                      <section className="flex flex-col">
                                        <section className="flex flex-row justify-between">
                                          <span className=" text-[14px] text-black font-[500] ml-[2px]">
                                            {/* {finData?.[`${assets[0]}_unitDetails`]
                                          ?.unit_no || ''} */}
                                            Unit-{unit_no}
                                          </span>
                                          <span className=" text-[10px] text-black font-bodyLato font-[600] mt-[2px] ">
                                            {/* {finData?.[`${assets[0]}_unitDetails`]
                                          ?.unit_no || ''} */}
                                            ₹{' '}
                                            {finData?.plotCS
                                              ?.reduce(function (_this, val) {
                                                return (
                                                  _this +
                                                  val.TotalNetSaleValueGsT
                                                )
                                              }, 0)
                                              ?.toLocaleString('en-IN')}
                                          </span>
                                        </section>
                                        <span className=" text-[12px] text-[#036046] font-[400] ml-[2px]">
                                          {projName}
                                        </span>
                                      </section>
                                      <section className="flex flex-col mt-1 bg-[#f0f8ff] w-[204px] rounded-lg p-[2px] px-2">
                                        <div className=" text-[12px] text-black-900 font-[400] w-full">
                                          {customerDetailsObj?.customerName1 ||
                                            'NA'}
                                        </div>
                                        <section className="flex flex-row justify-between">
                                          <span className=" text-[12px] text-black-500 font-[400]">
                                            {customerDetailsObj?.phoneNo1 ||
                                              'NA'}
                                          </span>
                                          <span className=" text-[10px] text-black font-[400] mt-[2px] ">
                                            {/* {finData?.[`${assets[0]}_unitDetails`]
                                          ?.unit_no || ''} */}
                                            12-June-2023
                                          </span>
                                        </section>
                                      </section>
                                    </section>
                                  </section>
                                  {/* <span className="font-normal text-xs app-color-gray-1">
                                  {finData?.ph}
                                </span> */}
                                </div>
                              </div>
                            </div>

                            <div className="w-2/4 bg-[#f2f3f8] px-1">
                              <div className="flex flex-col bg-white shadow rounded-md my-1   py-1">
                                <div className="flex flex-row justify-between px-1">
                                  <div
                                    className={`w-full  h-[80px] ${
                                      T_balance <= 0
                                        ? 'bg-green-100'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            T_balance <= 0
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        ATS Due
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 2 */}
                                  <div
                                    className={`w-full  h-[80px] ${
                                      finData?.man_cs_approval == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.man_cs_approval == 'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_legal_clarity')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-green-50 group-hover:bg-white">
                                        <ChartPieIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            finData?.man_ats_approval ==
                                            'approved'
                                              ? 'bg-green-100'
                                              : finData?.man_ats_approval ==
                                                'rejected'
                                              ? 'bg-[#ffdbdb]'
                                              : 'bg-[#F1F5F9] '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        Legal Clarity
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 3*/}
                                  <div
                                    className={`w-full  h-[80px] ${
                                      finData?.man_ats_approval == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.man_ats_approval ==
                                          'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_ATS_Draft')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            finData?.kyc_status
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        ATS Draft
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 4*/}
                                  <div
                                    className={`w-full  h-[80px] ${
                                      true ? 'bg-green-100' : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            1 === 1
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        Fund Type
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="w-2/4 bg-[#f2f3f8] px-1">
                              {' '}
                              <Box>
                                <>
                                  <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 min-w-[180px]">
                                    <div className="flex flex-row justify-between mx-1">
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        ₹{T_review?.toLocaleString('en-IN')}
                                      </h6>
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        ₹{T_balance?.toLocaleString('en-IN')}
                                      </h6>
                                    </div>
                                    <div className="flex flex-row mx-1">
                                      {[{ item: 'Paid', value: 6 }].map(
                                        (data, h) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_review / T_elgible) * 100
                                                ) <= 100
                                                  ? Math.round(
                                                      (T_review / T_elgible) *
                                                        100
                                                    )
                                                  : 100
                                              }%`,
                                            }}
                                            key={h}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#00a979',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E5EAF2',
                                                  borderRadius: '3px',
                                                  borderTopRightRadius: '0px',
                                                  borderBottomRightRadius:
                                                    '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-left mr-1  mb-1 mt-[4px] min-w-[100px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                {data.item} (
                                                {Number(
                                                  (T_review / T_elgible) * 100
                                                ) <= 100
                                                  ? Math.round(
                                                      (T_review / T_elgible) *
                                                        100
                                                    )
                                                  : 100}
                                                %)
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      {[{ item: 'Due', value: 6 }].map(
                                        (data, i) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_balance / T_elgible) * 100
                                                ) > 0
                                                  ? Math.round(
                                                      (T_balance / T_elgible) *
                                                        100
                                                    )
                                                  : 0
                                              }%`,
                                            }}
                                            key={i}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#d29a80',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E87F7F',
                                                  borderRadius: '3px',
                                                  borderTopLeftRadius: '0px',
                                                  borderBottomLeftRadius: '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-end mr-1  mb-1 mt-[4px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                {Number(
                                                  (T_balance / T_elgible) * 100
                                                ) > 0
                                                  ? `(${Math.round(
                                                      (T_balance / T_elgible) *
                                                        100
                                                    )})%`
                                                  : ''}{' '}
                                                {data.item}
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </>
                              </Box>
                            </div>
                          </section>
                        </section>
                      )
                    })}

                  {selCategory === 'sd_pipeline' &&
                    tableData.map((finData, j) => {
                      const {
                        uid,
                        assets,
                        customerDetailsObj,
                        customerName1,
                        phoneNo1,
                        unit_no,
                        T_balance,
                        T_elgible,
                        T_review,
                        T_captured,
                        pId,
                        projName,
                      } = finData
                      return (
                        <section
                          key={j}
                          className="border mb-1  shadow rounded-md  shadow"
                        >
                          <section className="flex flex-row">
                            <div className="">
                              <div className="flex flex-row   ">
                                <div
                                  // className="flex flex-col bg-gradient-to-r from-emerald-300 to-cyan-400 text-black p-1 rounded-sm w-[220px] h-[96px]"
                                  className="flex flex-col bg-gradient-to-r from-[#d8daff] to-[#9ae8fd] text-black p-1 rounded-sm w-[220px] h-[96px]"
                                  onClick={() =>
                                    viewTransaction(
                                      finData,
                                      'unit_information',
                                      'unit_information'
                                    )
                                  }
                                >
                                  <section className="font-rubikF flex flex-row">
                                    {/* <img
                                      className="w-10 h-10 mr-2"
                                      alt=""
                                      src="/apart.svg"
                                    ></img> */}
                                    <section className="flex flex-col ml-2 mt-[7px]">
                                      <span className=" text-[12px] text-[#036046] font-[400]">
                                        {projName}
                                      </span>
                                      <span className=" text-[14px] text-black font-[500] ">
                                        {/* {finData?.[`${assets[0]}_unitDetails`]
                                          ?.unit_no || ''} */}
                                        Unit-{unit_no}
                                      </span>

                                      <span className=" text-[12px] text-black-900 font-[400]">
                                        {customerDetailsObj?.customerName1 ||
                                          'NA'}
                                      </span>
                                      <span className=" text-[12px] text-black-500 font-[400]">
                                        {customerDetailsObj?.phoneNo1 || 'NA'}
                                      </span>
                                    </section>
                                  </section>
                                  {/* <span className="font-normal text-xs app-color-gray-1">
                                  {finData?.ph}
                                </span> */}
                                </div>
                              </div>
                            </div>
                            <div className="w-2/4 bg-[#f2f3f8] px-1">
                              {' '}
                              <Box>
                                <>
                                  <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 min-w-[180px]">
                                    <div className="flex flex-row justify-between mx-1">
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        ₹{T_review?.toLocaleString('en-IN')}
                                      </h6>
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        ₹{T_balance?.toLocaleString('en-IN')}
                                      </h6>
                                    </div>
                                    <div className="flex flex-row mx-1">
                                      {[{ item: 'Paid', value: 6 }].map(
                                        (data, k) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_review / T_elgible) * 100
                                                ) <= 100
                                                  ? Math.round(
                                                      (T_review / T_elgible) *
                                                        100
                                                    )
                                                  : 100
                                              }%`,
                                            }}
                                            key={k}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#00a979',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E5EAF2',
                                                  borderRadius: '3px',
                                                  borderTopRightRadius: '0px',
                                                  borderBottomRightRadius:
                                                    '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-left mr-1  mb-1 mt-[4px] min-w-[100px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                {data.item} (
                                                {Number(
                                                  (T_review / T_elgible) * 100
                                                ) <= 100
                                                  ? Math.round(
                                                      (T_review / T_elgible) *
                                                        100
                                                    )
                                                  : 100}
                                                %)
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      {[{ item: 'Due', value: 6 }].map(
                                        (data, l) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_balance / T_elgible) * 100
                                                ) > 0
                                                  ? Math.round(
                                                      (T_balance / T_elgible) *
                                                        100
                                                    )
                                                  : 0
                                              }%`,
                                            }}
                                            key={l}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#d29a80',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E87F7F',
                                                  borderRadius: '3px',
                                                  borderTopLeftRadius: '0px',
                                                  borderBottomLeftRadius: '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-end mr-1  mb-1 mt-[4px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                {Number(
                                                  (T_balance / T_elgible) * 100
                                                ) > 0
                                                  ? `(${Math.round(
                                                      (T_balance / T_elgible) *
                                                        100
                                                    )})%`
                                                  : ''}{' '}
                                                {data.item}
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </>
                              </Box>
                            </div>
                            <div className="w-1/4 bg-[#f2f3f8] px-1">
                              {' '}
                              <Box>
                                <>
                                  <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 min-w-[180px]">
                                    <div className="flex flex-row justify-between ">
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        Progress
                                      </h6>
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        0%
                                      </h6>
                                    </div>
                                    <div className="flex flex-row mx-1">
                                      {[{ item: 'Paid', value: 6 }].map(
                                        (data, m) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_review / T_elgible) * 100
                                                ) <= 100
                                                  ? Math.round(
                                                      (T_review / T_elgible) *
                                                        100
                                                    )
                                                  : 100
                                              }%`,
                                            }}
                                            key={m}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#00a979',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E5EAF2',
                                                  borderRadius: '3px',
                                                  borderTopRightRadius: '0px',
                                                  borderBottomRightRadius:
                                                    '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-left mr-1  mb-1 mt-[4px] min-w-[100px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                Construction
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      {[{ item: 'Due', value: 6 }].map(
                                        (data, n) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_balance / T_elgible) * 100
                                                ) > 0
                                                  ? Math.round(
                                                      (T_balance / T_elgible) *
                                                        100
                                                    )
                                                  : 0
                                              }%`,
                                            }}
                                            key={n}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#d29a80',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E87F7F',
                                                  borderRadius: '3px',
                                                  borderTopLeftRadius: '0px',
                                                  borderBottomLeftRadius: '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-end mr-1  mb-1 mt-[4px]"></div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </>
                              </Box>
                            </div>
                            <div className="w-3/4 bg-[#f2f3f8] px-1">
                              <div className="flex flex-col bg-white shadow rounded-md my-1   py-1">
                                <div className="flex flex-row justify-between px-1">
                                  <div
                                    className={`w-full  h-[80px] ${
                                      T_balance <= 0
                                        ? 'bg-green-100'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            T_balance <= 0
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        SD Due
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 2 */}
                                  <div
                                    className={`w-full  h-[80px] ${
                                      finData?.both_sd_approval == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.both_sd_approval ==
                                          'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_SD_Approval')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-green-50 group-hover:bg-white">
                                        <ChartPieIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            finData?.both_sd_approval ==
                                            'approved'
                                              ? 'bg-green-100'
                                              : finData?.both_sd_approval ==
                                                'rejected'
                                              ? 'bg-[#ffdbdb]'
                                              : 'bg-[#F1F5F9] '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        SD Creation
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 3*/}
                                  <div
                                    className={`w-full  h-[80px] ${
                                      finData?.both_sd_approval == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.both_sd_approval ==
                                          'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_SD_Approval')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            finData?.both_sd_approval ==
                                            'approved'
                                              ? 'bg-green-100'
                                              : finData?.both_sd_approval ==
                                                'rejected'
                                              ? 'bg-[#ffdbdb]'
                                              : 'bg-[#F1F5F9] '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        SD Approval
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 4*/}
                                  <div
                                    className={`w-full  h-[80px] ${
                                      false ? 'bg-green-100' : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            1 != 1
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        Loan
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </section>
                      )
                    })}

                  {selCategory === 'registered' &&
                    tableData.map((finData, o) => {
                      const {
                        uid,
                        assets,
                        customerDetailsObj,
                        customerName1,
                        phoneNo1,
                        unit_no,
                        T_balance,
                        T_elgible,
                        T_review,
                        T_captured,
                        pId,
                        projName,
                      } = finData
                      return (
                        <section
                          key={o}
                          className="border mb-1  shadow rounded-md  shadow"
                        >
                          <section className="flex flex-row">
                            <div className="">
                              <div className="flex flex-row   ">
                                <div
                                  // className="flex flex-col bg-gradient-to-r from-emerald-300 to-cyan-400 text-black p-1 rounded-sm w-[220px] h-[96px]"
                                  className="flex flex-col bg-gradient-to-r from-[#d8daff] to-[#9ae8fd] text-black p-1 rounded-sm w-[220px] h-[96px]"
                                  onClick={() =>
                                    viewTransaction(
                                      finData,
                                      'unit_information',
                                      'unit_information'
                                    )
                                  }
                                >
                                  <section className="font-rubikF flex flex-row">
                                    {/* <img
                                      className="w-10 h-10 mr-2"
                                      alt=""
                                      src="/apart.svg"
                                    ></img> */}
                                    <section className="flex flex-col ml-2 mt-[7px]">
                                      <span className=" text-[12px] text-[#036046] font-[400]">
                                        {projName}
                                      </span>
                                      <span className=" text-[14px] text-black font-[500] ">
                                        {/* {finData?.[`${assets[0]}_unitDetails`]
                                          ?.unit_no || ''} */}
                                        Unit-{unit_no}
                                      </span>

                                      <span className=" text-[12px] text-black-900 font-[400]">
                                        {customerDetailsObj?.customerName1 ||
                                          'NA'}
                                      </span>
                                      <span className=" text-[12px] text-black-500 font-[400]">
                                        {customerDetailsObj?.phoneNo1 || 'NA'}
                                      </span>
                                    </section>
                                  </section>
                                  {/* <span className="font-normal text-xs app-color-gray-1">
                                  {finData?.ph}
                                </span> */}
                                </div>
                              </div>
                            </div>
                            <div className="w-2/4 bg-[#f2f3f8] px-1">
                              {' '}
                              <Box>
                                <>
                                  <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 min-w-[180px]">
                                    <div className="flex flex-row justify-between mx-1">
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        ₹{T_review?.toLocaleString('en-IN')}
                                      </h6>
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        ₹{T_balance?.toLocaleString('en-IN')}
                                      </h6>
                                    </div>
                                    <div className="flex flex-row mx-1">
                                      {[{ item: 'Paid', value: 6 }].map(
                                        (data, p) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_review / T_elgible) * 100
                                                ) <= 100
                                                  ? Math.round(
                                                      (T_review / T_elgible) *
                                                        100
                                                    )
                                                  : 100
                                              }%`,
                                            }}
                                            key={p}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#00a979',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E5EAF2',
                                                  borderRadius: '3px',
                                                  borderTopRightRadius: '0px',
                                                  borderBottomRightRadius:
                                                    '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-left mr-1  mb-1 mt-[4px] min-w-[100px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                {data.item} (
                                                {Number(
                                                  (T_review / T_elgible) * 100
                                                ) <= 100
                                                  ? Math.round(
                                                      (T_review / T_elgible) *
                                                        100
                                                    )
                                                  : 100}
                                                %)
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      {[{ item: 'Due', value: 6 }].map(
                                        (data, q) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_balance / T_elgible) * 100
                                                ) > 0
                                                  ? Math.round(
                                                      (T_balance / T_elgible) *
                                                        100
                                                    )
                                                  : 0
                                              }%`,
                                            }}
                                            key={q}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#d29a80',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E87F7F',
                                                  borderRadius: '3px',
                                                  borderTopLeftRadius: '0px',
                                                  borderBottomLeftRadius: '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-end mr-1  mb-1 mt-[4px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                {Number(
                                                  (T_balance / T_elgible) * 100
                                                ) > 0
                                                  ? `(${Math.round(
                                                      (T_balance / T_elgible) *
                                                        100
                                                    )})%`
                                                  : ''}{' '}
                                                {data.item}
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </>
                              </Box>
                            </div>
                            <div className="w-1/4 bg-[#f2f3f8] px-1">
                              {' '}
                              <Box>
                                <>
                                  <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 min-w-[180px]">
                                    <div className="flex flex-row justify-between ">
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        Progress
                                      </h6>
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        0%
                                      </h6>
                                    </div>
                                    <div className="flex flex-row mx-1">
                                      {[{ item: 'Paid', value: 6 }].map(
                                        (data, r) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_review / T_elgible) * 100
                                                ) <= 100
                                                  ? Math.round(
                                                      (T_review / T_elgible) *
                                                        100
                                                    )
                                                  : 100
                                              }%`,
                                            }}
                                            key={r}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#00a979',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E5EAF2',
                                                  borderRadius: '3px',
                                                  borderTopRightRadius: '0px',
                                                  borderBottomRightRadius:
                                                    '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-left mr-1  mb-1 mt-[4px] min-w-[100px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                Construction
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      {[{ item: 'Due', value: 6 }].map(
                                        (data, s) => (
                                          <div
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                              width: `${
                                                Number(
                                                  (T_balance / T_elgible) * 100
                                                ) > 0
                                                  ? Math.round(
                                                      (T_balance / T_elgible) *
                                                        100
                                                    )
                                                  : 0
                                              }%`,
                                            }}
                                            key={s}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#d29a80',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E87F7F',
                                                  borderRadius: '3px',
                                                  borderTopLeftRadius: '0px',
                                                  borderBottomLeftRadius: '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-end mr-1  mb-1 mt-[4px]"></div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </>
                              </Box>
                            </div>
                            <div className="w-3/4 bg-[#f2f3f8] px-1">
                              <div className="flex flex-col bg-white shadow rounded-md my-1   py-1">
                                <div className="flex flex-row justify-between px-1">
                                  <div
                                    className={`w-full  h-[80px] ${
                                      T_balance <= 0
                                        ? 'bg-green-100'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            T_balance <= 0
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        ATS Amount
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 2 */}
                                  <div
                                    className={`w-full  h-[80px] ${
                                      finData?.ats_approval == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.ats_approval == 'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_ATS_Approval')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-green-50 group-hover:bg-white">
                                        <ChartPieIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            finData?.ats_approval == 'approved'
                                              ? 'bg-green-100'
                                              : finData?.ats_approval ==
                                                'rejected'
                                              ? 'bg-[#ffdbdb]'
                                              : 'bg-[#F1F5F9] '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        ATS Creation
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 3*/}
                                  <div
                                    className={`w-full  h-[80px] ${
                                      finData?.ats_approval == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.ats_approval == 'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_ATS_Approval')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            finData?.ats_approval == 'approved'
                                              ? 'bg-green-100'
                                              : finData?.ats_approval ==
                                                'rejected'
                                              ? 'bg-[#ffdbdb]'
                                              : 'bg-[#F1F5F9] '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        ATS Approve
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 4 */}
                                  <div
                                    className={`w-[120px]  h-[80px] ${
                                      finData?.kyc_approval == 'approved'
                                        ? 'bg-green-100'
                                        : finData?.kyc_approval == 'rejected'
                                        ? 'bg-[#ffdbdb]'
                                        : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                    onClick={() => {
                                      setSelUnitDetails(finData)
                                      setIsSubTopicOpen(true)
                                      setIsSubTopic('crm_posession')
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-green-50 group-hover:bg-white">
                                        <ChartPieIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            finData?.kyc_approval == 'approved'
                                              ? 'bg-green-100'
                                              : finData?.kyc_approval ==
                                                'rejected'
                                              ? 'bg-[#ffdbdb]'
                                              : 'bg-[#F1F5F9] '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        Posession
                                      </h6>
                                    </div>
                                  </div>
                                  {/* section 5*/}
                                  <div
                                    className={`w-full  h-[80px] ${
                                      false ? 'bg-green-100' : 'bg-[#F1F5F9] '
                                    }  p-3 rounded-md mx-1`}
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <NewspaperIcon
                                          className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${
                                            1 != 1
                                              ? 'text-green-900'
                                              : 'text-gray-600 '
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        Loan
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        </section>
                      )
                    })}

                  {selCategory === 'unAssigned_crm' &&
                    crmCustomersDBData.map((finData, t) => {
                      const {
                        uid,
                        assets,
                        customerDetailsObj,
                        customerName1,
                        phoneNo1,
                        unit_no,
                        T_balance,
                        T_elgible,
                        pId,
                        projName,
                      } = finData
                      return (
                        <section
                          key={t}
                          className="border mb-1 bg-[#f2f3f8] shadow rounded-md  shadow"
                        >
                          <section className="flex flex-row">
                            <div className="">
                              <div className="flex flex-row  mt- mr-[1px] py-1">
                                <div
                                  className="flex flex-col bg-gradient-to-r from-[#A798FF] to-[#c8c2f1] text-black p-2 rounded-sm py-4 w-[240px] h-[82px] ml-1"
                                  onClick={() =>
                                    viewTransaction(
                                      finData,
                                      'unit_information',
                                      'unit_information'
                                    )
                                  }
                                >
                                  <section className="flex flex-row">
                                    {/* <img
                                      className="w-10 h-10 mr-2"
                                      alt=""
                                      src="/apart.svg"
                                    ></img> */}
                                    <section className="flex flex-col ml-2">
                                      <span className="font-semibold text-sm app-color-black">
                                        {/* {finData?.[`${assets[0]}_unitDetails`]
                                          ?.unit_no || ''} */}
                                        {unit_no}
                                      </span>
                                      <span className="text-xs">
                                        {customerDetailsObj?.customerName1 ||
                                          'NA'}
                                      </span>
                                      <span className="font-normal text-xs app-color-gray-1">
                                        {projName}
                                      </span>
                                    </section>
                                  </section>
                                  {/* <span className="font-normal text-xs app-color-gray-1">
                                  {finData?.ph}
                                </span> */}
                                </div>
                              </div>
                            </div>
                            <div className="w-3/4 bg-[#f2f3f8] px-1">
                              {' '}
                              <Box>
                                <>
                                  <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2 min-w-[180px]">
                                    <div className="flex flex-row justify-between mx-1">
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        {T_elgible}
                                      </h6>
                                      <h6 className="font-bodyLato font-semibold text-xs m-1 mb-2">
                                        {T_balance}
                                      </h6>
                                    </div>
                                    <div className="flex flex-row mx-1">
                                      {[{ item: 'Total', value: 6 }].map(
                                        (data, u) => (
                                          <div
                                            className=" w-3/4  "
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                            }}
                                            key={u}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#A798FF',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E5EAF2',
                                                  borderRadius: '3px',
                                                  borderTopRightRadius: '0px',
                                                  borderBottomRightRadius:
                                                    '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-left mr-1  mb-1 mt-[4px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                {data.item}
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                      {[{ item: 'Due', value: 6 }].map(
                                        (data, v) => (
                                          <div
                                            className=" w-2/4  "
                                            style={{
                                              display: 'inline-block',
                                              alignSelf: 'flex-end',
                                            }}
                                            key={v}
                                          >
                                            <div className="">
                                              <LinearProgress
                                                sx={{
                                                  backgroundColor: 'white',
                                                  '& .MuiLinearProgress-bar': {
                                                    backgroundColor: '#E87F7F',
                                                  },
                                                }}
                                                variant="determinate"
                                                value={100}
                                                style={{
                                                  backgroundColor: '#E87F7F',
                                                  borderRadius: '3px',
                                                  borderTopLeftRadius: '0px',
                                                  borderBottomLeftRadius: '0px',
                                                  height: `${data.value}px`,
                                                  width: `100%`,
                                                }}
                                              />
                                            </div>
                                            <div className="flex  justify-end mr-1  mb-1 mt-[4px]">
                                              <h6 className="font-bodyLato font-semibold text-xs mt-1">
                                                {data.item}
                                              </h6>
                                            </div>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </>
                              </Box>
                            </div>
                            <div className="w-2/4 bg-[#f2f3f8] px-1">
                              <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">
                                <div className="flex flex-row justify-between px-1">
                                  <div
                                    className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1"
                                    style={{
                                      display: 'inline-block',
                                      alignSelf: 'flex-end',
                                    }}
                                  >
                                    <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                        <ChartPieIcon
                                          className="h-4 w-4 text-gray-600 group-hover:text-indigo-600"
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                        {'Payment'}
                                      </h6>
                                    </div>
                                  </div>
                                  {[
                                    {
                                      item: 'Payment',
                                      value: 78,
                                      icon: ChartPieIcon,
                                    },
                                    {
                                      item: 'Manager',
                                      value: 78,
                                      icon: ChartPieIcon,
                                    },
                                    {
                                      item: 'KYC ',
                                      value: 38,
                                      icon: NewspaperIcon,
                                    },
                                    // {
                                    //   item: 'Welcome ',
                                    //   value: 58,
                                    //   icon: ChartPieIcon,
                                    // },
                                  ].map((data, w) => (
                                    <div
                                      className=" w-[100px] bg-[#F1F5F9] p-3 rounded-md mx-1"
                                      style={{
                                        display: 'inline-block',
                                        alignSelf: 'flex-end',
                                      }}
                                      key={w}
                                    >
                                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                                        <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                          <data.icon
                                            className="h-4 w-4 text-gray-600 group-hover:text-indigo-600"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                          {data.item}
                                        </h6>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="w-2/4 bg-[#f2f3f8] px-1">
                              <div className="flex flex-col bg-white shadow rounded-md my-1  px-2  py-2">
                                <div className="flex flex-row justify-between px-1">
                                  {[
                                    {
                                      item: 'CS Customer Approval',
                                      value: 78,
                                      icon: ChartPieIcon,
                                    },

                                    {
                                      item: 'Loan',
                                      value: 38,
                                      icon: NewspaperIcon,
                                    },
                                  ].map((data, a) => (
                                    <div
                                      className=" w-[180px] bg-[#F1F5F9] p-3 rounded-md mx-1"
                                      style={{
                                        display: 'inline-block',
                                        alignSelf: 'flex-end',
                                      }}
                                      key={a}
                                    >
                                      <div className="flex flex-col items-center justify-center mr-1  mb-1 mt[2px]">
                                        <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                          <data.icon
                                            className="h-4 w-4 text-gray-600 group-hover:text-indigo-600"
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                          {data.item}
                                        </h6>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </section>
                        </section>
                      )
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <SiderForm
        open={isUnitDetailsOpen}
        setOpen={setisUnitDetailsOpen}
        title={'unitDetails_crm_view'}
        customerDetails={selUnitDetails}
        setSelUnitDetails={setSelUnitDetails}
        widthClass="max-w-7xl"
        transactionData={transactionData}
        unitsViewMode={false}
        selCustomerPayload={selUnitDetails}
        selSubMenu={selSubMenu}
        selSubMenu2={selSubMenu1}
      />
      <CrmSiderForm
        open={isSubTopicOpen}
        setOpen={setIsSubTopicOpen}
        title={isSubTopic}
        customerDetails={selUnitDetails}
        widthClass="max-w-3xl"
        transactionData={transactionData}
        unitsViewMode={false}
        selUnitPayload={selUnitDetails}
        selSubMenu={selSubMenu}
        selSubMenu2={selSubMenu1}
      />
    </>
  )
}

export default CrmConstuctionModeHome
