/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Timestamp } from 'firebase/firestore'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  addUnit,
  checkIfUnitAlreadyExists,
  getAllProjects,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import CostBreakUpSheet from './costBreakUpSheet'
import UnitDocumentsBody from './unitDetailsCategory/unitDocuments'
import UnitFinanceBody from './unitDetailsCategory/unitFinance'
import UnitOverView from './unitDetailsCategory/unitOverView'
const ViewUnitDetails = ({
  title,
  data,
  dialogOpen,
  BlockFeed,
  phaseFeed,
  projectDetails,
  phaseDetails,
  blockDetails,
  leadDetailsObj,
  unitViewActionType,
}) => {
  const { user } = useAuth()
  const { orgId } = user
  console.log('unit Details ', data, data?.facing)
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [projectList, setprojectList] = useState([])
  const [phaseList, setphaseList] = useState([])
  const [blockList, setblockList] = useState([])

  useEffect(() => {
    if (unitViewActionType === 'costSheetMode') {
      setActionMode({ label: 'Cost sheet', value: 'costSheetMode' })
    } else if (unitViewActionType === 'unitBlockMode') {
      setActionMode({ label: 'Block Unit', value: 'unitBlockMode' })
    } else if (unitViewActionType === 'unitBookingMode') {
      setActionMode({ label: 'Book Unit', value: 'unitBookingMode' })
    }
  }, [unitViewActionType])

  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(usersListA)
        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })
        console.log('fetched users list is', usersListA)

        setusersList(usersListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.eventName
          user.value = user.eventName
        })
        console.log('fetched users list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    phaseFeed.map((user) => {
      user.label = user.phaseName
      user.value = user.phaseName
    })
    console.log('fetched users list is', phaseFeed)
    setphaseList(phaseFeed)
  }, [])

  useEffect(() => {
    if (BlockFeed) {
      BlockFeed?.map((user) => {
        user.label = user.blockName
        user.value = user.blockName
      })
      console.log('fetched users list is', phaseFeed)
      setblockList(BlockFeed)
    }
  }, [])

  const aquaticCreatures = [
    { label: 'Select the Event', value: '' },
    { label: 'Subha Ecostone', value: 'subhaecostone' },
    { label: 'Esperanza', value: 'esperanza' },
    { label: 'Nakshatra Township', value: 'nakshatratownship' },
  ]
  // const usersList = [
  //   { label: 'User1', value: 'User1' },
  //   { label: 'User2', value: 'User2' },
  //   { label: 'User3', value: 'User3' },
  // ]

  const devTypeA = [
    {
      name: 'Outright',
      img: '/apart.svg',
    },
    {
      name: 'Joint',
      img: '/apart1.svg',
    },
  ]
  const [loading, setLoading] = useState(false)
  const [formMessage, setFormMessage] = useState('')
  const [selected, setSelected] = useState({})
  const [devType, setdevType] = useState(devTypeA[0])
  const [unitDetailCat, setUnitDetailCat] = useState('overview')
  const [showUnitDetails, setShowUnitDetials] = useState(false)
  const [actionMode, setActionMode] = useState({
    label: 'Cost sheet',
    value: 'costSheetMode',
  })

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

  const typeSel = async (sel) => {
    await console.log('value is', selected)
    await setSelected(sel)
    await console.log('thsi si sel type', sel, selected)
  }
  const devTypeSel = async (sel) => {
    await setdevType(sel)
  }
  const onSubmitFun = async (data, resetForm) => {
    console.log(data)

    setLoading(true)

    const {
      area,
      bathrooms,
      bedRooms,
      buildup_area,
      carpet_area,
      facing,
      sqft_rate,
      floor,
      super_build_up_area,
      unit_no,
    } = data
    // updateUserRole(uid, deptVal, myRole, email, 'nitheshreddy.email@gmail.com')

    const foundLength = await checkIfUnitAlreadyExists(
      'spark_units',
      projectDetails?.uid,
      phaseDetails?.uid,
      blockDetails?.uid,
      unit_no

      // myBlock?.uid,
      // dRow['unit_no']
    )
    const leadData = {
      Date: Timestamp.now().toMillis(),
      bed_rooms: bedRooms,
      builtup_area: buildup_area,
      builtup_area_uom: 'sqft',
      carpet_area: carpet_area,
      carpet_area_uom: 'sqft',
      facing: facing,
      floor: floor,
      intype: 'Form',
      mode: '',
      pId: projectDetails?.uid,
      phaseId: phaseDetails?.uid,
      blockId: blockDetails?.uid,
      Status: 'available',
      rate_per_sqft: sqft_rate,
      super_built_up_area: super_build_up_area,
      super_built_up_area_uom: 'sqft',
      undivided_share: '',
      unit_no: unit_no,
      unit_type: '',
      by: user?.email,
    }
    console.log('user is ', user)
    if (foundLength?.length > 0) {
      console.log('foundLENGTH IS ', foundLength)
      setFormMessage('Unit Already Exists')
      setLoading(false)
    } else {
      console.log('foundLENGTH IS empty ', foundLength)

      // proceed to copy
      await addUnit(orgId, leadData, user?.email, `Unit Created by form `)

      // msg2
      resetForm()
      setFormMessage('Saved Successfully..!')
      setLoading(false)
    }
  }

  const unitTypeList = [
    { label: 'Select Count', value: '' },
    { label: '1 Bhk', value: 1 },
    { label: '2 Bhk', value: 2 },
    { label: '3 Bhk', value: 3 },
    { label: '4 Bhk', value: 4 },
    { label: '5 Bhk', value: 5 },
  ]
  const bathTypeList = [
    { label: 'Select Count', value: '' },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ]
  const facingTypeList = [
    { label: 'Select the Source', value: '' },
    { label: 'East', value: 'East' },
    { label: 'West', value: 'West' },
    { label: 'North', value: 'North' },
    { label: 'South', value: 'South' },
    { label: 'South-East', value: 'South-East' },
    { label: 'South-West', value: 'South-West' },
    { label: 'North-East', value: 'North-East' },
    { label: 'North-West', value: 'North-West' },
  ]
  const validate = Yup.object({
    unit_no: Yup.string()
      // .max(15, 'Must be 15 characters or less')
      .required('Unit_no is Required'),
    // lastName: Yup.string()
    //   .max(20, 'Must be 20 characters or less')
    //   .required('Required'),
    sqft_rate: Yup.number().required('sqft rate is required'),
    bedRooms:
      projectDetails?.projectType?.name === 'Apartment'
        ? Yup.string().required('bedRooms is required')
        : Yup.string().notRequired(),
    floor: Yup.number().required('floor is required'),
    bathrooms:
      projectDetails?.projectType?.name === 'Apartment'
        ? Yup.string().required('bathrooms is required')
        : Yup.string().notRequired(),
    // bathrooms: Yup.string().required('bathrooms is required'),
    area:
      projectDetails?.projectType?.name === 'Plots'
        ? Yup.number().required('area is required')
        : Yup.number().notRequired(),

    facing: Yup.string().required('facing is required'),
    carpet_area: Yup.number().required('Carpet Area is required'),
    buildup_area: Yup.number().required('Buildup Area is required'),
    super_build_up_area: Yup.number().required('Sqft Rate is required'),
  })
  const resetter = () => {
    setSelected({})
    setFormMessage('')
  }
  return (
    <div className="h-full flex flex-col bg-white shadow-xl  ">
      <div className="px-6 py-4 pt-2 z-10 flex items-center justify-between shadow-[0px_4px_30px_0px_rgba(0,0,0,0.05)] ">
        <Dialog.Title className=" font-semibold text-xl mr-auto  text-[#053219] w-full">
          <div className="flex flex-row  justify-between mb-1">
            <section className="flex flex-row  items-center gap-6">
              {/* <div className="bg-violet-100  items-center rounded-2xl shadow-xs flex flex-col px-2 py-1"> */}

              <div className="relative w-[60px] h-[60px]">
                <svg width="60" height="60" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.0061 0H92.3734C95.2974 0 97.9884 1.59524 99.3918 4.16045L113.289 29.5641C113.933 30.7413 114.271 32.0617 114.271 33.4036L114.271 99.7936C114.271 103.619 111.17 106.72 107.345 106.72V112.281C107.345 115.991 104.338 118.997 100.629 118.997C96.9194 118.997 93.9125 115.991 93.9125 112.281V106.72H24.6969V112.224C24.6969 115.965 21.6641 118.997 17.9231 118.997C14.1821 118.997 11.1493 115.965 11.1493 112.224V106.72C7.41371 106.72 4.38538 103.691 4.38538 99.9557V31.9416C4.38538 30.5546 4.74602 29.1913 5.43191 27.9857L19.0526 4.04408C20.4749 1.54406 23.1298 0 26.0061 0Z" fill="#FCC8BA" />
                  <path d="M101.705 27.7051C101.705 32.3855 97.9109 36.1795 93.2305 36.1797C88.5498 36.1797 84.7552 32.3856 84.7549 27.7051C84.7545 32.3856 80.9599 36.1796 76.2793 36.1797C71.7447 36.1797 68.0415 32.6188 67.8145 28.1406L67.8037 27.7051C67.8033 32.3856 64.0088 36.1797 59.3281 36.1797C54.6475 36.1797 50.8529 32.3856 50.8525 27.7051C50.8522 32.3856 47.0576 36.1797 42.377 36.1797C37.6964 36.1795 33.9017 32.3855 33.9014 27.7051C33.901 32.3855 30.1072 36.1795 25.4268 36.1797C20.7461 36.1797 16.9515 32.3856 16.9512 27.7051C16.9508 32.3856 13.1562 36.1796 8.47559 36.1797C3.79494 36.1797 0.000359783 32.3856 0 27.7051V18.1689H101.705V27.7051ZM118.656 27.7051C118.656 32.3856 114.861 36.1797 110.181 36.1797C105.5 36.1795 101.706 32.3855 101.706 27.7051V18.1689H118.656V27.7051ZM118.656 18.168H0L22.0684 0H96.707L118.656 18.168ZM30.209 2.13281C29.5894 2.13288 29.0046 2.41977 28.626 2.91016L20.9824 12.8145C19.9683 14.1292 20.9058 16.0361 22.5664 16.0361H33.2197C33.9636 16.036 34.6461 15.6228 34.9912 14.9639L40.1748 5.05957C40.8714 3.72812 39.906 2.13311 38.4033 2.13281H30.209ZM55.9199 2.13281C54.929 2.13296 54.0881 2.85874 53.9424 3.83887L52.4707 13.7422C52.2915 14.9503 53.2278 16.0361 54.4492 16.0361H65.5557C66.8397 16.0361 67.7914 14.8427 67.5059 13.5908L65.2441 3.6875C65.0364 2.77803 64.2278 2.13294 63.2949 2.13281H55.9199ZM80.2539 2.13281C78.7511 2.1328 77.785 3.72803 78.4814 5.05957L83.665 14.9639C84.0102 15.623 84.6934 16.0361 85.4375 16.0361H96.0908C97.7514 16.036 98.6881 14.1292 97.6738 12.8145L90.0312 2.91016C89.6526 2.41959 89.067 2.13283 88.4473 2.13281H80.2539Z" fill="#F44D21" />
                </svg>

                <div className="absolute inset-0 flex items-center mt-2 justify-center">
                  <div className="font-bold text-[#1e1e1e] text-[24px] tracking-wide">
                    {data?.unitDetail?.unit_no}
                  </div>
                </div>
              </div>



              <div className="flex flex-col gap-2">
                <span className="font-manrope font-semibold text-[18px] leading-[100%] tracking-[0] text-[#414141]">
                  {projectDetails?.eventName}
                </span>
                <span className="border border-[#E5E5E5] font-medium px-3 py-2 rounded-full flex items-center text-[10px] leading-[100%] tracking-[0] text-[#43B75D] font-manrope max-w-[90px] truncate">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                  {data?.unitDetail?.status?.toUpperCase()}
                </span>

              </div>




            </section>

            {/* 2 */}
            <div className=" flex flex-row mt-2">
              <span
                className={`items-center cursor-pointer h-6 px-3 py-1  mt-1  mr-2  font-manrope font-medium text-[16px] leading-[100%] tracking-[0] text-[#F44D21]`}
                onClick={() => {
                  setShowUnitDetials(!showUnitDetails)
                }}
              >
                {showUnitDetails ? 'Hide unit details' : 'View unit details'}
              </span>

              {data?.unitDetail?.status === 'available' && (<div className=" flex flex-col mt-1">


                {/* <ButtonDropDown
                  type={'All Events'}
                  pickCustomViewer={setActionMode}
                  selProjectIs={actionMode}
                  dropDownItemsA={[
                    ...[
                      { label: 'Cost sheet', value: 'costSheetMode' },
                      { label: 'Block Unit', value: 'unitBlockMode' },
                      { label: 'Book Unit', value: 'unitBookingMode' },
                    ],
                  ]}
                /> */}
              </div>)}
            </div>
          </div>
        </Dialog.Title>
      </div>

      <div className="grid  gap-8 grid-cols-1  overflow-y-auto ">
        <div className="flex flex-col  mb-2  bg-white border border-gray-100">
          <div className="mt-0">
            {/* new one */}

            <Formik
              initialValues={{
                unit_no: '',
                sqft_rate: 0,
                bedRooms: '',
                floor: 0,
                bathrooms: '',
                area: 0,
                facing: '',
                carpet_area: 0,
                buildup_area: 0,
                super_build_up_area: 0,
              }}
              validationSchema={validate}
              onSubmit={(values, { resetForm }) => {
                console.log('ami submitted', values)

                onSubmitFun(values, resetForm)
              }}
            >
              {(formik) => (
                <div className="">
                  {showUnitDetails && (
                    <div className="py-3 grid grid-cols-3 mb-2">
                      <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md">
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-700 tracking-wide">
                            Stall No
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {data?.unitDetail?.unit_no}
                          </div>
                        </section>
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-500  tracking-wide">
                            Size
                            <span className="text-[10px] text-black-500 ml-1">
                              (sqft)
                            </span>
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {/* {data?.unitDetail?.builtup_area?.toLocaleString(
                              'en-IN'
                            )|| data?.unitDetail?.area?.toLocaleString(
                              'en-IN'
                            ) } */}
                            {data?.unitDetail?.area?.toLocaleString('en-IN')}
                          </div>
                        </section>
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-500  tracking-wide">
                            Facing
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {data?.unitDetail?.facing}
                          </div>
                        </section>
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-500  tracking-wide">
                            BUA
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {/* {data?.unitDetail?.builtup_area?.toLocaleString(
                              'en-IN'
                            )|| data?.unitDetail?.area?.toLocaleString(
                              'en-IN'
                            ) } */}
                            {data?.unitDetail?.builtup_area?.toLocaleString('en-IN') || data?.unitDetail?.construct_area?.toLocaleString('en-IN')}

                          </div>
                        </section>
                      </section>
                      <section className="flex flex-col mx-4 bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-700 tracking-wide">
                            East
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {data?.unitDetail?.east_d?.toLocaleString('en-IN')}
                          </div>
                        </section>
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-500  tracking-wide">
                            West
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {data?.unitDetail?.west_d?.toLocaleString('en-IN')}
                          </div>
                        </section>
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-500  tracking-wide">
                            South
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {data?.unitDetail?.south_d?.toLocaleString('en-IN')}
                          </div>
                        </section>
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-500  tracking-wide">
                            North
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {data?.unitDetail?.north_d?.toLocaleString('en-IN')}
                          </div>
                        </section>
                      </section>
























                      <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-700 tracking-wide">
                            Release Status
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {(

                              data?.unitDetail?.release_status
                            )}
                          </div>
                        </section>
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-500  tracking-wide">
                            Survey No
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {data?.unitDetail?.survey_no
                            }
                          </div>
                        </section>
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-500  tracking-wide">
                            Type
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {data?.unitDetail?.size}
                          </div>
                        </section>
                        <section className="flex flow-row justify-between mb-1">
                          <div className="font-md text-xs text-gray-500  tracking-wide">
                            KathaId
                          </div>
                          <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                            {data?.unitDetail?.kathaId}
                          </div>
                        </section>
                      </section>
                    </div>
                  )}
                  {data?.unitDetail?.status === 'available' && (
                    <CostBreakUpSheet
                      selMode={'Detail View'}
                      title="Cost Break Up Sheet"
                      leadDetailsObj1={leadDetailsObj}
                      selPhaseObj={data?.phaseDetail[0]}
                      unitDetails={data?.unitDetail}
                      projectDetails={projectDetails}
                      setShowCostSheetWindow={() => { }}
                      selUnitDetails={data?.unitDetail}
                      actionMode={actionMode?.value}
                    />
                  )}

                  {data?.unitDetail?.status != 'available' && (
                    <>
                      <div className=" border-gray-800 ">
                        <ul
                          className="flex justify-  rounded-t-lg border-b"
                          id="myTab"
                          data-tabs-toggle="#myTabContent"
                          role="tablist"
                        >
                          {[
                            { lab: 'Overview', val: 'overview' },
                            { lab: 'Finance', val: 'finance' },
                            {
                              lab: 'Documents',
                              val: 'documents',
                            },
                            { lab: 'Owner Details', val: 'ownerdetails' },
                            { lab: 'Issues', val: 'issues' },
                            { lab: 'Logs', val: 'logs' },
                          ].map((d, i) => {
                            return (
                              <li key={i} className="mr-2" role="presentation">
                                <button
                                  className={`inline-block py-3 px-2 text-sm font-medium text-center rounded-t-lg border-b-2  hover:text-blue hover:border-gray-300   ${unitDetailCat === d.val
                                      ? 'border-black border-b-3'
                                      : 'border-transparent'
                                    }`}
                                  type="button"
                                  role="tab"
                                  onClick={() => setUnitDetailCat(d.val)}
                                >
                                  {`${d.lab} `}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>

                      {unitDetailCat === 'overview' && (
                        <>
                          <UnitOverView data={data} />
                        </>
                      )}
                      {unitDetailCat === 'finance' && (
                        <>
                          <UnitFinanceBody />
                        </>
                      )}
                      {unitDetailCat === 'documents' && (
                        <>
                          <UnitDocumentsBody />
                        </>
                      )}
                      {unitDetailCat === 'issues' && <>{unitDetailCat}</>}
                      {unitDetailCat === 'logs' && <>{unitDetailCat}</>}
                    </>
                  )}
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewUnitDetails
