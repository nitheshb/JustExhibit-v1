/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'

import { Menu } from '@headlessui/react'
import { Listbox, Transition } from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/outline'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import { DownloadIcon } from '@heroicons/react/solid'
import ClockIcon from '@heroicons/react/solid/ClockIcon'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

import {
  addLeadScheduler,
  addSchedulerLog,
  deleteSchLog,
  steamLeadActivityLog,
  steamLeadPhoneLog,
  steamLeadScheduleLog,
  steamUsersListByRole,
  updateLeadAssigTo,
  updateLeadStatus,
  updateSchLog,
  addLeadNotes,
  steamLeadNotes,
  createAttach,
  getCustomerDocs,
  getAllProjects,
  updateLeadProject,
  getFinanceForUnit,
  streamGetAllTransactions,
  streamGetAllUnitTransactions,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'
import {
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDate,
  prettyDateTime,
  timeConv,
} from 'src/util/dateConverter'
import { CustomSelect } from 'src/util/formFields/selectBoxField'

import DocRow from '../LegalModule/Docu_row'

import SortComp from './sortComp'

import 'react-datepicker/dist/react-datepicker.css'

import Loader from './Loader/Loader'
import AddBookingForm from './bookingForm'

import { useSnackbar } from 'notistack'

import SiderForm from '../SiderForm/SiderForm'

import CrmUnitSummary from './A_CrmUnitSummary'
import CrmUnitPsHome from './CustomerFinanceStatement'

import AssigedToDropComp from '../assignedToDropComp'

import { USER_ROLES } from 'src/constants/userRoles'

import CrmPaymentSummary from './CrmPaymentSummary'

import AddApplicantDetails from '../AddApplicantDetails'
import BankSelectionSwitchDrop from '../A_LoanModule/BankSelectionDroopDown'
import LoanApplyFlowHome from '../A_LoanModule/LoanApplyFlowHome'

import { supabase } from 'src/context/supabase'

import ShowCustomerDetails from './CrmShowCustomerDetails'
import CancelUnitForm from './A_UnitCancel.tsx/CancelUnitForm'
import UnitAudit from './A_Crm_UnitAudit/UnitAudit'


// interface iToastInfo {
//   open: boolean
//   message: string
//   severity: AlertColor
// }
const people = [
  { name: 'Priority 1' },
  { name: 'Priority 2' },
  { name: 'Priority 3' },
  { name: 'Priority 4' },
]
const statuslist = [
  { label: 'Select the Status', value: '' },
  { label: 'New', value: 'new' },
  // { label: 'Follow Up', value: 'followup' },
  { label: 'Visit Fixed', value: 'visitfixed' },
  { label: 'Visit Done', value: 'visitdone' },
  { label: 'Negotiation', value: 'Negotiation' },
  // { label: 'RNR', value: 'rnr' },
  { label: 'Booked', value: 'booked' },
  { label: 'Not Interested', value: 'notinterested' },
  // { label: 'Dead', value: 'Dead' },
]

const attachTypes = [
  { label: 'Select Document', value: '' },
  { label: 'Bank Cheque', value: 'bank_cheque' },
  { label: 'Booking Form', value: 'booking_form' },
  { label: 'Customer Aadhar', value: 'customer_aadhar' },
  { label: 'Co-Applicant Aadhar', value: 'co-applicant_Aadhar' },
  { label: 'Cancellation Form', value: 'cancellation_form' },
  { label: 'Cost Sheet', value: 'cost_sheet' },
  // { label: 'Follow Up', value: 'followup' },
  { label: 'Estimation Sheet', value: 'estimation_sheet' },
  { label: 'Payment Screenshot (IMPS/RTGS/NEFT)', value: 'payment_screenshot' },
  { label: 'Payment Receipt', value: 'payment_receipt' },
  { label: 'Others', value: 'others' },

  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]

const notInterestOptions = [
  { label: 'Select Document', value: '' },
  { label: 'Budget Issue', value: 'budget_issue' },
  { label: 'Looking for Different Property', value: 'differeent_options' },

  { label: 'Others', value: 'others' },

  // { label: 'Follow Up', value: 'followup' },
  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]
export default function UnitFullSummary({
  openUserProfile,
  rustomerDetails,
  unitViewerrr,
  unitsViewMode,
  setUnitsViewMode,
  transactionData,
  customerDetails,
  selCustomerPayload,
  selSubMenu,
  selSubMenu2,
  source
}) {
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])

  const [usersList, setusersList] = useState([])

  // const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('summary')
  const [tempLeadStatus, setLeadStatus] = useState('')
  const [assignerName, setAssignerName] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [leadsActivityFetchedData, setLeadsFetchedActivityData] = useState([])
  const [customerInfo, setCustomerInfo] = useState({})

  const [leadSchFetchedData, setLeadsFetchedSchData] = useState([])
  const [leadNotesFetchedData, setLeadsFetchedNotesData] = useState([])
  const [unitTransactionsA, setUnitTransactionsA] = useState([])
  const [leadSchFilteredData, setLeadsFilteredSchData] = useState([])
  const [takTitle, setTakTitle] = useState('')
  const [takNotes, setNotesTitle] = useState('')
  const [attachType, setAttachType] = useState('')
  const [notInterestType, setNotInterestType] = useState('')
  const [attachTitle, setAttachTitle] = useState('')
  const [filterData, setFilterData] = useState([])
  const [docsList, setDocsList] = useState([])
  const [progress, setProgress] = useState(0)
  const [openCapturePayment, setOpenCapturePayment] = useState(false)
  const [openApplicantEdit, setShowApplicantEdit] = useState(false)

  const d = new window.Date()
  const [value, setValue] = useState(d)

  // const [startDate, setStartDate] = useState(d)
  const [startDate, setStartDate] = useState(setHours(setMinutes(d, 30), 16))
  const [selected, setSelected] = useState(people[0])
  const [taskDetails, setTaskDetails] = useState('')
  const [schPri, setSchPri] = useState(1)
  const [schTime, setSchTime] = useState()
  const [schStsA, setschStsA] = useState([])
  const [schStsMA, setschStsMA] = useState([])
  const [selFilterVal, setSelFilterVal] = useState('pending')
  const [addNote, setAddNote] = useState(false)
  const [addSch, setAddSch] = useState(false)
  const [attach, setAttach] = useState(false)
  const [loader, setLoader] = useState(false)
  const [projectList, setprojectList] = useState([])
  const [financeMode, setFinanceMode] = useState('schedule')

  const [selProjectIs, setSelProjectIs] = useState({
    projectName: '',
    uid: '',
  })

  const [leadDetailsObj, setLeadDetailsObj] = useState({})
  const {
    id,
    Name,
    Event,
    ProjectId,
    Source,
    Status,
    by,
    Mobile,
    Date,
    Email,
    Assigned,
    AssignedBy,
    Notes,
    Timeline,
    attachments,
    mode,
    chequeno,
    dated,
    amount,
    fromObj,
    toAccount,
    stsUpT,
    assignT,
    CT,
  } = customerDetails

  const totalIs = 0
  useEffect(() => {
    const count = projectList.filter(
      (dat) => dat.uid == selCustomerPayload?.pId
    )

    console.log('myData is ', selCustomerPayload?.pId, projectList)
    if (count.length > 0) {
      setSelProjectIs(count[0])
      console.log('myData is ', selProjectIs, count[0])
    }

    console.log(
      'myData is ',
      customerDetails,
      selCustomerPayload,
      selSubMenu,
      projectList,
      selProjectIs
    )
  }, [projectList])


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
    if (selSubMenu) {
      console.log('new setValue is ', selSubMenu)
      setFeature(selSubMenu)
    } else {
      console.log('new setValue is ', selSubMenu)
      setFeature('summary')
    }
    console.log('new setValue is ', selSubMenu)
  }, [selSubMenu])

  useEffect(() => {
    let x = []
    if (selFilterVal === 'all') {
      x = leadSchFetchedData.filter((d) => d?.schTime != undefined)
    } else {
      x = leadSchFetchedData.filter(
        (d) => d?.schTime != undefined && d?.sts === selFilterVal
      )
    }
    setLeadsFilteredSchData(x)
  }, [leadSchFetchedData, selFilterVal])
  useEffect(() => {
    setAssignedTo(customerDetails?.assignedTo)
    setAssignerName(customerDetails?.assignedToObj?.label)
    setSelProjectIs({ projectName: Event, uid: ProjectId })

    setLeadStatus(Status)
    console.log('assinger to yo yo', customerDetails)
  }, [customerDetails])
  // adopt this
  useEffect(() => {
    // setFilterData
    let fet = 'notes'
    if (selFeature === 'notes') {
      getLeadNotesFun()
      fet = 'notes'
    } else if (selFeature === 'phone') {
      fet = 'ph'
    } else if (selFeature === 'attachments') {
      fet = 'attach'
    } else if (selFeature === 'appointments') {
      fet = 'appoint'
    } else if (selFeature === 'timeline') {
      fet = 'status'
    }

    if (fet === 'appoint') {
      return
    } else {
      leadsActivityFetchedData.map((data) => {
        console.log('value of filtered feature count before', data)
      })
      let x = []
      if (selFeature != 'timeline') {
        x = leadsActivityFetchedData.filter((data) => data.type === fet)
      } else {
        x = leadsActivityFetchedData
      }
      console.log(
        'value of filtered feature count is wow it ',
        leadsActivityFetchedData,
        x.length
      )
      setFilterData(x)
    }
  }, [leadsActivityFetchedData, selFeature])

  useEffect(() => {
    getLeadsDataFun()
  }, [])

  useEffect(() => {
    getCustomerDocsFun()
    getProjectsListFun()
  }, [])

  const getCustomerDocsFun = () => {
    const unsubscribe = getCustomerDocs(
      orgId,
      id,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        console.log('user docs list fetched are', projects)
        setDocsList(projects)
      },
      () => setDocsList([])
    )
    return unsubscribe
  }

  const getProjectsListFun = () => {
    const unsubscribe = getAllProjects(
      orgId,
      (querySnapshot) => {
        const projectsListA = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
        setfetchedUsersList(projectsListA)
        projectsListA.map((user) => {
          user.label = user.projectName
          user.value = user.projectName
        })
        console.log('fetched proejcts list is', projectsListA)
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }
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
        const updatedLeadLogs = [...unitTransactionsA]
        setUnitTransactionsA((prevLogs) => {
          const existingLog = prevLogs.find(
            (log) => log.id === id && log.unit_id === selCustomerPayload?.id
          )

          if (existingLog) {
            console.log('Existing record found!')
            const updatedLogs = prevLogs.map((log) =>
              log.id === id ? payload.new : log
            )
            return [...updatedLogs]
          } else {
            console.log('New record added!')
            return [...prevLogs]
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
    getAllTransactionsUnit()
  }, [])

  const getAllTransactionsUnit = async () => {
    const { access, uid } = user

    const steamLeadLogs = await streamGetAllUnitTransactions(
      orgId,
      'snap',
      {
        unit_id: selCustomerPayload?.id,
      },
      (error) => []
    )
    await setUnitTransactionsA(steamLeadLogs)
    return

    console.log('transactions id is ', selCustomerPayload?.uid)
    const unsubscribe = getFinanceForUnit(
      orgId,
      async (querySnapshot) => {
        const transactionsListRaw = querySnapshot.docs.map((docSnapshot) => {
          const x = docSnapshot.data()
          x.id = docSnapshot.id
          return x
        })
        // setBoardData
        console.log('my Array data is ', transactionsListRaw)

        await setUnitTransactionsA(transactionsListRaw)
        await console.log('my Array data is set it')
      },
      {
        unitId: selCustomerPayload?.id,
      },
      () => setUnitTransactionsA([])
    )
    return unsubscribe
  }
  useEffect(() => {
    setLeadStatus(Status?.toLowerCase())
  }, [customerDetails])

  const setAssigner = (leadDocId, value) => {
    setAssignerName(value.name)
    setAssignedTo(value.value)
    // save assigner Details in db

    // updateLeadAssigTo(orgId, leadDocId, value, '', by)
  }
  const setNewProject = (leadDocId, value) => {
    console.log('sel pROJECT DETAILS ', value)

    // setProjectName(value.projectName)
    // setProjectId(value.uid)
    // save assigner Details in db
    // projectName
    const x = {
      Event: value.projectName,
      ProjectId: value.uid,
    }
    setSelProjectIs(value)
    updateLeadProject(orgId, leadDocId, x)
    // updateLeadAssigTo(leadDocId, value, by)
  }

  const setStatusFun = async (leadDocId, newStatus) => {
    setLoader(true)
    setLeadStatus(newStatus)

    const arr = ['notinterested', 'visitdone', 'visitcancel']
    arr.includes(newStatus) ? setFeature('notes') : setFeature('appointments')
    arr.includes(newStatus) ? setAddNote(true) : setAddSch(true)
    if (newStatus === 'visitfixed') {
      await setTakTitle('Schedule a cab ')
    } else if (newStatus === 'booked') {
      await setTakTitle('Share the Details with CRM team')
      await fAddSchedule()
    } else {
      setTakTitle(' ')
    }

    //
    // updateLeadStatus(leadDocId, newStatus)
    // toast.success('Status Updated Successfully')
  }

  const downloadFile = (url) => {
    window.location.href = url
  }
  const getLeadsDataFun = async () => {
    if (id == undefined) return
    console.log('ami triggered')
    const unsubscribe = steamLeadActivityLog(
      orgId,
      (doc) => {
        console.log('my total fetched list is yo yo ', doc.data())
        const usersList = doc.data()
        const usersListA = []

        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          usersListA.push(value)
          console.log('my total fetched list is 3', `${key}: ${value}`)
        })
        // for (const key in usersList) {
        //   if (usersList.hasOwnProperty(key)) {
        //     console.log(`${key} : ${usersList[key]}`)
        //     console.log(`my total fetched list is 2 ${usersList[key]}`)
        //   }
        // }

        console.log('my total fetched list is', usersListA.length)
        setLeadsFetchedActivityData(usersListA)
      },
      {
        uid: id,
      },
      (error) => setLeadsFetchedActivityData([])
    )

    //  lead Schedule list
    steamLeadScheduleLog(
      orgId,
      (doc) => {
        console.log('my total fetched list is 1', doc.data())
        const usersList = doc.data()
        const usersListA = []
        if (usersList == undefined) return
        const sMapStsA = []
        console.log('this is what we found', usersList?.staA)
        setschStsA(usersList?.staA || [])
        setschStsMA(usersList?.staDA || [])
        // delete usersList['staA']
        // delete usersList['staDA']
        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          if (['staA', 'staDA'].includes(key)) {
            if (key === 'staA') {
              // setschStsA(value)
            } else if (key === 'staDA') {
              // sMapStsA = value
            }
          } else {
            usersListA.push(value)
            // console.log(
            //   'my total fetched list is 3',
            //   `${key}: ${JSON.stringify(value)}`
            // )
          }
        })
        // for (const key in usersList) {
        //   if (usersList.hasOwnProperty(key)) {
        //     console.log(`${key} : ${usersList[key]}`)
        //     console.log(`my total fetched list is 2 ${usersList[key]}`)
        //   }
        // }

        console.log('my total fetched list is', usersListA.length)
        usersListA.sort((a, b) => {
          return b.ct - a.cr
        })
        setLeadsFetchedSchData(
          usersListA.sort((a, b) => {
            return a.ct - b.ct
          })
        )
      },
      {
        uid: id,
      },
      (error) => setLeadsFetchedSchData([])
    )

    return unsubscribe
  }
  const getLeadNotesFun = async () => {
    console.log('ami triggered')
    const unsubscribe = steamLeadNotes(
      (doc) => {
        console.log('my total fetched list is yo yo ', doc.data())
        const usersList = doc.data()
        const usersListA = []

        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          usersListA.push(value)
          console.log('my total fetched list is 3', `${key}: ${value}`)
        })
        console.log('my total notes list is ', usersListA)
        setLeadsFetchedNotesData(usersListA)
      },
      {
        uid: id,
      },
      (error) => setLeadsFetchedActivityData([])
    )
    return unsubscribe
  }
  const fAddSchedule = async () => {
    console.log('start time is ', startDate)
    const data = {
      by: user.email,
      type: 'schedule',
      pri: selected?.name,
      notes: takTitle,
      sts: 'pending',
      schTime:
        tempLeadStatus === 'booked'
          ? Timestamp.now().toMillis() + 10800000
          : startDate.getTime(),
      ct: Timestamp.now().toMillis(),
    }

    const x = schStsA

    console.log('new one ', schStsA, x)
    x.push('pending')
    setschStsA(x)
    // addSchedulerLog(id, data)
    console.log('new one ', schStsA)
    await addLeadScheduler(orgId, id, data, schStsA, '')
    if (Status != tempLeadStatus) {
    }
    await setTakTitle('')
    await setAddSch(false)
    await setLoader(false)
  }
  const cancelResetStatusFun = () => {
    setAddSch(false)
    setAddNote(false)
    // if its not edit mode ignore it
    setLeadStatus(Status)
    setLoader(false)
  }

  const handleColor = (time) => {
    return time.getHours() > 12 ? 'text-success' : 'text-error'
  }

  const openPaymentFun = () => {
    setOpenCapturePayment(true)
  }
  const doneFun = (data) => {
    console.log('clicked schedule is', data)
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    x[inx] = 'completed'
    setschStsA(x)

    updateSchLog(orgId, id, data.ct, 'completed', schStsA)
  }
  const delFun = (data) => {
    console.log('clicked schedule is', data)
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    const y = schStsMA
    x.splice(inx, 1)
    y.splice(inx, 1)
    setschStsA(x)
    setschStsMA(y)

    deleteSchLog(orgId, id, data.ct, 'completed', schStsA, schStsMA)
  }

  const selFun = () => {
    console.log('i was selcted')
    setAddNote(true)
  }

  const showAddAttachF = () => {
    setAttach(true)
  }

  const fAddNotes = async () => {
    console.log('start time is ', startDate)
    const data = {
      by: user.email,
      type: 'notes',
      notes: takNotes,
      ct: Timestamp.now().toMillis(),
    }

    await addLeadNotes(orgId, id, data)
    await setNotesTitle('')
    await setAddNote(false)
  }

  const docUploadHandler = async (e) => {
    e.preventDefault()
    console.log('filer upload stuff', e.target[0].files[0])
    uploadStuff(e.target[0].files[0])
  }

  const uploadStuff = async (file) => {
    if (!file) return
    try {
      const uid = uuidv4()
      const storageRef = ref(storage, `/spark_files/${Name}_${uid}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const prog =
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgress(prog)
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            createAttach(orgId, url, by, file.name, id, attachType)
            console.log('file url i s', url)
            //  save this doc as a new file in spark_leads_doc
          })
        }
      )
    } catch (error) {
      console.log('upload error is ', error)
    }
  }
  return (
    <div
      className={`bg-[#d9d8ff]  h-screen    ${openUserProfile ? 'hidden' : ''} `}
    >
<section className="flex flex-row">
    <div className='w-full'>
      <div className="rounded-t bg-[#F1F5F9] mb-0 px-3">
        <>

          {selFeature === 'attachments' && (
            <div className="border px-4 bg-[#F6F7FF]">
              {docsList.length === 0 && (
                <div className="py-8 px-8 flex flex-col items-center mt-6">
                  <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                    <img
                      className="w-[80px] h-[80px] inline"
                      alt=""
                      src="/empty-dashboard.svg"
                    />
                  </div>
                  <h3 className="mb-1 text-xs font-semibold text-gray-900 ">
                    No Attachments
                  </h3>
                  <button onClick={() => showAddAttachF()}>
                    <time className="block mb-2 text-xs font-normal leading-none text-gray-400 ">
                      Better always attach a string
                      <span className="text-blue-600 text-xs">
                        {' '}
                        Add Dcoument
                      </span>
                    </time>
                  </button>
                </div>
              )}

              {attach && (
                <div className="flex justify-center mt-4">
                  <div className="mb-3 w-96 px-10 bg-[#FFF9F2] rounded-md py-3 pb-6">
                    <div className="w-full flex flex-col mb-3 mt-2">
                      <CustomSelect
                        name="source"
                        label="Document Type *"
                        className="input mt-3"
                        onChange={(value) => {
                          // formik.setFieldValue('source', value.value)
                          setAttachType(value.value)
                        }}
                        value={attachType}
                        options={attachTypes}
                      />
                    </div>
                    <label
                      htmlFor="formFile"
                      className="form-label inline-block mb-2  font-regular text-sm "
                    >
                      Upload file
                    </label>
                    <form onSubmit={docUploadHandler}>
                      <input
                        className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="file"
                        id="formFile"
                      />
                      <div className="flex flex-row mt-3">
                        <button
                          // onClick={() => fAddSchedule()}
                          type="submit"
                          className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                        >
                          <span className="ml-1 ">Upload</span>
                        </button>
                        <button
                          // onClick={() => fSetLeadsType('Add Lead')}
                          onClick={() => setAttach(false)}
                          className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                        >
                          <span className="ml-1 ">Cancel</span>
                        </button>
                      </div>
                    </form>

                    {/* <h3> {progress}</h3> */}
                  </div>
                </div>
              )}

              {docsList.length > 0 && (
                <div className="py-8">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-semibold leading-tight">
                      Customer attachments
                    </h2>
                    <button onClick={() => showAddAttachF()}>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                        <span className="text-blue-600"> Add Dcoument</span>
                      </time>
                    </button>
                  </div>
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Name
                            </th>

                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Created On / By
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                              Status
                            </th>
                            {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th> */}
                          </tr>
                        </thead>
                        <tbody>
                          {docsList.map((dat, i) => {
                            return (
                              <tr key={i} className=" border-b">
                                <td className="px-5 py-5 bg-white text-sm ">
                                  <div className="flex">
                                    <div className="">
                                      <p className="text-gray-900 whitespace-no-wrap overflow-ellipsis">
                                        {dat.name}
                                      </p>
                                      <p className="text-blue-600 whitespace-no-wrap">
                                        {dat.type}
                                      </p>
                                    </div>
                                  </div>
                                </td>

                                <td className="px-5 py-5 bg-white text-sm ">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {prettyDate(dat.cTime)}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap overflow-ellipsis">
                                    {dat.by}
                                  </p>
                                </td>
                                <td className="px-5 py-5 bg-white text-sm">
                                  <>
                                    {/* <span className="relative inline px-3 py-1 font-semibold text-red-900 leading-tight">
                                    <span
                                      aria-hidden
                                      className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                                    ></span>
                                    <span className="relative">Approved</span>
                                  </span> */}

                                    <DownloadIcon
                                      onClick={() => downloadFile(dat.url)}
                                      className="w-5 h-5 text-gray-400 ml-3 cursor-pointer"
                                      aria-hidden="true"
                                    />
                                  </>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {selFeature === 'tasks' && (
            <div className="py-8 px-8 flex flex-col items-center">
              <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                <img
                  className="w-[200px] h-[200px] inline"
                  alt=""
                  src="/all-complete.svg"
                />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                You are clean
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                Sitback & Relax <span className="text-blue-600">Add Task</span>
              </time>
            </div>
          )}

          {selFeature === 'timeline' && (
            <div className="py-8 px-8  border bg-[#F6F7FF]">
              {filterData.length == 0 && (
                <div className="py-8 px-8 flex flex-col items-center">
                  <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                    <img
                      className="w-[80px] h-[80px] inline"
                      alt=""
                      src="/templates.svg"
                    />
                  </div>
                  <h3 className="mb-1 text-xs font-semibold text-gray-900 ">
                    Timeline is Empty
                  </h3>
                  <time className="block mb-2 text-xs font-normal leading-none text-gray-400 ">
                    This scenario is very rare to view
                  </time>
                </div>
              )}
              <div className="font-md font-medium text-xs mb-4 text-gray-800">
                Timelines
              </div>
              <ol className="relative border-l border-gray-200 ">
                {filterData.map((data, i) => (
                  <section key={i} className="">
                    <a
                      href="#"
                      className="block items-center p-3 sm:flex hover:bg-gray-100 "
                    >
                      {/* <PlusCircleIcon className="mr-3 mb-3 w-10 h-10 rounded-full sm:mb-0" /> */}
                      {data?.type == 'status' && (
                        <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white  ">
                          <svg
                            className="w-3 h-3 text-blue-600 \"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </span>
                      )}
                      {data?.type == 'ph' && (
                        <>
                          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-blue-600 "
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </span>
                          <div className="text-gray-600  m-3">
                            <div className="text-base font-normal">
                              <span className="font-medium text-green-900 ">
                                {'Rajiv'}
                              </span>{' '}
                              called{' '}
                              <span className="text-sm text-red-900 ">
                                {Name}
                              </span>{' '}
                            </div>
                            <div className="text-sm font-normal">
                              {data?.txt}
                            </div>
                            <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                              <ClockIcon className="mr-1 w-3 h-3" />
                              {data?.type == 'ph'
                                ? timeConv(Number(data?.time)).toLocaleString()
                                : timeConv(data?.T).toLocaleString()}
                              {'    '}
                              <span className="text-red-900 ml-4 mr-4">
                                {Number(data?.duration)} sec
                              </span>
                              or
                              <span className="text-red-900 ml-4">
                                {parseInt(data?.duration / 60)} min
                              </span>
                            </span>
                          </div>
                        </>
                      )}
                      {data?.type != 'ph' && (
                        <div className="text-gray-600  m-3">
                          <div className="text-base font-normal">
                            <span className="font-medium text-green-900 ">
                              {data?.type?.toUpperCase()}
                            </span>{' '}
                            set by{' '}
                            <span className="text-sm text-red-900 ">
                              {data?.by}
                            </span>{' '}
                          </div>
                          <div className="text-sm font-normal">{data?.txt}</div>
                          <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                            {/* <svg
                          className="mr-1 w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                            clipRule="evenodd"
                          ></path>
                        </svg> */}

                            <ClockIcon className="mr-1 w-3 h-3" />
                            {data?.type == 'ph'
                              ? timeConv(Number(data?.time)).toLocaleString()
                              : timeConv(data?.T).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </a>
                  </section>
                ))}
              </ol>
            </div>
          )}
        </>
      </div>
      {selFeature === 'applicant_info' && (
        <>
          {!openApplicantEdit && (
            <div className="  mt-2 pb-[250px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
              <ShowCustomerDetails
                source="fromBookedUnit"
                title="Booking Form"
                selUnitDetails={selCustomerPayload}
                leadDetailsObj2={selCustomerPayload}
                setShowApplicantEdit={setShowApplicantEdit}
              />
            </div>
          )}
          {openApplicantEdit && (
            <div className="  mt-2 pb-[250px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
              <AddApplicantDetails
                source="fromBookedUnit"
                title="Booking Form"
                customerInfo= {customerInfo}
                setCustomerInfo= {setCustomerInfo}
                selUnitDetails={selCustomerPayload}
                leadDetailsObj2={selCustomerPayload}
                setShowApplicantEdit={setShowApplicantEdit}
              />
            </div>
          )}
        </>
      )}
      {selFeature === 'unit_information' && (
        <>
          <div className="flex flex-col  my-10 rounded-lg bg-white border border-gray-100 px-4 m-4 mt-4">
            <div className="py-3 grid grid-cols-4 gap-4 mb-4">

              {/* <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mb-2">
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-700 tracking-wide">
                    Unit No
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.unit_no}
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
                    {selCustomerPayload?.area?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Facing
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.facing}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    BUA
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.builtup_area?.toLocaleString('en-IN')}
                  </div>
                </section>
              </section> */}


              <section className="flex flex-col  bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">


  <div className="flex items-center mb-2">
    <div className="border-l-4 border-[#57C0D0] pl-2 text-sm font-semibold text-gray-700">Units
    </div>
  </div>

  <section className="grid grid-cols-2 ">
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.unit_no}
      </div>
      <div className="text-xs text-gray-500">Unit No</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.area?.toLocaleString('en-IN')}
      </div>
      <div className="text-xs text-gray-500">
      Size
                    <span className="text-[10px] text-black-500 ml-1">
                      (sqft)
                    </span>
      </div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.facing}
      </div>
      <div className="text-xs text-gray-500">Facing</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.builtup_area?.toLocaleString('en-IN')}
      </div>
      <div className="text-xs text-gray-500">BUA</div>
    </div>

  </section>
</section>



              <section className="flex flex-col  bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">


  <div className="flex items-center mb-2">
    <div className="border-l-4 border-[#57C0D0] pl-2 text-sm font-semibold text-gray-700">Dimensions</div>
  </div>

  <section className="grid grid-cols-2 ">
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">  {selCustomerPayload?.east_d?.toLocaleString('en-IN')}</div>
      <div className="text-xs text-gray-500"> East</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.west_d?.toLocaleString('en-IN')}</div>
      <div className="text-xs text-gray-500">West</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.south_d?.toLocaleString('en-IN')}</div>
      <div className="text-xs text-gray-500">South</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.north_d?.toLocaleString('en-IN')}</div>
      <div className="text-xs text-gray-500">North</div>
    </div>

  </section>
</section>





<section className="flex flex-col  bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">


  <div className="flex items-center mb-2">
    <div className="border-l-4 border-[#57C0D0] pl-2 text-sm font-semibold text-gray-700">Schedule
    </div>
  </div>

  <section className="grid grid-cols-2 ">
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900"> {selCustomerPayload?.east_sch_by?.toLocaleString('en-IN')}</div>
      <div className="text-xs text-gray-500"> East By</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900"> {selCustomerPayload?.west_sch_by?.toLocaleString('en-IN')}</div>
      <div className="text-xs text-gray-500">West By</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.south_sch_by?.toLocaleString('en-IN')}</div>
      <div className="text-xs text-gray-500">South By</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.north_sch_by?.toLocaleString('en-IN')}
      </div>
      <div className="text-xs text-gray-500">North By</div>
    </div>

  </section>
</section>



<section className="flex flex-col  bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">


  <div className="flex items-center mb-2">
    <div className="border-l-4 border-[#57C0D0] pl-2 text-sm font-semibold text-gray-700">Additonal Details
    </div>
  </div>

  <section className="grid grid-cols-2 ">
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.rate_per_sqft?.toLocaleString('en-IN')}
      </div>
      <div className="text-xs text-gray-500">Cost</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.builtup_area?.toLocaleString('en-IN')}
      </div>
      <div className="text-xs text-gray-500">PLC</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.facing}
      </div>
      <div className="text-xs text-gray-500">Total</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.kathaId}

      </div>
      <div className="text-xs text-gray-500">KathaId</div>
    </div>

  </section>
</section>




















              {/* <section className="flex flex-col mx-4 bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mb-2 ">
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-700 tracking-wide">
                    East
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.east_d?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    West
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.west_d?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    South
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.south_d?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    North
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.north_d?.toLocaleString('en-IN')}
                  </div>
                </section>
              </section> */}
              {/* <section className="flex flex-col mx-4 bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mb-2">
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-700 tracking-wide">
                    East By
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.east_sch_by?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    West By
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.west_sch_by?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    South By
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.south_sch_by?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    North By
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.north_sch_by?.toLocaleString('en-IN')}
                  </div>
                </section>
              </section> */}
              {/* <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mb-2 ">
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-700 tracking-wide">
                    Cost
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {(
                      data?.unitDetail?.builtup_area *
                      data?.unitDetail?.rate_per_sqft
                    )?.toLocaleString('en-IN')}
                    {selCustomerPayload?.rate_per_sqft?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    PLC
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.builtup_area?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Total
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.facing}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    KathaId
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.kathaId}
                  </div>
                </section>
              </section> */}













            </div>


            <div className="py-3 grid grid-cols-4 gap-4 mb-4">


            {(customerDetails?.projectType?.name === 'Villas' || customerDetails?.projectType?.name === 'Apartment') && (


<section className="flex flex-col  bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">


  <div className="flex items-center mb-2">
    <div className="border-l-4 border-[#57C0D0] pl-2 text-sm font-semibold text-gray-700">Details
    </div>
  </div>

  <section className="grid grid-cols-2 ">
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.Bedrooms_D}

      </div>
      <div className="text-xs text-gray-500">BedRooms
      </div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.BathRooms_D?.toLocaleString('en-IN')}

      </div>
      <div className="text-xs text-gray-500">Bathrooms</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.Car_Parking_D}

      </div>
      <div className="text-xs text-gray-500">Car Parking
      </div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.Carpet_Area_D?.toLocaleString('en-IN')}


      </div>
      <div className="text-xs text-gray-500">Carpet Area Sqft
      </div>
    </div>

  </section>
</section>













            // <section className="flex flex-col bg-[#F6F7FF] p-3 border  border-[#e5e7f8] rounded-md mb-2">
            //     <section className="flex flow-row justify-between mb-1">
            //       <div className="font-md text-xs text-gray-700 tracking-wide">
            //       BedRooms
            //       </div>
            //       <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            //         {selCustomerPayload?.Bedrooms_D}
            //       </div>
            //     </section>
            //     <section className="flex flow-row justify-between mb-1">
            //       <div className="font-md text-xs text-gray-500  tracking-wide">
            //       Bathrooms
            //       </div>
            //       <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            //         {selCustomerPayload?.BathRooms_D?.toLocaleString('en-IN')}
            //       </div>
            //     </section>
            //     <section className="flex flow-row justify-between mb-1">
            //       <div className="font-md text-xs text-gray-500  tracking-wide">
            //       Car Parking
            //       </div>
            //       <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            //         {selCustomerPayload?.Car_Parking_D}
            //       </div>
            //     </section>
            //     <section className="flex flow-row justify-between mb-1">
            //       <div className="font-md text-xs text-gray-500  tracking-wide">
            //       Carpet Area Sqft
            //       </div>
            //       <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
            //         {selCustomerPayload?.Carpet_Area_D?.toLocaleString('en-IN')}
            //       </div>
            //     </section>
            //   </section>
                )}



              {/* <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md mb-2">
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-700 tracking-wide">
                  Status
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.status}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                  Release Status
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.release_status?.toLocaleString('en-IN')}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                  Mortgage Type
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.mortgage_type}
                  </div>
                </section>
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                  Carpet Area Sqft
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    {selCustomerPayload?.Carpet_Area_D?.toLocaleString('en-IN')}
                  </div>
                </section>
              </section> */}







              <section className="flex flex-col  bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">


  <div className="flex items-center mb-2">
    <div className="border-l-4 border-[#57C0D0] pl-2 text-sm font-semibold text-gray-700">Status
    </div>
  </div>

  <section className="grid grid-cols-2 ">
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900"> {selCustomerPayload?.status}</div>
      <div className="text-xs text-gray-500"> Status</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.release_status?.toLocaleString('en-IN')}
      </div>
      <div className="text-xs text-gray-500">Release Status</div>
    </div>
    <div className="text-start">
      <div className="text-base font-semibold text-slate-900">{selCustomerPayload?.mortgage_type}
      </div>
      <div className="text-xs text-gray-500">Mortgage Type
      </div>
    </div>
    {/* <div className="text-start">
      <div className="text-base font-semibold text-slate-900"></div>
      <div className="text-xs text-gray-500">North</div>
    </div> */}

  </section>
