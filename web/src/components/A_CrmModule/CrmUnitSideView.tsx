/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'

import { Menu } from '@headlessui/react'
import { Listbox, Transition } from '@headlessui/react'
import { AdjustmentsIcon, ArrowRightIcon } from '@heroicons/react/outline'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import {
  BadgeCheckIcon,
  DocumentIcon,
  EyeIcon,
  MailIcon,
  DeviceMobileIcon,
  ViewBoardsIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/solid'
import { CheckIcon, SelectorIcon, DownloadIcon } from '@heroicons/react/solid'
import ClockIcon from '@heroicons/react/solid/ClockIcon'
import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import { VerticalAlignBottom } from '@mui/icons-material'
import { DateTimePicker } from '@mui/lab'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import TimePicker from '@mui/lab/TimePicker'
import { LinearProgress, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import DatePicker from 'react-datepicker'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
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
  capturePaymentS,
  updateUnitStatus,
  steamUsersListByDept,
  updateUnitCrmOwner,
  streamUnitById,
  updateCrmExecutiveReAssignAgreegations,
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

import SortComp from './sortComp'

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

import Loader from './Loader/Loader'
import AddBookingForm from './bookingForm'

import { useSnackbar } from 'notistack'

import SiderForm from '../SiderForm/SiderForm'

import CrmUnitSummary from './A_CrmUnitSummary'

import AssigedToDropComp from '../assignedToDropComp'

import { USER_ROLES } from 'src/constants/userRoles'

import CrmPaymentSummary from './CrmPaymentSummary'
import UnitFullSummary from './CrmUnitFullSummary'

import { getWhatsAppTemplates } from 'src/util/TuneWhatsappMsg'
import { supabase } from 'src/context/supabase'

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

const StatusListA = [
  {
    label: 'Booking Review',
    value: 'booked',
    logo: 'FireIcon',
    color: 'bg-violet-500',
    allowed: ['cancel_booking', 'swapUnit', 'agreement_pipeline'],
  },
  {
    label: 'Allotment',
    value: 'agreement_pipeline',
    logo: 'RefreshIcon',
    color: 'bg-violet-500',
    allowed: ['agreement_pipeline', 'sd_pipeline', 'ATS'],
  },
  {
    label: 'Agreement',
    value: 'ATS',
    logo: 'FireIcon',
    color: 'bg-violet-500',
    allowed: ['registered'],
  },
  {
    label: 'Registered',
    value: 'registered',
    logo: 'DuplicateInactiveIcon',
    color: 'bg-violet-500',
    allowed: ['possession'],
  },
  {
    label: 'Possession',
    value: 'possession',
    logo: 'DuplicateInactiveIcon',
    color: 'bg-violet-500',
    allowed: [''],
  },
  {
    label: 'Cancel Booking',
    value: 'cancel_booking',
    logo: 'DuplicateInactiveIcon',
    color: 'bg-violet-500',
    allowed: [''],
  },
  {
    label: 'Swap Unit',
    value: 'swapUnit',
    logo: 'DuplicateInactiveIcon',
    color: 'bg-violet-500',
    allowed: [''],
  },
]

const attachTypes = [
  { label: 'Select Document', value: '' },
  { label: 'Bank Cheque', value: 'bank_cheque' },
  { label: 'Booking Form', value: 'booking_form' },
  { label: 'Customer Aadhar', value: 'customer_aadhar' },
  { label: 'Co-Applicant Aadhar', value: 'co-applicant_Aadhar' },
  { label: 'Cancellation Form', value: 'cancellation_form' },
  { label: 'Cost Sheet', value: 'cost_sheet' },
  { label: 'Estimation Sheet', value: 'estimation_sheet' },
  { label: 'Payment Screenshot (IMPS/RTGS/NEFT)', value: 'payment_screenshot' },
  { label: 'Payment Receipt', value: 'payment_receipt' },
  { label: 'Others', value: 'others' },
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
export default function UnitSideViewCRM({
  openUserProfile,
  rustomerDetails,
  unitViewerrr,
  unitsViewMode,
  setUnitsViewMode,
  transactionData,
  customerDetails,
  selCustomerPayload,
  setSelUnitDetails,
  selSubMenu,
  selSubMenu2,
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
  const [unitStatusObj, setUnitStatusObj] = useState({
    label: 'Booking Review',
    value: 'booking_review',
    logo: 'FireIcon',
    color: ' bg-violet-500',
  })

  const [assignedTo, setAssignedTo] = useState('')
  const [leadsActivityFetchedData, setLeadsFetchedActivityData] = useState([])

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
  const [newDemand, setOpenNewDemand] = useState(false)

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
  const [timeHide, setTimeHide] = useState(false)
  const [statusValidError, setStatusValidError] = useState(false)
  const [newStatusErrorList, setNewStatusErrorList] = useState('')
  const [unitPayload, setUnitPayload] = useState({})

  const [selProjectIs, setSelProjectIs] = useState({
    projectName: '',
    uid: '',
  })

  const [leadDetailsObj, setLeadDetailsObj] = useState({})
  useEffect(() => {
    console.log('hello', customerDetails)
    streamUnitDataFun()
  }, [])

  useEffect(() => {
    setSelUnitDetails(unitPayload)
  }, [unitPayload])

  const {
    id,
    Name,
    Event,
    ProjectId,
    Source,
    status,
    unitStatus,
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

  const streamUnitDataFun = () => {
    const { id } = customerDetails
    console.log('hello', customerDetails)
    const z = streamUnitById(
      orgId,
      (querySnapshot) => {
        const SnapData = querySnapshot.data()
        SnapData.id = id
        console.log('hello', SnapData)
        setUnitPayload(SnapData)
      },
      { uid: id },
      () => {
        console.log('error')
      }
    )
  }
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
    const unsubscribe = steamUsersListByDept(
      orgId,
      ['crm'],
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

    setLeadStatus(status)
    console.log('assinger to yo yo', customerDetails, customerDetails?.status)
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
    }
    //  else if (fet === 'ph') {
    //   const unsubscribe = steamLeadPhoneLog(orgId,
    //     (doc) => {
    //       console.log('my total fetched list is yo yo 1', doc.data())
    //       const usersList = doc.data()
    //       const usersListA = []

    //       Object.entries(usersList).forEach((entry) => {
    //         const [key, value] = entry
    //         usersListA.push(value)
    //         console.log('my total fetched list is 3', `${key}: ${value}`)
    //       })
    //       console.log('my total fetched list is', usersListA.length)
    //       // setLeadsFetchedActivityData(usersListA)
    //     },
    //     {
    //       uid: id,
    //     },
    //     (error) => setLeadsFetchedActivityData([])
    //   )
    // }
    else {
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
    getAllTransactionsUnit()
  }, [])

  const getAllTransactionsUnit = () => {
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
    setLeadStatus(status?.toLowerCase())
  }, [customerDetails])

  const setAssignerFun = (leadDocId, value) => {
    setAssignerName(value.name)
    setAssignedTo(value.value)
    // save assigner Details in db

    // updateLeadAssigTo(orgId, leadDocId, value, '', by)
    // const todayTasksIncre = leadSchFetchedData?.filter(
    //   (d) => d?.sts === 'pending' && d?.schTime < torrowDate
    // ).length

    const { data: data4, error: error4 } = supabase
      .from(`${orgId}_unit_logs`)
      .insert([
        {
          type: 'assign_change',
          subtype: 'crm_owner',
          T: Timestamp.now().toMillis(),
          Uuid: selCustomerPayload?.id,
          by,
          payload: {},
          from: '',
          to: value.name,
        },
      ])
    const txt = `A New Customer is assigned to ${value.name}`
    updateUnitCrmOwner(
      orgId,
      selCustomerPayload?.id,
      value,
      user.email,
      enqueueSnackbar
    )
    selCustomerPayload?.fullPs.map((ps) => {
      console.log('my values are', ps)
      const newPayload = ps
      newPayload.assignedTo = value?.value
      newPayload.oldAssignedTo = selCustomerPayload?.assignedTo

      updateCrmExecutiveReAssignAgreegations(
        orgId,
        newPayload,
        user.email,
        enqueueSnackbar
      )
    })

    const msgPayload = {
      projectName: Event,
      broucherLink: '',
      locLink: '',
      projContactNo: '',
      scheduleTime: d.getTime() + 60000,
    }
    const receiverDetails = {
      customerName: Name,
      executiveName: value.name,
      receiverPhNo: Mobile,
      executivePh: value?.offPh,
      executiveEmail: value?.email,
    }
    getWhatsAppTemplates(
      'on_lead_assign',
      'wa',
      'customer',
      // 'ProjectId',
      ProjectId,
      receiverDetails,
      msgPayload
    )
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
    const x = StatusListA.filter((d) => d.value === status)
    let allowedList = [{ allowed: [] }]
    if (x.length > 0) {
      allowedList = x[0].allowed
    }
    console.log('value is', x, newStatus)
    if (!allowedList?.includes(newStatus?.value)) {
      enqueueSnackbar(`${status} unit cannot be ${newStatus?.label}`, {
        variant: 'warning',
      })
    } else {
      setLoader(true)

      // if newStatus  make check list
      const dataObj = { status: newStatus?.value }
      console.log('payment stuff is ', selCustomerPayload)
      const { fullPs } = selCustomerPayload
      dataObj[`${newStatus?.value}_on`] = Timestamp.now().toMillis()
      if (
        newStatus?.value === 'agreement_pipeline' &&
        selCustomerPayload?.kyc_status &&
        selCustomerPayload?.man_cs_approval
      ) {
        setUnitStatusObj(newStatus)
        const updatedPs = fullPs.map((item) => {
          if (item.order === 2) {
            return { ...item, elgible: true }
          } else {
            return item
          }
        })
        const t_elgible = updatedPs.reduce((total, item) => {
          if (item.elgible) {
            return total + item.value
          } else {
            return total
          }
        }, 0)
        dataObj.fullPs = updatedPs
        dataObj.T_elgible_new = t_elgible
        dataObj.T_elgible_balance =
          t_elgible -
          (selCustomerPayload?.T_review ||
            0 + selCustomerPayload?.T_approved ||
            0)
        updateUnitStatus(
          orgId,
          selCustomerPayload?.id,
          dataObj,
          user.email,
          enqueueSnackbar
        )
      } else if (
        newStatus?.value === 'ats_pipeline' &&
        // selCustomerPayload?.T_balance <= 0 &&
        selCustomerPayload?.ats_creation &&
        selCustomerPayload?.both_ats_approval
      ) {
        const updatedPs = fullPs.map((item) => {
          if (item.order === 3) {
            return { ...item, elgible: true }
          } else {
            return item
          }
        })
        const t_elgible = updatedPs.reduce((total, item) => {
          if (item.elgible) {
            return total + item.value
          } else {
            return total
          }
        }, 0)
        dataObj.fullPs = updatedPs
        dataObj.T_elgible_new = t_elgible
        dataObj.T_elgible_balance =
          t_elgible -
          (selCustomerPayload?.T_review ||
            0 + selCustomerPayload?.T_approved ||
            0)

        setUnitStatusObj(newStatus)
        updateUnitStatus(
          orgId,
          selCustomerPayload?.id,
          dataObj,
          user.email,
          enqueueSnackbar
        )
      }else if (
        newStatus?.value === 'ATS'
        // &&
        // selCustomerPayload?.T_balance <= 0

      ) {
        setUnitStatusObj(newStatus)
        dataObj.fullPs = selCustomerPayload?.fullPs
        dataObj.T_elgible_new = selCustomerPayload?.T_elgible
        dataObj.T_elgible_balance = selCustomerPayload?.T_elgible_balance

        updateUnitStatus(
          orgId,
          selCustomerPayload?.id,
          dataObj,
          user.email,
          enqueueSnackbar
        )
      } else if (
        newStatus?.value === 'registered'
        //  &&
        // selCustomerPayload?.T_balance <= 0

      ) {
        setUnitStatusObj(newStatus)
        dataObj.fullPs = selCustomerPayload?.fullPs
        dataObj.T_elgible_new = selCustomerPayload?.T_elgible
        dataObj.T_elgible_balance = selCustomerPayload?.T_elgible_balance

        updateUnitStatus(
          orgId,
          selCustomerPayload?.id,
          dataObj,
          user.email,
          enqueueSnackbar
        )
      }else if (
        newStatus?.value === 'possession'
        // &&
        // selCustomerPayload?.T_balance <= 0

      ) {
        setUnitStatusObj(newStatus)
        dataObj.fullPs = selCustomerPayload?.fullPs
        dataObj.T_elgible_new = selCustomerPayload?.T_elgible
        dataObj.T_elgible_balance = selCustomerPayload?.T_elgible_balance


        updateUnitStatus(
          orgId,
          selCustomerPayload?.id,
          dataObj,
          user.email,
          enqueueSnackbar
        )
      }else {
        setStatusValidError(true)
console.log('newStatus?.value',  newStatus?.value, selCustomerPayload)

        console.log('is this in statusvalidat or ')
        let errorList = ''
        if (
          newStatus?.value === 'agreement_pipeline' &&
          !selCustomerPayload?.kyc_status
        ) {
          errorList = errorList + 'KYC,'
        }
        if (
          newStatus?.value === 'agreement_pipeline' &&
          !selCustomerPayload?.man_cs_approval
        ) {
          errorList = errorList + 'Manger Costsheet Approval,'
        }
        if (
          newStatus?.value === 'ats_pipeline' &&
          selCustomerPayload?.T_balance <= 0
        ) {
          errorList = errorList + 'Due Payment,'
        }
        if (
          newStatus?.value === 'ats_pipeline' &&
          !selCustomerPayload?.ats_creation
        ) {
          errorList = errorList + 'ATS Creation,'
        }
        if (
          newStatus?.value === 'ats_pipeline' &&
          !selCustomerPayload?.both_ats_approval
        ) {
          errorList = errorList + 'Manger or Customer Costsheet Approval,'
        }

        errorList = errorList + 'is mandatory steps are missing'
        setNewStatusErrorList(errorList)
        enqueueSnackbar(`${errorList}`, {
          variant: 'warning',
        })
      }
    }

    return
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
    // toast.success('status Updated Successfully')
  }

  const downloadFile = (url) => {
    window.location.href = url
  }
  const getLeadsDataFun = async () => {
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

        setschStsA(usersList?.staA)
        setschStsMA(usersList?.staDA)
        // delete usersList['staA']
        // delete usersList['staDA']
        Object?.entries(usersList)?.forEach((entry) => {
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
    if (status != tempLeadStatus) {
    }
    await setTakTitle('')
    await setAddSch(false)
    await setLoader(false)
  }
  const cancelResetStatusFun = () => {
    setAddSch(false)
    setAddNote(false)
    // if its not edit mode ignore it
    setLeadStatus(status)
    setLoader(false)
  }

  const handleColor = (time) => {
    return time.getHours() > 12 ? 'text-success' : 'text-error'
  }

  const openPaymentFun = () => {
    setOpenCapturePayment(true)
  }
  const openDemandFun = () => {
    setOpenNewDemand(true)
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

  const paymentCaptureFun = async (data, resetForm) => {
    const {
      pId: projectId,
      id: unitId,
      phaseId,
      customerDetailsObj,
    } = selCustomerPayload
    const customLeadObj = { Name: customerDetailsObj?.customerName1 }
    data.attchUrl = data?.fileUploader?.url || ''
    data.category = 'Payment'
    const y = {}
    y.m = data?.fileUploader

    console.log('unit log ', data, y, y.m, y['m']['url'])

    const x = await capturePaymentS(
      orgId,
      true,
      projectId,
      unitId,
      8,
      customLeadObj,
      data,
      user?.email,
      enqueueSnackbar
    )
  }
  const demandCaptureFun = async (data, resetForm) => {
    const {
      pId: projectId,
      id: unitId,
      phaseId,
      customerDetailsObj,
    } = selCustomerPayload
    const customLeadObj = { Name: customerDetailsObj?.customerName1 }
    data.attchUrl = data?.fileUploader?.url || ''
    data.category = 'Payment'
    const y = {}
    y.m = data?.fileUploader

    console.log('unit log ', data, y, y.m, y['m']['url'])
return
    const x = await capturePaymentS(
      orgId,
      true,
      projectId,
      unitId,
      8,
      customLeadObj,
      data,
      user?.email,
      enqueueSnackbar
    )
  }
  return (
    <div
      className={`bg-white   h-screen    ${openUserProfile ? 'hidden' : ''} `}
    >
      <div className=" pb-[2px] px-3 mt-0 rounded-xs border-b bg-[#D9d8ff]">
        <div className="-mx-3 flex  sm:-mx-4 px-3">
          <div className="w-full   ">
            {/* <div className="">
                <div className="font-semibold text-[#053219]  text-sm  mt-3 mb-1  tracking-wide font-bodyLato">
                  <span className="mb-[4px] text-xl uppercase">{Name}</span>

                  <div className="mt-1">
                    <div className="font-md text-sm text-gray-500 mb-[2] tracking-wide">
                      <MailIcon className="w-3 h-3 inline text-[#058527] " />{' '}
                      {Email}
                    </div>
                    <div className="font-md text-sm text-gray-500 mb-[2] tracking-wide ">
                      <DeviceMobileIcon className="w-3 h-3 inline text-[#058527] " />{' '}
                      {Mobile?.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
                    </div>
                  </div>
                </div>
              </div> */}

            <div className="flex flex-col justify-between">
              <section className="flex flex-row justify-between bg-[#D9d8ff] px-3 py-1 border border-[#e5e7f8] rounded-md ">
                <section>
                  <section className="flex flex-row">
                    <img
                      src="https://static.ambitionbox.com/static/benefits/WFH.svg"
                      alt=""
                      className="w-10 h-10"
                    />
                    <p className="text-md font-bold text-[23px] tracking-tight uppercase font-body  ml-2 mt-2">
                      {selCustomerPayload?.unit_no}
                      {/* <span className="ml-2 font-normal text-green-800 text-xs px-2 py-[2px] bg-green-300 rounded-xl">
                        Phase:{selCustomerPayload?.phaseId}{' '}
                        <span className="text-[23px] mb-2">.</span>
                        <span className="ml1">{selProjectIs?.value}</span>
                      </span> */}

                      <span className=" ml-2 text-[12px] h-[20px] text-[#823d00] font-bodyLato font-[600] mt-[2px] bg-[#ffeccf] px-[6px] py-[2px] rounded-xl mr-1 ">
                        Booked: {prettyDate(selCustomerPayload?.booked_on || 0)}
                      </span>
                    </p>
                  </section>

                  <p className="text-xs tracking-tight uppercase font-body mt-[2px] ml-2 font-bold flex flex-row">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className="component-iconify MuiBox-root css-bla85z iconify iconify--solar mt-[2px] mr-[2px]"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <g fill="currentColor">
                        <circle cx="9.001" cy="6" r="4"></circle>
                        <ellipse cx="9.001" cy="17.001" rx="7" ry="4"></ellipse>
                        <path d="M21 17c0 1.657-2.036 3-4.521 3c.732-.8 1.236-1.805 1.236-2.998c0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17ZM18 6a3 3 0 0 1-4.029 2.82A5.688 5.688 0 0 0 14.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0 1 18 6.001Z"></path>
                      </g>
                    </svg>
                    {selCustomerPayload?.customerDetailsObj?.customerName1} &{' '}
                    {
                      selCustomerPayload?.secondaryCustomerDetailsObj
                        ?.customerName2
                    }
                  </p>
                  <p className="text-xs tracking-tight  font-body my-[2px] ml-2">
                    <span className="">
                      {selCustomerPayload?.customerDetailsObj?.phoneNo1}
                    </span>
                    <span className="ml-2">
                      {selCustomerPayload?.customerDetailsObj?.email1}
                    </span>
                  </p>
                </section>
                <section className="flex flex-row  h-[28px] mt-6">
                  <section className="flex flow-row justify-between mb-1 mr-2 py-[0px] px-[10px] bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline">
                    <div className="font-md text-xs text-gray-700 tracking-wide mr-1">
                      CRM Owner
                    </div>
                    <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                      {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
                        <div>
                          <AssigedToDropComp
                            assignerName={assignerName}
                            id={id}
                            setAssigner={setAssignerFun}
                            usersList={usersList}
                            align={undefined}
                          />
                        </div>
                      )}
                      {user?.role?.includes(USER_ROLES.CP_AGENT) && (
                        <span className="text-left text-sm">
                          {' '}
                          {assignerName}
                        </span>
                      )}
                    </div>
                  </section>
                  <section className="flex flow-row justify-between mb-1 mr-2 py-[0px] px-[10px] bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline">
                    <div className="font-md text-xs text-gray-700 tracking-wide mr-1">
                      Status
                    </div>
                    <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
                      {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
                        <div>
                          <AssigedToDropComp
                            assignerName={unitStatus}
                            id={id}
                            setAssigner={setStatusFun}
                            usersList={StatusListA}
                            align={undefined}
                          />
                        </div>
                      )}
                      {user?.role?.includes(USER_ROLES.CP_AGENT) && (
                        <span className="text-left text-sm">
                          {' '}
                          {assignerName}
                        </span>
                      )}
                    </div>
                  </section>
                  <section
                    className="text-center px-[10px] py-[2px] pt-[3px] h-[24px] bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline"
                    onClickCapture={() => {
                      openPaymentFun()
                    }}
                  >
                    CAPTURE PAYMENT
                  </section>
                  {customerDetails?.man_cs_approval==="approved" &&<section
                    className="text-center px-[10px] py-[2px]  pt-[3px] h-[24px] ml-2 bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline"
                    onClickCapture={() => {
                      openDemandFun()
                    }}
                  >
                    NEW DEMAND
                  </section>}
                </section>
              </section>
            </div>
          </div>
        </div>
        {statusValidError && (
          <div className=" border-b border-[#ffe6bc]  bg-[#ffe6bc]">
            <div className="w-full border-b border-[#ffe6bc]  bg-[#f69c10] "></div>
            <div className=" w-full flex flex-row justify-between pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 ml-1 flex flex-row">
              {' '}
              <section>
                <span className="font-Rubik font-sanF text-[#844b00] font-[500]   text-[11px]  py-[6px]">
                  {newStatusErrorList}
                </span>
              </section>
              <XIcon
                className="h-4 w-4 mr-2 inline text-green"
                aria-hidden="true"
              />
            </div>
          </div>
        )}
        {/* <div className="flex flex-row justify-between">
          <div className="px-1 py-2 flex flex-row  text-xs  border-t border-[#ebebeb] font-thin   font-bodyLato text-[12px]  py-[6px] ">
            Recent Comments:{' '}
            <span className="text-[#867777] ml-1 ">
              {' '}
              {leadDetailsObj?.Remarks || 'NA'}
            </span>
          </div>
          <div
            className="relative flex flex-col  group"

          >
            <div
              className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"

              style={{ zIndex: '9999' }}
            >
              <span
                className="rounded italian relative mr-2 z-100000 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg"
                style={{
                  color: 'black',
                  background: '#e2c062',
                  maxWidth: '300px',
                }}
              >
                <div className="italic flex flex-col">
                  <div className="font-bodyLato">
                    {Source?.toString() || 'NA'}
                  </div>
                </div>
              </span>
              <div
                className="w-3 h-3  -mt-2 rotate-45 bg-black"
                style={{ background: '#e2c062', marginRight: '12px' }}
              ></div>
            </div>
            <div className=" flex flex-row ">
              <span className="font-bodyLato text-[#867777] text-xs mt-2">


                {Source?.toString() || 'NA'}
              </span>
              <div
                className=" cursor-pointer hover:underline"
                onClickCapture={() => {
                  setTimeHide(!timeHide)
                }}
              >
                {selProjectIs?.uid?.length > 4 &&
                  (timeHide ? (
                    <XIcon
                      className="h-4 w-4  inline text-green"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="px-[3px]  ml-1  text-[#318896]  text-[10px] text-[#] font-semibold">
                      {' '}
                      <AdjustmentsIcon
                        className="h-4 w-4  inline text-[#318896] "
                        aria-hidden="true"
                      />
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div> */}
        {timeHide && (
          <>
            <div className="w-full border-b border-[#ebebeb]"></div>
            <div className=" w-full  pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 ml-1 flex flex-row justify-between">
              {' '}
              <section>
                <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
                  Created On
                  <span className="text-[#867777] ck ml-2">
                    {CT != undefined
                      ? prettyDateTime(CT)
                      : prettyDateTime(Date)}
                  </span>
                </span>
              </section>
              <section>
                <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
                  Updated On :
                  <span className="text-[#867777] ck ml-2">
                    {stsUpT === undefined
                      ? 'NA'
                      : prettyDateTime(stsUpT) || 'NA'}
                  </span>
                </span>
              </section>
              <section>
                <span className="font-thin text-[#867777]   font-bodyLato text-[9px]  py-[6px]">
                  Assigned On
                  <span className="text-[#867777] ck ml-2">
                    {assignT != undefined
                      ? prettyDateTime(assignT)
                      : prettyDateTime(Date)}
                  </span>
                </span>
              </section>
            </div>
          </>
        )}
      </div>

      <UnitFullSummary
        customerDetails={customerDetails}
        selCustomerPayload={selCustomerPayload}
      />

      {selFeature === 'legal_info' && <></>}
      <SiderForm
        open={openCapturePayment}
        setOpen={setOpenCapturePayment}
        title={'capturePayment'}
        unitsViewMode={false}
        widthClass="max-w-xl"
        selUnitDetails={selCustomerPayload}
        paymentCaptureFun={paymentCaptureFun}
      />
      <SiderForm
        open={newDemand}
        setOpen={setOpenNewDemand}
        title={'newDemand'}
        unitsViewMode={false}
        widthClass="max-w-xl"
        selUnitDetails={selCustomerPayload}
        paymentCaptureFun={demandCaptureFun}
      />
    </div>
  )
}
