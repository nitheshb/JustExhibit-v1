/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react'

import {
  PuzzleIcon,
  ArrowsExpandIcon,
  PencilIcon,
  CalendarIcon,
  ArrowDownIcon,
  EyeIcon,
  PlusIcon,
} from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { DriveEtaSharp } from '@mui/icons-material'
import { useSnackbar } from 'notistack'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from 'recharts'

import { Link, routes } from '@redwoodjs/router'

import FloorStatsCard from 'src/components/FloorStatsCard/FloorStatsCard'
import UnitsStatsCard from 'src/components/UnitsStatsCard/UnitsStatsCard'
import { uniTypes } from 'src/constants/projects'
import { getUnits, updateBlock_AddFloor } from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'

import AssigedToDropComp from '../assignedToDropComp'
import PieChartProject from '../comps/pieChartProject'
import DropCompUnitStatus from '../dropDownUnitStatus'
import SiderForm from '../SiderForm/SiderForm'
import UnitsSmallViewCard from '../unitsSmallView'

const Floordetails = ({
  block = 'A',
  pId,
  phaseDetails,
  projectDetails,
  phaseFeed,
  BlockFeed,
  selBlock,
  setSelBlock,
  source,
  setSelUnitDetails,
  setShowCostSheetWindow,
  setSelMode,
  leadDetailsObj,
  setPhaseFun,
  selPhaseName,
}) => {
  const {
    totalValue,
    soldValue,
    availValue,
    bookValue,
    blockValue,
    holdValue,
    totalArea,
    soldArea,
    availArea,
    bookArea,
    blockArea,
    holdArea,
    totalUnitCount,
    soldUnitCount,
    availableCount,
    bookUnitCount,
    blockUnitCount,
  } = selBlock

  const { user } = useAuth()

  const { orgId } = user
  const unitStatsData = [
    {
      id: 'Total',
      label: 'Total',
      value: totalUnitCount || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: availableCount || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Sold',
      label: 'Sold',
      value: soldUnitCount || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: bookUnitCount || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Blocked',
      label: 'Blocked',
      value: blockUnitCount || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
  ]
  const { enqueueSnackbar } = useSnackbar()
  const unitFeedData = {}
  const [unitsFeed, setUnitsFeed] = useState([])
  const [actionType, setActionType] = useState('costSheetMode')
  const [reportFeed, setReportFeed] = useState(unitStatsData)
  const [blocksViewFeature, setBlocksViewFeature] = useState('Stalls')
  const [unitShrink, setUnitShrink] = useState(true)
  const [filteredUnits, setFilteredUnits] = useState([])
  const [filStatus, setFilStatus] = useState(['available', 'booked', 'blocked'])
  const [filBedRooms, setFilBedRooms] = useState([1, 2, 3, 4])
  const [filBathrooms, setFilBathrooms] = useState([1, 2, 3, 4])
  const [selStatus, setFilSelStatus] = useState(['all'])
  const [isUnitDetailsOpen, setisUnitDetailsOpen] = useState(false)
  const [isUnitQuoteBookBlock, setisUnitQuoteBookBlock] = useState(false)
  const [isCancelUnit, setIsCancelUnit] = useState(false)
  const [isSwapUnit, setIsSwapUnit] = useState(false)
  const [isUnitAddOpen, setisUnitAddOpen] = useState(false)
  const [selUnitDetails, setSelUnitDetails1] = useState({})
  const [filterFacingResults, setFilterFacingResults] = useState([])
  const [filterTypeResults, setFilterTypeResults] = useState([])

  const [selSubMenu, setSelSubMenu] = useState('summary')

  const [selSubMenu1, setSelSubMenu1] = useState('summary')
  const [filSuperBuildUpArea, setFilSuperBuiltUpArea] = useState([35397, 59895])

  const [filRatePerSqft, setFilRatePerSqft] = useState(12000000000000)
  const [filFacing, setFilFacing] = useState([
    'east',
    'west',
    'south',
    'north',
    'south-east',
    'south-west',
    'north-east',
    'north-west',
  ])

  const [filType, setFilType] = useState(uniTypes)

  const [sliderInfo, setSliderInfo] = useState({
    open: false,
    title: '',
    sliderData: {},
    widthClass: 'max-w-2xl',
  })
  const [addUnitSlider, setAddUnitSlider] = useState({
    open: false,
    title: '',
    sliderData: {},
    widthClass: 'max-w-2xl',
  })
  const handleSliderClose = () => {
    setSliderInfo({
      open: false,
      title: '',
      sliderData: {},
      widthClass: 'max-w-2xl',
    })
  }
  useEffect(() => {
    console.log('source ', source)
    setFilteredUnits(unitsFeed)
    setFilterFacingResults(unitsFeed)
    setFilterTypeResults(unitsFeed)
    getUnitsFun()
  }, [])
  useEffect(() => {
    setReportFeed(unitStatsData)
    getUnitsFun()
  }, [selBlock])

  useEffect(() => {
    setFilteredUnits(unitsFeed)
    setFilterFacingResults(unitsFeed)
    setFilterTypeResults(unitsFeed)
  }, [unitsFeed])
  useEffect(() => {
    filterFun()
  }, [selStatus, filFacing])

  const filterFun = async () => {
    console.log('status is ==>', selStatus)
    const z = unitsFeed?.filter((da) => {
      selStatus.includes(da?.status)
      const statusMatch = !selStatus.includes('any')
        ? selStatus.includes(da?.status)
        : true

      const facingMatch = !filFacing.includes('any')
        ? filFacing.includes(da?.facing?.toLocaleLowerCase())
        : true
      const typeMatch = !filType.includes('any')
        ? filType.includes(da?.size?.toLocaleLowerCase())
        : true

      return facingMatch && typeMatch
    })
    setFilterFacingResults(z)
    setFilterTypeResults(z)
    setFilteredUnits(z)
  }
  const valueFeedData = [
    {
      id: 'Total',
      label: 'Total',
      value: totalValue || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: availValue || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: bookValue || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Blocked',
      label: 'Blocked',
      value: blockValue || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
    {
      id: 'Hold',
      label: 'Hold',
      value: holdValue || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
  ]
  const areaFeedData = [
    {
      id: 'Total',
      label: 'Total',
      value: totalArea || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Available',
      label: 'Available',
      value: availArea || 0,
      pic: '',
      color: 'hsl(35, 70%, 50%)',
    },
    {
      id: 'Booked',
      label: 'Booked',
      value: bookArea || 0,
      pic: '',
      color: 'hsl(9, 70%, 50%)',
    },
    {
      id: 'Blocked',
      label: 'Blocked',
      value: blockArea || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
    {
      id: 'Hold',
      label: 'Hold',
      value: holdArea || 0,
      pic: '',
      color: 'hsl(202, 70%, 50%)',
    },
  ]
  const handleDetailView_Close = async (kind) => {
    console.log('inside close it ')
    setShowCostSheetWindow(true)
    setSelUnitDetails(kind)
    console.log('inside close it ')
  }
  const makeFilterFun = async (id, value) => {
    // unitsFeed, setUnitsFeed
    console.log('nw one', id, filFacing)
    if (id === 'Status') {
      let x = []
      if (value === 'Any') {
        x = ['available', 'booked', 'blocked']
      } else {
        await x.push(value?.toLocaleLowerCase())
      }
      await setFilStatus(x)
      await allmakeOverFun(
        x,
        filBedRooms,
        filBathrooms,
        filSuperBuildUpArea,
        filRatePerSqft,
        filFacing
      )
      // const y = await unitsFeed?.filter((da) => x.includes(da?.Status))
      // await setFilteredUnits(y)
    }
    if (id === 'facing') {
      let x = []
      if (value === 'Any') {
        x = [
          'east',
          'west',
          'south',
          'north',
          'south-east',
          'south-west',
          'north-east',
          'north-west',
        ]
      } else {
        await x.push(value?.toLocaleLowerCase())
      }
      // setFilteredUnits(
      //   unitsFeed?.filter((da) => x.includes(da?.facing?.toLocaleLowerCase()))
      // )

      // return
      await setFilFacing([value])
      await allmakeOverFun(
        filStatus,
        filBedRooms,
        filBathrooms,
        filSuperBuildUpArea,
        filRatePerSqft,
        x
      )
    }
    if (id === 'bed_rooms') {
      let x = []
      if (value === 'Any') {
        x = [1, 2, 3, 4]
      } else {
        await x.push(value)
      }
      await setFilBedRooms(x)
      await allmakeOverFun(
        filStatus,
        x,
        filBathrooms,
        filSuperBuildUpArea,
        filRatePerSqft,
        filFacing
      )
    }
    if (id === 'Type' || id === 'type') {
      let x = []
      if (value === 'Any') {
        x = [1, 2, 3, 4]
      } else {
        await x.push(value)
      }
      await setFilBathrooms(x)
      await allmakeOverFun(
        filStatus,
        filBedRooms,
        x,
        filSuperBuildUpArea,
        filRatePerSqft,
        filFacing
      )
    }
    if (id === 'bath_rooms') {
      let x = []
      if (value === 'Any') {
        x = [1, 2, 3, 4]
      } else {
        await x.push(value)
      }
      await setFilBathrooms(x)
      await allmakeOverFun(
        filStatus,
        filBedRooms,
        x,
        filSuperBuildUpArea,
        filRatePerSqft,
        filFacing
      )
    }
    if (id === 'super_built_up_area') {
      let x = []
      if (value === 'Any') {
        x = [35397, 59895]
      } else {
        await x.push(value)
      }
      setFilSuperBuiltUpArea(x)
      await allmakeOverFun(
        filStatus,
        filBedRooms,
        filBathrooms,
        x,
        filRatePerSqft,
        filFacing
      )
    }
    if (id === 'rate_per_sqft') {
      let x = 0
      if (value === 'Any') {
        x = 12000000000000
      } else {
        x = value
      }
      setFilRatePerSqft(x)
      await allmakeOverFun(
        filStatus,
        filBedRooms,
        filBathrooms,
        filSuperBuildUpArea,
        value,
        filFacing
      )
    }

    // console.log(
    //   'filtered stuff is ',
    //   x,
    //   filBedRooms,
    //   unitsFeed[0]['bed_rooms'],
    //   filFacing,
    //   filStatus,
    //   unitsFeed[0]['Status'],
    //   filStatus.includes(unitsFeed[0]['Status']),
    //   value,
    //   unitsFeed[0][id] == value
    // )
    // console.log('id==>', id, value)
  }
  const allmakeOverFun = async (
    Status,
    bed_rooms,
    bath_rooms,
    super_built_up_area,
    rate_per_sqft,
    facing
  ) => {
    const y = await unitsFeed?.filter((da) => {
      console.log(
        'what is this',
        filFacing,
        da?.facing,
        filType,
        Status,
        Status.includes(da?.Status),
        bed_rooms.includes(da?.bed_rooms),
        bed_rooms,
        da?.bed_rooms
      )
      const facingMatch = filFacing.includes(da?.facing?.toLocaleLowerCase())
      // const typeMatch = filType.includes(da?.size?.toLocaleLowerCase())
      const statusMatch = !selStatus.includes('any')
        ? selStatus.includes(da?.status)
        : true
      return facingMatch && statusMatch
      return (
        // (!selStatus.includes('any') ? selStatus.includes(da?.status) : true)
        // &&
        filFacing.includes(da?.facing.toLocaleLowerCase())
        // &&
        // filType.includes(da?.size)
      )
      // &&
      // Status.includes(da?.Status)&&

      //  &&
      // bed_rooms.includes(da?.bed_rooms) &&
      // // bath_rooms.includes(da?.bath_rooms) &&
      // // super_built_up_area.includes(da?.super_built_up_area) &&
      // da?.rate_per_sqft < rate_per_sqft
    })
    const z = await unitsFeed?.filter((da) => {
      return (
        (!selStatus.includes('any') ? selStatus.includes(da?.status) : true) &&
        filType.includes(da?.size.toLocaleLowerCase())
      )
    })

    const x = await unitsFeed?.filter((da) => {
      return (
        (!selStatus.includes('any') ? selStatus.includes(da?.status) : true) &&
        filFacing.includes(da?.facing.toLocaleLowerCase())
      )
    })
    console.log('my values are', y, facing)
    await setFilteredUnits(y)
    // await setFilterFacingResults(z)
    // await setFilterTypeResults(x)
  }

  const filterByStatus = async (
    Status,
    bed_rooms,
    bath_rooms,
    super_built_up_area,
    rate_per_sqft,
    facing
  ) => {
    const y = await unitsFeed?.filter((da) => {
      console.log(
        'what is this',
        Status,
        Status.includes(da?.Status),
        bed_rooms.includes(da?.bed_rooms),
        bed_rooms,
        da?.bed_rooms
      )
      return (
        // facing.includes(da?.facing.toLocaleLowerCase())
        // // &&
        Status.includes(da?.Status)
        //  &&
        // bed_rooms.includes(da?.bed_rooms) &&
        // // bath_rooms.includes(da?.bath_rooms) &&
        // // super_built_up_area.includes(da?.super_built_up_area) &&
        // da?.rate_per_sqft < rate_per_sqft
      )
    })
    await setFilteredUnits(y)
  }
  const selReportFun = async (data) => {
    setReportFeed(data)
  }
  const getUnitsFun = async () => {
    console.log('get dataf un is ', selBlock, selBlock?.uid)
    const todoData = await getUnits(
      orgId,
      (querySnapshot) => {
        let pro
        const y = []
        setUnitsFeed([])
        const projects = querySnapshot.docs.map(async (docSnapshot) => {
          const x = docSnapshot.data()
          x.uid = docSnapshot.id
          x.id = docSnapshot.id
          const { staDA } = x
          y.push(x)
        })
        y.sort((a, b) => a.unit_no - b.unit_no)
        console.log('Stall details are ', pId, selBlock?.uid || 0, y)
        setUnitsFeed(y)
      },
      { pId: pId, blockId: selBlock?.uid || 0, type: 'today' },
      (error) => {
        console.log('error', error)
      }
    )
    await console.log('what are we', todoData)
  }

  return (
    <div className="lg:col-span-10  ">
      {blocksViewFeature === 'Report' && (
        <>
          {' '}
          <div className=" mt-10 grid grid-cols-1 gap-7">
            <span className="min-w-100 ">
              <span>
                <div
                  className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                  style={{ backgroundColor: '#EBF9F9' }}
                >
                  <div className="flex items-center flex-row px-0  pl-0 mb-2 ">
                    {/* <h1 className="text-lg font-medium">redefine.</h1> */}
                    {/* <img className="w-8 h-8" alt="" src={'/m4.png'}></img> */}
                    <div className="relative z-10 flex items-center w-auto text-md font-bold leading-none pl-0 ml-1 mt-4 ">
                      {selBlock?.blockName} Report
                    </div>
                  </div>

                  {/* <div className="relative z-10 flex items-center w-auto text-md  text-gray-500 leading-none pl-0 ml-1 mt-1 ">
                      {'Does not include future absense requests'}
                    </div> */}
                  <section className="flex ml-auto mt-[18px]">
                    {true && (
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-pink-800 bg-pink-200 rounded-full">
                        <EyeIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                        Current Week
                      </span>
                    )}

                    <button>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        <CalendarIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        This Month
                      </span>
                    </button>
                    <button>
                      <span className="flex ml-2 items-center h-6 px-3 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                        <CalendarIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        Last 6 Months
                      </span>
                    </button>
                  </section>

                  <div className="grid grid-cols-2 gap-0 ">
                    <div className="mt-6">
                      {/* 1 */}
                      <div
                        className="p-2 mb-1  mx-1 inline-block"
                        style={{ minWidth: '30%' }}
                        onClick={() => selReportFun(unitStatsData)}
                      >
                        {/* <UnitsStatsCard
                            kind={data}
                            feedData={unitFeedData}
                            bg="#fef7f7"
                          /> */}

                        <div
                          className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                          style={{ backgroundColor: '#fef7f7' }}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                              Stalls
                            </h3>
                          </div>
                          <div className="flex flex-col justify-between px-2">
                            {unitStatsData.map((data1, i) => (
                              <span
                                className="flex flex-row items-center justify-between mt-2"
                                key={i}
                              >
                                <span className="text-sm text-gray-700 ">
                                  {data1?.label}
                                </span>
                                <span className="text-sm font-semibold">
                                  {data1?.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* 2 */}
                      <div
                        className="p-2 mb-1  mx-1 inline-block"
                        style={{ minWidth: '30%' }}
                        onClick={() => selReportFun(valueFeedData)}
                      >
                        <div
                          className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                          style={{ backgroundColor: '#fef7f7' }}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                              Values
                            </h3>
                          </div>
                          <div className="flex flex-col justify-between px-2">
                            {valueFeedData.map((data1, i) => (
                              <span
                                className="flex flex-row items-center justify-between mt-2"
                                key={i}
                              >
                                <span className="text-sm text-gray-700 ">
                                  {data1?.label}
                                </span>
                                <span className="text-sm font-semibold">
                                  {data1?.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 3 */}
                      <div
                        className="p-2 mb-1  mx-1 inline-block"
                        style={{ minWidth: '30%' }}
                        onClick={() => selReportFun(areaFeedData)}
                      >
                        <div
                          className="drop-shadow-md min-w-full z-10 flex flex-col  max-w-md p-4 mx-auto my-0 rounded-lg "
                          style={{ backgroundColor: '#fef7f7' }}
                        >
                          <div className="flex flex-row items-center justify-between">
                            <h3 className="m-0 ml-2 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                              Areas
                            </h3>
                          </div>
                          <div className="flex flex-col justify-between px-2">
                            {areaFeedData.map((data1, i) => (
                              <span
                                className="flex flex-row items-center justify-between mt-2"
                                key={i}
                              >
                                <span className="text-sm text-gray-700 ">
                                  {data1?.label}
                                </span>
                                <span className="text-sm font-semibold">
                                  {data1?.value}
                                </span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {' '}
                      <PieChartProject reportPayload={reportFeed} />
                    </div>
                  </div>
                </div>
              </span>
            </span>
          </div>
        </>
      )}
      {blocksViewFeature === 'Stalls' && (
        <>
          <section className="bg-white py-3">
            {/* <div className="flex justify-between items-center  px-4 bg-white border-b py-2">
              <div className="flex flex-row max-w-full">
                <p className="text-sm font-semibold text-[#0091ae]">
                  <span className="text-gray-700">
                    {selBlock?.blockName}-Stalls
                  </span>
                </p>
              </div>
              <div>
                <DropCompUnitStatus
                  type={'Status'}
                  id={'Status'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filStatus}
                />

                <DropCompUnitStatus
                  type={'bedrooms'}
                  id={'bed_rooms'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filBedRooms}
                />
                <DropCompUnitStatus
                  type={'bathrooms'}
                  id={'bath_rooms'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filBathrooms}
                />
                <DropCompUnitStatus
                  type={'Size'}
                  id={'super_built_up_area'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filSuperBuildUpArea}
                />
                <DropCompUnitStatus
                  type={'Price'}
                  id={'rate_per_sqft'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filRatePerSqft}
                />
                <DropCompUnitStatus
                  type={'Facing'}
                  id={'facing'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filFacing}
                />
              </div>
            </div> */}

            <section
              className={`flex flex-row px- py- justify-between ${
                ['Apartment', 'Villas', 'Plots'].includes(
                  projectDetails?.projectType?.name
                )
                  ? 'my-4'
                  : ''
              }`}
            >
              <div className="flex flex-row">
                {['Apartment', 'Villas'].includes(
                  projectDetails?.projectType?.name
                ) && (
                  <DropCompUnitStatus
                    type={'blocks'}
                    id={'blocks'}
                    setStatusFun={setSelBlock}
                    filteredUnits={BlockFeed}
                    pickedValue={filBedRooms}
                  />
                )}
                <section className="text-sm  pr-2 font-blue text-[13px] italic flex flex-row ml-5 ">
                  {/* <span className="relative  flex flex-row items-center w-auto text-sm font-bold leading-none pl-0 mt-[px]">

                  <AssigedToDropComp
                    assignerName={selPhaseName}
                    id={'id'}
                    setAssigner={setPhaseFun}
                    usersList={phaseFeed}
                  />
                </span> */}
                  <span className="font-blue text-[13px] italic">showing </span>
                  {'   '}
                  <span className="font-semibold font-blue mx-1">
                    {filteredUnits.length}
                  </span>{' '}
                  in{' '}
                  <span className="font-semibold font-blue mx-1">
                    {unitsFeed.length}
                  </span>{' '}
                  stalls
                </section>
              </div>
              <section className="flex flex-row">
                <section className="text-sm mt-[2px]  rounded flex flex-row border">
                  <section
                    className={`flex flex-row pr-2 ${
                      selStatus.includes('available') ? 'bg-[#c6fff0]' : ''
                    }`}
                    onClick={() => {
                      setFilSelStatus(['available'])
                    }}
                  >
                    <span className="ml-2 w-3 h-3 mt-[4px] rounded-md mr-1 bg-[#E8A190] inline-block"></span>{' '}
                    <span className="mr-1 text-[10px] ">Available</span>
                    {unitsFeed?.filter((d) => d?.status == 'available').length}
                  </section>
                  <section
                    className={`flex flex-row border-x ${
                      selStatus.includes('booked') ? 'bg-[#c6fff0]' : ''
                    }`}
                    onClick={() => {
                      setFilSelStatus(['booked'])
                    }}
                  >
                    <span className="w-3 h-3 ml-1 mt-[4px] rounded-md mr-1 bg-[#D3F6E3]"></span>{' '}
                    <span className="mr-1 text-[10px] ">Booked</span>
                    <section className="mr-1">
                      {unitsFeed?.filter((d) => d?.status == 'booked').length}
                    </section>
                  </section>
                  <section
                    className={`flex flex-row mr-2 ${
                      selStatus.includes('blocked') ? 'bg-[#c6fff0]' : ''
                    }`}
                    onClick={() => {
                      setFilSelStatus([
                        'customer_blocked',
                        'management_blocked',
                        'blocked',
                      ])
                    }}
                  >
                    <span className="w-3 h-3 ml-2 mr-2 mt-[4px] rounded-md mr-1 bg-[#E9E9E9]"></span>{' '}
                    <span className="mr-1 text-[10px]"> Blocked</span>
                    {
                      unitsFeed?.filter((d) =>
                        [
                          'customer_blocked',
                          'management_blocked',
                          'blocked',
                        ].includes(d?.status)
                      ).length
                    }
                  </section>
                </section>

                <section className="mt-[-3px]">
                  <div>
                    {/* <DropCompUnitStatus
                      type={'Status'}
                      id={'Status'}
                      setStatusFun={makeFilterFun}
                      filteredUnits={filteredUnits}
                      pickedValue={filStatus}
                    /> */}

                    {/* <DropCompUnitStatus
                      type={'bedrooms'}
                      id={'bed_rooms'}
                      setStatusFun={makeFilterFun}
                      filteredUnits={unitsFeed}
                      pickedValue={filBedRooms}
                    /> */}
                    {/* <DropCompUnitStatus
                  type={'bathrooms'}
                  id={'bath_rooms'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filBathrooms}
                /> */}
                    {/* <DropCompUnitStatus
                      type={'Size'}
                      id={'super_built_up_area'}
                      setStatusFun={makeFilterFun}
                      filteredUnits={unitsFeed}
                      pickedValue={filSuperBuildUpArea}
                    /> */}
                    {/* <DropCompUnitStatus
                  type={'Price'}
                  id={'rate_per_sqft'}
                  setStatusFun={makeFilterFun}
                  filteredUnits={filteredUnits}
                  pickedValue={filRatePerSqft}
                /> */}
                    {/* <DropCompUnitStatus
                      type={'Type'}
                      id={'type'}
                      setStatusFun={makeFilterFun}
                      totalunits={unitsFeed}
                      filteredUnits={filterTypeResults}
                      pickedValue={filFacing}
                    /> */}
                    {/* <DropCompUnitStatus
                      type={'Facing'}
                      id={'facing'}
                      setStatusFun={makeFilterFun}
                      totalunits={unitsFeed}
                      filteredUnits={filterFacingResults}
                      pickedValue={filFacing}
                    /> */}
                  </div>
                </section>
                <section className="flex">
                  <button
                    onClick={() => {
                      setUnitShrink(!unitShrink)
                    }}
                    className={
                      'flex cursor-pointer items-center h-6 px-3 text-xs font-semibold  rounded-md hover:bg-pink-200 hover:text-pink-800 text-green-800 '
                    }
                  >
                    {/* {unitShrink && (
                      <>
                        <ArrowsExpandIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        Expand
                      </>
                    )} */}

                    {!unitShrink && (
                      <>
                        <PuzzleIcon
                          className="h-3 w-3 mr-1"
                          aria-hidden="true"
                        />
                        Sleek
                      </>
                    )}
                  </button>
                </section>
              </section>
            </section>
            {['Stalls'].includes(
              'Stalls'
            ) && (
              <ul className="">
                {/* {selBlock?.floorA?.map((floorDat, i) => { */}
                {[1].map((floorDat, i) => {
                  return (
                    <li className="" key={i}>
                      <section>
                        {/* <section className="px-8 bg-red-100 w-[130px] rounded-r-2xl">
                          Fl-{floorDat}
                        </section> */}
                        <div className=" px-5 mt-6">
                          {filteredUnits
                            ?.filter((da) => da?.floor != i)
                            .map((data, index) => {
                              return unitShrink ? (
                                <div
                                  className=" mb-1  mx-1 inline-block"
                                  key={index}
                                  // onClick={() => handleDetailView_Close(data)}
                                  onClick={() => {
                                    console.log('check is ', leadDetailsObj)
                                    if (
                                      [
                                        'projectManagement',
                                        'projectOnboard',
                                      ].includes(source)
                                    ) {
                                      setSelUnitDetails1(data)
                                      setSliderInfo({
                                        open: true,
                                        title: 'Edit Stall',
                                        sliderData: {
                                          unitDetail: data,
                                          phaseDetail: phaseFeed,
                                          leadDetailsObj: leadDetailsObj,
                                        },
                                        widthClass: 'max-w-2xl',
                                      })
                                    } else {
                                      console.log('customer Detailsare', data)
                                      setSelUnitDetails1(data)

                                      return
                                      // setSliderInfo({
                                      //   open: true,
                                      //   title: 'unit_view',
                                      //   sliderData: {
                                      //     unitDetail: data,
                                      //     phaseDetail: phaseFeed,
                                      //     leadDetailsObj: leadDetailsObj,
                                      //   },
                                      //   widthClass: 'max-w-7xl',
                                      // })
                                    }
                                  }}
                                >
                                  <div>
                                    <div className="maincontainer">
                                      <div className="back">
                                        <div
                                          className={` min-w-[125px] min-h-[72px]  z-10 flex flex-col  max-w-md p-1 mx-auto my-0 rounded-md cursor-pointer border border-black-600 shadow-radius shadow-xl`}
                                        >
                                          {data?.status === 'available' && (
                                            <div className="flex flex-col items-right justify-between">
                                              {![
                                                'projectManagement',
                                                'projectOnboard',
                                              ].includes(source) && (
                                                <div className="flex flex-row justify-between items-right">
                                                  <h3
                                                    className="m-0 ml-2 text-sm   leading-tight tracking-tight text-blue-800 border-0 border-blue-200 h-[16px] hover:border-b hover:border-blue-800"
                                                    onClick={() => {
                                                      setActionType(
                                                        'unitBookingMode'
                                                      )
                                                      setisUnitQuoteBookBlock(
                                                        true
                                                      )
                                                      setSliderInfo({
                                                        open: true,
                                                        title: 'View Unit',
                                                        sliderData: {
                                                          unitDetail: data,
                                                          phaseDetail:
                                                            phaseFeed,
                                                          leadDetailsObj:
                                                            leadDetailsObj,
                                                        },
                                                        widthClass: 'max-w-4xl',
                                                      })
                                                    }}
                                                  >
                                                    Book
                                                  </h3>
                                                  <h3
                                                    className="m-0 mr-2 text-sm  leading-tight tracking-tight text-blue-800 border-0 border-blue-800 h-[16px] hover:border-b hover:border-blue-800"
                                                    onClick={() => {
                                                      setActionType(
                                                        'costSheetMode'
                                                      )
                                                      setisUnitQuoteBookBlock(
                                                        true
                                                      )
                                                      setSliderInfo({
                                                        open: true,
                                                        title: 'View Unit',
                                                        sliderData: {
                                                          unitDetail: data,
                                                          phaseDetail:
                                                            phaseFeed,
                                                          leadDetailsObj:
                                                            leadDetailsObj,
                                                        },
                                                        widthClass: 'max-w-2xl',
                                                      })
                                                    }}
                                                  >
                                                    Quotee
                                                  </h3>
                                                </div>
                                              )}

                                              <div className="flex flex-row justify-between items-right">
                                                {[
                                                  'projectManagement',
                                                  'projectOnboard',
                                                ].includes(source) && (
                                                  <h3
                                                    className="m-0 mr-2 mt-2 ml-2 mr-[21px] text-sm  leading-tight tracking-tight text-blue-800 border-0 border-blue-800 h-[16px]  hover:border-b hover:border-blue-800"
                                                    onClick={() => {
                                                      setisUnitQuoteBookBlock(
                                                        true
                                                      )

                                                      setSliderInfo({
                                                        open: true,
                                                        title: 'Edit Stall',
                                                        sliderData: {
                                                          unitDetail: data,
                                                          phaseDetail:
                                                            phaseFeed,
                                                          leadDetailsObj:
                                                            leadDetailsObj,
                                                        },
                                                        widthClass: 'max-w-2xl',
                                                      })
                                                    }}
                                                  >
                                                    Edit
                                                  </h3>
                                                )}
                                                {![
                                                  'projectManagement',
                                                  'projectOnboard',
                                                ].includes(source) && (
                                                  <h3
                                                    className="m-0 mr-2 mt-3 text-sm  leading-tight tracking-tight text-blue-800 text-black border-0 border-blue-200 h-[16px] hover:border-b hover:border-blue-800  "
                                                    onClick={() => {
                                                      setActionType(
                                                        'unitBlockMode'
                                                      )
                                                      setisUnitQuoteBookBlock(
                                                        true
                                                      )
                                                      setSliderInfo({
                                                        open: true,
                                                        title: 'View Unit',
                                                        sliderData: {
                                                          unitDetail: data,
                                                          phaseDetail:
                                                            phaseFeed,
                                                          leadDetailsObj:
                                                            leadDetailsObj,
                                                        },
                                                        widthClass: 'max-w-4xl',
                                                      })
                                                    }}
                                                  >
                                                    Block
                                                  </h3>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                          {[
                                            'booked',
                                            'allotment',
                                            'agreement_pipeline',
                                            'agreement',
                                            'registered',
                                            'possession',
                                          ].includes(data?.status) && (
                                            <div className="flex flex-col items-right justify-between">
                                              <div className="flex flex-row justify-between items-right">
                                                <h3
                                                  className="m-0 ml-2 mt- text-sm   leading-tight tracking-tight text-blue-800 border-0 border-blue-200"
                                                  onClick={() => {
                                                    setisUnitDetailsOpen(true)
                                                  }}
                                                >
                                                  Details
                                                </h3>
                                                <h3
                                                  className="m-0 mr-2 ml-2 mt- text-sm   leading-tight tracking-tight text-blue-800 border-0 border-blue-200"
                                                  onClick={() => {
                                                    setisUnitDetailsOpen(true)
                                                  }}
                                                >
                                                  Payment
                                                </h3>
                                              </div>
                                              <div className="flex flex-row justify-between items-right">
                                                <h3
                                                  className="m-0 ml-2 mt-4 text-sm   leading-tight tracking-tight text-blue-800 border-0 border-blue-200"
                                                  onClick={() => {
                                                    setIsCancelUnit(true)
                                                    setSliderInfo({
                                                      open: true,
                                                      title: 'Cancel_Unit',
                                                      sliderData: {
                                                        unitDetail: data,
                                                        phaseDetail: phaseFeed,
                                                        leadDetailsObj:
                                                          leadDetailsObj,
                                                      },
                                                      widthClass: 'max-w-4xl',
                                                    })
                                                  }}
                                                >
                                                  Cancel
                                                </h3>
                                                <h3
                                                  className="m-0 ml-2 mr-2 mt-4 text-sm   leading-tight tracking-tight text-blue-800 border-0 border-blue-200"
                                                  onClick={() => {
                                                    setisUnitDetailsOpen(true)
                                                  }}
                                                >
                                                  Swap
                                                </h3>
                                              </div>
                                            </div>
                                          )}

                                          {[
                                            'blocked',
                                            'customer_blocked',
                                            'management_blocked',
                                          ].includes(data?.status) && (
                                            <div className="flex flex-col items-right justify-between">
                                              <div className="flex flex-row justify-between items-right">
                                                <h3 className="m-0 ml-2 mt-4 text-sm   leading-tight tracking-tight text-blue-800 border-0 border-blue-200">
                                                  Blocked Details
                                                </h3>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <div className="front">
                                        <div className="image">
                                          <UnitsSmallViewCard
                                            kind={data}
                                            feedData={unitFeedData}
                                            bg="#CCFBF1"
                                            setShowCostSheetWindow={
                                              setShowCostSheetWindow
                                            }
                                            setSelUnitDetails={
                                              setSelUnitDetails
                                            }
                                            setSelMode={setSelMode}
                                          />{' '}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="p-2 mb-1  mx-1 inline-block cursor-pointer"
                                  key={index}
                                  onClick={() => handleDetailView_Close(data)}
                                >
                                  <UnitsStatsCard
                                    kind={data}
                                    feedData={unitFeedData}
                                    bg="#fef7f7"
                                  />
                                </div>
                              )
                            })}
                        </div>
                      </section>
                    </li>
                  )
                })}
              </ul>
            )}

            {/* 1 */}
            {['projectManagement', 'projectOnboard'].includes(source) && (
              <div className=" z-10 flex flex-row my-[30px] ml-5">
                {['Apartments', 'Apartment'].includes(
                  projectDetails?.projectType?.name
                ) && (
                  <div
                    className=" cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0 mx-3 rounded-md inline-block min-h-[50px]  min-w-[100px] border border-dotted border-black"
                    // style={{ backgroundColor: '#fef7f7' }}
                    onClick={() => {
                      // setSliderInfo({
                      //   open: true,
                      //   title: 'Add Unit',
                      //   sliderData: {
                      //     phase: {},
                      //     block: {},
                      //   },
                      //   widthClass: 'max-w-2xl',
                      // })
                      const { uid, floorA } = selBlock
                      updateBlock_AddFloor(
                        uid,
                        floorA?.length || 0,
                        enqueueSnackbar
                      )
                      console.log('chiru is', selBlock)
                    }}
                  >
                    <div className="flex flex-col items-center justify-between">
                      <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                      <h3 className="m-0 mt-1 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                        Add Floor
                      </h3>
                      {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                    </div>
                    <div className="flex flex-row justify-between px-2">
                      <span className="flex flex-row items-center justify-between mr-2">
                        <span className="text-sm font-"></span>
                      </span>
                    </div>
                  </div>
                )}
                <div
                  className=" cursor-pointer z-10 flex flex-col  max-w-md p-2 my-0 mx-3 rounded-md inline-block min-h-[50px]  min-w-[100px] border border-dotted border-black"
                  // style={{ backgroundColor: '#fef7f7' }}
                  onClick={() => {
                    setisUnitAddOpen(true)
                    setAddUnitSlider({
                      open: true,
                      title: 'Add Stall',
                      sliderData: {
                        phase: {},
                        block: {},
                      },
                      widthClass: 'max-w-2xl',
                    })
                  }}
                >
                  <div className="flex flex-col items-center justify-between">
                    <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    <h3 className="m-0 mt-1 text-sm font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                      Add Stall
                    </h3>
                    {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                  </div>
                  <div className="flex flex-row justify-between px-2">
                    <span className="flex flex-row items-center justify-between mr-2">
                      <span className="text-sm font-"></span>
                    </span>
                  </div>
                </div>
                {/* 2 */}
                {/* projectDetails?.projectType?.name */}
                <div
                  className="cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0  mx-4 rounded-md inline-block  min-h-[50px]  min-w-[100px] border border-dotted border-black rounded-md"
                  onClick={() => {
                    setisUnitAddOpen(true)

                    setAddUnitSlider({
                      open: true,
                      title: 'Import Stalls',
                      sliderData: {
                        phase: {},
                        block: {},
                      },
                      widthClass: 'max-w-6xl',
                    })
                  }}
                >
                  <div className="flex flex-col items-center justify-between">
                    <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    <h3 className="m-0  text-sm  mt-1 font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                      Import Stalls
                    </h3>
                    {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                  </div>
                  <div className="flex flex-row justify-between px-2">
                    <span className="flex flex-row items-center justify-between mr-2">
                      <span className="text-sm font-"></span>
                    </span>
                  </div>
                </div>
                 {/* 3 */}
                {/* projectDetails?.projectType?.name */}
              {filteredUnits.length>0 &&

              (<div
                  className="cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0  mx-4 rounded-md inline-block  min-h-[50px]  min-w-[100px] border border-dotted border-black rounded-md"
                  onClick={() => {
                    setisUnitAddOpen(true)
console.log('selected type is', ['Apartments', 'Apartment'].includes(
  projectDetails?.projectType?.name
)
  ? 'Import Stalls'
  : ['Plots'].includes(projectDetails?.projectType?.name)
  ? 'Import Plot Stalls'
  : 'Import Apartment Stalls',       projectDetails?.projectType?.name )
                    setAddUnitSlider({
                      open: true,
                      title: ['Villas'].includes(
                        projectDetails?.projectType?.name
                      )
                        ? 'Import Booked Villas'
                        : ['Plots'].includes(projectDetails?.projectType?.name)
                        ? 'Import Booked Plots'
                        : 'Import Booked Apartments',
                      sliderData: {
                        phase: {},
                        block: {},
                      },
                      widthClass: 'max-w-6xl',
                    })
                  }}
                >
                  <div className="flex flex-col items-center justify-between">
                    <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    <h3 className="m-0  text-sm  mt-1 font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                      Import Booked Stalls
                    </h3>
                    {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                  </div>
                  <div className="flex flex-row justify-between px-2">
                    <span className="flex flex-row items-center justify-between mr-2">
                      <span className="text-sm font-"></span>
                    </span>
                  </div>
                </div>)}

                 {/* 5 */}

                {/* projectDetails?.projectType?.name */}
                {filteredUnits.length>0 &&
                <div
                  className="cursor-pointer  z-10 flex flex-col  max-w-md p-2 my-0  mx-4 rounded-md inline-block  min-h-[50px]  min-w-[100px] border border-dotted border-black rounded-md"
                  onClick={() => {
                    setisUnitAddOpen(true)

                    setAddUnitSlider({
                      open: true,
                      title: 'Upload Unit Transactions',
                      sliderData: {
                        phase: {},
                        block: {},
                      },
                      widthClass: 'max-w-6xl',
                    })
                  }}
                >
                  <div className="flex flex-col items-center justify-between">
                    <PlusIcon className="h-3 w-3 mr-1" aria-hidden="true" />
                    <h3 className="m-0  text-sm  mt-1 font-semibold  leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-1xl md:text-1xl ">
                      Upload Stall Transactions
                    </h3>
                    {/* <IconButton onClick={handleClick}>
          <MoreVert sx={{ fontSize: '1rem' }} />
        </IconButton> */}
                  </div>
                  <div className="flex flex-row justify-between px-2">
                    <span className="flex flex-row items-center justify-between mr-2">
                      <span className="text-sm font-"></span>
                    </span>
                  </div>
                </div>}
              </div>
            )}
          </section>
        </>
      )}

      {/* <div className="bg-white rounded mt-4 shadow-lg">
        {[1, 2].map((data, i) => {
          return (
            <div key={i} className="grid grid-cols-12 gap-0">
              <div className="h-42 col-span-2 border border-gray-300 content-center">
                <FloorStatsCard
                  kind={`Floor - ${data}`}
                  feedData={unitFeedData}
                  bg="#fef7f7"
                />
              </div>
              <div className="h-42 col-span-10 bg-white border border-gray-300 border-l-0">
                <div
                  id="scrolling-content"
                  className="flex overflow-x-scroll h-full"
                >
                  {[1, 2, 3, 4, 5, 6].map((data) => (
                    <div className="p-2 mb-2.5 flex-shrink-0 " key={data}>
                      <UnitsStatsCard
                        kind={data}
                        feedData={unitFeedData}
                        bg="#fef7f7"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div> */}
      <SiderForm
        open={isUnitDetailsOpen}
        setOpen={setisUnitDetailsOpen}
        title={'unitDetails_crm_view'}
        customerDetails={selUnitDetails}
        widthClass="max-w-7xl"
        transactionData={selUnitDetails}
        unitsViewMode={false}
        selCustomerPayload={selUnitDetails}
        setSelUnitDetails={setSelUnitDetails}
        selSubMenu={selSubMenu}
        selSubMenu2={selSubMenu1}
      />
      <SiderForm
        open={isCancelUnit}
        setOpen={setIsCancelUnit}
        title={sliderInfo.title}
        customerDetails={selUnitDetails}
        widthClass={sliderInfo.widthClass}
        transactionData={selUnitDetails}
        unitsViewMode={false}
        selCustomerPayload={selUnitDetails}
        setSelUnitDetails={setSelUnitDetails}
        selSubMenu={selSubMenu}
        selSubMenu2={selSubMenu1}
      />
      <SiderForm
        open={isSwapUnit}
        setOpen={setIsSwapUnit}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
        widthClass={sliderInfo.widthClass}
        myBlock={selBlock}
        pId={pId}
        phaseFeed={phaseFeed}
        BlockFeed={BlockFeed}
        projectDetails={projectDetails}
        phaseDetails={phaseDetails}
        blockDetails={selBlock}
        unitViewActionType={actionType}
      />
      <SiderForm
        open={isUnitQuoteBookBlock}
        setOpen={setisUnitQuoteBookBlock}
        title={sliderInfo.title}
        data={sliderInfo.sliderData}
        widthClass={sliderInfo.widthClass}
        myBlock={selBlock}
        pId={pId}
        phaseFeed={phaseFeed}
        BlockFeed={BlockFeed}
        projectDetails={projectDetails}
        phaseDetails={phaseDetails}
        blockDetails={selBlock}
        unitViewActionType={actionType}
      />
      <SiderForm
        open={isUnitAddOpen}
        setOpen={setisUnitAddOpen}
        title={addUnitSlider.title}
        data={addUnitSlider.sliderData}
        widthClass={addUnitSlider.widthClass}
        myBlock={selBlock}
        pId={pId}
        phaseFeed={phaseFeed}
        BlockFeed={BlockFeed}
        projectDetails={projectDetails}
        phaseDetails={phaseDetails}
        blockDetails={selBlock}
        unitViewActionType={actionType}
      />
    </div>
  )
}

export default Floordetails
