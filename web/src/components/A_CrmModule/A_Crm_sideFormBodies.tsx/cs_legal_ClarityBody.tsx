/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { setHours, setMinutes } from 'date-fns'
import { Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { ErrorMessage, Form, Formik, useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import { v4 as uuidv4 } from 'uuid'
import * as Yup from 'yup'
import AddLeadTaskComment from 'src/components/Comp_CustomerProfileSideView/AddLeadTaskComment'
import EditLeadTask from 'src/components/Comp_CustomerProfileSideView/EditLeadTask'
import LeadTaskDisplayHead from 'src/components/Comp_CustomerProfileSideView/LeadTaskDisplayHead'
import LeadTaskFooter from 'src/components/Comp_CustomerProfileSideView/LeadTaskFooter'
import SelectDropDownComp from 'src/components/comps/dropDownhead'
import { USER_ROLES } from 'src/constants/userRoles'
import {
  addLegalClarificationTicket,
  steamUnitTasks,
  updateLegalClarityApproval,
} from 'src/context/dbQueryFirebase'
import {
  addLeadScheduler,
  updateSch,
  deleteSchLog,
  updateLeadStatus,
  updateSchLog,
  addLeadNotes,
  createAttach,
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
import { supabase } from 'src/context/supabase'
import {
  prettyDateTime,
} from 'src/util/dateConverter'
import { getWhatsAppTemplates } from 'src/util/TuneWhatsappMsg'
import CustomDatePicker from 'src/util/formFields/CustomDatePicker'

// import BankSelectionSwitchDrop from './BankSelectionDroopDown'
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

export default function Crm_legal_Clarity({
  type,
  setStatusFun,
  selUnitPayload,
}) {
  const { user } = useAuth()
  const { orgId } = user
  const { enqueueSnackbar } = useSnackbar()
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
  } = selUnitPayload
  const [fetchedUsersList, setfetchedUsersList] = useState([])
  const [usersList, setusersList] = useState([])
  const [uploadFile, setUploadFile] = useState()
  const [postPoneToFuture, setPostPoneToFuture] = useState('present')

  // const [leadStatus, setLeadStatus] = useState([])
  const [selFeature, setFeature] = useState('appointments')
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
  const [showAddTask, setShowAddTask] = useState(false)

  const d = new window.Date()
  const [value, setValue] = useState(d)
  const people = [
    { name: 'Priority 1' },
    { name: 'Priority 2' },
    { name: 'Priority 3' },
    { name: 'Priority 4' },
  ]
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
  const [hover, setHover] = useState(false)
  const [hoverId, setHoverID] = useState(1000)
  const [hoverTasId, setHoverTasId] = useState(2000)
  const [streamCoveredA, setStreamCoveredA] = useState([])
  const [streamCurrentStatus, setStreamCurrentStatus] = useState('new')
  const [streamfrom, setStreamFrom] = useState('')
  const [files, setFiles] = useState([])
  const [prior, setPrior] = useState(false)
  const [unitFetchedActivityData, setUnitFetchedActivityData] = useState([])

  const [closePrevious, setClosePrevious] = useState(false)
  if (!user?.role?.includes(USER_ROLES.ADMIN)) {
    return null
  }
  useEffect(() => {
    console.log('yo yo ', selUnitPayload)
  }, [])
  useEffect(() => {
    console.log('unit dta is ', selUnitPayload, selUnitPayload?.id)
    boot()
    const subscription = supabase
      .from(`${orgId}_unit_tasks`)
      .on('*', (payload) => {
        console.log('account records', payload)
        const updatedData = payload.new
        const { id } = payload.old
        const eventType = payload.eventType
        console.log('account records', updatedData.Uuid, selUnitPayload?.id)

        if (updatedData.Uuid === selUnitPayload?.id) {
          if (updatedData.Uuid === selUnitPayload?.id) {
            console.log('account records', updatedData.Uuid, selUnitPayload?.id)
            setUnitFetchedActivityData((prevLogs) => {
              const existingLog = prevLogs.find((log) => log.id === id)
              console.log(
                'account records',
                prevLogs,
                existingLog,
                id,
                payload.old,
                id
              )
              if (existingLog) {
                console.log('Existing record found!')
                if (payload.new.status === 'Done') {
                  const updatedLogs = prevLogs.filter((log) => log.id != id)
                  return [...updatedLogs]
                } else {
                  const updatedLogs = prevLogs.map((log) =>
                    log.id === id ? payload.new : log
                  )
                  return [...updatedLogs]
                }
              } else {
                console.log('New record added!')
                return [...prevLogs, payload.new]
              }
            })
          } else {
            if (
              updatedData.by_uid === user?.uid ||
              updatedData?.to_uid === user?.uid
            ) {
              setUnitFetchedActivityData((prevLogs) => {
                const existingLog = prevLogs.find((log) => log.id === id)

                if (existingLog) {
                  console.log('Existing record found!')
                  if (payload.new.status === 'Done') {
                    const updatedLogs = prevLogs.filter((log) => log.id != id)
                    return [...updatedLogs]
                  } else {
                    const updatedLogs = prevLogs.map((log) =>
                      log.id === id ? payload.new : log
                    )
                    return [...updatedLogs]
                  }
                } else {
                  console.log('New record added!')
                  return [...prevLogs, payload.new]
                }
              })
            }
          }
        }
      })
      .subscribe()

    // Clean up the subscription when the component unmounts
    return () => {
      supabase.removeSubscription(subscription)
    }
  }, [])
  const boot = async () => {
    const unsubscribe = steamUnitTasks(orgId, {
      uid: selUnitPayload?.id,
      pId: selUnitPayload?.pId,
    })

    const y = await unsubscribe
    setUnitFetchedActivityData(y)
    await console.log('new setup ', unitFetchedActivityData)
    await console.log('new setup ', y)
  }
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
  const submitManagerApproval = (status) => {
    const dataObj = {
      status: status,
      // plotCS: costSheetA,
      // fullPs: newPlotPS,
      // addChargesCS: partBPayload,
      // T_balance: netTotal - selUnitDetails?.T_review,
      // T_Total: netTotal,
    }
    updateLegalClarityApproval(
      orgId,
      selUnitPayload?.id,
      dataObj,
      user.email,
      enqueueSnackbar
    )
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
    setShowAddTask(false)
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
  const setShowVisitFeedBackStatusFun = (scheduleData, value) => {
    setSelSchGrpO(scheduleData)
    cancelResetStatusFun()
    setLeadStatus('visitdone')
    setShowNotInterested(false)
    setShowVisitFeedBackStatus(true)
  }
  const setShowNotInterestedFun = (scheduleData, value) => {
    setSelSchGrpO(scheduleData)

    cancelResetStatusFun()

    setLeadStatus('notinterested')

    setShowVisitFeedBackStatus(false)

    setShowNotInterested(true)

    // setFeature('appointments')
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
  return (
    <section className="bg-[#EFF8F1] w-full md:px-10 md:mb-20 pb-[250px] overflow-auto no-scrollbar  h-[100%] overflow-y-scroll">
      <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700">
        <div className="mt-1">
          <div className="py-2 rounded-md flex flex-row justify-between">
            <div className="flex flex-col">
              <h2 className="font-medium flex-grow text-[16px]">
                Unit Legal Clarity
              </h2>
              <p className="text-md text-[10px] flex-grow text-right">
                Legal Team will answers the questions{' '}
              </p>
            </div>
            <p className="text-md text-[10px] flex-grow text-right">
              Legal Section{' '}
            </p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialState1}
        //  validationSchema={validateSchema1}
        // onSubmit={(values, { resetForm }) => {
        //   console.log('values of form is ', values)
        // }}
      >
        {(formik2) => (
          <div className=" h-screen ">
            {(showNotInterested || showVisitFeedBackStatus || showJunk) &&
              selSchGrpO?.ct === undefined && (
                <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFF9F2] mx-4 p-4">
                  {!showJunk && (
                    <div className="  outline-none border  rounded p-4 mt-4">
                      <textarea
                        value={takNotes}
                        onChange={(e) => setNotesTitle(e.target.value)}
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
                      <span className="ml-1 ">Save & Whats App</span>
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

            <div className="font-md font-medium text-xs  ml-2 text-gray-800 flex flex-row justify-between py-2">
              <section className="flex flex-row py-1"></section>
              <div className="flex flex-row ">
                <div className="flex flex-row bg-white rounded-xl border ">
                  <div
                    className={` py-1 pr-4 pl-4 min-w-[62px] ${
                      selFilterVal === 'all' ? 'bg-[#c6fff0]' : ''
                    } rounded-xl rounded-r-none`}
                    onClick={() => setSelFilterVal('all')}
                  >
                    <span className="mr-1 text-[10px] ">All</span>

                    {
                      leadSchFetchedData.filter((d) => d?.schTime != undefined)
                        .length
                    }
                  </div>
                  <div
                    className={` py-1 pr-4 pl-4 min-w-[62px] border-x ${
                      selFilterVal === 'pending' ? 'bg-[#c6fff0]' : ''
                    } `}
                    onClick={() => setSelFilterVal('pending')}
                  >
                    <CheckCircleIcon className="w-4 h-3  inline text-[#cdcdcd]" />
                    <span className="mr-1 text-[10px] ">Pending</span>
                    <span
                      className=" text-[11
                              px] "
                    >
                      {' '}
                      {
                        leadSchFetchedData?.filter((d) => d?.sts === 'pending')
                          .length
                      }
                    </span>
                  </div>
                  <div
                    className={` py-1 pr-4 pl-4 min-w-[62px] ${
                      selFilterVal === 'completed' ? 'bg-[#c6fff0]' : ''
                    }  rounded-xl rounded-l-none`}
                    onClick={() => setSelFilterVal('completed')}
                  >
                    <CheckCircleIcon className="w-4 h-3 inline text-[#058527]" />
                    <span className="mr-1 text-[10px] ">Completed</span>

                    {
                      leadSchFetchedData?.filter((d) => d?.sts === 'completed')
                        .length
                    }
                  </div>
                </div>
                {!showAddTask && (
                  <span
                    className="ml-2 mt-1 text-blue-800 cursor-pointer w-[70px]"
                    onClick={() => {
                      setShowAddTask(!showAddTask)
                    }}
                  >
                    Create Task
                  </span>
                )}
                {showAddTask && (
                  <span
                    className="ml-2 mt-1 text-blue-800 cursor-pointer w-[70px]"
                    onClick={() => {
                      setShowAddTask(!showAddTask)
                    }}
                  >
                    Close Task
                  </span>
                )}
              </div>
            </div>
            {showAddTask && (
              <div
                id="toast-success"
                className="flex items-center  mx-  p-2 text-white
                     bg-[#516F90]"
                role="alert"
              >
                <div className=" text-sm font-normal font-bodyLato tight-wider">
                  Hey, Post your Legal Query{' '}
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
            {showAddTask && (
              <div className="flex flex-col pt-0 my-10  mt-[0px] ">
                <Formik
                  enableReinitialize={true}
                  initialValues={initialState}
                  validationSchema={validateSchema}
                  onSubmit={async (data, { resetForm }) => {
                    // fAddSchedule()
                    // create duplicate table
                    // insert value to it with unassigned values
                    // save data in db
                    //
                    // data.due_date = startDate.getTime()
                    // data.priorities = prior ? 'high' : 'medium'
                    // data.attachments = files
                    // setLoading(true)
                    data.due_date = startDate
                    data.priorities = prior ? 'high' : 'medium'
                    data.attachments = files
                    data.Uuid = selUnitPayload?.id
                    await addLegalClarificationTicket(orgId, data, user)

                    // await resetForm()
                    // await setFormMessage('Task Created..!')
                    // await setLoading(false)
                    return
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
                              formik.setFieldValue('taskTitle', e.target.value)
                              setTitleFun(e)
                            }}
                            placeholder="Enter a short title"
                            className="w-full h-full pb-1 outline-none text-sm font-bodyLato focus:border-blue-600 hover:border-blue-600  border-b border-[#cdcdcd] text-[33475b] bg-[#F2F5F8] "
                          ></input>
                          <div className="flex flex-row ">
                            <div className="flex flex-row mt-3">
                              <section>
                                <span className="text-xs font-bodyLato text-[#516f90]">
                                  <span className="">
                                    {tempLeadStatus.charAt(0).toUpperCase() +
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
                                      onChange={(date) => setStartDate(date)}
                                      showTimeSelect
                                      timeFormat="HH:mm"
                                      injectTimes={[
                                        setHours(setMinutes(d, 1), 0),
                                        setHours(setMinutes(d, 5), 12),
                                        setHours(setMinutes(d, 59), 23),
                                      ]}
                                      dateFormat="MMM d, yyyy h:mm aa"

                                    />
                                  </span>
                                </div>
                              </section>
                            </div>
                            <div className="flex flex-row mt-3">
                              <section>
                                <span className="text-xs font-bodyLato text-[#516f90]">
                                  <span className="">
                                    {tempLeadStatus.charAt(0).toUpperCase() +
                                      tempLeadStatus.slice(1)}{' '}
                                  </span>
                                  Priority
                                </span>
                                <div className="bg-green   pl-   flex flex-row  ">
                                  {/* <CalendarIcon className="w-4  ml-1 inline text-[#058527]" /> */}
                                  <span className="inline">
                                    <input
                                      data-bx-id="task-edit-priority-cb"
                                      type="checkbox"
                                      name="priorities"
                                      value={prior}
                                      className="mb-[5px]"
                                      onChange={(value) => {
                                        setPrior(!prior)
                                        const priorTxt = prior
                                          ? 'high'
                                          : 'medium'
                                        formik.setFieldValue(
                                          'priorities',
                                          priorTxt
                                        )
                                        console.log(
                                          'is this checked ',
                                          priorTxt
                                        )
                                      }}
                                    />
                                  </span>
                                  <div className="w-[85px] ml-1 mt-[1px] text-sm text-[#00000080]">
                                    High Priority
                                  </div>
                                </div>
                              </section>
                            </div>
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
                                {tempLeadStatus != streamCurrentStatus &&
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
            <div className="flex flex-col mb-3">
              {unitFetchedActivityData?.map((d, i) => {
                return (
                  <div key={i} className="">
                    <span className="inline-block bg-[#BDE5B3] rounded-t-md px-2 py-[4px] text-[10px] font-bold">
                      #80418
                    </span>
                    <div className="py-1   px-2 rounded-tr-md rounded-b-md px-2 flex flex-row justify-between bg-white">
                      <div className="flex flex-col ">
                        <h2 className="font-medium flex-grow text-[12px]">
                          {d?.title}
                        </h2>
                        <p className="text-md text-[10px] flex-grow text-right">
                          {d?.desc}
                        </p>
                      </div>
                      <p className="text-md text-[10px] flex-grow text-right">
                        {d?.status}
                      </p>
                    </div>
                  </div>
                )
              })}
              {unitFetchedActivityData?.length == 0 && !showAddTask && (
                        <div className="py-8 px-8 flex flex-col items-center mt-8">
                        <div className="font-md font-medium text-xs mb-4  text-gray-800 items-center">
                          <img
                            className="w-[200px] h-[200px] inline"
                            alt=""
                            src="/target.svg"
                          />
                        </div>
                        <h3 className="mb-1 text-sm font-semibold text-gray-900 ">
                          No Tasks
                        </h3>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 ">
                          Legal Clarifications always bring more trust{' '}
                          <span
                            className="text-blue-600"
                            onClick={() => setShowAddTask(!showAddTask)}
                          >
                              Create New Task
                          </span>
                        </time>
                      </div>

              )}
            </div>

            {!leadSchLoading && leadSchFetchedData.length == 0 && !addSch && (
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
            <div className="max-h-[60%]">
              <ol className="relative  border-gray-200 ">
                {leadSchFilteredData.map((data, i) => (
                  <section
                    key={i}
                    className=" mx-2 bg-[#FFF] mb-[1px]  px-3 py-3"
                    onMouseEnter={() => {
                      hoverEffectTaskFun(data?.ct)
                      // setHover(true)
                    }}
                    onMouseLeave={() => {
                      hoverEffectTaskFun(2000)
                      // setHover(false)
                    }}
                  >
                    {editTaskObj?.ct === data?.ct ? (
                      <EditLeadTask
                        editTaskObj={editTaskObj}
                        setStartDate={setStartDate}
                        startDate={startDate}
                        takTitle={takTitle}
                        setTitleFun={setTitleFun}
                        cancelResetStatusFun={cancelResetStatusFun}
                        editTaskFun={editTaskFun}
                        d={d}
                      />
                    ) : null}
                    <>
                      {' '}
                      {/* header part */}
                      <LeadTaskDisplayHead
                        data={data}
                        setAddTaskCommentObj={setAddTaskCommentObj}
                        closeTaskFun={closeTaskFun}
                        hoverTasId={hoverTasId}
                        undoFun={undoFun}
                        setShowVisitFeedBackStatusFun={
                          setShowVisitFeedBackStatusFun
                        }
                      />
                      {/* add comment + close & Add New Task section */}
                      {addTaskCommentObj?.ct === data?.ct && (
                        // <input
                        //   type="text"
                        //   className="block"
                        //   placeholder="pastehere"
                        // />
                        <AddLeadTaskComment
                          closeTask={closeTask}
                          data={data}
                          setShowVisitFeedBackStatusFun={
                            setShowVisitFeedBackStatusFun
                          }
                          setShowNotInterestedFun={setShowNotInterestedFun}
                          setAddCommentTitle={setAddCommentTitle}
                          addCommentTitle={addCommentTitle}
                          addCommentTime={addCommentTime}
                          setPostPoneToFuture={setPostPoneToFuture}
                          setClosePrevious={setClosePrevious}
                          setAddCommentPlusTask={setAddCommentPlusTask}
                          setAddCommentTime={setAddCommentTime}
                          cancelResetStatusFun={cancelResetStatusFun}
                          addTaskCommentFun={addTaskCommentFun}
                          addCommentPlusTask={addCommentPlusTask}
                          setSelType={setSelType}
                          selType={selType}
                          d={d}
                        />
                      )}
                      {/* comments display part */}
                      {data?.comments?.map((commentObj, k) => {
                        return (
                          <li
                            key={k}
                            className={`ml-6 text-[13px] text-[#7E92A2] tracking-wide ${
                              data?.comments?.length - 1 === k ? 'mb-1' : ''
                            }`}
                          >
                            <section className="flex flex-row justify-between">
                              <span>
                                {' '}
                                <svg
                                  viewBox="0 0 12 12"
                                  className="notes_icon inline w-2 h-2 mr-1"
                                  aria-label="2 comments"
                                >
                                  <g fill="none" fillRule="evenodd">
                                    <path
                                      fill="currentColor"
                                      fillRule="nonzero"
                                      d="M9.5 1A1.5 1.5 0 0 1 11 2.5v5A1.5 1.5 0 0 1 9.5 9H7.249L5.28 10.97A.75.75 0 0 1 4 10.44V9H2.5A1.5 1.5 0 0 1 1 7.5v-5A1.5 1.5 0 0 1 2.5 1h7zm0 1h-7a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5H5v1.836L6.835 8H9.5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5z"
                                    ></path>
                                  </g>
                                </svg>{' '}
                                {commentObj?.c}
                              </span>
                              <span> {prettyDateTime(commentObj?.t)}</span>
                            </section>
                          </li>
                        )
                      })}
                      {/* not interested and visit done stuff */}
                      {(showNotInterested || showVisitFeedBackStatus) &&
                        selSchGrpO?.ct === data?.ct && (
                          <div className="flex flex-col pt-0 my-10 mt-[10px] rounded bg-[#FFF9F2] mx-4 p-4">
                            {showNotInterested && (
                              <div className="w-full flex flex-col mb-3 mt-2">
                                <SelectDropDownComp
                                  label={`Why  ${
                                    customerDetails?.Name?.toLocaleUpperCase() ||
                                    'Customer'
                                  } is  not Interested*`}
                                  options={notInterestOptions}
                                  value={fbTitle}
                                  onChange={(value) => {
                                    // formik.setFieldValue('source', value.value)
                                    setFbTitle(value.value)
                                  }}
                                />
                              </div>
                            )}

                            <div className="  outline-none border  rounded p-4 mt-4">
                              <textarea
                                value={fbNotes}
                                onChange={(e) => setfbNotes(e.target.value)}
                                placeholder="Type & make a notes *"
                                className="w-full h-full pb-10 outline-none  focus:border-blue-600 hover:border-blue-600 rounded bg-[#FFF9F2] "
                              ></textarea>
                            </div>
                            <div className="flex flex-row mt-1">
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
                                    enqueueSnackbar('Please Enter Notes', {
                                      variant: 'warning',
                                    })
                                  }
                                }}
                                className={`flex mt-2 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                              >
                                <span className="ml-1 ">Save</span>
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
                                    // 'ProjectId',
                                    ProjectId,
                                    receiverDetails,
                                    msgPayload
                                  )
                                }}
                                className={`flex mt-2 ml-4 rounded items-center  pl-2 h-[36px] pr-4 py-2 text-sm font-medium text-white bg-[#FF7A53]  hover:bg-gray-700  `}
                              >
                                <span className="ml-1 ">Save & Whats App</span>
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
                      {/* footer part */}
                      {addTaskCommentObj?.ct != data?.ct && (
                        <LeadTaskFooter
                          data={data}
                          hoverTasId={hoverTasId}
                          EditTaskOpenWindowFun={EditTaskOpenWindowFun}
                          delFun={delFun}
                        />
                      )}
                    </>
                  </section>
                ))}{' '}
              </ol>
            </div>

            {/* comments section */}
          </div>
        )}
      </Formik>

      <div className="mt-5 left-0 text-right md:space-x-3 md:block flex flex-col-reverse py-3 mr-6 flex flex-col mt-2 z-10 flex flex-row justify-between mt-2 pr-6 bg-white shadow-lg absolute bottom-0  w-full">
        <button
          className="bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="submit"
          onClick={() => {
            submitManagerApproval('rejected')
          }}
          // disabled={loading}
        >
          {'Reject'}
        </button>
        <button
          className="bg-green-400 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="submit"
          // disabled={loading}
          onClick={() => {
            // mark man_cs_approval as true
            submitManagerApproval('approved')
          }}
        >
          {'Approve'}
        </button>
      </div>
    </section>
  )
}
