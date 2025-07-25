/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useEffect, useState } from 'react'
import { Menu } from '@headlessui/react'
import { Listbox, Transition } from '@headlessui/react'
import {
  ArrowRightIcon,
  PhoneIcon,
  DeviceMobileIcon,
  MailIcon,
} from '@heroicons/react/outline'
import CalendarIcon from '@heroicons/react/outline/CalendarIcon'
import {
  BadgeCheckIcon,
  CheckIcon,
  CheckCircleIcon,
  DocumentIcon,
  EyeIcon,
  ViewBoardsIcon,
  ViewGridIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  AdjustmentsIcon,
  XIcon,
} from '@heroicons/react/solid'
import { SelectorIcon, DownloadIcon } from '@heroicons/react/solid'
import ClockIcon from '@heroicons/react/solid/ClockIcon'
import PlusCircleIcon from '@heroicons/react/solid/PlusCircleIcon'
import {
  ArrowBackRounded,
  ConstructionOutlined,
  DriveEtaOutlined,
  VerticalAlignBottom,
} from '@mui/icons-material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ErrorMessage, Form, Formik, useFormik } from 'formik'
import DatePicker from 'react-datepicker'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'

import {
  addLeadScheduler,
  updateSch,
  deleteSchLog,
  steamLeadActivityLog,
  steamLeadScheduleLog,
  steamUsersListByRole,
  updateLeadAssigTo,
  updateLeadStatus,
  updateSchLog,
  addLeadNotes,
  steamLeadNotes,
  createAttach,
  getCustomerDocs,
  getUser,
  getAllProjects,
  updateLeadProject,
  steamLeadById,
  updateLeadRemarks_NotIntrested,
  updateLeadRemarks_VisitDone,
  undoSchLog,
  editTaskDB,
  editAddTaskCommentDB,
  updateLeadLastUpdateTime,
  IncrementTastCompletedCount,
  IncrementTastTotalCount,
  decreCountOnResheduleOtherDay,
} from 'src/context/dbQueryFirebase'
import { useAuth } from 'src/context/firebase-auth-context'
import { storage } from 'src/context/firebaseConfig'
import {
  getDifferenceInDays,
  getDifferenceInHours,
  getDifferenceInMinutes,
  prettyDate,
  prettyDateTime,
  timeConv,
} from 'src/util/dateConverter'
import { CustomSelect } from 'src/util/formFields/selectBoxField'

import LogSkelton from './shimmerLoaders/logSkelton'
import SortComp from './sortComp'

import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'

import StatusDropComp from './statusDropComp'
import AssigedToDropComp from './assignedToDropComp'
import Loader from './Loader/Loader'
import ProjPhaseHome from './ProjPhaseHome/ProjPhaseHome'

import { useSnackbar } from 'notistack'
import { async } from '@firebase/util'

import SelectDropDownComp from './comps/dropDownhead'
import EditLeadTask from './Comp_CustomerProfileSideView/EditLeadTask'
import AddLeadTaskComment from './Comp_CustomerProfileSideView/AddLeadTaskComment'
import LeadTaskDisplayHead from './Comp_CustomerProfileSideView/LeadTaskDisplayHead'
import LeadTaskFooter from './Comp_CustomerProfileSideView/LeadTaskFooter'

import { USER_ROLES } from 'src/constants/userRoles'
import { currentStatusDispFun } from 'src/util/leadStatusDispFun'
import { sendWhatAppTextSms1 } from 'src/util/axiosWhatAppApi'

import EmailForm from './customerProfileView/emailForm'
import Confetti from './shared/confetti'

import '../styles/myStyles.css'
import { Slider } from '@mui/material'

import { getWhatsAppTemplates } from 'src/util/TuneWhatsappMsg'
import CustomDatePicker from 'src/util/formFields/CustomDatePicker'
import { ChevronRight, Edit, Mail, MapPin, Phone, User } from 'lucide-react'
import ActivityLogComp from './activityLog'
import RoundedProgressBar from './A_CrmModule/Reports/RoundedProgressBar'
import SiderForm from './SiderForm/SiderForm'

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
  // { label: 'Select Reason', value: '' },
  { label: 'Budget Issue', value: 'budget_issue' },

  {
    label: 'Looking for Different Area & Property',
    value: 'differeent_area_options',
  },
  { label: 'Looking for Different Area', value: 'differeent_area' },
  { label: 'Looking for Different Property', value: 'differeent_options' },
  { label: 'Not happy with the development & quality', value: 'nh_dev_qual' },

  { label: 'Need more time', value: 'Need_more_time' },
  {
    label: 'Not Looking for any property',
    value: 'not_looking_for_any_property',
  },
  { label: 'just doing property research', value: 'property_research' },
  { label: 'Others', value: 'others' },

  // { label: 'Follow Up', value: 'followup' },
  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]
const junktOptions = [
  // { label: 'Select Reason', value: '' },
  { label: 'Phone no invalid', value: 'phone_no_invalid' },

  {
    label: 'Fake Customer',
    value: 'fake_customer',
  },
  { label: 'RNR from Long Time', value: 'long_time_rnr' },

  // { label: 'Follow Up', value: 'followup' },
  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]

const siteVisitFeedbackOptions = [
  // { label: 'Visit Feedback', value: '' },
  { label: 'Happy', value: 'happy' },
  {
    label: 'Sad',
    value: 'sad',
  },
  { label: 'Neutral', value: 'neutral' },
  { label: 'Want more options', value: 'more_options' },

  { label: 'Others', value: 'others' },

  // { label: 'Follow Up', value: 'followup' },
  // { label: 'RNR', value: 'rnr' },
  // { label: 'Dead', value: 'Dead' },
]
const lookingAtBudgetRange = [
  { label: 'less than 25 lakhs', value: 'less25L', str: 10 },
  { label: 'less than 50 lakhs', value: 'less50L', str: 20 },
  { label: 'less than 1 Cr', value: 'less1Cr', str: 30 },
  { label: 'less than 1.5 Cr', value: 'less1.5Cr', str: 40 },
  { label: 'less than 2 Cr', value: 'less2Cr', str: 50 },
]
const exitstingAsset = [
  { label: 'Plot', value: 'plot', str: 10 },
  { label: 'Apartment', value: 'apartment', str: 20 },
  { label: 'Villa', value: 'villa', str: 30 },
  { label: 'Apartment & Villa', value: 'apart_villa', str: 40 },
  { label: 'Plot & Apartment', value: 'plot_villa', str: 50 },
  { label: 'Others', value: 'other', str: 60 },
]
const reasonPurchase = [
  { label: 'Living', value: 'living', str: 10 },
  { label: 'Commercial', value: 'Commercial', str: 20 },
  { label: 'Rental', value: 'renatal', str: 30 },
  { label: 'Investment', value: 'investment', str: 40 },
]
const preferredArea = [
  { label: 'East Banglore', value: 'eastBanglore', str: 10 },
  { label: 'West Banglore', value: 'westBanglore', str: 20 },
  { label: 'North Banglore', value: 'northBanglore', str: 30 },
  { label: 'South Banglore ', value: 'southBanglore', str: 40 },
]
const torrowDate = new Date(
  +new Date().setHours(0, 0, 0, 0) + 86400000
).getTime()
const todaydate = new Date()
const ddMy =
  'D' +
  todaydate.getDate() +
  'M' +
  todaydate.getMonth() +
  'Y' +
  todaydate.getFullYear()