</section>



              </div>












          </div>







          <div className="flex flex-col bg-[#f0f1ff] rounded-lg p-3 mt-2 mx-4 ">
          <div className="flex flex-row ">
                <img
                  src="https://static.ambitionbox.com/static/benefits/WFH.svg"
                  alt=""
                />
                <h1 className="text-bodyLato text-left text-[#1E223C] font-semibold text-[14px] mb-2 mt-3 ml-1">
                  Dates
                </h1>
              </div>

            <div className="relative col-span-12 pl-6 space-y-2 sm:col-span-9 mt-1">

            <ol className="items-center sm:flex">
    {[{'event': 'Booked', 'key': 'booked_on'},
    {'event': 'Allotment', 'key': 'agreement_pipeline'},
    {'event': 'Agreement', 'key': 'agreement_on'},
    {'event': 'Registered', 'key': 'registered_on'},
    {'event': 'Possession', 'key': 'possession_on'}].map((d, i)=> <li key={i} className="relative mb-6 sm:mb-0 ">
        <div className="flex items-center">
            <div className="z-10 flex items-center justify-center w-6 h-6 bg-[#E5E7EB] rounded-full ring-0 ring-[#DDD6FE] sm:ring-8  shrink-0">
                <svg className="w-2.5 h-2.5 text-blue-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </div>
            <div className="hidden sm:flex w-full bg-[#E5E7EB] h-0.5 "></div>
        </div>
        <div className="mt-3 sm:pe-8 bg-white p-3 rounded-lg mr-2">
            <h4 className="text-lg font-semibold text-gray-900 text-[12px] ">{d?.event}</h4>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">On: {timeConv(Number(customerDetails[d?.key])).toLocaleString()}</time>
            {/* <p className="text-base font-normal text-gray-500 ">Get started with dozens of web components and interactive elements.</p> */}
        </div>
    </li>)}

