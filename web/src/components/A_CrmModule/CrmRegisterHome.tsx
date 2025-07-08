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
  PlusIcon,
  ShoppingCartIcon,
  SearchIcon,
  OfficeBuildingIcon,
  NewspaperIcon,
  UserGroupIcon,
  ScaleIcon,
  InformationCircleIcon,
} from '@heroicons/react/solid'
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import { } from '@heroicons/react/solid'
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

import DoughnutChartWithRoundedSegments from '../A_SalesModule/Reports/charts/piechartRounded'
import CrmSiderForm from '../SiderForm/CRM_SideForm'
import SiderForm from '../SiderForm/SiderForm'
import RoundedProgressBar from './Reports/RoundedProgressBar'
import RadialChart from './RadialChart'

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
const CrmRegisterModeHome = ({ leadsTyper }) => {
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
  const [showSettings, setShowSettings] = useState(false)
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
  const [paidA, setPaidA] = useState([])
  const [unPaidA, setunPaidA] = useState([])


  const [agreePipeA, setAgreePipeA] = useState([])
  const [sdPipeA, setSdPipeA] = useState([])
  const [registeredA, setRegisteredA] = useState([])
  const [posessionA, setPosessionA] = useState([])
  const [unassignedA, setUnAssignedA] = useState([])
  const [unqueriesA, setQueriesA] = useState([])

  const [bookingReviewCo, setBookingReviewCo] = useState([])
  const [paidCo, setPaidCo] = useState(0)
  const [unPaidCo, setUnPaidCo] = useState(0)
  const [agreePipeCo, setAgreePipeCo] = useState([])
  const [sdPipeCo, setSdPipeCo] = useState([])
  const [registeredCo, setRegisteredCo] = useState([])
  const [posessionCo, setPosessionCo] = useState([])
  const [unassignedCo, setUnAssignedCo] = useState([])
  const [queryResult, setQueryResult] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [isOpened, setIsOpened] = React.useState(false)
  const [selCategory, setSelCategory] = useState('booked')
  const [dateRange, setDateRange] = React.useState([null, null])
  const [startDate, endDate] = dateRange
  const [usersList, setusersList] = useState([])
  const [searchKeyField, setSearchKeyField] = useState('')
  const [filteredDataA, setFilteredDataA] = useState([])
  const [selLeadsOf, setSelLeadsOf] = useState({
    label: 'My Stalls',
    value: 'myunits',
  })
  useEffect(() => {
    // console.log(' crm units data is ', crmCustomersDBData)
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
    getLeadsDataFun(projectList, ['booked', 'Booked'])
    getLeadsDataFun(projectList, ['agreement_pipeline'])
    getLeadsDataFun(projectList, ['agreement', 'ATS'])
    getLeadsDataFun(projectList, ['registered', 'Registered'])
    getLeadsDataFun(projectList, ['possession'])
    getLeadsDataFun(projectList, ['unassigned'])
  }, [projectList, selLeadsOf])

  useEffect(() => {
    filter_Leads_Projects_Users_Fun()
  }, [selProjectIs])

  const filter_Leads_Projects_Users_Fun = () => {
    // setFetchLeadsLoader(true)
    // const x = leadsFetchedRawData
    getLeadsDataFun(projectList, ['booked', 'Booked'])
    getLeadsDataFun(projectList, ['agreement_pipeline'])
    getLeadsDataFun(projectList, ['agreement', 'ATS'])
    getLeadsDataFun(projectList, ['registered', 'Registered'])
    getLeadsDataFun(projectList, ['possession', 'Possession'])
    getLeadsDataFun(projectList, ['unassigned'])
    // console.log(
    //   'my Array data is ',
    //   queryResult,
    //   crmCustomersDBData,
    //   bookingReviewA
    // )
  }

  useEffect(() => {
    if (selCategory === 'paid') {
      setFilteredDataA()
    }
    getLeadsDataFun(projectList, ['booked', 'Booked'])
  }, [selCategory])

  const getProjectsListFun = () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        projectsListA.map((user) => {
          user.label = user.eventName
          user.value = user.eventName
        })
        console.log('fetched proejcts list is', projectsListA)
        setprojectList(projectsListA)
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
            x.projName = y[0].eventName
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
    // console.log('login role detials', user)
    const { access, uid } = user
    const unsubscribe = getBookedUnitsByProject(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          const y = projectList.filter((proj) => proj?.uid == x?.pId)
          // console.log(',my prject sel is  ===> ', projectList)
          if (y.length > 0) {
            // console.log(',my prject sel is ', y)
            x.projName = y[0].eventName
          }
          return x
        })
        // setBoardData
        // console.log('my Array data is ', usersListA, crmCustomersDBData)
        // await serealizeData(usersListA)

        // await setCrmCustomerDBData(usersListA)

        await usersListA.sort((a, b) => {
          return a.unit_no - b.unit_no
        })

        // usersListA.sort((a, b) => {
        //   return b?.booked_on || 0 - b?.booked_on || 0
        // })


        if (statusFil.includes('booked')) {
          // await console.log(
          //   'my Array data is ',
          //   usersListA.length,
          //   queryResult.length
          // )
          await setBookingReviewA(usersListA)
          await setBookingReviewCo(usersListA.length)
          // await setBookingReviewCo(200)

          await setQueryResult(usersListA)
          await setFilteredDataA(usersListA)
          await setPaidA(usersListA?.filter((d) => d.T_balance <= 0))
          await setunPaidA(usersListA?.filter((d) => d.T_balance > 0))

          await setPaidCo(usersListA?.filter((d) => d.T_balance <= 0).length)
          await setUnPaidCo(usersListA?.filter((d) => d.T_balance > 0).length)
          await setSearchKeyField('')

        }
        else if (statusFil.includes('paid')) {
          await setFilteredDataA(usersListA)

        }
        else if (statusFil.includes('unpaid')) {
          await setAgreePipeA(usersListA)
          await setAgreePipeCo(usersListA.length)
        }
        else if (statusFil.includes('paid')) {
          await setAgreePipeA(usersListA)
          await setAgreePipeCo(usersListA.length)
        }
        else if (statusFil.includes('agreement_pipeline')) {
          await setAgreePipeA(usersListA)
          await setAgreePipeCo(usersListA.length)
        } else if (statusFil.includes('agreement')) {
          await setSdPipeA(usersListA)
          await setSdPipeCo(usersListA.length)
        } else if (statusFil.includes('registered')) {
          await setRegisteredA(usersListA)
          await setRegisteredCo(usersListA.length)
        } else if (statusFil.includes('possession')) {
          await setPosessionA(usersListA)
          await setPosessionCo(usersListA.length)
        } else if (statusFil.includes('unassigned')) {
          await setUnAssignedA(usersListA)
          await setUnAssignedCo(usersListA.length)
        }
        // await console.log('my Array data is set it', crmCustomersDBData)
      },
      {
        status: statusFil,
        projectId: selProjectIs?.uid,
        assignedTo: selLeadsOf?.value === 'myunits' ? uid : undefined,
      },
      () => setCrmCustomerDBData([])
    )
    return unsubscribe

    // await console.log('leadsData', leadsData)
  }

  useEffect(() => {
    searchBar(searchKeyField)
  }, [searchKeyField, selCategory])
  const searchLogic = async (searchKey, fetchedArray) => {
    if (!searchKey) return setFilteredDataA(fetchedArray)

    const lowerSearchKey = searchKey.toLowerCase()

    const z = fetchedArray.filter((item) => {
      return (
        (item?.customerDetailsObj?.customerName1 &&
          item?.customerDetailsObj?.customerName1
            ?.toLowerCase()
            ?.includes(lowerSearchKey)) ||
        (item?.unit_no &&
          item?.unit_no?.toString()?.toLowerCase()?.includes(lowerSearchKey))
      )
    })
    await setFilteredDataA(z)
  }
  const searchBar = async (searchKey) => {
    // if (statusFil === 'booked') {

    // await setBookingReviewA(usersListA)
    // await setBookingReviewCo(usersListA.length)
    // await setBookingReviewCo(200)
    // await usersListA.sort((a, b) => {
    //   return a.unit_no - b.unit_no
    // })
    console.log('iam in searchKey', searchKey, !searchKey)
    if (selCategory === 'booked') {
      searchLogic(searchKey, queryResult)
    }
    if (selCategory === 'unPaid') {
      searchLogic(searchKey, unPaidA)
    }
    if (selCategory === 'paid') {
      searchLogic(searchKey, paidA)
    }
    else if (selCategory === 'agreement_pipeline') {
      searchLogic(searchKey, agreePipeA)
    }
    else if (selCategory === 'agreement') {
      searchLogic(searchKey, sdPipeA)
    }
    else if (selCategory === 'registered') {
      searchLogic(searchKey, registeredA)
    }
    else if (selCategory === 'possession') {
      searchLogic(searchKey, posessionA)
    }
    else if (selCategory === 'unassigned') {
      // searchLogic(searchKey, unassignedA)
      searchLogic(searchKey, crmCustomersDBData)
    }

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



  function formatIndianNumber(num) {
    if (num >= 1_00_00_00_000) return (num / 1_00_00_00_000).toFixed(1) + 'Lcr+'
    if (num >= 1_00_00_000) return (num / 1_00_00_000).toFixed(1) + 'Cr+'
    if (num >= 1_00_000) return (num / 1_00_000).toFixed(1) + 'L+'
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K+'
    return num.toString()
  }








  return (
    <>
      <div className="mt-2   mx-auto ">
        <div className="">
          <div className="mx-2">
            <div className="flex items-center flex-row flex-wrap justify-between py-1 pb-5  px-3 py-3  ">
              <h2 className="font-manrope font-bold text-xl leading-[100%] tracking-normal text-[#1A1A1A]">
                Bookings
              </h2>

              <div className="flex">


                <div className="flex flex-col mr-5  w-40">
                  <VerySlimSelectBox
                    name="project"
                    label=""
                    className="input border border-[#E5E7EA] "
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
                          { label: 'Team Stalls', value: 'teamunits' },
                          { label: 'My Stalls', value: 'myunits' },
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

              <div className="border-b border-b-[1px] border-[#D8D8D8] flex flex-row justify-between">
                <ul
                  className="flex   rounded-t-lg "
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  {[
                    { lab: 'Booked', val: 'booked' },
                    { lab: 'Un-Paid', val: 'unpaid' },
                    { lab: 'Paid', val: 'paid' },
                    { lab: 'Unassigned', val: 'unAssigned_crm' },
                    { lab: 'Queries', val: 'queries' },
                  ].map((d, b) => {
                    return (
                      <li
                        key={b}
                        className="mr-2  text-sm  font-bodyLato"
                        role="presentation"
                      >
                        <button
                          className={`inline-block py-[18px]  px-[32px] text-sm font-medium   text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${selCategory === d.val
                            ? 'border-black text-black'
                            : 'border-transparent'
                            }`}
                          type="button"
                          role="tab"
                          onClick={() => setSelCategory(d.val)}
                        >
                          {`${d.lab} `}



                          <span className="text-gray-800 px-1 py-1 rounded-full ml-[1px] text-[14px]">
                            {d.val === 'booked' && `(${bookingReviewCo})`}
                            {d.val === 'paid' && `(${paidCo})`}
                            {d.val === 'unpaid' && `(${unPaidCo})`}
                            {d.val === 'registered' && `(${registeredCo})`}
                            {d.val === 'possession' && `(${posessionCo})`}
                            {d.val === 'unAssigned_crm' && `(${unassignedCo})`}
                            {d.val === 'queries' && `(${unassignedCo})`}
                          </span>






                          {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                        </button>
                      </li>
                    )
                  })}
                </ul>


                {/* <span
                    className="flex mt-[4px] mr-[8px] justify-center items-center w-6 h-6 bg-gradient-to-r from-violet-200 to-pink-200 rounded-full  cursor-pointer "
                    onClick={() => {
                      console.log('chek it', horizontalMode)
                      setHorizontalMode(!horizontalMode)
                    }}
                  >
                    <PuzzleIcon className=" w-3 h-3" />
                  </span> */}


              </div>
              {/* <div className="flex flex-row mr-4 mt-2">
                  <span
                    className="flex mt-[4px] mr-[0px] justify-center items-center w-6 h-6 bg-gradient-to-r from-violet-200 to-pink-200 rounded-full  cursor-pointer "
                    onClick={() => {
                      setSearchKeyField('')
                      setShowSettings(!showSettings)
                    }}
                  >
                    <SearchIcon className=" w-3 h-3" />
                  </span>
                </div> */}


              <div
                className={` flex flex-row py-2 justify-between `}
              >
                <div className="w-full flex items-center gap-1">
                  <span
                    className="flex w-[298px] h-[44px] gap-[6px] rounded-lg border-[1.5px] border-[#E5E7EA] px-3 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
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
                      onChange={(e) => setSearchKeyField(e.target.value)}
                      autoComplete="off"
                      value={searchKeyField}
                      className="
    w-4/5
    bg-transparent
    focus:border-transparent
    focus:ring-0
    focus:outline-none
    text-sm
    leading-7
    text-gray-900
    placeholder:font-Manrope
    placeholder:font-medium
    placeholder:text-[12px]
    placeholder:leading-none
    placeholder:tracking-[0]
    placeholder:text-[#AEAEAE]
  "
                    />
                  </span>

                  {/* <div className=" mr-2">
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
                  </div> */}

                  <span className="cursor-pointer w-[50px] h-[43px]  flex items-center justify-center cursor-pointer text-xs bg-[#F44D21] rounded-[8px] text-white" onClick={() => setSearchKeyField('')}>
                    {' '}
                    Clear
                  </span>
                </div>
                <span>
                  <CSVDownloader
                    className="mr-6 h-[20px] w-[20px] mt-2"
                    downloadRows={bookingReviewA}
                    style={{
                      height: '20px',
                      width: '20px',
                      color: '#F44D21',
                      fill: '#F44D21',
                    }}
                  />

                </span>

              </div>
              <div className="flex px-6">
                {leadsTyper == 'inProgress' && (
                  <span className="inline-flex p-1 border bg-gray-200 rounded-md">
                    <button
                      className={`px-2 py-1  rounded ${ready ? 'bg-white shadow' : ''
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
                      className={`px-2 py-1  rounded ${!ready ? 'bg-white shadow' : ''
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
                <div className="flex flex-col   pb-[1px]">
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
                          // console.log('fin data is ', finData)
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
                              <div className="m-1 pt- pb-3 bg-white rounded-lg">
                                <section className="flex flex-row px-3  pt-2 justify-between">
                                  <div className="flex flex-row">
                                    <section className="bg-violet-100  items-center rounded-2xl shadow-xs flex flex-col px-2 py-1">
                                      <div className="font-semibold text-[#053219]  text-[22px]  mb-[1] tracking-wide">
                                        {unit_no}
                                      </div>
                                      <span
                                        className={`items-center h-6   text-xs font-semibold text-gray-500  rounded-full`}
                                      >
                                        Stall No
                                      </span>
                                    </section>
                                    <div className="flex flex-col ml-2 item-right">
                                      <span
                                        className={`items-center h-1 mt-[6px] mb-2  text-xs font-semibold text-green-600`}
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
                                                  finData?.area
                                                    ?.toString()
                                                    ?.replace(',', '')
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
                                      {(
                                        (finData?.T_review || 0) +
                                        (finData?.T_approved || 0)
                                          (finData?.T_paid || 0)
                                      )?.toLocaleString('en-IN')}
                                    </div>
                                  </section>
                                </div>

                                <div className="flex flex-row mx-3 ml-4 pt-3">
                                  {[{ item: 'Paid', value: 6 }].map(
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
                                  {[{ item: 'Due', value: 6 }].map(
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
                                    className={`grow shrink basis-0 px-2.5 py-1.5 rounded-[16px] flex-col justify-center items-center gap-2 inline-flex ${finData?.man_cs_approval == 'approved'
                                      ? 'bg-[#CCC5F7]'
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
                                    className={`grow shrink basis-0 px-2.5 py-1.5 bg-gray-200 rounded-[16px] flex-col justify-center items-center gap-2 inline-flex ${finData?.kyc_status == 'approved'
                                      ? 'bg-[#CCC5F7]'
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
                  {['booked', 'unpaid', 'paid', 'agreement_pipeline', 'agreement', 'registered', 'construction', 'possession', 'unAssigned_crm', 'queries'].includes(selCategory) &&
                    !horizontalMode &&
                    filteredDataA.map((finData, c) => {
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
                      // console.log('fin data is ', finData)
                      return (
                        <section key={c} className=" ">
                          <section className="flex flex-row items-center justify-between p-[12px]  rounded-[20px] bg-gradient-to-r my-2 border border-[#E5E5E5] from-[#Fff] to-[#fff]">
                            <div className="">
                              <div className="flex flex-row   ">
                                <div
                                  className="flex flex-col bg-gradient-to-r text-black  py-1 rounded-sm "
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
                                        <div className="flex gap-[12px] flex-row w-full items-center justify-center">
                                          {/* <section className="bg-violet-100  items-center rounded-2xl shadow-xs flex flex-col px-2 py-1 min-w-[100px]">
                  <div className="font-semibold text-[#053219]  text-[22px]  mb-[1] tracking-wide">
                    {unit_no}
                  </div>
                  <span
                    className={`items-center h-6   text-xs font-semibold text-gray-500  rounded-full`}
                  >
                    Stall No
                  </span>
                </section> */}


                                          <section className="flex flex-row  items-center gap-6">
                                            {/* <div className="bg-violet-100  items-center rounded-2xl shadow-xs flex flex-col px-2 py-1"> */}

                                            <div className="relative w-[79px] h-[80px]">
                                              <svg width="79" height="80" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M26.0061 0H92.3734C95.2974 0 97.9884 1.59524 99.3918 4.16045L113.289 29.5641C113.933 30.7413 114.271 32.0617 114.271 33.4036L114.271 99.7936C114.271 103.619 111.17 106.72 107.345 106.72V112.281C107.345 115.991 104.338 118.997 100.629 118.997C96.9194 118.997 93.9125 115.991 93.9125 112.281V106.72H24.6969V112.224C24.6969 115.965 21.6641 118.997 17.9231 118.997C14.1821 118.997 11.1493 115.965 11.1493 112.224V106.72C7.41371 106.72 4.38538 103.691 4.38538 99.9557V31.9416C4.38538 30.5546 4.74602 29.1913 5.43191 27.9857L19.0526 4.04408C20.4749 1.54406 23.1298 0 26.0061 0Z" fill="#FCC8BA" />
                                                <path d="M101.705 27.7051C101.705 32.3855 97.9109 36.1795 93.2305 36.1797C88.5498 36.1797 84.7552 32.3856 84.7549 27.7051C84.7545 32.3856 80.9599 36.1796 76.2793 36.1797C71.7447 36.1797 68.0415 32.6188 67.8145 28.1406L67.8037 27.7051C67.8033 32.3856 64.0088 36.1797 59.3281 36.1797C54.6475 36.1797 50.8529 32.3856 50.8525 27.7051C50.8522 32.3856 47.0576 36.1797 42.377 36.1797C37.6964 36.1795 33.9017 32.3855 33.9014 27.7051C33.901 32.3855 30.1072 36.1795 25.4268 36.1797C20.7461 36.1797 16.9515 32.3856 16.9512 27.7051C16.9508 32.3856 13.1562 36.1796 8.47559 36.1797C3.79494 36.1797 0.000359783 32.3856 0 27.7051V18.1689H101.705V27.7051ZM118.656 27.7051C118.656 32.3856 114.861 36.1797 110.181 36.1797C105.5 36.1795 101.706 32.3855 101.706 27.7051V18.1689H118.656V27.7051ZM118.656 18.168H0L22.0684 0H96.707L118.656 18.168ZM30.209 2.13281C29.5894 2.13288 29.0046 2.41977 28.626 2.91016L20.9824 12.8145C19.9683 14.1292 20.9058 16.0361 22.5664 16.0361H33.2197C33.9636 16.036 34.6461 15.6228 34.9912 14.9639L40.1748 5.05957C40.8714 3.72812 39.906 2.13311 38.4033 2.13281H30.209ZM55.9199 2.13281C54.929 2.13296 54.0881 2.85874 53.9424 3.83887L52.4707 13.7422C52.2915 14.9503 53.2278 16.0361 54.4492 16.0361H65.5557C66.8397 16.0361 67.7914 14.8427 67.5059 13.5908L65.2441 3.6875C65.0364 2.77803 64.2278 2.13294 63.2949 2.13281H55.9199ZM80.2539 2.13281C78.7511 2.1328 77.785 3.72803 78.4814 5.05957L83.665 14.9639C84.0102 15.623 84.6934 16.0361 85.4375 16.0361H96.0908C97.7514 16.036 98.6881 14.1292 97.6738 12.8145L90.0312 2.91016C89.6526 2.41959 89.067 2.13283 88.4473 2.13281H80.2539Z" fill="#F44D21" />
                                              </svg>

                                              <div className="absolute inset-0 flex flex-col  mt-2 gap-1 items-center justify-center">
                                                <div className="font-manrope font-normal text-[10px] leading-[100%] mt-1 tracking-[0%] text-center text-[#666666]">
                                                  Stall No
                                                </div>
                                                <div className="font-bold text-[16px] text-[#1e1e1e] leading-none">
                                                  {unit_no}
                                                </div>

                                              </div>
                                            </div>
                                          </section>

                                          <div className="flex flex-col w-full   item-right   rounded-lg">
                                            <span
                                              className={`font-manrope font-bold text-[14px] leading-[20px] tracking-[0px] text-[#0A0A0A]
      `}
                                            >
                                              {finData?.companyName ||
                                                'NA'}
                                            </span>
                                            <span
                                              className={`font-manrope font-medium text-[12px] leading-[16px] tracking-[0px] text-[#666666]
      `}
                                            >
                                              {finData?.co_Name1 ||
                                                'NA'}
                                            </span>
                                            <span
                                              className={`font-manrope font-medium text-[12px] leading-[16px] tracking-[0px] text-[#666666]
      `}
                                            >
                                              {finData?.phoneNo1 ||
                                                'NA'}
                                            </span>

                                            <section className="flex flex-row justify-between">
                                              <span className="font-manrope font-medium text-[12px] leading-[16px] tracking-[0px] text-[#336519] ">
                                                {projName}{' '}
                                              </span>
                                              {/*
                    <span className="  text-[10px] h-[20px] text-[#005E36] font-bodyLato font-[600] mt-[2px] border border-[#ECFDF5] px-[6px] py-[2px] rounded-xl mr-1 ">
                      Booked:{' '}
                      {prettyDate(
                        finData?.booked_on ||
                          finData?.ct ||
                          0
                      )}
                    </span> */}
                                            </section>
                                          </div>
                                        </div>
                                      </section>
                                    </section>
                                  </section>
                                </div>
                              </div>
                            </div>

                            <div className="border-l border-gray-200 mx-2 w-1 h-[60px] rounded-[4px]"></div>

                            <div className=" flex flex-col  items-center">
                              <div className="flex flex-row w-full gap-[20px] my-1 items-center justify-between">
                                <div className="flex-shrink-0">
                                  <RadialChart
                                    progress={(finData?.T_paid / finData?.T_total) * 100}
                                  />
                                </div>

                                <div className="flex flex-col w-[217px] justify-between ml-2 mb-1">
                                  {/* Total Cost Section */}
                                  <section className="flex justify-between gap-[12px] items-center font-semibold text-xs my-1 w-full">
                                    <div className="font-manrope font-medium text-[12px] leading-[16px] tracking-[0px] text-[#1A1A1A]">
                                      Stall Cost:
                                    </div>
                                    <div className="relative flex flex-col items-center group" style={{ alignItems: 'start' }}>
                                      <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex" style={{ alignItems: 'start', width: '300px' }}>
                                        <span className="rounded italian relative mr-3 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg" style={{ color: 'white', background: '#213343', maxWidth: '300px' }}>
                                          <span className="italic">
                                            ₹{Math.round(finData?.T_total || 0).toLocaleString('en-IN')}
                                          </span>
                                        </span>
                                        <div className="w-3 h-3 ml-1 -mt-2 rotate-45 bg-black" style={{ background: '#213343', marginRight: '12px' }}></div>
                                      </div>
                                      <span className="font-bold text-[14px] leading-[20px] tracking-[0px] text-right text-[#1A1A1A] font-manrope">
                                        {/* ₹{formatIndianNumber?.(Math.round(finData?.T_total || 0))} */}
                                        ₹ {Math.round(finData?.T_total || 0).toLocaleString('en-IN')}

                                      </span>
                                    </div>
                                  </section>

                                  {/* Paid Section */}
                                  <section className="flex justify-between gap-[12px] items-center font-semibold text-xs my-1 w-full">
                                    <div className="flex items-center">
                                      <div className="h-3 w-3 bg-[#F8886A] mr-2"></div>
                                      <div className="font-manrope font-medium text-[12px] leading-[16px] tracking-[0px] text-[#1A1A1A]">
                                        Paid:
                                      </div>
                                    </div>
                                    <div className="relative flex flex-col items-center group" style={{ alignItems: 'start' }}>
                                      <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex" style={{ alignItems: 'start', width: '300px' }}>
                                        <span className="rounded italian relative mr-3 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg" style={{ color: 'white', background: '#213343', maxWidth: '300px' }}>
                                          <span className="italic">
                                            ₹{Math.round(
                                              (finData?.T_review || 0) +
                                              (finData?.T_approved || 0) +
                                              (finData?.T_paid || 0)
                                            ).toLocaleString('en-IN') || 0}
                                          </span>
                                        </span>
                                        <div className="w-3 h-3 ml-1 -mt-2 rotate-45 bg-black" style={{ background: '#213343', marginRight: '12px' }}></div>
                                      </div>
                                      <span className="font-bold text-[14px] leading-[20px] tracking-[0px] text-right text-[#1A1A1A] font-manrope">
                                        {/* ₹{formatIndianNumber?.(
                Math.round(
                  (finData?.T_review || 0) +
                  (finData?.T_approved || 0) +
                  (finData?.T_paid || 0)
                )
              ) || 0} */}
                                        ₹ {Math.round(
                                          (finData?.T_review || 0) +
                                          (finData?.T_approved || 0) +
                                          (finData?.T_paid || 0)
                                        ).toLocaleString('en-IN')}

                                      </span>
                                    </div>
                                  </section>

                                  {/* Balance Section */}
                                  <section className="flex justify-between gap-[12px] items-center font-semibold text-xs my-1 w-full">
                                    <div className="flex items-center">
                                      <div className="h-3 w-3 bg-gray-300 mr-2"></div>
                                      <div className="font-manrope font-medium text-[12px] leading-[16px] tracking-[0px] text-[#1A1A1A]">
                                        Balance:
                                      </div>
                                    </div>
                                    <div className="relative flex flex-col items-center group" style={{ alignItems: 'start' }}>
                                      <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex" style={{ alignItems: 'start', width: '300px' }}>
                                        <span className="rounded italian relative mr-3 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg" style={{ color: 'white', background: '#213343', maxWidth: '300px' }}>
                                          <span className="italic">
                                            ₹{finData?.T_balance?.toLocaleString('en-IN')}
                                          </span>
                                        </span>
                                        <div className="w-3 h-3 ml-1 -mt-2 rotate-45 bg-black" style={{ background: '#213343', marginRight: '12px' }}></div>
                                      </div>
                                      <span className="font-bold text-[14px] leading-[20px] tracking-[0px] text-right text-[#EE443F] font-manrope ">
                                        {/* ₹{formatIndianNumber?.(Math.round(finData?.T_balance || 0))} */}
                                        ₹ {Math.round(finData?.T_balance || 0).toLocaleString('en-IN')}

                                      </span>
                                    </div>
                                  </section>
                                </div>
                              </div>
                            </div>

                            <div className="border-l border-gray-200 mx-2 w-1 h-[60px] rounded-[4px]"></div>

                            <div className="  ">
                              <div className="flex flex-col   rounded-md  py-1 ">
                                <div className="flex flex-row  px-1">
                                  {/* section 2 */}
                                  {['booked', 'unpaid', 'paid', 'selCategory'].includes(selCategory) &&
                                    <section className='flex gap-2'>


                                      <div
                                        className={` cursor-pointer   h-[92px] w-[100px] border   rounded-xl ${finData?.man_cs_approval == 'approved'
                                          ? 'bg-[#F0F0F0]'
                                          : finData?.man_cs_approval == 'rejected'
                                            ? 'bg-[#ffdbdb]'
                                            : 'bg-[#F0F0F0]'
                                          }  p-3 mx-1 flex flex-col items-center justify-center`}
                                        // style={{
                                        //   display: 'inline-block',
                                        //   alignSelf: 'flex-end',
                                        // }}
                                        onClick={() => {
                                          setSelUnitDetails(finData)
                                          setIsSubTopicOpen(true)
                                          setIsSubTopic('crm_cs_approval')
                                        }}
                                      >
                                        <div className="flex flex-col items-center justify-center">
                                          <div className="flex items-center justify-center rounded-lg bg-green-50 group-hover:bg-white">
                                            <ShoppingCartIcon
                                              className={`h-4 w-4 text-[#1A1A1A] group-hover:text-indigo-600 hover:text-green-600 ${finData?.man_cs_approval ===
                                                'approved'
                                                ? 'text-green-900'
                                                : 'text-gray-600 '
                                                }`}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <h6 className="font-manrope font-semibold text-[12px] leading-none tracking-[0] text-center text-[#666666] mt-1">
                                            AddOns
                                          </h6>
                                        </div>
                                      </div>


                                      {/* section 3*/}
                                      <div
                                        className={` cursor-pointer  h-[92px] w-[100px] border   rounded-xl ${finData?.kyc_status == 'approved'
                                          ? 'bg-[#CCC5F7]'
                                          : finData?.kyc_status == 'rejected'
                                            ? 'bg-[#ffdbdb]'
                                            : 'bg-[#F0F0F0]'
                                          }  p-3 rounded-md mx-1 flex flex-col items-center justify-center`}

                                        onClick={() => {
                                          setSelUnitDetails(finData)
                                          setIsSubTopicOpen(true)
                                          setIsSubTopic('crm_KYC')
                                        }}
                                      >
                                        <div className="flex flex-col items-center justify-center">
                                          <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <NewspaperIcon
                                              className={`h-4 w-4 text-[#1A1A1A] group-hover:text-indigo-600 hover:text-green-600 ${finData?.kyc_status == 'approved'
                                                ? 'bg-[#CCC5F7]'
                                                : finData?.kyc_status ==
                                                  'rejected'
                                                  ? 'bg-[#ffdbdb]'
                                                  : 'bg-[#F1F5F9] '
                                                }`}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <h6 className="font-manrope font-semibold text-[12px] leading-none tracking-[0] text-center text-[#666666] mt-1">
                                            KYC
                                          </h6>
                                        </div>
                                      </div>

                                      {/* section 4*/}
                                      <div
                                        className={` cursor-pointer  h-[92px] w-[100px] border   rounded-xl ${finData?.kyc_status == 'approved'
                                          ? 'bg-[#CCC5F7]'
                                          : finData?.kyc_status == 'rejected'
                                            ? 'bg-[#ffdbdb]'
                                            : 'bg-[#F0F0F0]'
                                          }  p-3 rounded-md mx-1 flex flex-col items-center justify-center`}
                                        // style={{
                                        //   display: 'inline-block',
                                        //   alignSelf: 'flex-end',
                                        // }}
                                        onClick={() => {
                                          setSelUnitDetails(finData)
                                          setIsSubTopicOpen(true)
                                          setIsSubTopic('crm_KYC')
                                        }}
                                      >
                                        <div className="flex flex-col items-center justify-center">
                                          <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                            <NewspaperIcon
                                              className={`h-4 w-4 text-[#1A1A1A] group-hover:text-indigo-600 hover:text-green-600 ${finData?.kyc_status == 'approved'
                                                ? 'bg-[#CCC5F7]'
                                                : finData?.kyc_status ==
                                                  'rejected'
                                                  ? 'bg-[#ffdbdb]'
                                                  : 'bg-[#F1F5F9] '
                                                }`}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <h6 className="font-manrope font-semibold text-[12px] leading-none tracking-[0] text-center text-[#666666] mt-1">
                                            Payment
                                          </h6>
                                        </div>
                                      </div>
                                    </section>

                                  }
                                  {['agreement_pipeline'].includes(selCategory) &&
                                    <section>
                                      <div
                                        className={` cursor-pointer   h-[92px] w-[100px] border   rounded-xl ${finData?.man_ats_approval == 'approved'
                                          ? 'bg-[#CCC5F7]'
                                          : finData?.man_ats_approval == 'rejected'
                                            ? 'bg-[#ffdbdb]'
                                            : 'bg-[#F1F5F9] '
                                          }  p-3 rounded-md mx-1`}

                                        onClick={() => {
                                          setSelUnitDetails(finData)
                                          setIsSubTopicOpen(true)
                                          setIsSubTopic('crm_ATS_Draft')
                                        }}
                                      >
                                        <div className="flex flex-col items-center justify-center mr-1  mb-1 mt-[5px]">
                                          <div className="flex flex-none items-center justify-center rounded-lg bg-green-50 group-hover:bg-white">
                                            <ChartPieIcon
                                              className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${finData?.man_ats_approval ==
                                                'approved'
                                                ? 'bg-[#CCC5F7]'
                                                : finData?.man_ats_approval ==
                                                  'rejected'
                                                  ? 'bg-[#ffdbdb]'
                                                  : 'bg-[#F1F5F9] '
                                                }`}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                            ATS Draft
                                          </h6>
                                        </div>
                                      </div>
                                      {/* section 3*/}
                                      <div
                                        className={` cursor-pointer  h-[92px] w-[100px] border   rounded-xl ${finData?.kyc_status == 'approved'
                                          ? 'bg-[#CCC5F7]'
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
                                              className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${finData?.kyc_status == 'approved'
                                                ? 'bg-[#CCC5F7]'
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
                                    </section>}
                                  {['agreement'].includes(selCategory) &&
                                    <section>
                                      <div
                                        className={` cursor-pointer  h-[73px] w-[75px] border   rounded-xl ${finData?.both_sd_approval == 'approved'
                                          ? 'bg-[#CCC5F7]'
                                          : finData?.both_sd_approval == 'rejected'
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
                                              className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${finData?.both_sd_approval ===
                                                'approved'
                                                ? 'text-green-900'
                                                : 'text-gray-600 '
                                                }`}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                            SD Approval
                                          </h6>
                                        </div>
                                      </div>
                                      {/* section 3*/}
                                      <div
                                        className={` cursor-pointer  h-[73px] w-[75px] border   rounded-xl ${finData?.kyc_status == 'approved'
                                          ? 'bg-[#CCC5F7]'
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
                                              className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${finData?.kyc_status == 'approved'
                                                ? 'bg-[#CCC5F7]'
                                                : finData?.kyc_status ==
                                                  'rejected'
                                                  ? 'bg-[#ffdbdb]'
                                                  : 'bg-[#F1F5F9] '
                                                }`}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                            Loan
                                          </h6>
                                        </div>
                                      </div>
                                    </section>}
                                  {['registered', 'possession'].includes(selCategory) &&
                                    <section>
                                      <div
                                        className={` cursor-pointer  h-[73px] w-[75px] border   rounded-xl ${finData?.both_sd_approval == 'approved'
                                          ? 'bg-[#CCC5F7]'
                                          : finData?.both_sd_approval == 'rejected'
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
                                              className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${finData?.both_sd_approval ===
                                                'approved'
                                                ? 'text-green-900'
                                                : 'text-gray-600 '
                                                }`}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                            Posession
                                          </h6>
                                        </div>
                                      </div>
                                      {/* section 3*/}
                                      <div
                                        className={` cursor-pointer  h-[73px] w-[75px] border   rounded-xl ${finData?.kyc_status == 'approved'
                                          ? 'bg-[#CCC5F7]'
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
                                              className={`h-4 w-4 text-gray-600 group-hover:text-indigo-600 hover:text-green-600 ${finData?.kyc_status == 'approved'
                                                ? 'bg-[#CCC5F7]'
                                                : finData?.kyc_status ==
                                                  'rejected'
                                                  ? 'bg-[#ffdbdb]'
                                                  : 'bg-[#F1F5F9] '
                                                }`}
                                              aria-hidden="true"
                                            />
                                          </div>
                                          <h6 className="font-bodyLato text-[#828d9e] text-xs mt-1">
                                            Loan
                                          </h6>
                                        </div>
                                      </div>
                                    </section>}
                                  {/* section 4*/}
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
        widthClass="max-w-5xl"
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
        widthClass="max-w-[1002px]"
        transactionData={transactionData}
        unitsViewMode={false}
        selUnitPayload={selUnitDetails}
        selSubMenu={selSubMenu}
        selSubMenu2={selSubMenu1}
      />
    </>
  )
}

export default CrmRegisterModeHome
