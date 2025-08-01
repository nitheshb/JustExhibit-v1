/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// import { Link, routes } from '@redwoodjs/router'
import { useState, useEffect } from 'react'
import React, { useRef } from 'react'

import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import { useSnackbar } from 'notistack'
import { RootStateOrAny, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import { MetaTags } from '@redwoodjs/web'

import LLeadsTableView from 'src/components/LLeadsTableView/LLeadsTableView'
import { USER_ROLES } from 'src/constants/userRoles'
import {
  addLeadSupabase,
  getCpLeadsByAdminStatus,
  getLeadsByAdminStatus,
  getLeadsByStatus,
  getLeadsByStatusUser,
  getLeadsByUnassigned,
  getMyProjects,
  steamUsersListByRole,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import CustomDatePicker from 'src/util/formFields/CustomDatePicker'
import { VerySlimSelectBox } from 'src/util/formFields/slimSelectBoxField'

import SiderForm from './SiderForm/SiderForm'

// function createGuidId() {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     const r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
//   })
// }
const ExecutiveHomeViewerPage = ({ leadsTyper, isClicked, setIsClicked }) => {
  const uid = uuidv4()

  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const { enqueueSnackbar } = useSnackbar()
  const { orgId, access, projAccessA } = user
  const isImportLeads =
    user?.role?.includes(USER_ROLES.ADMIN) ||
    user?.role?.includes(USER_ROLES.SALES_MANAGER)
  const [isImportLeadsOpen, setisImportLeadsOpen] = useState(false)
  // kanban board
  const [ready, setReady] = useState(false)
  const [boardData, setBoardData] = useState([])
  // const [showForm, setShowForm] = useState(false)
  // const [selectedBoard, setSelectedBoard] = useState(0)
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [isOpened, setIsOpened] = React.useState(false)
  const [dateRange, setDateRange] = React.useState([null, null])
  const [startDate, endDate] = dateRange
  const [usersList, setusersList] = useState([])
  const [openUserProfile, setopenUserProfile] = useState(false)
  const [addLeadsTypes, setAddLeadsTypes] = useState('')
  const [selUserProfile, setSelUserProfile] = useState({})
  const [leadsFetchedRawData, setLeadsFetchedRawData] = useState([])
  const [leadsFetchedData, setLeadsFetchedData] = useState([])
  const [serialLeadsData, setSerialLeadsData] = useState([])
  const [projectList, setprojectList] = useState([])
  const [unitsViewMode, setUnitsViewMode] = useState(false)
  const [fetchLeadsLoader, setFetchLeadsLoader] = useState(true)
  const [uuidKey, setUuidKey] = useState(uuidv4())
  const [searchValue, setSearchValue] = useState('')
  const [selProjectIs, setSelProject] = useState({
    label: 'All Events',
    value: 'allprojects',
  })
  const [selLeadsOf, setSelLeadsOf] = useState({
    label: 'My Leads',
    value: 'myleads',
  })

  const statusFields = [
    'new',
    'followup',
    'visitfixed',
    'visitdone',
    'negotiation',
    'reassign',
    'RNR',
    'booked',
  ]
  const searchVal = useSelector((state: RootStateOrAny) => state.search)
  useEffect(() => {
    setSearchValue(searchVal)
  }, [searchVal])
  const searchData = useSelector((state: RootStateOrAny) => state.searchData)
  useEffect(() => {
    Object.keys(searchData).length &&
      isClicked &&
      selUserProfileF('User Profile', searchData)
  }, [searchData, isClicked])
  const archieveFields = ['Dead', 'RNR', 'blocked', 'notinterested', 'junk']
  // useEffect(() => {
  //   getLeadsDataFun()
  // }, [])

  useEffect(() => {
    setFetchLeadsLoader(true)
    if (selLeadsOf?.value == 'myleads') {
      const { uid } = user
      getMyLeadsOrAnyUserLeads(uid)
    } else if (selLeadsOf?.value == 'cpleads') {
      getCpTeamLeads()
    } else if (selLeadsOf?.value == 'teamleads') {
      if (user?.role?.includes(USER_ROLES.ADMIN)) {
        getAdminAllLeads()
      } else {
        getMyTeamLeads()
      }
    } else {
      getMyLeadsOrAnyUserLeads(selLeadsOf?.value)
    }
  }, [selLeadsOf])

  useEffect(() => {
    getAdminAllLeads()
  }, [])

  useEffect(() => {
    const unsubscribe = steamUsersListByRole(
      orgId,
      (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )

        usersListA.map((user) => {
          user.label = user.displayName || user.name
          user.value = user.uid
        })

        setusersList(usersListA)
      },
      (error) => setusersList([])
    )

    return unsubscribe
  }, [])

  useEffect(() => {
    if (leadsTyper == 'archieveLeads') {
      const archieveFields1 = [
        'Dead',
        'RNR',
        'blocked',
        'notinterested',
        'junk',
      ]
      setGetStatus(archieveFields1)
      setIsLoading(false)
    } else if (leadsTyper == 'inProgress') {
      const archieveFields2 = [
        'new',
        'followup',
        'unassigned',
        'visitfixed',
        '',
        'visitdone',
        'negotiation',
        'reassign',
        'RNR',
      ]
      setGetStatus(archieveFields2)
    }
  }, [leadsTyper])

  useEffect(() => {
    const unsubscribe = getMyProjects(
      orgId,
      { projAccessA: projAccessA },
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )

        projectsListA.map((user) => {
          user.label = user.eventName
          user.value = user.eventName
        })
        if (user?.role?.includes(USER_ROLES.ADMIN)) {
          setprojectList(projectsListA)
        } else {
          setprojectList(
            projectsListA.filter((d) => projAccessA.includes(d.uid))
          )
        }
      },
      (error) => {
        console.log('error at bro', error)
        setprojectList([])
      }
    )

    return unsubscribe
  }, [])
  const [getStatus, setGetStatus] = useState([])
  useEffect(() => {
    filter_Leads_Projects_Users_Fun()
  }, [selProjectIs, startDate, endDate])

  useEffect(() => {
    filter_Leads_Projects_Users_Fun()
  }, [leadsFetchedRawData])

  const getAdminAllLeads = async () => {
    const { orgId } = user
    if (user?.role?.includes(USER_ROLES.ADMIN)) {
      const unsubscribe = getLeadsByAdminStatus(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // usersListA.map((data) => {
          //   const y = data
          //   delete y.Note
          //   delete y.AssignedTo
          //   delete y.AssignTo
          //   delete y.AssignedBy
          //   delete y['Country Code']
          //   delete y.assignT
          //   delete y.CT
          //   delete y.visitDoneNotes
          //   delete y.VisitDoneNotes
          //   delete y.VisitDoneReason
          //   delete y.EmpId
          //   delete y.CountryCode
          //   delete y.from
          //   delete y['Followup date']
          //   delete y.mode
          //   delete y.notInterestedNotes
          //   delete y.notInterestedReason
          //   y.coveredA = { a: data.coveredA }
          //   addLeadSupabase(data)
          // })
          console.log('my valus are ', usersListA)
          console.log('user list is ', usersListA)

          await setLeadsFetchedRawData(usersListA)
          await serealizeData(usersListA)
        },
        {
          status: [
            'new',
            'followup',
            'unassigned',
            'visitfixed',
            '',
            // 'visitdone',
            // 'visitcancel',
            'negotiation',
            'booked',
            // 'reassign',
            // 'RNR',
          ],
          projAccessA: projAccessA,
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    }
  }
  const getMyTeamLeads = async () => {
    const unsubscribe = await getLeadsByAdminStatus(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })
        // setBoardData
        // await setLeadsFetchedRawData(usersListA)
        // await serealizeData(usersListA)
        console.log('user list is ', usersListA)
        await getUnassignedLeads(usersListA)
        // filter_Leads_Projects_Users_Fun()
        // await setLeadsFetchedData(usersListA)
      },
      {
        status:
          'inProgress' === 'inProgress'
            ? [
                'new',
                'followup',
                'unassigned',
                'visitfixed',
                '',
                'visitdone',
                'visitcancel',
                'negotiation',
                'reassign',
                'RNR',
                // 'booked',
              ]
            : leadsTyper === 'booked'
            ? ['booked']
            : archieveFields,
        projAccessA: projAccessA,
        isCp: user?.role?.includes(USER_ROLES.CP_AGENT),
      },
      (error) => setLeadsFetchedData([])
    )
  }
  const getMyLeadsOrAnyUserLeads = async (userId) => {
    const { access, uid, orgId } = user
    const unsubscribe = getLeadsByStatusUser(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })
        // setBoardData
        console.log('my valus are ', usersListA)
        await setLeadsFetchedRawData(usersListA)
        await serealizeData(usersListA)
        // filter_Leads_Projects_Users_Fun()

        //  await setLeadsFetchedData(usersListA)
      },
      {
        isCp: user?.role?.includes(USER_ROLES.CP_AGENT),
        uid: userId,
        status:
          leadsTyper === 'inProgress'
            ? [
                'new',
                'followup',
                'unassigned',
                'visitfixed',
                'visitcancel',
                '',
                'visitdone',
                'negotiation',
                'reassign',
                'RNR',
                // 'booked',
              ]
            : leadsTyper === 'booked'
            ? ['booked']
            : archieveFields,
      },
      (error) => setLeadsFetchedData([])
    )
    return unsubscribe
  }

  const getCpTeamLeads = async () => {
    const { orgId } = user
    if (user?.role?.includes(USER_ROLES.ADMIN)) {
      const unsubscribe = getCpLeadsByAdminStatus(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          usersListA.map((data) => {
            const y = data
            delete y.Note
            delete y.AssignedTo
            delete y.AssignTo
            delete y.AssignedBy
            delete y['Country Code']
            delete y.assignT
            delete y.CT
            delete y.visitDoneNotes
            delete y.VisitDoneNotes
            delete y.VisitDoneReason
            delete y.EmpId
            delete y.CountryCode
            delete y.from
            delete y['Followup date']
            delete y.mode
            delete y.notInterestedNotes
            delete y.notInterestedReason
            y.coveredA = { a: data.coveredA }
            addLeadSupabase(data)
          })
          await setLeadsFetchedRawData(usersListA)
          await serealizeData(usersListA)
        },
        {
          status:
            leadsTyper === 'inProgress'
              ? [
                  'new',
                  'followup',
                  'unassigned',
                  'visitfixed',
                  '',
                  'visitdone',
                  'visitcancel',
                  'negotiation',
                  // 'reassign',
                  // 'RNR',
                ]
              : leadsTyper === 'booked'
              ? ['booked']
              : archieveFields,
          projAccessA: projAccessA,
        },
        (error) => setLeadsFetchedData([])
      )
      return unsubscribe
    } else if (access?.includes('manage_leads')) {
      const unsubscribe = await getLeadsByStatus(
        orgId,
        async (querySnapshot) => {
          const usersListA = querySnapshot.docs.map((docSnapshot) => {
            const x = docSnapshot.data()
            x.id = docSnapshot.id
            return x
          })
          // setBoardData
          // await setLeadsFetchedRawData(usersListA)
          // await serealizeData(usersListA)
          await getUnassignedLeads(usersListA)
          // filter_Leads_Projects_Users_Fun()
          // await setLeadsFetchedData(usersListA)
        },
        {
          status:
            leadsTyper === 'inProgress'
              ? [
                  'new',
                  'followup',
                  'unassigned',
                  'visitfixed',
                  '',
                  'visitdone',
                  'visitcancel',
                  'negotiation',
                  'reassign',
                  'RNR',
                  // 'booked',
                ]
              : leadsTyper === 'booked'
              ? ['booked']
              : archieveFields,
          projAccessA: projAccessA,
          isCp: true,
        },
        (error) => setLeadsFetchedData([])
      )
    }
  }

  const getUnassignedLeads = (otherData) => {
    const unsubscribe1 = getLeadsByUnassigned(
      orgId,
      async (querySnapshot) => {
        const usersListA = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })

        const xA = [...otherData, ...usersListA]
        await setLeadsFetchedRawData(xA)
        await serealizeData(xA)
      },
      (error) => setLeadsFetchedData([])
    )
    return unsubscribe1
  }
  const filter_Leads_Projects_Users_Fun = () => {
    setFetchLeadsLoader(true)
    const x = leadsFetchedRawData
    console.log('raw max is ==>  ', x.length, x)
    if (selProjectIs?.value != 'allprojects') {
      const z = x
        .filter((d1) => d1.Event === selProjectIs?.value)
        .filter((item) => {
          if (startDate !== null && endDate != null) {
            return (
              item?.Date >= startDate?.getTime() &&
              item?.Date <= endDate?.getTime() + 86399999
            )
          } else if (startDate !== null) {
            return (
              item?.Date >= startDate?.getTime() + 19070000 &&
              item?.Date <= startDate?.getTime() + 86399999
            )
          } else {
            return item
          }
        })
      let y = z
      if (selLeadsOf?.value == 'myleads') {
        y = z
          // .filter((d1) => d1?.assingedTo === user.uid)
          .filter((item) => {
            if (startDate !== null && endDate != null) {
              return (
                item?.Date >= startDate?.getTime() &&
                item?.Date <= endDate?.getTime() + 86399999
              )
            } else if (startDate !== null) {
              return (
                item?.Date >= startDate?.getTime() + 19070000 &&
                item?.Date <= startDate?.getTime() + 86399999
              )
            } else {
              return item
            }
          })
      } else if (selLeadsOf?.value == 'teamleads') {
        y = z.filter((item) => {
          if (startDate !== null && endDate != null) {
            return (
              item?.Date >= startDate?.getTime() &&
              item?.Date <= endDate?.getTime() + 86399999
            )
          } else if (startDate !== null) {
            return (
              item?.Date >= startDate?.getTime() + 19070000 &&
              item?.Date <= startDate?.getTime() + 86399999
            )
          } else {
            return item
          }
        })
      } else {
        console.log('seleUser details are', selLeadsOf?.value)
        y = z
          .filter((d1) => d1?.assignedTo === selLeadsOf?.value)
          .filter((item) => {
            if (startDate !== null && endDate != null) {
              return (
                item?.Date >= startDate?.getTime() &&
                item?.Date <= endDate?.getTime() + 86399999
              )
            } else if (startDate !== null) {
              return (
                item?.Date >= startDate?.getTime() + 19070000 &&
                item?.Date <= startDate?.getTime() + 86399999
              )
            } else {
              return item
            }
          })
      }
      setFetchLeadsLoader(false)
      console.log('my Array data is delayer follow', y.length, new Date())
      setLeadsFetchedData(y)
    } else {
      let y = x
      if (selLeadsOf?.value == 'myleads') {
        console.log('my Array data is delayer 2 yo', x)
        if (startDate !== null) {
          y = x
            // .filter((d1) => d1?.assingedTo === user.uid)
            .filter((item) => {
              if (startDate !== null && endDate != null) {
                return (
                  item?.Date >= startDate?.getTime() &&
                  item?.Date <= endDate?.getTime() + 86399999
                )
              } else if (startDate !== null) {
                return (
                  item?.Date >= startDate?.getTime() + 19070000 &&
                  item?.Date <= startDate?.getTime() + 86399999
                )
              } else {
                return item
              }
            })
        } else {
          y = x
        }
        console.log('my Array data is delayer 2 yo yo', y)
      } else if (
        selLeadsOf?.value == 'teamleads' ||
        selLeadsOf?.value == 'cpleads'
      ) {
        if (startDate !== null) {
          y = x.filter((item) => {
            if (startDate !== null && endDate != null) {
              return (
                item?.Date >= startDate?.getTime() &&
                item?.Date <= endDate?.getTime() + 86399999
              )
            } else if (startDate !== null) {
              return (
                item?.Date >= startDate?.getTime() + 19070000 &&
                item?.Date <= startDate?.getTime() + 86399999
              )
            }
          })
        } else {
          y = x
        }
      } else {
        console.log('seleUser details are', selLeadsOf?.value)
        y = x
          .filter((d1) => d1?.assignedTo === selLeadsOf?.value)
          .filter((item) => {
            if (startDate !== null && endDate != null) {
              return (
                item?.Date >= startDate?.getTime() &&
                item?.Date <= endDate?.getTime() + 86399999
              )
            } else if (startDate !== null) {
              return (
                item?.Date >= startDate?.getTime() + 19070000 &&
                item?.Date <= startDate?.getTime() + 86399999
              )
            } else {
              return item
            }
          })
      }
      console.log('my Array data is delayer follow 1 ', y.length, new Date())
      setLeadsFetchedData(y)
      setFetchLeadsLoader(false)
    }
  }

  const serealizeData = (array) => {
    // let newData =
    const x = statusFields.map((status) => {
      const items = array.filter((data) => data.Status.toLowerCase() == status)
      return { name: status, items }
    })
    setSerialLeadsData(x)
  }

  // const onTextAreaKeyPress = (e) => {
  //   if (e.keyCode === 13) {
  //     //Enter
  //     const val = e.target.value
  //     if (val.length === 0) {
  //       setShowForm(false)
  //     } else {
  //       const boardId = e.target.attributes['data-id'].value
  //       const item = {
  //         id: createGuidId(),
  //         title: val,
  //         priority: 0,
  //         chat: 0,
  //         attachment: 0,
  //         assignees: [],
  //       }
  //       const newBoardData = boardData
  //       newBoardData[boardId].items.push(item)
  //       setBoardData(newBoardData)
  //       setShowForm(false)
  //       e.target.value = ''
  //     }
  //   }
  // }

  const fSetLeadsType = (type) => {
    setAddLeadsTypes(type)
    setUnitsViewMode(false)
    setisImportLeadsOpen(true)
  }
  const selUserProfileF = (title, data) => {
    setAddLeadsTypes(title)
    setUnitsViewMode(false)
    setisImportLeadsOpen(true)
    setSelUserProfile(data)
  }
  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <div className="flex flex-row flex-wrap justify-between items-start my-5 mx-4">
              <div className="flex flex-col items-start">
                <h2 className="font-inter font-medium text-[18px] leading-[28px] text-[#101828] flex items-center gap-2">
                  Visitors Management
                  <span className="ml-2 bg-[#FEEDE9] rounded-full px-1.5 py-0.5 flex items-center">
                    <span className="px-2 py-0.5 rounded-full font-inter font-medium text-[12px] leading-[18px] text-[#F44D21]">
                      {leadsFetchedData.length} vendors
                    </span>
                  </span>
                </h2>
                <div className="font-inter font-normal text-[14px] leading-[20px] text-[#667085] mt-1">
                  Keep track of Visitors and their Entry.
                </div>
              </div>
              <div className="flex items-center">
                {/* <div className=" flex flex-col mr-5  w-40">
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
                </div> */}
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
                          { label: 'Team Leads', value: 'teamleads' },
                          { label: 'My Leads', value: 'myleads' },
                          { label: 'Cp Leads', value: 'cpleads' },
                        ],
                        ...usersList,
                      ]}
                    />
                  </div>
                )}
                <span className="max-h-[42px] mt-[2px] ml-3 bg-white pl-[2px] rounded-[4px] h-[19px] ">
                  {/* <span className="text-xs font-bodyLato text-[#516f90] cursor-none">
                  Set Due Date
                </span> */}
                  {/* {border-radius: 4px;
    border-color: hsl(0, 0%, 80%);
    min-height: 31px;} */}
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  {/* <label className="bg-green   pl-[2px] h-[28px]  flex flex-row cursor-pointer border border-[#ccc] rounded-[4px]">
                    <CalendarMonthTwoToneIcon className="mr-1 mt-[2px] h-4 w-4" />
                    <span className="inline">
                      <CustomDatePicker
                        className="z-[11] pl- py- rounded-[4px]  inline text-xs text-[#0091ae] bg-white cursor-pointer min-w-[170px] border-l-[#cccccc]"
                        // selected={cutOffDate}
                        // onChange={(date) => setCutOffDate(date)}
                        // calendarContainer={MyContainer(setIsOpened)}
                        onCalendarOpen={() => setIsOpened(true)}
                        onCalendarClose={() => setIsOpened(false)}
                        onChange={(update) => setDateRange(update)}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        isClearable={true}
                        // injectTimes={[
                        //   setHours(setMinutes(d, 1), 0),
                        //   setHours(setMinutes(d, 5), 12),
                        //   setHours(setMinutes(d, 59), 23),
                        // ]}
                        // dateFormat="MMM d, yyyy "
                        //dateFormat="d-MMMM-yyyy"
                        dateFormat="MMM dd, yyyy"
                      />
                    </span>
                  </label> */}
                </span>
                {/* {leadsTyper == 'inProgress' && (
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
                )} */}
                <>
                  <button
                    onClick={() => fSetLeadsType('Add Lead')}
                    className="flex items-center ml-5 w-[142px] h-[40px] px-4 py-2.5 rounded-[8px] bg-[#F44D21] font-inter font-medium text-[14px] leading-[20px] gap-2 text-white"
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
                    <span>Add Visitor</span>
                  </button>
                  {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
                    <button
                      onClick={() => fSetLeadsType('Import Leads')}
                      className="flex items-center ml-5 w-[160px] h-[40px] px-4 py-2.5 rounded-[8px] bg-[#F44D21] font-inter font-medium text-[14px] leading-[20px] gap-2 text-white"
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
                      <span>Import Visitors</span>
                    </button>
                  )}
                  {/* {isImportLeads && (
                    <button
                      onClick={() => fSetLeadsType('Import Leads')}
                      className={`flex items-center ml-5 pl-2 pr-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700  `}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>

                      <span className="ml-1">Import Lead</span>
                    </button>
                  )} */}
                </>
              </div>
            </div>

            {/* New search/filter row below heading and above filters/tabs */}
            <div className="flex flex-row items-center justify-between bg-white rounded-lg px-4 py-3 mb-4">
              {/* Search bar */}
              <div className="flex-1 flex items-center mr-4">
                <div className="flex items-center border border-[#F0F0F0] rounded-[8px] bg-white px-3 py-2 w-[320px]">
                  <span className="text-gray-400 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder={`Search...${selLeadsOf.label}`}
                    className="bg-transparent focus:border-transparent focus:ring-0 focus:outline-none text-sm leading-7 text-gray-900 placeholder:font-inter placeholder:font-normal placeholder:text-[14px] placeholder:leading-none placeholder:text-[#AEAEAE] w-full"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value)
                      const searchString = e.target.value.toLowerCase()
                      const filtered = leadsFetchedRawData.filter((item) => {
                        return (
                          (item.Name &&
                            item.Name.toLowerCase().includes(searchString)) ||
                          (item.Email &&
                            item.Email.toLowerCase().includes(searchString)) ||
                          (item.Mobile &&
                            item.Mobile.toLowerCase().includes(searchString))
                        )
                      })
                      setLeadsFetchedData(filtered)
                    }}
                  />
                </div>
              </div>
              {/* Calendar and All Events dropdown */}
              <div className="flex items-center gap-2 min-w-[280px] justify-end">
                <div className="flex flex-row items-center border border-[#F0F0F0] rounded-[4px] bg-white px-2 py-1 mr-2">
                  <CustomDatePicker
                    selected={startDate}
                    onCalendarOpen={() => setIsOpened(true)}
                    onCalendarClose={() => setIsOpened(false)}
                    onChange={(update) => setDateRange(update)}
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    isClearable={true}
                    dateFormat="MMM dd, yyyy"
                    popperPlacement="bottom-start"
                    customInput={
                      <button
                        type="button"
                        className={`flex items-center h-[36px] transition-all duration-200 ${
                          startDate && endDate ? 'w-[240px]' : 'w-[160px]'
                        }`}
                        style={{
                          background: 'none',
                          border: 'none',
                          boxShadow: 'none',
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        <CalendarMonthTwoToneIcon className="h-5 w-5 text-[#667085]" />
                        {startDate && endDate ? (
                          <span
                            className="ml-2 text-[#667085] text-[14px] font-normal"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            {`${startDate.toLocaleDateString('en-US', {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric',
                            })} - ${endDate.toLocaleDateString('en-US', {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric',
                            })}`}
                          </span>
                        ) : (
                          <span
                            className="ml-2 text-[#999999] text-[15px] font-normal"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Select date range
                          </span>
                        )}
                      </button>
                    }
                  />
                </div>
                <VerySlimSelectBox
                  name="project"
                  label=""
                  placeholder="All Events"
                  className="input min-w-[140px] font-inter font-normal text-[14px] leading-[24px] text-[#999999]"
                  onChange={(value) => setSelProject(value)}
                  value={selProjectIs?.value}
                  options={[
                    ...[{ label: 'All Events', value: 'allprojects' }],
                    ...projectList,
                  ]}
                />
              </div>
            </div>

            <MetaTags title="ExecutiveHome" description="ExecutiveHome page" />

            {/* {ready && (
              <div className="flex flex-row ">
                <main className="mt-3 flex flex-row overflow-auto max-h-[60%] rounded ">
                  <div className="flex">
                    <DragDropContext onDragEnd={onDragEnd}>
                      {serialLeadsData.map((board, bIndex) => {
                        const x = leadsFetchedData.filter(
                          (data) =>
                            data.Status.toLowerCase() ===
                            board.name.toLowerCase()
                        )
                        console.log('serialLeadsData, ', serialLeadsData)
                        return (
                          <div
                            key={bIndex}
                            className=" border-[1px]  border-gray-200  bg-[#F5F8FA] w-56"
                          >
                            <Droppable droppableId={bIndex.toString()}>
                              {(provided, snapshot) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className={`flex-shrink-0  min-w-150 bg-[#F5F8FA] rounded-md  h-screen ${
                                    snapshot.isDraggingOver && 'bg-green-100'
                                  }`}
                                >
                                  <div className="flex border-b p-3 ">
                                    <span className="text-sm  mb-1  ml-1 font-medium text-gray-900">
                                      {board.name}
                                    </span>
                                    <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">

                                      {board.items.length}
                                    </span>
                                  </div>
                                  <div>
                                    {board.items.length > 0 &&
                                      board.items.map((item, iIndex) => {
                                        return (
                                          <div
                                            key={item.id}
                                            className="mt-2 ml-2.5 "
                                            onClick={() => {
                                              setopenUserProfile(
                                                !openUserProfile
                                              )
                                              console.log('iam clicked1', item)
                                            }}
                                          >
                                            <CardItem
                                              key={item.id}
                                              data={item}
                                              index={iIndex}
                                            />
                                          </div>
                                        )
                                      })}
                                    {provided.placeholder}
                                    {console.log('dragDatga is', board)}
                                  </div>
                                </div>
                              )}
                            </Droppable>
                          </div>
                        )
                      })}
                    </DragDropContext>
                  </div>
                </main>
              </div>
            )} */}

            {!ready && (
              <LLeadsTableView
                setFetchLeadsLoader={setFetchLeadsLoader}
                fetchLeadsLoader={fetchLeadsLoader}
                leadsFetchedData={leadsFetchedData}
                setisImportLeadsOpen={setisImportLeadsOpen}
                selUserProfileF={selUserProfileF}
                leadsTyper={leadsTyper}
                searchVal={searchValue}
              />
            )}
          </div>
        </div>
      </div>
      <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={addLeadsTypes}
        widthClass="max-w-4xl"
        customerDetails={selUserProfile}
        unitsViewMode={unitsViewMode}
        setUnitsViewMode={setUnitsViewMode}
        setIsClicked={setIsClicked}
      />
    </>
  )
}

export default ExecutiveHomeViewerPage
