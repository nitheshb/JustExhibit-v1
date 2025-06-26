/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { Link } from '@redwoodjs/router'
import {
  getAllProjects,
  getBlocksByPhase,
  getPhasesByProject,
  getUnits,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import 'flowbite'
import DropDownSearchBar from '../dropDownSearchBar'
import 'src/styles/myStyles.css'
import FloordetailsSearch from '../Floordetails/FloordetailsInSearch'
const UnitsInventoryHome = ({ project }) => {
  const { user } = useAuth()

  const { orgId } = user
  const [customerRawData, setCustomerRawData] = useState([])
  const [phases, setPhases] = useState([])

  const [isOpenSideView, setIsOpenSideView] = useState(false)
  const [selPhaseName, setSelPhaseName] = useState('')
  const [myProjectDetails, setMyProjectDetails] = useState({ uid: '' })

  const [showCostSheetWindow, setShowCostSheetWindow] = useState(false)
  const [selMode, setSelMode] = useState('Detail View')
  const [selUnitDetails, setSelUnitDetails] = useState({})

  const [projectDetails, setProjectDetails] = useState()
  // phases

  const [phasesList, setPhasesList] = useState([])
  const [phaseViewFeature, setPhaseViewFeature] = useState('Blocks')

  // blocks
  const [blocks, setBlocks] = useState({})
  const [selPhaseIs, setSelPhaseIs] = useState('')
  const [selPhaseObj, setSelPhaseObj] = useState({})

  const [unitsFeedA, setUnitsFeedA] = useState([])
  const [filUnitsFeedA, setFilUnitsFeedA] = useState([])

  const [phaseDetails, setPhaseDetails] = useState({
    eventName: '',
    uid: '',
    value: '',
  })

  const [availType, setAvailType] = useState({
    eventName: '',
    uid: '',
    value: 'any',
  })

  const [selUnitType, setUnitType] = useState({
    eventName: '',
    uid: '',
    value: 'any',
  })
  const [selFacing, setFacing] = useState({
    eventName: '',
    uid: '',
    value: 'any',
  })
  const [selsize, setSize] = useState({
    eventName: '',
    uid: '',
    value: 'any',
  })
  const setPhaseFun = (leadDocId, value) => {
    setSelPhaseName(value.name)
    setSelPhaseIs(value.value)
  }
  useEffect(() => {
    getUnitsFun()
    getPhases(projectDetails)
  }, [projectDetails])
  useEffect(() => {
    if (phases.length > 0) {
      getBlocks(phases[0]['uid'] || '')
    }
  }, [phases, projectDetails])
  useEffect(() => {
    // setFilUnitsFeedA

    filFun()
  }, [unitsFeedA, availType, selUnitType, selFacing])

  const filFun = () => {
    console.log('selected one is', unitsFeedA, availType, selFacing)
    const filData = unitsFeedA?.filter((da) => {
      const statusMatch =
        availType.value === 'any' ? true : da?.status == availType.value
      const typeMatch =
        selUnitType.value === 'any'
          ? true
          : da?.size?.toLocaleLowerCase() ==
            selUnitType.value?.toLocaleLowerCase()
      const facingMatch =
        selFacing.value === 'any'
          ? true
          : da?.facing?.toLocaleLowerCase() == selFacing.value
      return statusMatch && facingMatch && typeMatch
    })
    setFilUnitsFeedA(filData)
  }

  const getUnitsFun = async () => {
    const todoData = await getUnits(
      orgId,
      (querySnapshot) => {
        let pro
        const y = []
        setUnitsFeedA([])
        const projects = querySnapshot.docs.map(async (docSnapshot) => {
          const x = docSnapshot.data()
          x.uid = docSnapshot.id
          x.id = docSnapshot.id
          const { staDA } = x
          y.push(x)
        })
        y.sort((a, b) => a.unit_no - b.unit_no)
        setUnitsFeedA(y)
      },
      { pId: projectDetails?.uid, blockId: 0, type: 'today' },
      (error) => {
        console.log('error', error)
      }
    )

    await console.log('what are we', todoData)
  }
  const getPhases = async (projectDetails) => {
    setMyProjectDetails(projectDetails)

    try {
      const unsubscribe = getPhasesByProject(
        orgId,
        projectDetails?.uid,
        (querySnapshot) => {
          const phases = querySnapshot.docs.map((docSnapshot) =>
            docSnapshot.data()
          )
          setPhases(phases)

          phases.map((user) => {
            user.name = user.phaseName
            user.label = user.phaseName
            user.value = user.uid
          })
          // setPhasesList(phases)
          if (phases.length > 0) {
            setSelPhaseName(phases?.[0].phaseName)
            setSelPhaseIs(phases?.[0].uid)
            setSelPhaseObj(phases?.[0])
          }
          console.log('myphases are', phases)
        },
        (e) => {
          console.log('error at getPhases', e)
          setPhases([])
        }
      )
      return unsubscribe
    } catch (error) {
      console.log('error at getting phases', error)
    }
  }

  const getBlocks = async (phaseId) => {
    const unsubscribe = getBlocksByPhase(
      { projectId: myProjectDetails?.uid, phaseId },
      (querySnapshot) => {
        const response = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setBlocks({ ...blocks, [phaseId]: response })
        console.log('myblocks are', blocks, myProjectDetails?.uid, phaseId)
      },
      (e) => {
        console.log('error at getBlocks', e)
        setBlocks({ ...blocks, [phaseId]: [] })
      }
    )
    return unsubscribe
  }
  const phasesA = [
    {
      label: 'Phase-I',
      eventName: 'Phase-I',
      value: 'demands',
    },
  ]

  const paymentsA = [
    {
      label: 'Demands',
      eventName: 'Demands',
      value: 'demands',
    },
    {
      label: 'Review',
      eventName: 'review',
      value: 'review',
    },
    {
      label: 'Received',
      eventName: 'received',
      value: 'received',
    },
    {
      label: 'Rejected',
      eventName: 'rejected',
      value: 'rejected',
    },
  ]
  const registerA = [
    {
      label: 'Booking',
      eventName: 'Blocked',
      value: 'booking',
    },
    {
      label: 'Booking',
      eventName: 'Booking',
      value: 'booking',
    },
    {
      label: 'Agreement',
      eventName: 'Agreement',
      value: 'agreement',
    },
    {
      label: 'Registered',
      eventName: 'registered',
      value: 'registered',
    },
    {
      label: 'Rejected',
      eventName: 'Released',
      value: 'rejected',
    },
  ]
  const availStatusA = [
    {
      label: 'All',
      eventName: 'All',
      value: 'any',
    },
    {
      label: 'Available',
      eventName: 'Available',
      value: 'available',
    },
    {
      label: 'Booked',
      eventName: 'Booked',
      value: 'booked',
    },
    {
      label: 'Blocked',
      eventName: 'Blocked',
      value: 'blocked',
    },
  ]
  const FacingA = [
    {
      label: 'East',
      eventName: 'All',
      value: 'any',
    },
    {
      label: 'East',
      eventName: 'East',
      value: 'east',
    },
    {
      label: 'West',
      eventName: 'West',
      value: 'west',
    },
    {
      label: 'South',
      eventName: 'South',
      value: 'south',
    },
    {
      label: 'North',
      eventName: 'North',
      value: 'north',
    },
    {
      label: 'North',
      eventName: 'South-East',
      value: 'south-east',
    },
    {
      label: 'North',
      eventName: 'South-West',
      value: 'south-west',
    },
    {
      label: 'north-east',
      eventName: 'North-East',
      value: 'north-east',
    },

    {
      label: 'North',
      eventName: 'North-West',
      value: 'north-west',
    },
  ]
  const typeA = [
    {
      label: 'East',
      eventName: 'All',
      value: 'any',
    },
    {
      label: 'East',
      eventName: '9.14X15.24',
      value: '9.14X15.24',
    },
    {
      label: 'West',
      eventName: '12.19X18.29',
      value: '12.19X18.29',
    },
    {
      label: 'South',
      eventName: '12.19X16.25',
      value: '12.19X16.25',
    },
    {
      label: '30X40',
      eventName: '30X40',
      value: '30X40',
    },
    {
      label: '30X50',
      eventName: '30X50',
      value: '30X50',
    },
    {
      label: 'North',
      eventName: '35X45',
      value: 's35X45',
    },
    {
      label: '30X50',
      eventName: '30X50',
      value: '30X50',
    },

    {
      label: '35X45',
      eventName: '35X45',
      value: '35X45',
    },
    {
      label: '40X40',
      eventName: '40X40',
      value: '40X40',
    },
    {
      label: '40X60',
      eventName: '40X60',
      value: '40X60',
    },
    {
      label: 'ODD',
      eventName: 'ODD',
      value: 'ODD',
    },
  ]
  const sizeA = [
    {
      label: 'East',
      eventName: 'All',
      value: 'any',
    },
    {
      label: 'East',
      eventName: '35,397 sqft',
      value: '35397',
    },
    {
      label: 'West',
      eventName: '59,895 sqft',
      value: '59,895 sqft',
    },
  ]
  useEffect(() => {
    getProjects()
  }, [])
  const getProjects = async () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        projects.map((user) => {
          user.label = user?.eventName || 'Eventer'
          user.value = user?.uid
        })
        setCustomerRawData([...projects])
        console.log('project are ', projects)
      },
      () => setCustomerRawData([])
    )
    return unsubscribe
  }
  const selProjctFun = (project) => {
    setIsOpenSideView(!isOpenSideView)
    setProjectDetails(project)
  }
  const selPhaseFun = (project) => {
    setPhaseDetails(project)
  }
  const selAvailFun = (project) => {
    setAvailType(project)
  }
  const selTypeFun = (project) => {
    setUnitType(project)
  }
  const selFacingFun = (project) => {
    setFacing(project)
  }
  const selSizeFun = (project) => {
    setSize(project)
  }
  const selStatusFun = (project) => {
    setAvailType(project)
  }

  return (
    <section className=" mt-2  py-6 mb-8 leading-7">
      <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-8 max-w-full  ">
        <div className="flex flex-col  leading-7  text-gray-900 border-0 border-gray-200 flex flex-col justify-center items-center ">
          <div className="flex items-center flex-shrink-0  px-0  pl-0   mb-1">
            <Link
              className="flex items-center"
              // to={routes.projectEdit({ uid })}
            >
              <span className="relative z-10 flex font-manrope font-bold text-[24px] leading-[100%] tracking-[0] text-[#1A1A1A] text-center">
                Inventory
              </span>
            </Link>
          </div>
        </div>


        <div className="mt-1 ">
          {/* <form className=""> */}
          <div className="flex justify-center items-center  flex flex-col">
            <div className="relative  p-2.5 pb-6">
              <section className=" top-0 left-0  flex flex-row  border bg-white border-[#dddddd] py-2 px-1 rounded-[14px]  custom-shadow">



                <div className='flex   justify-center items-center'>
                    <DropDownSearchBar
                  label={'Events'}
                  type={'All Events'}
                  id={'id'}
                  setStatusFun={{}}
                  viewUnitStatusA={[]}
                  pickCustomViewer={selProjctFun}
                  selProjectIs={projectDetails}
                  dropDownItemsA={customerRawData}
                />

                  <div className="w-[1px] h-[58px] bg-[#E4E6E8] mx-2" />

                {/* <DropDownSearchBar
                      type={'All Phases'}
                      id={'id'}
                      setStatusFun={{}}
                      viewUnitStatusA={[]}
                      pickCustomViewer={selPhaseFun}
                      selProjectIs={phaseDetails}
                      dropDownItemsA={phasesA}
                    /> */}
                <DropDownSearchBar
                  label={'Availablity'}
                  type={'All Status'}
                  id={'id'}
                  setStatusFun={{}}
                  viewUnitStatusA={[]}
                  pickCustomViewer={selStatusFun}
                  selProjectIs={availType}
                  dropDownItemsA={availStatusA}
                />

                  <div className="w-[1px] h-[58px] bg-[#E4E6E8] mx-2" />


                <DropDownSearchBar
                  label={'Dimension'}
                  type={'All'}
                  id={'id'}
                  setStatusFun={{}}
                  viewUnitStatusA={[]}
                  pickCustomViewer={selTypeFun}
                  selProjectIs={selUnitType}
                  dropDownItemsA={typeA}
                />

                  <div className="w-[1px] h-[58px] bg-[#E4E6E8] mx-2" />

              
                <DropDownSearchBar
                  label={'Size'}
                  type={'All Status'}
                  id={'id'}
                  setStatusFun={{}}
                  viewUnitStatusA={[]}
                  pickCustomViewer={selSizeFun}
                  selProjectIs={selsize}
                  dropDownItemsA={sizeA}
                />
                {/* <DropDownSearchBar
                      type={'All Payments'}
                      id={'id'}
                      setStatusFun={{}}
                      viewUnitStatusA={[]}
                      pickCustomViewer={selProjctFun}
                      selProjectIs={projectDetails}
                      dropDownItemsA={paymentsA}
                    /> */}
                {/* <input
                    type="search"
                    id="search-dropdown"
                    className="block p-2.5 w-full z-2 text-sm text-gray-900 bg-gray-100 "
                    placeholder={` Search Stall No, Customer name, Phone no, Dues, Review.....`}
                    required
                  /> */}



                             <button
                  onClick={() => {
                    console.log('clicked')
                  }}
                  className=" mr-4 h-[45px] w-[45px]  mt-[8px] p-[12px] ml-2 rounded-[8px] text-sm font-medium text-white bg-[#F44D21] "
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span className="sr-only">Search</span>
              </button>


                </div>



  

              </section>
            </div>
          </div>
          {/* </form> */}
        </div>

        {projectDetails == undefined && (
          <div className="py-8 px-8 mt-10 flex flex-col items-center bg-red-100 rounded">
            <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
              <img
                className="w-[180px] h-[180px] inline"
                alt=""
                src="/templates.svg"
              />
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900">
              No Stalls Found
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              <span className="text-blue-600"></span>
            </time>
          </div>
        )}

        {projectDetails != undefined && (
          <div className="mt-4">
            {/* <ProjPhaseHome
            projectDetails={projectDetails}
            leadDetailsObj={{}}
            source={undefined}
            unitDetails={undefined}
          /> */}
            <FloordetailsSearch
              pId={projectDetails?.uid}
              projectDetails={projectDetails}
              phaseFeed={phases}
              unitsFeedA={unitsFeedA}
              filUnitsFeedA={filUnitsFeedA}
              selBlock={{
                totalValue: 0,
                soldValue: 0,
                availValue: 0,
                bookValue: 0,
                blockValue: 0,
                holdValue: 0,
                totalArea: 0,
                soldArea: 0,
                availArea: 0,
                bookArea: 0,
                blockArea: 0,
                holdArea: 0,
                totalUnitCount: 0,
                soldUnitCount: 0,
                availableCount: 0,
                bookUnitCount: 0,
                blockUnitCount: 0,
              }}
              source={undefined}
              setShowCostSheetWindow={setShowCostSheetWindow}
              setSelUnitDetails={setSelUnitDetails}
              setSelMode={setSelMode}
              leadDetailsObj={{}}
              setPhaseFun={setPhaseFun}
              selPhaseName={selPhaseName}
            />
          </div>
        )}
      </div>
    </section>
  )
}

export default UnitsInventoryHome