export default function LeadProfileSideView({
  openUserProfile,
  customerDetails,
  unitViewerrr,
  unitsViewMode,
  setUnitsViewMode,
}) {
  const { user } = useAuth()
  const { orgId } = user
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [uploadFile, setUploadFile] = useState()
  const [postPoneToFuture, setPostPoneToFuture] = useState('present')

  // const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('lead_summary')
  const [myStatus, setMyStatus] = useState('')
  const [tempLeadStatus, setLeadStatus] = useState('')
  const [assignerName, setAssignerName] = useState('')
  const [assignedTo, setAssignedTo] = useState('')
  const [timeHide, setTimeHide] = useState(false)

  const [optionvalues, setoptionvalues] = useState({
    budget: '',
    bstr: 0,
    purchase: '',
    pstr: 0,
    area: '',
    astr: 0,
    asset: '',
    asstr: 0,
  })
  const [opstr, setopstr] = useState(0)
  const [showNotInterested, setShowNotInterested] = useState(false)
  const [showJunk, setShowJunk] = useState(false)

  const [junkReason, setJunkReason] = useState('Phone no Invalid')
  const [leadsActivityFetchedData, setLeadsFetchedActivityData] = useState([])
  const [leadSchLoading, setLeadsSchLoading] = useState(true)

  const [leadSchFetchedData, setLeadsFetchedSchData] = useState([])
  const [leadNotesFetchedData, setLeadsFetchedNotesData] = useState([])
  const [showVisitFeedBackStatus, setShowVisitFeedBackStatus] = useState(false)
  const [leadSchFilteredData, setLeadsFilteredSchData] = useState([])
  const [takTitle, setTakTitle] = useState('')
  const [takNotes, setNotesTitle] = useState('')
  const [fbTitle, setFbTitle] = useState('')
  const [fbNotes, setfbNotes] = useState('')
  const [attachType, setAttachType] = useState('')
  const [notInterestType, setNotInterestType] = useState('')
  const [attachTitle, setAttachTitle] = useState('')
  const [filterData, setFilterData] = useState([])
  const [docsList, setDocsList] = useState([])
  const [progress, setProgress] = useState(0)
  const [editTaskObj, setEditTaskObj] = useState({})
  const [selType, setSelType] = useState('')

  const d = new window.Date()
  const [value, setValue] = useState(d)

  // const [startDate, setStartDate] = useState(d)
  const [startDate, setStartDate] = useState(d.getTime() + 60000)

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
  const [statusTimeLineA, setStatusTimeLineA] = useState(['new'])
  const [selSchGrpO, setSelSchGrpO] = useState({})
  const [closeTask, setCloseTask] = useState(false)

  const [leadNextTaskObj, setLeadNextTaskObj] = useState({})

  const [selProjectIs, setSelProjectIs] = useState({
    eventName: '',
    uid: '',
  })
  // email formik
  const emailFormik = useFormik({
    initialValues: {
      fromEmail: '',
      toEmail: '',
      subject: '',
      message: '',
      attachFile: '',
    },

    onSubmit: (values) => {
      console.log(values)
    },
  })

  const [leadDetailsObj, setLeadDetailsObj] = useState({})
  const [addTaskCommentObj, setAddTaskCommentObj] = useState({})
  const [addCommentPlusTask, setAddCommentPlusTask] = useState(false)
  const [addCommentTitle, setAddCommentTitle] = useState('')
  // const [addCommentTime, setAddCommentTime] = useState(
  //   setHours(setMinutes(d, 30), 16)
  // )

  const [addCommentTime, setAddCommentTime] = useState(d.getTime() + 60000)
  const {
    id,
    Name,
    Event,
    projectType,
    ProjectId,
    Source,
    // Status,
    by,
    Mobile,
    Date,
    Email,
    Assigned,
    AssignedBy,
    Notes,
    Timeline,
    documents,
    Remarks,
    notInterestedReason,
    notInterestedNotes,
    stsUpT,
    assignT,
    CT,
  } = customerDetails

  const { enqueueSnackbar } = useSnackbar()
  const [hover, setHover] = useState(false)
  const [hoverId, setHoverID] = useState(1000)
  const [hoverTasId, setHoverTasId] = useState(2000)
  const [streamCoveredA, setStreamCoveredA] = useState([])
  const [streamCurrentStatus, setStreamCurrentStatus] = useState('new')
  const [streamfrom, setStreamFrom] = useState('')

  const [closePrevious, setClosePrevious] = useState(false)

  useEffect(() => {
    setopstr(
      optionvalues.asstr +
      optionvalues.astr +
      optionvalues.bstr +
      optionvalues.pstr
    )
  }, [optionvalues])

  useEffect(() => {
    //   get lead data by id
    streamLeadDataFun()
  }, [])

  useEffect(() => {
    //   get project Id
    // add project details

    // projectList
    console.log('my stuff ', selProjectIs?.uid, ProjectId)

    const z = projectList.filter((da) => {
      return da.uid == (selProjectIs?.uid || ProjectId)
    })
    const z1 = {
      ...z[0],
    }
    setSelProjectIs(z1)
    console.log('my stuff ', z, selProjectIs, z1, ProjectId)
  }, [projectList, customerDetails])

  useEffect(() => {
    const { schTime } = addTaskCommentObj
    if (schTime) {
      setStartDate(schTime)
    }
  }, [addTaskCommentObj])
  useEffect(() => {
    const { schTime } = editTaskObj
    if (schTime) {
      setStartDate(schTime)
    }
  }, [editTaskObj])

  const streamLeadDataFun = () => {
    const { id } = customerDetails
    console.log('customer details', customerDetails)
    const z = steamLeadById(
      orgId,
      (querySnapshot) => {
        const SnapData = querySnapshot.data()
        SnapData.id = id
        setLeadDetailsObj(SnapData)
      },
      { uid: id },
      () => {
        console.log('error')
      }
    )
  }

  useEffect(() => {
    const { coveredA, Status, from } = leadDetailsObj
    if (coveredA) {
      setStreamCoveredA(coveredA)
    } else {
      setStreamCoveredA([])
    }
    setStreamCurrentStatus(Status)
    setStreamFrom(from || '')
  }, [leadDetailsObj])

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
        setusersList(usersListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }, [])
  useEffect(() => {
    let x = []
    if (selFilterVal === 'all') {
      x = leadSchFetchedData.filter((d) => d?.schTime != undefined)
    } else {
      x = leadSchFetchedData.filter(
        (d) => d?.schTime != undefined && d?.sts === selFilterVal
      )
    }
    console.log('xo xo xo', x)
    setLeadsFilteredSchData(x)
  }, [leadSchFetchedData, selFilterVal])


  useEffect(() => {
    if (leadSchFilteredData?.length > 0) {
      const x = leadSchFilteredData[0]
      let y =
        // Math.abs(getDifferenceInHours(x?.schTime, '')) <= 24 &&
        getDifferenceInHours(x?.schTime, '') >= 0
          ? true
          : false
      x.comingSoon = y
      setLeadNextTaskObj(x)
    }
  }, [leadSchFilteredData])

  useEffect(() => {
    setAssignedTo(customerDetails?.assignedTo)
    setAssignerName(customerDetails?.assignedToObj?.label)
    // setSelProjectIs({ eventName: Event, uid: ProjectId })
    setStatusTimeLineA(
      [...statusTimeLineA, ...(customerDetails?.coveredA?.a || [])] || ['new']
    )

    console.log('project o', projectType)
    // setLeadStatus(Status)
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
    } else if (selFeature === 'documents') {
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
      let x = []
      if (selFeature != 'timeline') {
        x = leadsActivityFetchedData?.filter((data) => data.type === fet)
      } else {
        x = leadsActivityFetchedData
      }

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
  const receiverDetails = {
    customerName: Name,
    executiveName: assignerName,
    receiverPhNo: Mobile,
  }
  const msgPayload = {
    eventName: Event,
    broucherLink: '',
    locLink: '',
    projContactNo: '',
    scheduleTime: startDate,
  }

  const getCustomerDocsFun = () => {
    const unsubscribe = getCustomerDocs(
      orgId,
      id,
      (querySnapshot) => {
        const projects = querySnapshot.docs.map((docSnapshot) =>
          docSnapshot.data()
        )
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
          user.label = user.eventName
          user.value = user.eventName
        })
        setprojectList(projectsListA)
      },
      (error) => setfetchedUsersList([])
    )

    return unsubscribe
  }
  useEffect(() => {
    // setLeadStatus(Status?.toLowerCase())
  }, [customerDetails])

  const setAssigner = (leadDocId, value) => {
    const projId = selProjectIs?.uid || ProjectId
    if (assignedTo != value.value) {
      setAssignerName(value.name)
      setAssignedTo(value.value)
      // save assigner Details in db
      const x = leadDetailsObj?.Status || 'unassigned'
      // check if there any pending lead with scheduleTime < tomorrow and send count
      const todayTasksIncre = leadSchFetchedData?.filter(
        (d) => d?.sts === 'pending' && d?.schTime < torrowDate
      ).length
      const txt = `A New Lead is assigned to ${value.name} with ${todayTasksIncre} tasks`
      updateLeadAssigTo(
        orgId,
        projId,
        leadDocId,
        value,
        assignedTo,
        x,
        leadDetailsObj,
        todayTasksIncre,
        txt,
        by
      )

      const receiverDetails = {
        customerName: Name,
        executiveName: value.name,
        receiverPhNo: Mobile,
        executivePh: value?.offPh,
        executiveEmail: value?.email,
      }

      if (x == 'new' || x == 'unassigned') {
        getWhatsAppTemplates(
          'on_lead_assign',
          'wa',
          'customer',
          // 'ProjectId',
          projId,
          receiverDetails,
          msgPayload
        )
      } else {
        getWhatsAppTemplates(
          'on_reassign',
          'wa',
          'customer',
          // 'ProjectId',
          projId,
          receiverDetails,
          msgPayload
        )
      }
    }
  }
  const setNewProject = (leadDocId, value) => {
    // setProjectName(value.eventName)
    // setProjectId(value.uid)
    // save assigner Details in db
    // eventName
    const x = {
      Event: value.eventName,
      ProjectId: value.uid,
    }
    setSelProjectIs(value)
    updateLeadProject(orgId, leadDocId, x)

    // const receiverDetails = {
    //   customerName: Name,
    //   executiveName: assignerName,
    //   receiverPhNo: Mobile,
    // }
    // getWhatsAppTemplates(
    //   'on_reassign',
    //   'wa',
    //   'customer',
    //   // 'ProjectId',
    //   x.ProjectId,
    //   receiverDetails,
    //   msgPayload
    // )
    // updateLeadAssigTo(leadDocId, value, by)
  }

  const setShowNotInterestedFun = (scheduleData, value) => {
    setSelSchGrpO(scheduleData)

    cancelResetStatusFun()

    setLeadStatus('notinterested')

    setShowVisitFeedBackStatus(false)

    setShowNotInterested(true)

    // setFeature('appointments')
  }
  const setShowVisitFeedBackStatusFun = (scheduleData, value) => {
    setSelSchGrpO(scheduleData)
    cancelResetStatusFun()
    setLeadStatus('visitdone')
    setShowNotInterested(false)
    setShowVisitFeedBackStatus(true)
  }

  const setStatusFun = async (leadDocId, newStatus) => {
    cancelResetStatusFun()
    setLoader(true)
    setClosePrevious(true)
    if (newStatus == 'visitdone') {
      enqueueSnackbar(`Mark VISIT-DONE  from VISIT-FIXED Task`, {
        variant: 'error',
      })

      return
    }

    setLeadStatus(newStatus)

    const arr = ['visitdone', 'visitcancel']
    if (newStatus === 'visitdone') {
      setFeature('visitDoneNotes')
    } else if (newStatus === 'visitcancel') {
      setFeature('visitCancelNotes')
    } else if (newStatus === 'notinterested') {
      setShowNotInterestedFun({}, '')
    } else if (newStatus === 'junk') {
      setLoader(false)
      setShowJunk(true)
    } else {
      arr.includes(newStatus) ? setFeature('notes') : setFeature('appointments')
      arr.includes(newStatus) ? setAddNote(true) : setAddSch(true)
      if (newStatus === 'followup') {
        await setTakTitle(
          `Make a followup Call to ${customerDetails?.Name || 'Customer'} `
        )
      } else if (newStatus === 'visitfixed') {
        await setTakTitle(
          `${customerDetails?.Event || 'Site'} visit @${customerDetails?.Name || 'Customer'
          }   `
        )
      } else if (newStatus === 'booked') {
        setLeadStatus('booked')
        await setTakTitle('Share the Details with Stalls team')
        // await fAddSchedule()
      } else {
        setTakTitle(' ')
      }
    }

    //
    // updateLeadStatus(leadDocId, newStatus)
    // toast.success('Status Updated Successfully')
  }

  const downloadFile = (url) => {
    window.location.href = url
  }
  const getLeadsDataFun = async () => {
    const steamLeadLogs = await steamLeadActivityLog(
      orgId,
      'snap',
      {
        uid: id,
      },
      (error) => setLeadsFetchedActivityData([])
    )

    await setLeadsFetchedActivityData(steamLeadLogs)

    const unsubscribe = steamLeadActivityLog(
      orgId,
      (doc) => {
        const usersList = doc.data()
        const usersListA = []

        Object.entries(usersList).forEach((entry) => {
          const [key, value] = entry
          usersListA.push(value)
        })
        // for (const key in usersList) {
        //   if (usersList.hasOwnProperty(key)) {
        //     console.log(`${key} : ${usersList[key]}`)
        //     console.log(`my total fetched list is 2 ${usersList[key]}`)
        //   }
        // }

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
        setLeadsSchLoading(true)
        const usersList = doc.data()
        const usersListA = []

        const sMapStsA = []
        const { staA, staDA } = usersList
        setschStsA(staA)
        setschStsMA(staDA)
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

        setLeadsFetchedSchData(
          usersListA.sort((a, b) => {
            return b.schTime - a.schTime
          })
        )
        setLeadsSchLoading(false)
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
      orgId,
      (doc) => {
        const usersList = doc.data()
        const usersListA = []

        Object?.entries(usersList)?.forEach((entry) => {
          const [key, value] = entry
          usersListA.push(value)
        })
        usersListA?.sort((a, b) => {
          return b.ct - a.ct
        })
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
    const y = takTitle === '' ? addCommentTitle : takTitle
    if (closePrevious) {
      closeAllPerviousTasks(`${y}`)
    }

    const data = {
      stsType: tempLeadStatus || 'none',
      assTo: user?.displayName || user?.email,
      assToId: user.uid,
      by: user?.displayName || user?.email,
      cby: user.uid,
      type: 'schedule',
      pri: selected?.name,
      notes: y === '' ? `Negotiate with customer` : y,
      sts: 'pending',
      schTime:
        tempLeadStatus === 'booked'
          ? Timestamp.now().toMillis() + 10800000
          : startDate.getTime(),
      ct: Timestamp.now().toMillis(),
    }

    const x = schStsA

    x.push('pending')
    setschStsA(x)
    // addSchedulerLog(orgId,id, data)
    //  get assignedTo Led

    await addLeadScheduler(orgId, id, data, schStsA, assignedTo)

    // for booked status this startDate might not exists
    if (
      (startDate?.getTime() || Timestamp.now().toMillis() + 10800000) <
      torrowDate
    ) {
      try {
        IncrementTastTotalCount(
          orgId,
          assignedTo,
          ddMy,
          tempLeadStatus,
          1,
          `New Task-${tempLeadStatus}`
        )
      } catch (error) {
        enqueueSnackbar('error in updating ur performance', {
          variant: 'error',
        })
      }
    }

    const { name } = assignedTo

    if (streamCurrentStatus != tempLeadStatus) {
      updateLeadStatus(
        orgId,
        ProjectId,
        id,
        streamCurrentStatus,
        tempLeadStatus,
        user?.email,
        enqueueSnackbar
      )

      console.log('not interested', tempLeadStatus)

      if (tempLeadStatus === 'visitfixed') {
        getWhatsAppTemplates(
          'on_sitevisit_fix',
          'wa',
          'customer',
          // 'ProjectId',
          ProjectId,
          receiverDetails,
          msgPayload
        )
      } else if (tempLeadStatus === 'visitdone') {
        getWhatsAppTemplates(
          'on_sitevisit_done',
          'wa',
          'customer',
          // 'ProjectId',
          ProjectId,
          receiverDetails,
          msgPayload
        )
      } else if (tempLeadStatus === 'booking') {
        getWhatsAppTemplates(
          'on_booking',
          'wa',
          'customer',
          // 'ProjectId',
          ProjectId,
          receiverDetails,
          msgPayload
        )
      }
    }
    await setTakTitle('')
    await setAddSch(false)
    await setLoader(false)
  }

  const cancelResetStatusFun = () => {
    setCloseTask(false)
    setClosePrevious(false)
    setEditTaskObj({})
    setAddTaskCommentObj({})
    setAddCommentTitle('')
    // setAddCommentTime('')
    setAddCommentPlusTask(false)
    setTakTitle('')
    setStartDate(setHours(setMinutes(d, 30), 16))
    setShowNotInterested(false)
    setShowJunk(false)
    setShowVisitFeedBackStatus(false)
    setAddSch(false)
    setAddNote(false)
    // if its not edit mode ignore it
    setLeadStatus(streamCurrentStatus)
    setLoader(false)
  }
  const fUpdateSchedule = async (data, actionType, count) => {
    if (data?.sts != 'completed') {
      const tmId = data.ct
      const newTm = Timestamp.now().toMillis() + 10800000 + 5 * 3600000

      await updateSch(
        orgId,
        id,
        tmId,
        newTm,
        schStsA,
        assignedTo,
        actionType,
        count
      )
      await setTakTitle('')
      await setAddSch(false)
    }
  }
  const handleColor = (time) => {
    return time.getHours() > 12 ? 'text-success' : 'text-error'
  }

  const setTitleFun = (e) => {
    setTakTitle(e.target.value)
  }
  const doneFun = (data) => {
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    x[inx] = 'completed'
    setschStsA(x)

    updateSchLog(orgId, id, data.ct, 'completed', schStsA)
  }
  const EditTaskOpenWindowFun = (data) => {
    cancelResetStatusFun()
    setEditTaskObj(data)
    setTakTitle(data?.notes || '')
    setStartDate(setHours(setMinutes(data?.schTime, 30), 16))

    // const inx = schStsMA.indexOf(data.ct)
    // const x = schStsA
    // x[inx] = 'completed'
    // setschStsA(x)

    // updateSchLog(orgId, id, data.ct, 'completed', schStsA)
  }
  const editTaskFun = (data) => {
    const inx = schStsMA.indexOf(data.ct)
    data.schTime = startDate
    data.notes = takTitle
    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)

    editTaskDB(orgId, id, data.ct, 'pending', schStsA, data)
    if (leadDetailsObj?.Status == 'visitfixed') {
      getWhatsAppTemplates(
        'on_sitevisit_reschedule',
        'wa',
        'customer',
        ProjectId,
        receiverDetails,
        msgPayload
      )
    }
    cancelResetStatusFun()
  }
  const addTaskCommentFun = async (data) => {
    await setTakTitle(addCommentTitle)
    const inx = schStsMA.indexOf(data.ct)
    data.comments = [
      {
        c: addCommentTitle,
        t: Timestamp.now().toMillis(),
      },
      ...(data?.comments || []),
    ]
    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)
    if (addCommentPlusTask) {
      await setTakTitle(addCommentTitle)
      await fAddSchedule()
      // mark current task as done
      await editAddTaskCommentDB(orgId, id, data.ct, 'pending', schStsA, data)
      if (data?.stsType != 'visitfixed') {
        await doneFun(data)
      }
      await cancelResetStatusFun()
    } else {
      if (closeTask) {
        doneFun(data)
      }
      if (selType === 'reschedule') {
        // rescheduleTaskDB(orgId, id, data.ct, 'pending', schStsA, addCommentTime)
        data.schTime = addCommentTime
      }
      await editAddTaskCommentDB(orgId, id, data.ct, 'pending', schStsA, data)
      await updateLeadLastUpdateTime(
        orgId,
        id,
        Timestamp.now().toMillis(),
        addCommentTime
      )
      if (postPoneToFuture === 'present2Future') {
        await decreCountOnResheduleOtherDay(
          orgId,
          user?.uid,
          ddMy,
          `${leadDetailsObj?.Status}`,
          1,
          'Lead Posted'
        )
        setPostPoneToFuture('present')
      } else if (postPoneToFuture === 'Future2Present') {
        IncrementTastTotalCount(
          orgId,
          user?.uid,
          ddMy,
          `${leadDetailsObj?.Status}`,
          1,
          'Lead Posted'
        )
        setPostPoneToFuture('present')
      }
      await cancelResetStatusFun()
    }
  }

  const notInterestedFun = async () => {
    await closeAllPerviousTasks('closed by Not-Interested')
    //3) set status as not interested
    await fAddNotes()
    await getWhatsAppTemplates(
      'on_not_interested',
      'wa',
      'customer',
      ProjectId,
      receiverDetails,
      msgPayload
    )
    await cancelResetStatusFun()
    return
    data.comments = [
      {
        c: `${fbTitle}-${fbNotes}`,
        t: Timestamp.now().toMillis() + 21600000,
      },
      ...(data?.comments || []),
    ]
    await setTakTitle('Negotiate with customer')

    await editAddTaskCommentDB(orgId, id, data.ct, 'pending', schStsA, data)

    await doneFun(data)
    await fAddSchedule()

    // update status + remarks + fbTitle + fbNotes
    await fAddNotes()
    await setSelSchGrpO({})

    await cancelResetStatusFun()

    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)
  }
  const closeAllPerviousTasks = async (closingComments) => {
    const pendingTaskAObj = leadSchFetchedData.filter(
      (d) => d?.schTime != undefined && d?.sts === 'pending'
    )
    // const inx = schStsMA.indexOf(data.ct)
    pendingTaskAObj?.map(async (pendObj) => {
      //1)add comment on task

      //2) mark the tasks as done
      //3) set status as not interested

      // 1) add comment on task
      pendObj.comments = [
        {
          c: closingComments,
          t: Timestamp.now().toMillis() + 21600000,
        },
        ...(pendObj?.comments || []),
      ]
      await editAddTaskCommentDB(
        orgId,
        id,
        pendObj.ct,
        'pending',
        schStsA,
        pendObj
      )
      //2) mark the tasks as done
      await doneFun(pendObj)
      if (pendObj?.schTime < torrowDate) {
        await IncrementTastCompletedCount(
          orgId,
          user?.uid,
          ddMy,
          `${leadDetailsObj?.Status}_comp`,
          1,
          'A Task Closed by change status'
        )
      }
    })
  }
  const closeTaskFun = async (data) => {
    if (data?.stsType === 'visitfixed') {
      setShowVisitFeedBackStatusFun(data, 'visitdone')
    } else {
      if (leadSchFetchedData?.filter((d) => d?.sts === 'pending').length != 1) {
        setAddTaskCommentObj(data)
        setCloseTask(true)
      } else {
        enqueueSnackbar(
          `Oops..! You can close this task by changing Lead status`,
          {
            variant: 'error',
          }
        )
      }
    }
  }
  const addFeedbackFun = async (data) => {
    const inx = schStsMA.indexOf(data.ct)

    data.comments = [
      {
        c: `${fbTitle}-${fbNotes}`,
        t: Timestamp.now().toMillis() + 21600000,
      },
      ...(data?.comments || []),
    ]

    await setTakTitle('Negotiate with customer')

    // await editAddTaskCommentDB(orgId, id, data.ct, 'pending', schStsA, data)
    closeAllPerviousTasks(`${fbTitle}-${fbNotes}`)

    await doneFun(data)
    await fAddSchedule()

    // update status + remarks + fbTitle + fbNotes
    await fAddNotes()
    await setSelSchGrpO({})

    await cancelResetStatusFun()

    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)
  }
  const undoFun = (data) => {
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    x[inx] = 'pending'
    setschStsA(x)

    undoSchLog(orgId, id, data.ct, 'pending', schStsA, data)
  }
  const delFun = (data) => {
    const inx = schStsMA.indexOf(data.ct)
    const x = schStsA
    const y = schStsMA
    x.splice(inx, 1)
    y.splice(inx, 1)
    setschStsA(x)
    setschStsMA(y)

    deleteSchLog(orgId, id, data.ct, 'completed', schStsA, schStsMA, data)
  }

  const selFun = () => {
    setAddNote(true)
  }

  const showAddAttachF = () => {
    setAttach(true)
  }

  const activieLogNamer = (dat) => {
    const { type, from, to, by } = dat
    let tex = type

    switch (type) {
      case 'l_ctd':
        return (tex = 'Lead Created')
      case 'sts_change':
        return (tex = `completed & moved to`)
      case 'assign_change':
        return (tex = `Lead Assigned To`)
      default:
        return (tex = type)
    }
    return tex
  }

  const empNameSetter = (emp_id) => {
    const userIsA = usersList?.filter((userD) => {
      return userD?.uid == emp_id
    })
    if (userIsA[0]) {
      const { email } = userIsA[0] || []
      return email
    } else {
      // const getUserDetails =  getUser(emp_id)
      return emp_id
    }
  }

  const fAddNotes = async () => {
    //  make it as notInterested if source is from NotInterestedd Page
    const data = {
      by: user.email,
      type: 'notes',
      notes: takNotes,
      ct: Timestamp.now().toMillis(),
    }

    await addLeadNotes(orgId, id, data)
    if (tempLeadStatus === 'notinterested') {
      const dat = {
        from: streamCurrentStatus,
        Status: tempLeadStatus,
        notInterestedReason: takTitle === '' ? fbTitle : takTitle,
        notInterestedNotes: takNotes === '' ? fbNotes : takNotes,
        stsUpT: Timestamp.now().toMillis(),
        Remarks: `${notInterestType}-${takNotes}`,
      }
      updateLeadRemarks_NotIntrested(
        orgId,
        id,
        dat,
        user.email,
        enqueueSnackbar
      )
      setLeadStatus('notinterested')
      cancelResetStatusFun()
    } else if (tempLeadStatus === 'junk') {
      const dat = {
        from: streamCurrentStatus,
        Status: tempLeadStatus,
        stsUpT: Timestamp.now().toMillis(),
        Remarks: `${junkReason}`,
      }
      updateLeadRemarks_NotIntrested(
        orgId,
        id,
        dat,
        user.email,
        enqueueSnackbar
      )
      setLeadStatus('junk')
      cancelResetStatusFun()
    } else if (tempLeadStatus === 'visitdone') {
      const covA = [
        ...(customerDetails?.coveredA || []),
        ...['visitfixed', 'visitdone'],
      ]

      const dat = {
        coveredA: covA,
        from: streamCurrentStatus,
        Status: 'negotiation',
        VisitDoneReason: fbTitle,
        VisitDoneNotes: fbNotes,
        stsUpT: Timestamp.now().toMillis(),
        Remarks: `${fbTitle}-${fbNotes}`,
      }
      updateLeadRemarks_VisitDone(orgId, id, dat, user.email, enqueueSnackbar)
      doneFun(selSchGrpO)
      setSelSchGrpO({})
      setLeadStatus('negotiation')
      cancelResetStatusFun()
    }

    await setNotesTitle('')
    await setAddNote(false)
  }

  const docUploadHandler = async (e) => {
    e.preventDefault()
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
  const initialState1 = {
    notesText: '',
    source: '',
  }
  const validateSchema1 = Yup.object({
    notesText: Yup.string()
      .max(180, 'Must be 180 characters or less')
      .required('Notes Text is  Required'),
  })
  const initialState = {
    taskTitle: takTitle || '',
  }
  const initialCommentState = {
    commentTitle: addCommentTitle || '',
    source: '',
  }
  const validateCommentsSchema = Yup.object({
    commentTitle: Yup.string()
      .max(180, 'Must be 180 characters or less')
      .required('Comment Title Required'),
  })
  const validateSchema = Yup.object({
    taskTitle: Yup.string()
      .max(180, 'Must be 180 characters or less')
      .required('Task Title Required'),
  })
  const StatusListA = [
    { label: 'New', value: 'new', logo: 'FireIcon', color: ' bg-violet-500' },
    {
      label: 'FollowUp',
      value: 'followup',
      logo: 'RefreshIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Visit Fixed',
      value: 'visitfixed',
      logo: 'FireIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Visit Done',
      value: 'visitdone',
      logo: 'DuplicateInactiveIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Negotiation',
      value: 'negotiation',
      logo: 'CurrencyRupeeIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Booked',
      value: 'booked',
      logo: 'BadgeCheckIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Not Interested',
      value: 'notinterested',
      logo: 'XCircleIcon',
      color: ' bg-violet-500',
    },
    {
      label: 'Junk',
      value: 'junk',
      logo: 'XCircleIcon',
      color: ' bg-violet-500',
    },
  ]
  // const styles = {
  //   .blockHead:after {
  //     color: "#4D81BF",
  //     borderLeft: "20px solid"
  //     borderTop: 20px solid transparent;
  //     borderBottom: 20px solid transparent;
  //     display: inline-block;
  //     content: '';
  //     position: absolute;
  //     right: -20px;
  //     top: 0;
  //   }
  //   .blockHead {
  //     backgroundColor: "#4D81BF",
  //     /*width: 150px; */
  //     height: "40px",
  //     lineHeight: "40px",
  //     display: inline-block;
  //     position: relative;
  //   }
  //   .blocktext {
  //     color: white;
  //     fontWeight: bold;
  //     paddingLeft: 10px;
  //     fontFamily: Arial;
  //     fontSize: 11;
  //   }
  // }
  const hoverEffectFun = (id) => {
    setHoverID(id)
  }
  const hoverEffectTaskFun = (id) => {
    setHoverTasId(id)
  }
  const styleO = {
    normal: {
      width: '100%',
      height: '28px',
      borderWidth: '3px 10px 3px 3px',
      boxSizing: 'border-box',
      borderStyle: 'solid',
      verticalAlign: 'middle',
      cursor: 'pointer',
      textOverflow: 'ellipsis',
      transition: 'all 250ms ease',
      position: 'relative',
      overflow: 'hidden',
      whiteSpace: 'nowrap',

      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%23d3d7dc%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',

      color: 'rgb(51, 51, 51)',
      dataBaseColor: '#2fc6f6',
    },
    completed: {
      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%237BD500%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%237BD500%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
    },

    hover: {
      borderImage:
        'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%2347E4C2%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
    },
  }







  const [isExpanded, setIsExpanded] = useState(false);

  const selProjectFullDetails = {
    projectName: "Shuba Ecosone Phase 2",
    availableCount: 15,
    totalUnitCount: 50,
    planningApproval: "yes",
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };








{/* box track */}
  const [currentStatus, setCurrentStatus] = useState('New');
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredStepId, setHoveredStepId] = useState(null);

  const statusSteps = [
    { label: 'New', value: 'New', completed: true },
    { label: 'Follow Up', value: 'FollowUp', completed: false },
    { label: 'Booked', value: 'Booked', completed: false },
    { label: 'Not interested', value: 'NotInterested', completed: false }
  ];

  const handleStatusClick = (statusValue) => {
    setCurrentStatus(statusValue);
  };

  const handleMouseEnter = (index) => {
    setHoveredStepId(index);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setHoveredStepId(null);
    setIsHovering(false);
  };



    const [isImportLeadsOpen, setisImportLeadsOpen] = React.useState(false)



  return (
    <div
      className={`   h-screen  bg-[#FFFFFF]    ${openUserProfile ? 'hidden' : ''
        } `}
    >

      <div className="h-screen pb-8 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 ">
        {/* <div className="bg-white"> */}
       

          {/* <div className="flex flex-row justify-between">
            <div className=" py-2 flex flex-row  text-xs  border-t border-[#ebebeb] font-thin   font-bodyLato text-[12px]  py-[6px] ">
              Recent Comments:{' '}
              <span className="text-[#867777] ml-1 ">
                {' '}
                {leadDetailsObj?.Remarks || 'NA'}
              </span>
            </div>
            <div
              className="relative flex flex-col  group"
            // style={{ alignItems: 'end' }}
            >
              <div
                className="absolute bottom-0 right-0 flex-col items-center hidden mb-6 group-hover:flex"
                // style={{  width: '300px' }}
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

          {/* {timeHide && (
            <>
              <div className="w-full border-b border-[#ebebeb]"></div>
              <div className=" w-full  pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 flex flex-row justify-between">
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
          )} */}
        {/* </div> */}


        {/* New Code for Testing */}

        {/* box1 track */}


        <div className='bg-white shadow-[0_6px_10px_-4px_rgba(0,0,0,0.08)]  mb-2'>

          
  <div className="max-w-6xl flex flex-col gap-4 mx-auto p-6 bg-white ">


   <div className='border border-[#E5E5E5] rounded-[16px]'>
          {/* Header Section */}
      <div className="flex items-center justify-between px-[24px] py-[12px]">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
            <span className="font-manrope font-bold text-[18px] leading-[100%] tracking-[0%] text-[#1A1A1A]"> {Name?.[0]}</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-manrope font-bold text-[18px] leading-[100%] tracking-[0%] text-[#1A1A1A]">{Name}</h1>
              <Edit className="w-4 h-4 text-orange-500 cursor-pointer" />

            </div>

                 
          </div>

               <div
                              style={{
                                paddingLeft: 12,
                                paddingRight: 12,
                                paddingTop: 12,
                                paddingBottom: 12,
                                overflow: 'hidden',
                                borderRadius: 18,
                                outline:
                                  '1px var(--Secondary-Stroke, #E7E7E9) solid',
                                outlineOffset: '-1px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 5,
                                display: 'inline-flex',
                                height: '20px',
                              }}
                            >
                              <span className="w-3 h-3 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">  {(Source?.toString()?.[0] || 'N').toUpperCase()}</span>

                              <div
                                style={{
                                  color: 'var(--Black, #0D0A1E)',
                                  fontSize: 12,
                                  fontFamily: 'Outfit',
                                  fontWeight: '500',
                                  wordWrap: 'break-word',
                                }}
                              >
                                {Source?.toString() || 'NA'}
                              </div>
                            </div>
        </div>




           
        
        <div className="flex items-center space-x-2">
<section className="flex items-center border border-[#E5E5E5] p-1.5  rounded-[8px]">
  <div className="flex items-center mr-1">
    <User className="w-4 h-4 text-gray-500" />
  </div>
  {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
    <div className='font-body font-medium text-[12px] leading-[16px] tracking-normal align-middle text-[#1A1A1A]'>
      <AssigedToDropComp
        assignerName={assignerName}
        id={id}
        setAssigner={setAssigner}
        usersList={usersList}
        align={undefined}
      />
    </div>
  )}
  {user?.role?.includes(USER_ROLES.CP_AGENT) && (
    <span className="font-body font-medium text-[12px] leading-[16px] tracking-normal align-middle text-[#1A1A1A]">{assignerName}</span>
  )}
</section>




<section className="flex items-center space-x-2  border border-[#E5E5E5]  rounded-[8px] p-1.5">
  <div className="flex  items-center">
    <div className="flex items-center ">
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.9156 3.62121C1.99143 3.77704 1.23143 4.44621 0.929766 5.36871C0.8581 5.58871 0.8531 5.66454 0.8406 6.72204C0.826433 7.93537 0.8356 8.01954 0.9981 8.24454C1.15477 8.46037 1.34393 8.55204 1.70643 8.58621C2.10393 8.62454 2.30727 8.68704 2.55227 8.84537C2.8976 9.06616 3.15016 9.40575 3.26223 9.80002C3.37431 10.1943 3.33816 10.6159 3.1606 10.9854C3.03143 11.2504 2.68893 11.6062 2.44143 11.7312C2.2231 11.842 1.93227 11.9187 1.73143 11.9187C1.38977 11.9187 1.09977 12.0762 0.939766 12.3487L0.849766 12.502V13.6854C0.849766 14.8329 0.852266 14.8762 0.9281 15.1187C1.0513 15.5206 1.27115 15.8862 1.56839 16.1834C1.86563 16.4807 2.2312 16.7005 2.6331 16.8237L2.8831 16.902H17.1164L17.3664 16.8237C17.7683 16.7005 18.1339 16.4807 18.4311 16.1834C18.7284 15.8862 18.9482 15.5206 19.0714 15.1187C19.1473 14.8762 19.1498 14.8329 19.1498 13.6854V12.502L19.0598 12.3487C18.8998 12.0762 18.6098 11.9187 18.2681 11.9187C17.5931 11.9187 16.9056 11.3695 16.7273 10.6879C16.5398 9.96954 16.8173 9.26037 17.4473 8.84704C17.6914 8.68704 17.8939 8.62454 18.2931 8.58621C18.6556 8.55204 18.8448 8.46037 19.0014 8.24454C19.1639 8.01954 19.1731 7.93537 19.1589 6.72204C19.1464 5.66454 19.1414 5.58871 19.0698 5.36871C18.9437 4.97394 18.7248 4.61514 18.4315 4.3224C18.1382 4.02965 17.7789 3.81149 17.3839 3.6862L17.1164 3.60204L10.0998 3.59704C6.2406 3.59454 3.00727 3.60537 2.9156 3.62121ZM16.9248 5.30287C17.0481 5.34105 17.1593 5.41086 17.2473 5.50537C17.4656 5.72371 17.5039 5.88037 17.4923 6.51621L17.4831 7.02371L17.2664 7.09954C16.7124 7.2883 16.2177 7.61941 15.832 8.05966C15.4463 8.49991 15.1832 9.03383 15.0689 9.60787C14.7498 11.1729 15.6298 12.7779 17.1164 13.3445C17.2631 13.4004 17.4098 13.4545 17.4414 13.4645C17.4939 13.4812 17.4998 13.537 17.4998 13.9954C17.4998 14.717 17.4156 14.942 17.0698 15.1454L16.9164 15.2354H3.0831L2.92977 15.1454C2.83834 15.0896 2.75646 15.0196 2.68727 14.9379C2.5281 14.7287 2.49977 14.5912 2.49977 14.0137C2.49977 13.5379 2.5056 13.4812 2.5581 13.4645C3.6181 13.127 4.36393 12.457 4.7531 11.492C5.46643 9.72287 4.5531 7.73704 2.7331 7.09954L2.51643 7.02371L2.50727 6.51621C2.4956 5.88037 2.53393 5.72371 2.75227 5.50454C2.83773 5.41436 2.94342 5.34581 3.0606 5.30454C3.19393 5.26371 4.19143 5.25621 9.9856 5.25454C15.9531 5.25204 16.7748 5.25787 16.9248 5.30287ZM7.2456 6.96454C7.04718 7.03189 6.87952 7.16821 6.7731 7.34871C6.69727 7.47871 6.6831 7.54037 6.6831 7.75204C6.6831 7.96621 6.69643 8.02454 6.77727 8.16204C7.20893 8.89704 8.33143 8.60037 8.33143 7.75204C8.3324 7.59961 8.29129 7.44988 8.21263 7.31931C8.13397 7.18875 8.0208 7.08242 7.8856 7.01204C7.68374 6.92444 7.45818 6.9077 7.2456 6.96454ZM12.1998 6.97537C12.0706 7.01954 11.6964 7.37954 9.4556 9.61454C7.97477 11.092 6.8231 12.2662 6.77227 12.352C6.69643 12.4787 6.6831 12.5404 6.6831 12.752C6.6831 12.9662 6.69643 13.0245 6.77727 13.162C6.8856 13.347 7.08477 13.5029 7.27977 13.5562C7.4481 13.6012 7.72143 13.5762 7.8706 13.5012C8.02477 13.4245 13.1139 8.34121 13.2273 8.15204C13.3031 8.02537 13.3164 7.96371 13.3164 7.75204C13.3164 7.54037 13.3023 7.47871 13.2264 7.34871C13.1269 7.17527 12.9693 7.04264 12.7814 6.97431C12.5935 6.90598 12.3874 6.90635 12.1998 6.97537ZM12.2456 11.9645C12.0472 12.0319 11.8795 12.1682 11.7731 12.3487C11.6973 12.4787 11.6831 12.5404 11.6831 12.752C11.6831 12.9662 11.6964 13.0245 11.7773 13.162C12.2089 13.897 13.3314 13.6004 13.3314 12.752C13.3324 12.5996 13.2913 12.4499 13.2126 12.3193C13.134 12.1887 13.0208 12.0824 12.8856 12.012C12.6837 11.9244 12.4582 11.9077 12.2456 11.9645Z"
          fill="#666666"
        />
      </svg>
    </div>
  </div>
  <div className="font-body font-medium text-[12px] leading-[16px] tracking-normal align-middle text-[#1A1A1A]">
    <AssigedToDropComp
      assignerName={selProjectIs?.eventName || Event}
      id={id}
      align="right"
      setAssigner={setNewProject}
      usersList={projectList}
    />
  </div>
</section>


          <button className="w-[70px] h-[34px] flex gap-2 rounded-[10px] border border-[#F44D21] px-3 py-2 text-[#F44D21]">
            <Phone className="w-4 h-4" />
            <span className='font-manrope font-medium text-[14px] leading-[100%] tracking-[-0.006em] text-[#F44D21]'>Call</span>
          </button>
        </div>
      </div>
       <div className='border-b border-[#E5E5E5]'></div>

      {/* Contact Information */}

<div className="flex justify-around p-4 text-sm text-gray-600">
  {/* Phone Number */}
  <div className="flex items-center gap-2">
    <span className="font-manrope font-medium text-[12px] leading-[100%] tracking-[0%] text-[#444444]">
      Phone number:
    </span>
    <span className="font-manrope font-medium text-[12px] leading-[100%] tracking-[0%] text-[#444444]">
      {Mobile?.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
    </span>
  </div>

  {/* Divider */}
  <div className="h-4 w-px bg-gray-300 mx-4"></div>

  {/* Shop Name */}
  <div className="flex items-center gap-2">
    <span className="font-manrope font-medium text-[12px] text-[#444444]">
      Shop name:
    </span>
    <span className="font-manrope font-medium text-[12px] text-[#444444]">
      GRT Jewellery
    </span>
  </div>

  {/* Divider */}
  <div className="h-4 w-px bg-gray-300 mx-4"></div>

  {/* Email ID */}
  <div className="flex items-center gap-2">
    <span className="font-manrope font-medium text-[12px] leading-[100%] tracking-[0%] text-[#444444]">
      Email ID:
    </span>
    <span className="font-manrope font-medium text-[12px] leading-[100%] tracking-[0%] text-[#444444]">
      {Email || "-"}
    </span>
  </div>

  {/* Divider */}
  <div className="h-4 w-px bg-gray-300 mx-4"></div>

  {/* Location */}
  <div className="flex items-center gap-2">
    <span className="font-manrope font-medium text-[12px] leading-[100%] tracking-[0%] text-[#444444]">
      Location:
    </span>
    <span className="font-manrope font-medium text-[12px] leading-[100%] tracking-[0%] text-[#444444]">
      Karnataka
    </span>
  </div>
</div>


</div>


 

<div className="relative flex bg-[#fff]  items-center">
  {/* Status Stepper */}
  <div className="flex items-center bg-[#FEEDE9] rounded-l-[20px] rounded-r-[20px] p-6   ">
    {/* ...your status stepper content... */}
    {statusSteps.map((step, index) => (
      <div key={index} className="flex items-center">
        <div className="flex items-center gap-[12px] space-x-1">
          <div
            className={`w-[19px] h-[19px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
              step.value === currentStatus
                ? 'bg-orange-500 text-white'
                : step.completed
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-600'
            } ${
              isHovering && hoveredStepId === index ? 'bg-orange-400' : ''
            }`}
            onClick={() => handleStatusClick(step.value)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {step.completed && step.value !== currentStatus ? (
              <span className="text-sm">✓</span>
            ) : step.value === currentStatus ? (
              <span className="w-2 h-2 bg-white rounded-full"></span>
            ) : step.value === 'NotInterested' ? (
              <span className="text-sm">✕</span>
            ) : (
              <span className="w-2 h-2 bg-current rounded-full opacity-50"></span>
            )}
          </div>
          <span
            className={`cursor-pointer transition-colors duration-200 font-medium text-[12px] leading-[16px] tracking-[0px] text-center text-[#333333] ${
              step.value === currentStatus
                ? 'text-orange-600'
                : step.completed
                ? 'text-green-600'
                : 'text-gray-600'
            } ${
              isHovering && hoveredStepId === index ? 'text-orange-500' : ''
            }`}
            onClick={() => handleStatusClick(step.value)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {step.label}
          </span>
        </div>

        {index < statusSteps.length - 1 && (
          <div className="w-[70px] h-0.5 mx-3">
            <div
              className={`h-full transition-colors duration-200 ${
                step.completed || step.value === currentStatus
                  ? 'bg-orange-400'
                  : 'bg-gray-300'
              }`}
            />
          </div>
        )}
      </div>
    ))}
  </div>

  {/* Chevron - positioned between the two sections */}
  <div className="relative z-10 flex items-center justify-center -mx-3">
    <div className="bg-[#E060403D] px-[5px] py-[10px] rounded-[20px]">
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
  </div>

  {/* Stalls List */}
<div className="flex items-center w-[170px] h-[70px] px-[24px] gap-1 rounded-[20px] bg-[#FEEDE9]">
  <div className="w-full">
    <div className="font-medium text-[12px] leading-[16px] tracking-[0px] text-center text-[#333333]">
      Last activity
    </div>
    <div className="font-bold text-[12px] leading-[16px] tracking-[0px] text-center text-[#333333]">
      12-03-2025
    </div>
  </div>
</div>

</div>
    </div>
        </div>









    


         {/* New code for ending */}




         {/* Old Stepper  */}
        {/* <div
          className="flex flex-row justify-between   py-3 px-3  mt-[0.5px] mb-0 rounded-xs bg-[#F2F5F8]"
          style={{ flex: '4 0 100%' }}
        >
          {StatusListA.map((statusFlowObj, i) => (
            <span
              key={i}
              className="font-bodyLato text-sm font-normal px-[2px] py-[1px] mr-1 "
              onClick={() => setStatusFun(id, statusFlowObj.value)}
              // style={{
              //   width: '100%',
              //   height: '32px',
              //   borderWidth: '3px 10px 3px 3px',
              //   boxSizing: 'border-box',
              //   borderStyle: 'solid',
              //   verticalAlign: 'middle',
              //   cursor: 'pointer',
              //   textOverflow: 'ellipsis',
              //   transition: 'all 250ms ease',
              //   position: 'relative',
              //   overflow: 'hidden',
              //   whiteSpace: 'nowrap',
              //   borderImage:
              //     'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%232FC6F6%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%232FC6F6%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',
              //   borderImage:
              //     'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2216px%22%20height%3D%2232px%22%20viewBox%3D%220%200%2016%2032%22%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%3E%3Cdefs%3E%3Cpath%20d%3D%22M0%2C2.99610022%20C0%2C1.34139976%201.3355407%2C0%202.99805158%2C0%20L6.90478569%2C0%20C8.56056385%2C0%2010.3661199%2C1.25756457%2010.9371378%2C2.80757311%20L16%2C16.5505376%20L11.0069874%2C29.2022189%20C10.3971821%2C30.7473907%208.56729657%2C32%206.90478569%2C32%20L2.99805158%2C32%20C1.34227341%2C32%200%2C30.6657405%200%2C29.0038998%20L0%2C2.99610022%20Z%22%20id%3D%22Bg%22/%3E%3C/defs%3E%3Cg%20id%3D%22Bar%22%20stroke%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cmask%20fill%3D%22white%22%20id%3D%22mask%22%3E%3Cuse%20xlink%3Ahref%3D%22%23Bg%22/%3E%3C/mask%3E%3Cuse%20fill%3D%22%23d3d7dc%22%20xlink%3Ahref%3D%22%23Bg%22/%3E%3Cpolygon%20id%3D%22Ln%22%20fill%3D%22%2347E4C2%22%20mask%3D%22url%28%23mask%29%22%20points%3D%220%2030%2016%2030%2016%2032%200%2032%22/%3E%3C/g%3E%3C/svg%3E") 3 10 3 3 fill / 1 / 0 repeat',

              //   color: 'rgb(51, 51, 51)',
              //   dataBaseColor: '#2fc6f6',
              // }}
              //{leadDetailsObj?.Remarks
              style={{
                ...styleO.normal,
                ...(statusFlowObj.value === streamCurrentStatus
                  ? styleO.hover
                  : null),
                ...(streamCoveredA.includes(statusFlowObj.value)
                  ? styleO.completed
                  : null),

                ...(statusFlowObj.value === tempLeadStatus
                  ? styleO.hover
                  : null),
                ...(statusFlowObj.value === streamfrom
                  ? styleO.completed
                  : null),
                ...(hover && hoverId === i ? styleO.hover : null),
              }}
              onMouseEnter={() => {
                hoverEffectFun(i)
                setHover(true)
              }}
              onMouseLeave={() => {
                hoverEffectFun(1000)
                setHover(false)
              }}
            >
              <div>{statusFlowObj.label} </div>\
            </span>
          ))}
        </div> */}


        {/* <div
          className="flex flex-row justify-between mb-6 "
          style={{ flex: '4 0 100%' }}
        >
          {StatusListA.map((statusFlowObj, i) => (
            <div
              key={i}
              className="blockHead font-bodyLato text-sm font-normal px-[2px] py-[4px] mr-1 "
            >
              <span className="blocktext">{statusFlowObj.label}</span>
            </div>
          ))}
        </div> */}

        {/* <div className="border-b mt-3">
          <div className="py-2 px-1">
            <div className="px-3  font-md font-medium text-sm mb-3  text-gray-800">
              Assigner Details
            </div>
            <div className="px-3  flex justify-between">
              <section>
                <div className="font-md text-xs text-gray-500 mb-[2]">
                  Assigned To
                </div>
                <div className="font-lg text-sm text-slate-900 min-w-[200%] bg-red-50">

                  <CustomSelect
                    name="roleName"
                    label=""
                    className="input mt-3"
                    onChange={(value) => {
                      // formik.setFieldValue('myRole', value.value)
                      console.log('i was changed', value, usersList)
                      setAssigner(id, value)
                    }}
                    value={assignedTo}
                    options={usersList}
                  />
                </div>
              </section>
              <section>
                <div className="font-md text-xs text-gray-500 mb-[2]">
                  Assigned On
                </div>

                <div className="font-lg text-sm text-slate-900">26 July</div>
              </section>
            </div>

            <div className="px-3 py-1 mb-3 mt-3 flex justify-between">
              <div>
                <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                  Assigned By
                </div>
                <div className="font-lg text-sm text-slate-900">
                  {AssignedBy || 'NA'}
                </div>
              </div>
              <div>
                <div className="font-md text-xs mt-2 text-gray-500 mb-[2]">
                  Last Activist
                </div>
                <div className="font-lg text-sm text-slate-900">3 days ago</div>
              </div>
            </div>
          </div>
        </div> */}

        {unitsViewMode && (
          <>
            <ProjPhaseHome
              projectDetails={selProjectIs}
              leadDetailsObj={leadDetailsObj}
              source={undefined}
              unitDetails={undefined}
            />
          </>
        )}
        {!unitsViewMode && (
          <>
            <section className="flex flex-col pt-1 px-[24px] mt-[20px] rounded-xs ">
              <div className="">
                <div className="">
                  {/* <div className="font-md font-medium text-xs  text-gray-800">
                          Notes
                        </div> */}

                  <div className="flex flex-row justify-between border-gray-200">
                    <ul
                      className="flex rounded-t-lg  mx-2"
                      id="myTab"
                      data-tabs-toggle="#myTabContent"
                      role="tablist"
                    >
                      {[
                        { lab: 'Summary', val: 'lead_summary' },
                        // { lab: 'Tasks', val: 'appointments' },
                        { lab: 'Notes', val: 'notes' },
                        { lab: 'Activity Log', val: 'timeline' },
                      ].map((d, i, array) => {
                        return (
                          <div key={i} className="flex items-center">
                            <li className="" role="presentation">
                              <button
                                className={`inline-block pb-1 text-xs font-medium text-center text-[#606062] rounded-t-lg border-b-2  hover:text-black hover:border-gray-300   ${selFeature === d.val
                                  ? 'border-zinc-800 text-zinc-800'
                                  : 'text-[#606062] border-none'
                                  }`}
                                type="button"
                                role="tab"
                                onClick={() => setFeature(d.val)}
                              >
                                {`${d.lab} `}
                              </button>
                            </li>
                            {i !== array.length - 1 && (
                              <div className="w-px mx-4 h-5 bg-[#E7E7E9]"></div>
                            )}
                          </div>
                        )
                      })}
                    </ul>

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
                  {/* {selFeature == 'lead_strength' && (
                    <>
                      <Formik
                        enableReinitialize={true}
                        // initialValues={{
                        //   name: customerDetailsTuned?.name || '',
                        //   cDate: customerDetailsTuned?.Date || '',
                        //   mobileNo: customerDetailsTuned?.phone || '',
                        //   email: customerDetailsTuned?.email || '',
                        //   source: customerDetailsTuned?.source || '',
                        //   project: customerDetailsTuned?.eventName || '',
                        //   projectId: customerDetailsTuned?.projectId || '',
                        //   assignedTo: customerDetailsTuned?.name || '',
                        //   budget: '20-30L',
                        //   deptVal: '',
                        //   myRole: '',
                        // }}
                        initialValues={{
                          assetPossesed: {},
                        }}
                        // validationSchema={validate}
                        onSubmit={(values, { resetForm }) => {
                          // console.log('ami submitted', values)
                          // console.log('ami submitted 1', values.assignedTo === '')
                          // onSubmitFun(values, resetForm)
                        }}
                      >
                        {(formik) => (
                          <div className="flex flex-col pt-0 my-10 mt-[30px] rounded bg-[#d1d8e7] mx-4 p-4">
                            <div className="border border-red-100 mt-2 mt-4 bg-white rounded-md p-4 font-bold">
                              <div className="flex justify-between w-full ">
                                <div>Total Lead Strength</div>
                                <div>{`${opstr}%`}</div>
                              </div>
                              <Slider
                                onChange={(e) => setopstr(e.target.value)}
                                value={opstr}
                                defaultValue={opstr}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-8 pt-3 mx-3  mt-2">

                              <div className="mt-2">
                                <div className="flex justify-between w-11.7/12 m-auto">
                                  <div>Any Existing Banglore Assets ?*</div>
                                  <div> {`${optionvalues.asstr}%`}</div>
                                </div>
                                <CustomSelect
                                  name="assetPossesed"
                                  label="Existing Asset"
                                  className="input"
                                  onChange={(value) => {
                                    // formik.setFieldValue('source', value.value)
                                    setoptionvalues({
                                      ...optionvalues,
                                      asset: value.value,
                                      asstr: value.str,
                                    })
                                  }}
                                  value={optionvalues.asset}
                                  options={exitstingAsset}
                                />
                              </div>
                              <div className="mt-2">
                                <div className="flex justify-between w-11.7/12 m-auto">
                                  <div>Reason For Purchase ?*</div>
                                  <div> {`${optionvalues.pstr}%`}</div>
                                </div>
                                <CustomSelect
                                  name="reasonPurchase"
                                  label="Purchase Reason"
                                  className="input"
                                  onChange={(value) => {
                                    // formik.setFieldValue('source', value.value)
                                    //  setNotInterestType(value.value)
                                    setoptionvalues({
                                      ...optionvalues,
                                      purchase: value.value,
                                      pstr: value.str,
                                    })
                                  }}
                                  value={optionvalues.purchase}
                                  options={reasonPurchase}
                                />
                              </div>
                              <div className="mt-2">
                                <div className="flex justify-between w-11.7/12 m-auto">
                                  <div>Preferred Area ?*</div>
                                  <div> {`${optionvalues.astr}%`}</div>
                                </div>
                                <CustomSelect
                                  name="preferredArea"
                                  className="input"
                                  onChange={(value) => {
                                    // formik.setFieldValue('source', value.value)
                                    setoptionvalues({
                                      ...optionvalues,
                                      area: value.value,
                                      astr: value.str,
                                    })
                                  }}
                                  value={optionvalues.area}
                                  options={preferredArea}
                                />
                              </div>
                            </div>
                            <div></div>

                            <div className="flex flex-row justify-end mt-6">
                              <section className="flex flex-row">
                                <button
                                  onClick={() => fAddNotes()}
                                  className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-teal-900  hover:bg-teal-700  `}
                                >
                                  <span className="ml-1 ">Save</span>
                                </button>

                                <button
                                  // onClick={() => fSetLeadsType('Add Lead')}
                                  onClick={() => setFeature('appointments')}
                                  className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-teal-900 hover:text-white  `}
                                >
                                  <span className="ml-1 ">Cancel</span>
                                </button>
                              </section>
                            </div>
                          </div>
                        )}
                      </Formik>
                    </>
                  )} */}
                  {/* {selFeature == 'email' && (
                    <>
                      <EmailForm />
                    </>
                  )} */}


                  {selFeature === 'notes' && (
                    // <div className="flex flex-col justify-between  pt-6">
                    //   {leadNotesFetchedData.length === 0 && !addNote && (
                    //     <div className="py-8 px-8 flex flex-col items-center mt-5">
                    //       <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                    //         <img
                    //           className="w-[180px] h-[180px] inline"
                    //           alt=""
                    //           src="/note-widget.svg"
                    //         />
                    //       </div>
                    //       <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                    //         No Helpful Notes box1 {addNote}
                    //       </h3>
                    //       <button onClick={() => selFun()}>
                    //         <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                    //           <span className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700">
                    //             <svg
                    //               xmlns="http://www.w3.org/2000/svg"
                    //               fill="none"
                    //               viewBox="0 0 24 24"
                    //               strokeWidth={2}
                    //               stroke="currentColor"
                    //               className="w-5 h-5"
                    //             >
                    //               <path
                    //                 strokeLinecap="round"
                    //                 strokeLinejoin="round"
                    //                 d="M12 4.5v15m7.5-7.5h-15"
                    //               />
                    //             </svg>
                    //             Add Notes
                    //           </span>
                    //         </time>
                    //       </button>
                    //       <Confetti />
                    //     </div>
                    //   )}
                    //   {addNote && (
                    //     <Formik
                    //       initialValues={initialState1}
                    //       validationSchema={validateSchema1}
                    //       onSubmit={(values, { resetForm }) => {
                    //         console.log('values of form is ', values)
                    //         fAddNotes()
                    //       }}
                    //     >
                    //       {(formik1) => (
                    //         <Form>
                    //           <div className=" form flex flex-col pt-0 my-10 mt-[10px] rounded bg-white mx-4 p-4">
                    //             <div className="  outline-none border  rounded p-4 mt-4">
                    //               <ErrorMessage
                    //                 component="div"
                    //                 name="notesText"
                    //                 className="error-message text-red-700 text-xs p-1"
                    //               />
                    //               <textarea
                    //                 name="notesText"
                    //                 value={takNotes}
                    //                 onChange={(e) => {
                    //                   console.log(
                    //                     'what the matter',
                    //                     e.target.value
                    //                   )
                    //                   formik1.setFieldValue(
                    //                     'notesText',
                    //                     e.target.value
                    //                   )
                    //                   setNotesTitle(e.target.value)
                    //                 }}
                    //                 placeholder="Type & make a notes"
                    //                 className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFFFFF] "
                    //               ></textarea>
                    //             </div>
                    //             <div className="flex flex-row mt-1">
                    //               <button
                    //                 type="submit"
                    //                 className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-black  bg-[#7bd2ea]  hover:bg-gray-700 hover:text-white  `}
                    //               >
                    //                 <span className="ml-1 ">Save</span>
                    //               </button>
                    //               <button
                    //                 onClick={() => cancelResetStatusFun()}
                    //                 type="submit"
                    //                 className={`flex mt-2 ml-4 rounded-lg items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-black  bg-[#7bd2ea]  hover:bg-gray-700 hover:text-white `}
                    //               >
                    //                 <span className="ml-1 ">
                    //                   Save & Whats App
                    //                 </span>
                    //               </button>
                    //               <button
                    //                 onClick={() => cancelResetStatusFun()}
                    //                 className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white `}
                    //               >
                    //                 <span className="ml-1 ">Cancel</span>
                    //               </button>
                    //             </div>
                    //           </div>
                    //         </Form>
                    //       )}
                    //     </Formik>
                    //   )}
                    //   {leadNotesFetchedData.length > 0 && (
                    //     <div className="px-4">
                    //       <div className="flex justify-between">
                    //         <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                    //           Notes
                    //         </div>

                    //         <button onClick={() => selFun()}>
                    //           <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                    //             <span className="text-blue-600">
                    //               {' '}
                    //               Add Notes
                    //             </span>
                    //           </time>
                    //         </button>
                    //       </div>
                    //       <ol className="relative border-l ml-3 border-gray-200  ">
                    //         {leadNotesFetchedData.map((data, i) => (
                    //           <section key={i} className="">
                    //             <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white  ">
                    //               <DocumentIcon className=" w-3 h-3" />
                    //             </span>
                    //             <div className="text-gray-600  m-3 ml-6">
                    //               <div className="text-base font-normal">
                    //                 <span className="font-medium text-green-900 ">
                    //                   {data?.notes}
                    //                 </span>{' '}
                    //               </div>
                    //               <div className="text-sm font-normal">
                    //                 {data?.txt}
                    //               </div>
                    //               <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                    //                 <ClockIcon className=" w-3 h-3" />

                    //                 <span className="ml-1">added on:</span>
                    //                 <span className="text-gray-500 ml-1">
                    //                   {prettyDateTime(data?.ct)}
                    //                 </span>
                    //                 <div className="w-[2px] mx-2 mt-[4px] h-[8px] border-0 border-r"></div>
                    //                 <span className="">added by:</span>
                    //                 <span className="text-gray-500 ml-1 ">
                    //                   {data?.by}
                    //                 </span>
                    //               </span>
                    //             </div>
                    //           </section>
                    //         ))}
                    //       </ol>
                    //     </div>
                    //   )}
                    // </div>

                    <div className="flex flex-col justify-between  pt-6">
                      {leadNotesFetchedData.length === 0 && !addNote && (
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-[16px] leading-[100%] tracking-[0em]">
                              Add notes
                            </h3>

                            <button onClick={() => selFun()}>
                              <span className="inline-flex items-center justify-center px-4 py-3 rounded-[8px] sale_bg_color text-white font-medium text-[14px] leading-[100%] tracking-[0.06em] font-outfit">
                                Add Notes
                              </span>
                            </button>
                          </div>

                          <div className="py-8 px-8  flex flex-col items-center mt-5">
                            <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                              <img
                                className="w-[180px] h-[180px] inline"
                                alt=""
                                src="/note-widget.svg"
                              />
                            </div>
                            <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                              No Helpful Notes{addNote}
                            </h3>

                            <Confetti />
                          </div>
                        </div>
                      )}
                      {addNote && (
                        <Formik
                          initialValues={initialState1}
                          validationSchema={validateSchema1}
                          onSubmit={(values, { resetForm }) => {
                            console.log('values of form is ', values)
                            fAddNotes()
                          }}
                        >
                          {(formik1) => (
                            <Form>
                              <div className="box__bg relative rounded-[14px] e shadow-[0px_4px_30px_0px_#0000000D]  border-[#E7E7E9] mx-auto p-[1px]">
                                <div className="w-full max-w-[922px]  h-auto md:h-[344px] p-5 gap-[30px] rounded-[14px] bg-white">
                                  <div className="flex items-start gap-4  max-w-4xl mx-auto">
                                    <div className="p-2 rounded-lg bg-[#FFFFFF] shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                      <img
                                        src="/target-sale.svg"
                                        alt="Target Sale Icon"
                                        className="w-[18px] h-[18px]"
                                      />
                                    </div>

                                    <div className="flex flex-col gap-2 flex-1">
                                      <div className="flex items-center">
                                        <h2 className="font-normal text-[16px] leading-[100%] tracking-[0em] font-heading underline">
                                          Hey, Book this stall ..!
                                        </h2>
                                        {/* <img
                                            src="/edit-02.svg"
                                            alt="Edit Icon"
                                            className="w-5 h-5 cursor-pointer"
                                            onClick={() =>
                                              setisImportLeadsOpen(true)
                                            }
                                          /> */}
                                      </div>

                                      <p className="font-normal text-[12px] leading-[100%] tracking-[0em] text-[#606062] font-heading">
                                        Mark the visit done to open the next
                                        step: sharing lead experience.
                                      </p>
                                    </div>
                                  </div>

                                  <div className=" form flex flex-col pt-0  mt-[10px] rounded bg-white">
                                    <div className=" w-full max-w-[882px] h-auto p-3 md:p-2 gap-2.5   outline-none border border-[#E7E7E9] rounded-[8px] p-2 mt-2">
                                      <ErrorMessage
                                        component="div"
                                        name="notesText"
                                        className="error-message text-red-700 text-xs p-1"
                                      />
                                      <textarea
                                        name="notesText"
                                        value={takNotes}
                                        onChange={(e) => {
                                          console.log(
                                            'what the matter',
                                            e.target.value
                                          )
                                          formik1.setFieldValue(
                                            'notesText',
                                            e.target.value
                                          )
                                          setNotesTitle(e.target.value)
                                        }}
                                        placeholder="Type & make a notes"
                                        className="w-full min-h-[161px]  text-[12px] outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFFFFF] "
                                      ></textarea>
                                    </div>
                                    {/* <div className="flex flex-row  justify-end mt-1">
    <button
      type="submit"
      className={`flex mt-2 rounded-[8px] items-center text-[12px]  pl-2 h-[36px] pr-4 px-4 py-4 text-sm font-medium text-black  sale_bg_color cursor-pointer   `}
    >
      <span className="ml-1 text-white text-[12px] ">Save</span>
    </button>
    <button
      onClick={() => cancelResetStatusFun()}
      type="submit"
      className={`flex mt-2 ml-4 rounded-[8px] text-[12px] items-center  pl-2 h-[36px] pr-4 px-4 py-4 text-sm font-medium text-black  sale_bg_color cursor-pointer `}
    >
      <span className="ml-1 text-white text-[12px] ">
        Save & Whats App
      </span>
    </button>
    <button
      onClick={() => cancelResetStatusFun()}
      className={`flex mt-2 ml-4  rounded-[8px] items-center text-[12px]  pl-2 h-[36px] pr-4 px-4 py-4 text-sm font-medium border cursor-pointer `}
    >
      <span className="ml-1 text-[12px]  text-black">Cancel</span>
    </button>
  </div> */}
                                    <div className="flex flex-wrap  justify-end gap-4 mt-5">
                                      <button
                                        type="submit"
                                        className="flex items-center px-4 h-9 text-sm font-medium text-white sale_bg_color rounded-md"
                                      >
                                        Save
                                      </button>
                                      <button
                                        type="submit"
                                        onClick={cancelResetStatusFun}
                                        className="flex items-center px-4 h-9 text-sm font-medium text-white sale_bg_color rounded-md"
                                      >
                                        Save & WhatsApp
                                      </button>
                                      <button
                                        onClick={cancelResetStatusFun}
                                        className="flex items-center px-4 h-9 text-sm font-medium text-black border rounded-md"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      )}
                      {leadNotesFetchedData.length > 0 && (
                        <div className="">
                          <div className="flex my-4  items-center justify-between">
                            <div className="font-medium text-[16px] leading-[100%] tracking-[0%] mb-4 ">
                              Notes
                            </div>

                            <button onClick={() => selFun()}>
                              <time className="block mb-2 inline-flex items-center justify-center px-4 py-3 rounded-[8px] sale_bg_color text-white font-medium text-[14px] leading-[100%] tracking-[0.06em] font-outfit  ">
                                <span className="text-[12px] text-white">
                                  {' '}
                                  Add Notes
                                </span>
                              </time>
                            </button>
                          </div>
                          {/* <ol className="relative border-l ml-3 border-gray-200  ">
                              {leadNotesFetchedData.map((data, i) => (
                                <section key={i} className="">
                                  <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white  ">
                                    <DocumentIcon className=" w-3 h-3" />
                                  </span>
                                  <div className="text-gray-600  m-3 ml-6">
                                    <div className="text-base font-normal">
                                      <span className="font-medium text-green-900 ">
                                        {data?.notes}
                                      </span>{' '}
                                    </div>
                                    <div className="text-sm font-normal">
                                      {data?.txt}
                                    </div>
                                    <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                                      <ClockIcon className=" w-3 h-3" />

                                      <span className="ml-1">added on:</span>
                                      <span className="text-gray-500 ml-1">
                                        {prettyDateTime(data?.ct)}
                                      </span>
                                      <div className="w-[2px] mx-2 mt-[4px] h-[8px] border-0 border-r"></div>
                                      <span className="">added by:</span>
                                      <span className="text-gray-500 ml-1 ">
                                        {data?.by}
                                      </span>
                                    </span>
                                  </div>
                                </section>
                              ))}
                            </ol> */}

                          <ol className="space-y-4 bg-white rounded-xl shadow-md">
                            {leadNotesFetchedData.map((data, i) => (
                              <li
                                key={i}
                                className="border-b border-gray-100 py-4 last:border-none"
                              >
                                <div className="px-6">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h3 className="font-outfit font-normal text-sm leading-tight tracking-tight text-[#606062]">
                                        {data?.notes}
                                      </h3>
                                      <p className="mt-2 text-sm text-gray-600">
                                        {data?.txt}
                                      </p>
                                    </div>

                                    <div>
                                      <div className="flex items-center text-xs text-gray-500 space-x-1">
                                        <ClockIcon className="w-3 h-3" />
                                        <span>
                                          {prettyDateTime(data?.ct)}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Horizontal line with more visible border style */}
                                  <hr className="border-t-1 border-[#E7E7E9] my-4 w-full" />


                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}




                  {selFeature === 'visitDoneNotes' && (
                    <div className="flex flex-col justify-between  pt-6">
                      {leadNotesFetchedData.length === 0 && !addNote && (
                        <div className="py-8 px-8 flex flex-col items-center mt-5">
                          <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                            <img
                              className="w-[180px] h-[180px] inline"
                              alt=""
                              src="/note-widget.svg"
                            />
                          </div>
                          <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                            No Helpful Notes box2 {addNote}
                          </h3>
                          <button onClick={() => selFun()}>
                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                              Better always attach a string
                              <span className="text-blue-600">
                                {' '}
                                Add Notes
                              </span>
                            </time>
                          </button>
                        </div>
                      )}
                      {addNote && (
                        <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFFFFF] mx-2">
                          <div className="w-full flex flex-col mb-3 mt-2">
                            <CustomSelect
                              name="source"
                              label="Site Visit Feedback*"
                              className="input mt-3"
                              onChange={(value) => {
                                setNotInterestType(value.value)
                              }}
                              value={notInterestType}
                              options={siteVisitFeedbackOptions}
                            />
                          </div>

                          <div className="  outline-none border  rounded p-4 mt-4">
                            <textarea
                              value={takNotes}
                              onChange={(e) => setNotesTitle(e.target.value)}
                              placeholder="Type & make a notes *"
                              className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFFFFF] "
                            ></textarea>
                          </div>
                          <div className="flex flex-row mt-1">
                            <button
                              onClick={() => fAddNotes()}
                              className={`flex mt-2 rounded-lg items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-balck  bg-[#7bd2ea]  hover:bg-gray-700 hover:text-white `}
                            >
                              <span className="ml-1 ">Save</span>
                            </button>
                            <button
                              onClick={() => fAddNotes()}
                              className={`flex mt-2 ml-4 rounded-lg items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-black  bg-[#7bd2ea]  hover:bg-gray-700 hover:text-white  `}
                            >
                              <span className="ml-1 ">Save & Whats App</span>
                            </button>
                            <button
                              onClick={() => cancelResetStatusFun()}
                              className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white  `}
                            >
                              <span className="ml-1 ">Cancel</span>
                            </button>
                          </div>
                        </div>
                      )}
                      {leadNotesFetchedData.length > 0 && (
                        <div className="px-4">
                          <div className="flex justify-between">
                            <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                              Notes
                            </div>

                            <button onClick={() => selFun()}>
                              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                                <span className="text-blue-600">
                                  {' '}
                                  Add Notes
                                </span>
                              </time>
                            </button>
                          </div>
                          <ol className="relative border-l ml-3 border-gray-200  ">
                            {leadNotesFetchedData.map((data, i) => (
                              <section key={i} className="">
                                <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white  ">
                                  <DocumentIcon className=" w-3 h-3" />
                                </span>
                                <div className="text-gray-600  m-3 ml-6">
                                  <div className="text-base font-normal">
                                    <span className="font-medium text-green-900 ">
                                      {data?.notes}
                                    </span>{' '}
                                  </div>
                                  <div className="text-sm font-normal">
                                    {data?.txt}
                                  </div>
                                  <span className="inline-flex items-center text-xs font-normal text-gray-500 ">
                                    <ClockIcon className=" w-3 h-3" />

                                    <span className="ml-1">added on:</span>
                                    <span className="text-red-900 ml-1 mr-4">
                                      {prettyDateTime(data?.ct)}
                                    </span>
                                    <div className="w-[2px] mx-2 mt-[4px] h-[8px] border-0 border-r"></div>
                                    <span className="ml-2">added by:</span>
                                    <span className="text-red-900 ml-1 mr-4">
                                      {data?.by}
                                    </span>
                                  </span>
                                </div>
                              </section>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}



                </div>
              </div>
              {selFeature === 'documents' && (
                <div className="border px-4">
                  {docsList.length === 0 && (
                    <div className="py-8 px-8 flex flex-col items-center mt-6">
                      <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                        <img
                          className="w-[200px] h-[200px] inline"
                          alt=""
                          src="/empty-dashboard.svg"
                        />
                      </div>
                      <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                        No Attachments
                      </h3>
                      <button onClick={() => showAddAttachF()}>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                          Better always attach a string
                          <span className="text-blue-600"> Add Dcoument</span>
                        </time>
                      </button>
                    </div>
                  )}

                  {attach && (
                    <div className="flex justify-center mt-4">
                      <div className="mb-3 w-96 px-10 bg-[#FFFFFF] rounded-md py-3 pb-6">
                        <div className="w-full flex flex-col mb-3 mt-2">
                          <CustomSelect
                            name="source"
                            label="Document Type *"
                            className="input mt-3"
                            onChange={(value) => {
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
                              type="submit"
                              className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white  bg-[#7bd2ea]  hover:bg-gray-700  `}
                            >
                              <span className="ml-1 ">Upload</span>
                            </button>
                            <button
                              onClick={() => setAttach(false)}
                              className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                            >
                              <span className="ml-1 ">Cancel</span>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {docsList.length > 0 && (
                    <div className="py-8">
                      <div className="flex justify-between">
                        <h2 className="text-xl font-semibold leading-tight">
                          Customer Documents
                        </h2>
                        <button onClick={() => showAddAttachF()}>
                          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                            <span className="text-blue-600">
                              {' '}
                              Add Dcoument
                            </span>
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
                                        <DownloadIcon
                                          onClick={() =>
                                            downloadFile(dat.url)
                                          }
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
                    Sitback & Relax{' '}
                    <span className="text-blue-600">Add Task</span>
                  </time>
                </div>
              )}
              {selFeature === 'phone' && (
                <>
                  {filterData?.length === 0 && (
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
                        Sitback & Relax{' '}
                        <span className="text-blue-600">Add Task</span>
                      </time>
                    </div>
                  )}

                  <div className="px-4 mt-4">
                    <div className="font-md font-medium text-xl mb-4 text-[#053219]">
                      Phone Calls
                    </div>
                    <ol className="relative border-l border-gray-200 ml-3 ">
                      {filterData?.map((data, i) => (
                        <section key={i} className="">
                          <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-green-200 rounded-full ring-8 ring-white  ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-blue-600 "
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </span>
                          <div className="text-gray-600  m-3 ml-6">
                            <div className="text-base font-normal">
                              <span className="font-medium text-green-900 ">
                                {'Rajiv'}
                              </span>{' '}
                              called{' '}
                              <span className="text-sm text-red-900  ">
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
                        </section>
                      ))}
                    </ol>
                  </div>
                </>
              )}


              {selFeature === 'lead_summary' && (
                <>
                  <div className="max-w-5xl mx-auto space-y-4 mt-4">
                  

                    <div>
                      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 ">
                        {/* <div className=" rounded-[8px] border border-[#F0F0F5]  bg-[#FFFFFF] overflow-hidden">
                      
                          <div className="py-1 px-5">
                           <div className="pb-3">
                              {editTaskObj?.ct === leadNextTaskObj?.ct ? (
                                <EditLeadTask
                                  editTaskObj={editTaskObj}
                                  setStartDate={setStartDate}
                                  startDate={startDate}
                                  takTitle={takTitle}
                                  setTitleFun={setTitleFun}
                                  cancelResetStatusFun={
                                    cancelResetStatusFun
                                  }
                                  editTaskFun={editTaskFun}
                                  d={d}
                                />
                              ) : null}
                            </div> 

                            <>
                              {' '}
                               <LeadTaskDisplayHead
                                
                                setAddTaskCommentObj={
                                  setAddTaskCommentObj
                                }
                                closeTaskFun={closeTaskFun}
                                hoverTasId={hoverTasId}
                                undoFun={undoFun}
                                setShowVisitFeedBackStatusFun={
                                  setShowVisitFeedBackStatusFun
                                }
                                EditTaskOpenWindowFun={
                                  EditTaskOpenWindowFun
                                }
                              /> 



 

                              <div className="flex flex-wrap mt-1 font-[Outfit] s_h12 ml-[34px]">
                                <div className=" s_h12 text-[#606062] font-[300]">
                                  Assigned date :{' '}
                                  {prettyDateTime(
                                    leadNextTaskObj?.schTime
                                  )}
                                </div>
                                <div className="s_divider_small"></div>
                                <div className=" s_h12 text-[#606062] font-[300]">
                                  Assigned to: {leadNextTaskObj.by}
                                </div>
                              </div>
                              {addTaskCommentObj?.ct === leadNextTaskObj?.ct && (
                                <div className="ml-[18px]">

                                  <AddLeadTaskComment
                                    closeTask={closeTask}
                                    data={leadNextTaskObj}
                                    setShowVisitFeedBackStatusFun={
                                      setShowVisitFeedBackStatusFun
                                    }
                                    setShowNotInterestedFun={
                                      setShowNotInterestedFun
                                    }
                                    setAddCommentTitle={
                                      setAddCommentTitle
                                    }
                                    addCommentTitle={addCommentTitle}
                                    addCommentTime={addCommentTime}
                                    setPostPoneToFuture={
                                      setPostPoneToFuture
                                    }
                                    setClosePrevious={setClosePrevious}
                                    setAddCommentPlusTask={
                                      setAddCommentPlusTask
                                    }
                                    setAddCommentTime={setAddCommentTime}
                                    cancelResetStatusFun={
                                      cancelResetStatusFun
                                    }
                                    addTaskCommentFun={addTaskCommentFun}
                                    addCommentPlusTask={
                                      addCommentPlusTask
                                    }
                                    setSelType={setSelType}
                                    selType={selType}
                                    d={d}
                                  />
                                </div>
                              )} 
              
                              <div
                                className={`ml-7 pb-[8px] min-h-[1px]`}
                              >
                                {addTaskCommentObj?.ct != leadNextTaskObj?.ct && (
                                  <LeadTaskFooter
                                    data={leadNextTaskObj}
                                    hoverTasId={hoverTasId}
                                    EditTaskOpenWindowFun={
                                      EditTaskOpenWindowFun
                                    }
                                    delFun={delFun}
                                  />
                                )}
                              </div>
 
                              {leadNextTaskObj?.comments?.length > 0 && (
                                <div
                                  className={`flex items-center mt-[2px] mb-1 ${leadNextTaskObj?.stsType === 'visitfixed' &&
                                    leadNextTaskObj?.sts !== 'completed'
                                    ? 'ml-[15px]'
                                    : 'ml-[15px]'
                                    } ml-[20px]`}
                                >
                                  <p className="font-outfit font-medium text-[12px] leading-[100%] tracking-[0%] text-[#606062] ml-[16px]">
                                    {leadNextTaskObj.comments.length} Comment
                                    {leadNextTaskObj.comments.length > 1
                                      ? 's'
                                      : ''}
                                  </p>
                                </div>
                              )}
                              <ol className="list-none ml-[4px]">
                                {leadNextTaskObj?.comments?.map((commentObj, k) => {
                                  return (
                                    <li
                             

                                      className={` ml-[29px] ${leadNextTaskObj?.stsType === 'visitfixed' &&
                                        leadNextTaskObj?.sts !== 'completed'
                                        ? 'pl-0'
                                        : 'pl-0'
                                        } py-[4px] text-[14px] text-[#7E92A2] tracking-wide ${leadNextTaskObj?.comments?.length - 1 === k
                                          ? 'mb-1'
                                          : ''
                                        }`}
                                    >
                                      <section className="flex flex-row justify-between items-center w-full">
                                        <div className="flex items-center space-x-2">
                          
                                          <img
                                            src="/material-symbols-light_add-task-rounded.svg"
                                            alt="Clock Icon"
                                            className="w-[14px] h-[14px]"
                                          />

                                          <span className="font-outfit font-normal text-sm leading-tight tracking-tight text-[#7E92A2]">
                                            {commentObj?.c}
                                          </span>
                                    
                                        </div>
                                        <p className="text-[12px] font-normal leading-[14px] tracking-normal text-[#606062]">
                                          {' '}
                                          {prettyDateTime(commentObj?.t)}
                                        </p>
                                      </section>
                                    </li>
                                  )
                                })}
                              </ol>
                              {(showNotInterested ||
                                showVisitFeedBackStatus) &&
                                selSchGrpO?.ct === leadNextTaskObj?.ct && (
                                  <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-white mx-2">
                                    {showNotInterested && (
                                      <div className="w-full flex flex-col mb-3 mt-2">
                                        <SelectDropDownComp
                                          label={`Why  ${customerDetails?.Name?.toLocaleUpperCase() ||
                                            'Customer'
                                            } is  not Interested*`}
                                          options={notInterestOptions}
                                          value={fbTitle}
                                          onChange={(value) => {
                                            setFbTitle(value.value)
                                          }}
                                        />
                                      </div>
                                    )}

                   

                                    {showVisitFeedBackStatus && (
                                      <div className="w-full flex  flex-col mb-3 mt-2">
                                        <label className="mb-4 font-outfit font-normal text-xs leading-[100%] tracking-[0%] text-[#606062]">
                                          Sites Visit Feedback *
                                        </label>

                                        <div className=" py-4">
                                          <div className="grid grid-cols-2 gap-6">




                                          
                                            <div className="bg-white rounded-xl p-6 shadow-sm border">
                                              <section className='flex flex-row justify-between'>
                                                <div className="flex items-center gap-3 mb-5">
                                                  <div className="bg-[#FFFFFF] p-1.5 rounded-lg  shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                                    <img
                                                      src="/target-sale.svg"
                                                      alt="Clock Icon"
                                                      className="w-[18px] h-[18px]"
                                                    />
                                                  </div>

                                                  <h2 className=" font-normal text-[16px] leading-[100%] tracking-[0%] text-[#000000]">
                                                    Budget
                                                  </h2>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                  <div className="w-16 mr-2">
                                                    <RoundedProgressBar
                                                      progress={optionvalues.bstr}
                                                      height={8}
                                                      fillColor="#94B5ED"
                                                      showLabels={false}
                                                    />
                                                  </div>
                                                  <span className="text-xs font-medium">{`${optionvalues.bstr}%`}</span>
                                                </div>
                                              </section>
                                              <div className="grid grid-cols-1 gap-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                  {lookingAtBudgetRange.map((data, i) => (
                                                    <button
                                                      className={`py-3 px-6 font-normal text-[12px] leading-[100%] tracking-[0%] text-[#0E0A1F] rounded-md border text-center transition-colors ${optionvalues.budget === data.value
                                                        ? 'bg-[#FCE6D9]  leading-[100%] tracking-[0] sale_text_color '
                                                        : 'bg-white hover:bg-gray-50'
                                                        }`}
                                                      onClick={() =>

                                                        setoptionvalues({
                                                          ...optionvalues,
                                                          budget: data.value,
                                                          bstr: data.str,
                                                        })
                                                      }
                                                    >
                                                      {data.label}
                                                    </button>
                                                  ))}
                                                </div>

                                              </div>
                                            </div>

                                            <div className="bg-white rounded-xl p-6 shadow-sm border">
                                              <section className='flex flex-row justify-between'>
                                                <div className="flex items-center gap-3 mb-5">
                                                  <div className="bg-[#FFFFFF] p-1.5 rounded-lg  shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                                    <img
                                                      src="/target-sale.svg"
                                                      alt="Clock Icon"
                                                      className="w-[18px] h-[18px]"
                                                    />
                                                  </div>

                                                  <h2 className=" font-normal text-[16px] leading-[100%] tracking-[0%] text-[#000000]">
                                                    Configuration
                                                  </h2>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                  <div className="w-16 mr-2">
                                                    <RoundedProgressBar
                                                      progress={optionvalues.confstr || 0}
                                                      height={8}
                                                      fillColor="#94B5ED"
                                                      showLabels={false}
                                                    />
                                                  </div>
                                                  <span className="text-xs font-medium">{`${optionvalues.confstr || 0}%`}</span>
                                                </div>
                                              </section>
                                              <div className="grid grid-cols-1 gap-4">
                                                <div className="grid grid-cols-3 gap-4">
                                                  {bedRoomConfigurtionRange.map((data, i) => (
                                                    <button
                                                      className={`py-3 px-6 font-normal text-[12px] leading-[100%] tracking-[0%] text-[#0E0A1F] rounded-md border text-center transition-colors ${optionvalues.config === data.value
                                                        ? 'bg-[#FCE6D9]  leading-[100%] tracking-[0] sale_text_color '
                                                        : 'bg-white hover:bg-gray-50'
                                                        }`}
                                                      onClick={() =>

                                                        setoptionvalues({
                                                          ...optionvalues,
                                                          config: data.value,
                                                          confstr: data.str,
                                                        })
                                                      }
                                                    >
                                                      {data.label}
                                                    </button>
                                                  ))}
                                                </div>

                                              </div>
                                            </div>
                                      
                                            <div className="bg-white rounded-xl p-6 shadow-sm border">
                                              <section className='flex flex-row justify-between'>
                                                <div className="flex items-center gap-3 mb-5">
                                                  <div className="bg-[#FFFFFF] p-1.5 rounded-lg  shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                                    <img
                                                      src="/target-sale.svg"
                                                      alt="Clock Icon"
                                                      className="w-[18px] h-[18px]"
                                                    />
                                                  </div>

                                                  <h2 className=" font-normal text-[16px] leading-[100%] tracking-[0%] text-[#000000]">
                                                    Preferred Area
                                                  </h2>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                  <div className="w-16 mr-2">
                                                    <RoundedProgressBar
                                                      progress={optionvalues.astr}
                                                      height={8}
                                                      fillColor="#94B5ED"
                                                      showLabels={false}
                                                    />
                                                  </div>
                                                  <span className="text-xs font-medium">{`${optionvalues.astr}%`}</span>
                                                </div>
                                              </section>
                                              <div className="grid grid-cols-1 gap-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                  {preferredArea.map((data, i) => (
                                                    <button
                                                      className={`py-3 px-6 font-normal text-[12px] leading-[100%] tracking-[0%] text-[#0E0A1F] rounded-md border text-center transition-colors ${optionvalues.area === data.value
                                                        ? 'bg-[#FCE6D9]  leading-[100%] tracking-[0] sale_text_color '
                                                        : 'bg-white hover:bg-gray-50'
                                                        }`}
                                                      onClick={() =>

                                                        setoptionvalues({
                                                          ...optionvalues,
                                                          area: data.value,
                                                          astr: data.str,
                                                        })
                                                      }
                                                    >
                                                      {data.label}
                                                    </button>
                                                  ))}
                                                </div>

                                              </div>
                                            </div>

                            
                                            <div className="bg-white rounded-xl p-6 shadow-sm border">
                                              <section className='flex flex-row justify-between'>
                                                <div className="flex items-center gap-3 mb-5">
                                                  <div className="bg-[#FFFFFF] p-1.5 rounded-lg  shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                                    <img
                                                      src="/target-sale.svg"
                                                      alt="Clock Icon"
                                                      className="w-[18px] h-[18px]"
                                                    />
                                                  </div>

                                                  <h2 className=" font-normal text-[16px] leading-[100%] tracking-[0%] text-[#000000]">
                                                    Reason For Purchase
                                                  </h2>
                                                </div>
                                                <div className="flex items-center mb-4">
                                                  <div className="w-16 mr-2">
                                                    <RoundedProgressBar
                                                      progress={optionvalues.pstr}
                                                      height={8}
                                                      fillColor="#94B5ED"
                                                      showLabels={false}
                                                    />
                                                  </div>
                                                  <span className="text-xs font-medium">{`${optionvalues.pstr}%`}</span>
                                                </div>
                                              </section>
                                              <div className="grid grid-cols-1 gap-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                  {reasonPurchase.map((data, i) => (
                                                    <button
                                                      className={`py-3 px-6 font-normal text-[12px] leading-[100%] tracking-[0%] text-[#0E0A1F] rounded-md border text-center transition-colors ${optionvalues.purchase === data.value
                                                        ? 'bg-[#FCE6D9]  leading-[100%] tracking-[0] sale_text_color '
                                                        : 'bg-white hover:bg-gray-50'
                                                        }`}
                                                      onClick={() =>

                                                        setoptionvalues({
                                                          ...optionvalues,
                                                          purchase: data.value,
                                                          pstr: data.str,
                                                        })
                                                      }
                                                    >
                                                      {data.label}
                                                    </button>
                                                  ))}
                                                </div>

                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        <div></div>


                                        <div className="flex space-x-4">
                                          {siteVisitFeedbackOptions.map(
                                            (option) => (
                                              <button
                                                key={option.value}
                                                className={`py-2 px-8 text-[12px] flex border border-[#E7E7E9] rounded-lg items-center space-x-1 rounded-md ${fbTitle ===
                                                  option.value
                                                  ? 'sale_bg_color text-white'
                                                  : 'bg-white text-gray-700'
                                                  }`}
                                                onClick={() =>
                                                  setFbTitle(
                                                    option.value
                                                  )
                                                }
                                              >
                                                <img
                                                  src={`/${option.value}.svg`}
                                                  alt={option.label}
                                                  className="w-5 h-5"
                                                />
                                                <span>
                                                  {option.label}
                                                </span>
                                              </button>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    )}

                                    <div className=" w-full max-w-[882px]  h-auto p-3 md:p-2 gap-2.5   outline-none border border-[#E7E7E9] rounded-[8px] p-2 mt-2">
                                      <textarea
                                        value={fbNotes}
                                        onChange={(e) =>
                                          setfbNotes(e.target.value)
                                        }
                                        placeholder="Type & make a notes *"
                                        className="w-full min-h-[161px]  text-[12px] outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFFFFF]"
                                      ></textarea>
                                    </div>
                                    <div className="flex flex-wrap items-end item justify-end gap-4 mt-5">
                                      <button
                                        onClick={() => {
                                          if (fbNotes != '') {
                                            setLeadStatus('visitdone')
                                            if (showNotInterested) {
                                              notInterestedFun()
                                              return
                                            }
                                            addFeedbackFun(leadNextTaskObj)
                                          } else {
                                            toast.error(
                                              'Please Enter Notes'
                                            )
                                          }
                                        }}
                                        className="flex items-center px-4 h-9 text-sm font-medium text-white sale_bg_color rounded-md"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => {
                                          console.log('am i clicked')

                                          setLeadStatus('visitdone')
                                          if (showNotInterested) {
                                            notInterestedFun()
                                            return
                                          }
                                          addFeedbackFun(leadNextTaskObj)

                                          getWhatsAppTemplates(
                                            'on_sitevisit_done',
                                            'wa',
                                            'customer',
                                            ProjectId,
                                            receiverDetails,
                                            msgPayload
                                          )
                                        }}
                                        className="flex items-center px-4 h-9 text-sm font-medium text-white sale_bg_color s_btn_txt_color rounded-md"
                                      >
                                        Save & Whats App
                                      </button>
                                      <button
                                        onClick={() =>
                                          cancelResetStatusFun()
                                        }
                                        className="flex items-center px-4 h-9 text-sm font-medium text-black s_btn_txt_color border rounded-md"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                )}



                            </>
                          </div>


                        </div> */}

                        <div>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                         
                            <div className="space-y-4">
                



                               <div className="rounded-[10px] py-[16px] pb-8 shadow-[0px_4px_30px_0px_rgba(0,0,0,0.05)] border border-[#F0F0F5] bg-[#FFFFFF] max-w-lg">
      <div className="flex items-center mb-8 border-b border-gray-200 px-4 pb-[16px]">
        <div className="bg-[#FFFFFF] p-1 rounded-full mr-3 shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
          <div className="bg-[#E3F1FA] p-1 rounded-full">
            <img
              src="/folder-library.svg"
              alt=""
              className="w-[18px] h-[18px]"
            />
          </div>
        </div>
        <span className="font-medium text-[16px] text-[#0D0A1E]">
          Expo
        </span>
      </div>

      <section className="px-4">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-2xl leading-tight tracking-normal text-[#404040]">
              {selProjectFullDetails.projectName}
            </h2>

            <button
              className="font-medium text-xs leading-tight tracking-normal sale_text_color underline"
              onClick={() => setUnitsViewMode(!unitsViewMode)}
            >
              View Units ({selProjectFullDetails.availableCount}/
              {selProjectFullDetails.totalUnitCount})
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="bg-[#F3E1D8] rounded-[15px] py-1 px-2 flex gap-2 items-center">
              <img
                src={
                  selProjectFullDetails.planningApproval.toLowerCase() === "yes"
                    ? "/yessale.svg"
                    : "/nosale.svg"
                }
                alt=""
                className="w-3 h-3"
              />
              <span className="mr-2 font-outfit font-normal text-xs leading-tight tracking-normal text-[#606062]">
                Planning Approval
              </span>
            </div>

            <div className="bg-[#F3E1D8] rounded-[15px] py-1 px-2 flex gap-2 items-center">
              <img
                src={
                  selProjectFullDetails.planningApproval.toLowerCase() === "yes"
                    ? "/yessale.svg"
                    : "/nosale.svg"
                }
                alt=""
                className="w-3 h-3"
              />
              <span className="mr-2 font-outfit font-normal text-xs leading-tight tracking-normal text-[#606062]">
                RERA Approval
              </span>
            </div>

            <div className="border bg-[#F3E1D8] rounded-[15px] py-1 px-2 font-outfit font-normal text-xs leading-tight tracking-normal text-[#606062] flex items-center justify-center">
              +21 Amenities
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium text-base leading-tight tracking-normal text-[#404040] mb-2">
              Additional Information
            </h3>
            <p className="font-outfit font-normal text-sm leading-tight tracking-tight text-[#606062]">
              This is the second phase of the Shuba Ecosone development featuring
              eco-friendly design, sustainable materials, and energy-efficient
              construction. The project includes studio, 1 BHK, and 2 BHK apartments
              with modern amenities.
            </p>
            <div className="mt-3">
              <h4 className="font-medium text-base leading-tight tracking-normal text-[#404040] mb-1">
                Key Features:
              </h4>
              <ul className="font-outfit font-normal text-sm leading-tight tracking-tight text-[#606062] list-disc list-inside">
                <li>Solar-powered common areas</li>
                <li>Rainwater harvesting</li>
                <li>Organic waste composting</li>
                <li>EV charging stations</li>
              </ul>
            </div>
          </div>
        )}

        <button
          onClick={toggleExpand}
          className="mt-4 font-medium text-xs leading-tight tracking-normal text-[#606062] underline flex items-center"
        >
          View {isExpanded ? "less" : "more"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`ml-1 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </section>
    </div>







                                  {/* Call Activity Card */}
                              <div className="border border-[#F0F0F5] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.05)] bg-[#FFFFFF] cursor-pointer p-4 rounded-[10px] ">
                                <div className="flex items-center justify-between mb-6">
                                  <div className="flex items-center">
                                    <div className="bg-[#f2f7fb] p-1 rounded-full mr-3 shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                      <div className="bg-[#E3F1FA] p-1 rounded-full">
                                        {/* <Clock className="text-purple-500 w-5 h-5" /> */}
                                        <img
                                          src="/call.svg"
                                          alt=""
                                          className="w-[18px] h-[18px]"
                                        />
                                      </div>
                                    </div>
                                    <h2 className="font-semibold text-[12px] leading-[100%] tracking-[6%] uppercase text-[#2B2B2B]">
                                      Call Activity
                                    </h2>
                                  </div>
                                  <img
                                    src="/arrowright.svg"
                                    alt="Arrow Icon"
                                    className="w-5 h-5"
                                  />
                                </div>

                                <div className="space-y-4 px-4">
                                  {[
                                    {
                                      label: 'Total Talk time',
                                      value: '0 mins',
                                    },
                                    {
                                      label: 'No of time Contacted',
                                      value: '0 times',
                                    },
                                    {
                                      label: 'RNR',
                                      value: '0 times',
                                    },
                                  ].map((item, index, array) => (
                                    <div
                                      key={item.label}
                                      className={`flex justify-between items-center ${index !== array.length - 1
                                        ? 'pb-3'
                                        : ''
                                        }`}
                                    >
                                      <div className="flex gap-2 items-center">
                                        <span className="font-outfit font-normal text-sm leading-tight tracking-tight text-[#606062] whitespace-nowrap">
                                          {item.label}
                                        </span>
                                      </div>
                                      <div className="w-full mx-4 mt-[3px] h-[0.60px] relative custom-dash-border border-neutral-300"></div>
                                      <span className="font-outfit font-normal text-xs leading-tight tracking-tight text-[#606062] whitespace-nowrap">
                                        {item.value}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="border border-[#F0F0F5] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.05)] bg-[#FFFFFF] cursor-pointer p-4 rounded-[8px] ">
                                <div className="flex items-center justify-between mb-6">
                                  <div className="flex items-center">
                                    <div className="bg-[#f2f7fb] p-1 rounded-full mr-3 shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                      <div className="bg-[#E3F1FA] p-1 rounded-full">
                                        {/* <Clock className="text-purple-500 w-5 h-5" /> */}
                                        <img
                                          src="/quill_clock.svg"
                                          alt=""
                                          className="w-[18px] h-[18px]"
                                        />
                                      </div>
                                    </div>
                                    <h2 className="font-semibold text-[12px] leading-[100%] tracking-[6%] uppercase text-[#2B2B2B]">
                                      Dates
                                    </h2>
                                  </div>
                                  <img
                                    src="/arrowright.svg"
                                    alt="Arrow Icon"
                                    className="w-5 h-5"
                                  />
                                </div>

                                <div className="space-y-4 px-4">
                                  <div className="flex justify-between items-center pb-3  border-gray-200">
                                    <div className="flex items-center">
                                      <p className="font-outfit font-normal text-sm leading-tight tracking-tight text-[#606062] whitespace-nowrap">
                                        Created On
                                      </p>
                                    </div>
                                    <div className="w-full mx-4 mt-[3px] h-[0.60px] relative custom-dash-border border-neutral-300"></div>
                                    <p className="font-outfit font-normal text-[12px] leading-[100%] tracking-[0em] text-[#616162] whitespace-nowrap">
                                      {CT != undefined
                                        ? prettyDateTime(CT)
                                        : prettyDateTime(Date)}
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-center pb-3  border-gray-200">
                                    <div className="flex items-center">
                                      <p className="font-outfit font-normal text-sm leading-tight tracking-tight text-[#606062] whitespace-nowrap">
                                        Updated On :
                                      </p>
                                    </div>
                                    <div className="w-full mx-4 mt-[3px] h-[0.60px] relative custom-dash-border border-neutral-300"></div>
                                    <p className="font-outfit font-normal text-[12px] leading-[100%] tracking-[0em] text-[#616162] whitespace-nowrap">
                                      {stsUpT === undefined
                                        ? 'NA'
                                        : prettyDateTime(stsUpT) || 'NA'}
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <p className="font-outfit font-normal text-sm leading-tight tracking-tight text-[#606062] whitespace-nowrap">
                                        Assigned On
                                      </p>
                                    </div>
                                    <div className="w-full mx-4 mt-[3px] h-[0.60px] relative custom-dash-border border-neutral-300"></div>
                                    <p className="font-outfit font-normal text-[12px] leading-[100%] tracking-[0em] text-[#616162] whitespace-nowrap">
                                      {assignT != undefined
                                        ? prettyDateTime(assignT)
                                        : prettyDateTime(Date)}
                                    </p>
                                  </div>
                                </div>
                              </div>

                            </div>





                            {/* Right Column */}
                            <div className="space-y-4">




                              <div className="border border-[#E7E7E9] bg-[#FFFFFF] p-3 shadow-[0px_4px_30px_0px_rgba(0,0,0,0.05)] rounded-[10px] ">
                                <div className="flex justify-between">
                                  <div className="flex flex-col w-full ">
                                    <div className="flex items-center mb-4 justify-between pb-[16px] pt-[8px] border-b border-[#F0F0F5]">
                                      <section className="flex items-center">
                                        <div className="bg-[#f2f7fb] p-1 rounded-full mr-3 shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                          <div className="bg-[#E3F1FA] p-1 rounded-full">
                                            {/* <Clock className="text-purple-500 w-5 h-5" /> */}
                                            <img
                                              src="/location.svg"
                                              alt=""
                                              className="w-[18px] h-[18px]"
                                            />
                                          </div>
                                        </div>
                                        <span className="font-semibold text-[12px] leading-[100%] tracking-[6%] uppercase text-[#2B2B2B]">
                                          Activity (
                                          {filterData?.length})
                                        </span>
                                      </section>

                                    </div>

                                    <ActivityLogComp filterData={filterData} usersList={usersList} />

                                  </div>
                                </div>
                              </div>




                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}




              {selFeature === 'appointments' && (
                <>
                  <Formik
                    initialValues={initialState1}
                  //  validationSchema={validateSchema1}
                  // onSubmit={(values, { resetForm }) => {
                  //   console.log('values of form is ', values)
                  // }}
                  >
                    {(formik2) => (
                      <div className=" h-screen ">
                        {(showNotInterested ||
                          showVisitFeedBackStatus ||
                          showJunk) &&
                          selSchGrpO?.ct === undefined && (
                            <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFF9F2] mx-4 p-4">
                              {showNotInterested && (
                                <div className="w-full flex flex-col mb-3 mt-2">
                                  <CustomSelect
                                    name="source"
                                    label={`Why  ${customerDetails?.Name?.toLocaleUpperCase() ||
                                      'Customer'
                                      } is  not Interested *`}
                                    className="input mt-3"
                                    onChange={(value) => {
                                      // formik.setFieldValue('source', value.value)
                                      setNotInterestType(value.value)
                                    }}
                                    value={notInterestType}
                                    options={notInterestOptions}
                                  />
                                </div>
                              )}
                              {showJunk && (
                                <div className="w-full flex flex-col mb-3 mt-2">
                                  <CustomSelect
                                    name="source"
                                    label={`Why customer details are Junk ?`}
                                    className="input mt-3"
                                    onChange={(value) => {
                                      // formik.setFieldValue('source', value.value)
                                      setJunkReason(value.value)
                                    }}
                                    value={junkReason}
                                    options={junktOptions}
                                  />
                                </div>
                              )}

                              {showVisitFeedBackStatus && (
                                <div className="w-full flex flex-col mb-3 mt-2">
                                  <CustomSelect
                                    name="source"
                                    label="Sitess Visit Feedback*"
                                    className="input mt-3"
                                    onChange={(value) => {
                                      // formik.setFieldValue('source', value.value)
                                      setNotInterestType(value.value)
                                    }}
                                    value={notInterestType}
                                    options={siteVisitFeedbackOptions}
                                  />
                                </div>
                              )}

                              {!showJunk && (
                                <div className="  outline-none border  rounded p-4 mt-4">
                                  <textarea
                                    value={takNotes}
                                    onChange={(e) =>
                                      setNotesTitle(e.target.value)
                                    }
                                    placeholder="Type & make a notes"
                                    className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFF9F2] "
                                  ></textarea>
                                </div>
                              )}
                              <div className="flex flex-row mt-1">
                                <button
                                  onClick={() => notInterestedFun()}
                                  className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                >
                                  <span className="ml-1 ">Save</span>
                                </button>
                                <button
                                  onClick={() => notInterestedFun()}
                                  className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                >
                                  <span className="ml-1 ">
                                    Save & Whats App
                                  </span>
                                </button>
                                <button
                                  // onClick={() => fSetLeadsType('Add Lead')}
                                  onClick={() => cancelResetStatusFun()}
                                  className={`flex mt-2 ml-4  rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white  `}
                                >
                                  <span className="ml-1 ">Cancel</span>
                                </button>
                              </div>
                            </div>
                          )}




                        <div className="font-md font-medium text-xs  ml-2 text-gray-800 flex flex-row justify-between mr-4 py-2">
                          <section className="flex flex-row py-1"></section>
                          <div className="flex flex-row ">
                            <div className="flex flex-row bg-white rounded-xl border ">
                              <div
                                className={` py-1 pr-4 pl-4 min-w-[62px] ${selFilterVal === 'all' ? 'bg-[#E8E8E8]' : ''
                                  } rounded-xl rounded-r-none`}
                                onClick={() => setSelFilterVal('all')}
                              >
                                <span className="mr-1 text-[10px] ">All</span>

                                {
                                  leadSchFetchedData.filter(
                                    (d) => d?.schTime != undefined
                                  ).length
                                }
                              </div>
                              <div
                                className={` py-1 pr-4 pl-4 min-w-[62px] border-x ${selFilterVal === 'pending'
                                  ? 'bg-[#E8E8E8] text-[0E0A1F]'
                                  : ''
                                  } `}
                                onClick={() => setSelFilterVal('pending')}
                              >
                                {/* <CheckCircleIcon className="w-4 h-3  inline " /> */}
                                <span className="mr-1 text-[10px] ">
                                  Pending
                                </span>
                                <span
                                  className=" text-[11
                              px] "
                                >
                                  {' '}
                                  {
                                    leadSchFetchedData?.filter(
                                      (d) => d?.sts === 'pending'
                                    ).length
                                  }
                                </span>
                              </div>
                              <div
                                className={` py-1 pr-4 pl-4 min-w-[62px] ${selFilterVal === 'completed'
                                  ? 'bg-[#E8E8E8]'
                                  : ''
                                  }  rounded-xl rounded-l-none`}
                                onClick={() => setSelFilterVal('completed')}
                              >
                                {/* <CheckCircleIcon className="w-4 h-3 inline text-[#058527]" /> */}
                                <span className="mr-1 text-[10px] ">
                                  Completed
                                </span>

                                {
                                  leadSchFetchedData?.filter(
                                    (d) => d?.sts === 'completed'
                                  ).length
                                }
                              </div>
                            </div>
                          </div>
                        </div>




                        {loader && (
                          <div
                            id="toast-success"
                            className="flex items-center w-[95%] mx-4  p-2 text-white
                     bg-[#516F90]"
                            role="alert"
                          >
                            {/* {loader && (
                        <span className="pl-3 pr-3">
                          {' '}

                          <svg
                            height="21"
                            viewBox="0 0 21 21"
                            width="21"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              transform="translate(1 1)"
                            >
                              <path
                                d="m9.5.5 9 16h-18z"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="m9.5 10.5v-5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle
                                cx="9.5"
                                cy="13.5"
                                fill="currentColor"
                                r="1"
                              />
                            </g>
                          </svg>
                        </span>
                      )} */}

                            <div className=" text-sm font-normal font-bodyLato tight-wider">
                              {/* <div className=" text-sm font-normal font-bodyLato tight-wider">
                          Create Task
                        </div> */}
                              Hey, Plan your{' '}
                              <span className="text-xs  tight-wider ">
                                {tempLeadStatus.toLocaleUpperCase()}{' '}
                              </span>
                              ..!
                            </div>
                            <button
                              type="button"
                              className="ml-auto -mx-0.5 -my-0.5  text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 "
                              data-dismiss-target="#toast-success"
                              aria-label="Close"
                            >
                              <span className="sr-only">Close</span>
                              <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        )}
                        {addSch && (
                          <div className="flex flex-col pt-0 my-10 mx-4 mt-[0px] ">
                            <Formik
                              enableReinitialize={true}
                              initialValues={initialState}
                              validationSchema={validateSchema}
                              onSubmit={(values, { resetForm }) => {
                                fAddSchedule()
                              }}
                            >
                              {(formik) => (
                                <Form>
                                  <div className=" form outline-none border  py-4">
                                    <section className=" px-4">
                                      {/* {['visitfixed'].includes(tempLeadStatus) && (
                            <div className="flex flex-row  border-b mb-4 ">
                              <div className=" mb-3 flex justify-between">
                                <section>
                                  <span
                                    className={`cursor-pointer  items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                    onClick={() => setTakTitle('Call again')}
                                  >
                                    Call again {addSch.toString()}
                                  </span>
                                  <span
                                    className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                    onClick={() =>
                                      setTakTitle('Get more details')
                                    }
                                  >
                                    Get more details
                                  </span>
                                  <span
                                    className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                    onClick={() => setTakTitle('Book Cab')}
                                  >
                                    Book Cab
                                  </span>
                                  <span
                                    className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                    onClick={() =>
                                      setTakTitle('Share Quotation')
                                    }
                                  >
                                    Share Quotation
                                  </span>
                                </section>
                              </div>
                            </div>
                          )} */}
                                      <div className="text-xs font-bodyLato text-[#516f90]">
                                        Task Title
                                        <ErrorMessage
                                          component="div"
                                          name="taskTitle"
                                          className="error-message text-red-700 text-xs p-1"
                                        />
                                      </div>
                                      <input
                                        // onChange={setTakTitle()}
                                        autoFocus
                                        name="taskTitle"
                                        type="text"
                                        value={takTitle}
                                        onChange={(e) => {
                                          formik.setFieldValue(
                                            'taskTitle',
                                            e.target.value
                                          )
                                          setTitleFun(e)
                                        }}
                                        placeholder="Enter a short title"
                                        className="w-full h-full pb-1 outline-none text-sm font-bodyLato focus:border-blue-600 hover:border-blue-600  border-b border-[#cdcdcd] text-[33475b] bg-[#F2F5F8] "
                                      ></input>
                                      <div className="flex flex-row mt-3">
                                        <section>
                                          <span className="text-xs font-bodyLato text-[#516f90]">
                                            <span className="">
                                              {tempLeadStatus
                                                .charAt(0)
                                                .toUpperCase() +
                                                tempLeadStatus.slice(1)}{' '}
                                            </span>
                                            Due Date
                                          </span>
                                          <div className="bg-green   pl-   flex flex-row ">
                                            {/* <CalendarIcon className="w-4  ml-1 inline text-[#058527]" /> */}
                                            <span className="inline">
                                              <CustomDatePicker
                                                className=" mt-[2px] pl- px- min-w-[240px] inline text-xs text-[#0091ae] bg-[#F2F5F8]"
                                                selected={startDate}
                                                onChange={(date) =>
                                                  setStartDate(date)
                                                }
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                injectTimes={[
                                                  setHours(setMinutes(d, 1), 0),
                                                  setHours(
                                                    setMinutes(d, 5),
                                                    12
                                                  ),
                                                  setHours(
                                                    setMinutes(d, 59),
                                                    23
                                                  ),
                                                ]}
                                                dateFormat="MMM d, yyyy h:mm aa"

                                              />
                                            </span>
                                          </div>
                                        </section>
                                      </div>
                                    </section>
                                    <div className="flex flex-row mt-4 justify-between pr-4 border-t">
                                      <section>
                                        <span>{''}</span>
                                      </section>
                                      <section className="flex">
                                        <button
                                          type="submit"
                                          // onClick={() => fAddSchedule()}
                                          className={`flex mt-2 cursor-pointer rounded-xs text-bodyLato items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                                        >
                                          <span className="ml-1 ">
                                            Create{' '}
                                            {tempLeadStatus !=
                                              streamCurrentStatus &&
                                              tempLeadStatus}{' '}
                                            Task
                                          </span>
                                        </button>
                                        <button
                                          // onClick={() => fSetLeadsType('Add Lead')}
                                          onClick={() => cancelResetStatusFun()}
                                          className={`flex mt-2 ml-4 rounded items-center text-bodyLato pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white `}
                                        >
                                          <span className="ml-1 ">Cancel</span>
                                        </button>
                                      </section>
                                    </div>
                                  </div>
                                </Form>
                              )}
                            </Formik>
                          </div>
                        )}
                        {/* {addSch && (
                    <div className="flex flex-col pt-0 my-10 mx-4 mt-[10px] rounded">
                      <div className="  outline-none border  rounded p-4">
                        <div className=" text-sm font-normal">
                          Set{' '}
                          <span className="text-xs  text-orange-600">
                            {tempLeadStatus.toLocaleUpperCase()}{' '}
                          </span>
                          Time
                        </div>
                        {['visitfixed'].includes(tempLeadStatus) && (
                          <div className="flex flex-row  border-b mb-4">
                            <div className=" mb-3 flex justify-between">
                              <section>
                                <span
                                  className={`cursor-pointer  items-center h-6 px-3 py-1 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                  onClick={() => setTakTitle('Call again')}
                                >
                                  Call again {addSch.toString()}
                                </span>
                                <span
                                  className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                  onClick={() =>
                                    setTakTitle('Get more details')
                                  }
                                >
                                  Get more details
                                </span>
                                <span
                                  className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                  onClick={() => setTakTitle('Book Cab')}
                                >
                                  Book Cab
                                </span>
                                <span
                                  className={`cursor-pointer  items-center h-6 px-3 py-1 ml-4 mt-1 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full
                      `}
                                  onClick={() => setTakTitle('Share Quotation')}
                                >
                                  Share Quotation
                                </span>
                              </section>
                            </div>
                          </div>
                        )}

                        <textarea
                          // onChange={setTakTitle()}
                          value={takTitle}
                          onChange={(e) => setTitleFun(e)}
                          placeholder="Schedule Title"
                          className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded  "
                        ></textarea>
                        <div className="flex flex-row mt-1">
                          <div className="bg-green border  pl-4  rounded flex flex-row mt-2 h-[36px]">
                            <CalendarIcon className="w-4  ml-1 inline text-[#058527]" />
                            <span className="inline">
                              <DatePicker
                                className=" mt-[7px] pl- px-2  inline text-sm "
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                injectTimes={[
                                  setHours(setMinutes(d, 1), 0),
                                  setHours(setMinutes(d, 5), 12),
                                  setHours(setMinutes(d, 59), 23),
                                ]}
                                dateFormat="MMMM d, yyyy h:mm aa"
                              />
                            </span>
                          </div>

                          <div className="flex ml-4 mt-1 h-[36px]">
                            <Listbox value={selected} onChange={setSelected}>
                              <div className="relative mt-1">
                                <Listbox.Button className="relative w-full w-[116px]  h-[36px] py-2 pl-3 pr-10 text-left border bg-white rounded  cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                  <span className="block truncate">
                                    {selected.name}
                                  </span>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                    <SelectorIcon
                                      className="w-5 h-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </Listbox.Button>
                                <Transition
                                  as={Fragment}
                                  leave="transition ease-in duration-100"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {people.map((person, personIdx) => (
                                      <Listbox.Option
                                        key={personIdx}
                                        className={({ active }) =>
                                          `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                            active
                                              ? 'text-amber-900 bg-amber-100'
                                              : 'text-gray-900'
                                          }`
                                        }
                                        value={person}
                                      >
                                        {({ selected }) => (
                                          <>
                                            <span
                                              className={`block truncate ${
                                                selected
                                                  ? 'font-medium'
                                                  : 'font-normal'
                                              }`}
                                            >
                                              {person.name}
                                            </span>
                                            {selected ? (
                                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                <CheckIcon
                                                  className="w-5 h-5"
                                                  aria-hidden="true"
                                                />
                                              </span>
                                            ) : null}
                                          </>
                                        )}
                                      </Listbox.Option>
                                    ))}
                                  </Listbox.Options>
                                </Transition>
                              </div>
                            </Listbox>
                          </div>
                        </div>
                      </div>


                      <div className="flex flex-row mt-4">
                        <button
                          onClick={() => fAddSchedule()}
                          className={`flex mt-2 cursor-pointer rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                        >
                          <span className="ml-1 ">Add Schedule</span>
                        </button>
                        <button
                          // onClick={() => fSetLeadsType('Add Lead')}
                          onClick={() => cancelResetStatusFun()}
                          className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700  `}
                        >
                          <span className="ml-1 ">Cancel</span>
                        </button>
                      </div>
                    </div>
                  )} */}

                        {leadSchLoading &&
                          [1, 2, 3].map((data, i) => <LogSkelton key={i} />)}

                        {!leadSchLoading &&
                          leadSchFetchedData.length == 0 &&
                          !addSch && (
                            <div className="py-8 px-8 flex flex-col items-center">
                              <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                                <img
                                  className="w-[200px] h-[200px] inline"
                                  alt=""
                                  src="/target.svg"
                                />
                              </div>
                              <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                                No Appointmentss
                              </h3>
                              <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                                Appointments always bring more suprises{' '}
                                <span
                                  className="text-blue-600"
                                  onClick={() => setAddSch(true)}
                                >
                                  Add new
                                </span>
                              </time>
                            </div>
                          )}

                        <div className="py-2">
                          <ol className="  rounded-[8px] border-[1px]  border-[#E7E7E9] shadow-[0px_4px_30px_0px_rgba(0,0,0,0.05)] ">
                            {leadSchFilteredData.map((data, i) => (
                              <section
                                key={i}
                                className="py-1 border-b  last:border-none"
                                onMouseEnter={() => {
                                  hoverEffectTaskFun(data?.ct)
                                }}
                                onMouseLeave={() => {
                                  hoverEffectTaskFun(2000)
                                }}
                              >
                                <div className="py-1 px-5">
                                  <div className="pb-3">
                                    {editTaskObj?.ct === data?.ct ? (
                                      <EditLeadTask
                                        editTaskObj={editTaskObj}
                                        setStartDate={setStartDate}
                                        startDate={startDate}
                                        takTitle={takTitle}
                                        setTitleFun={setTitleFun}
                                        cancelResetStatusFun={
                                          cancelResetStatusFun
                                        }
                                        editTaskFun={editTaskFun}
                                        d={d}
                                      />
                                    ) : null}
                                  </div>

                                  <>
                                    {' '}
                                    <LeadTaskDisplayHead
                                      data={data}
                                      setAddTaskCommentObj={
                                        setAddTaskCommentObj
                                      }
                                      closeTaskFun={closeTaskFun}
                                      hoverTasId={hoverTasId}
                                      undoFun={undoFun}
                                      setShowVisitFeedBackStatusFun={
                                        setShowVisitFeedBackStatusFun
                                      }
                                      EditTaskOpenWindowFun={
                                        EditTaskOpenWindowFun
                                      }
                                    />
                                    {addTaskCommentObj?.ct === data?.ct && (
                                      <div className="">
                                        <AddLeadTaskComment
                                          closeTask={closeTask}
                                          data={data}
                                          setShowVisitFeedBackStatusFun={
                                            setShowVisitFeedBackStatusFun
                                          }
                                          setShowNotInterestedFun={
                                            setShowNotInterestedFun
                                          }
                                          setAddCommentTitle={
                                            setAddCommentTitle
                                          }
                                          addCommentTitle={addCommentTitle}
                                          addCommentTime={addCommentTime}
                                          setPostPoneToFuture={
                                            setPostPoneToFuture
                                          }
                                          setClosePrevious={setClosePrevious}
                                          setAddCommentPlusTask={
                                            setAddCommentPlusTask
                                          }
                                          setAddCommentTime={setAddCommentTime}
                                          cancelResetStatusFun={
                                            cancelResetStatusFun
                                          }
                                          addTaskCommentFun={addTaskCommentFun}
                                          addCommentPlusTask={
                                            addCommentPlusTask
                                          }
                                          setSelType={setSelType}
                                          selType={selType}
                                          d={d}
                                        />
                                      </div>
                                    )}
                                    {/* <div className='ml-7 border-b border-[#E7E7E9] py-2 min-h-[1px]'>
                                        {addTaskCommentObj?.ct != data?.ct && (
                                          <LeadTaskFooter
                                            data={data}
                                            hoverTasId={hoverTasId}
                                            EditTaskOpenWindowFun={
                                              EditTaskOpenWindowFun
                                            }
                                            delFun={delFun}
                                          />
                                        )}
                                      </div> */}
                                    <div
                                      className={`ml-7 pb-[8px] min-h-[1px]`}
                                    >
                                      {addTaskCommentObj?.ct != data?.ct && (
                                        <LeadTaskFooter
                                          data={data}
                                          hoverTasId={hoverTasId}
                                          EditTaskOpenWindowFun={
                                            EditTaskOpenWindowFun
                                          }
                                          delFun={delFun}
                                        />
                                      )}
                                    </div>
                                    {/*
{data?.comments?.length > 0 && (
  <p className="font-outfit font-medium text-[12px] leading-[100%] tracking-[0%] text-[#606062] mt-4 mb-2 ml-6 mb-2">
    {data.comments.length} Comment{data.comments.length > 1 ? 's' : ''}
  </p>
)} */}
                                    {/* {data?.comments?.length > 0 && (
  <div className="flex items-center mt-4 mb-2 ml-6">
    <div className="w-4 h-px bg-[#E7E7E9] mr-2" />
    <p className="font-outfit font-medium text-[12px] leading-[100%] tracking-[0%] text-[#606062]">
      {data.comments.length} Comment{data.comments.length > 1 ? 's' : ''}
    </p>
  </div>
)} */}
                                    {data?.comments?.length > 0 && (
                                      <div
                                        className={`flex items-center mt-[2px] mb-1 ${data?.stsType === 'visitfixed' &&
                                          data?.sts !== 'completed'
                                          ? 'ml-[15px]'
                                          : 'ml-[15px]'
                                          }`}
                                      >
                                        <p className="font-outfit font-medium text-[12px] leading-[100%] tracking-[0%] text-[#606062] ml-[16px]">
                                          {data.comments.length} Comment
                                          {data.comments.length > 1
                                            ? 's'
                                            : ''}
                                        </p>
                                      </div>
                                    )}
                                    {data?.comments?.map((commentObj, k) => {
                                      return (
                                        <li
                                          // key={k}
                                          // className={`ml-6 pl-6  py-3 text-[14px] text-[#7E92A2] tracking-wide ${data?.comments?.length - 1 === k
                                          //   ? 'mb-1'
                                          //   : ''
                                          //   }`}

                                          className={` ml-[29px] ${data?.stsType === 'visitfixed' &&
                                            data?.sts !== 'completed'
                                            ? 'pl-0'
                                            : 'pl-0'
                                            } py-[4px] text-[14px] text-[#7E92A2] tracking-wide ${data?.comments?.length - 1 === k
                                              ? 'mb-1'
                                              : ''
                                            }`}
                                        >
                                          <section className="flex flex-row justify-between items-center w-full">
                                            <div className="flex items-center space-x-2">
                                              {/* <span>
                                              {' '}

                                              {' '} */}

                                              <img
                                                src="/material-symbols-light_add-task-rounded.svg"
                                                alt="Clock Icon"
                                                className="w-[14px] h-[14px]"
                                              />

                                              <span className="font-outfit font-normal text-sm leading-tight tracking-tight text-[#7E92A2]">
                                                {commentObj?.c}
                                              </span>
                                              {/* </span> */}
                                            </div>
                                            <p className="text-[12px] font-normal leading-[14px] tracking-normal text-[#606062]">
                                              {' '}
                                              {prettyDateTime(commentObj?.t)}
                                            </p>
                                          </section>
                                        </li>
                                      )
                                    })}
                                    {(showNotInterested ||
                                      showVisitFeedBackStatus) &&
                                      selSchGrpO?.ct === data?.ct && (
                                        <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-white mx-2">
                                          {showNotInterested && (
                                            <div className="w-full flex flex-col mb-3 mt-2">
                                              <SelectDropDownComp
                                                label={`Why  ${customerDetails?.Name?.toLocaleUpperCase() ||
                                                  'Customer'
                                                  } is  not Interested*`}
                                                options={notInterestOptions}
                                                value={fbTitle}
                                                onChange={(value) => {
                                                  setFbTitle(value.value)
                                                }}
                                              />
                                            </div>
                                          )}

                                          {/* {showVisitFeedBackStatus && (
                                              <div className="w-full flex flex-col mb-3 mt-2">
                                                <SelectDropDownComp
                                                  label="Sites Visit Feedback *"
                                                  options={
                                                    siteVisitFeedbackOptions
                                                  }
                                                  value={fbTitle}
                                                  onChange={(value) => {
                                                    setFbTitle(value.value)
                                                  }}
                                                />
                                              </div>
                                            )} */}

                                          {showVisitFeedBackStatus && (
                                            <div className="w-full flex  flex-col mb-3 mt-2">
                                              <label className="mb-4 font-outfit font-normal text-xs leading-[100%] tracking-[0%] text-[#606062]">
                                                Sites Visit Feedback *
                                              </label>

                                              <div className=" py-4">
                                                <div className="grid grid-cols-2 gap-6">




                                                  {/* Left Reason Section */}
                                                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                                                    <section className='flex flex-row justify-between'>
                                                      <div className="flex items-center gap-3 mb-5">
                                                        <div className="bg-[#FFFFFF] p-1.5 rounded-lg  shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                                          <img
                                                            src="/target-sale.svg"
                                                            alt="Clock Icon"
                                                            className="w-[18px] h-[18px]"
                                                          />
                                                        </div>

                                                        <h2 className=" font-normal text-[16px] leading-[100%] tracking-[0%] text-[#000000]">
                                                          Budget
                                                        </h2>
                                                      </div>
                                                      <div className="flex items-center mb-4">
                                                        <div className="w-16 mr-2">
                                                          <RoundedProgressBar
                                                            progress={optionvalues.bstr}
                                                            height={8}
                                                            fillColor="#94B5ED"
                                                            showLabels={false}
                                                          />
                                                        </div>
                                                        <span className="text-xs font-medium">{`${optionvalues.bstr}%`}</span>
                                                      </div>
                                                    </section>
                                                    <div className="grid grid-cols-1 gap-4">
                                                      <div className="grid grid-cols-2 gap-4">
                                                        {lookingAtBudgetRange.map((data, i) => (
                                                          <button
                                                            className={`py-3 px-6 font-normal text-[12px] leading-[100%] tracking-[0%] text-[#0E0A1F] rounded-md border text-center transition-colors ${optionvalues.budget === data.value
                                                              ? 'bg-[#FCE6D9]  leading-[100%] tracking-[0] sale_text_color '
                                                              : 'bg-white hover:bg-gray-50'
                                                              }`}
                                                            onClick={() =>

                                                              setoptionvalues({
                                                                ...optionvalues,
                                                                budget: data.value,
                                                                bstr: data.str,
                                                              })
                                                            }
                                                          >
                                                            {data.label}
                                                          </button>
                                                        ))}
                                                      </div>

                                                    </div>
                                                  </div>

                                                  {/* Right Reason Section */}
                                                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                                                    <section className='flex flex-row justify-between'>
                                                      <div className="flex items-center gap-3 mb-5">
                                                        <div className="bg-[#FFFFFF] p-1.5 rounded-lg  shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                                          <img
                                                            src="/target-sale.svg"
                                                            alt="Clock Icon"
                                                            className="w-[18px] h-[18px]"
                                                          />
                                                        </div>

                                                        <h2 className=" font-normal text-[16px] leading-[100%] tracking-[0%] text-[#000000]">
                                                          Configuration
                                                        </h2>
                                                      </div>
                                                      <div className="flex items-center mb-4">
                                                        <div className="w-16 mr-2">
                                                          <RoundedProgressBar
                                                            progress={optionvalues.confstr || 0}
                                                            height={8}
                                                            fillColor="#94B5ED"
                                                            showLabels={false}
                                                          />
                                                        </div>
                                                        <span className="text-xs font-medium">{`${optionvalues.confstr || 0}%`}</span>
                                                      </div>
                                                    </section>
                                                    <div className="grid grid-cols-1 gap-4">
                                                      <div className="grid grid-cols-3 gap-4">
                                                        {bedRoomConfigurtionRange.map((data, i) => (
                                                          <button
                                                            className={`py-3 px-6 font-normal text-[12px] leading-[100%] tracking-[0%] text-[#0E0A1F] rounded-md border text-center transition-colors ${optionvalues.config === data.value
                                                              ? 'bg-[#FCE6D9]  leading-[100%] tracking-[0] sale_text_color '
                                                              : 'bg-white hover:bg-gray-50'
                                                              }`}
                                                            onClick={() =>

                                                              setoptionvalues({
                                                                ...optionvalues,
                                                                config: data.value,
                                                                confstr: data.str,
                                                              })
                                                            }
                                                          >
                                                            {data.label}
                                                          </button>
                                                        ))}
                                                      </div>

                                                    </div>
                                                  </div>
                                                  {/* Left Reason Section */}
                                                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                                                    <section className='flex flex-row justify-between'>
                                                      <div className="flex items-center gap-3 mb-5">
                                                        <div className="bg-[#FFFFFF] p-1.5 rounded-lg  shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                                          <img
                                                            src="/target-sale.svg"
                                                            alt="Clock Icon"
                                                            className="w-[18px] h-[18px]"
                                                          />
                                                        </div>

                                                        <h2 className=" font-normal text-[16px] leading-[100%] tracking-[0%] text-[#000000]">
                                                          Preferred Area
                                                        </h2>
                                                      </div>
                                                      <div className="flex items-center mb-4">
                                                        <div className="w-16 mr-2">
                                                          <RoundedProgressBar
                                                            progress={optionvalues.astr}
                                                            height={8}
                                                            fillColor="#94B5ED"
                                                            showLabels={false}
                                                          />
                                                        </div>
                                                        <span className="text-xs font-medium">{`${optionvalues.astr}%`}</span>
                                                      </div>
                                                    </section>
                                                    <div className="grid grid-cols-1 gap-4">
                                                      <div className="grid grid-cols-2 gap-4">
                                                        {preferredArea.map((data, i) => (
                                                          <button
                                                            className={`py-3 px-6 font-normal text-[12px] leading-[100%] tracking-[0%] text-[#0E0A1F] rounded-md border text-center transition-colors ${optionvalues.area === data.value
                                                              ? 'bg-[#FCE6D9]  leading-[100%] tracking-[0] sale_text_color '
                                                              : 'bg-white hover:bg-gray-50'
                                                              }`}
                                                            onClick={() =>

                                                              setoptionvalues({
                                                                ...optionvalues,
                                                                area: data.value,
                                                                astr: data.str,
                                                              })
                                                            }
                                                          >
                                                            {data.label}
                                                          </button>
                                                        ))}
                                                      </div>

                                                    </div>
                                                  </div>

                                                  {/* Right Reason Section */}
                                                  <div className="bg-white rounded-xl p-6 shadow-sm border">
                                                    <section className='flex flex-row justify-between'>
                                                      <div className="flex items-center gap-3 mb-5">
                                                        <div className="bg-[#FFFFFF] p-1.5 rounded-lg  shadow-[0px_0.75px_4px_0px_rgba(0,0,0,0.1)]">
                                                          <img
                                                            src="/target-sale.svg"
                                                            alt="Clock Icon"
                                                            className="w-[18px] h-[18px]"
                                                          />
                                                        </div>

                                                        <h2 className=" font-normal text-[16px] leading-[100%] tracking-[0%] text-[#000000]">
                                                          Reason For Purchase
                                                        </h2>
                                                      </div>
                                                      <div className="flex items-center mb-4">
                                                        <div className="w-16 mr-2">
                                                          <RoundedProgressBar
                                                            progress={optionvalues.pstr}
                                                            height={8}
                                                            fillColor="#94B5ED"
                                                            showLabels={false}
                                                          />
                                                        </div>
                                                        <span className="text-xs font-medium">{`${optionvalues.pstr}%`}</span>
                                                      </div>
                                                    </section>
                                                    <div className="grid grid-cols-1 gap-4">
                                                      <div className="grid grid-cols-2 gap-4">
                                                        {reasonPurchase.map((data, i) => (
                                                          <button
                                                            className={`py-3 px-6 font-normal text-[12px] leading-[100%] tracking-[0%] text-[#0E0A1F] rounded-md border text-center transition-colors ${optionvalues.purchase === data.value
                                                              ? 'bg-[#FCE6D9]  leading-[100%] tracking-[0] sale_text_color '
                                                              : 'bg-white hover:bg-gray-50'
                                                              }`}
                                                            onClick={() =>

                                                              setoptionvalues({
                                                                ...optionvalues,
                                                                purchase: data.value,
                                                                pstr: data.str,
                                                              })
                                                            }
                                                          >
                                                            {data.label}
                                                          </button>
                                                        ))}
                                                      </div>

                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              <div></div>


                                              <div className="flex space-x-4">
                                                {siteVisitFeedbackOptions.map(
                                                  (option) => (
                                                    <button
                                                      key={option.value}
                                                      className={`py-2 px-8 text-[12px] flex border border-[#E7E7E9] rounded-lg items-center space-x-1 rounded-md ${fbTitle ===
                                                        option.value
                                                        ? 'sale_bg_color text-white'
                                                        : 'bg-white text-gray-700'
                                                        }`}
                                                      onClick={() =>
                                                        setFbTitle(
                                                          option.value
                                                        )
                                                      }
                                                    >
                                                      <img
                                                        src={`/${option.value}.svg`}
                                                        alt={option.label}
                                                        className="w-5 h-5"
                                                      />
                                                      <span>
                                                        {option.label}
                                                      </span>
                                                    </button>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          )}

                                          <div className=" w-full max-w-[882px]  h-auto p-3 md:p-2 gap-2.5   outline-none border border-[#E7E7E9] rounded-[8px] p-2 mt-2">
                                            <textarea
                                              value={fbNotes}
                                              onChange={(e) =>
                                                setfbNotes(e.target.value)
                                              }
                                              placeholder="Type & make a notes *"
                                              className="w-full min-h-[161px]  text-[12px] outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFFFFF]"
                                            ></textarea>
                                          </div>
                                          <div className="flex flex-wrap items-end item justify-end gap-4 mt-5">
                                            <button
                                              onClick={() => {
                                                if (fbNotes != '') {
                                                  setLeadStatus('visitdone')
                                                  if (showNotInterested) {
                                                    notInterestedFun()
                                                    return
                                                  }
                                                  addFeedbackFun(data)
                                                } else {
                                                  toast.error(
                                                    'Please Enter Notes'
                                                  )
                                                }
                                              }}
                                              // className={`flex mt-2 rounded-lg items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-balck  bg-[#7bd2ea]  hover:bg-gray-700 hover:text-white `}
                                              className="flex items-center px-4 h-9 text-sm font-medium text-white sale_bg_color rounded-md"
                                            >
                                              Save
                                            </button>
                                            <button
                                              onClick={() => {
                                                console.log('am i clicked')

                                                setLeadStatus('visitdone')
                                                if (showNotInterested) {
                                                  notInterestedFun()
                                                  return
                                                }
                                                addFeedbackFun(data)

                                                getWhatsAppTemplates(
                                                  'on_sitevisit_done',
                                                  'wa',
                                                  'customer',
                                                  ProjectId,
                                                  receiverDetails,
                                                  msgPayload
                                                )
                                              }}
                                              // className={`flex mt-2 ml-4 rounded-lg items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-balck  bg-[#7bd2ea]  hover:bg-gray-700 hover:text-white `}
                                              className="flex items-center px-4 h-9 text-sm font-medium text-white sale_bg_color s_btn_txt_color rounded-md"
                                            >
                                              Save & Whats App
                                            </button>
                                            <button
                                              onClick={() =>
                                                cancelResetStatusFun()
                                              }
                                              // className={`flex mt-2 ml-4  rounded-lg items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium border  hover:bg-gray-700 hover:text-white  `}
                                              className="flex items-center px-4 h-9 text-sm font-medium text-black s_btn_txt_color border rounded-md"
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        </div>
                                      )}


                                  </>
                                </div>
                              </section>

                              // </div>
                            ))}{' '}
                          </ol>
                        </div>


                        {/* comments section */}
                      </div>
                    )}
                  </Formik>
                </>
              )}


              {selFeature === 'timeline' && (
                <div className="py-8">
                  {filterData?.length == 0 && (
                    <div className="py-8 px-8 flex flex-col items-center">
                      <div className="font-md font-medium text-xs mb-4 text-gray-800 items-center">
                        <img
                          className="w-[200px] h-[200px] inline"
                          alt=""
                          src="/templates.svg"
                        />
                      </div>
                      <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                        Timeline is Empty
                      </h3>
                      <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                        This scenario is very rare to view
                      </time>
                    </div>
                  )}

                  <div className="text-gray-600 font-medium mr-6 text-[12px] uppercase tracking-wide mb-4 ">
                    Timeline
                  </div>
                  <ActivityLogComp filterData={filterData} usersList={usersList} />

                </div>
              )}

            </section>

                  <SiderForm
        open={isImportLeadsOpen}
        setOpen={setisImportLeadsOpen}
        title={'Edit Lead'}
        leadDetailsObj={leadDetailsObj}
        widthClass="max-w-4xl"
      />
          </>
        )}
      </div>
    </div>
  )
}
