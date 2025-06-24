/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { PhoneIcon } from '@heroicons/react/outline'
import {
  XIcon,
} from '@heroicons/react/solid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

import {
  addLeadScheduler,
  deleteSchLog,
  steamLeadActivityLog,
  steamLeadScheduleLog,
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
  prettyDate,
  prettyDateTime,
} from 'src/util/dateConverter'


import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'


import { useSnackbar } from 'notistack'

import SiderForm from '../SiderForm/SiderForm'


import AssigedToDropComp from '../assignedToDropComp'

import { USER_ROLES } from 'src/constants/userRoles'

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
    eventName: '',
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
    setSelProjectIs({ eventName: Event, uid: ProjectId })

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
          user.label = user.eventName
          user.value = user.eventName
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
      eventName: Event,
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
      } else if (
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
      } else if (
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
      } else {
        setStatusValidError(true)
        console.log('newStatus?.value', newStatus?.value, selCustomerPayload)

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
      await setTakTitle('Share the Details with Stalls team')
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
    //     <div
    //       className={`bg-[#F9F7F5]   h-screen    ${openUserProfile ? 'hidden' : ''} `}
    //     >
    //       <div className=" pb-[2px] px-3 mt-0 rounded-xs border-b bg-[#F9F7F5]">
    //         <div className="-mx-3 flex  sm:-mx-4 px-3">
    //           <div className="w-full   ">


    //             <div className="flex flex-col justify-between">
    //               <section className="flex flex-row justify-between px-3 py-1   rounded-md ">
    //                 <section>
    //                   <section className="flex flex-row">

    //                            <section className="bg-violet-100  items-center rounded-2xl shadow-xs flex flex-col px-2 py-1 min-w-[100px]">
    //                                             <div className="font-semibold text-[#1e1e1e]  text-[22px]  mb-[1] tracking-wide">
    //                                             {selCustomerPayload?.unit_no}
    //                                             </div>
    //                                             <span
    //                                               className={`items-center h-6   text-xs font-semibold text-[#1e1e1e]  rounded-full
    //                       `}
    //                                             >
    //                                               Stall No
    //                                             </span>
    //                                           </section>


    //                                           <div className="flex flex-col w-full  ml-2 item-right  px-2  mr-2 rounded-lg">
    //                                             <span
    //                                               className={`items-center  mt-[2px] mb-1  text-xl uppercase font-semibold text-black
    //                       `}
    //                                             >
    //                                               {selCustomerPayload?.companyName ||
    //                                                 'NA'}
    //                                             </span>
    //                                             <span
    //                                               className={`items-center   mb-1  text-xs
    //                       `}
    //                                             >
    //                                               {selCustomerPayload?.co_Name1 ||
    //                                                 'NA'}
    //                                             </span>
    //                                             <span
    //                                               className={`items-center  mb-1  text-xs flex flex-row
    //                       `}
    //                                             >


    // <PhoneIcon className="h-4 w-4 mt-1 mr-1" aria-hidden="true" />{' '}
    //          <span className='mt-[2px]'>   {selCustomerPayload?.phoneNo1?.toString()?.replace(
    //               /(\d{3})(\d{3})(\d{4})/,
    //               '$1-$2-$3'
    //             )}</span>
    //                                             </span>


    //                                           </div>

    //                   </section>


    //                 </section>
    //                 <section className="flex flex-row  h-[28px] mt-6">
    //                   <section className="flex flow-row justify-between mb-1 mr-2 py-[0px] px-[10px] bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline">
    //                     <div className="font-md text-xs text-gray-700 tracking-wide mr-1">
    //                       Stalls Owner
    //                     </div>
    //                     <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
    //                       {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
    //                         <div>
    //                           <AssigedToDropComp
    //                             assignerName={assignerName}
    //                             id={id}
    //                             setAssigner={setAssignerFun}
    //                             usersList={usersList}
    //                             align={undefined}
    //                           />
    //                         </div>
    //                       )}
    //                       {user?.role?.includes(USER_ROLES.CP_AGENT) && (
    //                         <span className="text-left text-sm">
    //                           {' '}
    //                           {assignerName}
    //                         </span>
    //                       )}
    //                     </div>
    //                   </section>
    //                   <section className="flex flow-row justify-between mb-1 mr-2 py-[0px] px-[10px] bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline">
    //                     <div className="font-md text-xs text-gray-700 tracking-wide mr-1">
    //                       Status
    //                     </div>
    //                     <div className="font-md text-xs tracking-wide font-semibold text-slate-900 ">
    //                       {!user?.role?.includes(USER_ROLES.CP_AGENT) && (
    //                         <div>
    //                           <AssigedToDropComp
    //                             assignerName={unitStatus}
    //                             id={id}
    //                             setAssigner={setStatusFun}
    //                             usersList={StatusListA}
    //                             align={undefined}
    //                           />
    //                         </div>
    //                       )}
    //                       {user?.role?.includes(USER_ROLES.CP_AGENT) && (
    //                         <span className="text-left text-sm">
    //                           {' '}
    //                           {assignerName}
    //                         </span>
    //                       )}
    //                     </div>
    //                   </section>
    //                   <section
    //                     className="text-center px-[10px] py-[2px] pt-[3px] h-[24px] bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline"
    //                     onClickCapture={() => {
    //                       openPaymentFun()
    //                     }}
    //                   >
    //                     CAPTURE PAYMENT
    //                   </section>
    //                   {customerDetails?.man_cs_approval==="approved" &&<section
    //                     className="text-center px-[10px] py-[2px]  pt-[3px] h-[24px] ml-2 bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline"
    //                     onClickCapture={() => {
    //                       openDemandFun()
    //                     }}
    //                   >
    //                     NEW DEMAND
    //                   </section>}
    //                 </section>
    //               </section>
    //             </div>
    //           </div>
    //         </div>
    //         {statusValidError && (
    //           <div className=" border-b border-[#ffe6bc]  bg-[#ffe6bc]">
    //             <div className="w-full border-b border-[#ffe6bc]  bg-[#f69c10] "></div>
    //             <div className=" w-full flex flex-row justify-between pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 ml-1 flex flex-row">
    //               {' '}
    //               <section>
    //                 <span className="font-Rubik font-sanF text-[#844b00] font-[500]   text-[11px]  py-[6px]">
    //                   {newStatusErrorList}
    //                 </span>
    //               </section>
    //               <XIcon
    //                 className="h-4 w-4 mr-2 inline text-green"
    //                 aria-hidden="true"
    //               />
    //             </div>
    //           </div>
    //         )}

    //         {timeHide && (
    //           <>
    //             <div className="w-full border-b border-[#ebebeb]"></div>
    //             <div className=" w-full  pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 ml-1 flex flex-row justify-between">
    //               {' '}
    //               <section>
    //                 <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
    //                   Created On
    //                   <span className="text-[#867777] ck ml-2">
    //                     {CT != undefined
    //                       ? prettyDateTime(CT)
    //                       : prettyDateTime(Date)}
    //                   </span>
    //                 </span>
    //               </section>
    //               <section>
    //                 <span className="font-thin   font-bodyLato text-[9px]  py-[6px]">
    //                   Updated On :
    //                   <span className="text-[#867777] ck ml-2">
    //                     {stsUpT === undefined
    //                       ? 'NA'
    //                       : prettyDateTime(stsUpT) || 'NA'}
    //                   </span>
    //                 </span>
    //               </section>
    //               <section>
    //                 <span className="font-thin text-[#867777]   font-bodyLato text-[9px]  py-[6px]">
    //                   Assigned On
    //                   <span className="text-[#867777] ck ml-2">
    //                     {assignT != undefined
    //                       ? prettyDateTime(assignT)
    //                       : prettyDateTime(Date)}
    //                   </span>
    //                 </span>
    //               </section>
    //             </div>
    //           </>
    //         )}
    //       </div>

    //       <UnitFullSummary
    //         customerDetails={customerDetails}
    //         selCustomerPayload={selCustomerPayload}
    //       />

    //       {selFeature === 'legal_info' && <></>}
    //       <SiderForm
    //         open={openCapturePayment}
    //         setOpen={setOpenCapturePayment}
    //         title={'capturePayment'}
    //         unitsViewMode={false}
    //         widthClass="max-w-xl"
    //         selUnitDetails={selCustomerPayload}
    //         paymentCaptureFun={paymentCaptureFun}
    //       />
    //       <SiderForm
    //         open={newDemand}
    //         setOpen={setOpenNewDemand}
    //         title={'newDemand'}
    //         unitsViewMode={false}
    //         widthClass="max-w-xl"
    //         selUnitDetails={selCustomerPayload}
    //         paymentCaptureFun={demandCaptureFun}
    //       />
    //     </div>


    <div className={`bg-white h-screen  flex flex-col ${openUserProfile ? 'hidden' : ''}`}>

      <div className='bg-white shadow-lg mb-4  '>
              <div className='px-6 py-4 '>

              <div className="pb-[2px] px-1 border border-[#E5E5E5]  rounded-[16px]  bg-white">
        <div className="-mx-3 flex sm:-mx-4 px-3">
          <div className="w-full">
            {/* <div className="flex flex-col justify-between">
          <section className="flex flex-row justify-between px-3 py-1 rounded-md">
            <section>
              <section className="flex flex-row">
                <section className="bg-violet-100 items-center rounded-2xl shadow-xs flex flex-col px-2 py-1 min-w-[100px]">
                  <div className="font-semibold text-[#1e1e1e] text-[22px] mb-[1] tracking-wide">
                    {selCustomerPayload?.unit_no}
                  </div>
                  <span className={`items-center h-6 text-xs font-semibold text-[#1e1e1e] rounded-full`}>
                    Stall No
                  </span>
                </section>

                <div className="flex flex-col w-full ml-2 item-right px-2 mr-2 rounded-lg">
                  <span className={`items-center mt-[2px] mb-1 text-xl uppercase font-semibold text-black`}>
                    {selCustomerPayload?.companyName || 'NA'}
                  </span>
                  <span className={`items-center mb-1 text-xs`}>
                    {selCustomerPayload?.co_Name1 || 'NA'}
                  </span>
                  <span className={`items-center mb-1 text-xs flex flex-row`}>
                    <PhoneIcon className="h-4 w-4 mt-1 mr-1" aria-hidden="true" />
                    <span className='mt-[2px]'>
                      {selCustomerPayload?.phoneNo1?.toString()?.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        '$1-$2-$3'
                      )}
                    </span>
                  </span>
                </div>
              </section>
            </section>
            <section className="flex flex-row h-[28px] mt-6">
              <section className="flex flow-row justify-between mb-1 mr-2 py-[0px] px-[10px] bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline">
                <div className="font-md text-xs text-gray-700 tracking-wide mr-1">
                  Stalls Owner
                </div>
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900">
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
                <div className="font-md text-xs tracking-wide font-semibold text-slate-900">
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
                className="text-center px-[10px] py-[2px] pt-[3px] h-[24px] ml-2 bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline"
                onClickCapture={() => {
                  openDemandFun()
                }}
              >
                NEW DEMAND
              </section>}
            </section>
          </section>
        </div> */}



            <div className="flex flex-col  justify-between">
              <section className="flex flex-row justify-between items-center px-3 py-3 rounded-md">
                <section className="flex  gap-4 flex-row items-center">
                  {/* <section className="bg-orange-100 items-center rounded-xl shadow-sm flex flex-col px-3 py-2 min-w-[60px] mr-4">
                    <div className="font-bold text-[#1e1e1e] text-[24px] tracking-wide">
                      {selCustomerPayload?.unit_no}
                    </div>
                  </section> */}


                  <div className="relative w-[60px] h-[60px]">
                    <svg width="60" height="60" viewBox="0 0 119 119" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M26.0061 0H92.3734C95.2974 0 97.9884 1.59524 99.3918 4.16045L113.289 29.5641C113.933 30.7413 114.271 32.0617 114.271 33.4036L114.271 99.7936C114.271 103.619 111.17 106.72 107.345 106.72V112.281C107.345 115.991 104.338 118.997 100.629 118.997C96.9194 118.997 93.9125 115.991 93.9125 112.281V106.72H24.6969V112.224C24.6969 115.965 21.6641 118.997 17.9231 118.997C14.1821 118.997 11.1493 115.965 11.1493 112.224V106.72C7.41371 106.72 4.38538 103.691 4.38538 99.9557V31.9416C4.38538 30.5546 4.74602 29.1913 5.43191 27.9857L19.0526 4.04408C20.4749 1.54406 23.1298 0 26.0061 0Z" fill="#FCC8BA" />
                      <path d="M101.705 27.7051C101.705 32.3855 97.9109 36.1795 93.2305 36.1797C88.5498 36.1797 84.7552 32.3856 84.7549 27.7051C84.7545 32.3856 80.9599 36.1796 76.2793 36.1797C71.7447 36.1797 68.0415 32.6188 67.8145 28.1406L67.8037 27.7051C67.8033 32.3856 64.0088 36.1797 59.3281 36.1797C54.6475 36.1797 50.8529 32.3856 50.8525 27.7051C50.8522 32.3856 47.0576 36.1797 42.377 36.1797C37.6964 36.1795 33.9017 32.3855 33.9014 27.7051C33.901 32.3855 30.1072 36.1795 25.4268 36.1797C20.7461 36.1797 16.9515 32.3856 16.9512 27.7051C16.9508 32.3856 13.1562 36.1796 8.47559 36.1797C3.79494 36.1797 0.000359783 32.3856 0 27.7051V18.1689H101.705V27.7051ZM118.656 27.7051C118.656 32.3856 114.861 36.1797 110.181 36.1797C105.5 36.1795 101.706 32.3855 101.706 27.7051V18.1689H118.656V27.7051ZM118.656 18.168H0L22.0684 0H96.707L118.656 18.168ZM30.209 2.13281C29.5894 2.13288 29.0046 2.41977 28.626 2.91016L20.9824 12.8145C19.9683 14.1292 20.9058 16.0361 22.5664 16.0361H33.2197C33.9636 16.036 34.6461 15.6228 34.9912 14.9639L40.1748 5.05957C40.8714 3.72812 39.906 2.13311 38.4033 2.13281H30.209ZM55.9199 2.13281C54.929 2.13296 54.0881 2.85874 53.9424 3.83887L52.4707 13.7422C52.2915 14.9503 53.2278 16.0361 54.4492 16.0361H65.5557C66.8397 16.0361 67.7914 14.8427 67.5059 13.5908L65.2441 3.6875C65.0364 2.77803 64.2278 2.13294 63.2949 2.13281H55.9199ZM80.2539 2.13281C78.7511 2.1328 77.785 3.72803 78.4814 5.05957L83.665 14.9639C84.0102 15.623 84.6934 16.0361 85.4375 16.0361H96.0908C97.7514 16.036 98.6881 14.1292 97.6738 12.8145L90.0312 2.91016C89.6526 2.41959 89.067 2.13283 88.4473 2.13281H80.2539Z" fill="#F44D21" />
                    </svg>

                    <div className="absolute inset-0 flex items-center mt-2 justify-center">
                      <div className="font-bold text-[#1e1e1e] text-[24px] tracking-wide">
                        {selCustomerPayload?.unit_no}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    <span className="font-semibold text-[18px] leading-[100%] tracking-[0] text-[#414141] ">
                      {selCustomerPayload?.co_Name1 || 'S. Vishal Kumar'}
                    </span>
                    <span className="border border-[#E5E5E5] font-medium px-3 py-2 rounded-full flex items-center  text-[12px] leading-[100%] tracking-[0] text-[#43B75D] font-manrope">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Booked
                    </span>
                  </div>
                </section>

                <section className="flex flex-row items-center gap-3">
                  <button className="bg-[#F44D21] text-white font-medium px-6 py-2.5 rounded-[10px] text-sm transition-colors"
                    onClick={() => {
                      openPaymentFun()
                    }}>
                    Capture Payment
                  </button>
                  <button className="border-2 border-[#F44D21] text-[#F44D21] hover:bg-[#F44D21]  font-medium px-4 py-2 rounded-[10px] text-sm transition-colors flex items-center">
                    <PhoneIcon className="h-4 w-4 mr-2" aria-hidden="true" />
                    Call
                  </button>
                </section>
              </section>

              <section className="px-3 py-4 border-t border-gray-200">
                <div className="flex flex-row justify-between items-center text-sm">
                  <div className="flex items-center">
                    <span className="font-medium text-[12px] leading-[100%] tracking-[0] text-[#444444] font-manrope mr-2">Phone number:</span>
                    <span className="font-medium text-[12px] leading-[100%] tracking-[0] text-[#444444] font-manrope">
                      {selCustomerPayload?.phoneNo1?.toString()?.replace(
                        /(\d{3})(\d{3})(\d{4})/,
                        '+91 $1$2 $3'
                      ) || '+91 91234 5678'}
                    </span>
                  </div>

                  <div className="w-px h-6 bg-gray-300"></div>

                  <div className="flex items-center">
                    <span className="font-medium text-[12px] leading-[100%] tracking-[0] text-[#444444] font-manrope mr-2">Shop name :</span>
                    <span className="font-medium text-[12px] leading-[100%] tracking-[0] text-[#444444] font-manrope">
                      {selCustomerPayload?.companyName || 'GRT Jewellery'}
                    </span>
                  </div>

                  <div className="w-px h-6 bg-gray-300"></div>

                  <div className="flex items-center">
                    <span className="font-medium text-[12px] leading-[100%] tracking-[0] text-[#444444] font-manrope mr-2">Booked date:</span>
                    <span className="font-medium text-[12px] leading-[100%] tracking-[0] text-[#444444] font-manrope text-gray-900">
                      {prettyDate(
                        selCustomerPayload?.booked_on ||
                        selCustomerPayload?.ct ||
                        0
                      ) || '12-12-2024'}
                    </span>
                  </div>

                  <div className="w-px h-6 bg-gray-300"></div>

                  <div className="flex items-center">
                    <span className="font-medium text-[12px] leading-[100%] tracking-[0] text-[#444444] font-manrope mr-2">Location:</span>
                    <span className="font-medium text-[12px] leading-[100%] tracking-[0] text-[#444444] font-manrope text-gray-900">
                      Karnataka
                    </span>
                  </div>
                </div>
              </section>

              {/* Keep the original dropdown sections if needed */}
              <section className="flex flex-row justify-between items-center px-3 py-2 mt-2" style={{ display: 'none' }}>
                <section className="flex flow-row justify-between mb-1 mr-2 py-[0px] px-[10px] bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline">
                  <div className="font-md text-xs text-gray-700 tracking-wide mr-1">
                    Stalls Owner
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

                {customerDetails?.man_cs_approval === "approved" && <section
                  className="text-center px-[10px] py-[2px]  pt-[3px] h-[24px] ml-2 bg-gradient-to-r from-[#E7E7E7] to-[#E7E7E7] text-black rounded-3xl items-center align-middle text-xs cursor-pointer hover:underline"
                  onClickCapture={() => {
                    openDemandFun()
                  }}
                >
                  NEW DEMAND
                </section>}
              </section>
            </div>

          </div>
        </div>
        {statusValidError && (
          <div className="border-b border-[#ffe6bc] bg-[#ffe6bc]">
            <div className="w-full border-b border-[#ffe6bc] bg-[#f69c10]"></div>
            <div className="w-full flex flex-row justify-between pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 ml-1 flex flex-row">
              <section>
                <span className="font-Rubik font-sanF text-[#844b00] font-[500] text-[11px] py-[6px]">
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

        {timeHide && (
          <>
            <div className="w-full border-b border-[#ebebeb]"></div>
            <div className="w-full pt-1 font-md text-xs text-gray-500 mb-[2px] tracking-wide mr-4 ml-1 flex flex-row justify-between">
              <section>
                <span className="font-thin font-bodyLato text-[9px] py-[6px]">
                  Created On
                  <span className="text-[#867777] ck ml-2">
                    {CT != undefined
                      ? prettyDateTime(CT)
                      : prettyDateTime(Date)}
                  </span>
                </span>
              </section>
              <section>
                <span className="font-thin font-bodyLato text-[9px] py-[6px]">
                  Updated On :
                  <span className="text-[#867777] ck ml-2">
                    {stsUpT === undefined
                      ? 'NA'
                      : prettyDateTime(stsUpT) || 'NA'}
                  </span>
                </span>
              </section>
              <section>
                <span className="font-thin text-[#867777] font-bodyLato text-[9px] py-[6px]">
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

      </div>

      </div>





      {/* Main Content Area with Scroll */}
      <div className="flex-1 overflow-auto">
        <UnitFullSummary
          customerDetails={customerDetails}
          selCustomerPayload={selCustomerPayload}
        />
      </div>

      {/* Fixed Footer */}
      <div className="bg-[#F9F7F5] border-t border-gray-200 px-4 py-3">
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-600">

          </div>
          <div className="flex space-x-4">
            <button className="text-gray-600 hover:text-gray-900"></button>
            <button className="text-gray-600 hover:text-gray-900"></button>
            <button className="text-gray-600 hover:text-gray-900"></button>
          </div>
        </div>
      </div>

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