</ol>



            </div>
          </div>
        </>
      )}
      {selFeature === 'summary' && (
        <div className="  mt-2 pb-[250px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
          <CrmUnitSummary
            selCustomerPayload={selCustomerPayload}
            assets={selCustomerPayload?.assets}
            totalIs={totalIs}
            unitTransactionsA={unitTransactionsA}
          />
        </div>
      )}
      {['finance_info', 'summary'].includes(selFeature) && (
        <>
          <div className="py-3 px-3 pb-[250px] m-4 mt-2 rounded-lg border border-gray-100 h-[100%] overflow-y-scroll">
            <CrmUnitPsHome
              financeMode={financeMode}
              setFinanceMode={setFinanceMode}
              selCustomerPayload={selCustomerPayload}
              assets={selCustomerPayload?.assets}
              totalIs={totalIs}
              unitTransactionsA={unitTransactionsA}
            />
          </div>
          {selFeature === 'summary' && (
            <div className="py-3 px-3 m-4 mt-2 rounded-lg border border-gray-100 h-[100%] overflow-y-scroll">
              <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                <section className="flex flow-row justify-between mb-1">
                  <div className="font-md text-xs text-gray-500  tracking-wide">
                    Amount
                  </div>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    Rs 1,20,000
                  </div>
                </section>
              </section>

              <div className="mt-2  grid grid-cols-2">
                <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                  <section className="flex flex-row justify-between mb-1">
                    <div className="font-md text-xs text-gray-500  tracking-wide">
                      From
                    </div>
                    <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                      Imps
                    </div>
                  </section>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    data
                  </div>
                </section>
                <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                  <section className="flex flex-row  justify-between mb-1">
                    <div className="font-md text-xs text-gray-500  tracking-wide">
                      To
                    </div>
                    <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                      date
                    </div>
                  </section>
                  <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                    data
                  </div>
                </section>
              </div>
              <div className="my-2  grid grid-cols-2 ">
                <section className="mr-2 flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                  <section className="flex flex-row justify-between mb-1">
                    <div className="font-md text-xs text-gray-500  tracking-wide">
                      Date
                    </div>
                    <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                      31/11/2022
                    </div>
                  </section>
                  <section className="flex flex-row justify-between mb-1">
                    <div className="font-md text-xs text-gray-500  tracking-wide">
                      Ref No
                    </div>
                    <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                      00022344x45
                    </div>
                  </section>
                  <section className="flex flex-row  justify-between mb-1">
                    <div className="font-md text-xs text-gray-500  tracking-wide">
                      By
                    </div>
                    <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                      date
                    </div>
                  </section>
                </section>
                <section className="flex flex-col bg-[#F6F7FF] p-3 border border-[#e5e7f8] rounded-md ">
                  <section className="flex flex-row justify-between mb-1">
                    <div className="font-md text-xs text-gray-500  tracking-wide">
                      Owner
                    </div>
                    <div className="font-md text-xs tracking-wide font-semibold text-slate-900 "></div>
                  </section>
                  <section className="flex flex-row  justify-between mb-1">
                    <div className="font-md text-xs text-gray-500  tracking-wide">
                      Status
                    </div>
                    <div className="font-md text-xs tracking-wide font-semibold text-slate-900 "></div>
                  </section>
                </section>
              </div>
            </div>
          )}
        </>
      )}

      {selFeature === 'loan_info' && <LoanApplyFlowHome />}
      {selFeature === 'agreement_info' && (
        <section className="bg-white w-full md:px-10 md:mb-20">
          <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700">
            <div className="flex p-4 items-center justify-between">
              <div className="flex flex-row">
                <h2 className="font-medium flex-grow">Unit Document</h2>
                <span
                  className=" ml-2 text-blue-500 hover:underline"
                  onClick={() => {
                    setSliderInfo({
                      open: true,
                      title: 'legal_doc_upload',
                      sliderData: {},
                      widthClass: 'max-w-xl',
                    })
                  }}
                >
                  Add Doc
                </span>
              </div>
              <p className="mr4">Date Created</p>
              {/* <Icon name="folder" size="3xl" color="gray" /> */}
            </div>
          </div>
          {[
            { id: 1234, name: 'EC', time: '22-Nov-2022' },
            {
              id: 1235,
              name: 'Agreement',
              time: '24-Nov-2022',
            },
            {
              id: 1236,
              name: 'Register Doc',
              time: '2-Dec-2022',
            },
          ].length === 0 ? (
            <div className="w-full text-center py-5">No documents</div>
          ) : (
            ''
          )}
          {[
            { id: 1234, name: 'EC', time: '22-Nov-2022' },
            {
              id: 1235,
              name: 'Agreement',
              time: '24-Nov-2022',
            },
            {
              id: 1236,
              name: 'Register Doc',
              time: '2-Dec-2022',
            },
          ]?.map((doc, i) => (
            <section
              key={i}
              onClick={() => {
                // show sidebar and display the worddoc
                setSliderInfo({
                  open: true,
                  title: 'viewDocx',
                  sliderData: {},
                  widthClass: 'max-w-xl',
                })
              }}
            >
              <DocRow id={doc?.id} fileName={doc?.name} date={doc?.time} />
            </section>
          ))}
        </section>
      )}

      {selFeature === 'legal_info' && <></>}
      {selFeature === 'cancel_booking' && <>

      <CancelUnitForm selUnitDetails={selCustomerPayload} /> </>}

      {selFeature === 'unit_audit' && <>

<UnitAudit selUnitDetails={selCustomerPayload} /> </>}
      </div>

      <div className="w-[250px] min-w-[250px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
            <div className="">
              {/* <div className="font-md font-medium text-xs  text-gray-800">
                          Notes
                        </div> */}

              <div className=" border-gray-900  bg-[#F1F5F9] rounded-t-lg ">
                <ul
                  className="flex flex-col  rounded-t-lg"
                  id="myTab"
                  data-tabs-toggle="#myTabContent"
                  role="tablist"
                >
                  {[

                     { lab: 'Summary', val: 'summary' },
                    { lab: 'Applicant details', val: 'applicant_info' },
                    { lab: 'Unit details', val: 'unit_information' },
                    { lab: 'Cost & Payments', val: 'finance_info' },
                    { lab: 'Loan details', val: 'loan_info' },
                    { lab: 'Agreement  details', val: 'agreement_info' },
                    { lab: 'Brokerage  details', val: 'brokerage_info' },
                    // { lab: 'Docs', val: 'docs_info' },
                    { lab: 'Tasks', val: 'tasks' },
                    { lab: 'Timeline', val: 'timeline' },
                    { lab: 'Cancel Booking', val: 'cancel_booking' },
                    { lab: 'Unit Audit', val: 'unit_audit' },

                  ].map((d, i) => {
                    return (
                      <li
                        key={i}
                        className="mr-2 ml-2 text-sm font-bodyLato"
                        role="presentation"
                      >
                        <button
                          className={`inline-block py-3 mr-3 px-1 text-sm font-medium text-center text-black rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${
                            selFeature === d.val
                              ? 'border-black text-black'
                              : 'border-transparent'
                          }`}
                          type="button"
                          role="tab"
                          onClick={() => setFeature(d.val)}
                        >
                          {`${d.lab} `}
                          {/* <span className="bg-gray-100 px-2 py-1 rounded-full">
                          {/* {rowsCounter(leadsFetchedData, d.val).length} */}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
      </section>
      <SiderForm
        open={openCapturePayment}
        setOpen={setOpenCapturePayment}
        title={'capturePayment'}
        unitsViewMode={false}
        widthClass="max-w-md"
        selUnitDetails={selCustomerPayload}
      />
    </div>
  )
}
